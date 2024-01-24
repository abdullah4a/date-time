<script setup lang="ts">
import { onMounted } from "vue";
import {useDateTimeStore} from "../store/dateTime"
const dateStore = useDateTimeStore()


onMounted(() => {
  dateStore.getDate().then((result: string) => {
    console.log(result);
  }).catch((err: string) => {
    console.error(err);
  });
});
</script>

<template>
  <div class="text-3xl font-bold underline">
    {{ dateStore.dateCal }}
  </div>
</template>