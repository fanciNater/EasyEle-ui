import FormConfigRenderItem from '../form-config-render-item/form-config-render-item.vue'

export default {
  components: {
    FormConfigRenderItem
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String | Number | Array | Object
    },
    renderSence: {
      type: String,
      default: 'render'
    },
    formData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    formConfig: {
      type: Object,
      default: function() {
        return {}
      }
    }
  }
}
