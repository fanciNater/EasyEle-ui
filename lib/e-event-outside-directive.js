/* * Copyright © 2020-2020 fanciNate * Released under the MIT License. */
'use strict';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var HANDLERS_PROPERTY = '__v-event-outside';
var HAS_WINDOWS = typeof window !== 'undefined';
var HAS_NAVIGATOR = typeof navigator !== 'undefined';
var IS_TOUCH = HAS_WINDOWS && ('ontouchstart' in window || HAS_NAVIGATOR && navigator.msMaxTouchPoints > 0);
var EVENTS = IS_TOUCH ? ['touchstart'] : ['click'];

function processDirectiveArguments(bindingValue) {
  var isFunction = typeof bindingValue === 'function';

  if (!isFunction && _typeof(bindingValue) !== 'object') {
    throw new Error('v-event-outside: Binding value must be a function or an object');
  }

  return {
    handler: isFunction ? bindingValue : bindingValue.handler,
    middleware: bindingValue.middleware || function (item) {
      return item;
    },
    events: bindingValue.events || EVENTS,
    isActive: !(bindingValue.isActive === false)
  };
}

function onEvent(_ref) {
  var el = _ref.el,
      event = _ref.event,
      handler = _ref.handler,
      middleware = _ref.middleware;
  // Note: composedPath is not supported on IE and Edge, more information here:
  //       https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
  //       In the meanwhile, we are using el.contains for those browsers, not
  //       the ideal solution, but using IE or EDGE is not ideal either.
  var path = event.path || event.composedPath && event.composedPath();
  var outsideCheck = path ? path.indexOf(el) < 0 : !el.contains(event.target);
  var isClickOutside = event.target !== el && outsideCheck;

  if (!isClickOutside) {
    return;
  }

  if (middleware(event)) {
    handler(event);
  }
}

function bind(el, _ref2) {
  var value = _ref2.value;

  var _processDirectiveArgu = processDirectiveArguments(value),
      events = _processDirectiveArgu.events,
      _handler = _processDirectiveArgu.handler,
      middleware = _processDirectiveArgu.middleware,
      isActive = _processDirectiveArgu.isActive;

  if (!isActive) {
    return;
  }

  el[HANDLERS_PROPERTY] = events.map(function (eventName) {
    return {
      event: eventName,
      handler: function handler(event) {
        return onEvent({
          event: event,
          el: el,
          handler: _handler,
          middleware: middleware
        });
      }
    };
  });
  el[HANDLERS_PROPERTY].forEach(function (_ref3) {
    var event = _ref3.event,
        handler = _ref3.handler;
    return setTimeout(function () {
      // Note: More info about this implementation can be found here:
      //       https://github.com/ndelvalle/v-click-outside/issues/137
      if (!el[HANDLERS_PROPERTY]) {
        return;
      }

      document.documentElement.addEventListener(event, handler, false);
    }, 0);
  });
}

function unbind(el) {
  var handlers = el[HANDLERS_PROPERTY] || [];
  handlers.forEach(function (_ref4) {
    var event = _ref4.event,
        handler = _ref4.handler;
    return document.documentElement.removeEventListener(event, handler, false);
  });
  delete el[HANDLERS_PROPERTY];
}

function update(el, _ref5) {
  var value = _ref5.value,
      oldValue = _ref5.oldValue;

  if (JSON.stringify(value) === JSON.stringify(oldValue)) {
    return;
  }

  unbind(el);
  bind(el, {
    value: value
  });
}

var directive = {
  bind: bind,
  update: update,
  unbind: unbind
};
var EEventOutsideDirective = HAS_WINDOWS ? directive : {};

EEventOutsideDirective.install = function (Vue) {
  Vue.directive('click-outside', EEventOutsideDirective);
};

module.exports = EEventOutsideDirective;
