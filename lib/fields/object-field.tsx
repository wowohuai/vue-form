/**
  @author: zhangxiang
  @date: 2021-07-26 21:13:48
  @desc：object-field实现
*/
import { defineComponent } from 'vue';
import { FieldPropsDefine } from '../types';
import { useVJSFContext } from '../context';
import { isObject } from '../utils';

export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext();
    const handleObjectFieldChange = (k: string, v: unknown) => {
      const value = isObject(props.value) ? props.value : {};
      if (v === undefined) {
        delete value[k];
      } else {
        value[k] = v;
      }
      props.onChange(value);
    };

    return () => {
      const { SchemaItem } = context;
      const { schema, value, rootSchema } = props;
      const currentValue = isObject(value) ? value : {};
      const properties = schema.properties || {};
      return Object.keys(properties).map((k: string, index: number) => {
        return (
          <SchemaItem
            key={index}
            schema={properties[k]}
            value={currentValue[k]}
            onChange={(v) => handleObjectFieldChange(k, v)}
            rootSchema={rootSchema}
          />
        );
      });
    };
  }
});
