import { SchemaTypes, FieldPropsDefine } from './types';
import { computed, defineComponent } from 'vue';
import {
  StringField,
  StringSFCField,
  NumberField,
  ObjectField
} from './fields';
import { retrieveSchema } from './utils';

export default defineComponent({
  name: 'SchemaItem',
  props: FieldPropsDefine,
  setup(props) {
    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props;
      return retrieveSchema(schema, rootSchema, value);
    });
    return () => {
      const { schema, rootSchema, value } = props;
      const retrievedSchemaSchema = retrievedSchemaRef.value;

      let Component: any;
      // to-do: type未指定的情况如何处理?
      const { type } = schema;

      switch (type) {
        case SchemaTypes.STRING:
          Component = StringField;
          break;
        case SchemaTypes.NUMBER:
          Component = NumberField;
          break;
        case SchemaTypes.OBJECT:
          Component = ObjectField;
          break;
        default:
          Component = <div>error</div>;
          break;
      }
      return <Component {...props} schema={retrievedSchemaSchema} />;
    };
  }
});
