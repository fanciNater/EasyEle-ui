/*
 * @Author: fanciNate
 * @Date: 2021-11-13 12:50:08
 * @LastEditTime: 2022-01-10 22:42:50
 * @LastEditors: fanciNate
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/packages/components/e-form-engine/index.js
 */
import EFormEngine from './e-form-engine.vue'

EFormEngine.install = (vue) => {
  vue.component(EFormEngine.name, EFormEngine)
}

export default EFormEngine
