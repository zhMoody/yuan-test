import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/fonts.scss'
import '@/styles/fonts/iconfont.js'
import '@/styles/fonts/iconfont.css'
import 'font-awesome/css/font-awesome.css'
import { ElSlider, ElAvatar } from 'element-plus'
import 'element-plus/dist/index.css'
import 'lib-flexible'
import '@/styles/base.css'
import '../mock'
import VueContextMenu from 'vue-contextmenu'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueContextMenu)
app.use(ElSlider)
app.use(ElAvatar)
app.mount('#app')
