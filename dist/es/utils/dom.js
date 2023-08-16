function getOffset(child, parent) {
  parent = parent || document.body;
  var top = 0;
  var left = 0;
  console.log(child, parent);
  while (child && child !== parent) {
    left += child.offsetLeft;
    top += child.offsetTop;
    child = child.offsetParent;
  }
  return {
    left: left,
    top: top
  };
}

export { getOffset };
