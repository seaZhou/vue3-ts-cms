import { createStore, Store, useStore as useVuexStore } from 'vuex'
// 封装vuex
import { IRootState } from './types'
import type { IStore } from './types'
import login from './login/login'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'jason',
      entireRoles: [],
      entireDepartments: [],
      entireMenus: []
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login
  }
})
export function useStore(): Store<IStore> {
  return useVuexStore()
}
export default store
