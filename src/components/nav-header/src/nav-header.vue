<template>
  <div class="nav-header">
    <i
      class="menu-icon"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <hp-breadcrumb :breadcrumbs="breadcrumbs"></hp-breadcrumb>
      <nav-info></nav-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import useMenuIcon from '../hooks/useMenuIconHook'
import HpBreadcrumb from '@/base-ui/breadcrumb'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { pathMapToMenu } from '@/utils/map-menu'
import NavInfo from './nav-info.vue'
export default defineComponent({
  emits: ['foldChange'],
  components: { HpBreadcrumb, NavInfo },
  setup(props, ctx) {
    const [isFold, handleFoldClick] = useMenuIcon({ emit: ctx.emit })
    // 获取菜单列表
    const breadcrumbs = computed(() => {
      const path = useRoute().path
      const userMenus = useStore().state.login.userMenus
      return pathMapToMenu(userMenus, path)
    })
    return {
      isFold,
      handleFoldClick,
      breadcrumbs
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
