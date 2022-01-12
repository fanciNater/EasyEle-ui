<template>
  <div>
    <component :is="getConfigComponentName" v-model="value[getConfigValueCode]"></component>
  </div>
</template>

<script>
import FormConfig from './form-config'

export default {
  name: 'FormConfigWarpper',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      default: function() {
        return {}
      }
    },
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    getConfigComponentName() {
      return new FormConfig(this.type).getFormConfigInstance()
    },
    getConfigValueCode() {
      return new FormConfig(this.type).getFormConfigCode()
    }
  }
}
</script>
