<!--
  @author: zhangxiang
  @date: 2021-07-25 16:09:31
  @desc：string-field 的SFC实现方式
-->
<template>
  <input type="text" @input="handleChange" :value="value" />
</template>

<script lang="ts" setup>
// script setup sugar reference
// https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
import { defineProps } from 'vue';
import { FieldPropsDefine } from '../types';

const props = defineProps(FieldPropsDefine);

const handleChange = (e: any) => {
  console.log(e);
  props.onChange(e.target.value);
};
</script>
