(function() {
  var com_name, conf;

  com_name = "Checkbox";

  conf = React.createClass(CKR.react_key_map(com_name, {
    mount_done: function() {
      return this.indeterminate_from_props(this.props);
    },
    props_change: function(props) {
      return this.indeterminate_from_props(props);
    },
    indeterminate_from_props: function(props) {
      this.refs.input.indeterminate = typeof props.value !== "boolean";
    },
    render: function() {
      return span({
        on_click: this.on_change,
        style: {
          cursor: this.props.disabled ? "" : "pointer"
        },
        on_hover: (function(_this) {
          return function() {
            var _base;
            return typeof (_base = _this.props).on_hover === "function" ? _base.on_hover() : void 0;
          };
        })(this),
        on_mouse_out: (function(_this) {
          return function() {
            var _base, _base1;
            if (typeof (_base = _this.props).on_mouse_out === "function") {
              _base.on_mouse_out();
            }
            return typeof (_base1 = _this.props).on_blur === "function" ? _base1.on_blur() : void 0;
          };
        })(this)
      }, (function(_this) {
        return function() {
          input({
            ref: "input",
            id: _this.props.id,
            "class": _this.props["class"],
            style: Object.assign({
              cursor: _this.props.disabled ? "" : "pointer"
            }, _this.props.style || {}),
            disabled: _this.props.disabled,
            type: "checkbox",
            checked: _this.props.value || false
          });
          return _this.props.label || _this.props.children;
        };
      })(this));
    },
    on_change: function(event) {
      var value, _base;
      if (this.props.disabled) {
        return;
      }
      value = !(this.props.value || false);
      this.props.on_change(value);
      if (typeof (_base = this.props).on_click === "function") {
        _base.on_click(event, value);
      }
    }
  }));

  define_com("Checkbox", conf);

}).call(this);
