import { createApp } from 'vue'
import registerApp from './global'
import './service/axios_demo'
import App from './App.vue'
import router from './router'
import store from './store'
const app = createApp(App)
app.use(store)
app.use(registerApp)
app.use(router).mount('#app')
