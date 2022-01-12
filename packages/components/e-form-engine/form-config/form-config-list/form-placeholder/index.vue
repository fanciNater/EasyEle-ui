<template>
  <div class="form-placeholder">
    <form-config-render-item label="提示">
      <el-input v-model="formValue" :clearable="true" placeholder="请输入"></el-input>
    </form-config-render-item>
  </div>
</template>

<script>
import FormConfigMixin from '../form-config.mixin'
export default {
  name: 'FormPlaceholder',
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
