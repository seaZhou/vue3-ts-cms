<template>
  <div class="nav-info">
    <div class="info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            size="medium"
            class="avater"
            src="https://avatars.githubusercontent.com/u/45349892?s=40&v=4"
          ></el-avatar>
          <span class="name">Jason</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              icon="el-icon-circle-close"
              @click="handleExitClick"
              >退出系统</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-info" divided
              >个人信息</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-unlock">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="operation">
      <span><i class="el-icon-bell"></i></span>
      <span><i class="el-icon-chat-dot-round"></i></span>
      <span>
        <span class="dot"></span>
        <i class="el-icon-postcard"></i>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'
export default defineComponent({
  name: 'nav-info',
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)
    const router = useRouter()
    const handleExitClick = () => {
      localCache.deleteCache('token')
      router.push('/main')
    }
    return {
      name,
      handleExitClick
    }
  }
})
</script>
<style scoped lang="less">
.nav-info {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  color: #176afe;

  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;

    .avatar {
      width: 30px;
      height: 30px;
    }
    .name {
      margin-left: 8px;
      color: #176afe;
    }
  }

  .operation {
    margin-right: 20px;
    span {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 35px;
      line-height: 35px;

      &:hover {
        background: #f2f2f2;
      }

      i {
        font-size: 20px;
      }

      .dot {
        position: absolute;
        top: 3px;
        right: 3px;
        z-index: 10;
        width: 6px;
        height: 6px;
        background: red;
        border-radius: 100%;
      }
    }
  }
}
</style>
