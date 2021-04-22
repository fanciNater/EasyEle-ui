/*
 * @Author: your name
 * @Date: 2020-09-28 17:14:19
 * @LastEditTime: 2021-04-22 13:03:47
 * @LastEditors: fanciNate
 * @Description: In User Settings Edit
 * @FilePath: /vsCodeProjects/EasyEle-ui/packages/lib-list.js
 */
module.exports = {
  index: {
    input: 'packages/index.js',
    output: 'index'
  },
  'assets-loader': {
    input: 'packages/assets-loader.js',
    output: 'assets-loader'
  },
  // 组件
  'e-ellipsis': {
    input: 'packages/components/e-ellipsis/index.js',
    output: 'e-ellipsis'
  },
  'e-tag-group': {
    input: 'packages/components/e-tag-group/index.js',
    output: 'e-tag-group'
  },
  'e-svg-icon': {
    input: 'packages/components/e-svg-icon/index.js',
    output: 'e-svg-icon'
  },
  'e-water-mark': {
    input: 'packages/components/e-water-mark/index.js',
    output: 'e-water-mark'
  },
  'e-modal': {
    input: 'packages/components/e-modal/index.js',
    output: 'e-modal'
  },
  // 插件
  'e-request-plugin': {
    input: 'packages/plugins/request/e-request.js',
    output: 'e-request-plugin'
  },
  'e-lodash': {
    input: 'packages/plugins/lodash/e-lodash.js',
    output: 'e-lodash'
  },
  // 指令
  'e-event-outside-directive': {
    input: 'packages/directives/e-event-outside/index.js',
    output: 'e-event-outside-directive'
  }
}
