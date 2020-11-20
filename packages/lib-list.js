/*
 * @Author: your name
 * @Date: 2020-09-28 17:14:19
 * @LastEditTime: 2020-11-20 16:08:03
 * @LastEditors: your name
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
