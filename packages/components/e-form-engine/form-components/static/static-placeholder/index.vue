<template>
  <e-form-render-item class="static-placeholder" :formConfig="formConfig">
    <span :style="{ color: formConfig.colorPicker }" class="text-container">
      <e-ellipsis :label="formConfig.placeholder" :maxLines="1"></e-ellipsis>
    </span>
  </e-form-render-item>
</template>

<script>
import EComponentMixin from '../../e-form-render-item/e-component.mixin'

export default {
  name: 'FormStaticPlaceholder',
  mixins: [EComponentMixin]
}
</script>
