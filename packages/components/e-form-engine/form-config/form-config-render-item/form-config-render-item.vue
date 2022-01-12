<template>
  <el-form-item class="form-config-render-item" :label="label">
    <slot></slot>
  </el-form-item>
</template>

<script>
export default {
  name: 'FormConfigRenderItem',
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  computed: {}
}
</script>
