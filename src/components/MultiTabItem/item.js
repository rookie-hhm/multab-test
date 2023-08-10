import { SlotsMixin } from '@/utils/mixins'
import { ChildrenMixin } from '@/utils/relation'
import emitter from '@/utils/emitter';
import './item.scss'
export default {
  name: 'multi-tab-item',
  provide() {
    return {
      multiTabItem: this
    }
  },
  inject: ['multiTab'],
  mixins: [SlotsMixin, emitter, ChildrenMixin('multiTab')],
  props: {
    title: {
      // 标题
      type: String,
      default: '',
    },
    itemStyle: {
      type: Object,
      default() {
        return {
          'min-height': '1px',
          height: 'auto', // slide模式下，slide-page必须要有高度，不然会报错
        }
      },
    },
  },
  data() {
    return {
      mounted: false,
    }
  },
  computed: {
    shouldRender() {
      const { index, inited, parent, mounted } = this
      if (!parent.lazyRender || inited) {
        return true
      }
      if (!mounted) {
        return false
      }
      const active = parent.currentPageIndex
      const shouldRender = index === active
      if (shouldRender) {
        this.inited = true
      }
      return shouldRender
    },
  },
  watch: {
    // shouldRender(val) {
      // val && this.$nextTick(this.multiTab.updateHeight)
    // }
  },
  methods: {
    createDomObserver() {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          console.log(entry, 'entry', this.index)
          if (entry.contentBoxSize) {
            this.multiTab.updateHeight()
          }
        }
        console.log('Size changed');
      });
      this.resizeObserver.observe(this.$refs.slidePageContent)
    },
    finishPullUp(isPullingUp = false) { // 结束当前的上拉加载，为下次做准备
      console.log('finishPullUp', this.index, isPullingUp)
      this.dispatch('multi-tab', 'pullingUp', {
        index: this.index,
        isPullingUp
      })
    },
    closePullUp() { // 结束上拉加载
      this.finishPullUp(true)
    },
    openPullUp() { // 开启上拉加载
      this.finishPullUp(false)
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log('mounted multiTabItem')
      this.mounted = true
      this.createDomObserver()
    })
  },
  created() {
    this.$on(`pullingUp-${this.index}`, () => this.$emit('pullingUp', { index: this.index }));
  },
  beforeDestroy() {
    this.$off(`pullingUp-${this.index}`)
    this.resizeObserver.unobserve(this.$refs.slidePageContent)
    this.resizeObserver = null
  },
  render() {
    return (
      <div ref="slidePage" class="slide-page">
        <div ref="slidePageContent" style={this.itemStyle}>
          当前页面索引值---{ this.index }
          {this.shouldRender && this.slots() }
        </div>
      </div>
    )
  }
}
