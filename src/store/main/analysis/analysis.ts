import { Module } from 'vuex'
import { IAnalysis } from './types'
import { IRootState } from '@/store/types'
import {
  getAmountList,
  getCategoryGoodsCount,
  getGoodsAddressSale,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getGoodsSaleTop10
} from '@/service/main/analysis/analysis'
const analysisModule: Module<IAnalysis, IRootState> = {
  namespaced: true,
  state() {
    return {
      topPanelDatas: [],
      categoryGoodsCount: [],
      goodsAddressSale: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      goodsSaleTop10: []
    }
  },
  mutations: {
    changeTopPanelDatas(state, list) {
      state.topPanelDatas = list
    },
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeGoodsSaleTop10(state, list) {
      state.goodsSaleTop10 = list
    },
    changeGoodsAddressSale(state, list) {
      state.goodsAddressSale = list
    }
  },
  actions: {
    async getAnalysisDataAction({ commit }) {
      const resultTopPanelDatas = await getAmountList()
      commit('changeTopPanelDatas', resultTopPanelDatas)

      const goodsCount = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', goodsCount)

      const addressSasle = await getGoodsAddressSale()
      commit('changeGoodsAddressSale', addressSasle)

      const goodsSale = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', goodsSale)

      const goodsFavor = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', goodsFavor)

      const saleTop10 = await getGoodsSaleTop10()
      commit('changeGoodsSaleTop10', saleTop10)
    }
  }
}
export default analysisModule
