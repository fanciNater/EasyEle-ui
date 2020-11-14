import { version } from '../package.json'
import AssetLoader from './assets-loader'
// 组件
import TestModule from './components/test-module/index'
import EEllipsis from './components/e-ellipsis/index'
import ETagGroup from './components/e-tag-group/index'
import ESvgIcon from './components/e-svg-icon/index'

// 插件
import ERequestPlugin from './plugins/request/e-request'
import ELodashPlugin from './plugins/lodash/e-lodash'

const components = [TestModule, EEllipsis, ETagGroup, ESvgIcon]

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
  TestModule,
  EEllipsis,
  ETagGroup,
  ESvgIcon,
  ERequestPlugin,
  ELodashPlugin,
  AssetLoader
}
