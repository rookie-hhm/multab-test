import MultiTab from './tab.js';

MultiTab.install = function (app) {
  app.component(MultiTab.name, MultiTab);
};
var _MultiTab = MultiTab;

export { _MultiTab as default };
