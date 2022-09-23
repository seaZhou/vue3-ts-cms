<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cnps/login-panel.vue'
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  components: {
    LoginPanel
  }
})
</script>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
