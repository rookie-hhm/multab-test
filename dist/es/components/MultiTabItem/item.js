import { createForOfIteratorHelper as _createForOfIteratorHelper } from '../../_virtual/_rollupPluginBabelHelpers.js';
import { SlotsMixin } from '../../utils/mixins.js';
import { ChildrenMixin } from '../../utils/relation.js';
import emitter from '../../utils/emitter.js';
import './item.scss.js';

var MultiTabItem = {
  name: 'multi-tab-item',
  provide: function provide() {
    return {
      multiTabItem: this
    };
  },
  inject: ['multiTab'],
  mixins: [SlotsMixin, emitter, ChildrenMixin('multiTab')],
  props: {
    title: {
      // 标题
      type: String,
      "default": ''
    },
    itemStyle: {
      type: Object,
      "default": function _default() {
        return {
          'min-height': '1px',
          height: 'auto' // slide模式下，slide-page必须要有高度，不然会报错
        };
      }
    }
  },
  data: function data() {
    return {
      mounted: false
    };
  },
  computed: {
    shouldRender: function shouldRender() {
      var index = this.index,
        inited = this.inited,
        parent = this.parent,
        mounted = this.mounted;
      if (!parent.lazyRender || inited) {
        return true;
      }
      if (!mounted) {
        return false;
      }
      var active = parent.currentPageIndex;
      var shouldRender = index === active;
      if (shouldRender) {
        this.inited = true;
      }
      return shouldRender;
    }
  },
  watch: {
    // shouldRender(val) {
    // val && this.$nextTick(this.multiTab.updateHeight)
    // }
  },
  methods: {
    createDomObserver: function createDomObserver() {
      var _this = this;
      this.resizeObserver = new ResizeObserver(function (entries) {
        var _iterator = _createForOfIteratorHelper(entries),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;
            console.log(entry, 'entry', _this.index);
            if (entry.contentBoxSize) {
              _this.multiTab.updateHeight();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        console.log('Size changed');
      });
      this.resizeObserver.observe(this.$refs.slidePageContent);
    },
    finishPullUp: function finishPullUp() {
      var isPullingUp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      // 结束当前的上拉加载，为下次做准备
      console.log('finishPullUp', this.index, isPullingUp);
      this.dispatch('multi-tab', 'pullingUp', {
        index: this.index,
        isPullingUp: isPullingUp
      });
    },
    closePullUp: function closePullUp() {
      // 结束上拉加载
      this.finishPullUp(true);
    },
    openPullUp: function openPullUp() {
      // 开启上拉加载
      this.finishPullUp(false);
    }
  },
  mounted: function mounted() {
    var _this2 = this;
    this.$nextTick(function () {
      console.log('mounted multiTabItem');
      _this2.mounted = true;
      _this2.createDomObserver();
    });
  },
  created: function created() {
    var _this3 = this;
    this.$on("pullingUp-".concat(this.index), function () {
      return _this3.$emit('pullingUp', {
        index: _this3.index
      });
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.$off("pullingUp-".concat(this.index));
    this.resizeObserver.unobserve(this.$refs.slidePageContent);
    this.resizeObserver = null;
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "ref": "slidePage",
      "class": "slide-page"
    }, [h("div", {
      "ref": "slidePageContent",
      "style": this.itemStyle
    }, ["\u5F53\u524D\u9875\u9762\u7D22\u5F15\u503C---", this.index, this.shouldRender && this.slots()])]);
  }
};

export { MultiTabItem as default };
