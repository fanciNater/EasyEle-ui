<template>
  <e-form-render-item class="form-date-picker" :formConfig="formConfig">
    <template v-if="renderSence === 'render'">
      <!-- 表单生成模式 -->
    </template>
    <template v-if="renderSence === 'edit'">
      <!-- 表单编辑模式 -->
    </template>
    <template v-if="renderSence === 'read'">
      <e-ellipsis :maxLines="1" :label="formValue || '-'"></e-ellipsis>
    </template>
  </e-form-render-item>
</template>

<script>
import EComponentMixin from '../../e-form-render-item/e-component.mixin'

export default {
  name: 'FormDatePicker',
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
