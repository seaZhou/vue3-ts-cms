import type { Module } from 'vuex'
import type { ILoginState } from './types'
import type { IRootState } from '../types'
import router from '@/router'

import { accountLoginRequest } from '@/service/login/login'
import localCache from '@/utils/cache'

const login: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      sysUser: {},
      userMenu: {},
      permissions: []
    }
  },
  getters: {},
  mutations: {
    saveToken(state, token: string) {
      state.token = token
    },
    saveuserInfo(state, sysUser: any) {
      state.sysUser = sysUser
    }
  },
  actions: {
    async accountLoginAction(
      { commit },
      account: { username: string; password: string }
    ) {
      // 用户登录
      const loginResult = await accountLoginRequest(account)
      const { token, sysUser } = loginResult
      console.log(sysUser, 'Denlu')
      commit('saveToken', token)
      localCache.setCache('token', token)
      // 获取用户信息
      // commit('saveuserInfo', sysUser)
      localCache.setCache('sysUser', sysUser)
      router.push('/Home')
    }
  }
}
export default login
