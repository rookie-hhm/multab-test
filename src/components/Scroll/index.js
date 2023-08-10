import Scroll from './index.vue'

Scroll.install = (app) => {
  app.component(Scroll.name, Scroll)
}

const _Scroll = Scroll
export default _Scroll