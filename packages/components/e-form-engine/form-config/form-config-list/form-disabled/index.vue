<template>
  <div class="form-config-switch form-disabled">
    <form-config-render-item label="是否禁用">
      <el-switch v-model="formValue" :width="32">
      </el-switch>
    </form-config-render-item>
  </div>
</template>

<script>
import FormConfigMixin from '../form-config.mixin'
export default {
  name: 'FormDisabled',
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
