/*
 * @Author: your name
 * @Date: 2020-09-28 17:14:19
 * @LastEditTime: 2020-12-08 19:25:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/examples/pc/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import elementUi from 'element-ui'

import './assets/scss/index.scss'

import ELodash from '../../packages/plugins/lodash/e-lodash'

import demoBlock from './components/demo-block.vue'
import WaterMark from '../demos/water-mark.vue'
import EEllipsis from '../../packages/components/e-ellipsis/index'
import ETable from '../../packages/components/e-table/index'
import EWaterMark from '../../packages/components/e-water-mark/index'
import TagGroup from '../../packages/components/e-tag-group/index'

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

Vue.use(demoBlock)
Vue.use(EEllipsis)
Vue.use(ETable)
Vue.use(ELodash)
Vue.use(EWaterMark)

Vue.component('water-mark', WaterMark)
Vue.component('demo-block', demoBlock)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
