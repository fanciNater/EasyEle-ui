<template>
  <div class="form-width">
    <form-config-render-item label="宽度">
      <el-radio-group v-model="formValue" size="mini">
        <el-radio-button :label="1">
          25%
        </el-radio-button>
        <el-radio-button :label="2">
          50%
        </el-radio-button>
        <el-radio-button :label="3">
          75%
        </el-radio-button>
        <el-radio-button :label="4">
          100%
        </el-radio-button>
      </el-radio-group>
    </form-config-render-item>
  </div>
</template>

<script>
import FormConfigMixin from '../form-config.mixin'

export default {
  name: 'FormWidth',
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
