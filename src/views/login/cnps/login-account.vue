<template>
  <el-form
    :model="account"
    label-wdith="60px"
    ref="formRef"
    :rules="accountRules"
  >
    <el-form-item label="账号：" prop="username">
      <el-input v-model="account.username"></el-input>
    </el-form-item>
    <el-form-item label="密码：" prop="password">
      <el-input v-model="account.password" show-password></el-input>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, PropType, computed, ref } from 'vue'
import localCache from '@/utils/cache'
import { useStore } from '@/store/index'
import { Account } from '../types'
export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<Account>,
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    console.log(props, 'props')
    const store = useStore()
    const account = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue)
      }
    })
    const accountRules = {
      username: [
        { required: true, message: '必须输入用户名', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '必须输入密码', trigger: 'blur' },
        {
          pattern: /^[a-z0-9]{3,}$/,
          message: '必须是3位以上数字',
          trigger: 'blur'
        }
      ]
    }
    // 验证form的函数
    const formRef = ref<InstanceType<typeof ElForm>>()
    const accountLoginAction = (isKeep: boolean) => {
      // 验证是否成功
      formRef.value?.validate((valid) => {
        if (valid) {
          // 登录逻辑
          const username = account.value.username
          const password = account.value.password
          // 保存账户和密码
          if (isKeep) {
            localCache.setCache('name', username)
            localCache.setCache('password', password)
          }
          // 登录
          console.log(store, 'store')
          store.dispatch('login/accountLoginAction', { username, password })
        }
      })
    }
    return {
      account,
      accountRules,
      formRef,
      accountLoginAction
    }
  }
})
</script>
