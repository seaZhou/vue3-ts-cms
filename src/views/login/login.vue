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
  background: #1c92d2; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f2fcfe,
    #1c92d2
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f2fcfe,
    #1c92d2
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
