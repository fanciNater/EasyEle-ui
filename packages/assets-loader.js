export default {
  requireAllSvg: function(url) {
    const requireAll = (requireContext) => requireContext.keys().map(requireContext)
    const req = require.context('./assets/icon', true, /\.svg$/)
    requireAll(req)
  },

  /**
   * 支持App应用动态导入图标
   * @param { require.context('./assets/icon', true, /\.svg$/) }
   */
  requireAppSvg: function(reqContext) {
    const requireAll = (requireContext) => requireContext.keys().map(requireContext)
    const req = reqContext
    requireAll(req)
  }
}
