<script setup lang="ts">
import { Ref, onBeforeMount, ref } from "vue";
import { DateTimeInput, DateTimePayload } from "../types/DateType"
import { AxiosResponseError } from "../types/api/Response"
import DateTimePicker from "./DateTimePicker.vue";
import { parseDateToPayload } from '../utils/dateTimeParsePayload'
import AlertComponent from "./common/AlertComponent.vue";
import moment from "moment";
import { services } from "../services";
/**
 * Properties
 */
const date: Ref<DateTimeInput> = ref({
  startDate: "",
  endDate: "",
})
const timeType = ref("12 hours (AM/PM)")
const dateOnly = ref(false)
const timeOnly = ref(false)
const timeFormatChange = ref(false)
const showMessage = ref(false);
const readySubmit = ref(false);
const payload: Ref<DateTimeInput | DateTimePayload | string> = ref('')
const message = ref({
  title: "",
  text: "",
  type: ""
})
const timeFormat = ref("HH:mm:ss")
const formatter = ref({
  date: 'DD-MM-YYYY~HH:mm:ss',
  month: 'MM',
})
/**
 * @Methods
 */
const getDate = async () => {
  try {
    const { data } = await services.dateTime.getDateTime()
    console.log(data);

  } catch (err: AxiosResponseError | any) {
    const { message: msg, code } = err
    showAlertMessage(msg, `Error!${code?' with '+code:''}`, 'error')
  }
}
const showAlertMessage = (text: string, title: string, type: string) => {
  showMessage.value = true
  message.value = {
    text,
    title,
    type
  }
  setTimeout(() => {
    showMessage.value = false
  }, 3000)
}
/**
 *  @Hooks
 */
onBeforeMount(() => {
  getDate()
});
const parseDate = () => {
  if (!dateOnly.value) {
    const longPayload: DateTimePayload | undefined | boolean = parseDateToPayload(date.value)
    readySubmit.value = true
    payload.value = JSON.stringify(longPayload)
  } else {
    readySubmit.value = true
    payload.value = JSON.stringify({ ...date.value })
  }
}
const getNewDate = (newDate: DateTimeInput) => {
  date.value = newDate;
  parseDate();
}
const makeHalfTime = (amPm: boolean) => {
  const title = amPm ? "24 hours" : "12 hours (AM/PM)"
  date.value = { startDate: "", endDate: "" }
  formatter.value = {
    date: `DD-MM-YYYY~${amPm ? 'hh:mm:ss A' : 'HH:mm:ss'}`,
    month: ''
  }
  timeType.value = title
}
const getTime = (time: string) => {
  const formattedTime = moment(time, "HH:mm:ss").format(timeFormat.value)
  payload.value = formattedTime
  readySubmit.value = true
}
const changeDateType = () => {
  dateOnly.value = !dateOnly.value
  formatter.value = {
    date: dateOnly.value ? 'DD-MM-YYYY' : 'DD-MM-YYYY~HH:mm:ss',
    month: '',
  }
}
const changeTimeFormat = () => {
  timeFormat.value = timeFormatChange.value ? "HH:mm:ss" : "h:mm:ss A"
}
const clearPayload = () => {
  payload.value = '';
  readySubmit.value = false;
}
const submit = async () => {
  try {
    const { data } = await services.dateTime.post(payload.value)
    console.log(data);

  } catch (err: AxiosResponseError | any) {
    const { message: msg, code } = err
    showAlertMessage(msg, `Error!${code?' with '+code:''}`, 'error')
  }
}
</script>

<template>
  <div class="grow">
    <h2 class="text-3xl font-bold">{{ 'Select Date' }}</h2>
    <hr class="" />
    <div class="flex flex-row justify-start items-start my-4">
      <div class="flex flex-col justify-start" v-if="!timeOnly">
        <div class="">
          {{ 'Date' }}
        </div>
        <div>
          <div class="flex flex-row justify-start my-2">
            <button type="button" v-if="!dateOnly"
              class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              @click="makeHalfTime(timeType === '12 hours (AM/PM)')">{{ timeType }}</button>
            <button type="button"
              class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              @click="changeDateType">
              {{ !dateOnly ? "Short Date" : "Long Date" }}
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-start ml-4">
        <div class="">
          {{ 'Time Only' }}
        </div>
        <div>
          <div class="flex flex-row justify-start my-2">
            <button type="button"
              class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              @click="timeOnly = !timeOnly">
              {{ !timeOnly ? "Time Only" : "Date and Time" }}
            </button>
            <button type="button" v-if="timeOnly"
              class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              @click="() => {
                timeFormatChange = !timeFormatChange
                clearPayload()
                changeTimeFormat()
              }">
              {{ timeFormatChange ? "12 Hours" : "24 hours" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full md:w-2/4" v-if="showMessage">
      <AlertComponent :type="message.type" :title="message.title" :text="message.text" />
    </div>
    <div class="flex flex-row justify-start items Start my-2">
      <DateTimePicker :value="date" :formatter="formatter" :timePicker="timeOnly" :rangePicker="true"
        :timeFormat="timeFormat" @newDate="getNewDate" @update:time="getTime" @clear:payload="clearPayload" />
    </div>
    <div v-if="readySubmit" class="mt-10">
      <div class="my-4">
        Payload is: {{ payload }}
      </div>
      <button type="button"
        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-green-900 focus:outline-none bg-white border border-green-200 hover:bg-green-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-green-200 dark:focus:ring-green-700 dark:bg-green-800 dark:text-green-400 dark:border-green-600 dark:hover:text-white dark:hover:bg-green-700"
        @click="submit">
        Submit
      </button>
    </div>
  </div>
</template>