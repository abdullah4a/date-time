import { DateTimeInput, DateTimePayload } from './../types/DateType';
import { PublicAxios } from "../config/axios";

export default {
    getDateTime(params?: Record<string, any>) {
        return PublicAxios.get('/', { params: { ...params } })
    },
    post(payload: DateTimeInput|DateTimePayload|string) {
        return PublicAxios.post('/', payload)
    }
}