<script setup lang="ts">
import { onMounted } from "vue";
import {useDateTimeStore} from "../store/dateTime"
const dateStore = useDateTimeStore()
// Assuming you want to dispatch the action when the component is mounted
onMounted(() => {
  dateStore.getDate().then((result) => {
    console.log(result);
  }).catch((err) => {
    console.error(err);
  });
});
</script>

<template>
  <div class="text-3xl font-bold underline">
    {{ dateStore.dateCal }}
  </div>
</template>