<template>
  <div class="page-content">
    <hp-table>
      <template #headerHandler> 1232 </template>
    </hp-table>
  </div>
</template>
<script lang="ts">
import HpTable from '@/base-ui/table'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'page-content',
  components: { HpTable },
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped></style>
