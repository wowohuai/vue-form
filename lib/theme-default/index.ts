/**
  @author: zhangxiang
  @date: 2021-08-08 17:09:58
  @desc：
*/
import { SelectWidget, NumberWidget, TextWidget } from './widget';
import { SelectWidgetNames, CommonWidgetNames } from '../types';

export default {
  widget: {
    [SelectWidgetNames.SELECT]: SelectWidget,
    [CommonWidgetNames.TEXT]: TextWidget,
    [CommonWidgetNames.NUMBER]: NumberWidget
  }
};
