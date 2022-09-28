<template>
  <div class="user">
    <page-search
      :searchConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentConfig="contentTableConfig"
      @editBtnClick="handleEditData"
      pageName="users"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfigRef"
      :defaultInfo="modalInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { IFormItem } from '@/base-ui/from'

export default defineComponent({
  components: { PageSearch, PageContent, PageModal },
  setup() {
    // 查询，重置
    const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()

    // 配置信息
    const modalConfigRef = computed(() => {
      const roleOption: IFormItem | undefined = modalConfig.formItems?.find(
        (item) => item.field === 'roleId'
      )
      return modalConfig
    })
    const newHandleCallback = () => {
      const passwordItem = modalConfigRef.value.formItems?.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }

    const editHandleCallback = () => {
      const passwordItem = modalConfigRef.value.formItems?.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }

    // 处理hooks
    const [modalInfo, pageModalRef, handleNewData, handleEditData] =
      usePageModal(newHandleCallback, editHandleCallback)
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
      modalConfigRef
    }
  }
})
</script>

<style scoped></style>
