import Ajv, { ErrorObject } from 'ajv';
import { Schema } from './types';
import { Localize } from 'ajv-i18n/localize/types';
import { isObject } from './utils';

interface TransformedErrorObject {
  name?: string;
  property?: string;
  message?: string;
  schemaPath?: string;
  params?: Record<string, any>;
}

export type ErrorSchema = {
  [key: string]: ErrorSchema;
} & {
  __errors?: string[];
};

export interface ValidatedResult {
  valid: boolean;
  errors: TransformedErrorObject[];
  errorSchema: ErrorSchema;
}

function transformError(
  errors: ErrorObject[] | null | undefined
): TransformedErrorObject[] {
  if (errors === null || errors === undefined) {
    return [];
  }
  return errors.map(
    ({ message, keyword, schemaPath, params, instancePath }) => {
      return {
        name: keyword,
        property: instancePath,
        message,
        schemaPath,
        params
      };
    }
  );
}
/**
 * 将jsonpointer解析成数组
 * @param pointer JsonPointer
 * @returns
 */
function parse(pointer: string | undefined) {
  if (!pointer || pointer === '') {
    return [];
  }
  if (pointer.charAt(0) !== '/') {
    throw new Error('Invalid JSON pointer: ' + pointer);
  }
  return pointer
    .substring(1)
    .split(/\//)
    .map((i) => i.replace(/~1/g, '/').replace(/~0/g, '~'));
}

function toErrorSchema(errors: TransformedErrorObject[]) {
  if (!errors.length) {
    return {};
  }
  return errors.reduce((errorSchema, error) => {
    const { property, message } = error;
    const path = parse(property);
    // remove empty string while property is root path (eg: .level)
    if (path.length && path[0] === '') {
      path.splice(0, 1);
    }
    let parent = errorSchema;
    // 将错误信息挂载最底层的属性上面
    for (const segment of path.slice(0)) {
      if (!(segment in parent)) {
        parent[segment] = {};
      }
      parent = parent[segment];
    }

    if (Array.isArray(parent._errors)) {
      parent.__errors = parent._errors.concat(message);
    } else {
      if (message) {
        parent.__errors = [message];
      }
    }
    return errorSchema;
  }, {} as ErrorSchema);
}

function mergeObjects(source: any, target: any, concatArrays = false) {
  // recursively merge deeply nested objects\
  const acc = Object.assign({}, source); // prevent mutation source object
  return Object.keys(target).reduce((acc, key) => {
    const left = acc[key] ? acc[key] : {},
      right = target[key];
    /* eslint-disable */
    if (source && source.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeObjects(source[key], right, concatArrays);
    } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
      acc[key] = left.concat(right);
    } else {
      acc[key] = right;
    }
    return acc;
  }, acc);
}

/**
 * 返回校验后的结果
 * @param validator
 * @param schema
 * @param form
 * @param local
 * @returns
 */
export default async function validateFormData(
  validator: Ajv,
  schema: Schema,
  form: unknown,
  local: Localize,
  customValidate?: (data: any, errors: any) => void
): Promise<ValidatedResult> {
  let validationError = null;

  try {
    validator.validate(schema, form);
  } catch (error) {
    validationError = error;
  }

  local(validator.errors);
  const errors = transformError(validator.errors);

  if (validationError) {
    errors.push({
      message: validationError.message
    });
  }
  const errorSchema = toErrorSchema(errors);
  if (!customValidate) {
    return {
      errors,
      errorSchema,
      valid: !errors.length
    };
  }
  const proxy = createErrorProxy();
  await customValidate(form, proxy);

  const newErrorSchema = mergeObjects(errorSchema, proxy, true);

  return {
    errors,
    errorSchema: newErrorSchema,
    valid: errors.length === 0
  };
}

function createErrorProxy() {
  const raw = {};

  return new Proxy(raw, {
    get(target, key, receiver) {
      if (key === 'addError') {
        return (msg: string) => {
          const __errors = Reflect.get(target, '__errors', receiver);
          if (__errors) {
            __errors.push(msg);
          } else {
            (target as any).__errors = [msg];
          }
        };
      }
      const res = Reflect.get(target, key, receiver);
      if (res === undefined) {
        const p: any = createErrorProxy();
        console.log(p);
        (target as any)[key] = p;
        // 避免返回target[key]  - get
        return p;
      }
      return res;
    }
  });
}
