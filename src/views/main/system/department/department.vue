<template>
  <div class="department">
    <page-search
      :searchConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    />
    <page-content
      ref="pageContentRef"
      :contentConfig="contentTableConfig"
      @editBtnClick="handleEditData"
      pageName="department"
    />
    <page-modal
      ref="pageModalRef"
      pageName="department"
      :modalConfig="modalConfigRef"
      :defaultInfo="modalInfo"
    />
  </div>
</template>

<script lang="ts">
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { defineComponent, computed } from 'vue'
import { modalConfig } from './config/modal.config'

import { useStore } from '@/store'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  components: { PageSearch, PageContent, PageModal },
  setup() {
    const store = useStore()
    const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()
    // 配置信息
    const modalConfigRef = computed(() => {
      const parentIdItem = modalConfig.formItems?.find(
        (item) => item.field === 'parentId'
      )
      parentIdItem!.options = store.state.entireDepartments.map((item) => {
        return { label: item.name, value: item.id }
      })
      return modalConfig
    })

    // 处理modal的hook
    const [modalInfo, pageModalRef, handleNewData, handleEditData] =
      usePageModal()
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleQueryClick,
      handleResetClick,
      modalConfigRef,
      modalInfo,
      pageModalRef,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped></style>
