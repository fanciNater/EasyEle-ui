module.exports = {
  index: {
    input: 'packages/index.js',
    output: 'index'
  },
  'test-module': {
    input: 'packages/components/test-module/index.js',
    output: 'test-module'
  },
  'e-request-plugin': {
    input: 'packages/plugins/request/e-request.js',
    output: 'e-request-plugin'
  },
  // 指令
  'e-event-outside-directive': {
    input: 'packages/directives/e-event-outside/index.js',
    output: 'e-event-outside-directive'
  }
}
