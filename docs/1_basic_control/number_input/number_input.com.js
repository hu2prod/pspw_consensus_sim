(function() {
  var com_name, conf;

  com_name = "Number_input";

  conf = React.createClass(CKR.react_key_map(com_name, {
    text: "",
    mount: function() {
      this.set_text(this.props);
      this.force_update();
    },
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
      var _ref;
      return input(obj_set({}, this.props, {
        ref: "element",
        type: "number",
        value: this.text,
        on_change: this.on_change,
        pattern: (_ref = this.props.pattern) != null ? _ref : "-?[0-9]*([\.,][0-9]*)?",
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
    props_change: function(props) {
      if (props.value === this.props.value) {
        return;
      }
      if (props.value === parseFloat(this.text)) {
        return;
      }
      return this.set_text(props);
    },
    set_text: function(props) {
      if (props.value != null) {
        if (isNaN(props.value)) {
          this.text = "";
          return;
        }
        this.text = props.value.toString();
      }
    },
    on_change: function(event) {
      var num_value, value, _base;
      value = event.target.value;
      this.text = value;
      this.force_update();
      num_value = parseFloat(value);
      if (this.props.can_empty && value === "") {
        this.props.on_change(num_value);
        return;
      }
      if (isNaN(num_value)) {
        return;
      }
      if (typeof (_base = this.props).on_change === "function") {
        _base.on_change(num_value);
      }
    }
  }));

  define_com("Number_input", conf);

}).call(this);
