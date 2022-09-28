<template>
  <div class="page-search">
    <hp-form v-bind="searchConfig" v-model="formData">
      <template #footer>
        <div class="btns">
          <el-button
            size="small"
            icon="el-icon-refresh"
            @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            @click="handleQueryClick"
            type="primary"
            size="small"
            icon="el-icon-search"
            >确定</el-button
          >
        </div>
      </template>
    </hp-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import HpForm, { IForm } from '@/base-ui/from'
interface IFormData {
  [key: string]: any
}
export default defineComponent({
  name: 'page-search',
  components: { HpForm },
  props: {
    title: {
      type: String,
      default: '搜索'
    },
    searchConfig: {
      type: Object as PropType<IForm>,
      required: true
    }
  },
  emits: ['queryBtnClick', 'resetBtnClick'],
  setup(props, { emit }) {
    const originFormData: IFormData = {}
    const formItems = props.searchConfig.formItems ?? []
    for (const formItem of formItems) {
      originFormData[`${formItem.field}`] = ''
    }

    const formData = ref<IFormData>({ ...originFormData })
    const handleResetClick = () => {
      for (const key in originFormData) {
        formData.value[`${key}`] = originFormData[key]
      }
      emit('resetBtnClick')
    }

    const handleQueryClick = () => {
      console.log(formData.value)
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>
<style lang="less" scoped>
.page-search {
  background: #fff;
  box-shadow: 0px 0px 20px 0px rgba(209, 217, 227, 0.25);
  border-radius: 16px;
  margin-bottom: 24px;
}
</style>
