var Test = {
  name: 'test',
  render: function render() {
    var h = arguments[0];
    return h("div", [h("button", {
      "attrs": {
        "type": "primary"
      }
    }, [this.$slots["default"] || 'test']), h("div", {
      "style": "color: red;"
    }, ["test"])]);
  }
};
Test.install = function (app) {
  app.component(Test.name, Test);
};
var _Test = Test;

export { _Test as default };
