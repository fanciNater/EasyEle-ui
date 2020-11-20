<!--
 * @Author: your name
 * @Date: 2020-11-20 12:11:51
 * @LastEditTime: 2020-11-20 12:12:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/examples/demos/table.vue
-->
<template>
  <div class="demo-block">
    <e-table v-bind="$attrs" v-on="$listeners">
      <template v-slot:tag="scopeSlot">
        <el-tag size="medium">
          {{ scopeSlot.row.name }}
        </el-tag>
      </template>
    </e-table>
  </div>
</template>

<script>
import ETable from '../../packages/components/e-table/src/main'
import '../../lib/theme-chalk/theme/e-table.scss'

export default {
  name: 'TableDemo',
  components: {
    ETable
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.icon-list {
  padding: 0;
  overflow: hidden;
  list-style: none !important;
  border: solid 1px #eaeefb;
  border-radius: 4px;
}
.icon-list li {
  float: left;
  width: 16.66%;
  height: 120px;
  margin-right: -1px;
  margin-bottom: -1px;
  font-size: 13px;
  line-height: 120px;
  color: #666;
  text-align: center;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  transition: color 0.15s linear;
  .demo-icon-wrap {
    display: inline-block;
    font-family:
 'Helvetica Neue',
 Helvetica,
 'PingFang SC',
 'Hiragino Sans GB',
 'Microsoft YaHei',
      SimSun,
 sans-serif;
    line-height: normal;
    color: #626673;
    vertical-align: middle;
  }
  .vue-cards-icon {
    display: block;
    margin-bottom: 15px;
  }
  &:hover {
    color: rgb(92, 182, 255);
  }
}
</style>
