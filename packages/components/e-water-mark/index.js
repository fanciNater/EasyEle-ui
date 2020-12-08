/*
 * @Author: fanciNate
 * @Date: 2020-12-08 17:46:47
 * @LastEditTime: 2020-12-08 18:21:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/packages/components/e-water-mark/index.js
 */
import EWaterMark from './src/main.vue'

EWaterMark.install = (vue) => {
  vue.component(EWaterMark.name, EWaterMark)
}

export default EWaterMark
