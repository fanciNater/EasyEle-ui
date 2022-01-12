import FormConfigComponents from './form-config-list/form-config-components'
import FormConfigWarpper from './form-config-warpper.vue'

FormConfigWarpper.install = (Vue) => {
  Object.keys(FormConfigComponents).forEach((key) => {
    const comp = FormConfigComponents[key]
    Vue.component(comp.name, comp)
  })
  Vue.component(FormConfigWarpper.name, FormConfigWarpper)
}

export default FormConfigWarpper
