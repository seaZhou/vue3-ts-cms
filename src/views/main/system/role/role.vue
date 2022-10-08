<template>
  <div class="role">
    <page-search
      :searchConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentConfig="contentTableConfig"
      @editBtnClick="handleEditData"
      pageName="role"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      pageName="role"
      :modalConfig="modalConfig"
      :defaultInfo="modalInfo"
      :otherInfo="otherInfo"
    >
      <el-tree
        class="menu-tree"
        ref="elTreeRef"
        :data="roleMenus"
        show-checkbox
        node-key="id"
        @check="handleMenuCheckChange"
        :props="{ label: 'name', children: 'children' }"
      ></el-tree>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'
import { getMenuChecks } from '@/utils/map-menu'
import { ElTree } from 'element-plus'

export default defineComponent({
  components: { PageSearch, PageContent, PageModal },
  setup() {
    // 查询，重置
    const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()

    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      nextTick(() => {
        const checks = getMenuChecks(item.menuList)
        elTreeRef.value?.setCheckedKeys(checks, true)
      })
    }

    // 处理hooks
    const [modalInfo, pageModalRef, handleNewData, handleEditData] =
      usePageModal(undefined, undefined)

    const otherInfo = ref({})
    const handleMenuCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      console.log(menuList)
      otherInfo.value = { menuList }
    }

    // 角色选中菜单数据
    const store = useStore()
    const roleMenus = computed(() => store.state.entireMenus)
    return {
      searchFormConfig,
      contentTableConfig,
      handleQueryClick,
      handleResetClick,
      pageContentRef,
      handleEditData,
      handleNewData,
      pageModalRef,
      modalInfo,
      modalConfig,
      otherInfo,
      roleMenus,
      elTreeRef,
      handleMenuCheckChange
    }
  }
})
</script>

<style scoped lang="less">
.role {
  .menu-tree {
    padding: 0 32px;
  }
}
</style>
