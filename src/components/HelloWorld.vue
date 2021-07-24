<template>
  <div class="hello">{{ age }}</div>
  <p>{{ name }}: {{ name2 }}</p>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watchEffect } from 'vue';

const PropType = {
  msg: String,
  age: {
    type: Number,
    required: true
  } as const
};

export default defineComponent({
  name: 'HelloWorld',
  props: PropType,
  mounted() {
    this.age;
  },
  setup() {
    const state = reactive({ name: 'ashuai' });

    const name2 = computed(() => state.name + '2');

    watchEffect(() => {
      console.log(state.name);
    });

    setInterval(() => {
      state.name += '1';
    }, 1000);

    return {
      ...toRefs(state),
      name2
    };
  }
});
</script>
