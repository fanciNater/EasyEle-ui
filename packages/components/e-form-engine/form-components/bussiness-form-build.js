import FormBuildWarpper from './form-build-wrapper.vue'

import FormComponents from './bussiness-form-component'

FormBuildWarpper.install = (Vue) => {
  Object.keys(FormComponents).forEach((key) => {
    const comp = FormComponents[key]
    Vue.component(comp.name, comp)
  })
  Vue.component(FormBuildWarpper.name, FormBuildWarpper)
}

export default FormBuildWarpper
