import __vue_component__ from './components/Scroll/index.vue.js';
import _MultiTabItem from './components/MultiTabItem/index.js';
import _MultiTab from './components/MultiTab/index.js';
import _Test from './components/test.js';

// export { default as Scroll } from '@/components/Scroll'
// export { default as MultiTabItem }  from '@/components/MultiTabItem'
// export { default as MultiTab }  from '@/components/MultiTab'
// export { default as Test }  from '@/components/test'
var components = [__vue_component__, _MultiTabItem, _MultiTab, _Test];
var install = function install(app) {
  components.forEach(function (component) {
    app.component(component.name, component);
  });
};

export { _MultiTab as MultiTab, _MultiTabItem as MultiTabItem, __vue_component__ as Scroll, _Test as Test, install as default, install };
