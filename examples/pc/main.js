import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/scss/index.scss'
import demoBlock from './components/demo-block.vue'
import TestModule from '../../packages/components/test-module/index'

Vue.config.productionTip = false

// Vue.use(TestModule)

Vue.component('test-module', TestModule)
Vue.component('demo-block', demoBlock)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
