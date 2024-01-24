<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useDateTimeStore } from "../store/dateTime"
/**
 * Properties
 */
const dateStore = useDateTimeStore()
const date = ref("")
/**
 * Methods
 */
const getDate = () => {
  dateStore.getDate().then((result: string) => {
    if (result) {
      date.value = result;
    } else {
      alert('Failed to get the current time');
    }
  }).catch((err: string) => {
    console.error(err);
  });
}

/**
 *  Hooks
 */
onBeforeMount(() => {
  getDate()
});
</script>

<template>
  <div class="text-3xl font-bold underline">
    {{ date }}
  </div>
</template>