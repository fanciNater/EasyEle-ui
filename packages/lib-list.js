module.exports = {
  index: {
    input: 'packages/index.js',
    output: 'index'
  },
  // 组件
  'test-module': {
    input: 'packages/components/test-module/index.js',
    output: 'test-module'
  },
  'e-ellipsis': {
    input: 'packages/components/e-ellipsis/index.js',
    output: 'e-ellipsis'
  },
  'e-tag-group': {
    input: 'packages/components/e-tag-group/index.js',
    output: 'e-tag-group'
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
