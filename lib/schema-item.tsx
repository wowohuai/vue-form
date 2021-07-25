import { SchemaTypes, FieldPropsDefine } from './types';
import { defineComponent } from 'vue';
import { StringField, StringSFCField, NumberField } from './fields';

export default defineComponent({
  name: 'SchemaItem',
  props: FieldPropsDefine,
  setup(props) {
    return () => {
      const { schema } = props;

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
        default:
          Component = <div>error</div>;
          break;
      }
      return <Component {...props} />;
    };
  }
});
