<template>
  <div class="nav-header">
    qwe
    <i
      class="menu-icon"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useMenuIcon from '../hooks/useMenuIconHook'
export default defineComponent({
  emits: ['foldChange'],
  setup(props, ctx) {
    const [isFold, handleFoldClick] = useMenuIcon({ emit: ctx.emit })
    return {
      isFold,
      handleFoldClick
    }
  }
})
</script>
<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  flex: 1;

  .menu-icon {
    font-size: 28px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
