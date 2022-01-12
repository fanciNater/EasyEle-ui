<template>
  <e-form-render-item class="form-textarea" :formConfig="formConfig">
    <template v-if="renderSence === 'render'">
      <!-- 表单生成模式 -->
      <el-input
        v-model="formValue"
        type="textarea"
        :readonly="true"
        :clearable="true"
        :resize="'none'"
        :autosize="{ minRows: 4, maxRows: 6 }"
        :disabled="formConfig.disabled"
        :maxlength="formConfig.maxlength || 2000"
        :show-word-limit="true"
        :placeholder="formConfig.placeholder"
      ></el-input>
    </template>
    <template v-if="renderSence === 'edit'">
      <!-- 表单编辑模式 -->
      <el-input
        v-model="formValue"
        type="textarea"
        :clearable="true"
        :resize="'none'"
        :autosize="{ minRows: 4, maxRows: 6 }"
        :disabled="formConfig.disabled"
        :maxlength="formConfig.maxlength || 2000"
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
  name: 'FormTextarea',
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
