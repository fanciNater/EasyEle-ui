import { version } from '../package.json'
// 组件
import TestModule from './components/test-module/index'
import EEllipsis from './components/e-ellipsis/index'
import ETagGroup from './components/e-tag-group/index'

// 插件
import ERequestPlugin from './plugins/request/e-request'

const components = [TestModule, EEllipsis, ETagGroup]

const plugins = [ERequestPlugin]

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
  ERequestPlugin
}
