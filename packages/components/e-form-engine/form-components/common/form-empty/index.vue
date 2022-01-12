<!--
 * @Author: fanciNate
 * @Date: 2022-01-12 20:34:55
 * @LastEditTime: 2022-01-12 21:12:52
 * @LastEditors: fanciNate
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/packages/components/e-form-engine/form-components/common/form-empty/index.vue
-->
<template>
  <e-form-render-item class="form-empty" :formConfig="formConfig">
    <div
      style="width: 100%;
    display: inline-block;"
    ></div>
  </e-form-render-item>
</template>

<script>
import EComponentMixin from '../../e-form-render-item/e-component.mixin'

export default {
  name: 'FormEmpty',
  mixins: [EComponentMixin]
}
</script>
