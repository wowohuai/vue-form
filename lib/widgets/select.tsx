/**
  @author: zhangxiang
  @date: 2021-07-29 21:52:38
  @desc：select
*/
import { defineComponent, PropType, ref, watch } from 'vue';

export default defineComponent({
  name: 'SelectWidget',
  props: {
    value: {
      type: null
    },
    onChange: {
      type: Function as PropType<(v: unknown) => void>,
      required: true
    },
    options: {
      type: Array as PropType<
        {
          key: string;
          value: any;
          label: string;
        }[]
      >,
      required: true
    }
  },
  setup(props) {
    const handleChange = (e: any) => {
      console.log(e.target.value);
    };

    const valueRef = ref(props.value);
    watch(valueRef, (newValue) => {
      if (newValue !== props.value) {
        props.onChange(newValue);
      }
    });

    watch(
      () => props.value,
      (v) => {
        if (v !== valueRef.value) {
          valueRef.value === v;
        }
      }
    );

    return () => {
      return (
        <select
          multiple={true}
          onChange={handleChange}
          v-model={valueRef.value}
        >
          {props.options?.map((item) => {
            return (
              <option key={item.key} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      );
    };
  }
});
