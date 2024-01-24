import axios, { AxiosRequestConfig, AxiosError } from 'axios'
const config: AxiosRequestConfig = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  baseURL: import.meta.env.VITE_DATA_URL
}
export const AuthAxios = axios.create(config)
export const PublicAxios = axios.create(config)

const onSuccess = (config: AxiosRequestConfig) => {
  return config
}
const onError = (error:AxiosError) => {
    throw error
}

// using request interceptor for the AuthAxios
AuthAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  const source = axios.CancelToken.source()
  config.cancelToken = source.token
  console.log('intercept:', { config })
  const session = localStorage.getItem('session') as string
  if (!session) {
    source.cancel('no session found in localStorage')
  }

  const { token } = JSON.parse(session)
  // if no token found, abort request return to login page
  if (!token) {
    source.cancel('token not found')
  }

  config.headers.Authorization = `Bearer ${token}`

  return config
}, onError)

AuthAxios.interceptors.response.use(onSuccess as any, onError)
PublicAxios.interceptors.response.use(onSuccess as any, onError)
