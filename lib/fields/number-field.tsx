/**
  @author: zhangxiang
  @date: 2021-07-25 15:53:53
  @desc：
*/
import { defineComponent } from 'vue';
import { FieldPropsDefine, CommonWidgetNames } from '../types';
import { getWidget } from 'lib/theme';

export default defineComponent({
  name: 'NumberField',
  props: FieldPropsDefine,
  setup(props) {
    const NumberWidget = getWidget(CommonWidgetNames.NUMBER);
    const handleInputChange = (v: number) => {
      props.onChange(v);
    };
    return () => {
      return (
        <NumberWidget.value value={props.value} onChange={handleInputChange} />
      );
    };
  }
});
