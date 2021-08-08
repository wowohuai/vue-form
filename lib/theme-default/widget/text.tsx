/**
  @author: zhangxiang
  @date: 2021-08-08 23:08:55
  @desc：
*/
import { defineComponent } from 'vue';
import { CommonWidgetDefine, CommonWidgetPropsDefine } from '../../types';

const TextWidget: CommonWidgetDefine = defineComponent({
  name: 'Text',
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleInputChange = (e: any) => {
      props.onChange(e.target.value);
      console.log(props.value);
      e.target.value = props.value;
    };
    return () => {
      return (
        <input type="text" value={props.value} onInput={handleInputChange} />
      );
    };
  }
});

export default TextWidget;
