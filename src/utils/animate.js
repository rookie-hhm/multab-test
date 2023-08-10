export function animate({ scroller, scrollContainer, targetEle, duration = 300 }) {
  // 滚动 点击对应元素，滚动到元素的位置
  /**
   * scroller better-scroll对象
   * scrollContainer scroller所包裹的第一个子元素
   * targetEle 需要滚动的目标元素
   * duration 滚动时间
   */
  const scrollerEle = scroller.$el
  const contentOffsetWidth = scrollContainer.offsetWidth
  const { offsetWidth: tabsWidth } = scrollerEle
  const { offsetLeft, offsetWidth: itemWidth } = targetEle
  const min = -(contentOffsetWidth - tabsWidth)
  let to = (tabsWidth - itemWidth) / 2 - offsetLeft
  console.log(to, 'to')
  if (to > 0) {
    to = 0
  } else if (to <= min) {
    to = min
  }
  scroller.scrollTo(to, 0, duration)
}