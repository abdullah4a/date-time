import { defineStore } from 'pinia'
import { DateTimeInput } from '../types/DateType';
interface DateTimeState {
  dateTime: DateTimeInput
}
export const useDateTimeStore = defineStore('dateTime', {
  state: (): DateTimeState => ({
    dateTime: {
      startDate: '',
      endDate: ''
    }
  }),
  getters: {
    dateCal: (state: DateTimeState) => state.dateTime
  },
  actions: {
    getDate(_params?: Record<string, any>) {
      return new Promise<DateTimeInput>((resolve, _reject) => {
        if (this.dateTime) {
          resolve(this.dateTime)
        } else {
          // services.dateTime.getDateTime(_params).then(res=>{
          //   this.dateTime = res.data
          // resolve(this.dateTime)
          // }).catch(err=>{
          //   _reject(err)
          // })
          setTimeout(() => {
            this.dateTime = {
              startDate: "2018-05-30 ",
              endDate: "2019-06-14"
            }
            resolve(this.dateTime)
          }, 500)
        }
      });
    }
  },
})
