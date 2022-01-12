import EFormRenderItem from './e-form-render-item.vue'

export default {
  components: {
    EFormRenderItem
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
  },
  watch: {
    'formConfig.defaultValue': {
      handler(val) {
        if (this.renderSence === 'render') {
          this.formValue = val
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    if (this.renderSence === 'edit' && this.formConfig.defaultValue && !this.formValue) {
      this.formValue = this.formConfig.defaultValue
    }
  }
}
