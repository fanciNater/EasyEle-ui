<template>
  <div class="e-empty-page">
    <e-svg-icon name="e-empty"></e-svg-icon>
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <span v-else class="empty-text">
      暂无数据
    </span>
  </div>
</template>

<script>
import ESvgIcon from '../../e-svg-icon/src/main.vue'

export default {
  name: 'EEmptyPage',
  components: {
    ESvgIcon
  }
}
</script>
