import { defineComponent, PropType, provide } from 'vue';
import { Schema } from './types';
import SchemaItem from './schema-item';
import { SchemaFormContextKey } from './context';

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

    provide(SchemaFormContextKey, {
      SchemaItem
    } as any);

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
