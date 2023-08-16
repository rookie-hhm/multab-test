import Scroll from '@/components/Scroll'
import MultiTabItem from '@/components/MultiTabItem'
import MultiTab from '@/components/MultiTab'
import Test from '@/components/test'
// export { default as Scroll } from '@/components/Scroll'
// export { default as MultiTabItem }  from '@/components/MultiTabItem'
// export { default as MultiTab }  from '@/components/MultiTab'
// export { default as Test }  from '@/components/test'
const components = [
  Scroll,
  MultiTabItem,
  MultiTab,
  Test
]
const install = app => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}
export {
  Scroll,
  MultiTab,
  MultiTabItem,
  Test,
  install
}
export default install
