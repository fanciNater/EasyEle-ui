<template>
  <e-form-render-item class="form-input-number" :formConfig="formConfig">
    <template v-if="renderSence === 'render'">
      <!-- 表单生成模式 -->
      <el-input-number
        v-model="formValue"
        controls-position="right"
        :readonly="true"
        :clearable="true"
        :precision="2"
        :disabled="formConfig.disabled"
        :maxlength="formConfig.maxlength"
        :placeholder="formConfig.placeholder"
      ></el-input-number>
    </template>
    <template v-if="renderSence === 'edit'">
      <!-- 表单编辑模式 -->
      <el-input-number
        v-model="formValue"
        controls-position="right"
        :clearable="true"
        :precision="2"
        :disabled="formConfig.disabled"
        :maxlength="formConfig.maxlength"
        :placeholder="formConfig.placeholder"
      ></el-input-number>
    </template>
    <template v-if="renderSence === 'read'">
      <div class="form-item-read">
        <e-ellipsis mode="origin" :label="formValue || '-'"></e-ellipsis>
      </div>
    </template>
  </e-form-render-item>
</template>

<script>
import EComponentMixin from '../../e-form-render-item/e-component.mixin'

export default {
  name: 'FormInputNumber',
  mixins: [EComponentMixin],
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
