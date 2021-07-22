import { createApp, defineComponent, h } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

// import App from './App.vue';
import src from './assets/logo.png';

const App = defineComponent({
  render() {
    return h('div', { id: 'app' }, [
      h('img', {
        alt: 'vue logo',
        src: src
      }),
      h(HelloWorld, {
        msg: 'aaaaa',
        age: 12
      })
    ]);
  }
});

createApp(App).mount('#app');
