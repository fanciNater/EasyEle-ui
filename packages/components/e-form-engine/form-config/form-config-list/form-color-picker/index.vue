<template>
  <div class="form-color-picker form-config-switch">
    <form-config-render-item label="颜色">
      <el-color-picker
        ref="colorPickerRef"
        v-model="formValue"
        size="mini"
        color-format="hex"
        :popper-class="'e-form-color-picker'"
        :predefine="predefine"
        :show-alpha="false"
        @active-change="activeChangeEvent"
      ></el-color-picker>
    </form-config-render-item>
  </div>
</template>

<script>
import FormConfigMixin from '../form-config.mixin'
export default {
  name: 'FormColorPicker',
  mixins: [FormConfigMixin],
  data() {
    return {
      predefine: [
        '#000000',
        '#409EFF',
        '#9D3939',
        '#4C83EA',
        '#EF1F1F',
        '#09DD37',
        '#BCBCBC',
        '#E254FF'
      ]
    }
  },
  computed: {
    formValue: {
      get() {
        return this.value || '#000000'
      },
      set(value) {
        this.$emit('change', value)
      }
    }
  },
  methods: {
    activeChangeEvent() {
      this.$refs.colorPickerRef.hide()
      this.formValue = this.$refs.colorPickerRef.color.value
    }
  }
}
</script>
