<script setup lang="ts">
import { Ref, onBeforeMount, ref } from "vue";
import { useDateTimeStore } from "../store/dateTime"
import { DateTimeInput, DateTimePayload } from "../types/DateType"
import DateTimePicker from "./DateTimePicker.vue";
import { parseDateToPayload } from '../utils/dateTimeParsePayload'
/**
 * Properties
 */
const dateStore = useDateTimeStore()
const date: Ref<DateTimeInput> = ref({
  startDate: "",
  endDate: "",
})
const timeType = ref("12 hours (AM/PM)")
const dateOnly = ref(true)
const formatter = ref({
  date: 'DD-MM-YYYY~HH:mm:ss',
  month: 'MM',
})
/**
 * Methods
 */
const getDate = () => {
  dateStore.getDate().then((result: DateTimeInput) => {
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
const parseDate = () => {
  if (dateOnly.value) {
    const longPayload: DateTimePayload|undefined|boolean = parseDateToPayload(date.value, formatter.value.date)
    console.log(longPayload);
  } else {
    const payload: DateTimeInput = { ...date.value };
    console.log(payload);
  }
}
const getNewDate = (newDate: DateTimeInput) => {
  date.value = newDate;
  parseDate();
}
const makeHalfTime = (amPm: boolean) => {
  console.log(amPm);

  const title = amPm ? "24 hours" : "12 hours (AM/PM)"
  date.value = { startDate: "", endDate: "" }
  formatter.value = {
    date: `DD-MM-YYYY~${amPm ? 'hh:mm:ss A' : 'HH:mm:ss'}`,
    month: ''
  }
  timeType.value = title
}
const changeDateType = (format: string) => {
  dateOnly.value = !dateOnly.value
  formatter.value = {
    date: format,
    month: '',
  }
}
</script>

<template>
    <div class="grow">
      <h2 class="text-3xl font-bold">Select Date</h2>
      <hr class="" />
      <div class="flex flex-row justify-start my-4 mx-6">
        <button type="button" v-if="dateOnly"
          class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          @click="makeHalfTime(timeType === '12 hours (AM/PM)')">{{ timeType }}</button>
        <button type="button"
          class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          @click="changeDateType(dateOnly ? 'DD-MM-YYYY' : 'DD-MM-YYYY~HH:mm:ss')">
          {{ dateOnly ? "Short Date" : "Long Date" }}
        </button>
      </div>
      <div class="flex flex-row justify-center my-2">
        <DateTimePicker :value="date" :formatter="formatter" :rangePicker="true" @newDate="getNewDate" />
    </div>
  </div>
</template>