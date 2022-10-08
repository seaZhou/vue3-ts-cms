import { IRootState } from './../../types'
import { Module } from 'vuex'
import { ISystemState, IPagePayload } from './types'
import {
  getPageList,
  deletePageData,
  newPageData,
  editPageData
} from '@/service/main/system/system'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersTotalCount: 0,
      usersList: [],
      departmentTotalCount: 0,
      departmentList: [],
      menuList: [],
      roleTotalCount: 0,
      roleList: []
    }
  },
  mutations: {
    changeUsersTotalCount(state, totalCount: number) {
      state.usersTotalCount = totalCount
    },
    changeUsersList(state, userList: any) {
      state.usersList = userList
    },
    changeDepartmentTotalCount(state, totalCount: number) {
      state.departmentTotalCount = totalCount
    },
    changeDepartmentList(state, departmentList: any) {
      state.departmentList = departmentList
    },
    changeMenuList(state, menuList: any) {
      state.menuList = menuList
    },
    changeRoleTotalCount(state, totalCount: number) {
      state.roleTotalCount = totalCount
    },
    changeRoleList(state, roleList: any) {
      state.roleList = roleList
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
        case 'department':
          commit('changeDepartmentTotalCount', totalCount)
          commit('changeDepartmentList', list)
          break
        case 'menu':
          commit('changeMenuList', list)
          break
        case 'role':
          commit('changeRoleTotalCount', totalCount)
          commit('changeRoleList', list)
          break
      }
    },
    // 删除
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
    },
    // 新增
    async newPageDataAction({ dispatch }, payload: IPagePayload) {
      const pageUrl = `/${payload.pageName}/`
      const pageData = payload.queryInfo
      await newPageData(pageUrl, pageData)
      dispatch('getPageListDataAction', {
        pageName: payload.pageName,
        queryInfo: { offset: 0, size: 10 }
      })
    },
    // 编辑
    async editPageDataAction({ dispatch }, payload: IPagePayload) {
      const pageUrl = `/${payload.pageName}/${payload.id}`
      const pageData = payload.queryInfo
      await editPageData(pageUrl, pageData)
      dispatch('getPageListDataAction', {
        pageName: payload.pageName,
        queryInfo: { offset: 0, size: 10 }
      })
    }
  }
}
export default systemModule
