import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/index.css'
import 'normalize.css'

// import './styles/element_theme.less'

import router from './router'
import store, { setupStore } from './store'

import registerApp from './global'

const app = createApp(App)
app.use(registerApp)
setupStore()
app.use(router).use(store).mount('#app')
