import { defineComponent, PropType, provide } from 'vue';
import { CommonFieldDefine, Schema } from './types';
import SchemaItem from './schema-item';
import { SchemaFormContextKey, Context } from './context';

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
    }
  },
  setup(props) {
    const handleChange = (v: unknown) => {
      props.onChange(v);
    };

    const context: Context = {
      SchemaItem: SchemaItem as CommonFieldDefine
    };

    provide(SchemaFormContextKey, context);

    return () => {
      const { schema, value } = props;
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
        />
      );
    };
  }
});
