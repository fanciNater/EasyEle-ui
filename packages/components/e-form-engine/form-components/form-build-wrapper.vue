<template>
  <component
    :is="computedRenderSenceComponent"
    v-model="formData[formConfig.formValueCode]"
    :formConfig="formConfig"
    :formData="formData"
    :renderSence="renderSence"
  ></component>
</template>

<script>
import FormBuildWarpperMixin from '../form-build-wrapper.mixin'

export default {
  name: 'FormBuildWarpper',
  mixins: [FormBuildWarpperMixin]
}
</script>
