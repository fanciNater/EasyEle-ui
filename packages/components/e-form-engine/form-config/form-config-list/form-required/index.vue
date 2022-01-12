<template>
  <div class="form-required form-config-switch">
    <form-config-render-item label="是否必填">
      <el-switch v-model="formValue" :width="32">
      </el-switch>
    </form-config-render-item>
  </div>
</template>

<script>
import FormConfigMixin from '../form-config.mixin'
export default {
  name: 'FormRequired',
  mixins: [FormConfigMixin],
  computed: {
    formValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('change', value)
      }
    }
  }
}
</script>
