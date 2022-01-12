<!--
 * @Author: fanciNate
 * @Date: 2021-11-13 12:50:05
 * @LastEditTime: 2022-01-12 21:33:04
 * @LastEditors: fanciNate
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/packages/components/e-form-engine/e-form-engine.vue
-->
<template>
  <div class="e-form-engine" :class="formTypeClass">
    <!-- <div style="{ position: absolute }">{{formData}}</div> -->
    <form-component-edit
      v-if="renderSence === 'render'"
      @add-form-item="addFormItem"
      @dbclick-add="dbclickAddItem"
    ></form-component-edit>
    <el-form ref="XFormEngine" class="form-component-container" :model="formData">
      <draggable
        v-model="formConfigListData"
        class="draggable-container"
        chosen-class="chosen"
        animation="200"
        :disabled="draggerDisable"
        :group="{ pull: false, put: ['XFormEngine'], name: 'form-config' }"
      >
        <form-build-wrapper
          v-for="(formItem, index) in formConfigListData"
          :key="formItem.uuid + '-' + index"
          class="choose-item"
          :class="{ 'choose-item__active': chooseItemData.uuid === formItem.uuid }"
          :renderSence="renderSence"
          :formConfig="formItem"
          :formData="formData"
          @click.native="chooseItem(formItem)"
        >
        </form-build-wrapper>
        <template v-if="formConfigListData && formConfigListData.length == 0">
          <e-empty-page></e-empty-page>
        </template>
      </draggable>
    </el-form>
    <form-config
      v-if="renderSence === 'render'"
      v-model="chooseItemData"
      :configList="chooseItemConfigList"
    ></form-config>
  </div>
</template>

<script>
import Vue from 'vue'
// import XFormEngineMixin from './e-form-engine.mixin'
import FormBuildWrapper from './form-components/form-build-wrapper'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import BussinessFormBuild from './form-components/bussiness-form-build'
import FormConfigBuild from './form-config/form-config-build'
import draggable from 'vuedraggable'
import EFormEngine from './e-form-engine.js'
import lodash from 'lodash'

// 引入左侧组件选择
import FormComponentEdit from './form-component-edit/index'
// 引入右侧组件配置设置面板
import FormConfig from './form-config/index'

// 引入库中其它组件
import ESvgIcon from '../e-svg-icon/index'
import EEllipsis from '../e-ellipsis/index'
import EEmptyPage from '../e-empty-page/index'

const UIComponents = [
  ElementUI,
  BussinessFormBuild,
  FormConfigBuild,
  ESvgIcon,
  EEllipsis,
  EEmptyPage
]
UIComponents.forEach((c) => {
  Vue.use(c)
})

Vue.prototype.$lodash = lodash

export default {
  name: 'EFormEngine',
  components: {
    FormBuildWrapper,
    draggable,
    FormComponentEdit,
    FormConfig
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    formConfigList: {
      type: Array,
      default: () => []
    },
    renderSence: {
      type: String,
      default: 'render'
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chooseItemData: {},
      chooseItemConfigList: [],
      formConfigListData: []
    }
  },
  computed: {
    formTypeClass() {
      return `e-form-engine__${this.renderSence}`
    },
    draggerDisable() {
      return this.renderSence !== 'render'
    },
    formData: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('change', value)
      }
    }
  },
  watch: {
    formConfigList: {
      handler(val) {
        this.formConfigListData = val || []
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    log(e) {
      console.log('log', e)
    },
    chooseItem(data) {
      const eFormEngine = new EFormEngine(data)
      this.chooseItemData = data
      this.chooseItemConfigList = eFormEngine.getComponentByFormType().conponentSetConfig
      console.log(data)
    },
    onMove(e) {
      // 判断能否拖拽
      console.log('e', e)
      console.log('e.relatedContext.element', e.relatedContext.element)
      return true
    },
    addFormItem(data) {
      const eFormEngine = new EFormEngine(data)
      this.chooseItemData = data
      this.chooseItemConfigList = eFormEngine.getComponentByFormType().conponentSetConfig
      console.log(data)
    },
    dbclickAddItem(data) {
      this.$nextTick(() => {
        this.formConfigListData.push(data)
        const eFormEngine = new EFormEngine(data)
        this.chooseItemData = data
        this.chooseItemConfigList = eFormEngine.getComponentByFormType().conponentSetConfig
        console.log(data)
      })
    },
    addItemEvent(e) {
      console.log('拖拽进组中的事件', e)
    },
    getFormEngineConfg() {
      return this.$lodash.cloneDeep(this.formConfigListData)
    }
  }
}
</script>
