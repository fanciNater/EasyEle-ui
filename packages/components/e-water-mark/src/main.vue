<!--
 * @Author: fanciNate
 * @Date: 2020-12-08 17:46:55
 * @LastEditTime: 2020-12-08 18:30:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/packages/components/e-water-mask/src/main.vue
-->
<template>
  <div ref="EWatermark" class="e-water-mark">
    <div class="container">
      <slot></slot>
    </div>
    <canvas ref="EWatermarkCanvas" class="e-water-mark-canvas"></canvas>
  </div>
</template>

<script>
class Watermark {
  draw(EWatermark, EWatermarkCanvas, settings) {
    const defaultSettings = new DefaultSettings()
    // 设置外部传入的settings
    if (settings) {
      for (const key of Object.keys(settings)) {
        defaultSettings[key] = settings[key]
      }
    }

    const fullWidth = EWatermark.offsetWidth
    const fullHeight = EWatermark.offsetHeight

    if (defaultSettings.cols === 0) {
      defaultSettings.cols = this.calcCols(
        defaultSettings.angle,
        fullWidth,
        fullHeight,
        defaultSettings.startX,
        defaultSettings.xSpace,
        defaultSettings.width
      )
    }
    if (defaultSettings.rows === 0) {
      defaultSettings.rows = this.calcRows(
        defaultSettings.angle,
        fullWidth,
        fullHeight,
        defaultSettings.startX,
        defaultSettings.ySpace,
        defaultSettings.height
      )
    }
    const context = EWatermarkCanvas.getContext('2d')
    const ratio = this.getPixelRatio(context)
    EWatermarkCanvas.width = fullWidth * ratio
    EWatermarkCanvas.height = fullHeight * ratio
    context.scale(ratio, ratio)
    context.font = defaultSettings.font
    context.fillStyle = defaultSettings.color
    context.globalAlpha = defaultSettings.alpha
    context.textAlign = 'left'
    context.textBaseline = 'middle'
    context.rotate(defaultSettings.angle * (Math.PI / 180))
    let x = 0
    let y = 0
    for (
      let i = defaultSettings.angle === 0 ? 0 : -defaultSettings.rows;
      i < defaultSettings.rows;
      i++
    ) {
      y = defaultSettings.startY + (defaultSettings.ySpace + defaultSettings.height) * i
      for (
        let j = defaultSettings.angle === 0 ? 0 : -(defaultSettings.cols / 2);
        j < defaultSettings.cols + defaultSettings.cols / 2;
        j++
      ) {
        x = defaultSettings.startX + (defaultSettings.xSpace + defaultSettings.width) * j
        const canText = defaultSettings.text.split('\n') || ['默认水印']
        canText.forEach((item, index) => {
          context.fillText(item, x, y + (index + 1) * 16, defaultSettings.width)
        })
      }
    }
  }
  calcCols(angle, fullWidth, fullHeight, startX, xSpace, width) {
    if (angle === 0) {
      return parseInt((fullWidth - startX + xSpace) / (width + xSpace))
    } else {
      return parseInt(this.getHypotenuse(fullWidth, fullHeight) / (width + xSpace))
    }
  }
  calcRows(angle, fullWidth, fullHeight, startY, ySpace, height) {
    if (angle === 0) {
      return parseInt((fullHeight - startY + ySpace) / (height + ySpace))
    } else {
      return parseInt(this.getHypotenuse(fullWidth, fullHeight) / (height + ySpace))
    }
  }
  getPixelRatio(context) {
    const backingStore =
      context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio ||
      1
    return (window.devicePixelRatio || 1) / backingStore
  }
  getHypotenuse(fullWidth, fullHeight) {
    return Math.sqrt(Math.pow(fullWidth, 2) + Math.pow(fullHeight, 2))
  }
}
class DefaultSettings {
  constructor() {
    this.text = ''
    this.startX = 0
    this.startY = 20
    this.rows = 0
    this.cols = 0
    this.width = 150
    this.height = 100
    this.xSpace = 50
    this.ySpace = 50
    this.color = '#000000'
    this.alpha = 0.1
    this.angle = -15
    this.font = '14px Normal'
  }
}
export default {
  name: 'EWaterMark',
  created() {},
  mounted() {
    this.$emit('mounted')
  },
  methods: {
    draw(settings) {
      const watermark = new Watermark()
      watermark.draw(this.$refs.EWatermark, this.$refs.EWatermarkCanvas, settings)
    }
  }
}
</script>
