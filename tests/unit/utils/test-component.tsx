/**
  @author: zhangxiang
  @date: 2021-08-08 22:57:00
  @desc：
*/
import { defineComponent, PropType } from 'vue';
import { Schema } from 'lib/types';
import SchemaForm, { ThemeProvider } from 'lib/index';
import defaultTheme from 'lib/theme-default';

const DefaultThemeProvider = defineComponent({
  setup(props, { slots }) {
    return () => {
      return (
        <ThemeProvider theme={defaultTheme}>
          {slots?.default && slots.default()}
        </ThemeProvider>
      );
    };
  }
});

export default defineComponent({
  name: 'TestComponent',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true,
      type: null
    },
    onChange: {
      type: Function as PropType<(v: unknown) => void>,
      required: true
    }
  },
  setup(props) {
    return () => {
      return (
        <DefaultThemeProvider>
          <SchemaForm {...props} />
        </DefaultThemeProvider>
      );
    };
  }
});
