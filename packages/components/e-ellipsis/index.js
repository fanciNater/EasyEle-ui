/*
 * @Author: fanciNate
 * @Date: 2020-09-19 16:34:12
 * @LastEditTime: 2020-11-20 11:53:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/packages/components/e-ellipsis/index.js
 */
import EEllipsis from './src/main.vue'

EEllipsis.install = (vue) => {
  vue.component(EEllipsis.name, EEllipsis)
}

export default EEllipsis
