import '@/assets/index.css'
import 'iconify-icon'

import { createPinia } from 'pinia'
import { plugin } from '@formkit/vue'
import config from '@base/formkit.config'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, config)

app.mount('#app')
