import { SlotsMixin } from '@/utils/mixins';
import { ParentMixin } from '@/utils/relation';
import Scroll from '@/components/Scroll';
import { animate } from '@/utils/animate';
import { getOffset } from '@/utils/dom';
import emitter from '@/utils/emitter';
import NavTitle from './nav-title';
import './tab.scss';
const DEFAULT_THRESHOLD = 20;
export default {
  name: 'multi-tab',
  provide() {
    return {
      multiTab: this,
    };
  },
  mixins: [SlotsMixin, emitter, ParentMixin('multiTab')],
  props: {
    lazyRender: {
      type: Boolean,
      default: true,
    },
    stickyTop: {
      // 顶部吸顶的距离
      type: [Number, Function],
      default: 0,
    },
    sticky: {
      type: Boolean,
      default: true,
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: [Boolean, Object],
      default: false,
    },
  },
  data() {
    return {
      slideOptions: {
        autoplay: false,
        startPageXIndex: 0,
        loop: false,
      },
      slideHeight: '',
      minSlideHeight: 0,
      currentPageIndex: 0,
      initialPageIndex: 0,
      currentScrollTo: 0,
      headerHeight: 0,
      currentScrollTop: 0,
      // isSticky: false, // 是否达到了吸顶条件
    };
  },
  computed: {
    childrenCount() {
      return this.children ? this.children.length : 0;
    },
    isSticky () {
      console.log((this.currentScrollTop <= this.stickyTop), 'isSticky')
      console.log(Math.abs(this.currentScrollTop) >= (this.headerHeight - this.stickyTop), 'isSticky')
      return (this.currentScrollTop <= this.stickyTop)
        && Math.abs(this.currentScrollTop) > 0
        && Math.abs(this.currentScrollTop) >= (this.headerHeight - this.stickyTop);
    },
    isShowNav() {
      return this.isSticky && this.sticky;
    },
  },
  watch: {
    currentPageIndex() {
      // 每次切换slide都要更新容器高度
      this.updateHeight();
    },
    headerHeight() {
      this.updateHeight()
    }
  },
  methods: {
    genHeader() {
      // 头部插槽
      const header = this.slots('header');
      this.headerVNode = header;
      return header;
    },
    genNav(type) {
      // 导航栏插槽
      let isShow = true;
      if (type === 'sticky') {
        isShow = this.isShowNav;
      }
      return (
        <div
          class={['multi-tab-nav-wrapper', type, !isShow ? 'hidden' : '']}
          style={{ top: this.stickyTop + 'px' }}
        >
          {this.slots('nav') || this.genDefaultNav(type)}
        </div>
      );
    },
    genDefaultNav() {
      // 默认的导航栏
      return (
        <Scroll
          ref="navScroll"
          refInFor={true}
          scrollX={true}
          scrollY={false}
          startX={this.initialIndex}
        >
          <div ref="navContent" class="nav-content">
            {this.children.map((item, index) => (
              <NavTitle
                ref="navTitle"
                refInFor={true}
                title={item.title}
                index={index}
                scopedSlots={{
                  default: () => item.slots('title'),
                }}
                nativeOnClick={(event) => {
                  this.handleNavItemClick({ item, index, event });
                }}
              />
            ))}
          </div>
        </Scroll>
      );
    },
    handleNavItemClick({ item, index, event }) {
      // 进行切换操作
      const { navScroll } = this.$refs;
      navScroll.forEach((item) => {
        const navContent = item.$el.children[0];
        animate({
          scroller: item,
          scrollContainer: navContent,
          targetEle: event.target,
        });
      });
      this.handleSlideScrollStart();
      this.slide.goToPage(index, 0);
      this.$emit('nav-item-click', item, index);
    },
    onScroll(pos) {
      const { y } = pos;
      // let headerHeight = 0;
      if (this.headerVNode) {
        // 拿到实时的header内容的高度
        this.headerHeight = this.headerVNode[0].elm.offsetHeight; // 获取头部高度的值
      }
      // this.headerHeight = headerHeight
      this.currentScrollTop = y;
      console.log(this.isSticky)
      // stickyTop 必须为正数
      this.$emit('wrapperScroll', pos);
      if (this.pullUpLoad) {
        let deltaY = DEFAULT_THRESHOLD;
        if (typeof this.pullUpLoad === 'object') {
          const { threshold } = this.pullUpLoad;
          if (threshold > 0) {
            deltaY = threshold;
          }
        }
        const child = this.children[this.currentPageIndex];
        const { maxScrollY, y, movingDirectionY } = this.container.scroll;
        if (
          Math.abs(y) + deltaY >= Math.abs(maxScrollY) &&
          movingDirectionY === 1 &&
          !child._isPullingUp
        ) {
          child._isPullingUp = true;
          this.broadcast(
            'multi-tab-item',
            `pullingUp-${this.currentPageIndex}`,
            {
              index: this.currentPageIndex,
            }
          );
        }
      }
    },
    handleSlideScrollStart() {
      const minStickyTop = this.calculateStickyTop();
      const bodyScrollTop = Math.abs(this.currentScrollTop);
      this.children.forEach((child) => {
        if (this.currentPageIndex === child.index) {
          // 如果是当前的滑块，记录当前滚动的距离
          child._scrollTop = bodyScrollTop;
        }
        if (this.isSticky) {
          // 达到了吸顶的条件
          // 判断其余slide有没有记录
          const scrollTop = child._scrollTop;
          child._marginTop = Math.round(bodyScrollTop - Math.max(minStickyTop, scrollTop) 
          );
        } else {
          // child._scrollTop = 0
          child._marginTop = 0;
        }
        child.$el.style.marginTop = child._marginTop + 'px';
        child.$el.setAttribute('class', 'slide-page auto');
      });
    },
    handleSlideScrollEnd() {
      // scroll end
      // 需要更新一下高度，不然后续滚动容器重置高度的时候，会出现偏离
      this.updateHeight()
      const minStickyTop = this.calculateStickyTop();
      // 计算当前body需要滚动的距离，因为当前子模块的_marginTop会变成0
      const bodyScrollTop =
        Math.abs(this.currentScrollTop) -
        this.children[this.currentPageIndex]._marginTop;

      let className = '';
      this.children.forEach((child) => {
        className = 'hidden';
        if (child.index !== this.currentPageIndex) {
          if (this.isSticky) {
            const scrollTop = child._scrollTop;
            child._marginTop =
              scrollTop
                ? bodyScrollTop - child._scrollTop
                : bodyScrollTop - minStickyTop
            ;
          } else {
            // 没吸顶的状态下，margin-top为零，子模块不需要进行偏移处理
            child._marginTop = 0;
          }
        } else {
          child._marginTop = 0;
          if (!this.isSticky) {
            child._scrollTop = 0
          }
          className = 'auto';
        }
        child.$el.style.marginTop = child._marginTop + 'px';
        child.$el.setAttribute('class', `slide-page ${className}`);
      });
      if (this.isSticky) {
        this.$nextTick(() => {
          this.container.scrollTo(0, -Math.max(bodyScrollTop, minStickyTop), 0);
        });
      }
    },
    calculateStickyTop() {
      // 计算包含nav在内元素吸顶的实际距离
      // 滚动容器最少需要滚动多少距离才能吸顶
      const navHeight =
        this.$refs.navScroll[0].$el.offsetHeight + this.stickyTop; // 获取得到nav的高度
      const slideOffsetTop = getOffset(this.slide.$el, this.container.$el).top; // slide容器距离顶部的高度
      const offsetTop = slideOffsetTop - navHeight;
      return Math.round(offsetTop);
    },
    handleSlideWillChange({ pageX }) {
      // 即将展示的坐标信息
      this.nextPageIndex = pageX; // 即将展示的索引值
    },
    handleSlidePageChanged({ pageX }) {
      // 已经切换到了当前的坐标信息
      this.currentPageIndex = pageX;
    },
    updateHeight() {
      // 更新整个容器的高度
      // 确保拿到更新后的容器高度
      const child = this.children[this.currentPageIndex].$el;
      const content = child.children[0];
      if (content) {
        this.slideHeight = content.offsetHeight + 20 + 'px';
        // 判断当前模块是否可以滚动
        child._isScroll = parseFloat(this.slideHeight) > parseFloat(this.minSlideHeight)
        this.$nextTick(() => {
          this.container.scroll.refresh();
        });
      }
    },
    initialSlide() {
      const { container, slide, navScroll } = this.$refs;
      this.slide = slide; // 滑块容器
      this.container = container; // 滚动容器
      this.children.forEach((item) => {
        item._marginTop = 0; // 当前子模块到达吸顶条件后，其余模块需要向下多少距离
        item._scrollTop = 0; // 当前子模块的滚动容器(container)所处的滚动距离
        item._isPullingUp = false; // 当前子模块是否处于下拉刷新中
        item._isScroll = true // 当前子模块是否可以滚动
      });
      // startX与startY不生效，需要手动进行切换
      navScroll &&
        navScroll.forEach((item) => {
          const navContent = item.$el.children[0];
          const target = navContent.children[this.initialIndex];
          item.scrollToElement(target, 0);
        });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initialSlide();
      // this.updateHeight(); // 更新容器高度
      const navHeight =
        this.$refs.navScroll[0].$el.offsetHeight + this.stickyTop;
      this.minSlideHeight = this.container.$el.clientHeight - navHeight + 'px';
    });
  },
  created() {
    // 初始化滑块
    this.slideOptions.startPageXIndex = this.initialIndex;
    this.currentPageIndex = this.initialIndex;
    this.$on('pullingUp', ({ index, isPullingUp }) => {
      // 用来控制上拉加载
      this.children[index]._isPullingUp = isPullingUp;
    });
  },
  render() {
    console.log(this.isSticky, 'isSticky')
    return (
      <div class="main-container-wrapper">
        {this.genNav('sticky')}
        <Scroll
          ref="container"
          class="multi-tab-wrapper"
          nestedScroll={{
            groupId: 'dummy-divide',
          }}
          onScroll={this.onScroll}
          {...{
            on: this.$listeners,
            attrs: this.$attrs, // 传递$attrs到子组件里
          }}
        >
          <div class="content-wrapper">
            {this.genHeader()}
            {this.genNav()}
            <Scroll
              ref="slide"
              class="slide-wrapper"
              bounce={false}
              scrollX={true}
              scrollY={false}
              observeDOM={false} // 跟slide有冲突，必须设置为false
              nestedScroll={{
                groupId: 'dummy-divide',
              }}
              slide={this.slideOptions}
              onScrollStart={this.handleSlideScrollStart}
              onScrollEnd={this.handleSlideScrollEnd}
              onSlideWillChange={this.handleSlideWillChange}
              onSlidePageChanged={this.handleSlidePageChanged}
            >
              <div
                class="slide-content"
                style={{
                  height: this.slideHeight,
                  'min-height': this.minSlideHeight
                }}
              >
                {this.slots()}
              </div>
            </Scroll>
          </div>
        </Scroll>
      </div>
    );
  },
};
