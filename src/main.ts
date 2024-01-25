import './plugins/axios'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'

createApp(App)
.use(createPinia())
.use(VueTailwindDatepicker)
.mount('#app')
