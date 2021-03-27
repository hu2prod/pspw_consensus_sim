(function() {
  var com_name, conf;

  com_name = "Canvas";

  conf = React.createClass(CKR.react_key_map(com_name, {
    mounted: false,
    mount_done: function() {
      var draw, _base;
      this.mounted = true;
      draw = (function(_this) {
        return function() {
          var _base;
          if (!_this.mounted) {
            return;
          }
          _this.canvas_actualize();
          requestAnimationFrame(draw);
          return typeof (_base = _this.props).canvas_cb === "function" ? _base.canvas_cb(_this.refs.canvas) : void 0;
        };
      })(this);
      draw();
      return typeof (_base = this.props).ref_textarea === "function" ? _base.ref_textarea(this.get_textarea()) : void 0;
    },
    get_textarea: function() {
      return this.props.textarea || this.refs.textarea;
    },
    unmount: function() {
      return this.mounted = false;
    },
    props_change: function() {
      var _ref;
      return (_ref = this.props.gui) != null ? _ref.refresh() : void 0;
    },
    canvas_actualize: function() {
      var canvas, height, width, _ref, _ref1;
      canvas = this.refs.canvas;
      if (canvas) {
        _ref = canvas.getBoundingClientRect(), width = _ref.width, height = _ref.height;
        if (this.props.width) {
          width = this.props.width;
        }
        if (this.props.height) {
          height = this.props.height;
        }
        if (this.props.size_x) {
          width = this.props.size_x;
        }
        if (this.props.size_y) {
          height = this.props.size_y;
        }
        width = Math.floor(width * devicePixelRatio);
        height = Math.floor(height * devicePixelRatio);
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          if ((_ref1 = this.props.gui) != null) {
            _ref1.refresh();
          }
        }
      }
    },
    render: function() {
      return div({
        style: {
          width: "100%",
          height: "100%"
        }
      }, (function(_this) {
        return function() {
          canvas({
            ref: "canvas",
            style: {
              width: _this.props.width || _this.props.size_x || "100%",
              height: _this.props.height || _this.props.size_y || "100%"
            },
            on_click: _this.mouse_click,
            onMouseDown: _this.mouse_down,
            onMouseMove: _this.mouse_move,
            onMouseOut: _this.mouse_out,
            onWheel: _this.mouse_wheel
          });
          if (!_this.props.textarea || _this.props.no_textarea) {
            return textarea({
              ref: "textarea",
              onKeyDown: _this.key_down,
              onKeyUp: _this.key_up,
              onKeyPress: _this.key_press,
              onBlur: _this.focus_out,
              style: {
                position: "absolute",
                top: -1000,
                left: -1000
              }
            });
          }
        };
      })(this));
    },
    key_down: function(event) {
      var _ref;
      return (_ref = this.props.gui) != null ? _ref.key_down(event) : void 0;
    },
    key_up: function(event) {
      var _ref;
      return (_ref = this.props.gui) != null ? _ref.key_up(event) : void 0;
    },
    key_press: function(event) {
      var _ref;
      return (_ref = this.props.gui) != null ? _ref.key_press(event) : void 0;
    },
    mouse_click: function(event) {
      var _ref, _ref1;
      if ((_ref = this.get_textarea()) != null) {
        _ref.focus();
      }
      return (_ref1 = this.props.gui) != null ? _ref1.mouse_click(event) : void 0;
    },
    mouse_down: function(event) {
      var _ref;
      return (_ref = this.props.gui) != null ? _ref.mouse_down(event) : void 0;
    },
    mouse_up: function(event) {
      var _ref, _ref1;
      if ((_ref = this.get_textarea()) != null) {
        _ref.focus();
      }
      return (_ref1 = this.props.gui) != null ? _ref1.mouse_up(event) : void 0;
    },
    mouse_out: function(event) {
      var _ref;
      return (_ref = this.props.gui) != null ? _ref.mouse_out(event) : void 0;
    },
    mouse_move: function(event) {
      var _ref;
      return (_ref = this.props.gui) != null ? _ref.mouse_move(event) : void 0;
    },
    mouse_wheel: function(event) {
      var _ref;
      return (_ref = this.props.gui) != null ? _ref.mouse_wheel(event) : void 0;
    },
    focus_out: function(event) {
      var _ref;
      return (_ref = this.props.gui) != null ? _ref.focus_out(event) : void 0;
    }
  }));

  define_com("Canvas", conf);

}).call(this);
