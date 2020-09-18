import EEventOutsideDirective from './e-event-outside'

EEventOutsideDirective.install = function(Vue) {
  Vue.directive('click-outside', EEventOutsideDirective)
}

export default EEventOutsideDirective
