(function() {
  var com_name, conf;

  com_name = "Select";

  conf = React.createClass(CKR.react_key_map(com_name, {
    render: function() {
      var $list, v, _i, _len, _ref;
      $list = [];
      _ref = this.props.list || [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        $list.push(option({
          value: v.value
        }, v.title || (typeof v.value === "string" ? v.value : null) || ""));
      }
      return select({
        id: this.props.id,
        "class": this.props["class"],
        style: this.props.style,
        disabled: this.props.disabled,
        value: this.props.value,
        on_change: this.on_change,
        onFocus: (function(_this) {
          return function() {
            var _base;
            return typeof (_base = _this.props).on_focus === "function" ? _base.on_focus() : void 0;
          };
        })(this),
        onBlur: (function(_this) {
          return function() {
            var _base;
            return typeof (_base = _this.props).on_blur === "function" ? _base.on_blur() : void 0;
          };
        })(this),
        on_hover: (function(_this) {
          return function() {
            var _base;
            return typeof (_base = _this.props).on_hover === "function" ? _base.on_hover() : void 0;
          };
        })(this),
        on_mouse_out: (function(_this) {
          return function() {
            var _base;
            return typeof (_base = _this.props).on_mouse_out === "function" ? _base.on_mouse_out() : void 0;
          };
        })(this)
      }, $list);
    },
    on_change: function(event) {
      var value;
      value = event.target.value;
      this.props.on_change(value);
    }
  }));

  define_com("Select", conf);

}).call(this);
