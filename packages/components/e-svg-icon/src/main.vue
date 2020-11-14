<template>
  <div class="x-svg-icon">
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
