import { defineStore } from 'pinia'
import { services } from '../services';
interface DateTimeState {
  dateTime: string
}
export const useDateTimeStore = defineStore('dateTime', {
  state: (): DateTimeState => ({ dateTime: "" }),
  getters: {
    dateCal: (state: DateTimeState) => state.dateTime
  },
  actions: {
    getDate(_params?:Record<string, any>) {
      return new Promise<string>((resolve, _reject) => {
        if (this.dateTime) {
          resolve(this.dateTime)
        } else {
          // services.dateTime.getDateTime(_params).then(res=>{
          //   this.dateTime = res.data
          // resolve(this.dateTime)
          // }).catch(err=>{
          //   _reject(err)
          // })
          setTimeout(()=>{
            this.dateTime = "2021-09-30"
            resolve("2021-09-30")
            },500)
        }
      });
    }
  },
})
