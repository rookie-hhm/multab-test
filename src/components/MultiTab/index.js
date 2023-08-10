import MultiTab from "./tab";

MultiTab.install = (app) => {
  app.component(MultiTab.name, MultiTab)
}
const _MultiTab = MultiTab
export default _MultiTab