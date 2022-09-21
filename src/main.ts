import { createApp } from 'vue'
import registerApp from './global'
import hpRequest from './service/index'
import App from './App.vue'
import router from './router'
import store from './store'
const app = createApp(App)
app.use(store)
app.use(registerApp)
app.use(router).mount('#app')
hpRequest.request({
  url: 'public/organ/list',
  method: 'GET'
})
