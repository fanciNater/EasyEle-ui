import FormConfigList from './form-config-list/index'
class FormConfig {
  constructor(type) {
    this.type = type
  }

  getFormConfigInstance() {
    let instanceName
    try {
      instanceName = FormConfigList.find((item) => item.formTypeCode === this.type).formInstanceName
    } catch (error) {
      console.error('表单配置类型有误，请检查拼写是否正确--获取name')
    }
    return instanceName
  }

  getFormConfigCode() {
    let formValueCode
    try {
      formValueCode = FormConfigList.find((item) => item.formTypeCode === this.type)
        .formConfigValueCode
    } catch (error) {
      console.error('表单配置类型有误，请检查拼写是否正确--获取code')
    }
    return formValueCode
  }
}

export default FormConfig
