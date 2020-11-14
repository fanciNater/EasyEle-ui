/* * Copyright © 2020-2020 wucan * Released under the MIT License. */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global['assets-loader'] = factory());
}(this, (function () { 'use strict';

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

    return assetsLoader;

})));
