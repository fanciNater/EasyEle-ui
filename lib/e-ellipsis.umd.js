/* * Copyright © 2020-2020 wucan * Released under the MIT License. */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
	typeof define === 'function' && define.amd ? define(['vue'], factory) :
	(global = global || self, global['e-ellipsis'] = factory(global.Vue));
}(this, (function (vue) { 'use strict';

	vue = vue && Object.prototype.hasOwnProperty.call(vue, 'default') ? vue['default'] : vue;

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
	var script = {
	  name: 'XEllipsis',
	  components: {
	    VClamp: vueClamp,
	    ElToolTip: ElToolTip
	  },
	  props: {
	    mode: {
	      type: String,
	      "default": 'clamp'
	    },
	    maxLines: {
	      type: Number,
	      "default": 1
	    },
	    label: {
	      type: String,
	      "default": ''
	    },
	    autoresize: {
	      type: Boolean,
	      "default": true
	    },
	    wrapperClass: {
	      type: String,
	      "default": ''
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

	__vue_component__.install = function (vue) {
	  vue.component(name, __vue_component__);
	};

	return __vue_component__;

})));
