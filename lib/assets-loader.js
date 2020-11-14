/* * Copyright © 2020-2020 wucan * Released under the MIT License. */
'use strict';

var assetsLoader = {
  requireAllSvg: function requireAllSvg() {
    var requireAll = function requireAll(requireContext) {
      return requireContext.keys().map(requireContext);
    };

    var req = require.context('./assets/icon', true, /\.svg$/);

    requireAll(req);
  },

  /**
   * 支持App应用动态导入图标
   * @param { require.context('./assets/icon', true, /\.svg$/) }
   */
  requireAppSvg: function requireAppSvg(reqContext) {
    var requireAll = function requireAll(requireContext) {
      return requireContext.keys().map(requireContext);
    };

    var req = reqContext;
    requireAll(req);
  }
};

module.exports = assetsLoader;if (window) { window.document.addEventListener('DOMContentLoaded', function(){ var div = document.createElement('div'); div.setAttribute('style', 'display: none; height:0; width: 0; overflow: hidden;');  div.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><defs><style>\n    .sprite-symbol-usage {display: none;}\n    .sprite-symbol-usage:target {display: inline;}\n  </style></defs></svg>";  window.document.body.appendChild(div) }); }
