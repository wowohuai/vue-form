/**
  @author: zhangxiang
  @date: 2021-08-08 20:03:49
  @desc：
*/
import {
  computed,
  defineComponent,
  PropType,
  provide,
  inject,
  ComputedRef
} from 'vue';
import { Theme, SelectWidgetNames, CommonWidgetNames } from './types';

const THEME_PROVIDE_KEY = Symbol();

export function getWidget<T extends SelectWidgetNames | CommonWidgetNames>(
  name: T
) {
  const context: ComputedRef<Theme> | undefined =
    inject<ComputedRef<Theme>>(THEME_PROVIDE_KEY);

  if (!context) {
    throw Error('theme is required');
  }

  const widgetRef = computed(() => context.value.widget[name]);
  return widgetRef;
}

export default defineComponent({
  name: 'ThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true
    }
  },
  setup(props, { slots }) {
    /**
     * 因为render函数中未使用到任何props的值, 但是我希望在props更改的时候能够去更新provide的值
     */
    const context = computed(() => props.theme);
    provide(THEME_PROVIDE_KEY, context);

    return () => {
      return slots.default && slots.default();
    };
  }
});
