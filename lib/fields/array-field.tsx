/**
  @author: zhangxiang
  @date: 2021-07-27 22:44:34
  @desc：
*/
import { defineComponent } from 'vue';
import { FieldPropsDefine } from '../types';
import { useVJSFContext } from '../context';
import { Schema } from '../types';

/**
 * {
 *  items: {type: string}
 * }
 *
 * {
 *  items: [
 *    {type: 'string'},
 *    {type: 'number'}
 *  ]
 * }
 *
 * {
 *    items: {type: string, enum: ['1','2']}
 * }
 */

export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext();

    const handleMuliTypeChange = (v: unknown, idx: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];
      arr[idx] = v;
      props.onChange(arr);
    };
    return () => {
      const SchemaItem = context.SchemaItem;
      const { schema, rootSchema, value } = props;

      const isMultiType = Array.isArray(schema.items);
      // items是数组
      if (isMultiType) {
        const items = schema.items as Schema[];
        const arr = Array.isArray(value) ? value : [];
        return items.map((s: Schema, idx: number) => {
          return (
            <SchemaItem
              schema={s}
              key={idx}
              rootSchema={rootSchema}
              value={arr[idx]}
              onChange={(v) => {
                handleMuliTypeChange(v, idx);
              }}
            />
          );
        });
      }

      return <div>array-field</div>;
    };
  }
});
