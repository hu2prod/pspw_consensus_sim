(function() {
  var com_name, conf;

  com_name = "Text_input";

  conf = React.createClass(CKR.react_key_map(com_name, {
    mount_done: function() {
      var _base;
      if (typeof (_base = this.props).ref_cb === "function") {
        _base.ref_cb(this.refs.element);
      }
      if (this.props.autofocus) {
        return this.refs.element.focus();
      }
    },
    render: function() {
      return input(obj_set({}, this.props, {
        ref: "element",
        type: "text",
        value: this.props.value || "",
        on_change: this.on_change,
        on_key_press: (function(_this) {
          return function(event) {
            var _base, _base1;
            if (event.nativeEvent.which === 13) {
              if (typeof (_base = _this.props).on_enter === "function") {
                _base.on_enter(event);
              }
            }
            if (typeof (_base1 = _this.props).on_key_press === "function") {
              _base1.on_key_press(event);
            }
          };
        })(this)
      }));
    },
    on_change: function(event) {
      var value;
      value = event.target.value;
      this.props.on_change(value);
    }
  }));

  define_com("Text_input", conf);

}).call(this);
