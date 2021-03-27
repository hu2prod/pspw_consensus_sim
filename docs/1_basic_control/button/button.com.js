(function() {
  var com_name, conf;

  com_name = "Button";

  conf = React.createClass(CKR.react_key_map(com_name, {
    render: function() {
      return button({
        id: this.props.id,
        "class": this.props["class"],
        style: this.props.style,
        disabled: this.props.disabled,
        on_click: (function(_this) {
          return function(event) {
            var _base;
            return typeof (_base = _this.props).on_click === "function" ? _base.on_click(event) : void 0;
          };
        })(this),
        on_hover: (function(_this) {
          return function(event) {
            var _base;
            return typeof (_base = _this.props).on_hover === "function" ? _base.on_hover(event) : void 0;
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
      }, this.props.label);
    }
  }));

  define_com("Button", conf);

}).call(this);
