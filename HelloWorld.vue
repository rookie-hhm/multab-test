<template>
  <div class="content-wrapper">
    <MultiTab ref="multiTab" :bounce="false" :pullUpLoad="true" :initialIndex="9" @wrapperScroll="handleScroll" @scrollEnd="onScrollEnd">
      <template v-slot:header>
        <div class="top">顶部区域</div>
      </template>
      <!-- 导航区域 -->
      <template v-slot:nav>
        <!-- <div class="nav">导航区域</div> -->
      </template>
      <!-- 默认区域 -->
      <!-- 设置每一页的内容自定义 -->
      <MultiTabItem v-for="i in 10" :key="i" :title="`demo${i}`">
        <first-demo v-if="i % 3 == 1" />
        <second-demo v-if="i % 3 == 2" />
        <third-demo v-if="i % 3 == 0" />
      </MultiTabItem>
    </MultiTab>
  </div>
</template>

<script>
import MultiTab from '@/components/MultiTab/tab'
// import Test from './Test.vue'
import MultiTabItem from '@/components/MultiTabItem/item'
import FirstDemo from '@/components/demo/FirstDemo'
import SecondDemo from '@/components/demo/SecondDemo'
import ThirdDemo from '@/components/demo/ThirdDemo'
export default {
  name: 'HelloWorld',
  components: {
    MultiTab,
    // Test
    MultiTabItem,
    FirstDemo,
    SecondDemo,
    ThirdDemo
  },
  data() {
    return {
      data: []
    }
  },
  methods: {
    handleScroll() {
      // console.log('handleScroll')
    },
    onScrollEnd() {
      // console.log('onScrollEnd')
    }
  },
  // created() {
  //   setInterval(() => {
  //     this.data.push(1)
  //   }, 1000);
  // }
  mounted() {
    // let count = 0
    this.$nextTick(() => {
      this.top = document.querySelector('.top')
      setTimeout(() => {
        this.top.style.height = 400 + 'px'
      }, 10000);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content-wrapper {
  height: 100%;
  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
    background: blue;
    color: white;
  }
}
</style>
