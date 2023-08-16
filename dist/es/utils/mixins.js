var SlotsMixin = {
  methods: {
    slots: function slots() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
      var props = arguments.length > 1 ? arguments[1] : undefined;
      var $slots = this.$slots,
        $scopedSlots = this.$scopedSlots;
      var scopedSlot = $scopedSlots[name];
      if (scopedSlot) {
        return scopedSlot(props);
      }
      return $slots[name];
    }
  }
};

export { SlotsMixin };
