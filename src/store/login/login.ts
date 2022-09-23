import type { Module } from 'vuex'
import type { ILoginState } from './types'
import type { IRootState } from '../types'
import router from '@/router'

import {
  accountLoginRequest,
  getUserById,
  getUserMenus
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { menuMapToRoutes } from '@/utils/map-menu'

const login: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: {},
      permissions: []
    }
  },
  getters: {},
  mutations: {
    saveToken(state, token: string) {
      state.token = token
    },
    saveUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    saveUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 根据菜单映射路由
      const routes = menuMapToRoutes(userMenus)
    }
  },
  actions: {
    async accountLoginAction(
      { commit },
      account: { name: string; password: string }
    ) {
      // 1.用户登录
      const loginResult = await accountLoginRequest(account)
      const { token, id } = loginResult
      console.log(token, id)
      commit('saveToken', token)
      localCache.setCache('token', token)

      // 2.获取用户信息
      const userInfo = await getUserById(id)
      console.log('userInfo---->>', userInfo)
      commit('saveUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      // 3.用户菜单树
      const userMenus = await getUserMenus(id)
      console.log('userMenus---->>', userMenus)
      commit('saveUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      router.push('/main')
    },
    loadLocalCache({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('saveToken', token)
        dispatch('getInitalDataAction')
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('saveUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('saveUserMenus', userMenus)
      }
    }
  }
}
export default login
