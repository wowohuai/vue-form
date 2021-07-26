/**
  @author: zhangxiang
  @date: 2021-07-26 21:13:48
  @desc：object-field实现
*/
import { defineComponent, inject } from 'vue';
import { FieldPropsDefine } from '../types';
import { SchemaFormContextKey } from '../context';

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    age: {
      type: 'number'
    }
  }
};

export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine,
  setup(props) {
    const context: any = inject(SchemaFormContextKey);
    console.log(context);

    return () => {
      const { SchemaItem } = context;
      return <div>object-field</div>;
    };
  }
});
