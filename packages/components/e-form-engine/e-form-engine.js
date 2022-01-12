import FormItemConfig from './form-components-config/index'

class EFormEngine {
  constructor(formItem) {
    this.formItem = formItem
    this.formItemConfig = FormItemConfig
  }

  // 返回组件的全部配置
  getComponentByFormType() {
    let config
    try {
      config = this.formItemConfig.find(
        (item) => item.componentConfig.componentType === this.formItem.componentType
      )
    } catch (error) {
      console.error('')
    }
    return config
  }

  getComponentBaseConfig() {
    let config
    try {
      config = this.formItemConfig.find(
        (item) => item.componentConfig.componentType === this.formItem.componentType
      ).editConfig
    } catch (error) {
      console.error('')
    }
    return config
  }
}

export default EFormEngine
