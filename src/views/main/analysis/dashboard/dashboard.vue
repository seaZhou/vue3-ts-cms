<template>
  <div class="dashboard">
    <!-- 顶部数据统计 -->
    <el-row :gutter="20">
      <template v-for="item in topPanelDatas" :key="item.title">
        <el-col :span="6">
          <statistical-panel :panelData="item"></statistical-panel>
        </el-col>
      </template>
    </el-row>

    <!-- 中间图标 -->
    <el-row :gutter="20">
      <el-col :span="7">
        <hp-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </hp-card>
      </el-col>
      <el-col :span="10">
        <hp-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </hp-card>
      </el-col>
      <el-col :span="7">
        <hp-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </hp-card>
      </el-col>
    </el-row>

    <!-- 底部 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <hp-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </hp-card>
      </el-col>
      <el-col :span="12">
        <hp-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsSale"></bar-echart>
        </hp-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import StatisticalPanel from '@/components/statistical-panel'
import HpCard from '@/base-ui/card'
import {
  PieEchart,
  MapEchart,
  RoseEchart,
  LineEchart,
  BarEchart
} from '@/components/page-charts'
export default defineComponent({
  name: 'dashboard',
  components: {
    StatisticalPanel,
    PieEchart,
    HpCard,
    MapEchart,
    RoseEchart,
    LineEchart,
    BarEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('analysis/getAnalysisDataAction')
    console.log(store.state.analysis)
    const topPanelDatas = computed(() => store.state.analysis.topPanelDatas)
    const categoryGoodsCount = computed(() => {
      return store.state.analysis.categoryGoodsCount.map((item: any) => {
        return { value: item.goodsCount, name: item.name }
      })
    })
    const addressGoodsSale = computed(() => {
      return store.state.analysis.goodsAddressSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    const categoryGoodsSale = computed(() => {
      const goodsSale = store.state.analysis.categoryGoodsSale
      const labels: string[] = []
      const values: any[] = []
      for (const item of goodsSale) {
        labels.push(item.name)
        values.push(item.goodsCount)
      }
      return { labels, values }
    })
    return {
      topPanelDatas,
      categoryGoodsCount,
      addressGoodsSale,
      categoryGoodsSale
    }
  }
})
</script>
<style scoped lang="less">
.dashboard {
  background-color: #f5f5f5;

  .el-row:not(:last-child) {
    padding-bottom: 20px;
  }
}
</style>
