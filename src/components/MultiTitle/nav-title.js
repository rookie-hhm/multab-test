import { SlotsMixin } from "@/utils/mixins"
import './nav-title.scss'
export default {
  mixins: [SlotsMixin],
  props: {
    title: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    },
  },
  methods: {
    genText() {
      return this.slots() || this.title
    }
  },
  render() {
    return (
      <div class="nav-title">{ this.genText() }</div>
    )
  }
}