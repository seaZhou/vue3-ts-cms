<template>
  <div class="nav-menu">
    <el-menu
      :default-active="currentItemId"
      class="el-menu-vertical"
      background-color="#0c2135"
      :collapse="collapse"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
    </el-menu>
  </div>
</template>

<script lang="ts">
import { userInfo } from 'os'
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const menus = [{}]
    // const menu = pathMapToMenu(menus, route.path)
    // const currentItemId = ref<string>(menu.id + '')
  }
})
</script>

<style></style>
