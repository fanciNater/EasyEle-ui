<template>
  <el-form-item
    class="e-form-render-item"
    :label="formConfig.label || ' '"
    :required="formConfig.required"
    :style="{ width: componentWidth }"
  >
    <slot></slot>
  </el-form-item>
</template>

<script>
export default {
  name: 'EFormRenderItem',
  props: {
    formConfig: {
      type: Object,
      default: () => {
        return {
          label: ''
        }
      }
    }
  },
  computed: {
    componentWidth() {
      return `${this.formConfig.width * 25}%`
    }
  }
}
</script>
