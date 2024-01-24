import { PublicAxios } from "../config/axios";

export default {
    getDateTime(params?: Record<string, any>) {
        return PublicAxios.get('/', { params: { ...params } })
    }
}