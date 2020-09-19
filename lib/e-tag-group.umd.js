/* * Copyright © 2020-2020 wucan * Released under the MIT License. */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['e-tag-group'] = factory());
}(this, (function () { 'use strict';

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

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
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

  var script = {
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
