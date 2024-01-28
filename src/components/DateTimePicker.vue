<template>
    <div class="w-full md:w-2/4" v-if="!timePicker">
        <vue-tailwind-datepicker v-model="dateVal" ref="datepicker" :as-single="width < 1000" :use-range="rangePicker"
            separator="  to  " :formatter="formatter" :shortcuts="width > 1000" @input="getDate" />
        <div v-if="validationError" :class="{ 'text-red-500': validationError }">
            {{ validationText }}
        </div>
    </div>
    <div class=" w-full md:w-2/4" v-else>
        <div class="relative">
            <input type="time" id="timePicker" name="timePicker" step="1" v-model="time" @input="checkTime" :min="minTime"
                :max="maxTime"
                class="relative block w-full opacity-100 pl-2 pr-12 py-2.5 rounded-lg overflow-hidden border-solid text-sm text-vtd-secondary-700 placeholder-vtd-secondary-400 transition-colors bg-white border border-vtd-secondary-300 focus:border-vtd-primary-300 focus:ring focus:ring-vtd-primary-500 focus:ring-opacity-10 focus:outline-none dark:bg-vtd-secondary-800 dark:border-vtd-secondary-700 dark:text-vtd-secondary-100 dark:placeholder-vtd-secondary-500 dark:focus:border-vtd-primary-500 dark:focus:ring-opacity-20">
            <button type="button"
                class="absolute right-0 top-2 opacity-100 px-2 py-1 mr-1 focus:outline-none hover:border-none focus:border-none border-none text-vtd-secondary-400 dark:text-opacity-70 rounded-md"
                @click="clearTime" v-if="time !== ''">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            </button>
        </div>
        <div :class="'text-red-500'" v-if="timeError || time === ''">
            {{ timeValidationText }}
        </div>
    </div>
</template>

<script lang="ts">
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import moment from "moment"

export default {
    emits: ['newDate', 'update:time', 'clear:payload', 'user:inp'],
    props: {
        value: {
            type: Object,
            required: true,
        },
        formatter: {
            type: Object,
            required: true,
        },
        rangePicker: {
            type: Boolean,
            required: true,
        },
        timePicker: Boolean,
        timeFormat: String,
        minTime: String,
        maxTime: String,
        minuteStep: {
            type: [Number, Array],
            default: [0, 5, 10, 15, 20],
            validator: (value) => {
                if (Array.isArray(value)) {
                    return value.every((item) => typeof item === 'number');
                } else {
                    return typeof value === 'number';
                }
            },
        },
    },
    components: {
        VueTailwindDatePicker,
    },
    created() {
        this.dateVal = {
            startDate: this.value['startDate'],
            endDate: this.value['endDate'],
        }
    },
    data() {
        return {
            dateVal: {
                startDate: '',
                endDate: ''
            },
            width: window.innerWidth,
            validationError: false,
            time: new Date().toLocaleTimeString('en-US', { hour12: false }).substring(0, 5),
            timeError: false,
            timeout: undefined,
            validMinStep: false,
            startDate: "",
            endDate: ""
        }
    },
    computed: {
        validationText() {
            let validationText = ''
            validationText = this.validationError ? 'Date is not according to format' : ''
            const { startDate, endDate } = this.dateVal
            validationText = startDate === '' || endDate === '' ? 'Please, select date(s)' : ''
            return validationText;
        },
        timeValidationText() {
            let timeError = this.timeError ? 'Time is not valid.' : ''
            timeError = this.time === '' ? "Please select time." : ""
            timeError = this.validMinStep ? "Selected minute(s) are not valid. selected Minute(s) Step (is/are) "+this.minuteStep : ""
            return timeError
        }
    },
    methods: {
        checkTime() {
            const parsedTime = moment(this.time, 'HH:mm:ss')
            this.timeError = !parsedTime.isValid() || !this.isValidMinuteStep(parsedTime)
            this.validMinStep = !this.isValidMinuteStep(parsedTime)
            if (!this.timeError) {
                this.$emit('update:time', this.time)
            } else {
                this.$emit('clear:payload')
            }
        },
        checkValidationError({ startDate, endDate }: { startDate: string, endDate: string }) {
            const parsedStartDate = moment(startDate, this.formatter['date'], true)
            const parsedEndDate = moment(endDate, this.formatter['date'], true)
            this.validationError = !parsedStartDate.isValid() && !parsedEndDate.isValid()
            return parsedStartDate.isValid() && parsedEndDate.isValid()
        },
        clearTime() {
            this.time = ''
            this.$emit('clear:payload')
        },
        getDate(event) {
            clearTimeout(this.timeout)
            const { value } = event.target
            this.timeout = setTimeout(() => {
                this.$emit('user:inp')
                this.checkInputtedDate(value)
            }, 300)
        },
        checkInputtedDate(date: string) {
            try {
                const unmaskedValue = date.replace(/[, /]/g, '-')
                const [startDate, endDate] = unmaskedValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3').split(' to ');
                const formattedStartDate = moment(startDate, this.formatter['date']).format(this.formatter['date'])
                const formattedEndDate = moment(endDate, this.formatter['date']).format(this.formatter['date'])
                if (formattedStartDate !== 'Invalid date' && formattedEndDate !== 'Invalid date') {
                    this.dateVal = {
                        endDate: formattedEndDate,
                        startDate: formattedStartDate
                    }
                }
            } catch (error) {
                this.validationError = true
                this.validationText = error as string
            }
        },
        isValidMinuteStep(parsedTime) {
            const minutes = parsedTime.minutes();
            if (typeof this.minuteStep === 'number')
                return minutes % this.minuteStep === 0;
            else if (Array.isArray(this.minuteStep)) {
                return this.minuteStep.some(step => minutes % step === 0);
            }
            else return false
        },
    },
    watch: {
        timeFormat: {
            immediate: true,
            deep: true,
            handler(newValue) {
                if (newValue) {
                    this.time = ''
                }
            }
        },
        formatter: {
            immediate: true,
            deep: true,
            handler(newValue) {
                if (this.$refs.datepicker) {
                    this.$refs.datepicker['clearPicker']()
                }
                if (newValue) {
                    this.dateVal = { startDate: "", endDate: "" }
                }
            }
        },
        dateVal: {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                if (newValue !== oldValue) {
                    const valid = this.checkValidationError(newValue)
                    if (valid) {
                        this.$emit('newDate', newValue)
                    } else {
                        this.$emit('clear:payload')
                    }
                }
            }
        }
    },
}
</script>