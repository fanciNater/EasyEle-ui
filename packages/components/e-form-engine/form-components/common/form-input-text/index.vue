<template>
  <e-form-render-item class="form-input-text" :formConfig="formConfig">
    <template v-if="renderSence === 'render'">
      <!-- 表单生成模式 -->
      <el-input
        v-model="formValue"
        :readonly="true"
        :clearable="true"
        :disabled="formConfig.disabled"
        :maxlength="formConfig.maxlength || 200"
        :show-word-limit="true"
        :placeholder="formConfig.placeholder"
      ></el-input>
    </template>
    <template v-if="renderSence === 'edit'">
      <!-- 表单编辑模式 -->
      <el-input
        v-model="formValue"
        :clearable="true"
        :disabled="formConfig.disabled"
        :maxlength="formConfig.maxlength || 200"
        :show-word-limit="true"
        :placeholder="formConfig.placeholder"
      ></el-input>
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
  name: 'FormInputText',
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
