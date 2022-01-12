/*
 * @Author: your name
 * @Date: 2020-09-28 17:14:19
 * @LastEditTime: 2022-01-10 22:30:50
 * @LastEditors: fanciNate
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/packages/lib-list.js
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
  'e-form-engine': {
    input: 'packages/components/e-form-engine/index.js',
    output: 'e-form-engine'
  },
  'e-empty-page': {
    input: 'packages/components/e-empty-page/index.js',
    output: 'e-empty-page'
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
