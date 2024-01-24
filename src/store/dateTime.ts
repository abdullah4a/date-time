import { defineStore } from 'pinia'
interface DateTimeState {
  dateTime: string
}
export const useDateTimeStore = defineStore('dateTime', {
  state: (): DateTimeState => ({ dateTime: "" }),
  getters: {
    dateCal: (state: DateTimeState) => state.dateTime
  },
  actions: {
    getDate() {
      return new Promise<string>((resolve, reject) => {
        if (this.dateTime) {
          resolve(this.dateTime)
        } else {
          let now = new Date();
          this.dateTime = `${now}`;
          reject("Date Not Found")
        }
      });
    }
  },
})
