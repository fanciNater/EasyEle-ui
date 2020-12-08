<!--
 * @Author: your name
 * @Date: 2020-12-08 18:32:50
 * @LastEditTime: 2020-12-08 19:27:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/examples/demos/water-mark.vue
-->
<template>
  <div>
    <e-water-mark ref="EWatermarkRef">
      <div style="width: 100%; height: 300px;"></div>
    </e-water-mark>
  </div>
</template>

<script>
import EWaterMark from '../../packages/components/e-water-mark/src/main'
import '../../lib/theme-chalk/theme/e-water-mark.scss'

export default {
  name: 'WaterMark',
  components: {
    EWaterMark
  },
  mounted() {
    console.log(this.$refs.EWatermarkRef)
    this.$refs.EWatermarkRef.draw({ text: '水印字符串', color: '#FF0000' })
  }
}
</script>

<style lang="scss">
.e-water-mark {
  height: 300px;
}
</style>
