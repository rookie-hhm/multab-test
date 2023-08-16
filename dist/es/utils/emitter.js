import { typeof as _typeof } from '../_virtual/_rollupPluginBabelHelpers.js';

function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.name;
    console.log(child.$options.name, '');
    console.log(componentName, name, 'broadcast');
    console.log(_typeof(child.$emit));
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
var emitter = {
  methods: {
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.name;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    }
  }
};

export { emitter as default };
