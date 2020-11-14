import Vue from 'vue'
import App from './App.vue'
import router from './router'

import elementUi from 'element-ui'

import './assets/scss/index.scss'
import demoBlock from './components/demo-block.vue'
import TestModule from '../../packages/components/test-module/index'
import EEllipsis from '../../packages/components/e-ellipsis/index'

Vue.config.productionTip = false

const Demos = []

function importDemos(r) {
  r.keys().forEach((key) => {
    Demos.push(r(key).default)
  })
}
importDemos(require.context('../demos', true, /\.vue$/))
Demos.map((component) => Vue.component(component.name, component))

Vue.use(elementUi)

Vue.component('test-module', TestModule)
Vue.component('demo-block', demoBlock)
Vue.component('e-ellipsis', EEllipsis)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
