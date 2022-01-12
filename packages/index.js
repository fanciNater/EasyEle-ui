/*
 * @Author: your name
 * @Date: 2020-09-28 17:14:19
 * @LastEditTime: 2022-01-10 22:31:32
 * @LastEditors: fanciNate
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/packages/index.js
 */
import { version } from '../package.json'
import AssetLoader from './assets-loader'
// 组件
import EEllipsis from './components/e-ellipsis/index'
import ETagGroup from './components/e-tag-group/index'
import ESvgIcon from './components/e-svg-icon/index'
import EWaterMark from './components/e-water-mark/index'
import EModal from './components/e-modal/index'
import EFormEngine from './components/e-form-engine/index'
import EEmptyPage from './components/e-empty-page'

// 插件
import ERequestPlugin from './plugins/request/e-request'
import ELodashPlugin from './plugins/lodash/e-lodash'

const components = [EEllipsis, ETagGroup, ESvgIcon, EWaterMark, EModal, EEmptyPage]

const plugins = [ERequestPlugin, ELodashPlugin]

const install = function(Vue) {
  // 判断是否安装
  if (install.installed) {
    return
  }

  plugins.forEach((plugin) => {
    Vue.use(plugin)
  })

  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const vueComponents = {
  EEllipsis,
  ETagGroup,
  ESvgIcon,
  EWaterMark,
  EModal,
  EFormEngine,
  EEmptyPage
}

const vuePlugins = {
  ERequestPlugin,
  ELodashPlugin
}

export default {
  version,
  install,
  ...vueComponents,
  ...vuePlugins,
  AssetLoader
}
