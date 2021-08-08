/**
  @author: zhangxiang
  @date: 2021-07-25 15:47:23
  @desc：
*/
import { defineComponent } from 'vue';
import { FieldPropsDefine, CommonWidgetNames } from '../types';
import { getWidget } from 'lib/theme';

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {
    const TextWidget = getWidget(CommonWidgetNames.TEXT);
    const handleChange = (v: string) => {
      console.log(v);
      // props.onChange(v);
    };
    return () => {
      return <TextWidget.value value={props.value} onChange={handleChange} />;
    };
  }
});
