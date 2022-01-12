<template>
  <div class="form-label">
    <form-config-render-item label="组件名称">
      <el-input
        v-model="formValue"
        :clearable="true"
        maxlength="30"
        placeholder="请输入"
      ></el-input>
    </form-config-render-item>
  </div>
</template>

<script>
import FormConfigMixin from '../form-config.mixin'
export default {
  name: 'FormLabel',
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
