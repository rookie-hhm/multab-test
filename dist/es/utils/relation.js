import { defineProperty as _defineProperty, toConsumableArray as _toConsumableArray } from '../_virtual/_rollupPluginBabelHelpers.js';
import { sortChildren } from './vnodes.js';

function ChildrenMixin(_parent) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var indexKey = options.indexKey || 'index';
  return {
    inject: _defineProperty({}, _parent, {
      "default": null
    }),
    computed: _defineProperty({
      parent: function parent() {
        if (this.disableBindRelation) {
          return null;
        }
        return this[_parent];
      }
    }, indexKey, function () {
      this.bindRelation();
      if (this.parent) {
        return this.parent.children.indexOf(this);
      }
      return null;
    }),
    watch: {
      disableBindRelation: function disableBindRelation(val) {
        if (!val) {
          this.bindRelation();
        }
      }
    },
    mounted: function mounted() {
      this.bindRelation();
    },
    beforeDestroy: function beforeDestroy() {
      var _this = this;
      if (this.parent) {
        this.parent.children = this.parent.children.filter(function (item) {
          return item !== _this;
        });
      }
    },
    methods: {
      bindRelation: function bindRelation() {
        if (!this.parent || this.parent.children.indexOf(this) !== -1) {
          return;
        }
        var children = [].concat(_toConsumableArray(this.parent.children), [this]);
        sortChildren(children, this.parent);
        this.parent.children = children;
      }
    }
  };
}
function ParentMixin(parent) {
  return {
    provide: function provide() {
      return _defineProperty({}, parent, this);
    },
    data: function data() {
      return {
        children: []
      };
    }
  };
}

export { ChildrenMixin, ParentMixin };
