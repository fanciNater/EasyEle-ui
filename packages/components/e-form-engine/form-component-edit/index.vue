<!--
 * @Author: fanciNate
 * @Date: 2022-01-10 22:29:15
 * @LastEditTime: 2022-01-12 21:27:01
 * @LastEditors: fanciNate
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/packages/components/e-form-engine/form-component-edit/index.vue
-->
<template>
  <draggable
    v-model="formComponentEditConfig"
    class="form-component-edit"
    :group="{ name: 'XFormEngine', pull: 'clone', put: false }"
    v-bind="{ sort: false }"
    :clone="cloneItemData"
    animation="300"
    chosen-class="chosen"
    :force-fallback="true"
    :move="onMove"
    @end="endMoveEvent"
  >
    <div
      v-for="(item, i) in formComponentEditConfig"
      :key="i + '-'"
      class="edit-item"
      @dblclick="clickToAdd(item)"
    >
      <e-svg-icon :name="formComponentBaseConfig[i].icon"></e-svg-icon>
      <span class="draggable-name">{{ formComponentBaseConfig[i].name }}</span>
    </div>
  </draggable>
</template>

<script>
import FormComponentEditConfig from './form-component-edit.config'
import draggable from 'vuedraggable'
import UUIDUtil from '../utils/UUIDUtil'
import XFormEngine from '../e-form-engine.js'

export default {
  components: {
    draggable
  },
  data() {
    return {
      moveId: '-1',
      currentItem: null
    }
  },
  computed: {
    formComponentEditConfig() {
      const list = []
      FormComponentEditConfig.forEach((componentType) => {
        list.push(
          new XFormEngine({ componentType: componentType }).getComponentByFormType().componentConfig
        )
      })
      return list
    },
    formComponentBaseConfig() {
      const list = []
      FormComponentEditConfig.forEach((componentType) => {
        list.push(new XFormEngine({ componentType: componentType }).getComponentBaseConfig())
      })
      return list
    }
  },
  methods: {
    endMoveEvent() {
      this.$emit('add-form-item', this.currentItem)
    },
    onMove(e) {
      // 判断能否拖拽'
      console.log('eeee', e.relatedContext)
      e.relatedContext.list = [this.currentItem]
      return true
    },
    cloneItemData(e) {
      console.log('克隆', e)
      const item = this.$lodash.cloneDeep(e)
      item.uuid = UUIDUtil.guid()
      item.formValueCode = UUIDUtil.guid()
      this.currentItem = item
      return item
    },
    clickToAdd(data) {
      const item = this.$lodash.cloneDeep(data)
      item.uuid = UUIDUtil.guid()
      item.formValueCode = UUIDUtil.guid()
      this.currentItem = item
      this.$nextTick(() => {
        this.$emit('dbclick-add', this.currentItem)
      })
    }
  }
}
</script>
