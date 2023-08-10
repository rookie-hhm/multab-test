<template>
  <div ref="scroll" class="scroll-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom'
import NestedScroll from '@better-scroll/nested-scroll'
import PullDown from '@better-scroll/pull-down'
import Slide from '@better-scroll/slide'
import { toHump } from '@/utils/share'
BScroll
  .use(ObserveDOM)
  .use(PullUp)
  .use(NestedScroll)
  .use(PullDown)
  .use(Slide)

const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'
export default {
  name: 'BaseScroll',
  props: {
    direction: {
      type: String,
      default: ''
    },
    data: {
      type: [Object, Array],
      default() {
        return []
      }
    }
  },
  watch: {
    data() {
      setTimeout(this.refresh, 20)
    }
  },
  methods: {
    initScroll() {
      const options = this.parseOptions()
      this.options = options
      this.scroll = new BScroll(this.$refs.scroll, options)
      this.proxyMethods()
      this.registerListeners()
    },
    parseOptions() {
      const defaultOptions = {
        click: true,
        scrollY: true,
        probeType: 3,
        pullUpLoad: this.$attrs.pullUpLoad || false,
        observeDOM: true,
      }
      let eventPassthrough = this.direction
      if (this.direction) {
        eventPassthrough = DIRECTION_H ? DIRECTION_V : DIRECTION_H
      }
      defaultOptions.eventPassthrough = eventPassthrough
      Object.assign(defaultOptions, this.$attrs)
      const result = {}
      let newKey = ''
      Object.keys(defaultOptions).forEach(key => {
        // 可以将key值驼峰化
        newKey = toHump(key)
        result[newKey] = defaultOptions[key]
      })
      return result
    },
    proxyMethods() {
      for (const key in this.scroll) {
        if (typeof this.scroll[key] === 'function') {
          this[key] = this.scroll[key]
        }
      }
    },
    registerListeners() {
      const hooks = this.scroll.scroller.actionsHandler.hooks
      const { pullDownRefresh, slide } = this.options
      // better-scroll的点击事件
      hooks.on('click', e => {
        this.$emit('click', e)
      })
      this.scroll.on('scroll', pos => {
        this.$emit('scroll', pos)
      })
      this.scroll.on('scrollEnd', (pos) => {
        this.$emit('scrollEnd', pos)
      })
      this.options.pullUpLoad && this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
      this.scroll.on('beforeScrollStart', () => {
        this.$emit('beforeScrollStart')
      })
      this.scroll.on('scrollStart', () => {
        this.$emit('scrollStart')
      })
      if (pullDownRefresh) {
        this.scroll.on('pullingDown', () => {
          this.$emit('pullingDown')
        })
        this.scroll.on('enterThreshold', () => {
          this.$emit('enterThreshold')
        })
        this.scroll.on('leaveThreshold', () => {
          this.$emit('leaveThreshold')
        })
      }
      if (slide) {
        this.scroll.on('slideWillChange', (page) => {
          this.$emit('slideWillChange', page)
        })
        this.scroll.on('slidePageChanged', (page) => {
          this.$emit('slidePageChanged', page)
        })
      }
    },
    // scrollToElement() {
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
  mounted() {
    this.$nextTick(this.initScroll)
  },
  destroyed() {
    this.scroll.destroy()
  }
}
</script>

<style lang='scss' scoped>
.scroll-wrapper {
  position: relative;
  overflow: hidden;
  height: 100%;
}
</style>
