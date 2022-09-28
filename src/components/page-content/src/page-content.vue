<template>
  <div class="page-content">
    <hp-table
      v-bind="contentConfig"
      :listData="pageListData"
      :totalCount="totalCount"
      v-model:page="pageInfo"
    >
      <!-- <template #headerHandler> 1232 </template> -->
      <template #status="scope">
        {{ $filters.showStatus(scope.row.enable) }}
      </template>
      <template #create="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #update="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template #handler="scope">
        <div class="handler">
          <el-button
            v-if="isUpdate"
            type="text"
            size="mini"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            type="text"
            size="mini"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
    </hp-table>
  </div>
</template>
<script lang="ts">
import HpTable from '@/base-ui/table'
import { defineComponent, watch, ref, computed } from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/usePermission'
export default defineComponent({
  name: 'page-content',
  components: { HpTable },
  props: {
    contentConfig: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    // 按钮是否显示
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delet')
    // 1.请求页面数据
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })
    watch(pageInfo, () => getPageData())
    const store = useStore()

    // 2.获取数据
    let otherQueryInfo = {}
    const getPageData = (otherInfo: any = {}) => {
      // if (!isQuery) return
      otherQueryInfo = otherInfo
      store.dispatch('system/getPageListDataAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...otherInfo
        }
      })
    }
    getPageData()

    // 获取页面数据
    const pageListData = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const totalCount = computed(() =>
      store.getters['system/pageListDataCount'](props.pageName)
    )

    // 操作
    const handleDeleteClick = (rowItem: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...otherQueryInfo
        },
        id: rowItem.id
      })
    }

    const handleEditClick = (rowItem: any) => {
      console.log(rowItem)
    }
    return {
      getPageData,
      pageListData,
      pageInfo,
      totalCount,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleEditClick
    }
  }
})
</script>
<style lang="less" scoped>
.page-content {
  background: #fff;
  border-radius: 16px;
}
</style>
