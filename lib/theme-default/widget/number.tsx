/**
  @author: zhangxiang
  @date: 2021-08-08 23:08:55
  @desc：
*/
import { defineComponent } from 'vue';
import { CommonWidgetPropsDefine, CommonWidgetDefine } from '../../types';

const NumberWidget: CommonWidgetDefine = defineComponent({
  name: 'Text',
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleInputChange = (e: any) => {
      const num = Number(e.target.value);
      console.log(num);
      if (Number.isNaN(num)) {
        props.onChange(undefined);
      } else {
        props.onChange(num);
      }
      e.target.value = props.value;
    };
    return () => {
      return (
        <input type="number" value={props.value} onInput={handleInputChange} />
      );
    };
  }
});

export default NumberWidget;
