export function getOffset(child, parent) {
  parent = parent || document.body
  let top = 0
  let left = 0
  console.log(child, parent)
  while (child && child !== parent) {
    left += child.offsetLeft
    top += child.offsetTop
    child = child.offsetParent
  }
  return { left, top }
}