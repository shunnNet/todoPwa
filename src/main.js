import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import 'vue-multiselect/dist/vue-multiselect.css'
import VueMultiselect from 'vue-multiselect'
import fontAwesome from './plugins/fontAwesome'
import { vfmPlugin } from 'vue-final-modal'
import '@/assets/scss/all.scss'

const app = createApp(App)

app.component('VueMultiselect', VueMultiselect)

app.use(router).use(vfmPlugin).use(fontAwesome)

app.mount('#app')
