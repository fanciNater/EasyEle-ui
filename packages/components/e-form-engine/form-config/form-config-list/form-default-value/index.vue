<template>
  <div class="form-default-value">
    <form-config-render-item label="默认值">
      <el-input
        v-model="formValue"
        :clearable="true"
        :maxlength="200"
        placeholder="请输入"
      ></el-input>
    </form-config-render-item>
  </div>
</template>

<script>
import FormConfigMixin from '../form-config.mixin'
export default {
  name: 'FormDefaultValue',
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
