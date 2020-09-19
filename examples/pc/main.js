import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import elementUi from 'element-ui'

import './assets/scss/index.scss'
import demoBlock from './components/demo-block.vue'
import TestModule from '../../packages/components/test-module/index'
import EEllipsis from '../../packages/components/e-ellipsis/index'

Vue.config.productionTip = false

Vue.use(elementUi)

Vue.component('test-module', TestModule)
Vue.component('demo-block', demoBlock)
Vue.component('e-ellipsis', EEllipsis)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
