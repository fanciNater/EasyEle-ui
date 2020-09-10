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
  }
}
