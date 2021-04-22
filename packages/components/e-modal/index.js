/*
 * @Author: fanciNate
 * @Date: 2021-04-22 13:01:58
 * @LastEditTime: 2021-04-22 13:03:06
 * @LastEditors: fanciNate
 * @Description: In User Settings Edit
 * @FilePath: /vsCodeProjects/EasyEle-ui/packages/components/e-modal/index.js
 */
import EModal from './src/main.vue'

EModal.install = (vue) => {
  vue.component(EModal.name, EModal)
}

export default EModal
