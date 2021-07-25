import { PropType } from 'vue';
export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean'
}
type SchemaRef = { $ref: string };

export interface Schema {
  type: SchemaTypes | string;
  const?: unknown;
  format?: string;
  default?: unknown;
  properties?: {
    [key: string]: Schema | SchemaRef;
  };
  items?: Schema | Schema[] | SchemaRef;
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef;
  };
  oneOf?: Schema[];
  // vjsf?:
  required?: string[];
  enum?: unknown[];
  enumKeyValue?: unknown[];
  additionProperties?: unknown;
  additionItems?: Schema;
}

export const FieldPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  value: {
    required: true,
    type: null // value 的类型为any  //https://v3.cn.vuejs.org/guide/typescript-support.html#%E6%B3%A8%E8%A7%A3-props
  },
  onChange: {
    type: Function as PropType<(v: unknown) => void>,
    required: true
  }
} as const;
