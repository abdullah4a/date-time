<script setup lang="ts">
import { provide } from 'vue';
import DateTime from './components/DateTime.vue'
provide('width', window.innerWidth)
document.addEventListener('resize', () => {
  provide('width', window.innerWidth);
  console.log(window.innerWidth);
})
</script>

<template>
  <div class="mt-20 flex flex-row justify-center">
    <div class="container">
      <DateTime />
    </div>
  </div>
</template>
