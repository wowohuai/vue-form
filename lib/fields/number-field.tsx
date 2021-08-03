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
    const handleChange = (e: any) => {
      const num = Number(e.target.value);

      props.onChange(num);
    };
    return () => {
      const { value } = props;

      return <input type="number" value={value} onInput={handleChange} />;
    };
  }
});
