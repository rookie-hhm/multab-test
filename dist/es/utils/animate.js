function animate(_ref) {
  var scroller = _ref.scroller,
    scrollContainer = _ref.scrollContainer,
    targetEle = _ref.targetEle,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 300 : _ref$duration;
  // 滚动 点击对应元素，滚动到元素的位置
  /**
   * scroller better-scroll对象
   * scrollContainer scroller所包裹的第一个子元素
   * targetEle 需要滚动的目标元素
   * duration 滚动时间
   */
  var scrollerEle = scroller.$el;
  var contentOffsetWidth = scrollContainer.offsetWidth;
  var tabsWidth = scrollerEle.offsetWidth;
  var offsetLeft = targetEle.offsetLeft,
    itemWidth = targetEle.offsetWidth;
  var min = -(contentOffsetWidth - tabsWidth);
  var to = (tabsWidth - itemWidth) / 2 - offsetLeft;
  console.log(to, 'to');
  if (to > 0) {
    to = 0;
  } else if (to <= min) {
    to = min;
  }
  scroller.scrollTo(to, 0, duration);
}

export { animate };
