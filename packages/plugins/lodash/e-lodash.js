import lodash from 'lodash'

const genericInstall = (Vue) => {
  Vue.lodash = lodash
  Object.defineProperties(Vue.prototype, {
    $lodash: {
      get() {
        return lodash
      }
    }
  })
}

const LodashPlugin = {
  install(Vue, options) {
    if (options && options.name) {
      Vue['_' + options.name] = lodash
      Object.defineProperties(Vue.prototype, {
        [options.name]: {
          get() {
            return lodash
          }
        }
      })
    }
    genericInstall(Vue)
  },
  lodash: lodash
}

export default LodashPlugin
