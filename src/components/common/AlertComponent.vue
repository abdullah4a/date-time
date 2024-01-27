<script setup lang="ts">
const props = defineProps(['type', 'title', 'text']);
</script>

<template>
  <div v-if="props.type === 'success'"
    :class="`rounded bg-green-100  p-4 text-green-800 md:p-5 dark:bg-green-950 dark:bg-opacity-75 dark:text-green-100`">
    <div class="mb-2 flex items-center">
      <h3 class="font-semibold">{{ props.title }}</h3>
    </div>
    <p class="ml-8">
      {{ props.text }}
      <slot name="btn"></slot>
    </p>
  </div>
  <div v-if="props.type === 'error'"
    :class="`rounded bg-red-100 p-4 text-red-500 md:p-5 dark:bg-red-500 dark:bg-opacity-75 dark:text-red-100`">
    <div class="mb-2 flex items-center">
      <h3 class="font-semibold">{{ props.title }}</h3>
    </div>
    <p class="ml-8">
      {{ props.text }}
      <slot name="btn"></slot>
    </p>
  </div>
</template>
