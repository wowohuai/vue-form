/**
  @author: zhangxiang
  @date: 2021-07-25 15:47:23
  @desc：
*/
import { defineComponent } from 'vue';
import { FieldPropsDefine } from '../types';

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {
    return () => {
      const { onChange } = props;
      const value: any = props.value;
      const handleChange = (e: any) => {
        onChange(e.target.value);
      };

      return <input value={value} onInput={handleChange} />;
    };
  }
});
