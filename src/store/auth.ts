import { defineStore} from 'pinia'
interface AuthState{
  token:string|null,
  user: Record<string, any>|null;
}
export const useAuthStore = defineStore('authStore', {
  state: (): AuthState => ({ user: null, token: "" }),
  getters: {
    token: (state: AuthState) => state.token,
    user: (state: AuthState) => state.token,
  },
  actions: {
    getUser(state: AuthState){
      return new Promise((resolve) => resolve(state.user))
    }
  },
})
