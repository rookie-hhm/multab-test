<template>
  <div class="tab-wrapper" :style="{ top }">
    <scroll
      class="scroller-tab"
      :scrollY="false"
      :scrollX="true"
      :observeDOM="false"
    >
      <ul class="tab-list">
        <li
          class="tab-item"
          v-for="(tab, i) in tabs"
          :key="i"
          @click="onClick(tab, i)"
        >
          {{ tab.name }}
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/Scroll'
export default {
  name: 'ScrollTab',
  components: {
    Scroll
  },
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      }
    },
    top: {
      type: [Number, String],
      default: 0
    }
  },
  methods: {
    onClick(tab, index) {
      this.$emit('click', { tab, index })
    }
  }
}
</script>

<style lang='scss' scoped>
.tab-wrapper {
  position: sticky;
  box-sizing: border-box;
  z-index: 100;
  width: 100%;
  padding: 5px 10px;
  white-space: nowrap;
  background: white;
  .scroller-tab {
    .tab-list {
      display: inline-block;
      .tab-item {
        display: inline-block;
        padding: 5px 20px;
        margin-right: 10px;
        background: blue;
        color: red;
      }
    }
  }
}
</style>
