/*
 * @Author: fanciNate
 * @Date: 2022-01-10 22:29:15
 * @LastEditTime: 2022-01-12 21:49:41
 * @LastEditors: fanciNate
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/packages/components/e-form-engine/form-build-wrapper.mixin.js
 */
import EFormEngine from './e-form-engine'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String | Number,
      default: function() {
        return ''
      }
    },
    formConfig: {
      type: Object,
      default: function() {
        return {}
      }
    },
    formData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    renderSence: {
      type: String,
      default: 'render'
    }
  },
  computed: {
    computedRenderSenceComponent() {
      const eFormEngine = new EFormEngine(this.formConfig).getComponentByFormType().renderConfig
      return eFormEngine[this.renderSence]
    }
  }
}
