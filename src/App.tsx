import { defineComponent, reactive, ref } from 'vue';
import src from './assets/logo.png';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  setup() {
    const state = reactive({ name: 'ashuai' });

    const numberRef = ref(0);

    // let noRefNumber = 0;

    setInterval(() => {
      state.name += 1;
      numberRef.value += 1;
      // noRefNumber += 1;
    }, 1000);

    // const number = numberRef.value;  // invalid

    return () => {
      // setup 仅在组件初始化的时候执行一次
      // 响应式对象的变化会因其返回函数的重新执行
      const number = numberRef.value;
      return (
        <div id="app">
          <img alt="vue logo" src={src} />
          <p>
            {state.name} + '-' + {number}
          </p>
          <HelloWorld age={18} />
        </div>
      );
    };
  }
});
