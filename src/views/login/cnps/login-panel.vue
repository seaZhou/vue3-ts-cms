<template>
  <div class="login-panel">
    <el-tabs type="border-card" v-model="currentTab" stretch>
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i>账号登录</span>
        </template>
        <login-account v-model="account" ref="accountRef"></login-account>
      </el-tab-pane>
    </el-tabs>
    <div class="control-account">
      <el-checkbox v-model="isKeep">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="loginAction">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import localCache from '@/utils/cache'
import LoginAccount from './login-account.vue'
export default defineComponent({
  components: {
    LoginAccount
  },
  setup() {
    const currentTab = ref('account')
    const isKeep = ref(true)
    const cacheName = localCache.getCache('name') ?? ''
    const cachePassword = localCache.getCache('password') ?? ''
    const account = reactive({
      username: cacheName,
      password: cachePassword
    })
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const loginAction = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.accountLoginAction(isKeep.value)
      }
    }
    return {
      account,
      currentTab,
      isKeep,
      loginAction,
      accountRef
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
  }

  .control-account {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
