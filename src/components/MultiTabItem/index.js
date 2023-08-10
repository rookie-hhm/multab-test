import MultiTabItem from "./item";

MultiTabItem.install = (app) => {
  app.component(MultiTabItem.name, MultiTabItem)
}
const _MultiTabItem = MultiTabItem
export default _MultiTabItem