import { version } from '../package.json'
// 组件
import TestModule from './components/test-module/index'

// 插件
import ERequestPlugin from './plugins/request/e-request'

const components = [TestModule]

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
  ERequestPlugin
}
