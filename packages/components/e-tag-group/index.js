/*
 * @Author: your name
 * @Date: 2020-11-20 16:12:40
 * @LastEditTime: 2020-12-08 18:21:57
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/packages/components/e-tag-group/index.js
 */
import ETagGroup from './src/main.vue'

ETagGroup.install = (vue) => {
  vue.component(ETagGroup.name, ETagGroup)
}

export default ETagGroup
