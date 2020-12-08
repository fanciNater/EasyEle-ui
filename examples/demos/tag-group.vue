<template>
  <e-tag-group :tags="tags">
    <template v-slot:tag="{ tag, index }">
      {{ tag.label }} {{ index }}
    </template>
  </e-tag-group>
</template>

<style lang="scss">
.demo-card {
  margin-right: 45px;
}
</style>
<script>
import ETagGroup from '../../packages/components/e-tag-group/src/main'
export default {
  name: 'TagGroupDemo',
  components: {
    ETagGroup
  },
  data() {
    return {
      tags: [
        {
          id: 1,
          label: '石头1石头石头1石头'
        },
        {
          id: 2,
          label:
            '石头2石头2石2石头2石头2石头2石头2石头2石头2石头2石头2石头2石头2石头2石头2石头2石头2石头2石头2石头2石头2石头2石头2石头2石头2石头2石头2石头2'
        }
      ]
    }
  }
}
</script>
