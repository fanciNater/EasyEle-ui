<template>
  <div class="form-maxlength">
    <form-config-render-item label="文本长度">
      <el-input v-model.number="formValue" :clearable="true" placeholder="请输入"></el-input>
    </form-config-render-item>
  </div>
</template>

<script>
import FormConfigMixin from '../form-config.mixin'
export default {
  name: 'FormMaxlength',
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
