/*
 * @Author: your name
 * @Date: 2020-09-28 17:14:19
 * @LastEditTime: 2020-11-20 16:07:56
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/packages/index.js
 */
import { version } from '../package.json'
import AssetLoader from './assets-loader'
// 组件
import EEllipsis from './components/e-ellipsis/index'
import ETagGroup from './components/e-tag-group/index'
import ESvgIcon from './components/e-svg-icon/index'

// 插件
import ERequestPlugin from './plugins/request/e-request'
import ELodashPlugin from './plugins/lodash/e-lodash'

const components = [EEllipsis, ETagGroup, ESvgIcon]

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

export default {
  version,
  install,
  EEllipsis,
  ETagGroup,
  ESvgIcon,
  ERequestPlugin,
  ELodashPlugin,
  AssetLoader
}
