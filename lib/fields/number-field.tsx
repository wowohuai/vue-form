/**
  @author: zhangxiang
  @date: 2021-07-25 15:53:53
  @desc：
*/
import { defineComponent } from 'vue';
import { FieldPropsDefine } from '../types';

export default defineComponent({
  name: 'NumberField',
  props: FieldPropsDefine,
  setup(props) {
    return () => {
      const { onChange, value } = props;
      const handleChange = (e: any) => {
        const num = Number(e.target.value);
        if (Number.isNaN(num)) {
          onChange(undefined);
        } else {
          onChange(Number(e.target.value));
        }
      };
      return <input type="number" value={value} onInput={handleChange} />;
    };
  }
});
