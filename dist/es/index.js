import o from './components/Scroll/index.js';
import n from './components/MultiTabItem/index.js';
import t from './components/MultiTab/index.js';
import m from './components/test.js';
var e = [o, n, t, m],
  i = function (o) {
    e.forEach(function (n) {
      o.component(n.name, n);
    });
  },
  r = { install: i };
export {
  t as MultiTab,
  n as MultiTabItem,
  o as Scroll,
  m as Test,
  r as default,
  i as install,
};
