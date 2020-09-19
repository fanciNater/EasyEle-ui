/* * Copyright © 2020-2020 wucan * Released under the MIT License. */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = global || self, global.index = factory(global.Vue));
}(this, (function (vue) { 'use strict';

  vue = vue && Object.prototype.hasOwnProperty.call(vue, 'default') ? vue['default'] : vue;

  var version = "0.0.6";

  //
  //
  //
  //
  //
  //
  var script = {
    name: 'TestModule'
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

  /* script */
  var __vue_script__ = script;
  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "test-module" }, [
      _vm._v("\n  这是测试的组件\n")
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = undefined;
    /* scoped */
    var __vue_scope_id__ = "data-v-62f4eb2a";
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

  __vue_component__.install = function (vue) {
    vue.component(name, __vue_component__);
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var vueClamp = createCommonjsModule(function (module, exports) {
  !function(e,t){module.exports=t();}(commonjsGlobal,(function(){var e=null;var t=null;function i(e,t){void 0===t&&(t={});var i=document.createElement(e);return Object.keys(t).forEach((function(e){i[e]=t[e];})),i}function s(e,t,i){return (window.getComputedStyle(e,i||null)||{display:"none"})[t]}function r(e){if(!document.documentElement.contains(e))return {detached:!0,rendered:!1};for(var t=e;t!==document;){if("none"===s(t,"display"))return {detached:!1,rendered:!1};t=t.parentNode;}return {detached:!1,rendered:!0}}var n=0,o=null;function a(e,t){if(e.__resize_mutation_handler__||(e.__resize_mutation_handler__=l.bind(e)),!e.__resize_listeners__)if(e.__resize_listeners__=[],window.ResizeObserver){var a=e.offsetWidth,c=e.offsetHeight,u=new ResizeObserver((function(){(e.__resize_observer_triggered__||(e.__resize_observer_triggered__=!0,e.offsetWidth!==a||e.offsetHeight!==c))&&d(e);})),f=r(e),p=f.detached,g=f.rendered;e.__resize_observer_triggered__=!1===p&&!1===g,e.__resize_observer__=u,u.observe(e);}else if(e.attachEvent&&e.addEventListener)e.__resize_legacy_resize_handler__=function(){d(e);},e.attachEvent("onresize",e.__resize_legacy_resize_handler__),document.addEventListener("DOMSubtreeModified",e.__resize_mutation_handler__);else if(n||(o=function(e){var t=document.createElement("style");return t.type="text/css",t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),(document.querySelector("head")||document.body).appendChild(t),t}('.resize-triggers{visibility:hidden;opacity:0}.resize-contract-trigger,.resize-contract-trigger:before,.resize-expand-trigger,.resize-triggers{content:"";position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden}.resize-contract-trigger,.resize-expand-trigger{background:#eee;overflow:auto}.resize-contract-trigger:before{width:200%;height:200%}')),function(e){var t=s(e,"position");t&&"static"!==t||(e.style.position="relative");e.__resize_old_position__=t,e.__resize_last__={};var r=i("div",{className:"resize-triggers"}),n=i("div",{className:"resize-expand-trigger"}),o=i("div"),a=i("div",{className:"resize-contract-trigger"});n.appendChild(o),r.appendChild(n),r.appendChild(a),e.appendChild(r),e.__resize_triggers__={triggers:r,expand:n,expandChild:o,contract:a},h(e),e.addEventListener("scroll",_,!0),e.__resize_last__={width:e.offsetWidth,height:e.offsetHeight};}(e),e.__resize_rendered__=r(e).rendered,window.MutationObserver){var m=new MutationObserver(e.__resize_mutation_handler__);m.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0}),e.__resize_mutation_observer__=m;}e.__resize_listeners__.push(t),n++;}function l(){var e=r(this),t=e.rendered,i=e.detached;t!==this.__resize_rendered__&&(!i&&this.__resize_triggers__&&(h(this),this.addEventListener("scroll",_,!0)),this.__resize_rendered__=t,d(this));}function _(){var i,s,r=this;h(this),this.__resize_raf__&&(i=this.__resize_raf__,t||(t=(window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||function(e){clearTimeout(e);}).bind(window)),t(i)),this.__resize_raf__=(s=function(){var e,t,i,s,n,o,a=(t=(e=r).__resize_last__,i=t.width,s=t.height,n=e.offsetWidth,o=e.offsetHeight,n!==i||o!==s?{width:n,height:o}:null);a&&(r.__resize_last__=a,d(r));},e||(e=(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){return setTimeout(e,16)}).bind(window)),e(s));}function d(e){e&&e.__resize_listeners__&&e.__resize_listeners__.forEach((function(t){t.call(e);}));}function h(e){var t=e.__resize_triggers__,i=t.expand,s=t.expandChild,r=t.contract,n=r.scrollWidth,o=r.scrollHeight,a=i.offsetWidth,l=i.offsetHeight,_=i.scrollWidth,d=i.scrollHeight;r.scrollLeft=n,r.scrollTop=o,s.style.width=a+1+"px",s.style.height=l+1+"px",i.scrollLeft=_,i.scrollTop=d;}return {name:"vue-clamp",props:{tag:{type:String,default:"div"},autoresize:{type:Boolean,default:!1},maxLines:Number,maxHeight:[String,Number],ellipsis:{type:String,default:"…"},expanded:Boolean},data:function(){return {offset:null,text:this.getText(),localExpanded:!!this.expanded}},computed:{clampedText:function(){return this.text.slice(0,this.offset)+this.ellipsis},isClamped:function(){return !!this.text&&this.offset!==this.text.length},realText:function(){return this.isClamped?this.clampedText:this.text},realMaxHeight:function(){if(this.localExpanded)return null;var e=this.maxHeight;return e?"number"==typeof e?e+"px":e:null}},watch:{expanded:function(e){this.localExpanded=e;},localExpanded:function(e){e?this.clampAt(this.text.length):this.update(),this.expanded!==e&&this.$emit("update:expanded",e);},isClamped:{handler:function(e){var t=this;this.$nextTick((function(){return t.$emit("clampchange",e)}));},immediate:!0}},mounted:function(){this.init(),this.$watch((function(e){return [e.maxLines,e.maxHeight,e.ellipsis,e.isClamped].join()}),this.update),this.$watch((function(e){return [e.tag,e.text,e.autoresize].join()}),this.init);},updated:function(){this.text=this.getText(),this.applyChange();},beforeDestroy:function(){this.cleanUp();},methods:{init:function(){var e=this;this.$slots.default&&(this.offset=this.text.length,this.cleanUp(),this.autoresize&&(a(this.$el,this.update),this.unregisterResizeCallback=function(){!function(e,t){if(e.detachEvent&&e.removeEventListener)return e.detachEvent("onresize",e.__resize_legacy_resize_handler__),void document.removeEventListener("DOMSubtreeModified",e.__resize_mutation_handler__);var i=e.__resize_listeners__;i&&(i.splice(i.indexOf(t),1),i.length||(e.__resize_observer__?(e.__resize_observer__.unobserve(e),e.__resize_observer__.disconnect(),e.__resize_observer__=null):(e.__resize_mutation_observer__&&(e.__resize_mutation_observer__.disconnect(),e.__resize_mutation_observer__=null),e.removeEventListener("scroll",_),e.removeChild(e.__resize_triggers__.triggers),e.__resize_triggers__=null),e.__resize_listeners__=null),!--n&&o&&o.parentNode.removeChild(o));}(e.$el,e.update);}),this.update());},update:function(){this.localExpanded||(this.applyChange(),(this.isOverflow()||this.isClamped)&&this.search());},expand:function(){this.localExpanded=!0;},collapse:function(){this.localExpanded=!1;},toggle:function(){this.localExpanded=!this.localExpanded;},getLines:function(){return Object.keys([].concat(this.$refs.content.getClientRects()).reduce((function(e,t){var i=t.top+"/"+t.bottom;return e[i]||(e[i]=!0),e}),{})).length},isOverflow:function(){return !(!this.maxLines&&!this.maxHeight)&&(!!(this.maxLines&&this.getLines()>this.maxLines)||!!(this.maxHeight&&this.$el.scrollHeight>this.$el.offsetHeight))},getText:function(){var e=(this.$slots.default||[]).filter((function(e){return !e.tag&&!e.isComment}))[0];return e?e.text:""},moveEdge:function(e){this.clampAt(this.offset+e);},clampAt:function(e){this.offset=e,this.applyChange();},applyChange:function(){this.$refs.text.textContent=this.realText;},stepToFit:function(){this.fill(),this.clamp();},fill:function(){for(;(!this.isOverflow()||this.getLines()<2)&&this.offset<this.text.length;)this.moveEdge(1);},clamp:function(){for(;this.isOverflow()&&this.getLines()>1&&this.offset>0;)this.moveEdge(-1);},search:function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t];var i=e[0];void 0===i&&(i=0);var s=e[1];if(void 0===s&&(s=this.offset),s-i<=3)this.stepToFit();else {var r=Math.floor((s+i)/2);this.clampAt(r),this.isOverflow()?this.search(i,r):this.search(r,s);}},cleanUp:function(){this.unregisterResizeCallback&&this.unregisterResizeCallback();}},render:function(e){var t=[e("span",this.$isServer?{}:{ref:"text",attrs:{"aria-label":this.text.trim()}},this.$isServer?this.text:this.realText)],i={expand:this.expand,collapse:this.collapse,toggle:this.toggle,clamped:this.isClamped,expanded:this.localExpanded},s=this.$scopedSlots.before?this.$scopedSlots.before(i):this.$slots.before;s&&t.unshift.apply(t,Array.isArray(s)?s:[s]);var r=this.$scopedSlots.after?this.$scopedSlots.after(i):this.$slots.after;r&&t.push.apply(t,Array.isArray(r)?r:[r]);var n=[e("span",{style:{boxShadow:"transparent 0 0"},ref:"content"},t)];return e(this.tag,{style:{maxHeight:this.realMaxHeight,overflow:"hidden"}},n)}}}));
  });

  /* eslint-disable no-undefined,no-param-reassign,no-shadow */

  /**
   * Throttle execution of a function. Especially useful for rate limiting
   * execution of handlers on events like resize and scroll.
   *
   * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
   * @param  {Boolean}   [noTrailing]   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
   *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
   *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
   *                                    the internal counter is reset)
   * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
   *                                    to `callback` when the throttled-function is executed.
   * @param  {Boolean}   [debounceMode] If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
   *                                    schedule `callback` to execute after `delay` ms.
   *
   * @return {Function}  A new, throttled, function.
   */
  var throttle = function ( delay, noTrailing, callback, debounceMode ) {

  	// After wrapper has stopped being called, this timeout ensures that
  	// `callback` is executed at the proper times in `throttle` and `end`
  	// debounce modes.
  	var timeoutID;

  	// Keep track of the last time `callback` was executed.
  	var lastExec = 0;

  	// `noTrailing` defaults to falsy.
  	if ( typeof noTrailing !== 'boolean' ) {
  		debounceMode = callback;
  		callback = noTrailing;
  		noTrailing = undefined;
  	}

  	// The `wrapper` function encapsulates all of the throttling / debouncing
  	// functionality and when executed will limit the rate at which `callback`
  	// is executed.
  	function wrapper () {

  		var self = this;
  		var elapsed = Number(new Date()) - lastExec;
  		var args = arguments;

  		// Execute `callback` and update the `lastExec` timestamp.
  		function exec () {
  			lastExec = Number(new Date());
  			callback.apply(self, args);
  		}

  		// If `debounceMode` is true (at begin) this is used to clear the flag
  		// to allow future `callback` executions.
  		function clear () {
  			timeoutID = undefined;
  		}

  		if ( debounceMode && !timeoutID ) {
  			// Since `wrapper` is being called for the first time and
  			// `debounceMode` is true (at begin), execute `callback`.
  			exec();
  		}

  		// Clear any existing timeout.
  		if ( timeoutID ) {
  			clearTimeout(timeoutID);
  		}

  		if ( debounceMode === undefined && elapsed > delay ) {
  			// In throttle mode, if `delay` time has been exceeded, execute
  			// `callback`.
  			exec();

  		} else if ( noTrailing !== true ) {
  			// In trailing throttle mode, since `delay` time has not been
  			// exceeded, schedule `callback` to execute `delay` ms after most
  			// recent execution.
  			//
  			// If `debounceMode` is true (at begin), schedule `clear` to execute
  			// after `delay` ms.
  			//
  			// If `debounceMode` is false (at end), schedule `callback` to
  			// execute after `delay` ms.
  			timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
  		}

  	}

  	// Return the wrapper function.
  	return wrapper;

  };

  /* eslint-disable no-undefined */



  /**
   * Debounce execution of a function. Debouncing, unlike throttling,
   * guarantees that a function is only executed a single time, either at the
   * very beginning of a series of calls, or at the very end.
   *
   * @param  {Number}   delay         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
   * @param  {Boolean}  [atBegin]     Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
   *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
   *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
   * @param  {Function} callback      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
   *                                  to `callback` when the debounced-function is executed.
   *
   * @return {Function} A new, debounced function.
   */
  var debounce = function ( delay, atBegin, callback ) {
  	return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
  };

  var dom = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.isInContainer = exports.getScrollContainer = exports.isScroll = exports.getStyle = exports.once = exports.off = exports.on = undefined;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* istanbul ignore next */

  exports.hasClass = hasClass;
  exports.addClass = addClass;
  exports.removeClass = removeClass;
  exports.setStyle = setStyle;



  var _vue2 = _interopRequireDefault(vue);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var isServer = _vue2.default.prototype.$isServer;
  var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  var MOZ_HACK_REGEXP = /^moz([A-Z])/;
  var ieVersion = isServer ? 0 : Number(document.documentMode);

  /* istanbul ignore next */
  var trim = function trim(string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
  };
  /* istanbul ignore next */
  var camelCase = function camelCase(name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
  };

  /* istanbul ignore next */
  var on = exports.on = function () {
    if (!isServer && document.addEventListener) {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false);
        }
      };
    } else {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.attachEvent('on' + event, handler);
        }
      };
    }
  }();

  /* istanbul ignore next */
  var off = exports.off = function () {
    if (!isServer && document.removeEventListener) {
      return function (element, event, handler) {
        if (element && event) {
          element.removeEventListener(event, handler, false);
        }
      };
    } else {
      return function (element, event, handler) {
        if (element && event) {
          element.detachEvent('on' + event, handler);
        }
      };
    }
  }();

  /* istanbul ignore next */
  var once = exports.once = function once(el, event, fn) {
    var listener = function listener() {
      if (fn) {
        fn.apply(this, arguments);
      }
      off(el, event, listener);
    };
    on(el, event, listener);
  };

  /* istanbul ignore next */
  function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
      return el.classList.contains(cls);
    } else {
      return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
  }
  /* istanbul ignore next */
  function addClass(el, cls) {
    if (!el) return;
    var curClass = el.className;
    var classes = (cls || '').split(' ');

    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i];
      if (!clsName) continue;

      if (el.classList) {
        el.classList.add(clsName);
      } else if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
    if (!el.classList) {
      el.className = curClass;
    }
  }
  /* istanbul ignore next */
  function removeClass(el, cls) {
    if (!el || !cls) return;
    var classes = cls.split(' ');
    var curClass = ' ' + el.className + ' ';

    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i];
      if (!clsName) continue;

      if (el.classList) {
        el.classList.remove(clsName);
      } else if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
    if (!el.classList) {
      el.className = trim(curClass);
    }
  }
  /* istanbul ignore next */
  var getStyle = exports.getStyle = ieVersion < 9 ? function (element, styleName) {
    if (isServer) return;
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
      styleName = 'styleFloat';
    }
    try {
      switch (styleName) {
        case 'opacity':
          try {
            return element.filters.item('alpha').opacity / 100;
          } catch (e) {
            return 1.0;
          }
        default:
          return element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null;
      }
    } catch (e) {
      return element.style[styleName];
    }
  } : function (element, styleName) {
    if (isServer) return;
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
      styleName = 'cssFloat';
    }
    try {
      var computed = document.defaultView.getComputedStyle(element, '');
      return element.style[styleName] || computed ? computed[styleName] : null;
    } catch (e) {
      return element.style[styleName];
    }
  };

  /* istanbul ignore next */
  function setStyle(element, styleName, value) {
    if (!element || !styleName) return;

    if ((typeof styleName === 'undefined' ? 'undefined' : _typeof(styleName)) === 'object') {
      for (var prop in styleName) {
        if (styleName.hasOwnProperty(prop)) {
          setStyle(element, prop, styleName[prop]);
        }
      }
    } else {
      styleName = camelCase(styleName);
      if (styleName === 'opacity' && ieVersion < 9) {
        element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
      } else {
        element.style[styleName] = value;
      }
    }
  }
  var isScroll = exports.isScroll = function isScroll(el, vertical) {
    if (isServer) return;

    var determinedDirection = vertical !== null || vertical !== undefined;
    var overflow = determinedDirection ? vertical ? getStyle(el, 'overflow-y') : getStyle(el, 'overflow-x') : getStyle(el, 'overflow');

    return overflow.match(/(scroll|auto)/);
  };

  var getScrollContainer = exports.getScrollContainer = function getScrollContainer(el, vertical) {
    if (isServer) return;

    var parent = el;
    while (parent) {
      if ([window, document, document.documentElement].includes(parent)) {
        return window;
      }
      if (isScroll(parent, vertical)) {
        return parent;
      }
      parent = parent.parentNode;
    }

    return parent;
  };

  var isInContainer = exports.isInContainer = function isInContainer(el, container) {
    if (isServer || !el || !container) return false;

    var elRect = el.getBoundingClientRect();
    var containerRect = void 0;

    if ([window, document, document.documentElement, null, undefined].includes(container)) {
      containerRect = {
        top: 0,
        right: window.innerWidth,
        bottom: window.innerHeight,
        left: 0
      };
    } else {
      containerRect = container.getBoundingClientRect();
    }

    return elRect.top < containerRect.bottom && elRect.bottom > containerRect.top && elRect.right > containerRect.left && elRect.left < containerRect.right;
  };
  });

  unwrapExports(dom);
  var dom_1 = dom.isInContainer;
  var dom_2 = dom.getScrollContainer;
  var dom_3 = dom.isScroll;
  var dom_4 = dom.getStyle;
  var dom_5 = dom.once;
  var dom_6 = dom.off;
  var dom_7 = dom.on;
  var dom_8 = dom.hasClass;
  var dom_9 = dom.addClass;
  var dom_10 = dom.removeClass;
  var dom_11 = dom.setStyle;

  var types = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.isString = isString;
  exports.isObject = isObject;
  exports.isHtmlElement = isHtmlElement;
  function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
  }

  function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  function isHtmlElement(node) {
    return node && node.nodeType === Node.ELEMENT_NODE;
  }

  var isFunction = exports.isFunction = function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  };

  var isUndefined = exports.isUndefined = function isUndefined(val) {
    return val === void 0;
  };

  var isDefined = exports.isDefined = function isDefined(val) {
    return val !== undefined && val !== null;
  };
  });

  unwrapExports(types);
  var types_1 = types.isString;
  var types_2 = types.isObject;
  var types_3 = types.isHtmlElement;
  var types_4 = types.isFunction;
  var types_5 = types.isUndefined;
  var types_6 = types.isDefined;

  var util = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.isEmpty = exports.isEqual = exports.arrayEquals = exports.looseEqual = exports.capitalize = exports.kebabCase = exports.autoprefixer = exports.isFirefox = exports.isEdge = exports.isIE = exports.coerceTruthyValueToArray = exports.arrayFind = exports.arrayFindIndex = exports.escapeRegexpString = exports.valueEquals = exports.generateId = exports.getValueByPath = undefined;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  exports.noop = noop;
  exports.hasOwn = hasOwn;
  exports.toObject = toObject;
  exports.getPropByPath = getPropByPath;
  exports.rafThrottle = rafThrottle;
  exports.objToArray = objToArray;



  var _vue2 = _interopRequireDefault(vue);



  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  function noop() {}
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  function extend(to, _from) {
    for (var key in _from) {
      to[key] = _from[key];
    }
    return to;
  }
  function toObject(arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend(res, arr[i]);
      }
    }
    return res;
  }
  var getValueByPath = exports.getValueByPath = function getValueByPath(object, prop) {
    prop = prop || '';
    var paths = prop.split('.');
    var current = object;
    var result = null;
    for (var i = 0, j = paths.length; i < j; i++) {
      var path = paths[i];
      if (!current) break;

      if (i === j - 1) {
        result = current[path];
        break;
      }
      current = current[path];
    }
    return result;
  };

  function getPropByPath(obj, path, strict) {
    var tempObj = obj;
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');

    var keyArr = path.split('.');
    var i = 0;
    for (var len = keyArr.length; i < len - 1; ++i) {
      if (!tempObj && !strict) break;
      var key = keyArr[i];
      if (key in tempObj) {
        tempObj = tempObj[key];
      } else {
        if (strict) {
          throw new Error('please transfer a valid prop path to form item!');
        }
        break;
      }
    }
    return {
      o: tempObj,
      k: keyArr[i],
      v: tempObj ? tempObj[keyArr[i]] : null
    };
  }
  var generateId = exports.generateId = function generateId() {
    return Math.floor(Math.random() * 10000);
  };

  var valueEquals = exports.valueEquals = function valueEquals(a, b) {
    // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
    if (a === b) return true;
    if (!(a instanceof Array)) return false;
    if (!(b instanceof Array)) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i !== a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  var escapeRegexpString = exports.escapeRegexpString = function escapeRegexpString() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
  };

  // TODO: use native Array.find, Array.findIndex when IE support is dropped
  var arrayFindIndex = exports.arrayFindIndex = function arrayFindIndex(arr, pred) {
    for (var i = 0; i !== arr.length; ++i) {
      if (pred(arr[i])) {
        return i;
      }
    }
    return -1;
  };

  var arrayFind = exports.arrayFind = function arrayFind(arr, pred) {
    var idx = arrayFindIndex(arr, pred);
    return idx !== -1 ? arr[idx] : undefined;
  };

  // coerce truthy value to array
  var coerceTruthyValueToArray = exports.coerceTruthyValueToArray = function coerceTruthyValueToArray(val) {
    if (Array.isArray(val)) {
      return val;
    } else if (val) {
      return [val];
    } else {
      return [];
    }
  };

  var isIE = exports.isIE = function isIE() {
    return !_vue2.default.prototype.$isServer && !isNaN(Number(document.documentMode));
  };

  var isEdge = exports.isEdge = function isEdge() {
    return !_vue2.default.prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1;
  };

  var isFirefox = exports.isFirefox = function isFirefox() {
    return !_vue2.default.prototype.$isServer && !!window.navigator.userAgent.match(/firefox/i);
  };

  var autoprefixer = exports.autoprefixer = function autoprefixer(style) {
    if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) !== 'object') return style;
    var rules = ['transform', 'transition', 'animation'];
    var prefixes = ['ms-', 'webkit-'];
    rules.forEach(function (rule) {
      var value = style[rule];
      if (rule && value) {
        prefixes.forEach(function (prefix) {
          style[prefix + rule] = value;
        });
      }
    });
    return style;
  };

  var kebabCase = exports.kebabCase = function kebabCase(str) {
    var hyphenateRE = /([^-])([A-Z])/g;
    return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
  };

  var capitalize = exports.capitalize = function capitalize(str) {
    if (!(0, types.isString)(str)) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  var looseEqual = exports.looseEqual = function looseEqual(a, b) {
    var isObjectA = (0, types.isObject)(a);
    var isObjectB = (0, types.isObject)(b);
    if (isObjectA && isObjectB) {
      return JSON.stringify(a) === JSON.stringify(b);
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b);
    } else {
      return false;
    }
  };

  var arrayEquals = exports.arrayEquals = function arrayEquals(arrayA, arrayB) {
    arrayA = arrayA || [];
    arrayB = arrayB || [];

    if (arrayA.length !== arrayB.length) {
      return false;
    }

    for (var i = 0; i < arrayA.length; i++) {
      if (!looseEqual(arrayA[i], arrayB[i])) {
        return false;
      }
    }

    return true;
  };

  var isEqual = exports.isEqual = function isEqual(value1, value2) {
    if (Array.isArray(value1) && Array.isArray(value2)) {
      return arrayEquals(value1, value2);
    }
    return looseEqual(value1, value2);
  };

  var isEmpty = exports.isEmpty = function isEmpty(val) {
    // null or undefined
    if (val == null) return true;

    if (typeof val === 'boolean') return false;

    if (typeof val === 'number') return !val;

    if (val instanceof Error) return val.message === '';

    switch (Object.prototype.toString.call(val)) {
      // String or Array
      case '[object String]':
      case '[object Array]':
        return !val.length;

      // Map or Set or File
      case '[object File]':
      case '[object Map]':
      case '[object Set]':
        {
          return !val.size;
        }
      // Plain Object
      case '[object Object]':
        {
          return !Object.keys(val).length;
        }
    }

    return false;
  };

  function rafThrottle(fn) {
    var locked = false;
    return function () {
      var _this = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (locked) return;
      locked = true;
      window.requestAnimationFrame(function (_) {
        fn.apply(_this, args);
        locked = false;
      });
    };
  }

  function objToArray(obj) {
    if (Array.isArray(obj)) {
      return obj;
    }
    return isEmpty(obj) ? [] : [obj];
  }
  });

  unwrapExports(util);
  var util_1 = util.isEmpty;
  var util_2 = util.isEqual;
  var util_3 = util.arrayEquals;
  var util_4 = util.looseEqual;
  var util_5 = util.capitalize;
  var util_6 = util.kebabCase;
  var util_7 = util.autoprefixer;
  var util_8 = util.isFirefox;
  var util_9 = util.isEdge;
  var util_10 = util.isIE;
  var util_11 = util.coerceTruthyValueToArray;
  var util_12 = util.arrayFind;
  var util_13 = util.arrayFindIndex;
  var util_14 = util.escapeRegexpString;
  var util_15 = util.valueEquals;
  var util_16 = util.generateId;
  var util_17 = util.getValueByPath;
  var util_18 = util.noop;
  var util_19 = util.hasOwn;
  var util_20 = util.toObject;
  var util_21 = util.getPropByPath;
  var util_22 = util.rafThrottle;
  var util_23 = util.objToArray;

  var merge = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;

  exports.default = function (target) {
    for (var i = 1, j = arguments.length; i < j; i++) {
      var source = arguments[i] || {};
      for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
          var value = source[prop];
          if (value !== undefined) {
            target[prop] = value;
          }
        }
      }
    }

    return target;
  };
  });

  unwrapExports(merge);

  var popupManager = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  var _vue2 = _interopRequireDefault(vue);



  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var hasModal = false;
  var hasInitZIndex = false;
  var zIndex = void 0;

  var getModal = function getModal() {
    if (_vue2.default.prototype.$isServer) return;
    var modalDom = PopupManager.modalDom;
    if (modalDom) {
      hasModal = true;
    } else {
      hasModal = false;
      modalDom = document.createElement('div');
      PopupManager.modalDom = modalDom;

      modalDom.addEventListener('touchmove', function (event) {
        event.preventDefault();
        event.stopPropagation();
      });

      modalDom.addEventListener('click', function () {
        PopupManager.doOnModalClick && PopupManager.doOnModalClick();
      });
    }

    return modalDom;
  };

  var instances = {};

  var PopupManager = {
    modalFade: true,

    getInstance: function getInstance(id) {
      return instances[id];
    },

    register: function register(id, instance) {
      if (id && instance) {
        instances[id] = instance;
      }
    },

    deregister: function deregister(id) {
      if (id) {
        instances[id] = null;
        delete instances[id];
      }
    },

    nextZIndex: function nextZIndex() {
      return PopupManager.zIndex++;
    },

    modalStack: [],

    doOnModalClick: function doOnModalClick() {
      var topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
      if (!topItem) return;

      var instance = PopupManager.getInstance(topItem.id);
      if (instance && instance.closeOnClickModal) {
        instance.close();
      }
    },

    openModal: function openModal(id, zIndex, dom$1, modalClass, modalFade) {
      if (_vue2.default.prototype.$isServer) return;
      if (!id || zIndex === undefined) return;
      this.modalFade = modalFade;

      var modalStack = this.modalStack;

      for (var i = 0, j = modalStack.length; i < j; i++) {
        var item = modalStack[i];
        if (item.id === id) {
          return;
        }
      }

      var modalDom = getModal();

      (0, dom.addClass)(modalDom, 'v-modal');
      if (this.modalFade && !hasModal) {
        (0, dom.addClass)(modalDom, 'v-modal-enter');
      }
      if (modalClass) {
        var classArr = modalClass.trim().split(/\s+/);
        classArr.forEach(function (item) {
          return (0, dom.addClass)(modalDom, item);
        });
      }
      setTimeout(function () {
        (0, dom.removeClass)(modalDom, 'v-modal-enter');
      }, 200);

      if (dom$1 && dom$1.parentNode && dom$1.parentNode.nodeType !== 11) {
        dom$1.parentNode.appendChild(modalDom);
      } else {
        document.body.appendChild(modalDom);
      }

      if (zIndex) {
        modalDom.style.zIndex = zIndex;
      }
      modalDom.tabIndex = 0;
      modalDom.style.display = '';

      this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
    },

    closeModal: function closeModal(id) {
      var modalStack = this.modalStack;
      var modalDom = getModal();

      if (modalStack.length > 0) {
        var topItem = modalStack[modalStack.length - 1];
        if (topItem.id === id) {
          if (topItem.modalClass) {
            var classArr = topItem.modalClass.trim().split(/\s+/);
            classArr.forEach(function (item) {
              return (0, dom.removeClass)(modalDom, item);
            });
          }

          modalStack.pop();
          if (modalStack.length > 0) {
            modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
          }
        } else {
          for (var i = modalStack.length - 1; i >= 0; i--) {
            if (modalStack[i].id === id) {
              modalStack.splice(i, 1);
              break;
            }
          }
        }
      }

      if (modalStack.length === 0) {
        if (this.modalFade) {
          (0, dom.addClass)(modalDom, 'v-modal-leave');
        }
        setTimeout(function () {
          if (modalStack.length === 0) {
            if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
            modalDom.style.display = 'none';
            PopupManager.modalDom = undefined;
          }
          (0, dom.removeClass)(modalDom, 'v-modal-leave');
        }, 200);
      }
    }
  };

  Object.defineProperty(PopupManager, 'zIndex', {
    configurable: true,
    get: function get() {
      if (!hasInitZIndex) {
        zIndex = zIndex || (_vue2.default.prototype.$ELEMENT || {}).zIndex || 2000;
        hasInitZIndex = true;
      }
      return zIndex;
    },
    set: function set(value) {
      zIndex = value;
    }
  });

  var getTopPopup = function getTopPopup() {
    if (_vue2.default.prototype.$isServer) return;
    if (PopupManager.modalStack.length > 0) {
      var topPopup = PopupManager.modalStack[PopupManager.modalStack.length - 1];
      if (!topPopup) return;
      var instance = PopupManager.getInstance(topPopup.id);

      return instance;
    }
  };

  if (!_vue2.default.prototype.$isServer) {
    // handle `esc` key when the popup is shown
    window.addEventListener('keydown', function (event) {
      if (event.keyCode === 27) {
        var topPopup = getTopPopup();

        if (topPopup && topPopup.closeOnPressEscape) {
          topPopup.handleClose ? topPopup.handleClose() : topPopup.handleAction ? topPopup.handleAction('cancel') : topPopup.close();
        }
      }
    });
  }

  exports.default = PopupManager;
  });

  unwrapExports(popupManager);

  var scrollbarWidth = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;

  exports.default = function () {
    if (_vue2.default.prototype.$isServer) return 0;
    if (scrollBarWidth !== undefined) return scrollBarWidth;

    var outer = document.createElement('div');
    outer.className = 'el-scrollbar__wrap';
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';

    var inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    scrollBarWidth = widthNoScroll - widthWithScroll;

    return scrollBarWidth;
  };



  var _vue2 = _interopRequireDefault(vue);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var scrollBarWidth = void 0;
  });

  unwrapExports(scrollbarWidth);

  var popup = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.PopupManager = undefined;



  var _vue2 = _interopRequireDefault(vue);



  var _merge2 = _interopRequireDefault(merge);



  var _popupManager2 = _interopRequireDefault(popupManager);



  var _scrollbarWidth2 = _interopRequireDefault(scrollbarWidth);



  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var idSeed = 1;

  var scrollBarWidth = void 0;

  exports.default = {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      openDelay: {},
      closeDelay: {},
      zIndex: {},
      modal: {
        type: Boolean,
        default: false
      },
      modalFade: {
        type: Boolean,
        default: true
      },
      modalClass: {},
      modalAppendToBody: {
        type: Boolean,
        default: false
      },
      lockScroll: {
        type: Boolean,
        default: true
      },
      closeOnPressEscape: {
        type: Boolean,
        default: false
      },
      closeOnClickModal: {
        type: Boolean,
        default: false
      }
    },

    beforeMount: function beforeMount() {
      this._popupId = 'popup-' + idSeed++;
      _popupManager2.default.register(this._popupId, this);
    },
    beforeDestroy: function beforeDestroy() {
      _popupManager2.default.deregister(this._popupId);
      _popupManager2.default.closeModal(this._popupId);

      this.restoreBodyStyle();
    },
    data: function data() {
      return {
        opened: false,
        bodyPaddingRight: null,
        computedBodyPaddingRight: 0,
        withoutHiddenClass: true,
        rendered: false
      };
    },


    watch: {
      visible: function visible(val) {
        var _this = this;

        if (val) {
          if (this._opening) return;
          if (!this.rendered) {
            this.rendered = true;
            _vue2.default.nextTick(function () {
              _this.open();
            });
          } else {
            this.open();
          }
        } else {
          this.close();
        }
      }
    },

    methods: {
      open: function open(options) {
        var _this2 = this;

        if (!this.rendered) {
          this.rendered = true;
        }

        var props = (0, _merge2.default)({}, this.$props || this, options);

        if (this._closeTimer) {
          clearTimeout(this._closeTimer);
          this._closeTimer = null;
        }
        clearTimeout(this._openTimer);

        var openDelay = Number(props.openDelay);
        if (openDelay > 0) {
          this._openTimer = setTimeout(function () {
            _this2._openTimer = null;
            _this2.doOpen(props);
          }, openDelay);
        } else {
          this.doOpen(props);
        }
      },
      doOpen: function doOpen(props) {
        if (this.$isServer) return;
        if (this.willOpen && !this.willOpen()) return;
        if (this.opened) return;

        this._opening = true;

        var dom$1 = this.$el;

        var modal = props.modal;

        var zIndex = props.zIndex;
        if (zIndex) {
          _popupManager2.default.zIndex = zIndex;
        }

        if (modal) {
          if (this._closing) {
            _popupManager2.default.closeModal(this._popupId);
            this._closing = false;
          }
          _popupManager2.default.openModal(this._popupId, _popupManager2.default.nextZIndex(), this.modalAppendToBody ? undefined : dom$1, props.modalClass, props.modalFade);
          if (props.lockScroll) {
            this.withoutHiddenClass = !(0, dom.hasClass)(document.body, 'el-popup-parent--hidden');
            if (this.withoutHiddenClass) {
              this.bodyPaddingRight = document.body.style.paddingRight;
              this.computedBodyPaddingRight = parseInt((0, dom.getStyle)(document.body, 'paddingRight'), 10);
            }
            scrollBarWidth = (0, _scrollbarWidth2.default)();
            var bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
            var bodyOverflowY = (0, dom.getStyle)(document.body, 'overflowY');
            if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll') && this.withoutHiddenClass) {
              document.body.style.paddingRight = this.computedBodyPaddingRight + scrollBarWidth + 'px';
            }
            (0, dom.addClass)(document.body, 'el-popup-parent--hidden');
          }
        }

        if (getComputedStyle(dom$1).position === 'static') {
          dom$1.style.position = 'absolute';
        }

        dom$1.style.zIndex = _popupManager2.default.nextZIndex();
        this.opened = true;

        this.onOpen && this.onOpen();

        this.doAfterOpen();
      },
      doAfterOpen: function doAfterOpen() {
        this._opening = false;
      },
      close: function close() {
        var _this3 = this;

        if (this.willClose && !this.willClose()) return;

        if (this._openTimer !== null) {
          clearTimeout(this._openTimer);
          this._openTimer = null;
        }
        clearTimeout(this._closeTimer);

        var closeDelay = Number(this.closeDelay);

        if (closeDelay > 0) {
          this._closeTimer = setTimeout(function () {
            _this3._closeTimer = null;
            _this3.doClose();
          }, closeDelay);
        } else {
          this.doClose();
        }
      },
      doClose: function doClose() {
        this._closing = true;

        this.onClose && this.onClose();

        if (this.lockScroll) {
          setTimeout(this.restoreBodyStyle, 200);
        }

        this.opened = false;

        this.doAfterClose();
      },
      doAfterClose: function doAfterClose() {
        _popupManager2.default.closeModal(this._popupId);
        this._closing = false;
      },
      restoreBodyStyle: function restoreBodyStyle() {
        if (this.modal && this.withoutHiddenClass) {
          document.body.style.paddingRight = this.bodyPaddingRight;
          (0, dom.removeClass)(document.body, 'el-popup-parent--hidden');
        }
        this.withoutHiddenClass = true;
      }
    }
  };
  exports.PopupManager = _popupManager2.default;
  });

  unwrapExports(popup);
  var popup_1 = popup.PopupManager;

  var popper = createCommonjsModule(function (module) {

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
  (function (root, factory) {
      if (( _typeof(module)) === 'object' && module.exports) {
          // Node. Does not work with strict CommonJS, but
          // only CommonJS-like environments that support module.exports,
          // like Node.
          module.exports = factory();
      } else {
          // Browser globals (root is window)
          root.Popper = factory();
      }
  })(undefined, function () {

      var root = window;

      // default options
      var DEFAULTS = {
          // placement of the popper
          placement: 'bottom',

          gpuAcceleration: true,

          // shift popper from its origin by the given amount of pixels (can be negative)
          offset: 0,

          // the element which will act as boundary of the popper
          boundariesElement: 'viewport',

          // amount of pixel used to define a minimum distance between the boundaries and the popper
          boundariesPadding: 5,

          // popper will try to prevent overflow following this order,
          // by default, then, it could overflow on the left and on top of the boundariesElement
          preventOverflowOrder: ['left', 'right', 'top', 'bottom'],

          // the behavior used by flip to change the placement of the popper
          flipBehavior: 'flip',

          arrowElement: '[x-arrow]',

          arrowOffset: 0,

          // list of functions used to modify the offsets before they are applied to the popper
          modifiers: ['shift', 'offset', 'preventOverflow', 'keepTogether', 'arrow', 'flip', 'applyStyle'],

          modifiersIgnored: [],

          forceAbsolute: false
      };

      /**
       * Create a new Popper.js instance
       * @constructor Popper
       * @param {HTMLElement} reference - The reference element used to position the popper
       * @param {HTMLElement|Object} popper
       *      The HTML element used as popper, or a configuration used to generate the popper.
       * @param {String} [popper.tagName='div'] The tag name of the generated popper.
       * @param {Array} [popper.classNames=['popper']] Array of classes to apply to the generated popper.
       * @param {Array} [popper.attributes] Array of attributes to apply, specify `attr:value` to assign a value to it.
       * @param {HTMLElement|String} [popper.parent=window.document.body] The parent element, given as HTMLElement or as query string.
       * @param {String} [popper.content=''] The content of the popper, it can be text, html, or node; if it is not text, set `contentType` to `html` or `node`.
       * @param {String} [popper.contentType='text'] If `html`, the `content` will be parsed as HTML. If `node`, it will be appended as-is.
       * @param {String} [popper.arrowTagName='div'] Same as `popper.tagName` but for the arrow element.
       * @param {Array} [popper.arrowClassNames='popper__arrow'] Same as `popper.classNames` but for the arrow element.
       * @param {String} [popper.arrowAttributes=['x-arrow']] Same as `popper.attributes` but for the arrow element.
       * @param {Object} options
       * @param {String} [options.placement=bottom]
       *      Placement of the popper accepted values: `top(-start, -end), right(-start, -end), bottom(-start, -right),
       *      left(-start, -end)`
       *
       * @param {HTMLElement|String} [options.arrowElement='[x-arrow]']
       *      The DOM Node used as arrow for the popper, or a CSS selector used to get the DOM node. It must be child of
       *      its parent Popper. Popper.js will apply to the given element the style required to align the arrow with its
       *      reference element.
       *      By default, it will look for a child node of the popper with the `x-arrow` attribute.
       *
       * @param {Boolean} [options.gpuAcceleration=true]
       *      When this property is set to true, the popper position will be applied using CSS3 translate3d, allowing the
       *      browser to use the GPU to accelerate the rendering.
       *      If set to false, the popper will be placed using `top` and `left` properties, not using the GPU.
       *
       * @param {Number} [options.offset=0]
       *      Amount of pixels the popper will be shifted (can be negative).
       *
       * @param {String|Element} [options.boundariesElement='viewport']
       *      The element which will define the boundaries of the popper position, the popper will never be placed outside
       *      of the defined boundaries (except if `keepTogether` is enabled)
       *
       * @param {Number} [options.boundariesPadding=5]
       *      Additional padding for the boundaries
       *
       * @param {Array} [options.preventOverflowOrder=['left', 'right', 'top', 'bottom']]
       *      Order used when Popper.js tries to avoid overflows from the boundaries, they will be checked in order,
       *      this means that the last ones will never overflow
       *
       * @param {String|Array} [options.flipBehavior='flip']
       *      The behavior used by the `flip` modifier to change the placement of the popper when the latter is trying to
       *      overlap its reference element. Defining `flip` as value, the placement will be flipped on
       *      its axis (`right - left`, `top - bottom`).
       *      You can even pass an array of placements (eg: `['right', 'left', 'top']` ) to manually specify
       *      how alter the placement when a flip is needed. (eg. in the above example, it would first flip from right to left,
       *      then, if even in its new placement, the popper is overlapping its reference element, it will be moved to top)
       *
       * @param {Array} [options.modifiers=[ 'shift', 'offset', 'preventOverflow', 'keepTogether', 'arrow', 'flip', 'applyStyle']]
       *      List of functions used to modify the data before they are applied to the popper, add your custom functions
       *      to this array to edit the offsets and placement.
       *      The function should reflect the @params and @returns of preventOverflow
       *
       * @param {Array} [options.modifiersIgnored=[]]
       *      Put here any built-in modifier name you want to exclude from the modifiers list
       *      The function should reflect the @params and @returns of preventOverflow
       *
       * @param {Boolean} [options.removeOnDestroy=false]
       *      Set to true if you want to automatically remove the popper when you call the `destroy` method.
       */
      function Popper(reference, popper, options) {
          this._reference = reference.jquery ? reference[0] : reference;
          this.state = {};

          // if the popper variable is a configuration object, parse it to generate an HTMLElement
          // generate a default popper if is not defined
          var isNotDefined = typeof popper === 'undefined' || popper === null;
          var isConfig = popper && Object.prototype.toString.call(popper) === '[object Object]';
          if (isNotDefined || isConfig) {
              this._popper = this.parse(isConfig ? popper : {});
          }
          // otherwise, use the given HTMLElement as popper
          else {
                  this._popper = popper.jquery ? popper[0] : popper;
              }

          // with {} we create a new object with the options inside it
          this._options = Object.assign({}, DEFAULTS, options);

          // refactoring modifiers' list
          this._options.modifiers = this._options.modifiers.map(function (modifier) {
              // remove ignored modifiers
              if (this._options.modifiersIgnored.indexOf(modifier) !== -1) return;

              // set the x-placement attribute before everything else because it could be used to add margins to the popper
              // margins needs to be calculated to get the correct popper offsets
              if (modifier === 'applyStyle') {
                  this._popper.setAttribute('x-placement', this._options.placement);
              }

              // return predefined modifier identified by string or keep the custom one
              return this.modifiers[modifier] || modifier;
          }.bind(this));

          // make sure to apply the popper position before any computation
          this.state.position = this._getPosition(this._popper, this._reference);
          setStyle(this._popper, { position: this.state.position, top: 0 });

          // fire the first update to position the popper in the right place
          this.update();

          // setup event listeners, they will take care of update the position in specific situations
          this._setupEventListeners();
          return this;
      }

      //
      // Methods
      //
      /**
       * Destroy the popper
       * @method
       * @memberof Popper
       */
      Popper.prototype.destroy = function () {
          this._popper.removeAttribute('x-placement');
          this._popper.style.left = '';
          this._popper.style.position = '';
          this._popper.style.top = '';
          this._popper.style[getSupportedPropertyName('transform')] = '';
          this._removeEventListeners();

          // remove the popper if user explicity asked for the deletion on destroy
          if (this._options.removeOnDestroy) {
              this._popper.remove();
          }
          return this;
      };

      /**
       * Updates the position of the popper, computing the new offsets and applying the new style
       * @method
       * @memberof Popper
       */
      Popper.prototype.update = function () {
          var data = { instance: this, styles: {} };

          // store placement inside the data object, modifiers will be able to edit `placement` if needed
          // and refer to _originalPlacement to know the original value
          data.placement = this._options.placement;
          data._originalPlacement = this._options.placement;

          // compute the popper and reference offsets and put them inside data.offsets
          data.offsets = this._getOffsets(this._popper, this._reference, data.placement);

          // get boundaries
          data.boundaries = this._getBoundaries(data, this._options.boundariesPadding, this._options.boundariesElement);

          data = this.runModifiers(data, this._options.modifiers);

          if (typeof this.state.updateCallback === 'function') {
              this.state.updateCallback(data);
          }
      };

      /**
       * If a function is passed, it will be executed after the initialization of popper with as first argument the Popper instance.
       * @method
       * @memberof Popper
       * @param {Function} callback
       */
      Popper.prototype.onCreate = function (callback) {
          // the createCallbacks return as first argument the popper instance
          callback(this);
          return this;
      };

      /**
       * If a function is passed, it will be executed after each update of popper with as first argument the set of coordinates and informations
       * used to style popper and its arrow.
       * NOTE: it doesn't get fired on the first call of the `Popper.update()` method inside the `Popper` constructor!
       * @method
       * @memberof Popper
       * @param {Function} callback
       */
      Popper.prototype.onUpdate = function (callback) {
          this.state.updateCallback = callback;
          return this;
      };

      /**
       * Helper used to generate poppers from a configuration file
       * @method
       * @memberof Popper
       * @param config {Object} configuration
       * @returns {HTMLElement} popper
       */
      Popper.prototype.parse = function (config) {
          var defaultConfig = {
              tagName: 'div',
              classNames: ['popper'],
              attributes: [],
              parent: root.document.body,
              content: '',
              contentType: 'text',
              arrowTagName: 'div',
              arrowClassNames: ['popper__arrow'],
              arrowAttributes: ['x-arrow']
          };
          config = Object.assign({}, defaultConfig, config);

          var d = root.document;

          var popper = d.createElement(config.tagName);
          addClassNames(popper, config.classNames);
          addAttributes(popper, config.attributes);
          if (config.contentType === 'node') {
              popper.appendChild(config.content.jquery ? config.content[0] : config.content);
          } else if (config.contentType === 'html') {
              popper.innerHTML = config.content;
          } else {
              popper.textContent = config.content;
          }

          if (config.arrowTagName) {
              var arrow = d.createElement(config.arrowTagName);
              addClassNames(arrow, config.arrowClassNames);
              addAttributes(arrow, config.arrowAttributes);
              popper.appendChild(arrow);
          }

          var parent = config.parent.jquery ? config.parent[0] : config.parent;

          // if the given parent is a string, use it to match an element
          // if more than one element is matched, the first one will be used as parent
          // if no elements are matched, the script will throw an error
          if (typeof parent === 'string') {
              parent = d.querySelectorAll(config.parent);
              if (parent.length > 1) {
                  console.warn('WARNING: the given `parent` query(' + config.parent + ') matched more than one element, the first one will be used');
              }
              if (parent.length === 0) {
                  throw 'ERROR: the given `parent` doesn\'t exists!';
              }
              parent = parent[0];
          }
          // if the given parent is a DOM nodes list or an array of nodes with more than one element,
          // the first one will be used as parent
          if (parent.length > 1 && parent instanceof Element === false) {
              console.warn('WARNING: you have passed as parent a list of elements, the first one will be used');
              parent = parent[0];
          }

          // append the generated popper to its parent
          parent.appendChild(popper);

          return popper;

          /**
           * Adds class names to the given element
           * @function
           * @ignore
           * @param {HTMLElement} target
           * @param {Array} classes
           */
          function addClassNames(element, classNames) {
              classNames.forEach(function (className) {
                  element.classList.add(className);
              });
          }

          /**
           * Adds attributes to the given element
           * @function
           * @ignore
           * @param {HTMLElement} target
           * @param {Array} attributes
           * @example
           * addAttributes(element, [ 'data-info:foobar' ]);
           */
          function addAttributes(element, attributes) {
              attributes.forEach(function (attribute) {
                  element.setAttribute(attribute.split(':')[0], attribute.split(':')[1] || '');
              });
          }
      };

      /**
       * Helper used to get the position which will be applied to the popper
       * @method
       * @memberof Popper
       * @param config {HTMLElement} popper element
       * @param reference {HTMLElement} reference element
       * @returns {String} position
       */
      Popper.prototype._getPosition = function (popper, reference) {
          var container = getOffsetParent(reference);

          if (this._options.forceAbsolute) {
              return 'absolute';
          }

          // Decide if the popper will be fixed
          // If the reference element is inside a fixed context, the popper will be fixed as well to allow them to scroll together
          var isParentFixed = isFixed(reference);
          return isParentFixed ? 'fixed' : 'absolute';
      };

      /**
       * Get offsets to the popper
       * @method
       * @memberof Popper
       * @access private
       * @param {Element} popper - the popper element
       * @param {Element} reference - the reference element (the popper will be relative to this)
       * @returns {Object} An object containing the offsets which will be applied to the popper
       */
      Popper.prototype._getOffsets = function (popper, reference, placement) {
          placement = placement.split('-')[0];
          var popperOffsets = {};

          popperOffsets.position = this.state.position;
          var isParentFixed = popperOffsets.position === 'fixed';

          //
          // Get reference element position
          //
          var referenceOffsets = getOffsetRectRelativeToCustomParent(reference, getOffsetParent(popper), isParentFixed);

          //
          // Get popper sizes
          //
          var popperRect = getOuterSizes(popper);

          //
          // Compute offsets of popper
          //

          // depending by the popper placement we have to compute its offsets slightly differently
          if (['right', 'left'].indexOf(placement) !== -1) {
              popperOffsets.top = referenceOffsets.top + referenceOffsets.height / 2 - popperRect.height / 2;
              if (placement === 'left') {
                  popperOffsets.left = referenceOffsets.left - popperRect.width;
              } else {
                  popperOffsets.left = referenceOffsets.right;
              }
          } else {
              popperOffsets.left = referenceOffsets.left + referenceOffsets.width / 2 - popperRect.width / 2;
              if (placement === 'top') {
                  popperOffsets.top = referenceOffsets.top - popperRect.height;
              } else {
                  popperOffsets.top = referenceOffsets.bottom;
              }
          }

          // Add width and height to our offsets object
          popperOffsets.width = popperRect.width;
          popperOffsets.height = popperRect.height;

          return {
              popper: popperOffsets,
              reference: referenceOffsets
          };
      };

      /**
       * Setup needed event listeners used to update the popper position
       * @method
       * @memberof Popper
       * @access private
       */
      Popper.prototype._setupEventListeners = function () {
          // NOTE: 1 DOM access here
          this.state.updateBound = this.update.bind(this);
          root.addEventListener('resize', this.state.updateBound);
          // if the boundariesElement is window we don't need to listen for the scroll event
          if (this._options.boundariesElement !== 'window') {
              var target = getScrollParent(this._reference);
              // here it could be both `body` or `documentElement` thanks to Firefox, we then check both
              if (target === root.document.body || target === root.document.documentElement) {
                  target = root;
              }
              target.addEventListener('scroll', this.state.updateBound);
              this.state.scrollTarget = target;
          }
      };

      /**
       * Remove event listeners used to update the popper position
       * @method
       * @memberof Popper
       * @access private
       */
      Popper.prototype._removeEventListeners = function () {
          // NOTE: 1 DOM access here
          root.removeEventListener('resize', this.state.updateBound);
          if (this._options.boundariesElement !== 'window' && this.state.scrollTarget) {
              this.state.scrollTarget.removeEventListener('scroll', this.state.updateBound);
              this.state.scrollTarget = null;
          }
          this.state.updateBound = null;
      };

      /**
       * Computed the boundaries limits and return them
       * @method
       * @memberof Popper
       * @access private
       * @param {Object} data - Object containing the property "offsets" generated by `_getOffsets`
       * @param {Number} padding - Boundaries padding
       * @param {Element} boundariesElement - Element used to define the boundaries
       * @returns {Object} Coordinates of the boundaries
       */
      Popper.prototype._getBoundaries = function (data, padding, boundariesElement) {
          // NOTE: 1 DOM access here
          var boundaries = {};
          var width, height;
          if (boundariesElement === 'window') {
              var body = root.document.body,
                  html = root.document.documentElement;

              height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
              width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);

              boundaries = {
                  top: 0,
                  right: width,
                  bottom: height,
                  left: 0
              };
          } else if (boundariesElement === 'viewport') {
              var offsetParent = getOffsetParent(this._popper);
              var scrollParent = getScrollParent(this._popper);
              var offsetParentRect = getOffsetRect(offsetParent);

              // Thanks the fucking native API, `document.body.scrollTop` & `document.documentElement.scrollTop`
              var getScrollTopValue = function getScrollTopValue(element) {
                  return element == document.body ? Math.max(document.documentElement.scrollTop, document.body.scrollTop) : element.scrollTop;
              };
              var getScrollLeftValue = function getScrollLeftValue(element) {
                  return element == document.body ? Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) : element.scrollLeft;
              };

              // if the popper is fixed we don't have to substract scrolling from the boundaries
              var scrollTop = data.offsets.popper.position === 'fixed' ? 0 : getScrollTopValue(scrollParent);
              var scrollLeft = data.offsets.popper.position === 'fixed' ? 0 : getScrollLeftValue(scrollParent);

              boundaries = {
                  top: 0 - (offsetParentRect.top - scrollTop),
                  right: root.document.documentElement.clientWidth - (offsetParentRect.left - scrollLeft),
                  bottom: root.document.documentElement.clientHeight - (offsetParentRect.top - scrollTop),
                  left: 0 - (offsetParentRect.left - scrollLeft)
              };
          } else {
              if (getOffsetParent(this._popper) === boundariesElement) {
                  boundaries = {
                      top: 0,
                      left: 0,
                      right: boundariesElement.clientWidth,
                      bottom: boundariesElement.clientHeight
                  };
              } else {
                  boundaries = getOffsetRect(boundariesElement);
              }
          }
          boundaries.left += padding;
          boundaries.right -= padding;
          boundaries.top = boundaries.top + padding;
          boundaries.bottom = boundaries.bottom - padding;
          return boundaries;
      };

      /**
       * Loop trough the list of modifiers and run them in order, each of them will then edit the data object
       * @method
       * @memberof Popper
       * @access public
       * @param {Object} data
       * @param {Array} modifiers
       * @param {Function} ends
       */
      Popper.prototype.runModifiers = function (data, modifiers, ends) {
          var modifiersToRun = modifiers.slice();
          if (ends !== undefined) {
              modifiersToRun = this._options.modifiers.slice(0, getArrayKeyIndex(this._options.modifiers, ends));
          }

          modifiersToRun.forEach(function (modifier) {
              if (isFunction(modifier)) {
                  data = modifier.call(this, data);
              }
          }.bind(this));

          return data;
      };

      /**
       * Helper used to know if the given modifier depends from another one.
       * @method
       * @memberof Popper
       * @param {String} requesting - name of requesting modifier
       * @param {String} requested - name of requested modifier
       * @returns {Boolean}
       */
      Popper.prototype.isModifierRequired = function (requesting, requested) {
          var index = getArrayKeyIndex(this._options.modifiers, requesting);
          return !!this._options.modifiers.slice(0, index).filter(function (modifier) {
              return modifier === requested;
          }).length;
      };

      //
      // Modifiers
      //

      /**
       * Modifiers list
       * @namespace Popper.modifiers
       * @memberof Popper
       * @type {Object}
       */
      Popper.prototype.modifiers = {};

      /**
       * Apply the computed styles to the popper element
       * @method
       * @memberof Popper.modifiers
       * @argument {Object} data - The data object generated by `update` method
       * @returns {Object} The same data object
       */
      Popper.prototype.modifiers.applyStyle = function (data) {
          // apply the final offsets to the popper
          // NOTE: 1 DOM access here
          var styles = {
              position: data.offsets.popper.position
          };

          // round top and left to avoid blurry text
          var left = Math.round(data.offsets.popper.left);
          var top = Math.round(data.offsets.popper.top);

          // if gpuAcceleration is set to true and transform is supported, we use `translate3d` to apply the position to the popper
          // we automatically use the supported prefixed version if needed
          var prefixedProperty;
          if (this._options.gpuAcceleration && (prefixedProperty = getSupportedPropertyName('transform'))) {
              styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
              styles.top = 0;
              styles.left = 0;
          }
          // othwerise, we use the standard `left` and `top` properties
          else {
                  styles.left = left;
                  styles.top = top;
              }

          // any property present in `data.styles` will be applied to the popper,
          // in this way we can make the 3rd party modifiers add custom styles to it
          // Be aware, modifiers could override the properties defined in the previous
          // lines of this modifier!
          Object.assign(styles, data.styles);

          setStyle(this._popper, styles);

          // set an attribute which will be useful to style the tooltip (use it to properly position its arrow)
          // NOTE: 1 DOM access here
          this._popper.setAttribute('x-placement', data.placement);

          // if the arrow modifier is required and the arrow style has been computed, apply the arrow style
          if (this.isModifierRequired(this.modifiers.applyStyle, this.modifiers.arrow) && data.offsets.arrow) {
              setStyle(data.arrowElement, data.offsets.arrow);
          }

          return data;
      };

      /**
       * Modifier used to shift the popper on the start or end of its reference element side
       * @method
       * @memberof Popper.modifiers
       * @argument {Object} data - The data object generated by `update` method
       * @returns {Object} The data object, properly modified
       */
      Popper.prototype.modifiers.shift = function (data) {
          var placement = data.placement;
          var basePlacement = placement.split('-')[0];
          var shiftVariation = placement.split('-')[1];

          // if shift shiftVariation is specified, run the modifier
          if (shiftVariation) {
              var reference = data.offsets.reference;
              var popper = getPopperClientRect(data.offsets.popper);

              var shiftOffsets = {
                  y: {
                      start: { top: reference.top },
                      end: { top: reference.top + reference.height - popper.height }
                  },
                  x: {
                      start: { left: reference.left },
                      end: { left: reference.left + reference.width - popper.width }
                  }
              };

              var axis = ['bottom', 'top'].indexOf(basePlacement) !== -1 ? 'x' : 'y';

              data.offsets.popper = Object.assign(popper, shiftOffsets[axis][shiftVariation]);
          }

          return data;
      };

      /**
       * Modifier used to make sure the popper does not overflows from it's boundaries
       * @method
       * @memberof Popper.modifiers
       * @argument {Object} data - The data object generated by `update` method
       * @returns {Object} The data object, properly modified
       */
      Popper.prototype.modifiers.preventOverflow = function (data) {
          var order = this._options.preventOverflowOrder;
          var popper = getPopperClientRect(data.offsets.popper);

          var check = {
              left: function left() {
                  var left = popper.left;
                  if (popper.left < data.boundaries.left) {
                      left = Math.max(popper.left, data.boundaries.left);
                  }
                  return { left: left };
              },
              right: function right() {
                  var left = popper.left;
                  if (popper.right > data.boundaries.right) {
                      left = Math.min(popper.left, data.boundaries.right - popper.width);
                  }
                  return { left: left };
              },
              top: function top() {
                  var top = popper.top;
                  if (popper.top < data.boundaries.top) {
                      top = Math.max(popper.top, data.boundaries.top);
                  }
                  return { top: top };
              },
              bottom: function bottom() {
                  var top = popper.top;
                  if (popper.bottom > data.boundaries.bottom) {
                      top = Math.min(popper.top, data.boundaries.bottom - popper.height);
                  }
                  return { top: top };
              }
          };

          order.forEach(function (direction) {
              data.offsets.popper = Object.assign(popper, check[direction]());
          });

          return data;
      };

      /**
       * Modifier used to make sure the popper is always near its reference
       * @method
       * @memberof Popper.modifiers
       * @argument {Object} data - The data object generated by _update method
       * @returns {Object} The data object, properly modified
       */
      Popper.prototype.modifiers.keepTogether = function (data) {
          var popper = getPopperClientRect(data.offsets.popper);
          var reference = data.offsets.reference;
          var f = Math.floor;

          if (popper.right < f(reference.left)) {
              data.offsets.popper.left = f(reference.left) - popper.width;
          }
          if (popper.left > f(reference.right)) {
              data.offsets.popper.left = f(reference.right);
          }
          if (popper.bottom < f(reference.top)) {
              data.offsets.popper.top = f(reference.top) - popper.height;
          }
          if (popper.top > f(reference.bottom)) {
              data.offsets.popper.top = f(reference.bottom);
          }

          return data;
      };

      /**
       * Modifier used to flip the placement of the popper when the latter is starting overlapping its reference element.
       * Requires the `preventOverflow` modifier before it in order to work.
       * **NOTE:** This modifier will run all its previous modifiers everytime it tries to flip the popper!
       * @method
       * @memberof Popper.modifiers
       * @argument {Object} data - The data object generated by _update method
       * @returns {Object} The data object, properly modified
       */
      Popper.prototype.modifiers.flip = function (data) {
          // check if preventOverflow is in the list of modifiers before the flip modifier.
          // otherwise flip would not work as expected.
          if (!this.isModifierRequired(this.modifiers.flip, this.modifiers.preventOverflow)) {
              console.warn('WARNING: preventOverflow modifier is required by flip modifier in order to work, be sure to include it before flip!');
              return data;
          }

          if (data.flipped && data.placement === data._originalPlacement) {
              // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
              return data;
          }

          var placement = data.placement.split('-')[0];
          var placementOpposite = getOppositePlacement(placement);
          var variation = data.placement.split('-')[1] || '';

          var flipOrder = [];
          if (this._options.flipBehavior === 'flip') {
              flipOrder = [placement, placementOpposite];
          } else {
              flipOrder = this._options.flipBehavior;
          }

          flipOrder.forEach(function (step, index) {
              if (placement !== step || flipOrder.length === index + 1) {
                  return;
              }

              placement = data.placement.split('-')[0];
              placementOpposite = getOppositePlacement(placement);

              var popperOffsets = getPopperClientRect(data.offsets.popper);

              // this boolean is used to distinguish right and bottom from top and left
              // they need different computations to get flipped
              var a = ['right', 'bottom'].indexOf(placement) !== -1;

              // using Math.floor because the reference offsets may contain decimals we are not going to consider here
              if (a && Math.floor(data.offsets.reference[placement]) > Math.floor(popperOffsets[placementOpposite]) || !a && Math.floor(data.offsets.reference[placement]) < Math.floor(popperOffsets[placementOpposite])) {
                  // we'll use this boolean to detect any flip loop
                  data.flipped = true;
                  data.placement = flipOrder[index + 1];
                  if (variation) {
                      data.placement += '-' + variation;
                  }
                  data.offsets.popper = this._getOffsets(this._popper, this._reference, data.placement).popper;

                  data = this.runModifiers(data, this._options.modifiers, this._flip);
              }
          }.bind(this));
          return data;
      };

      /**
       * Modifier used to add an offset to the popper, useful if you more granularity positioning your popper.
       * The offsets will shift the popper on the side of its reference element.
       * @method
       * @memberof Popper.modifiers
       * @argument {Object} data - The data object generated by _update method
       * @returns {Object} The data object, properly modified
       */
      Popper.prototype.modifiers.offset = function (data) {
          var offset = this._options.offset;
          var popper = data.offsets.popper;

          if (data.placement.indexOf('left') !== -1) {
              popper.top -= offset;
          } else if (data.placement.indexOf('right') !== -1) {
              popper.top += offset;
          } else if (data.placement.indexOf('top') !== -1) {
              popper.left -= offset;
          } else if (data.placement.indexOf('bottom') !== -1) {
              popper.left += offset;
          }
          return data;
      };

      /**
       * Modifier used to move the arrows on the edge of the popper to make sure them are always between the popper and the reference element
       * It will use the CSS outer size of the arrow element to know how many pixels of conjuction are needed
       * @method
       * @memberof Popper.modifiers
       * @argument {Object} data - The data object generated by _update method
       * @returns {Object} The data object, properly modified
       */
      Popper.prototype.modifiers.arrow = function (data) {
          var arrow = this._options.arrowElement;
          var arrowOffset = this._options.arrowOffset;

          // if the arrowElement is a string, suppose it's a CSS selector
          if (typeof arrow === 'string') {
              arrow = this._popper.querySelector(arrow);
          }

          // if arrow element is not found, don't run the modifier
          if (!arrow) {
              return data;
          }

          // the arrow element must be child of its popper
          if (!this._popper.contains(arrow)) {
              console.warn('WARNING: `arrowElement` must be child of its popper element!');
              return data;
          }

          // arrow depends on keepTogether in order to work
          if (!this.isModifierRequired(this.modifiers.arrow, this.modifiers.keepTogether)) {
              console.warn('WARNING: keepTogether modifier is required by arrow modifier in order to work, be sure to include it before arrow!');
              return data;
          }

          var arrowStyle = {};
          var placement = data.placement.split('-')[0];
          var popper = getPopperClientRect(data.offsets.popper);
          var reference = data.offsets.reference;
          var isVertical = ['left', 'right'].indexOf(placement) !== -1;

          var len = isVertical ? 'height' : 'width';
          var side = isVertical ? 'top' : 'left';
          var altSide = isVertical ? 'left' : 'top';
          var opSide = isVertical ? 'bottom' : 'right';
          var arrowSize = getOuterSizes(arrow)[len];

          //
          // extends keepTogether behavior making sure the popper and its reference have enough pixels in conjuction
          //

          // top/left side
          if (reference[opSide] - arrowSize < popper[side]) {
              data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowSize);
          }
          // bottom/right side
          if (reference[side] + arrowSize > popper[opSide]) {
              data.offsets.popper[side] += reference[side] + arrowSize - popper[opSide];
          }

          // compute center of the popper
          var center = reference[side] + (arrowOffset || reference[len] / 2 - arrowSize / 2);

          var sideValue = center - popper[side];

          // prevent arrow from being placed not contiguously to its popper
          sideValue = Math.max(Math.min(popper[len] - arrowSize - 8, sideValue), 8);
          arrowStyle[side] = sideValue;
          arrowStyle[altSide] = ''; // make sure to remove any old style from the arrow

          data.offsets.arrow = arrowStyle;
          data.arrowElement = arrow;

          return data;
      };

      //
      // Helpers
      //

      /**
       * Get the outer sizes of the given element (offset size + margins)
       * @function
       * @ignore
       * @argument {Element} element
       * @returns {Object} object containing width and height properties
       */
      function getOuterSizes(element) {
          // NOTE: 1 DOM access here
          var _display = element.style.display,
              _visibility = element.style.visibility;
          element.style.display = 'block';element.style.visibility = 'hidden';
          var calcWidthToForceRepaint = element.offsetWidth;

          // original method
          var styles = root.getComputedStyle(element);
          var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
          var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
          var result = { width: element.offsetWidth + y, height: element.offsetHeight + x };

          // reset element styles
          element.style.display = _display;element.style.visibility = _visibility;
          return result;
      }

      /**
       * Get the opposite placement of the given one/
       * @function
       * @ignore
       * @argument {String} placement
       * @returns {String} flipped placement
       */
      function getOppositePlacement(placement) {
          var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
          return placement.replace(/left|right|bottom|top/g, function (matched) {
              return hash[matched];
          });
      }

      /**
       * Given the popper offsets, generate an output similar to getBoundingClientRect
       * @function
       * @ignore
       * @argument {Object} popperOffsets
       * @returns {Object} ClientRect like output
       */
      function getPopperClientRect(popperOffsets) {
          var offsets = Object.assign({}, popperOffsets);
          offsets.right = offsets.left + offsets.width;
          offsets.bottom = offsets.top + offsets.height;
          return offsets;
      }

      /**
       * Given an array and the key to find, returns its index
       * @function
       * @ignore
       * @argument {Array} arr
       * @argument keyToFind
       * @returns index or null
       */
      function getArrayKeyIndex(arr, keyToFind) {
          var i = 0,
              key;
          for (key in arr) {
              if (arr[key] === keyToFind) {
                  return i;
              }
              i++;
          }
          return null;
      }

      /**
       * Get CSS computed property of the given element
       * @function
       * @ignore
       * @argument {Eement} element
       * @argument {String} property
       */
      function getStyleComputedProperty(element, property) {
          // NOTE: 1 DOM access here
          var css = root.getComputedStyle(element, null);
          return css[property];
      }

      /**
       * Returns the offset parent of the given element
       * @function
       * @ignore
       * @argument {Element} element
       * @returns {Element} offset parent
       */
      function getOffsetParent(element) {
          // NOTE: 1 DOM access here
          var offsetParent = element.offsetParent;
          return offsetParent === root.document.body || !offsetParent ? root.document.documentElement : offsetParent;
      }

      /**
       * Returns the scrolling parent of the given element
       * @function
       * @ignore
       * @argument {Element} element
       * @returns {Element} offset parent
       */
      function getScrollParent(element) {
          var parent = element.parentNode;

          if (!parent) {
              return element;
          }

          if (parent === root.document) {
              // Firefox puts the scrollTOp value on `documentElement` instead of `body`, we then check which of them is
              // greater than 0 and return the proper element
              if (root.document.body.scrollTop || root.document.body.scrollLeft) {
                  return root.document.body;
              } else {
                  return root.document.documentElement;
              }
          }

          // Firefox want us to check `-x` and `-y` variations as well
          if (['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow')) !== -1 || ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow-x')) !== -1 || ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow-y')) !== -1) {
              // If the detected scrollParent is body, we perform an additional check on its parentNode
              // in this way we'll get body if the browser is Chrome-ish, or documentElement otherwise
              // fixes issue #65
              return parent;
          }
          return getScrollParent(element.parentNode);
      }

      /**
       * Check if the given element is fixed or is inside a fixed parent
       * @function
       * @ignore
       * @argument {Element} element
       * @argument {Element} customContainer
       * @returns {Boolean} answer to "isFixed?"
       */
      function isFixed(element) {
          if (element === root.document.body) {
              return false;
          }
          if (getStyleComputedProperty(element, 'position') === 'fixed') {
              return true;
          }
          return element.parentNode ? isFixed(element.parentNode) : element;
      }

      /**
       * Set the style to the given popper
       * @function
       * @ignore
       * @argument {Element} element - Element to apply the style to
       * @argument {Object} styles - Object with a list of properties and values which will be applied to the element
       */
      function setStyle(element, styles) {
          function is_numeric(n) {
              return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
          }
          Object.keys(styles).forEach(function (prop) {
              var unit = '';
              // add unit if the value is numeric and is one of the following
              if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && is_numeric(styles[prop])) {
                  unit = 'px';
              }
              element.style[prop] = styles[prop] + unit;
          });
      }

      /**
       * Check if the given variable is a function
       * @function
       * @ignore
       * @argument {*} functionToCheck - variable to check
       * @returns {Boolean} answer to: is a function?
       */
      function isFunction(functionToCheck) {
          var getType = {};
          return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
      }

      /**
       * Get the position of the given element, relative to its offset parent
       * @function
       * @ignore
       * @param {Element} element
       * @return {Object} position - Coordinates of the element and its `scrollTop`
       */
      function getOffsetRect(element) {
          var elementRect = {
              width: element.offsetWidth,
              height: element.offsetHeight,
              left: element.offsetLeft,
              top: element.offsetTop
          };

          elementRect.right = elementRect.left + elementRect.width;
          elementRect.bottom = elementRect.top + elementRect.height;

          // position
          return elementRect;
      }

      /**
       * Get bounding client rect of given element
       * @function
       * @ignore
       * @param {HTMLElement} element
       * @return {Object} client rect
       */
      function getBoundingClientRect(element) {
          var rect = element.getBoundingClientRect();

          // whether the IE version is lower than 11
          var isIE = navigator.userAgent.indexOf("MSIE") != -1;

          // fix ie document bounding top always 0 bug
          var rectTop = isIE && element.tagName === 'HTML' ? -element.scrollTop : rect.top;

          return {
              left: rect.left,
              top: rectTop,
              right: rect.right,
              bottom: rect.bottom,
              width: rect.right - rect.left,
              height: rect.bottom - rectTop
          };
      }

      /**
       * Given an element and one of its parents, return the offset
       * @function
       * @ignore
       * @param {HTMLElement} element
       * @param {HTMLElement} parent
       * @return {Object} rect
       */
      function getOffsetRectRelativeToCustomParent(element, parent, fixed) {
          var elementRect = getBoundingClientRect(element);
          var parentRect = getBoundingClientRect(parent);

          if (fixed) {
              var scrollParent = getScrollParent(parent);
              parentRect.top += scrollParent.scrollTop;
              parentRect.bottom += scrollParent.scrollTop;
              parentRect.left += scrollParent.scrollLeft;
              parentRect.right += scrollParent.scrollLeft;
          }

          var rect = {
              top: elementRect.top - parentRect.top,
              left: elementRect.left - parentRect.left,
              bottom: elementRect.top - parentRect.top + elementRect.height,
              right: elementRect.left - parentRect.left + elementRect.width,
              width: elementRect.width,
              height: elementRect.height
          };
          return rect;
      }

      /**
       * Get the prefixed supported property name
       * @function
       * @ignore
       * @argument {String} property (camelCase)
       * @returns {String} prefixed property (camelCase)
       */
      function getSupportedPropertyName(property) {
          var prefixes = ['', 'ms', 'webkit', 'moz', 'o'];

          for (var i = 0; i < prefixes.length; i++) {
              var toCheck = prefixes[i] ? prefixes[i] + property.charAt(0).toUpperCase() + property.slice(1) : property;
              if (typeof root.document.body.style[toCheck] !== 'undefined') {
                  return toCheck;
              }
          }
          return null;
      }

      /**
       * The Object.assign() method is used to copy the values of all enumerable own properties from one or more source
       * objects to a target object. It will return the target object.
       * This polyfill doesn't support symbol properties, since ES5 doesn't have symbols anyway
       * Source: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
       * @function
       * @ignore
       */
      if (!Object.assign) {
          Object.defineProperty(Object, 'assign', {
              enumerable: false,
              configurable: true,
              writable: true,
              value: function value(target) {
                  if (target === undefined || target === null) {
                      throw new TypeError('Cannot convert first argument to object');
                  }

                  var to = Object(target);
                  for (var i = 1; i < arguments.length; i++) {
                      var nextSource = arguments[i];
                      if (nextSource === undefined || nextSource === null) {
                          continue;
                      }
                      nextSource = Object(nextSource);

                      var keysArray = Object.keys(nextSource);
                      for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                          var nextKey = keysArray[nextIndex];
                          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                          if (desc !== undefined && desc.enumerable) {
                              to[nextKey] = nextSource[nextKey];
                          }
                      }
                  }
                  return to;
              }
          });
      }

      return Popper;
  });
  });

  var vuePopper = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  var _vue2 = _interopRequireDefault(vue);



  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var PopperJS = _vue2.default.prototype.$isServer ? function () {} : popper;
  var stop = function stop(e) {
    return e.stopPropagation();
  };

  /**
   * @param {HTMLElement} [reference=$refs.reference] - The reference element used to position the popper.
   * @param {HTMLElement} [popper=$refs.popper] - The HTML element used as popper, or a configuration used to generate the popper.
   * @param {String} [placement=button] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)
   * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
   * @param {Boolean} [visible=false] Visibility of the popup element.
   * @param {Boolean} [visible-arrow=false] Visibility of the arrow, no style.
   */
  exports.default = {
    props: {
      transformOrigin: {
        type: [Boolean, String],
        default: true
      },
      placement: {
        type: String,
        default: 'bottom'
      },
      boundariesPadding: {
        type: Number,
        default: 5
      },
      reference: {},
      popper: {},
      offset: {
        default: 0
      },
      value: Boolean,
      visibleArrow: Boolean,
      arrowOffset: {
        type: Number,
        default: 35
      },
      appendToBody: {
        type: Boolean,
        default: true
      },
      popperOptions: {
        type: Object,
        default: function _default() {
          return {
            gpuAcceleration: false
          };
        }
      }
    },

    data: function data() {
      return {
        showPopper: false,
        currentPlacement: ''
      };
    },


    watch: {
      value: {
        immediate: true,
        handler: function handler(val) {
          this.showPopper = val;
          this.$emit('input', val);
        }
      },

      showPopper: function showPopper(val) {
        if (this.disabled) return;
        val ? this.updatePopper() : this.destroyPopper();
        this.$emit('input', val);
      }
    },

    methods: {
      createPopper: function createPopper() {
        var _this = this;

        if (this.$isServer) return;
        this.currentPlacement = this.currentPlacement || this.placement;
        if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
          return;
        }

        var options = this.popperOptions;
        var popper = this.popperElm = this.popperElm || this.popper || this.$refs.popper;
        var reference = this.referenceElm = this.referenceElm || this.reference || this.$refs.reference;

        if (!reference && this.$slots.reference && this.$slots.reference[0]) {
          reference = this.referenceElm = this.$slots.reference[0].elm;
        }

        if (!popper || !reference) return;
        if (this.visibleArrow) this.appendArrow(popper);
        if (this.appendToBody) document.body.appendChild(this.popperElm);
        if (this.popperJS && this.popperJS.destroy) {
          this.popperJS.destroy();
        }

        options.placement = this.currentPlacement;
        options.offset = this.offset;
        options.arrowOffset = this.arrowOffset;
        this.popperJS = new PopperJS(reference, popper, options);
        this.popperJS.onCreate(function (_) {
          _this.$emit('created', _this);
          _this.resetTransformOrigin();
          _this.$nextTick(_this.updatePopper);
        });
        if (typeof options.onUpdate === 'function') {
          this.popperJS.onUpdate(options.onUpdate);
        }
        this.popperJS._popper.style.zIndex = popup.PopupManager.nextZIndex();
        this.popperElm.addEventListener('click', stop);
      },
      updatePopper: function updatePopper() {
        var popperJS = this.popperJS;
        if (popperJS) {
          popperJS.update();
          if (popperJS._popper) {
            popperJS._popper.style.zIndex = popup.PopupManager.nextZIndex();
          }
        } else {
          this.createPopper();
        }
      },
      doDestroy: function doDestroy(forceDestroy) {
        /* istanbul ignore if */
        if (!this.popperJS || this.showPopper && !forceDestroy) return;
        this.popperJS.destroy();
        this.popperJS = null;
      },
      destroyPopper: function destroyPopper() {
        if (this.popperJS) {
          this.resetTransformOrigin();
        }
      },
      resetTransformOrigin: function resetTransformOrigin() {
        if (!this.transformOrigin) return;
        var placementMap = {
          top: 'bottom',
          bottom: 'top',
          left: 'right',
          right: 'left'
        };
        var placement = this.popperJS._popper.getAttribute('x-placement').split('-')[0];
        var origin = placementMap[placement];
        this.popperJS._popper.style.transformOrigin = typeof this.transformOrigin === 'string' ? this.transformOrigin : ['top', 'bottom'].indexOf(placement) > -1 ? 'center ' + origin : origin + ' center';
      },
      appendArrow: function appendArrow(element) {
        var hash = void 0;
        if (this.appended) {
          return;
        }

        this.appended = true;

        for (var item in element.attributes) {
          if (/^_v-/.test(element.attributes[item].name)) {
            hash = element.attributes[item].name;
            break;
          }
        }

        var arrow = document.createElement('div');

        if (hash) {
          arrow.setAttribute(hash, '');
        }
        arrow.setAttribute('x-arrow', '');
        arrow.className = 'popper__arrow';
        element.appendChild(arrow);
      }
    },

    beforeDestroy: function beforeDestroy() {
      this.doDestroy(true);
      if (this.popperElm && this.popperElm.parentNode === document.body) {
        this.popperElm.removeEventListener('click', stop);
        document.body.removeChild(this.popperElm);
      }
    },


    // call destroy in keep-alive mode
    deactivated: function deactivated() {
      this.$options.beforeDestroy[0].call(this);
    }
  };
  });

  unwrapExports(vuePopper);

  var tooltip = createCommonjsModule(function (module) {
  module.exports =
  /******/ (function(modules) { // webpackBootstrap
  /******/ 	// The module cache
  /******/ 	var installedModules = {};
  /******/
  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {
  /******/
  /******/ 		// Check if module is in cache
  /******/ 		if(installedModules[moduleId]) {
  /******/ 			return installedModules[moduleId].exports;
  /******/ 		}
  /******/ 		// Create a new module (and put it into the cache)
  /******/ 		var module = installedModules[moduleId] = {
  /******/ 			i: moduleId,
  /******/ 			l: false,
  /******/ 			exports: {}
  /******/ 		};
  /******/
  /******/ 		// Execute the module function
  /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  /******/
  /******/ 		// Flag the module as loaded
  /******/ 		module.l = true;
  /******/
  /******/ 		// Return the exports of the module
  /******/ 		return module.exports;
  /******/ 	}
  /******/
  /******/
  /******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = modules;
  /******/
  /******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = installedModules;
  /******/
  /******/ 	// define getter function for harmony exports
  /******/ 	__webpack_require__.d = function(exports, name, getter) {
  /******/ 		if(!__webpack_require__.o(exports, name)) {
  /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
  /******/ 		}
  /******/ 	};
  /******/
  /******/ 	// define __esModule on exports
  /******/ 	__webpack_require__.r = function(exports) {
  /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
  /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  /******/ 		}
  /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
  /******/ 	};
  /******/
  /******/ 	// create a fake namespace object
  /******/ 	// mode & 1: value is a module id, require it
  /******/ 	// mode & 2: merge all properties of value into the ns
  /******/ 	// mode & 4: return value when already ns object
  /******/ 	// mode & 8|1: behave like require
  /******/ 	__webpack_require__.t = function(value, mode) {
  /******/ 		if(mode & 1) value = __webpack_require__(value);
  /******/ 		if(mode & 8) return value;
  /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
  /******/ 		var ns = Object.create(null);
  /******/ 		__webpack_require__.r(ns);
  /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
  /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
  /******/ 		return ns;
  /******/ 	};
  /******/
  /******/ 	// getDefaultExport function for compatibility with non-harmony modules
  /******/ 	__webpack_require__.n = function(module) {
  /******/ 		var getter = module && module.__esModule ?
  /******/ 			function getDefault() { return module['default']; } :
  /******/ 			function getModuleExports() { return module; };
  /******/ 		__webpack_require__.d(getter, 'a', getter);
  /******/ 		return getter;
  /******/ 	};
  /******/
  /******/ 	// Object.prototype.hasOwnProperty.call
  /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  /******/
  /******/ 	// __webpack_public_path__
  /******/ 	__webpack_require__.p = "/dist/";
  /******/
  /******/
  /******/ 	// Load entry module and return exports
  /******/ 	return __webpack_require__(__webpack_require__.s = 131);
  /******/ })
  /************************************************************************/
  /******/ ({

  /***/ 131:
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  __webpack_require__.r(__webpack_exports__);

  // EXTERNAL MODULE: external "element-ui/lib/utils/vue-popper"
  var vue_popper_ = __webpack_require__(5);
  var vue_popper_default = /*#__PURE__*/__webpack_require__.n(vue_popper_);

  // EXTERNAL MODULE: external "throttle-debounce/debounce"
  var debounce_ = __webpack_require__(17);
  var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce_);

  // EXTERNAL MODULE: external "element-ui/lib/utils/dom"
  var dom_ = __webpack_require__(2);

  // EXTERNAL MODULE: external "element-ui/lib/utils/util"
  var util_ = __webpack_require__(3);

  // EXTERNAL MODULE: external "vue"
  var external_vue_ = __webpack_require__(7);
  var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

  // CONCATENATED MODULE: ./packages/tooltip/src/main.js






  /* harmony default export */ var main = ({
    name: 'ElTooltip',

    mixins: [vue_popper_default.a],

    props: {
      openDelay: {
        type: Number,
        default: 0
      },
      disabled: Boolean,
      manual: Boolean,
      effect: {
        type: String,
        default: 'dark'
      },
      arrowOffset: {
        type: Number,
        default: 0
      },
      popperClass: String,
      content: String,
      visibleArrow: {
        default: true
      },
      transition: {
        type: String,
        default: 'el-fade-in-linear'
      },
      popperOptions: {
        default: function _default() {
          return {
            boundariesPadding: 10,
            gpuAcceleration: false
          };
        }
      },
      enterable: {
        type: Boolean,
        default: true
      },
      hideAfter: {
        type: Number,
        default: 0
      },
      tabindex: {
        type: Number,
        default: 0
      }
    },

    data: function data() {
      return {
        tooltipId: 'el-tooltip-' + Object(util_["generateId"])(),
        timeoutPending: null,
        focusing: false
      };
    },
    beforeCreate: function beforeCreate() {
      var _this = this;

      if (this.$isServer) return;

      this.popperVM = new external_vue_default.a({
        data: { node: '' },
        render: function render(h) {
          return this.node;
        }
      }).$mount();

      this.debounceClose = debounce_default()(200, function () {
        return _this.handleClosePopper();
      });
    },
    render: function render(h) {
      var _this2 = this;

      if (this.popperVM) {
        this.popperVM.node = h(
          'transition',
          {
            attrs: {
              name: this.transition
            },
            on: {
              'afterLeave': this.doDestroy
            }
          },
          [h(
            'div',
            {
              on: {
                'mouseleave': function mouseleave() {
                  _this2.setExpectedState(false);_this2.debounceClose();
                },
                'mouseenter': function mouseenter() {
                  _this2.setExpectedState(true);
                }
              },

              ref: 'popper',
              attrs: { role: 'tooltip',
                id: this.tooltipId,
                'aria-hidden': this.disabled || !this.showPopper ? 'true' : 'false'
              },
              directives: [{
                name: 'show',
                value: !this.disabled && this.showPopper
              }],

              'class': ['el-tooltip__popper', 'is-' + this.effect, this.popperClass] },
            [this.$slots.content || this.content]
          )]
        );
      }

      var firstElement = this.getFirstElement();
      if (!firstElement) return null;

      var data = firstElement.data = firstElement.data || {};
      data.staticClass = this.addTooltipClass(data.staticClass);

      return firstElement;
    },
    mounted: function mounted() {
      var _this3 = this;

      this.referenceElm = this.$el;
      if (this.$el.nodeType === 1) {
        this.$el.setAttribute('aria-describedby', this.tooltipId);
        this.$el.setAttribute('tabindex', this.tabindex);
        Object(dom_["on"])(this.referenceElm, 'mouseenter', this.show);
        Object(dom_["on"])(this.referenceElm, 'mouseleave', this.hide);
        Object(dom_["on"])(this.referenceElm, 'focus', function () {
          if (!_this3.$slots.default || !_this3.$slots.default.length) {
            _this3.handleFocus();
            return;
          }
          var instance = _this3.$slots.default[0].componentInstance;
          if (instance && instance.focus) {
            instance.focus();
          } else {
            _this3.handleFocus();
          }
        });
        Object(dom_["on"])(this.referenceElm, 'blur', this.handleBlur);
        Object(dom_["on"])(this.referenceElm, 'click', this.removeFocusing);
      }
      // fix issue https://github.com/ElemeFE/element/issues/14424
      if (this.value && this.popperVM) {
        this.popperVM.$nextTick(function () {
          if (_this3.value) {
            _this3.updatePopper();
          }
        });
      }
    },

    watch: {
      focusing: function focusing(val) {
        if (val) {
          Object(dom_["addClass"])(this.referenceElm, 'focusing');
        } else {
          Object(dom_["removeClass"])(this.referenceElm, 'focusing');
        }
      }
    },
    methods: {
      show: function show() {
        this.setExpectedState(true);
        this.handleShowPopper();
      },
      hide: function hide() {
        this.setExpectedState(false);
        this.debounceClose();
      },
      handleFocus: function handleFocus() {
        this.focusing = true;
        this.show();
      },
      handleBlur: function handleBlur() {
        this.focusing = false;
        this.hide();
      },
      removeFocusing: function removeFocusing() {
        this.focusing = false;
      },
      addTooltipClass: function addTooltipClass(prev) {
        if (!prev) {
          return 'el-tooltip';
        } else {
          return 'el-tooltip ' + prev.replace('el-tooltip', '');
        }
      },
      handleShowPopper: function handleShowPopper() {
        var _this4 = this;

        if (!this.expectedState || this.manual) return;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
          _this4.showPopper = true;
        }, this.openDelay);

        if (this.hideAfter > 0) {
          this.timeoutPending = setTimeout(function () {
            _this4.showPopper = false;
          }, this.hideAfter);
        }
      },
      handleClosePopper: function handleClosePopper() {
        if (this.enterable && this.expectedState || this.manual) return;
        clearTimeout(this.timeout);

        if (this.timeoutPending) {
          clearTimeout(this.timeoutPending);
        }
        this.showPopper = false;

        if (this.disabled) {
          this.doDestroy();
        }
      },
      setExpectedState: function setExpectedState(expectedState) {
        if (expectedState === false) {
          clearTimeout(this.timeoutPending);
        }
        this.expectedState = expectedState;
      },
      getFirstElement: function getFirstElement() {
        var slots = this.$slots.default;
        if (!Array.isArray(slots)) return null;
        var element = null;
        for (var index = 0; index < slots.length; index++) {
          if (slots[index] && slots[index].tag) {
            element = slots[index];
          }      }
        return element;
      }
    },

    beforeDestroy: function beforeDestroy() {
      this.popperVM && this.popperVM.$destroy();
    },
    destroyed: function destroyed() {
      var reference = this.referenceElm;
      if (reference.nodeType === 1) {
        Object(dom_["off"])(reference, 'mouseenter', this.show);
        Object(dom_["off"])(reference, 'mouseleave', this.hide);
        Object(dom_["off"])(reference, 'focus', this.handleFocus);
        Object(dom_["off"])(reference, 'blur', this.handleBlur);
        Object(dom_["off"])(reference, 'click', this.removeFocusing);
      }
    }
  });
  // CONCATENATED MODULE: ./packages/tooltip/index.js


  /* istanbul ignore next */
  main.install = function (Vue) {
    Vue.component(main.name, main);
  };

  /* harmony default export */ var tooltip = __webpack_exports__["default"] = (main);

  /***/ }),

  /***/ 17:
  /***/ (function(module, exports) {

  module.exports = debounce;

  /***/ }),

  /***/ 2:
  /***/ (function(module, exports) {

  module.exports = dom;

  /***/ }),

  /***/ 3:
  /***/ (function(module, exports) {

  module.exports = util;

  /***/ }),

  /***/ 5:
  /***/ (function(module, exports) {

  module.exports = vuePopper;

  /***/ }),

  /***/ 7:
  /***/ (function(module, exports) {

  module.exports = vue;

  /***/ })

  /******/ });
  });

  var ElToolTip = unwrapExports(tooltip);

  //
  var script$1 = {
    name: 'XEllipsis',
    components: {
      VClamp: vueClamp,
      ElToolTip: ElToolTip
    },
    props: {
      mode: {
        type: String,
        default: 'clamp'
      },
      maxLines: {
        type: Number,
        default: 1
      },
      label: {
        type: String,
        default: ''
      },
      autoresize: {
        type: Boolean,
        default: true
      },
      wrapperClass: {
        type: String,
        default: ''
      }
    },
    data: function data() {
      var _this = this;

      return {
        labelClamped: false,
        ellipsis: false,
        tipClass: '',
        keepState: false,
        hideTooltipFun: this.$lodash.debounce(function () {
          if (_this.keepState) ; else {
            _this.ellipsis = false;
          }
        }, 200, {
          maxWait: 400
        })
      };
    },
    watch: {
      label: {
        handler: function handler(val, oldval) {
          var _this2 = this;

          this.$nextTick(function () {
            _this2.$refs.clamp && _this2.$refs.clamp.cleanUp();
          });
        }
      }
    },
    mounted: function mounted() {},
    methods: {
      showTooltip: function showTooltip() {
        var _this3 = this;

        var textDiv = this.$refs.textOverflow;
        this.tipClass = 'tip_overflow_popper' + this._uid;
        this.$nextTick(function () {
          var popper = document.getElementsByClassName(_this3.tipClass)[0];

          if (popper) {
            popper.onmouseenter = function () {
              _this3.keepState = true;
            };

            popper.onmouseleave = function () {
              _this3.keepState = false;

              _this3.debounceHideTooltip();
            };
          }
        });

        if (textDiv && textDiv.scrollWidth > textDiv.clientWidth) {
          this.ellipsis = true;
        } else {
          this.ellipsis = false;
        }
      },
      debounceHideTooltip: function debounceHideTooltip() {
        this.hideTooltipFun();
      },
      clampChange: function clampChange(clamped) {
        this.labelClamped = clamped;
      }
    }
  };

  /* script */
  var __vue_script__$1 = script$1;
  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "e-ellipsis" },
      [
        _vm.mode === "origin"
          ? _c(
              "el-tooltip",
              {
                attrs: {
                  placement: "top",
                  "popper-class":
                    _vm.wrapperClass + " e-ellipsis-tooltip " + _vm.tipClass,
                  manual: true
                },
                nativeOn: {
                  mouseenter: function($event) {
                    return _vm.showTooltip($event)
                  },
                  mouseleave: function($event) {
                    return _vm.debounceHideTooltip($event)
                  }
                },
                model: {
                  value: _vm.ellipsis,
                  callback: function($$v) {
                    _vm.ellipsis = $$v;
                  },
                  expression: "ellipsis"
                }
              },
              [
                _c(
                  "div",
                  {
                    staticClass: "x-tip-content",
                    attrs: { slot: "content" },
                    slot: "content"
                  },
                  [_vm._v("\n      " + _vm._s(_vm.label) + "\n    ")]
                ),
                _vm._v(" "),
                _c("div", { ref: "textOverflow", staticClass: "tip-overflow" }, [
                  _vm._v("\n      " + _vm._s(_vm.label) + "\n    ")
                ])
              ]
            )
          : _c(
              "el-tooltip",
              {
                attrs: {
                  placement: "top",
                  "popper-class": _vm.wrapperClass + "e-ellipsis-tooltip",
                  disabled: !_vm.labelClamped
                }
              },
              [
                _c(
                  "div",
                  {
                    staticClass: "x-tip-content",
                    attrs: { slot: "content" },
                    slot: "content"
                  },
                  [_vm._v("\n      " + _vm._s(_vm.label) + "\n    ")]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  [
                    _c(
                      "v-clamp",
                      _vm._b(
                        {
                          ref: "clamp",
                          attrs: {
                            "max-lines": _vm.maxLines,
                            "line-height": 1,
                            autoresize: _vm.autoresize
                          },
                          on: { clampchange: _vm.clampChange }
                        },
                        "v-clamp",
                        _vm.$attrs,
                        false
                      ),
                      [_vm._v("\n        " + _vm._s(_vm.label) + "\n      ")]
                    )
                  ],
                  1
                )
              ]
            )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    var __vue_inject_styles__$1 = undefined;
    /* scoped */
    var __vue_scope_id__$1 = undefined;
    /* module identifier */
    var __vue_module_identifier__$1 = undefined;
    /* functional template */
    var __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      undefined,
      undefined,
      undefined
    );

  __vue_component__$1.install = function (vue) {
    vue.component(name, __vue_component__$1);
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var collectionUtils = createCommonjsModule(function (module) {

  var utils = module.exports = {};

  /**
   * Loops through the collection and calls the callback for each element. if the callback returns truthy, the loop is broken and returns the same value.
   * @public
   * @param {*} collection The collection to loop through. Needs to have a length property set and have indices set from 0 to length - 1.
   * @param {function} callback The callback to be called for each element. The element will be given as a parameter to the callback. If this callback returns truthy, the loop is broken and the same value is returned.
   * @returns {*} The value that a callback has returned (if truthy). Otherwise nothing.
   */
  utils.forEach = function(collection, callback) {
      for(var i = 0; i < collection.length; i++) {
          var result = callback(collection[i]);
          if(result) {
              return result;
          }
      }
  };
  });

  var elementUtils = function(options) {
      var getState = options.stateHandler.getState;

      /**
       * Tells if the element has been made detectable and ready to be listened for resize events.
       * @public
       * @param {element} The element to check.
       * @returns {boolean} True or false depending on if the element is detectable or not.
       */
      function isDetectable(element) {
          var state = getState(element);
          return state && !!state.isDetectable;
      }

      /**
       * Marks the element that it has been made detectable and ready to be listened for resize events.
       * @public
       * @param {element} The element to mark.
       */
      function markAsDetectable(element) {
          getState(element).isDetectable = true;
      }

      /**
       * Tells if the element is busy or not.
       * @public
       * @param {element} The element to check.
       * @returns {boolean} True or false depending on if the element is busy or not.
       */
      function isBusy(element) {
          return !!getState(element).busy;
      }

      /**
       * Marks the object is busy and should not be made detectable.
       * @public
       * @param {element} element The element to mark.
       * @param {boolean} busy If the element is busy or not.
       */
      function markBusy(element, busy) {
          getState(element).busy = !!busy;
      }

      return {
          isDetectable: isDetectable,
          markAsDetectable: markAsDetectable,
          isBusy: isBusy,
          markBusy: markBusy
      };
  };

  var listenerHandler = function(idHandler) {
      var eventListeners = {};

      /**
       * Gets all listeners for the given element.
       * @public
       * @param {element} element The element to get all listeners for.
       * @returns All listeners for the given element.
       */
      function getListeners(element) {
          var id = idHandler.get(element);

          if (id === undefined) {
              return [];
          }

          return eventListeners[id] || [];
      }

      /**
       * Stores the given listener for the given element. Will not actually add the listener to the element.
       * @public
       * @param {element} element The element that should have the listener added.
       * @param {function} listener The callback that the element has added.
       */
      function addListener(element, listener) {
          var id = idHandler.get(element);

          if(!eventListeners[id]) {
              eventListeners[id] = [];
          }

          eventListeners[id].push(listener);
      }

      function removeListener(element, listener) {
          var listeners = getListeners(element);
          for (var i = 0, len = listeners.length; i < len; ++i) {
              if (listeners[i] === listener) {
                listeners.splice(i, 1);
                break;
              }
          }
      }

      function removeAllListeners(element) {
        var listeners = getListeners(element);
        if (!listeners) { return; }
        listeners.length = 0;
      }

      return {
          get: getListeners,
          add: addListener,
          removeListener: removeListener,
          removeAllListeners: removeAllListeners
      };
  };

  var idGenerator = function() {
      var idCount = 1;

      /**
       * Generates a new unique id in the context.
       * @public
       * @returns {number} A unique id in the context.
       */
      function generate() {
          return idCount++;
      }

      return {
          generate: generate
      };
  };

  var idHandler = function(options) {
      var idGenerator     = options.idGenerator;
      var getState        = options.stateHandler.getState;

      /**
       * Gets the resize detector id of the element.
       * @public
       * @param {element} element The target element to get the id of.
       * @returns {string|number|null} The id of the element. Null if it has no id.
       */
      function getId(element) {
          var state = getState(element);

          if (state && state.id !== undefined) {
              return state.id;
          }

          return null;
      }

      /**
       * Sets the resize detector id of the element. Requires the element to have a resize detector state initialized.
       * @public
       * @param {element} element The target element to set the id of.
       * @returns {string|number|null} The id of the element.
       */
      function setId(element) {
          var state = getState(element);

          if (!state) {
              throw new Error("setId required the element to have a resize detection state.");
          }

          var id = idGenerator.generate();

          state.id = id;

          return id;
      }

      return {
          get: getId,
          set: setId
      };
  };

  /* global console: false */

  /**
   * Reporter that handles the reporting of logs, warnings and errors.
   * @public
   * @param {boolean} quiet Tells if the reporter should be quiet or not.
   */
  var reporter = function(quiet) {
      function noop() {
          //Does nothing.
      }

      var reporter = {
          log: noop,
          warn: noop,
          error: noop
      };

      if(!quiet && window.console) {
          var attachFunction = function(reporter, name) {
              //The proxy is needed to be able to call the method with the console context,
              //since we cannot use bind.
              reporter[name] = function reporterProxy() {
                  var f = console[name];
                  if (f.apply) { //IE9 does not support console.log.apply :)
                      f.apply(console, arguments);
                  } else {
                      for (var i = 0; i < arguments.length; i++) {
                          f(arguments[i]);
                      }
                  }
              };
          };

          attachFunction(reporter, "log");
          attachFunction(reporter, "warn");
          attachFunction(reporter, "error");
      }

      return reporter;
  };

  var browserDetector = createCommonjsModule(function (module) {

  var detector = module.exports = {};

  detector.isIE = function(version) {
      function isAnyIeVersion() {
          var agent = navigator.userAgent.toLowerCase();
          return agent.indexOf("msie") !== -1 || agent.indexOf("trident") !== -1 || agent.indexOf(" edge/") !== -1;
      }

      if(!isAnyIeVersion()) {
          return false;
      }

      if(!version) {
          return true;
      }

      //Shamelessly stolen from https://gist.github.com/padolsey/527683
      var ieVersion = (function(){
          var undef,
              v = 3,
              div = document.createElement("div"),
              all = div.getElementsByTagName("i");

          do {
              div.innerHTML = "<!--[if gt IE " + (++v) + "]><i></i><![endif]-->";
          }
          while (all[0]);

          return v > 4 ? v : undef;
      }());

      return version === ieVersion;
  };

  detector.isLegacyOpera = function() {
      return !!window.opera;
  };
  });

  var utils_1 = createCommonjsModule(function (module) {

  var utils = module.exports = {};

  utils.getOption = getOption;

  function getOption(options, name, defaultValue) {
      var value = options[name];

      if((value === undefined || value === null) && defaultValue !== undefined) {
          return defaultValue;
      }

      return value;
  }
  });

  var batchProcessor = function batchProcessorMaker(options) {
      options             = options || {};
      var reporter        = options.reporter;
      var asyncProcess    = utils_1.getOption(options, "async", true);
      var autoProcess     = utils_1.getOption(options, "auto", true);

      if(autoProcess && !asyncProcess) {
          reporter && reporter.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true.");
          asyncProcess = true;
      }

      var batch = Batch();
      var asyncFrameHandler;
      var isProcessing = false;

      function addFunction(level, fn) {
          if(!isProcessing && autoProcess && asyncProcess && batch.size() === 0) {
              // Since this is async, it is guaranteed to be executed after that the fn is added to the batch.
              // This needs to be done before, since we're checking the size of the batch to be 0.
              processBatchAsync();
          }

          batch.add(level, fn);
      }

      function processBatch() {
          // Save the current batch, and create a new batch so that incoming functions are not added into the currently processing batch.
          // Continue processing until the top-level batch is empty (functions may be added to the new batch while processing, and so on).
          isProcessing = true;
          while (batch.size()) {
              var processingBatch = batch;
              batch = Batch();
              processingBatch.process();
          }
          isProcessing = false;
      }

      function forceProcessBatch(localAsyncProcess) {
          if (isProcessing) {
              return;
          }

          if(localAsyncProcess === undefined) {
              localAsyncProcess = asyncProcess;
          }

          if(asyncFrameHandler) {
              cancelFrame(asyncFrameHandler);
              asyncFrameHandler = null;
          }

          if(localAsyncProcess) {
              processBatchAsync();
          } else {
              processBatch();
          }
      }

      function processBatchAsync() {
          asyncFrameHandler = requestFrame(processBatch);
      }

      function cancelFrame(listener) {
          // var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
          var cancel = clearTimeout;
          return cancel(listener);
      }

      function requestFrame(callback) {
          // var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) { return window.setTimeout(fn, 20); };
          var raf = function(fn) { return setTimeout(fn, 0); };
          return raf(callback);
      }

      return {
          add: addFunction,
          force: forceProcessBatch
      };
  };

  function Batch() {
      var batch       = {};
      var size        = 0;
      var topLevel    = 0;
      var bottomLevel = 0;

      function add(level, fn) {
          if(!fn) {
              fn = level;
              level = 0;
          }

          if(level > topLevel) {
              topLevel = level;
          } else if(level < bottomLevel) {
              bottomLevel = level;
          }

          if(!batch[level]) {
              batch[level] = [];
          }

          batch[level].push(fn);
          size++;
      }

      function process() {
          for(var level = bottomLevel; level <= topLevel; level++) {
              var fns = batch[level];

              for(var i = 0; i < fns.length; i++) {
                  var fn = fns[i];
                  fn();
              }
          }
      }

      function getSize() {
          return size;
      }

      return {
          add: add,
          process: process,
          size: getSize
      };
  }

  var prop = "_erd";

  function initState(element) {
      element[prop] = {};
      return getState(element);
  }

  function getState(element) {
      return element[prop];
  }

  function cleanState(element) {
      delete element[prop];
  }

  var stateHandler = {
      initState: initState,
      getState: getState,
      cleanState: cleanState
  };

  var object = function(options) {
      options             = options || {};
      var reporter        = options.reporter;
      var batchProcessor  = options.batchProcessor;
      var getState        = options.stateHandler.getState;

      if(!reporter) {
          throw new Error("Missing required dependency: reporter.");
      }

      /**
       * Adds a resize event listener to the element.
       * @public
       * @param {element} element The element that should have the listener added.
       * @param {function} listener The listener callback to be called for each resize event of the element. The element will be given as a parameter to the listener callback.
       */
      function addListener(element, listener) {
          function listenerProxy() {
              listener(element);
          }

          if(browserDetector.isIE(8)) {
              //IE 8 does not support object, but supports the resize event directly on elements.
              getState(element).object = {
                  proxy: listenerProxy
              };
              element.attachEvent("onresize", listenerProxy);
          } else {
              var object = getObject(element);

              if(!object) {
                  throw new Error("Element is not detectable by this strategy.");
              }

              object.contentDocument.defaultView.addEventListener("resize", listenerProxy);
          }
      }

      function buildCssTextString(rules) {
          var seperator = options.important ? " !important; " : "; ";

          return (rules.join(seperator) + seperator).trim();
      }

      /**
       * Makes an element detectable and ready to be listened for resize events. Will call the callback when the element is ready to be listened for resize changes.
       * @private
       * @param {object} options Optional options object.
       * @param {element} element The element to make detectable
       * @param {function} callback The callback to be called when the element is ready to be listened for resize changes. Will be called with the element as first parameter.
       */
      function makeDetectable(options, element, callback) {
          if (!callback) {
              callback = element;
              element = options;
              options = null;
          }

          options = options || {};
          var debug = options.debug;

          function injectObject(element, callback) {
              var OBJECT_STYLE = buildCssTextString(["display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none"]);

              //The target element needs to be positioned (everything except static) so the absolute positioned object will be positioned relative to the target element.

              // Position altering may be performed directly or on object load, depending on if style resolution is possible directly or not.
              var positionCheckPerformed = false;

              // The element may not yet be attached to the DOM, and therefore the style object may be empty in some browsers.
              // Since the style object is a reference, it will be updated as soon as the element is attached to the DOM.
              var style = window.getComputedStyle(element);
              var width = element.offsetWidth;
              var height = element.offsetHeight;

              getState(element).startSize = {
                  width: width,
                  height: height
              };

              function mutateDom() {
                  function alterPositionStyles() {
                      if(style.position === "static") {
                          element.style.setProperty("position", "relative", options.important ? "important" : "");

                          var removeRelativeStyles = function(reporter, element, style, property) {
                              function getNumericalValue(value) {
                                  return value.replace(/[^-\d\.]/g, "");
                              }

                              var value = style[property];

                              if(value !== "auto" && getNumericalValue(value) !== "0") {
                                  reporter.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element);
                                  element.style.setProperty(property, "0", options.important ? "important" : "");
                              }
                          };

                          //Check so that there are no accidental styles that will make the element styled differently now that is is relative.
                          //If there are any, set them to 0 (this should be okay with the user since the style properties did nothing before [since the element was positioned static] anyway).
                          removeRelativeStyles(reporter, element, style, "top");
                          removeRelativeStyles(reporter, element, style, "right");
                          removeRelativeStyles(reporter, element, style, "bottom");
                          removeRelativeStyles(reporter, element, style, "left");
                      }
                  }

                  function onObjectLoad() {
                      // The object has been loaded, which means that the element now is guaranteed to be attached to the DOM.
                      if (!positionCheckPerformed) {
                          alterPositionStyles();
                      }

                      /*jshint validthis: true */

                      function getDocument(element, callback) {
                          //Opera 12 seem to call the object.onload before the actual document has been created.
                          //So if it is not present, poll it with an timeout until it is present.
                          //TODO: Could maybe be handled better with object.onreadystatechange or similar.
                          if(!element.contentDocument) {
                              var state = getState(element);
                              if (state.checkForObjectDocumentTimeoutId) {
                                  window.clearTimeout(state.checkForObjectDocumentTimeoutId);
                              }
                              state.checkForObjectDocumentTimeoutId = setTimeout(function checkForObjectDocument() {
                                  state.checkForObjectDocumentTimeoutId = 0;
                                  getDocument(element, callback);
                              }, 100);

                              return;
                          }

                          callback(element.contentDocument);
                      }

                      //Mutating the object element here seems to fire another load event.
                      //Mutating the inner document of the object element is fine though.
                      var objectElement = this;

                      //Create the style element to be added to the object.
                      getDocument(objectElement, function onObjectDocumentReady(objectDocument) {
                          //Notify that the element is ready to be listened to.
                          callback(element);
                      });
                  }

                  // The element may be detached from the DOM, and some browsers does not support style resolving of detached elements.
                  // The alterPositionStyles needs to be delayed until we know the element has been attached to the DOM (which we are sure of when the onObjectLoad has been fired), if style resolution is not possible.
                  if (style.position !== "") {
                      alterPositionStyles();
                      positionCheckPerformed = true;
                  }

                  //Add an object element as a child to the target element that will be listened to for resize events.
                  var object = document.createElement("object");
                  object.style.cssText = OBJECT_STYLE;
                  object.tabIndex = -1;
                  object.type = "text/html";
                  object.setAttribute("aria-hidden", "true");
                  object.onload = onObjectLoad;

                  //Safari: This must occur before adding the object to the DOM.
                  //IE: Does not like that this happens before, even if it is also added after.
                  if(!browserDetector.isIE()) {
                      object.data = "about:blank";
                  }

                  if (!getState(element)) {
                      // The element has been uninstalled before the actual loading happened.
                      return;
                  }

                  element.appendChild(object);
                  getState(element).object = object;

                  //IE: This must occur after adding the object to the DOM.
                  if(browserDetector.isIE()) {
                      object.data = "about:blank";
                  }
              }

              if(batchProcessor) {
                  batchProcessor.add(mutateDom);
              } else {
                  mutateDom();
              }
          }

          if(browserDetector.isIE(8)) {
              //IE 8 does not support objects properly. Luckily they do support the resize event.
              //So do not inject the object and notify that the element is already ready to be listened to.
              //The event handler for the resize event is attached in the utils.addListener instead.
              callback(element);
          } else {
              injectObject(element, callback);
          }
      }

      /**
       * Returns the child object of the target element.
       * @private
       * @param {element} element The target element.
       * @returns The object element of the target.
       */
      function getObject(element) {
          return getState(element).object;
      }

      function uninstall(element) {
          if (!getState(element)) {
              return;
          }

          var object = getObject(element);

          if (!object) {
              return;
          }

          if (browserDetector.isIE(8)) {
              element.detachEvent("onresize", object.proxy);
          } else {
              element.removeChild(object);
          }

          if (getState(element).checkForObjectDocumentTimeoutId) {
              window.clearTimeout(getState(element).checkForObjectDocumentTimeoutId);
          }

          delete getState(element).object;
      }

      return {
          makeDetectable: makeDetectable,
          addListener: addListener,
          uninstall: uninstall
      };
  };

  var forEach = collectionUtils.forEach;

  var scroll = function(options) {
      options             = options || {};
      var reporter        = options.reporter;
      var batchProcessor  = options.batchProcessor;
      var getState        = options.stateHandler.getState;
      var hasState        = options.stateHandler.hasState;
      var idHandler       = options.idHandler;

      if (!batchProcessor) {
          throw new Error("Missing required dependency: batchProcessor");
      }

      if (!reporter) {
          throw new Error("Missing required dependency: reporter.");
      }

      //TODO: Could this perhaps be done at installation time?
      var scrollbarSizes = getScrollbarSizes();

      var styleId = "erd_scroll_detection_scrollbar_style";
      var detectionContainerClass = "erd_scroll_detection_container";

      function initDocument(targetDocument) {
          // Inject the scrollbar styling that prevents them from appearing sometimes in Chrome.
          // The injected container needs to have a class, so that it may be styled with CSS (pseudo elements).
          injectScrollStyle(targetDocument, styleId, detectionContainerClass);
      }

      initDocument(window.document);

      function buildCssTextString(rules) {
          var seperator = options.important ? " !important; " : "; ";

          return (rules.join(seperator) + seperator).trim();
      }

      function getScrollbarSizes() {
          var width = 500;
          var height = 500;

          var child = document.createElement("div");
          child.style.cssText = buildCssTextString(["position: absolute", "width: " + width*2 + "px", "height: " + height*2 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);

          var container = document.createElement("div");
          container.style.cssText = buildCssTextString(["position: absolute", "width: " + width + "px", "height: " + height + "px", "overflow: scroll", "visibility: none", "top: " + -width*3 + "px", "left: " + -height*3 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);

          container.appendChild(child);

          document.body.insertBefore(container, document.body.firstChild);

          var widthSize = width - container.clientWidth;
          var heightSize = height - container.clientHeight;

          document.body.removeChild(container);

          return {
              width: widthSize,
              height: heightSize
          };
      }

      function injectScrollStyle(targetDocument, styleId, containerClass) {
          function injectStyle(style, method) {
              method = method || function (element) {
                  targetDocument.head.appendChild(element);
              };

              var styleElement = targetDocument.createElement("style");
              styleElement.innerHTML = style;
              styleElement.id = styleId;
              method(styleElement);
              return styleElement;
          }

          if (!targetDocument.getElementById(styleId)) {
              var containerAnimationClass = containerClass + "_animation";
              var containerAnimationActiveClass = containerClass + "_animation_active";
              var style = "/* Created by the element-resize-detector library. */\n";
              style += "." + containerClass + " > div::-webkit-scrollbar { " + buildCssTextString(["display: none"]) + " }\n\n";
              style += "." + containerAnimationActiveClass + " { " + buildCssTextString(["-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + containerAnimationClass, "animation-name: " + containerAnimationClass]) + " }\n";
              style += "@-webkit-keyframes " + containerAnimationClass +  " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n";
              style += "@keyframes " + containerAnimationClass +          " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }";
              injectStyle(style);
          }
      }

      function addAnimationClass(element) {
          element.className += " " + detectionContainerClass + "_animation_active";
      }

      function addEvent(el, name, cb) {
          if (el.addEventListener) {
              el.addEventListener(name, cb);
          } else if(el.attachEvent) {
              el.attachEvent("on" + name, cb);
          } else {
              return reporter.error("[scroll] Don't know how to add event listeners.");
          }
      }

      function removeEvent(el, name, cb) {
          if (el.removeEventListener) {
              el.removeEventListener(name, cb);
          } else if(el.detachEvent) {
              el.detachEvent("on" + name, cb);
          } else {
              return reporter.error("[scroll] Don't know how to remove event listeners.");
          }
      }

      function getExpandElement(element) {
          return getState(element).container.childNodes[0].childNodes[0].childNodes[0];
      }

      function getShrinkElement(element) {
          return getState(element).container.childNodes[0].childNodes[0].childNodes[1];
      }

      /**
       * Adds a resize event listener to the element.
       * @public
       * @param {element} element The element that should have the listener added.
       * @param {function} listener The listener callback to be called for each resize event of the element. The element will be given as a parameter to the listener callback.
       */
      function addListener(element, listener) {
          var listeners = getState(element).listeners;

          if (!listeners.push) {
              throw new Error("Cannot add listener to an element that is not detectable.");
          }

          getState(element).listeners.push(listener);
      }

      /**
       * Makes an element detectable and ready to be listened for resize events. Will call the callback when the element is ready to be listened for resize changes.
       * @private
       * @param {object} options Optional options object.
       * @param {element} element The element to make detectable
       * @param {function} callback The callback to be called when the element is ready to be listened for resize changes. Will be called with the element as first parameter.
       */
      function makeDetectable(options, element, callback) {
          if (!callback) {
              callback = element;
              element = options;
              options = null;
          }

          options = options || {};

          function debug() {
              if (options.debug) {
                  var args = Array.prototype.slice.call(arguments);
                  args.unshift(idHandler.get(element), "Scroll: ");
                  if (reporter.log.apply) {
                      reporter.log.apply(null, args);
                  } else {
                      for (var i = 0; i < args.length; i++) {
                          reporter.log(args[i]);
                      }
                  }
              }
          }

          function isDetached(element) {
              function isInDocument(element) {
                  return element === element.ownerDocument.body || element.ownerDocument.body.contains(element);
              }

              if (!isInDocument(element)) {
                  return true;
              }

              // FireFox returns null style in hidden iframes. See https://github.com/wnr/element-resize-detector/issues/68 and https://bugzilla.mozilla.org/show_bug.cgi?id=795520
              if (window.getComputedStyle(element) === null) {
                  return true;
              }

              return false;
          }

          function isUnrendered(element) {
              // Check the absolute positioned container since the top level container is display: inline.
              var container = getState(element).container.childNodes[0];
              var style = window.getComputedStyle(container);
              return !style.width || style.width.indexOf("px") === -1; //Can only compute pixel value when rendered.
          }

          function getStyle() {
              // Some browsers only force layouts when actually reading the style properties of the style object, so make sure that they are all read here,
              // so that the user of the function can be sure that it will perform the layout here, instead of later (important for batching).
              var elementStyle            = window.getComputedStyle(element);
              var style                   = {};
              style.position              = elementStyle.position;
              style.width                 = element.offsetWidth;
              style.height                = element.offsetHeight;
              style.top                   = elementStyle.top;
              style.right                 = elementStyle.right;
              style.bottom                = elementStyle.bottom;
              style.left                  = elementStyle.left;
              style.widthCSS              = elementStyle.width;
              style.heightCSS             = elementStyle.height;
              return style;
          }

          function storeStartSize() {
              var style = getStyle();
              getState(element).startSize = {
                  width: style.width,
                  height: style.height
              };
              debug("Element start size", getState(element).startSize);
          }

          function initListeners() {
              getState(element).listeners = [];
          }

          function storeStyle() {
              debug("storeStyle invoked.");
              if (!getState(element)) {
                  debug("Aborting because element has been uninstalled");
                  return;
              }

              var style = getStyle();
              getState(element).style = style;
          }

          function storeCurrentSize(element, width, height) {
              getState(element).lastWidth = width;
              getState(element).lastHeight  = height;
          }

          function getExpandChildElement(element) {
              return getExpandElement(element).childNodes[0];
          }

          function getWidthOffset() {
              return 2 * scrollbarSizes.width + 1;
          }

          function getHeightOffset() {
              return 2 * scrollbarSizes.height + 1;
          }

          function getExpandWidth(width) {
              return width + 10 + getWidthOffset();
          }

          function getExpandHeight(height) {
              return height + 10 + getHeightOffset();
          }

          function getShrinkWidth(width) {
              return width * 2 + getWidthOffset();
          }

          function getShrinkHeight(height) {
              return height * 2 + getHeightOffset();
          }

          function positionScrollbars(element, width, height) {
              var expand          = getExpandElement(element);
              var shrink          = getShrinkElement(element);
              var expandWidth     = getExpandWidth(width);
              var expandHeight    = getExpandHeight(height);
              var shrinkWidth     = getShrinkWidth(width);
              var shrinkHeight    = getShrinkHeight(height);
              expand.scrollLeft   = expandWidth;
              expand.scrollTop    = expandHeight;
              shrink.scrollLeft   = shrinkWidth;
              shrink.scrollTop    = shrinkHeight;
          }

          function injectContainerElement() {
              var container = getState(element).container;

              if (!container) {
                  container                   = document.createElement("div");
                  container.className         = detectionContainerClass;
                  container.style.cssText     = buildCssTextString(["visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0"]);
                  getState(element).container = container;
                  addAnimationClass(container);
                  element.appendChild(container);

                  var onAnimationStart = function () {
                      getState(element).onRendered && getState(element).onRendered();
                  };

                  addEvent(container, "animationstart", onAnimationStart);

                  // Store the event handler here so that they may be removed when uninstall is called.
                  // See uninstall function for an explanation why it is needed.
                  getState(element).onAnimationStart = onAnimationStart;
              }

              return container;
          }

          function injectScrollElements() {
              function alterPositionStyles() {
                  var style = getState(element).style;

                  if(style.position === "static") {
                      element.style.setProperty("position", "relative",options.important ? "important" : "");

                      var removeRelativeStyles = function(reporter, element, style, property) {
                          function getNumericalValue(value) {
                              return value.replace(/[^-\d\.]/g, "");
                          }

                          var value = style[property];

                          if(value !== "auto" && getNumericalValue(value) !== "0") {
                              reporter.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element);
                              element.style[property] = 0;
                          }
                      };

                      //Check so that there are no accidental styles that will make the element styled differently now that is is relative.
                      //If there are any, set them to 0 (this should be okay with the user since the style properties did nothing before [since the element was positioned static] anyway).
                      removeRelativeStyles(reporter, element, style, "top");
                      removeRelativeStyles(reporter, element, style, "right");
                      removeRelativeStyles(reporter, element, style, "bottom");
                      removeRelativeStyles(reporter, element, style, "left");
                  }
              }

              function getLeftTopBottomRightCssText(left, top, bottom, right) {
                  left = (!left ? "0" : (left + "px"));
                  top = (!top ? "0" : (top + "px"));
                  bottom = (!bottom ? "0" : (bottom + "px"));
                  right = (!right ? "0" : (right + "px"));

                  return ["left: " + left, "top: " + top, "right: " + right, "bottom: " + bottom];
              }

              debug("Injecting elements");

              if (!getState(element)) {
                  debug("Aborting because element has been uninstalled");
                  return;
              }

              alterPositionStyles();

              var rootContainer = getState(element).container;

              if (!rootContainer) {
                  rootContainer = injectContainerElement();
              }

              // Due to this WebKit bug https://bugs.webkit.org/show_bug.cgi?id=80808 (currently fixed in Blink, but still present in WebKit browsers such as Safari),
              // we need to inject two containers, one that is width/height 100% and another that is left/top -1px so that the final container always is 1x1 pixels bigger than
              // the targeted element.
              // When the bug is resolved, "containerContainer" may be removed.

              // The outer container can occasionally be less wide than the targeted when inside inline elements element in WebKit (see https://bugs.webkit.org/show_bug.cgi?id=152980).
              // This should be no problem since the inner container either way makes sure the injected scroll elements are at least 1x1 px.

              var scrollbarWidth          = scrollbarSizes.width;
              var scrollbarHeight         = scrollbarSizes.height;
              var containerContainerStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px"]);
              var containerStyle          = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden"].concat(getLeftTopBottomRightCssText(-(1 + scrollbarWidth), -(1 + scrollbarHeight), -scrollbarHeight, -scrollbarWidth)));
              var expandStyle             = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
              var shrinkStyle             = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
              var expandChildStyle        = buildCssTextString(["position: absolute", "left: 0", "top: 0"]);
              var shrinkChildStyle        = buildCssTextString(["position: absolute", "width: 200%", "height: 200%"]);

              var containerContainer      = document.createElement("div");
              var container               = document.createElement("div");
              var expand                  = document.createElement("div");
              var expandChild             = document.createElement("div");
              var shrink                  = document.createElement("div");
              var shrinkChild             = document.createElement("div");

              // Some browsers choke on the resize system being rtl, so force it to ltr. https://github.com/wnr/element-resize-detector/issues/56
              // However, dir should not be set on the top level container as it alters the dimensions of the target element in some browsers.
              containerContainer.dir              = "ltr";

              containerContainer.style.cssText    = containerContainerStyle;
              containerContainer.className        = detectionContainerClass;
              container.className                 = detectionContainerClass;
              container.style.cssText             = containerStyle;
              expand.style.cssText                = expandStyle;
              expandChild.style.cssText           = expandChildStyle;
              shrink.style.cssText                = shrinkStyle;
              shrinkChild.style.cssText           = shrinkChildStyle;

              expand.appendChild(expandChild);
              shrink.appendChild(shrinkChild);
              container.appendChild(expand);
              container.appendChild(shrink);
              containerContainer.appendChild(container);
              rootContainer.appendChild(containerContainer);

              function onExpandScroll() {
                  getState(element).onExpand && getState(element).onExpand();
              }

              function onShrinkScroll() {
                  getState(element).onShrink && getState(element).onShrink();
              }

              addEvent(expand, "scroll", onExpandScroll);
              addEvent(shrink, "scroll", onShrinkScroll);

              // Store the event handlers here so that they may be removed when uninstall is called.
              // See uninstall function for an explanation why it is needed.
              getState(element).onExpandScroll = onExpandScroll;
              getState(element).onShrinkScroll = onShrinkScroll;
          }

          function registerListenersAndPositionElements() {
              function updateChildSizes(element, width, height) {
                  var expandChild             = getExpandChildElement(element);
                  var expandWidth             = getExpandWidth(width);
                  var expandHeight            = getExpandHeight(height);
                  expandChild.style.setProperty("width", expandWidth + "px", options.important ? "important" : "");
                  expandChild.style.setProperty("height", expandHeight + "px", options.important ? "important" : "");
              }

              function updateDetectorElements(done) {
                  var width           = element.offsetWidth;
                  var height          = element.offsetHeight;

                  // Check whether the size has actually changed since last time the algorithm ran. If not, some steps may be skipped.
                  var sizeChanged = width !== getState(element).lastWidth || height !== getState(element).lastHeight;

                  debug("Storing current size", width, height);

                  // Store the size of the element sync here, so that multiple scroll events may be ignored in the event listeners.
                  // Otherwise the if-check in handleScroll is useless.
                  storeCurrentSize(element, width, height);

                  // Since we delay the processing of the batch, there is a risk that uninstall has been called before the batch gets to execute.
                  // Since there is no way to cancel the fn executions, we need to add an uninstall guard to all fns of the batch.

                  batchProcessor.add(0, function performUpdateChildSizes() {
                      if (!sizeChanged) {
                          return;
                      }

                      if (!getState(element)) {
                          debug("Aborting because element has been uninstalled");
                          return;
                      }

                      if (!areElementsInjected()) {
                          debug("Aborting because element container has not been initialized");
                          return;
                      }

                      if (options.debug) {
                          var w = element.offsetWidth;
                          var h = element.offsetHeight;

                          if (w !== width || h !== height) {
                              reporter.warn(idHandler.get(element), "Scroll: Size changed before updating detector elements.");
                          }
                      }

                      updateChildSizes(element, width, height);
                  });

                  batchProcessor.add(1, function updateScrollbars() {
                      // This function needs to be invoked event though the size is unchanged. The element could have been resized very quickly and then
                      // been restored to the original size, which will have changed the scrollbar positions.

                      if (!getState(element)) {
                          debug("Aborting because element has been uninstalled");
                          return;
                      }

                      if (!areElementsInjected()) {
                          debug("Aborting because element container has not been initialized");
                          return;
                      }

                      positionScrollbars(element, width, height);
                  });

                  if (sizeChanged && done) {
                      batchProcessor.add(2, function () {
                          if (!getState(element)) {
                              debug("Aborting because element has been uninstalled");
                              return;
                          }

                          if (!areElementsInjected()) {
                            debug("Aborting because element container has not been initialized");
                            return;
                          }

                          done();
                      });
                  }
              }

              function areElementsInjected() {
                  return !!getState(element).container;
              }

              function notifyListenersIfNeeded() {
                  function isFirstNotify() {
                      return getState(element).lastNotifiedWidth === undefined;
                  }

                  debug("notifyListenersIfNeeded invoked");

                  var state = getState(element);

                  // Don't notify if the current size is the start size, and this is the first notification.
                  if (isFirstNotify() && state.lastWidth === state.startSize.width && state.lastHeight === state.startSize.height) {
                      return debug("Not notifying: Size is the same as the start size, and there has been no notification yet.");
                  }

                  // Don't notify if the size already has been notified.
                  if (state.lastWidth === state.lastNotifiedWidth && state.lastHeight === state.lastNotifiedHeight) {
                      return debug("Not notifying: Size already notified");
                  }


                  debug("Current size not notified, notifying...");
                  state.lastNotifiedWidth = state.lastWidth;
                  state.lastNotifiedHeight = state.lastHeight;
                  forEach(getState(element).listeners, function (listener) {
                      listener(element);
                  });
              }

              function handleRender() {
                  debug("startanimation triggered.");

                  if (isUnrendered(element)) {
                      debug("Ignoring since element is still unrendered...");
                      return;
                  }

                  debug("Element rendered.");
                  var expand = getExpandElement(element);
                  var shrink = getShrinkElement(element);
                  if (expand.scrollLeft === 0 || expand.scrollTop === 0 || shrink.scrollLeft === 0 || shrink.scrollTop === 0) {
                      debug("Scrollbars out of sync. Updating detector elements...");
                      updateDetectorElements(notifyListenersIfNeeded);
                  }
              }

              function handleScroll() {
                  debug("Scroll detected.");

                  if (isUnrendered(element)) {
                      // Element is still unrendered. Skip this scroll event.
                      debug("Scroll event fired while unrendered. Ignoring...");
                      return;
                  }

                  updateDetectorElements(notifyListenersIfNeeded);
              }

              debug("registerListenersAndPositionElements invoked.");

              if (!getState(element)) {
                  debug("Aborting because element has been uninstalled");
                  return;
              }

              getState(element).onRendered = handleRender;
              getState(element).onExpand = handleScroll;
              getState(element).onShrink = handleScroll;

              var style = getState(element).style;
              updateChildSizes(element, style.width, style.height);
          }

          function finalizeDomMutation() {
              debug("finalizeDomMutation invoked.");

              if (!getState(element)) {
                  debug("Aborting because element has been uninstalled");
                  return;
              }

              var style = getState(element).style;
              storeCurrentSize(element, style.width, style.height);
              positionScrollbars(element, style.width, style.height);
          }

          function ready() {
              callback(element);
          }

          function install() {
              debug("Installing...");
              initListeners();
              storeStartSize();

              batchProcessor.add(0, storeStyle);
              batchProcessor.add(1, injectScrollElements);
              batchProcessor.add(2, registerListenersAndPositionElements);
              batchProcessor.add(3, finalizeDomMutation);
              batchProcessor.add(4, ready);
          }

          debug("Making detectable...");

          if (isDetached(element)) {
              debug("Element is detached");

              injectContainerElement();

              debug("Waiting until element is attached...");

              getState(element).onRendered = function () {
                  debug("Element is now attached");
                  install();
              };
          } else {
              install();
          }
      }

      function uninstall(element) {
          var state = getState(element);

          if (!state) {
              // Uninstall has been called on a non-erd element.
              return;
          }

          // Uninstall may have been called in the following scenarios:
          // (1) Right between the sync code and async batch (here state.busy = true, but nothing have been registered or injected).
          // (2) In the ready callback of the last level of the batch by another element (here, state.busy = true, but all the stuff has been injected).
          // (3) After the installation process (here, state.busy = false and all the stuff has been injected).
          // So to be on the safe side, let's check for each thing before removing.

          // We need to remove the event listeners, because otherwise the event might fire on an uninstall element which results in an error when trying to get the state of the element.
          state.onExpandScroll && removeEvent(getExpandElement(element), "scroll", state.onExpandScroll);
          state.onShrinkScroll && removeEvent(getShrinkElement(element), "scroll", state.onShrinkScroll);
          state.onAnimationStart && removeEvent(state.container, "animationstart", state.onAnimationStart);

          state.container && element.removeChild(state.container);
      }

      return {
          makeDetectable: makeDetectable,
          addListener: addListener,
          uninstall: uninstall,
          initDocument: initDocument
      };
  };

  var forEach$1                 = collectionUtils.forEach;









  //Detection strategies.



  function isCollection(obj) {
      return Array.isArray(obj) || obj.length !== undefined;
  }

  function toArray(collection) {
      if (!Array.isArray(collection)) {
          var array = [];
          forEach$1(collection, function (obj) {
              array.push(obj);
          });
          return array;
      } else {
          return collection;
      }
  }

  function isElement(obj) {
      return obj && obj.nodeType === 1;
  }

  /**
   * @typedef idHandler
   * @type {object}
   * @property {function} get Gets the resize detector id of the element.
   * @property {function} set Generate and sets the resize detector id of the element.
   */

  /**
   * @typedef Options
   * @type {object}
   * @property {boolean} callOnAdd    Determines if listeners should be called when they are getting added.
                                      Default is true. If true, the listener is guaranteed to be called when it has been added.
                                      If false, the listener will not be guarenteed to be called when it has been added (does not prevent it from being called).
   * @property {idHandler} idHandler  A custom id handler that is responsible for generating, setting and retrieving id's for elements.
                                      If not provided, a default id handler will be used.
   * @property {reporter} reporter    A custom reporter that handles reporting logs, warnings and errors.
                                      If not provided, a default id handler will be used.
                                      If set to false, then nothing will be reported.
   * @property {boolean} debug        If set to true, the the system will report debug messages as default for the listenTo method.
   */

  /**
   * Creates an element resize detector instance.
   * @public
   * @param {Options?} options Optional global options object that will decide how this instance will work.
   */
  var elementResizeDetector = function(options) {
      options = options || {};

      //idHandler is currently not an option to the listenTo function, so it should not be added to globalOptions.
      var idHandler$1;

      if (options.idHandler) {
          // To maintain compatability with idHandler.get(element, readonly), make sure to wrap the given idHandler
          // so that readonly flag always is true when it's used here. This may be removed next major version bump.
          idHandler$1 = {
              get: function (element) { return options.idHandler.get(element, true); },
              set: options.idHandler.set
          };
      } else {
          var idGenerator$1 = idGenerator();
          var defaultIdHandler = idHandler({
              idGenerator: idGenerator$1,
              stateHandler: stateHandler
          });
          idHandler$1 = defaultIdHandler;
      }

      //reporter is currently not an option to the listenTo function, so it should not be added to globalOptions.
      var reporter$1 = options.reporter;

      if(!reporter$1) {
          //If options.reporter is false, then the reporter should be quiet.
          var quiet = reporter$1 === false;
          reporter$1 = reporter(quiet);
      }

      //batchProcessor is currently not an option to the listenTo function, so it should not be added to globalOptions.
      var batchProcessor$1 = getOption(options, "batchProcessor", batchProcessor({ reporter: reporter$1 }));

      //Options to be used as default for the listenTo function.
      var globalOptions = {};
      globalOptions.callOnAdd     = !!getOption(options, "callOnAdd", true);
      globalOptions.debug         = !!getOption(options, "debug", false);

      var eventListenerHandler    = listenerHandler(idHandler$1);
      var elementUtils$1            = elementUtils({
          stateHandler: stateHandler
      });

      //The detection strategy to be used.
      var detectionStrategy;
      var desiredStrategy = getOption(options, "strategy", "object");
      var importantCssRules = getOption(options, "important", false);
      var strategyOptions = {
          reporter: reporter$1,
          batchProcessor: batchProcessor$1,
          stateHandler: stateHandler,
          idHandler: idHandler$1,
          important: importantCssRules
      };

      if(desiredStrategy === "scroll") {
          if (browserDetector.isLegacyOpera()) {
              reporter$1.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy.");
              desiredStrategy = "object";
          } else if (browserDetector.isIE(9)) {
              reporter$1.warn("Scroll strategy is not supported on IE9. Changing to object strategy.");
              desiredStrategy = "object";
          }
      }

      if(desiredStrategy === "scroll") {
          detectionStrategy = scroll(strategyOptions);
      } else if(desiredStrategy === "object") {
          detectionStrategy = object(strategyOptions);
      } else {
          throw new Error("Invalid strategy name: " + desiredStrategy);
      }

      //Calls can be made to listenTo with elements that are still being installed.
      //Also, same elements can occur in the elements list in the listenTo function.
      //With this map, the ready callbacks can be synchronized between the calls
      //so that the ready callback can always be called when an element is ready - even if
      //it wasn't installed from the function itself.
      var onReadyCallbacks = {};

      /**
       * Makes the given elements resize-detectable and starts listening to resize events on the elements. Calls the event callback for each event for each element.
       * @public
       * @param {Options?} options Optional options object. These options will override the global options. Some options may not be overriden, such as idHandler.
       * @param {element[]|element} elements The given array of elements to detect resize events of. Single element is also valid.
       * @param {function} listener The callback to be executed for each resize event for each element.
       */
      function listenTo(options, elements, listener) {
          function onResizeCallback(element) {
              var listeners = eventListenerHandler.get(element);
              forEach$1(listeners, function callListenerProxy(listener) {
                  listener(element);
              });
          }

          function addListener(callOnAdd, element, listener) {
              eventListenerHandler.add(element, listener);

              if(callOnAdd) {
                  listener(element);
              }
          }

          //Options object may be omitted.
          if(!listener) {
              listener = elements;
              elements = options;
              options = {};
          }

          if(!elements) {
              throw new Error("At least one element required.");
          }

          if(!listener) {
              throw new Error("Listener required.");
          }

          if (isElement(elements)) {
              // A single element has been passed in.
              elements = [elements];
          } else if (isCollection(elements)) {
              // Convert collection to array for plugins.
              // TODO: May want to check so that all the elements in the collection are valid elements.
              elements = toArray(elements);
          } else {
              return reporter$1.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
          }

          var elementsReady = 0;

          var callOnAdd = getOption(options, "callOnAdd", globalOptions.callOnAdd);
          var onReadyCallback = getOption(options, "onReady", function noop() {});
          var debug = getOption(options, "debug", globalOptions.debug);

          forEach$1(elements, function attachListenerToElement(element) {
              if (!stateHandler.getState(element)) {
                  stateHandler.initState(element);
                  idHandler$1.set(element);
              }

              var id = idHandler$1.get(element);

              debug && reporter$1.log("Attaching listener to element", id, element);

              if(!elementUtils$1.isDetectable(element)) {
                  debug && reporter$1.log(id, "Not detectable.");
                  if(elementUtils$1.isBusy(element)) {
                      debug && reporter$1.log(id, "System busy making it detectable");

                      //The element is being prepared to be detectable. Do not make it detectable.
                      //Just add the listener, because the element will soon be detectable.
                      addListener(callOnAdd, element, listener);
                      onReadyCallbacks[id] = onReadyCallbacks[id] || [];
                      onReadyCallbacks[id].push(function onReady() {
                          elementsReady++;

                          if(elementsReady === elements.length) {
                              onReadyCallback();
                          }
                      });
                      return;
                  }

                  debug && reporter$1.log(id, "Making detectable...");
                  //The element is not prepared to be detectable, so do prepare it and add a listener to it.
                  elementUtils$1.markBusy(element, true);
                  return detectionStrategy.makeDetectable({ debug: debug, important: importantCssRules }, element, function onElementDetectable(element) {
                      debug && reporter$1.log(id, "onElementDetectable");

                      if (stateHandler.getState(element)) {
                          elementUtils$1.markAsDetectable(element);
                          elementUtils$1.markBusy(element, false);
                          detectionStrategy.addListener(element, onResizeCallback);
                          addListener(callOnAdd, element, listener);

                          // Since the element size might have changed since the call to "listenTo", we need to check for this change,
                          // so that a resize event may be emitted.
                          // Having the startSize object is optional (since it does not make sense in some cases such as unrendered elements), so check for its existance before.
                          // Also, check the state existance before since the element may have been uninstalled in the installation process.
                          var state = stateHandler.getState(element);
                          if (state && state.startSize) {
                              var width = element.offsetWidth;
                              var height = element.offsetHeight;
                              if (state.startSize.width !== width || state.startSize.height !== height) {
                                  onResizeCallback(element);
                              }
                          }

                          if(onReadyCallbacks[id]) {
                              forEach$1(onReadyCallbacks[id], function(callback) {
                                  callback();
                              });
                          }
                      } else {
                          // The element has been unisntalled before being detectable.
                          debug && reporter$1.log(id, "Element uninstalled before being detectable.");
                      }

                      delete onReadyCallbacks[id];

                      elementsReady++;
                      if(elementsReady === elements.length) {
                          onReadyCallback();
                      }
                  });
              }

              debug && reporter$1.log(id, "Already detecable, adding listener.");

              //The element has been prepared to be detectable and is ready to be listened to.
              addListener(callOnAdd, element, listener);
              elementsReady++;
          });

          if(elementsReady === elements.length) {
              onReadyCallback();
          }
      }

      function uninstall(elements) {
          if(!elements) {
              return reporter$1.error("At least one element is required.");
          }

          if (isElement(elements)) {
              // A single element has been passed in.
              elements = [elements];
          } else if (isCollection(elements)) {
              // Convert collection to array for plugins.
              // TODO: May want to check so that all the elements in the collection are valid elements.
              elements = toArray(elements);
          } else {
              return reporter$1.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
          }

          forEach$1(elements, function (element) {
              eventListenerHandler.removeAllListeners(element);
              detectionStrategy.uninstall(element);
              stateHandler.cleanState(element);
          });
      }

      function initDocument(targetDocument) {
          detectionStrategy.initDocument && detectionStrategy.initDocument(targetDocument);
      }

      return {
          listenTo: listenTo,
          removeListener: eventListenerHandler.removeListener,
          removeAllListeners: eventListenerHandler.removeAllListeners,
          uninstall: uninstall,
          initDocument: initDocument
      };
  };

  function getOption(options, name, defaultValue) {
      var value = options[name];

      if((value === undefined || value === null) && defaultValue !== undefined) {
          return defaultValue;
      }

      return value;
  }

  var script$2 = {
    name: 'XTagGroup',
    props: {
      calcKey: {
        type: String,
        default: 'label'
      },
      tags: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      tagMaxWidth: {
        type: Number,
        default: 0
      },
      maxShowTag: {
        type: Number,
        default: 0
      },
      containerWidth: {
        type: Number,
        default: 0
      },
      tagPaddingWidth: {
        type: Number,
        default: 12
      },
      tagMarginWidth: {
        type: Number,
        default: 4
      },
      tagFontSize: {
        type: Number,
        default: 12
      },
      countWidth: {
        type: Number,
        default: 40
      }
    },
    data: function data() {
      return {
        calcLimit: 5,
        // countWidth: 40,
        showCount: 0,
        maxWith: 0,
        erd: {}
      };
    },
    computed: {
      renderTags: function renderTags() {
        return this.tags.slice(0, this.showCount);
      }
    },
    watch: {
      tags: {
        handler: function handler(newValue, oldValue) {
          this.calcRenderCount();
        }
      }
    },
    created: function created() {
      // 添加resize事件\
      this.erd = elementResizeDetector();
    },
    mounted: function mounted() {
      // 添加mounted，动态获取组件宽度
      this.calcRenderCount();
      this.erd.listenTo(this.$refs.tagGroupContainer, this.calcRenderCount);
    },
    beforeDestroy: function beforeDestroy() {
      this.erd.removeListener(this.$refs.tagGroupContainer, this.calcRenderCount);
    },
    methods: {
      calcRenderCount: function calcRenderCount(element) {
        var _this = this;

        this.$nextTick(function () {
          if (!_this.$refs.tagGroupContainer) {
            return;
          }

          if (_this.containerWidth === 0) {
            _this.maxWidth = _this.$refs.tagGroupContainer.clientWidth;
          } else {
            _this.maxWidth = _this.containerWidth;
          }

          _this.calcTagCount();
        });
      },
      calcTagCount: function calcTagCount() {
        var _this2 = this;

        var tagWidths = [];
        var renderCount = 0;
        var calcCount = Math.floor(this.tags.length / this.calcLimit) + 1;

        for (var index = 0; index < calcCount; index++) {
          var tagTexts = this.tags.slice(this.calcLimit * index, this.calcLimit * index + this.calcLimit).map(function (tag) {
            return tag[_this2.calcKey];
          });
          tagWidths = [].concat(_toConsumableArray(tagWidths), _toConsumableArray(this.getSvgsWidth(tagTexts)));
          renderCount = this.compareCountWithMaxWidth(tagWidths, this.maxWidth);

          if (renderCount < tagWidths.length || renderCount === tagWidths.length && index === calcCount - 1) {
            this.showCount = renderCount === 0 ? 1 : renderCount;
            return;
          }
        }
      },
      getSvgsWidth: function getSvgsWidth(texts) {
        var _this3 = this;

        // 这里使用div不用fragment主要是不方便删除
        var textsFragment = document.createElement('div');
        var textElements = texts.map(function (text) {
          var textElement = document.createElement('span');
          textElement.textContent = text;
          textElement.style.fontSize = _this3.tagFontSize;
          textsFragment.appendChild(textElement);
          return textElement;
        });
        this.$refs.fixedSvgContainer.appendChild(textsFragment);
        var textElementsWidth = textElements.map(function (element) {
          return element.getBoundingClientRect().width;
        });
        this.$refs.fixedSvgContainer.removeChild(textsFragment);
        return textElementsWidth;
      },
      compareCountWithMaxWidth: function compareCountWithMaxWidth(widths, maxWidth) {
        var count = 0;

        for (var index = 0; index < widths.length; index++) {
          count = count + widths[index] + this.tagMarginWidth * 2 + this.tagPaddingWidth * 2;

          if (count >= maxWidth - this.countWidth) {
            return index;
          }
        }

        return widths.length;
      }
    }
  };

  /* script */
  var __vue_script__$2 = script$2;
  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { ref: "tagGroupContainer", staticClass: "e-tag-group" },
      [
        _c("div", { ref: "fixedSvgContainer", staticClass: "fixed-svg" }),
        _vm._v(" "),
        _vm._l(_vm.renderTags, function(tag, index) {
          return _c(
            "div",
            {
              key: tag.id,
              staticClass: "tag-info",
              style: { margin: "0 " + _vm.tagMarginWidth + "px" }
            },
            [_vm._t("tag", null, { tag: tag, index: index })],
            2
          )
        }),
        _vm._v(" "),
        _vm.tags.length > _vm.showCount
          ? [
              _c(
                "el-tooltip",
                {
                  attrs: {
                    effect: "dark",
                    content: _vm.tags
                      .map(function(item) {
                        return item[_vm.calcKey]
                      })
                      .join("，"),
                    placement: "top"
                  }
                },
                [
                  _c(
                    "div",
                    { staticClass: "tag-more" },
                    [_c("x-svg-icon", { attrs: { name: "e-lib-more-tag" } })],
                    1
                  )
                ]
              )
            ]
          : _vm._e()
      ],
      2
    )
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

    /* style */
    var __vue_inject_styles__$2 = undefined;
    /* scoped */
    var __vue_scope_id__$2 = undefined;
    /* module identifier */
    var __vue_module_identifier__$2 = undefined;
    /* functional template */
    var __vue_is_functional_template__$2 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      undefined,
      undefined,
      undefined
    );

  __vue_component__$2.install = function (vue) {
    vue.component(name, __vue_component__$2);
  };

  var bind = function bind(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisArg, args);
    };
  };

  /*global toString:true*/

  // utils is a library of generic helper functions non-specific to axios

  var toString = Object.prototype.toString;

  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Array, otherwise false
   */
  function isArray(val) {
    return toString.call(val) === '[object Array]';
  }

  /**
   * Determine if a value is undefined
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  function isUndefined(val) {
    return typeof val === 'undefined';
  }

  /**
   * Determine if a value is a Buffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Buffer, otherwise false
   */
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
      && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
  }

  /**
   * Determine if a value is an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
  function isArrayBuffer(val) {
    return toString.call(val) === '[object ArrayBuffer]';
  }

  /**
   * Determine if a value is a FormData
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  function isFormData(val) {
    return (typeof FormData !== 'undefined') && (val instanceof FormData);
  }

  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
  function isArrayBufferView(val) {
    var result;
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
      result = ArrayBuffer.isView(val);
    } else {
      result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
    }
    return result;
  }

  /**
   * Determine if a value is a String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a String, otherwise false
   */
  function isString(val) {
    return typeof val === 'string';
  }

  /**
   * Determine if a value is a Number
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Number, otherwise false
   */
  function isNumber(val) {
    return typeof val === 'number';
  }

  /**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
  function isObject(val) {
    return val !== null && typeof val === 'object';
  }

  /**
   * Determine if a value is a plain Object
   *
   * @param {Object} val The value to test
   * @return {boolean} True if value is a plain Object, otherwise false
   */
  function isPlainObject(val) {
    if (toString.call(val) !== '[object Object]') {
      return false;
    }

    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
  }

  /**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
  function isDate(val) {
    return toString.call(val) === '[object Date]';
  }

  /**
   * Determine if a value is a File
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */
  function isFile(val) {
    return toString.call(val) === '[object File]';
  }

  /**
   * Determine if a value is a Blob
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Blob, otherwise false
   */
  function isBlob(val) {
    return toString.call(val) === '[object Blob]';
  }

  /**
   * Determine if a value is a Function
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  function isFunction(val) {
    return toString.call(val) === '[object Function]';
  }

  /**
   * Determine if a value is a Stream
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Stream, otherwise false
   */
  function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  }

  /**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
  }

  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   * @returns {String} The String freed of excess whitespace
   */
  function trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
  }

  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   */
  function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                             navigator.product === 'NativeScript' ||
                                             navigator.product === 'NS')) {
      return false;
    }
    return (
      typeof window !== 'undefined' &&
      typeof document !== 'undefined'
    );
  }

  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
  function forEach$2(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (isArray(obj)) {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }

  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
  function merge$1(/* obj1, obj2, obj3, ... */) {
    var result = {};
    function assignValue(val, key) {
      if (isPlainObject(result[key]) && isPlainObject(val)) {
        result[key] = merge$1(result[key], val);
      } else if (isPlainObject(val)) {
        result[key] = merge$1({}, val);
      } else if (isArray(val)) {
        result[key] = val.slice();
      } else {
        result[key] = val;
      }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach$2(arguments[i], assignValue);
    }
    return result;
  }

  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   * @return {Object} The resulting value of object a
   */
  function extend(a, b, thisArg) {
    forEach$2(b, function assignValue(val, key) {
      if (thisArg && typeof val === 'function') {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }

  /**
   * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
   *
   * @param {string} content with BOM
   * @return {string} content value without BOM
   */
  function stripBOM(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    return content;
  }

  var utils = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach$2,
    merge: merge$1,
    extend: extend,
    trim: trim,
    stripBOM: stripBOM
  };

  function encode(val) {
    return encodeURIComponent(val).
      replace(/%3A/gi, ':').
      replace(/%24/g, '$').
      replace(/%2C/gi, ',').
      replace(/%20/g, '+').
      replace(/%5B/gi, '[').
      replace(/%5D/gi, ']');
  }

  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
  var buildURL = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }

    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];

      utils.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === 'undefined') {
          return;
        }

        if (utils.isArray(val)) {
          key = key + '[]';
        } else {
          val = [val];
        }

        utils.forEach(val, function parseValue(v) {
          if (utils.isDate(v)) {
            v = v.toISOString();
          } else if (utils.isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(encode(key) + '=' + encode(v));
        });
      });

      serializedParams = parts.join('&');
    }

    if (serializedParams) {
      var hashmarkIndex = url.indexOf('#');
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }

      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
  };

  function InterceptorManager() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected
    });
    return this.handlers.length - 1;
  };

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   */
  InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   */
  InterceptorManager.prototype.forEach = function forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };

  var InterceptorManager_1 = InterceptorManager;

  /**
   * Transform the data for a request or a response
   *
   * @param {Object|String} data The data to be transformed
   * @param {Array} headers The headers for the request or response
   * @param {Array|Function} fns A single function or Array of functions
   * @returns {*} The resulting transformed data
   */
  var transformData = function transformData(data, headers, fns) {
    /*eslint no-param-reassign:0*/
    utils.forEach(fns, function transform(fn) {
      data = fn(data, headers);
    });

    return data;
  };

  var isCancel = function isCancel(value) {
    return !!(value && value.__CANCEL__);
  };

  var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
    utils.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };

  /**
   * Update an Error with the specified config, error code, and response.
   *
   * @param {Error} error The error to update.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The error.
   */
  var enhanceError = function enhanceError(error, config, code, request, response) {
    error.config = config;
    if (code) {
      error.code = code;
    }

    error.request = request;
    error.response = response;
    error.isAxiosError = true;

    error.toJSON = function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: this.config,
        code: this.code
      };
    };
    return error;
  };

  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The created error.
   */
  var createError = function createError(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError(error, config, code, request, response);
  };

  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   */
  var settle = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(createError(
        'Request failed with status code ' + response.status,
        response.config,
        null,
        response.request,
        response
      ));
    }
  };

  var cookies = (
    utils.isStandardBrowserEnv() ?

    // Standard browser envs support document.cookie
      (function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + '=' + encodeURIComponent(value));

            if (utils.isNumber(expires)) {
              cookie.push('expires=' + new Date(expires).toGMTString());
            }

            if (utils.isString(path)) {
              cookie.push('path=' + path);
            }

            if (utils.isString(domain)) {
              cookie.push('domain=' + domain);
            }

            if (secure === true) {
              cookie.push('secure');
            }

            document.cookie = cookie.join('; ');
          },

          read: function read(name) {
            var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
            return (match ? decodeURIComponent(match[3]) : null);
          },

          remove: function remove(name) {
            this.write(name, '', Date.now() - 86400000);
          }
        };
      })() :

    // Non standard browser env (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return {
          write: function write() {},
          read: function read() { return null; },
          remove: function remove() {}
        };
      })()
  );

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  var isAbsoluteURL = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  };

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   * @returns {string} The combined URL
   */
  var combineURLs = function combineURLs(baseURL, relativeURL) {
    return relativeURL
      ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL;
  };

  /**
   * Creates a new URL by combining the baseURL with the requestedURL,
   * only when the requestedURL is not already an absolute URL.
   * If the requestURL is absolute, this function returns the requestedURL untouched.
   *
   * @param {string} baseURL The base URL
   * @param {string} requestedURL Absolute or relative URL to combine
   * @returns {string} The combined full path
   */
  var buildFullPath = function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  };

  // Headers whose duplicates are ignored by node
  // c.f. https://nodejs.org/api/http.html#http_message_headers
  var ignoreDuplicateOf = [
    'age', 'authorization', 'content-length', 'content-type', 'etag',
    'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
    'last-modified', 'location', 'max-forwards', 'proxy-authorization',
    'referer', 'retry-after', 'user-agent'
  ];

  /**
   * Parse headers into an object
   *
   * ```
   * Date: Wed, 27 Aug 2014 08:58:49 GMT
   * Content-Type: application/json
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * ```
   *
   * @param {String} headers Headers needing to be parsed
   * @returns {Object} Headers parsed into an object
   */
  var parseHeaders = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;

    if (!headers) { return parsed; }

    utils.forEach(headers.split('\n'), function parser(line) {
      i = line.indexOf(':');
      key = utils.trim(line.substr(0, i)).toLowerCase();
      val = utils.trim(line.substr(i + 1));

      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === 'set-cookie') {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      }
    });

    return parsed;
  };

  var isURLSameOrigin = (
    utils.isStandardBrowserEnv() ?

    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
      (function standardBrowserEnv() {
        var msie = /(msie|trident)/i.test(navigator.userAgent);
        var urlParsingNode = document.createElement('a');
        var originURL;

        /**
      * Parse a URL to discover it's components
      *
      * @param {String} url The URL to be parsed
      * @returns {Object}
      */
        function resolveURL(url) {
          var href = url;

          if (msie) {
          // IE needs attribute set twice to normalize properties
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
          }

          urlParsingNode.setAttribute('href', href);

          // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
              urlParsingNode.pathname :
              '/' + urlParsingNode.pathname
          };
        }

        originURL = resolveURL(window.location.href);

        /**
      * Determine if a URL shares the same origin as the current location
      *
      * @param {String} requestURL The URL to test
      * @returns {boolean} True if URL shares the same origin, otherwise false
      */
        return function isURLSameOrigin(requestURL) {
          var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
          return (parsed.protocol === originURL.protocol &&
              parsed.host === originURL.host);
        };
      })() :

    // Non standard browser envs (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
          return true;
        };
      })()
  );

  var xhr = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;

      if (utils.isFormData(requestData)) {
        delete requestHeaders['Content-Type']; // Let the browser set it
      }

      if (
        (utils.isBlob(requestData) || utils.isFile(requestData)) &&
        requestData.type
      ) {
        delete requestHeaders['Content-Type']; // Let the browser set it
      }

      var request = new XMLHttpRequest();

      // HTTP basic authentication
      if (config.auth) {
        var username = config.auth.username || '';
        var password = unescape(encodeURIComponent(config.auth.password)) || '';
        requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
      }

      var fullPath = buildFullPath(config.baseURL, config.url);
      request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

      // Set the request timeout in MS
      request.timeout = config.timeout;

      // Listen for ready state
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }

        // Prepare the response
        var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
        var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
        var response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config: config,
          request: request
        };

        settle(resolve, reject, response);

        // Clean up request
        request = null;
      };

      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }

        reject(createError('Request aborted', config, 'ECONNABORTED', request));

        // Clean up request
        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(createError('Network Error', config, null, request));

        // Clean up request
        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
          request));

        // Clean up request
        request = null;
      };

      // Add xsrf header
      // This is only done if running in a standard browser environment.
      // Specifically not if we're in a web worker, or react-native.
      if (utils.isStandardBrowserEnv()) {
        // Add xsrf header
        var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }

      // Add headers to the request
      if ('setRequestHeader' in request) {
        utils.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
            // Remove Content-Type if data is undefined
            delete requestHeaders[key];
          } else {
            // Otherwise add header to the request
            request.setRequestHeader(key, val);
          }
        });
      }

      // Add withCredentials to request if needed
      if (!utils.isUndefined(config.withCredentials)) {
        request.withCredentials = !!config.withCredentials;
      }

      // Add responseType to request if needed
      if (config.responseType) {
        try {
          request.responseType = config.responseType;
        } catch (e) {
          // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
          // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
          if (config.responseType !== 'json') {
            throw e;
          }
        }
      }

      // Handle progress if needed
      if (typeof config.onDownloadProgress === 'function') {
        request.addEventListener('progress', config.onDownloadProgress);
      }

      // Not all browsers support upload events
      if (typeof config.onUploadProgress === 'function' && request.upload) {
        request.upload.addEventListener('progress', config.onUploadProgress);
      }

      if (config.cancelToken) {
        // Handle cancellation
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (!request) {
            return;
          }

          request.abort();
          reject(cancel);
          // Clean up request
          request = null;
        });
      }

      if (!requestData) {
        requestData = null;
      }

      // Send the request
      request.send(requestData);
    });
  };

  var DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
      headers['Content-Type'] = value;
    }
  }

  function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
      // For browsers use XHR adapter
      adapter = xhr;
    } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
      // For node use HTTP adapter
      adapter = xhr;
    }
    return adapter;
  }

  var defaults = {
    adapter: getDefaultAdapter(),

    transformRequest: [function transformRequest(data, headers) {
      normalizeHeaderName(headers, 'Accept');
      normalizeHeaderName(headers, 'Content-Type');
      if (utils.isFormData(data) ||
        utils.isArrayBuffer(data) ||
        utils.isBuffer(data) ||
        utils.isStream(data) ||
        utils.isFile(data) ||
        utils.isBlob(data)
      ) {
        return data;
      }
      if (utils.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
        return data.toString();
      }
      if (utils.isObject(data)) {
        setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
        return JSON.stringify(data);
      }
      return data;
    }],

    transformResponse: [function transformResponse(data) {
      /*eslint no-param-reassign:0*/
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) { /* Ignore */ }
      }
      return data;
    }],

    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,

    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',

    maxContentLength: -1,
    maxBodyLength: -1,

    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };

  defaults.headers = {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  };

  utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
  });

  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
  });

  var defaults_1 = defaults;

  /**
   * Throws a `Cancel` if cancellation has been requested.
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
  }

  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   * @returns {Promise} The Promise to be fulfilled
   */
  var dispatchRequest = function dispatchRequest(config) {
    throwIfCancellationRequested(config);

    // Ensure headers exist
    config.headers = config.headers || {};

    // Transform request data
    config.data = transformData(
      config.data,
      config.headers,
      config.transformRequest
    );

    // Flatten headers
    config.headers = utils.merge(
      config.headers.common || {},
      config.headers[config.method] || {},
      config.headers
    );

    utils.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      function cleanHeaderConfig(method) {
        delete config.headers[method];
      }
    );

    var adapter = config.adapter || defaults_1.adapter;

    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Transform response data
      response.data = transformData(
        response.data,
        response.headers,
        config.transformResponse
      );

      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          reason.response.data = transformData(
            reason.response.data,
            reason.response.headers,
            config.transformResponse
          );
        }
      }

      return Promise.reject(reason);
    });
  };

  /**
   * Config-specific merge-function which creates a new config-object
   * by merging two configuration objects together.
   *
   * @param {Object} config1
   * @param {Object} config2
   * @returns {Object} New object resulting from merging config2 to config1
   */
  var mergeConfig = function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    var config = {};

    var valueFromConfig2Keys = ['url', 'method', 'data'];
    var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
    var defaultToConfig2Keys = [
      'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
      'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
      'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
      'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
      'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
    ];
    var directMergeKeys = ['validateStatus'];

    function getMergedValue(target, source) {
      if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
        return utils.merge(target, source);
      } else if (utils.isPlainObject(source)) {
        return utils.merge({}, source);
      } else if (utils.isArray(source)) {
        return source.slice();
      }
      return source;
    }

    function mergeDeepProperties(prop) {
      if (!utils.isUndefined(config2[prop])) {
        config[prop] = getMergedValue(config1[prop], config2[prop]);
      } else if (!utils.isUndefined(config1[prop])) {
        config[prop] = getMergedValue(undefined, config1[prop]);
      }
    }

    utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
      if (!utils.isUndefined(config2[prop])) {
        config[prop] = getMergedValue(undefined, config2[prop]);
      }
    });

    utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

    utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
      if (!utils.isUndefined(config2[prop])) {
        config[prop] = getMergedValue(undefined, config2[prop]);
      } else if (!utils.isUndefined(config1[prop])) {
        config[prop] = getMergedValue(undefined, config1[prop]);
      }
    });

    utils.forEach(directMergeKeys, function merge(prop) {
      if (prop in config2) {
        config[prop] = getMergedValue(config1[prop], config2[prop]);
      } else if (prop in config1) {
        config[prop] = getMergedValue(undefined, config1[prop]);
      }
    });

    var axiosKeys = valueFromConfig2Keys
      .concat(mergeDeepPropertiesKeys)
      .concat(defaultToConfig2Keys)
      .concat(directMergeKeys);

    var otherKeys = Object
      .keys(config1)
      .concat(Object.keys(config2))
      .filter(function filterAxiosKeys(key) {
        return axiosKeys.indexOf(key) === -1;
      });

    utils.forEach(otherKeys, mergeDeepProperties);

    return config;
  };

  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   */
  function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager_1(),
      response: new InterceptorManager_1()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {Object} config The config specific for this request (merged with this.defaults)
   */
  Axios.prototype.request = function request(config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof config === 'string') {
      config = arguments[1] || {};
      config.url = arguments[0];
    } else {
      config = config || {};
    }

    config = mergeConfig(this.defaults, config);

    // Set config.method
    if (config.method) {
      config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
      config.method = this.defaults.method.toLowerCase();
    } else {
      config.method = 'get';
    }

    // Hook up interceptors middleware
    var chain = [dispatchRequest, undefined];
    var promise = Promise.resolve(config);

    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  };

  Axios.prototype.getUri = function getUri(config) {
    config = mergeConfig(this.defaults, config);
    return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
  };

  // Provide aliases for supported request methods
  utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, config) {
      return this.request(mergeConfig(config || {}, {
        method: method,
        url: url
      }));
    };
  });

  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method: method,
        url: url,
        data: data
      }));
    };
  });

  var Axios_1 = Axios;

  /**
   * A `Cancel` is an object that is thrown when an operation is canceled.
   *
   * @class
   * @param {string=} message The message.
   */
  function Cancel(message) {
    this.message = message;
  }

  Cancel.prototype.toString = function toString() {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
  };

  Cancel.prototype.__CANCEL__ = true;

  var Cancel_1 = Cancel;

  /**
   * A `CancelToken` is an object that can be used to request cancellation of an operation.
   *
   * @class
   * @param {Function} executor The executor function.
   */
  function CancelToken(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    var token = this;
    executor(function cancel(message) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new Cancel_1(message);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `Cancel` if cancellation has been requested.
   */
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token: token,
      cancel: cancel
    };
  };

  var CancelToken_1 = CancelToken;

  /**
   * Syntactic sugar for invoking a function and expanding an array for arguments.
   *
   * Common use case would be to use `Function.prototype.apply`.
   *
   *  ```js
   *  function f(x, y, z) {}
   *  var args = [1, 2, 3];
   *  f.apply(null, args);
   *  ```
   *
   * With `spread` this example can be re-written.
   *
   *  ```js
   *  spread(function(x, y, z) {})([1, 2, 3]);
   *  ```
   *
   * @param {Function} callback
   * @returns {Function}
   */
  var spread = function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   * @return {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    var context = new Axios_1(defaultConfig);
    var instance = bind(Axios_1.prototype.request, context);

    // Copy axios.prototype to instance
    utils.extend(instance, Axios_1.prototype, context);

    // Copy context to instance
    utils.extend(instance, context);

    return instance;
  }

  // Create the default instance to be exported
  var axios = createInstance(defaults_1);

  // Expose Axios class to allow class inheritance
  axios.Axios = Axios_1;

  // Factory for creating new instances
  axios.create = function create(instanceConfig) {
    return createInstance(mergeConfig(axios.defaults, instanceConfig));
  };

  // Expose Cancel & CancelToken
  axios.Cancel = Cancel_1;
  axios.CancelToken = CancelToken_1;
  axios.isCancel = isCancel;

  // Expose all/spread
  axios.all = function all(promises) {
    return Promise.all(promises);
  };
  axios.spread = spread;

  var axios_1 = axios;

  // Allow use of default import syntax in TypeScript
  var default_1 = axios;
  axios_1.default = default_1;

  var axios$1 = axios_1;

  var fileDownload = function(data, filename, mime, bom) {
      var blobData = (typeof bom !== 'undefined') ? [bom, data] : [data];
      var blob = new Blob(blobData, {type: mime || 'application/octet-stream'});
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
          // IE workaround for "HTML7007: One or more blob URLs were
          // revoked by closing the blob for which they were created.
          // These URLs will no longer resolve as the data backing
          // the URL has been freed."
          window.navigator.msSaveBlob(blob, filename);
      }
      else {
          var blobURL = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
          var tempLink = document.createElement('a');
          tempLink.style.display = 'none';
          tempLink.href = blobURL;
          tempLink.setAttribute('download', filename);

          // Safari thinks _blank anchor are pop ups. We only want to set _blank
          // target if the browser does not support the HTML5 download attribute.
          // This allows you to download files in desktop safari if pop up blocking
          // is enabled.
          if (typeof tempLink.download === 'undefined') {
              tempLink.setAttribute('target', '_blank');
          }

          document.body.appendChild(tempLink);
          tempLink.click();

          // Fixes "webkit blob resource error 1"
          setTimeout(function() {
              document.body.removeChild(tempLink);
              window.URL.revokeObjectURL(blobURL);
          }, 200);
      }
  };

  var _HTTP_ERROR_CONSTANT;

  var HttpError = function HttpError(errorCode, errorMsg, error) {
    _classCallCheck(this, HttpError);

    this.errorCode = errorCode;
    this.errorMsg = errorMsg;
    this.error = error;
  };

  var HTTP_STATUS_CODE = {
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    UnsupportedMedia: 407,
    BadRequestMin: 9400,
    BadRequestMax: 9499,
    ServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HTTPVersionNotSupported: 505,
    ServerExceptionMin: 9500,
    ServerExceptionMax: 9599,
    UnkownError: 600
  };
  var HTTP_ERROR_CONSTANT = (_HTTP_ERROR_CONSTANT = {}, _defineProperty(_HTTP_ERROR_CONSTANT, HTTP_STATUS_CODE.BadRequest, new HttpError(HTTP_STATUS_CODE.BadRequest, 'Bad Request 请求出现语法错误')), _defineProperty(_HTTP_ERROR_CONSTANT, HTTP_STATUS_CODE.Unauthorized, new HttpError(HTTP_STATUS_CODE.Unauthorized, 'Unauthorized 权限不足,访问被拒绝')), _defineProperty(_HTTP_ERROR_CONSTANT, HTTP_STATUS_CODE.Forbidden, new HttpError(HTTP_STATUS_CODE.Forbidden, 'Forbidden 资源不可用,执行访问被禁止')), _defineProperty(_HTTP_ERROR_CONSTANT, HTTP_STATUS_CODE.NotFound, new HttpError(HTTP_STATUS_CODE.NotFound, 'Not Found 无法找到指定位置的资源')), _defineProperty(_HTTP_ERROR_CONSTANT, HTTP_STATUS_CODE.MethodNotAllowed, new HttpError(HTTP_STATUS_CODE.MethodNotAllowed, 'Method Not Allowed 请求方法（GET、POST等）对指定的资源不适用')), _defineProperty(_HTTP_ERROR_CONSTANT, HTTP_STATUS_CODE.NotAcceptable, new HttpError(HTTP_STATUS_CODE.NotAcceptable, 'Not Acceptable 指定的资源已经找到，但MIME类型和客户在Accpet头中所指定的不兼容')), _defineProperty(_HTTP_ERROR_CONSTANT, HTTP_STATUS_CODE.UnsupportedMedia, new HttpError(HTTP_STATUS_CODE.UnsupportedMedia, 'Unsupported Media 不支持的媒体类型')), _defineProperty(_HTTP_ERROR_CONSTANT, HTTP_STATUS_CODE.BadRequestMin, new HttpError(HTTP_STATUS_CODE.BadRequestMin, 'Bad Request 当前无法发起正确的网络请求, 请联系管理员')), _defineProperty(_HTTP_ERROR_CONSTANT, HTTP_STATUS_CODE.BadRequestMax, new HttpError(HTTP_STATUS_CODE.BadRequestMax, 'Bad Request 当前无法发起正确的网络请求, 请联系管理员')), _defineProperty(_HTTP_ERROR_CONSTANT, HTTP_STATUS_CODE.ServerError, new HttpError(HTTP_STATUS_CODE.ServerError, 'Server Error 服务器遇到了意料不到的情况，不能完成客户的请求')), _defineProperty(_HTTP_ERROR_CONSTANT, HTTP_STATUS_CODE.NotImplemented, new HttpError(HTTP_STATUS_CODE.NotImplemented, 'Not Implemented 服务器不支持实现请求所需要的功能')), _defineProperty(_HTTP_ERROR_CONSTANT, HTTP_STATUS_CODE.ServiceUnavailable, new HttpError(HTTP_STATUS_CODE.ServiceUnavailable, 'Service Unavailable 服务不可用')), _defineProperty(_HTTP_ERROR_CONSTANT, HTTP_STATUS_CODE.GatewayTimeout, new HttpError(HTTP_STATUS_CODE.GatewayTimeout, 'Gateway Timeout 网关超时')), _defineProperty(_HTTP_ERROR_CONSTANT, HTTP_STATUS_CODE.HTTPVersionNotSupported, new HttpError(HTTP_STATUS_CODE.HTTPVersionNotSupported, 'HTTP Version Not Supported 服务器不支持请求中所指明的HTTP版本')), _defineProperty(_HTTP_ERROR_CONSTANT, HTTP_STATUS_CODE.ServerExceptionMin, new HttpError(HTTP_STATUS_CODE.ServerExceptionMin, 'Server Exception 服务器出现异常，请耐心等待后重试或联系管理员')), _defineProperty(_HTTP_ERROR_CONSTANT, HTTP_STATUS_CODE.ServerExceptionMax, new HttpError(HTTP_STATUS_CODE.ServerExceptionMax, 'Server Exception 服务器出现异常，请耐心等待后重试或联系管理员')), _defineProperty(_HTTP_ERROR_CONSTANT, HTTP_STATUS_CODE.UnkownError, new HttpError(HTTP_STATUS_CODE.UnkownError, 'Unkown Error 出现了未知错误,  请联系管理员')), _HTTP_ERROR_CONSTANT);

  var RequestPlugin = {
    install: function install(Vue, opts) {
      var requestInterceptorMap = new Map();
      var responseInterceptorMap = new Map();
      /**
       *
       * @deprecated 单词命名出错，方法弃用，在2020-07-01之后无法使用
       * @param {any} catchFunction
       */
      // eslint-disable-next-line no-extend-native

      Promise.prototype.aysncErrorCatch = function (catchFunction) {
        console.warn('@deprecated 单词命名出错，方法弃用，在2020-07-01之后无法使用, 请使用asyncErrorCatch方法');
        this.$currentErrorCatchFunction = catchFunction;
        return this;
      };
      /**
       *
       * @deprecated 单词命名出错，方法弃用，在2020-07-01之后无法使用
       * @param {any} catchFunction
       */
      // eslint-disable-next-line no-extend-native


      Promise.prototype.aysncThen = function (onResolve, onReject) {
        console.warn('@deprecated 单词命名出错，方法弃用，在2020-07-01之后无法使用, 请使用asyncThen方法');
        this.then(onResolve, onReject);
        return this;
      }; // eslint-disable-next-line no-extend-native


      Promise.prototype.asyncErrorCatch = function (catchFunction) {
        this.$currentErrorCatchFunction = catchFunction;
        return this;
      }; // eslint-disable-next-line no-extend-native


      Promise.prototype.asyncThen = function (onResolve, onReject) {
        this.then(onResolve, onReject);
        return this;
      };

      var options = {
        baseURL: opts.baseURL || '',
        timeout: opts.timeout || 50000,
        method: opts.method || 'get',
        headers: opts.headers || {},
        withCredentials: opts.withCredentials || false,
        responseType: opts.responseType || 'json',
        validateStatus: opts.validateStatus || function (status) {
          return status >= 200 && status < 300; // 默认的
        },
        maxRedirects: opts.maxRedirects || 5,
        onUploadProgress: opts.onUploadProgress,
        onDownloadProgress: opts.onDownloadProgress,
        needShowMessage: opts.needShowMessage === true || typeof opts.needShowMessage === 'undefined'
      };
      var customOptions = {
        businessValid: opts.businessValid || function (response) {
          return response.code === '200' || response.code === 'ok';
        },
        businessTransform: opts.businessTransform || function (data, response) {
          data.headers = response.headers;
          data.data = data.data || data.table;
        },
        errorCatch: function errorCatch(err, needShowMessage) {
          /**
           * 返回true阻断系统提示事件
           */
          if (opts.errorCatch(err, needShowMessage)) {
            return;
          }

          if (!needShowMessage) {
            return;
          }

          if (err.response) {
            if (HTTP_ERROR_CONSTANT[err.response.status]) {
              Vue.prototype.$message.error(HTTP_ERROR_CONSTANT[err.response.status].errorMsg);
            } else if (err.response.status >= HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.BadRequestMin].errorCode - 9000 && err.response.status <= HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.BadRequestMax].errorCode - 9000) {
              Vue.prototype.$message.error(HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.BadRequestMin].errorMsg);
            } else if (err.response.status >= HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.ServerExceptionMin].errorCode - 9000 && err.response.status <= HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.ServerExceptionMin].errorCode - 9000) {
              Vue.prototype.$message.error(HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.ServerExceptionMin].errorMsg);
            }
          } else if (err.message === '终止请求') {
            console.log(err.message);
          } else {
            Vue.prototype.$message.error('timeout : 网络连接超时了， 请检查您的网络设置');
          }
        },
        businessErrorCatch: opts.businessErrorCatch || function (failRes, response, needShowMessage) {
          if (needShowMessage) {
            Vue.prototype.$message.info(failRes.message);
          }
        }
      }; // 设置通用配置

      var instance = axios$1.create({
        baseURL: options.baseURL,
        timeout: options.timeout,
        method: options.method,
        headers: options.headers,
        withCredentials: options.withCredentials,
        responseType: options.responseType,
        validateStatus: options.validateStatus,
        maxRedirects: options.maxRedirects
      });

      Vue.setGlobalConfig = function (networkConfig) {
        var globalOptions = _objectSpread2(_objectSpread2({}, options), networkConfig);

        instance.defaults = _objectSpread2(_objectSpread2({}, instance.defaults), globalOptions);
        Vue.axios = instance;
        Vue.prototype.$axios = instance;
      };

      Vue.addHeaders = function (headers) {
        options.headers = _objectSpread2(_objectSpread2({}, options.headers), headers);
        instance.defaults = _objectSpread2(_objectSpread2({}, instance.defaults), options);
        Vue.axios = instance;
        Vue.prototype.$axios = instance;
      };

      Vue.addInterceptorsRequest = function (interceptorKey, callback) {
        Vue.removeInterceptorsRequest(interceptorKey);
        var requestInterceptor = instance.interceptors.request.use(callback);
        requestInterceptorMap.set(interceptorKey, requestInterceptor);
      };

      Vue.removeInterceptorsRequest = function (interceptorKey) {
        if (requestInterceptorMap.get(interceptorKey)) {
          instance.interceptors.request.eject(requestInterceptorMap.get(interceptorKey));
        }
      };

      Vue.addInterceptorsResponse = function (interceptorKey, callback) {
        Vue.removeInterceptorsResponse(interceptorKey);
        var responseInterceptor = instance.interceptors.response.use(callback);
        responseInterceptorMap.set(interceptorKey, responseInterceptor);
      };

      Vue.removeInterceptorsResponse = function (interceptorKey) {
        if (responseInterceptorMap.get(interceptorKey)) {
          instance.interceptors.request.eject(responseInterceptorMap.get(interceptorKey));
        }
      };

      Vue.post = function (urlConfig, needShowMessage) {
        var config = {
          url: urlConfig.url,
          data: urlConfig.params,
          config: _objectSpread2(_objectSpread2({}, urlConfig.config), {}, {
            method: 'post'
          })
        };
        return Vue.request(config, needShowMessage);
      };

      Vue.get = function (urlConfig, needShowMessage) {
        var config = {
          url: urlConfig.url,
          params: urlConfig.params,
          config: _objectSpread2(_objectSpread2({}, urlConfig.config), {}, {
            method: 'get'
          })
        };
        Vue.request(config, needShowMessage);
      };

      Vue.request = function (urlConfig, needShowMessage) {
        if (typeof needShowMessage === 'undefined') {
          needShowMessage = options.needShowMessage;
        }

        urlConfig = JSON.parse(JSON.stringify(urlConfig));

        if (urlConfig.url.indexOf('?') !== -1) {
          urlConfig.url = urlConfig.url + '&' + 'timestamp=' + new Date().valueOf();
        } else {
          urlConfig.url = urlConfig.url + '?' + 'timestamp=' + new Date().valueOf();
        }

        var config = _objectSpread2(_objectSpread2(_objectSpread2({}, options), urlConfig), {}, {
          url: urlConfig.url,
          method: urlConfig.method,
          params: urlConfig.params,
          headers: _objectSpread2(_objectSpread2({}, options.headers), urlConfig.headers),
          cancelToken: urlConfig.config && urlConfig.config.cancelToken
        });

        if (config.method === 'post' || config.method === 'POST') {
          config.data = urlConfig.params;
          delete config.params;
        } // eslint-disable-next-line no-extend-native


        var promise;
        promise = new Promise(function (resolve, reject) {
          instance.request(config).then(function (response) {
            var data = response.data; // 自定义解析字段，并带上相关请求头

            if (customOptions.businessValid(data)) {
              customOptions.businessTransform(data, response);
              resolve(data);
            } else {
              customOptions.businessErrorCatch(data, response, needShowMessage);
              reject(data);
            }
          }).catch(function (err) {
            customOptions.errorCatch(err, needShowMessage);

            if (promise && promise.$currentErrorCatchFunction) {
              promise.$currentErrorCatchFunction(err);
            }
          });
        }); // eslint-disable-next-line no-new

        return promise;
      };
      /**
       * 默认使用post方式下载文件，若需要修改则需要在传入参数的config中，添加相关配置 { method: 'post'}
       */


      Vue.download = function (urlConfig, onDownloadProgress, needShowMessage) {
        if (typeof needShowMessage === 'undefined') {
          needShowMessage = options.needShowMessage;
        }

        var config = _objectSpread2(_objectSpread2(_objectSpread2({}, options), urlConfig), {}, {
          timeout: urlConfig.timeout || -1,
          url: urlConfig.url,
          method: urlConfig.method,
          params: urlConfig.params,
          responseType: 'blob',
          onDownloadProgress: onDownloadProgress || urlConfig.onDownloadProgress,
          cancelToken: urlConfig.config && urlConfig.config.cancelToken
        });

        if (config.method === 'post' || config.method === 'POST') {
          config.data = urlConfig.params;
          delete config.params;
        } // eslint-disable-next-line no-new


        var promise;
        promise = new Promise(function (resolve, reject) {
          instance.request(config).then(function (response) {
            // console.error(response)
            var disposition = response.headers['content-disposition'];
            var filename = disposition && disposition.match(/filename=(.*)/).length > 1 && decodeURI(disposition.match(/filename=(.*)/)[1]);
            filename = urlConfig.filename || filename || '下载文件';
            fileDownload(response.data, filename); // 将文件配置放入数据

            resolve(disposition);
          }).catch(function (err) {
            console.error(err);
            customOptions.errorCatch(err, needShowMessage);

            if (promise && promise.$currentErrorCatchFunction) {
              promise.$currentErrorCatchFunction(err);
            }
          });
        });
        return promise;
      };
      /**
       * @param urlConfig.params 参数必须是FormData
       */


      Vue.upload = function (urlConfig, onUploadProgress, needShowMessage) {
        if (typeof needShowMessage === 'undefined') {
          needShowMessage = options.needShowMessage;
        }

        var config = _objectSpread2(_objectSpread2(_objectSpread2({}, options), urlConfig), {}, {
          timeout: urlConfig.timeout || -1,
          method: 'post',
          onUploadProgress: onUploadProgress || options.onUploadProgress,
          headers: _objectSpread2(_objectSpread2(_objectSpread2({}, options.headers), urlConfig.headers), {}, {
            'Content-Type': 'multipart/form-data'
          }),
          url: urlConfig.url,
          data: urlConfig.params
        });

        delete config.params; // eslint-disable-next-line no-new

        var promise;
        promise = new Promise(function (resolve, reject) {
          instance.request(config).then(function (response) {
            var data = response.data; // 自定义解析字段，并带上相关请求头

            if (customOptions.businessValid(data)) {
              customOptions.businessTransform(data, response);
              resolve(data);
            } else {
              customOptions.businessErrorCatch(data, response, needShowMessage);
              reject(data);
            }
          }).catch(function (err) {
            customOptions.errorCatch(err, needShowMessage);

            if (promise && promise.$currentErrorCatchFunction) {
              promise.$currentErrorCatchFunction(err);
            }
          });
        });
        return promise;
      };

      Vue.prototype.$post = Vue.post;
      Vue.prototype.$get = Vue.get;
      Vue.prototype.$request = Vue.request;
      Vue.prototype.$download = Vue.download;
      Vue.prototype.$upload = Vue.upload;
      Vue.axios = instance;
      Vue.prototype.$axios = instance;
    }
  };
  RequestPlugin.axios = axios$1;
  RequestPlugin.HttpConstant = {
    HttpError: HttpError,
    HTTP_STATUS_CODE: HTTP_STATUS_CODE,
    HTTP_ERROR_CONSTANT: HTTP_ERROR_CONSTANT
  };

  var components = [__vue_component__, __vue_component__$1, __vue_component__$2];
  var plugins = [RequestPlugin];

  var install = function install(Vue) {
    // 判断是否安装
    if (install.installed) {
      return;
    }

    plugins.forEach(function (plugin) {
      Vue.use(plugin);
    });
    components.forEach(function (component) {
      Vue.component(component.name, component);
    });
  };

  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  var index = {
    version: version,
    install: install,
    TestModule: __vue_component__,
    EEllipsis: __vue_component__$1,
    ETagGroup: __vue_component__$2,
    ERequestPlugin: RequestPlugin
  };

  return index;

})));
