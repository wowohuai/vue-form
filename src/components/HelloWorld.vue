<template>
  <div class="hello">{{ age }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
  }
});
</script>
