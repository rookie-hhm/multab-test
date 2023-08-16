const Test = {
  name: 'test',
  render () {
    return (
      <div>
        <button type="primary">{ this.$slots.default || 'test' }</button>
        <div style="color: red;">test</div>
      </div>
      
    )
  }
}
Test.install = app => {
  app.component(Test.name, Test)
}
const _Test = Test
export default _Test