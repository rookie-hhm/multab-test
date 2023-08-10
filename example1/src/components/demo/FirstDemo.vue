<template>
  <div class="demo">
    <div class="item" v-for="i in number" :key="i">{{ i }}---{{  }}</div>
  </div>
</template>

<script>
export default {
  inject: ['multiTab', 'multiTabItem'],
  data () {
    return {
      number: 500
    }
  },
  methods: {

  },
  mounted() {
    console.log('first demo mounted')
    // this.$nextTick(this.multiTab.updateHeight)
    this.multiTabItem.$on('pullingUp', (params) => { // 上拉加载
      console.log('pullingUp', params, 'params')
      setTimeout(() => {
        this.multiTabItem.finishPullUp()
        this.multiTabItem.closePullUp()
      }, 2000)
    })
  }
}
</script>

<style lang='scss' scoped>
.demo {
  .item {
    border: 1px solid;
    height: 50px;
    line-height: 50px;
  }
}
</style>
