<template>
  <!-- 面包屑封装 -->
  <div class="hp-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <template v-for="item in breadcrumbs" :key="item.path">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from '../types'
export default defineComponent({
  name: 'hp-breadcrumb',
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>
