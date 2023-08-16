import BScroll from '@better-scroll/core';
import PullUp from '@better-scroll/pull-up';
import ObserveDOM from '@better-scroll/observe-dom';
import NestedScroll from '@better-scroll/nested-scroll';
import PullDown from '@better-scroll/pull-down';
import Slide from '@better-scroll/slide';
import { toHump } from '../../utils/share.js';

//
//
//
//
//
//

BScroll.use(ObserveDOM).use(PullUp).use(NestedScroll).use(PullDown).use(Slide);
var DIRECTION_V = 'vertical';
var script = {
  name: 'BaseScroll',
  props: {
    direction: {
      type: String,
      "default": ''
    },
    data: {
      type: [Object, Array],
      "default": function _default() {
        return [];
      }
    }
  },
  watch: {
    data: function data() {
      setTimeout(this.refresh, 20);
    }
  },
  methods: {
    initScroll: function initScroll() {
      var options = this.parseOptions();
      this.options = options;
      this.scroll = new BScroll(this.$refs.scroll, options);
      this.proxyMethods();
      this.registerListeners();
    },
    parseOptions: function parseOptions() {
      var defaultOptions = {
        click: true,
        scrollY: true,
        probeType: 3,
        pullUpLoad: this.$attrs.pullUpLoad || false,
        observeDOM: true
      };
      var eventPassthrough = this.direction;
      if (this.direction) {
        eventPassthrough = DIRECTION_V ;
      }
      defaultOptions.eventPassthrough = eventPassthrough;
      Object.assign(defaultOptions, this.$attrs);
      var result = {};
      var newKey = '';
      Object.keys(defaultOptions).forEach(function (key) {
        // 可以将key值驼峰化
        newKey = toHump(key);
        result[newKey] = defaultOptions[key];
      });
      return result;
    },
    proxyMethods: function proxyMethods() {
      for (var key in this.scroll) {
        if (typeof this.scroll[key] === 'function') {
          this[key] = this.scroll[key];
        }
      }
    },
    registerListeners: function registerListeners() {
      var _this = this;
      var hooks = this.scroll.scroller.actionsHandler.hooks;
      var _this$options = this.options,
        pullDownRefresh = _this$options.pullDownRefresh,
        slide = _this$options.slide;
      // better-scroll的点击事件
      hooks.on('click', function (e) {
        _this.$emit('click', e);
      });
      this.scroll.on('scroll', function (pos) {
        _this.$emit('scroll', pos);
      });
      this.scroll.on('scrollEnd', function (pos) {
        _this.$emit('scrollEnd', pos);
      });
      this.options.pullUpLoad && this.scroll.on('pullingUp', function () {
        _this.$emit('pullingUp');
      });
      this.scroll.on('beforeScrollStart', function () {
        _this.$emit('beforeScrollStart');
      });
      this.scroll.on('scrollStart', function () {
        _this.$emit('scrollStart');
      });
      if (pullDownRefresh) {
        this.scroll.on('pullingDown', function () {
          _this.$emit('pullingDown');
        });
        this.scroll.on('enterThreshold', function () {
          _this.$emit('enterThreshold');
        });
        this.scroll.on('leaveThreshold', function () {
          _this.$emit('leaveThreshold');
        });
      }
      if (slide) {
        this.scroll.on('slideWillChange', function (page) {
          _this.$emit('slideWillChange', page);
        });
        this.scroll.on('slidePageChanged', function (page) {
          _this.$emit('slidePageChanged', page);
        });
      }
    } // scrollToElement() {
    //   this.scroll && this.scroll.scrollToElement(...arguments)
    // },
    // scrollTo() {
    //   this.scroll && this.scroll.scrollTo(...arguments)
    // },
    // enable() {
    //   this.scroll && this.scroll.enable()
    // },
    // disable() {
    //   this.scroll && this.scroll.disable()
    // },
    // refresh() {
    //   this.scroll && this.scroll.refresh()
    // }
  },
  mounted: function mounted() {
    this.$nextTick(this.initScroll);
  },
  destroyed: function destroyed() {
    this.scroll.destroy();
  }
};

export { script as default };
