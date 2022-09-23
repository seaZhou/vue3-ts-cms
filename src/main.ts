import { createApp } from 'vue'
import registerApp from './global'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
const app = createApp(App)
app.use(store)
setupStore()
app.use(registerApp)
app.use(router).mount('#app')
