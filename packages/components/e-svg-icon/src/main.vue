<!--
 * @Author: fanciNate
 * @Date: 2020-12-12 10:53:10
 * @LastEditTime: 2021-04-07 14:57:20
 * @LastEditors: fanciNate
 * @Description: In User Settings Edit
 * @FilePath: /vsCodeProjects/EasyEle-ui/packages/components/e-svg-icon/src/main.vue
-->
<template>
  <div class="e-svg-icon">
    <svg
      class="svg-icon"
      :class="className"
      :style="{ width: width + 'px', height: height + 'px' }"
      aria-hidden="true"
    >
      <use :xlink:href="iconName"></use>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'ESvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 24
    },
    height: {
      type: Number,
      default: 24
    }
  },
  computed: {
    iconName() {
      return `#svg-${this.name}`
    },
    className() {
      return `svg-${this.name}`
    }
  }
}
</script>
