<template>
    <div class="w-full md:w-2/4">
        <vue-tailwind-datepicker v-model="dateVal" :as-single="width < 1000" :use-range="rangePicker" separator="  to  "
            :formatter="formatter" :shortcuts="width > 1000" />
    </div>
</template>

<script lang="ts">
import VueTailwindDatePicker from "vue-tailwind-datepicker";
export default {
    emits: ['newDate'],
    inject: ['width'],
    props: {
        value: {
            type: Object,
            required: true,
        },
        formatter: {
            type: Object,
            required: true,
        },
        rangePicker:{
            type: Boolean,
            required: true,
        }
    },
    components: {
        VueTailwindDatePicker,
    },
    created() {
        this.dateVal = {
            startDate: this.value['startDate'],
            endDate: this.value['endDate']
        }
    },
    data() {
        return {
            dateVal: { startDate: "", endDate: "" },
        }
    },
    watch: {
        formatter: {
            immediate: true,
            deep: true,
            handler(newValue) {
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
                    this.$emit('newDate', newValue)
                }
            }
        }
    },
}
</script>