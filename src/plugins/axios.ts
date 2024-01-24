import { App } from 'vue'
import { AuthAxios, PublicAxios } from '../config/axios'

export default {
  install(app: App) {
    // provide axios, and add to global properties
    app.config.globalProperties.AuthAxios = AuthAxios
    app.provide('AuthAxios', AuthAxios)
    app.config.globalProperties.PublicAxios = PublicAxios
    app.provide('PublicAxios', PublicAxios)
  }
}