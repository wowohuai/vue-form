/**
  @author: zhangxiang
  @date: 2021-07-27 22:44:34
  @desc：
*/
import { defineComponent, PropType } from 'vue';
import { FieldPropsDefine } from '../types';
import { useVJSFContext } from '../context';
import { Schema } from '../types';
import { createUseStyles } from 'vue-jss';
import Select from '../widgets/select';
import { random } from 'lodash';

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee'
  },
  actions: {
    background: '#eee',
    padding: 10,
    textAlign: 'right'
  },
  action: {
    '& + &': {
      marginLeft: 10
    }
  },
  content: {
    padding: 10
  }
});

const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    onAdd: {
      type: Function as PropType<(idx: number) => void>,
      required: true
    },
    onRemove: {
      type: Function as PropType<(idx: number) => void>,
      required: true
    },
    onUp: {
      type: Function as PropType<(idx: number) => void>,
      required: true
    },
    onDown: {
      type: Function as PropType<(idx: number) => void>,
      required: true
    },
    index: {
      type: Number as PropType<number>,
      required: true
    }
  },
  setup(props, { slots, emit }) {
    const classes = useStyles().value;

    return () => {
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button
              class={classes.action}
              onClick={() => props.onAdd(props.index)}
            >
              新增
            </button>
            <button
              class={classes.action}
              onClick={() => props.onRemove(props.index)}
            >
              删除
            </button>
            <button
              class={classes.action}
              onClick={() => props.onUp(props.index)}
            >
              上移
            </button>
            <button
              class={classes.action}
              onClick={() => props.onDown(props.index)}
            >
              下移
            </button>
          </div>
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      );
    };
  }
});

/**
 * 1.
 * {
 *  items: {type: string}
 * }
 *
 * 2.
 * {
 *  items: [
 *    {type: 'string'},
 *    {type: 'number'}
 *  ]
 * }
 *  3.
 * {
 *    items: {type: string, enum: ['1','2']}
 * }
 */

export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext();

    const handleArrayItemChange = (v: unknown, idx: number) => {
      const { value } = props;
      const arr = Array.isArray(value) ? value : [];
      arr[idx] = v;
      props.onChange(arr);
    };

    const handleAdd = (index: number) => {
      const { value, onChange } = props;
      const arr = Array.isArray(value) ? value : [];
      arr.splice(index + 1, 0, undefined);
      onChange(arr);
    };

    const handleRemove = (index: number) => {
      const { value, onChange } = props;
      const arr = Array.isArray(value) ? value : [];
      arr.splice(index, 1);
      onChange(arr);
    };

    const handleUp = (index: number) => {
      if (index < 1) return;
      const { value, onChange } = props;
      const arr = Array.isArray(value) ? value : [];
      const item = arr.splice(index, 1).pop();
      arr.splice(index - 1, 0, item);
      onChange(arr);
    };

    const handleDown = (index: number) => {
      console.log(index);
      const { value, onChange } = props;
      const arr = Array.isArray(value) ? value : [];
      if (index >= arr.length - 1) return;
      const item = arr.splice(index, 1).pop();
      arr.splice(index + 1, 0, item);
      onChange(arr);
    };

    return () => {
      const SchemaItem = context.SchemaItem;
      const { schema, rootSchema, value } = props;

      const isMultiType = Array.isArray(schema.items);
      const isSelect = schema.items && (schema.items as any).enum;
      // 1. items是数组
      if (isMultiType) {
        const items = schema.items as Schema[];
        const arr = Array.isArray(value) ? value : [];
        return items.map((s: Schema, idx: number) => {
          return (
            <SchemaItem
              key={idx}
              schema={s}
              rootSchema={rootSchema}
              value={arr[idx]}
              onChange={(v) => {
                handleArrayItemChange(v, idx);
              }}
            />
          );
        });
      } else if (!isSelect) {
        // 2
        const arr = Array.isArray(value) ? value : [];
        const items = schema.items as Schema;

        return arr.map((v: unknown, idx: number) => {
          return (
            <ArrayItemWrapper
              index={idx}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onUp={handleUp}
              onDown={handleDown}
            >
              <SchemaItem
                schema={items}
                rootSchema={rootSchema}
                value={v}
                key={idx}
                onChange={(v) => handleArrayItemChange(v, idx)}
              ></SchemaItem>
            </ArrayItemWrapper>
          );
        });
      } else {
        const enumOptions = (schema as any).items.enum;

        const options = enumOptions.map((i: unknown) => {
          return {
            key: Date.now() + random(100),
            value: i,
            label: i
          };
        });
        return (
          <Select
            options={options}
            onChange={props.onChange}
            value={props.value}
          />
        );
      }
    };
  }
});
