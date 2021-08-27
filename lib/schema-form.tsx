import {
  defineComponent,
  PropType,
  provide,
  watch,
  Ref,
  watchEffect,
  shallowRef
} from 'vue';
import { CommonFieldDefine, Schema } from './types';
import SchemaItem from './schema-item';
import { SchemaFormContextKey, Context } from './context';
import Ajv, { Options } from 'ajv';
import validateFormData, { ErrorSchema } from './validator';
import { Localize } from 'ajv-i18n/localize/types';
import i18n from 'ajv-i18n';

interface ContextRef {
  doValidate: () => {
    valid: boolean;
    errors: any[];
  };
}
const defaultAjvOptions: Options = {};

export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true,
      type: null
    },
    onChange: {
      type: Function as PropType<(v: unknown) => void>,
      required: true
    },
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>
    },
    ajvOptions: {
      type: Object as PropType<Options>
    },
    local: {
      type: Object as PropType<Localize>
    },
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>
    }
  },
  setup(props) {
    const handleChange = (v: unknown) => {
      props.onChange(v);
    };
    const validatorRef: Ref<Ajv> = shallowRef() as any;
    const errorSchema: Ref<ErrorSchema> = shallowRef({});

    const context: Context = {
      SchemaItem: SchemaItem as CommonFieldDefine,
      ErrorSchema: errorSchema.value
    };

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions
      });
    });

    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          /* eslint-disable vue/no-mutating-props  */
          props.contextRef.value = {
            doValidate() {
              const result = validateFormData(
                validatorRef.value,
                props.schema,
                props.value,
                props.local || i18n.zh,
                props.customValidate
              );
              errorSchema.value = result.errorSchema;
              return result;
            }
          };
        }
      },
      {
        immediate: true
      }
    );

    provide(SchemaFormContextKey, context);

    return () => {
      const { schema, value } = props;
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
          errorSchema={errorSchema.value ?? {}}
        />
      );
    };
  }
});
