import { IRootState } from './../../types'
import { Module } from 'vuex'
import { ISystemState, IPagePayload } from './types'
import { getPageList, deletePageData } from '@/service/main/system/system'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersTotalCount: 0,
      usersList: []
    }
  },
  mutations: {
    changeUsersTotalCount(state, totalCount: number) {
      state.usersTotalCount = totalCount
    },
    changeUsersList(state, userList: any) {
      state.usersList = userList
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        const listData: any[] = (state as any)[`${pageName}List`] ?? []
        return listData
      }
    },
    pageListDataCount(state) {
      return (pageName: string) => {
        const listCount = (state as any)[`${pageName}TotalCount`] ?? 0
        return listCount
      }
    }
  },
  actions: {
    // 请求数据
    async getPageListDataAction({ commit }, payload: IPagePayload) {
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      if (pageUrl.length === 0) return
      const { totalCount, list } = await getPageList(pageUrl, payload.queryInfo)
      switch (payload.pageName) {
        case 'users':
          commit('changeUsersTotalCount', totalCount)
          commit('changeUsersList', list)
          break
      }
    },
    async deletePageDataAction({ dispatch }, payload: IPagePayload) {
      const pageName = payload.pageName
      const deleteId = payload.id
      if (!deleteId) return
      const pageUrl = `/${pageName}/${deleteId}`
      await deletePageData(pageUrl)
      dispatch('getPageListDataAction', {
        pageName: payload.pageName,
        queryInfo: { offset: 0, size: 10 }
      })
    }
  }
}
export default systemModule
