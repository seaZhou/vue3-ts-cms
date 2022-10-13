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
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
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
      name: cacheName,
      password: cachePassword
    })
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const loginAction = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.accountLoginAction(isKeep.value)
      }
    }
    const categories = ref({
      Recent: [
        {
          id: 1,
          title: 'Does drinking coffee make you smarter?',
          date: '5h ago',
          commentCount: 5,
          shareCount: 2
        },
        {
          id: 2,
          title: "So you've bought coffee... now what?",
          date: '2h ago',
          commentCount: 3,
          shareCount: 2
        }
      ],
      Popular: [
        {
          id: 1,
          title: 'Is tech making coffee better or worse?',
          date: 'Jan 7',
          commentCount: 29,
          shareCount: 16
        },
        {
          id: 2,
          title: 'The most innovative things happening in coffee',
          date: 'Mar 19',
          commentCount: 24,
          shareCount: 12
        }
      ],
      Trending: [
        {
          id: 1,
          title: 'Ask Me Anything: 10 answers to your questions about coffee',
          date: '2d ago',
          commentCount: 9,
          shareCount: 5
        },
        {
          id: 2,
          title: "The worst advice we've ever heard about coffee",
          date: '4d ago',
          commentCount: 1,
          shareCount: 2
        }
      ]
    })
    return {
      account,
      currentTab,
      isKeep,
      loginAction,
      accountRef,
      categories
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
