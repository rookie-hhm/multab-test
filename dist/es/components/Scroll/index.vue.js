import script from './index.vue2.js';
import normalizeComponent from './../../dependencies/_vue-runtime-helpers@1.1.2@vue-runtime-helpers/dist/normalize-component.js';
import createInjector from './../../dependencies/_vue-runtime-helpers@1.1.2@vue-runtime-helpers/dist/inject-style/browser.js';

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    ref: "scroll",
    staticClass: "scroll-wrapper"
  }, [_vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

/* style */
var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-c2fe70fa_0", {
    source: ".scroll-wrapper[data-v-c2fe70fa] {\n  position: relative;\n  overflow: hidden;\n  height: 100%;\n}\n\n/*# sourceMappingURL=index.vue.map */",
    map: {
      "version": 3,
      "sources": ["/Users/rookie/Desktop/classes/multi-tab-packages/src/components/Scroll/index.vue", "index.vue"],
      "names": [],
      "mappings": "AAoJA;EACA,kBAAA;EACA,gBAAA;EACA,YAAA;ACnJA;;AAEA,oCAAoC",
      "file": "index.vue",
      "sourcesContent": ["<template>\n  <div ref=\"scroll\" class=\"scroll-wrapper\">\n    <slot></slot>\n  </div>\n</template>\n\n<script>\nimport BScroll from '@better-scroll/core'\nimport PullUp from '@better-scroll/pull-up'\nimport ObserveDOM from '@better-scroll/observe-dom'\nimport NestedScroll from '@better-scroll/nested-scroll'\nimport PullDown from '@better-scroll/pull-down'\nimport Slide from '@better-scroll/slide'\nimport { toHump } from '@/utils/share'\nBScroll\n  .use(ObserveDOM)\n  .use(PullUp)\n  .use(NestedScroll)\n  .use(PullDown)\n  .use(Slide)\n\nconst DIRECTION_H = 'horizontal'\nconst DIRECTION_V = 'vertical'\nexport default {\n  name: 'BaseScroll',\n  props: {\n    direction: {\n      type: String,\n      default: ''\n    },\n    data: {\n      type: [Object, Array],\n      default() {\n        return []\n      }\n    }\n  },\n  watch: {\n    data() {\n      setTimeout(this.refresh, 20)\n    }\n  },\n  methods: {\n    initScroll() {\n      const options = this.parseOptions()\n      this.options = options\n      this.scroll = new BScroll(this.$refs.scroll, options)\n      this.proxyMethods()\n      this.registerListeners()\n    },\n    parseOptions() {\n      const defaultOptions = {\n        click: true,\n        scrollY: true,\n        probeType: 3,\n        pullUpLoad: this.$attrs.pullUpLoad || false,\n        observeDOM: true,\n      }\n      let eventPassthrough = this.direction\n      if (this.direction) {\n        eventPassthrough = DIRECTION_H ? DIRECTION_V : DIRECTION_H\n      }\n      defaultOptions.eventPassthrough = eventPassthrough\n      Object.assign(defaultOptions, this.$attrs)\n      const result = {}\n      let newKey = ''\n      Object.keys(defaultOptions).forEach(key => {\n        // 可以将key值驼峰化\n        newKey = toHump(key)\n        result[newKey] = defaultOptions[key]\n      })\n      return result\n    },\n    proxyMethods() {\n      for (const key in this.scroll) {\n        if (typeof this.scroll[key] === 'function') {\n          this[key] = this.scroll[key]\n        }\n      }\n    },\n    registerListeners() {\n      const hooks = this.scroll.scroller.actionsHandler.hooks\n      const { pullDownRefresh, slide } = this.options\n      // better-scroll的点击事件\n      hooks.on('click', e => {\n        this.$emit('click', e)\n      })\n      this.scroll.on('scroll', pos => {\n        this.$emit('scroll', pos)\n      })\n      this.scroll.on('scrollEnd', (pos) => {\n        this.$emit('scrollEnd', pos)\n      })\n      this.options.pullUpLoad && this.scroll.on('pullingUp', () => {\n        this.$emit('pullingUp')\n      })\n      this.scroll.on('beforeScrollStart', () => {\n        this.$emit('beforeScrollStart')\n      })\n      this.scroll.on('scrollStart', () => {\n        this.$emit('scrollStart')\n      })\n      if (pullDownRefresh) {\n        this.scroll.on('pullingDown', () => {\n          this.$emit('pullingDown')\n        })\n        this.scroll.on('enterThreshold', () => {\n          this.$emit('enterThreshold')\n        })\n        this.scroll.on('leaveThreshold', () => {\n          this.$emit('leaveThreshold')\n        })\n      }\n      if (slide) {\n        this.scroll.on('slideWillChange', (page) => {\n          this.$emit('slideWillChange', page)\n        })\n        this.scroll.on('slidePageChanged', (page) => {\n          this.$emit('slidePageChanged', page)\n        })\n      }\n    },\n    // scrollToElement() {\n    //   this.scroll && this.scroll.scrollToElement(...arguments)\n    // },\n    // scrollTo() {\n    //   this.scroll && this.scroll.scrollTo(...arguments)\n    // },\n    // enable() {\n    //   this.scroll && this.scroll.enable()\n    // },\n    // disable() {\n    //   this.scroll && this.scroll.disable()\n    // },\n    // refresh() {\n    //   this.scroll && this.scroll.refresh()\n    // }\n  },\n  mounted() {\n    this.$nextTick(this.initScroll)\n  },\n  destroyed() {\n    this.scroll.destroy()\n  }\n}\n</script>\n\n<style lang='scss' scoped>\n.scroll-wrapper {\n  position: relative;\n  overflow: hidden;\n  height: 100%;\n}\n</style>\n", ".scroll-wrapper {\n  position: relative;\n  overflow: hidden;\n  height: 100%;\n}\n\n/*# sourceMappingURL=index.vue.map */"]
    },
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__ = "data-v-c2fe70fa";
/* module identifier */
var __vue_module_identifier__ = undefined;
/* functional template */
var __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

export { __vue_component__ as default };
