import { typeof as _typeof, objectSpread2 as _objectSpread2 } from '../../_virtual/_rollupPluginBabelHelpers.js';
import { SlotsMixin } from '../../utils/mixins.js';
import { ParentMixin } from '../../utils/relation.js';
import __vue_component__ from '../Scroll/index.vue.js';
import { animate } from '../../utils/animate.js';
import { getOffset } from '../../utils/dom.js';
import emitter from '../../utils/emitter.js';
import NavTitle from '../MultiTitle/nav-title.js';
import '../../src/components/MultiTab/tab.css';

var DEFAULT_THRESHOLD = 20;
var MultiTab = {
  name: 'multi-tab',
  provide: function provide() {
    return {
      multiTab: this
    };
  },
  mixins: [SlotsMixin, emitter, ParentMixin('multiTab')],
  props: {
    lazyRender: {
      type: Boolean,
      "default": true
    },
    stickyTop: {
      // 顶部吸顶的距离
      type: [Number, Function],
      "default": 0
    },
    sticky: {
      type: Boolean,
      "default": true
    },
    initialIndex: {
      type: Number,
      "default": 0
    },
    pullUpLoad: {
      type: [Boolean, Object],
      "default": false
    }
  },
  data: function data() {
    return {
      slideOptions: {
        autoplay: false,
        startPageXIndex: 0,
        loop: false
      },
      slideHeight: '',
      minSlideHeight: 0,
      currentPageIndex: 0,
      initialPageIndex: 0,
      currentScrollTo: 0,
      headerHeight: 0,
      currentScrollTop: 0
      // isSticky: false, // 是否达到了吸顶条件
    };
  },

  computed: {
    childrenCount: function childrenCount() {
      return this.children ? this.children.length : 0;
    },
    isSticky: function isSticky() {
      console.log(this.currentScrollTop <= this.stickyTop, 'isSticky');
      console.log(Math.abs(this.currentScrollTop) >= this.headerHeight - this.stickyTop, 'isSticky');
      return this.currentScrollTop <= this.stickyTop && Math.abs(this.currentScrollTop) > 0 && Math.abs(this.currentScrollTop) >= this.headerHeight - this.stickyTop;
    },
    isShowNav: function isShowNav() {
      return this.isSticky && this.sticky;
    }
  },
  watch: {
    currentPageIndex: function currentPageIndex() {
      // 每次切换slide都要更新容器高度
      this.updateHeight();
    },
    headerHeight: function headerHeight() {
      this.updateHeight();
    }
  },
  methods: {
    genHeader: function genHeader() {
      // 头部插槽
      var header = this.slots('header');
      this.headerVNode = header;
      return header;
    },
    genNav: function genNav(type) {
      var h = this.$createElement;
      // 导航栏插槽
      var isShow = true;
      if (type === 'sticky') {
        isShow = this.isShowNav;
      }
      return h("div", {
        "class": ['multi-tab-nav-wrapper', type, !isShow ? 'hidden' : ''],
        "style": {
          top: this.stickyTop + 'px'
        }
      }, [this.slots('nav') || this.genDefaultNav(type)]);
    },
    genDefaultNav: function genDefaultNav() {
      var _this = this;
      var h = this.$createElement;
      // 默认的导航栏
      return h(__vue_component__, {
        "ref": "navScroll",
        "refInFor": true,
        "attrs": {
          "scrollX": true,
          "scrollY": false,
          "startX": this.initialIndex
        }
      }, [h("div", {
        "ref": "navContent",
        "class": "nav-content"
      }, [this.children.map(function (item, index) {
        return h(NavTitle, {
          "ref": "navTitle",
          "refInFor": true,
          "attrs": {
            "title": item.title,
            "index": index
          },
          "scopedSlots": {
            "default": function _default() {
              return item.slots('title');
            }
          },
          "nativeOn": {
            "click": function click(event) {
              _this.handleNavItemClick({
                item: item,
                index: index,
                event: event
              });
            }
          }
        });
      })])]);
    },
    handleNavItemClick: function handleNavItemClick(_ref) {
      var item = _ref.item,
        index = _ref.index,
        event = _ref.event;
      // 进行切换操作
      var navScroll = this.$refs.navScroll;
      navScroll.forEach(function (item) {
        var navContent = item.$el.children[0];
        animate({
          scroller: item,
          scrollContainer: navContent,
          targetEle: event.target
        });
      });
      this.handleSlideScrollStart();
      this.slide.goToPage(index, 0);
      this.$emit('nav-item-click', item, index);
    },
    onScroll: function onScroll(pos) {
      var y = pos.y;
      // let headerHeight = 0;
      if (this.headerVNode) {
        // 拿到实时的header内容的高度
        this.headerHeight = this.headerVNode[0].elm.offsetHeight; // 获取头部高度的值
      }
      // this.headerHeight = headerHeight
      this.currentScrollTop = y;
      console.log(this.isSticky);
      // stickyTop 必须为正数
      this.$emit('wrapperScroll', pos);
      if (this.pullUpLoad) {
        var deltaY = DEFAULT_THRESHOLD;
        if (_typeof(this.pullUpLoad) === 'object') {
          var threshold = this.pullUpLoad.threshold;
          if (threshold > 0) {
            deltaY = threshold;
          }
        }
        var child = this.children[this.currentPageIndex];
        var _this$container$scrol = this.container.scroll,
          maxScrollY = _this$container$scrol.maxScrollY,
          _y = _this$container$scrol.y,
          movingDirectionY = _this$container$scrol.movingDirectionY;
        if (Math.abs(_y) + deltaY >= Math.abs(maxScrollY) && movingDirectionY === 1 && !child._isPullingUp) {
          child._isPullingUp = true;
          this.broadcast('multi-tab-item', "pullingUp-".concat(this.currentPageIndex), {
            index: this.currentPageIndex
          });
        }
      }
    },
    handleSlideScrollStart: function handleSlideScrollStart() {
      var _this2 = this;
      var minStickyTop = this.calculateStickyTop();
      var bodyScrollTop = Math.abs(this.currentScrollTop);
      this.children.forEach(function (child) {
        if (_this2.currentPageIndex === child.index) {
          // 如果是当前的滑块，记录当前滚动的距离
          child._scrollTop = bodyScrollTop;
        }
        if (_this2.isSticky) {
          // 达到了吸顶的条件
          // 判断其余slide有没有记录
          var scrollTop = child._scrollTop;
          child._marginTop = Math.round(bodyScrollTop - Math.max(minStickyTop, scrollTop));
        } else {
          // child._scrollTop = 0
          child._marginTop = 0;
        }
        child.$el.style.marginTop = child._marginTop + 'px';
        child.$el.setAttribute('class', 'slide-page auto');
      });
    },
    handleSlideScrollEnd: function handleSlideScrollEnd() {
      var _this3 = this;
      // scroll end
      // 需要更新一下高度，不然后续滚动容器重置高度的时候，会出现偏离
      this.updateHeight();
      var minStickyTop = this.calculateStickyTop();
      // 计算当前body需要滚动的距离，因为当前子模块的_marginTop会变成0
      var bodyScrollTop = Math.abs(this.currentScrollTop) - this.children[this.currentPageIndex]._marginTop;
      var className = '';
      this.children.forEach(function (child) {
        className = 'hidden';
        if (child.index !== _this3.currentPageIndex) {
          if (_this3.isSticky) {
            var scrollTop = child._scrollTop;
            child._marginTop = scrollTop ? bodyScrollTop - child._scrollTop : bodyScrollTop - minStickyTop;
          } else {
            // 没吸顶的状态下，margin-top为零，子模块不需要进行偏移处理
            child._marginTop = 0;
          }
        } else {
          child._marginTop = 0;
          if (!_this3.isSticky) {
            child._scrollTop = 0;
          }
          className = 'auto';
        }
        child.$el.style.marginTop = child._marginTop + 'px';
        child.$el.setAttribute('class', "slide-page ".concat(className));
      });
      if (this.isSticky) {
        this.$nextTick(function () {
          _this3.container.scrollTo(0, -Math.max(bodyScrollTop, minStickyTop), 0);
        });
      }
    },
    calculateStickyTop: function calculateStickyTop() {
      // 计算包含nav在内元素吸顶的实际距离
      // 滚动容器最少需要滚动多少距离才能吸顶
      var navHeight = this.$refs.navScroll[0].$el.offsetHeight + this.stickyTop; // 获取得到nav的高度
      var slideOffsetTop = getOffset(this.slide.$el, this.container.$el).top; // slide容器距离顶部的高度
      var offsetTop = slideOffsetTop - navHeight;
      return Math.round(offsetTop);
    },
    handleSlideWillChange: function handleSlideWillChange(_ref2) {
      var pageX = _ref2.pageX;
      // 即将展示的坐标信息
      this.nextPageIndex = pageX; // 即将展示的索引值
    },
    handleSlidePageChanged: function handleSlidePageChanged(_ref3) {
      var pageX = _ref3.pageX;
      // 已经切换到了当前的坐标信息
      this.currentPageIndex = pageX;
    },
    updateHeight: function updateHeight() {
      var _this4 = this;
      // 更新整个容器的高度
      // 确保拿到更新后的容器高度
      var child = this.children[this.currentPageIndex].$el;
      var content = child.children[0];
      if (content) {
        this.slideHeight = content.offsetHeight + 20 + 'px';
        // 判断当前模块是否可以滚动
        child._isScroll = parseFloat(this.slideHeight) > parseFloat(this.minSlideHeight);
        this.$nextTick(function () {
          _this4.container.scroll.refresh();
        });
      }
    },
    initialSlide: function initialSlide() {
      var _this5 = this;
      var _this$$refs = this.$refs,
        container = _this$$refs.container,
        slide = _this$$refs.slide,
        navScroll = _this$$refs.navScroll;
      this.slide = slide; // 滑块容器
      this.container = container; // 滚动容器
      this.children.forEach(function (item) {
        item._marginTop = 0; // 当前子模块到达吸顶条件后，其余模块需要向下多少距离
        item._scrollTop = 0; // 当前子模块的滚动容器(container)所处的滚动距离
        item._isPullingUp = false; // 当前子模块是否处于下拉刷新中
        item._isScroll = true; // 当前子模块是否可以滚动
      });
      // startX与startY不生效，需要手动进行切换
      navScroll && navScroll.forEach(function (item) {
        var navContent = item.$el.children[0];
        var target = navContent.children[_this5.initialIndex];
        item.scrollToElement(target, 0);
      });
    }
  },
  mounted: function mounted() {
    var _this6 = this;
    this.$nextTick(function () {
      _this6.initialSlide();
      // this.updateHeight(); // 更新容器高度
      var navHeight = _this6.$refs.navScroll[0].$el.offsetHeight + _this6.stickyTop;
      _this6.minSlideHeight = _this6.container.$el.clientHeight - navHeight + 'px';
    });
  },
  created: function created() {
    var _this7 = this;
    // 初始化滑块
    this.slideOptions.startPageXIndex = this.initialIndex;
    this.currentPageIndex = this.initialIndex;
    this.$on('pullingUp', function (_ref4) {
      var index = _ref4.index,
        isPullingUp = _ref4.isPullingUp;
      // 用来控制上拉加载
      _this7.children[index]._isPullingUp = isPullingUp;
    });
  },
  render: function render() {
    var h = arguments[0];
    console.log(this.isSticky, 'isSticky');
    return h("div", {
      "class": "main-container-wrapper"
    }, [this.genNav('sticky'), h(__vue_component__, {
      "ref": "container",
      "class": "multi-tab-wrapper",
      "attrs": _objectSpread2({
        "nestedScroll": {
          groupId: 'dummy-divide'
        }
      }, this.$attrs),
      "on": _objectSpread2({
        "scroll": this.onScroll
      }, this.$listeners)
    }, [h("div", {
      "class": "content-wrapper"
    }, [this.genHeader(), this.genNav(), h(__vue_component__, {
      "ref": "slide",
      "class": "slide-wrapper",
      "attrs": {
        "bounce": false,
        "scrollX": true,
        "scrollY": false,
        "observeDOM": false,
        "nestedScroll": {
          groupId: 'dummy-divide'
        },
        "slide": this.slideOptions
      },
      "on": {
        "scrollStart": this.handleSlideScrollStart,
        "scrollEnd": this.handleSlideScrollEnd,
        "slideWillChange": this.handleSlideWillChange,
        "slidePageChanged": this.handleSlidePageChanged
      }
    }, [h("div", {
      "class": "slide-content",
      "style": {
        height: this.slideHeight,
        'min-height': this.minSlideHeight
      }
    }, [this.slots()])])])])]);
  }
};

export { MultiTab as default };
