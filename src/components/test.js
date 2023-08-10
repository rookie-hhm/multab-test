export default {
  name: 'test',
  render () {
    return (
      <button type="primary">{ this.$slots.default || 'test' }</button>
    )
  }
}