import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import Router from './router'
import { ApiConfig } from '@ctsy/api-sdk'

//@ts-ignore
import VueSignaturePad from 'vue-signature-pad'
import Vant from 'vant'
import './config'
import './css/index.less'
ApiConfig.Debug = true
const app = createApp(App)
  .use(createPinia())
  .use(Router)
  .use(Vant)
  .use(VueSignaturePad)

app.mount('#app')
