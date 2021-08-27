/**
  @author: zhangxiang
  @date: 2021-08-10 23:09:51
  @desc：form-item 组件

*/
import { defineComponent } from 'vue';
import { CommonWidgetPropsDefine } from '../types';
import { createUseStyles } from 'vue-jss';

const useStyles = createUseStyles({
  container: {},
  label: {
    display: 'block',
    color: '#999'
  },
  errorText: {
    color: 'red',
    fontSize: '12px'
  }
});

const FormItem = defineComponent({
  name: 'FormItem',
  props: CommonWidgetPropsDefine,
  setup(props, { slots }) {
    const classesRef = useStyles();
    return () => {
      const { schema, errors } = props;
      const classes = classesRef.value;
      return (
        <div>
          <label class={classes.label}>{schema.title}</label>
          {slots.default && slots.default()}
          <div class={classes.errorText}>
            {errors?.map((err) => {
              return <li>{err}</li>;
            })}
          </div>
        </div>
      );
    };
  }
});

export function withFormItem(Widget: any): any {
  return defineComponent({
    name: `Wraperd${Widget.name}`,
    props: CommonWidgetPropsDefine,
    setup(props, { attrs, slots }) {
      return () => {
        return (
          <FormItem {...props}>
            <Widget {...props} {...attrs} slots={slots} />
          </FormItem>
        );
      };
    }
  });
}

export default FormItem;
