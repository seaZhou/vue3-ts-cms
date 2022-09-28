<template>
  <div class="page-modal">
    <el-dialog
      :title="modalConfig.title"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <hp-form v-bind="modalConfig" v-model="formData"></hp-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import HpForm from '@/base-ui/from'
import { useStore } from '@/store'
export default defineComponent({
  name: 'page-modal',
  components: { HpForm },
  props: {
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    modalConfig: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    // 绑定属性
    const originFormData: any = {}
    const formData = ref({ ...originFormData })
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 2.内部处理
    const dialogVisible = ref(false)
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          queryInfo: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新增
        store.dispatch('system/newPageDataAction', {
          pageName: props.pageName,
          queryInfo: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      formData,
      dialogVisible,
      handleConfirmClick
    }
  }
})
</script>
<style lang="less" scoped>
.page-modal {
  /deep/ .el-dialog {
    border-radius: 16px;
    .el-dialog__body {
      padding: 0;
      .el-row .el-col {
        padding: 0 0 20px;
        &.el-col:last-child {
          padding: 0;
        }
      }
    }
  }
}
</style>
