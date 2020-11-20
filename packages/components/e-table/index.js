/*
 * @Author: fanciNate
 * @Date: 2020-11-20 11:35:39
 * @LastEditTime: 2020-11-20 11:40:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/packages/components/e-table/index.js
 */
import ETable from './src/main.vue'

ETable.install = (vue) => {
  vue.component(name, ETable)
}

export default ETable
