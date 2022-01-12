<template>
  <el-form ref="XFormConfig" class="form-config" :model="value">
    <template v-if="value && value.uuid">
      <template v-for="(configType, index) in getFormItemConfigList">
        <form-config-warpper :key="index" v-model="value" :type="configType">
        </form-config-warpper>
      </template>
    </template>
    <template v-else>
      <div class="empty">
        <e-empty-page></e-empty-page>
      </div>
    </template>
  </el-form>
</template>

<script>
import FormConfigWarpper from './form-config-warpper'

export default {
  components: {
    FormConfigWarpper
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      default: function() {
        return {}
      }
    },
    configList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {
    getFormItemConfigList() {
      // 获取当前表单组件的配置信息表
      if (this.value && this.value.uuid) {
        return this.configList
      } else {
        return []
      }
    }
  }
}
</script>
