<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-show="!collapse" class="title">Jason-CMS</span>
    </div>
    <el-menu
      :default-active="currentItemId"
      class="el-menu-vertical"
      :collapse="collapse"
      text-color="#333"
      active-text-color="#fff"
    >
      <template v-for="item in menus" :key="item.id">
        <!-- 判断二级菜单 -->
        <template v-if="item.children && item.children.length">
          <el-submenu :index="item.id + ''">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.id + ''"
            @click="handleItemClick(item)"
            :key="item.id"
          >
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store'
import { pathMapToMenu } from '@/utils/map-menu'
export default defineComponent({
  name: 'nav-menu',
  props: {
    collapse: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup() {
    // 1.获取menus
    const store = useStore()
    const menus = store.state.login.userMenus
    console.log(menus)
    // 记录选中的index
    const router = useRouter()
    const route = useRoute()
    const menu = pathMapToMenu(menus, route.path)

    const currentItemId = ref<string>(menu.id + '')
    const handleItemClick = (item: any) => {
      currentItemId.value = item.id + ''
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return {
      menus,
      currentItemId,
      handleItemClick
    }
  }
})
</script>
<style scoped lang="less">
@br: 20px;
@bg: #fff;
@ht: 52px;
@blg: linear-gradient(90deg, #176afe 0%, #33a3ff 100%);
@ft: 16px;
.nav-menu {
  height: 100%;
  background-color: @bg;

  .logo {
    display: flex;
    height: @ht;
    padding: 0 0 26px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: @ft;
      font-weight: 700;
      color: #176afe;
    }
  }

  // 目录
  .el-menu {
    border-right: none;
  }
  .el-submenu {
    background-color: @bg !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      background-color: @bg !important;
    }
    .el-menu-item:hover {
      background: #f8fbff !important;
      border-radius: @br;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: @bg !important;
  }
  // hover 高亮
  .el-menu-item:hover {
    color: #176afe !important; // 菜单
  }

  .el-menu-item.is-active {
    background: @blg;
    border-radius: @br;
  }
  .el-menu-item.is-active:hover {
    background: @blg !important;
    color: @bg !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - @ht);
}
</style>
