<template>
  <div class="demo">
    <div class="item" v-for="i in 200" :key="i">{{ i }}</div>
  </div>
</template>

<script>
export default {
  inject: ['multiTab', 'multiTabItem'],
  data () {
    return {

    }
  },
  methods: {

  },
  mounted() {
    // this.$nextTick(this.multiTab.updateHeight)
    this.$parent.$on('pullingUp', (params) => {
      console.log('pullingUp', params, 'params')
    })
  }
}
</script>

<style lang='scss' scoped>
.demo {
  .item {
    border-top: 1px solid purple;
    height: 50px;
    line-height: 50px;
  }
}
</style>
