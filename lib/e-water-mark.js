/* * Copyright © 2020-2021 fanciNate * Released under the MIT License. */
'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var Watermark = /*#__PURE__*/function () {
  function Watermark() {
    _classCallCheck(this, Watermark);
  }

  _createClass(Watermark, [{
    key: "draw",
    value: function draw(EWatermark, EWatermarkCanvas, settings) {
      var defaultSettings = new DefaultSettings(); // 设置外部传入的settings

      if (settings) {
        for (var _i = 0, _Object$keys = Object.keys(settings); _i < _Object$keys.length; _i++) {
          var key = _Object$keys[_i];
          defaultSettings[key] = settings[key];
        }
      }

      var fullWidth = EWatermark.offsetWidth;
      var fullHeight = EWatermark.offsetHeight;

      if (defaultSettings.cols === 0) {
        defaultSettings.cols = this.calcCols(defaultSettings.angle, fullWidth, fullHeight, defaultSettings.startX, defaultSettings.xSpace, defaultSettings.width);
      }

      if (defaultSettings.rows === 0) {
        defaultSettings.rows = this.calcRows(defaultSettings.angle, fullWidth, fullHeight, defaultSettings.startX, defaultSettings.ySpace, defaultSettings.height);
      }

      var context = EWatermarkCanvas.getContext('2d');
      var ratio = this.getPixelRatio(context);
      EWatermarkCanvas.width = fullWidth * ratio;
      EWatermarkCanvas.height = fullHeight * ratio;
      context.scale(ratio, ratio);
      context.font = defaultSettings.font;
      context.fillStyle = defaultSettings.color;
      context.globalAlpha = defaultSettings.alpha;
      context.textAlign = 'left';
      context.textBaseline = 'middle';
      context.rotate(defaultSettings.angle * (Math.PI / 180));
      var x = 0;
      var y = 0;

      for (var i = defaultSettings.angle === 0 ? 0 : -defaultSettings.rows; i < defaultSettings.rows; i++) {
        y = defaultSettings.startY + (defaultSettings.ySpace + defaultSettings.height) * i;

        for (var j = defaultSettings.angle === 0 ? 0 : -(defaultSettings.cols / 2); j < defaultSettings.cols + defaultSettings.cols / 2; j++) {
          x = defaultSettings.startX + (defaultSettings.xSpace + defaultSettings.width) * j;
          var canText = defaultSettings.text.split('\n') || ['默认水印'];
          canText.forEach(function (item, index) {
            context.fillText(item, x, y + (index + 1) * 16, defaultSettings.width);
          });
        }
      }
    }
  }, {
    key: "calcCols",
    value: function calcCols(angle, fullWidth, fullHeight, startX, xSpace, width) {
      if (angle === 0) {
        return parseInt((fullWidth - startX + xSpace) / (width + xSpace));
      } else {
        return parseInt(this.getHypotenuse(fullWidth, fullHeight) / (width + xSpace));
      }
    }
  }, {
    key: "calcRows",
    value: function calcRows(angle, fullWidth, fullHeight, startY, ySpace, height) {
      if (angle === 0) {
        return parseInt((fullHeight - startY + ySpace) / (height + ySpace));
      } else {
        return parseInt(this.getHypotenuse(fullWidth, fullHeight) / (height + ySpace));
      }
    }
  }, {
    key: "getPixelRatio",
    value: function getPixelRatio(context) {
      var backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
      return (window.devicePixelRatio || 1) / backingStore;
    }
  }, {
    key: "getHypotenuse",
    value: function getHypotenuse(fullWidth, fullHeight) {
      return Math.sqrt(Math.pow(fullWidth, 2) + Math.pow(fullHeight, 2));
    }
  }]);

  return Watermark;
}();

var DefaultSettings = function DefaultSettings() {
  _classCallCheck(this, DefaultSettings);

  this.text = '';
  this.startX = 0;
  this.startY = 20;
  this.rows = 0;
  this.cols = 0;
  this.width = 150;
  this.height = 100;
  this.xSpace = 50;
  this.ySpace = 50;
  this.color = '#000000';
  this.alpha = 0.1;
  this.angle = -15;
  this.font = '14px Normal';
};

var script = {
  name: 'EWaterMark',
  created: function created() {},
  mounted: function mounted() {
    this.$emit('mounted');
  },
  methods: {
    draw: function draw(settings) {
      var watermark = new Watermark();
      watermark.draw(this.$refs.EWatermark, this.$refs.EWatermarkCanvas, settings);
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */ var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { ref: "EWatermark", staticClass: "e-water-mark" }, [
    _c("div", { staticClass: "container" }, [_vm._t("default")], 2),
    _vm._v(" "),
    _c("canvas", {
      ref: "EWatermarkCanvas",
      staticClass: "e-water-mark-canvas"
    })
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

/*
 * @Author: fanciNate
 * @Date: 2020-12-08 17:46:47
 * @LastEditTime: 2020-12-08 18:21:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /EasyEle-ui/packages/components/e-water-mark/index.js
 */

__vue_component__.install = function (vue) {
  vue.component(__vue_component__.name, __vue_component__);
};

module.exports = __vue_component__;
