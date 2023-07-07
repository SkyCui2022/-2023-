import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import { ApiConfig } from '@ctsy/api-sdk'
import pinia from './store/pinia'
import { DatePicker } from '@nutui/nutui'


import 'skycuipubliccss/css/index.css'
import '@nutui/nutui/dist/style.css'

//@ts-ignore
import VueSignaturePad from 'vue-signature-pad'
import Vant from 'vant'
import './config'
import './css/index.less'
import 'element-plus/dist/index.css'
ApiConfig.Debug = true
const app = createApp(App)
  .use(pinia)
  .use(Router)
  .use(Vant)
  .use(DatePicker)
  .use(VueSignaturePad)

app.mount('#app')
