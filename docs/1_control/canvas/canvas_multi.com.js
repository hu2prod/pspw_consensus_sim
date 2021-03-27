(function() {
  var com_name, conf;

  com_name = "Canvas_multi";

  conf = React.createClass(CKR.react_key_map(com_name, {
    mounted: false,
    mount_done: function() {
      var draw, _base;
      this.mounted = true;
      draw = (function(_this) {
        return function() {
          var canvas_hash, _base;
          if (!_this.mounted) {
            return;
          }
          canvas_hash = _this.canvas_actualize();
          requestAnimationFrame(draw);
          return typeof (_base = _this.props).canvas_cb === "function" ? _base.canvas_cb(canvas_hash) : void 0;
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
    props_change: function(new_props) {
      var layer, _i, _len, _ref;
      if (this.props.layer_list !== new_props.layer_list) {
        for (_i = 0, _len = new_props.length; _i < _len; _i++) {
          layer = new_props[_i];
          if ((_ref = this.props.gui) != null) {
            _ref.refresh(layer);
          }
        }
      }
    },
    old_width: 0,
    old_height: 0,
    old_layer_list: [],
    old_canvas_hash: {},
    canvas_actualize: function() {
      var box, canvas, canvas_hash, canvas_list, height, idx, name, width, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;
      box = this.refs.box;
      _ref = box.getBoundingClientRect(), width = _ref.width, height = _ref.height;
      if (this.old_width === width && this.old_height === height && this.old_layer_list === this.props.layer_list) {
        return this.old_canvas_hash;
      }
      this.old_width = width;
      this.old_height = height;
      this.old_layer_list = this.props.layer_list;
      canvas_list = [];
      _ref1 = this.props.layer_list;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        name = _ref1[_i];
        if (!(canvas = this.refs[name])) {
          continue;
        }
        canvas_list.push(canvas);
      }
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
      if (this.props.resize_fix !== false) {
        width -= 1;
        height -= 1;
      }
      for (idx = _j = 0, _len1 = canvas_list.length; _j < _len1; idx = ++_j) {
        canvas = canvas_list[idx];
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          if ((_ref2 = this.props.gui) != null) {
            _ref2.refresh(this.props.layer_list[idx]);
          }
        }
      }
      canvas_hash = {};
      _ref3 = this.props.layer_list;
      for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
        name = _ref3[_k];
        canvas_hash[name] = this.refs[name];
      }
      return this.old_canvas_hash = canvas_hash;
    },
    render: function() {
      return div({
        ref: "box",
        style: {
          width: "100%",
          height: "100%"
        }
      }, (function(_this) {
        return function() {
          var name, _i, _len, _ref;
          _ref = _this.props.layer_list || [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            name = _ref[_i];
            canvas({
              ref: name,
              style: {
                position: "absolute"
              },
              on_click: _this.mouse_click,
              onMouseDown: _this.mouse_down,
              onMouseUp: _this.mouse_up,
              onMouseMove: _this.mouse_move,
              onMouseOut: _this.mouse_out,
              onWheel: _this.mouse_wheel
            });
          }
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
      return (_ref = this.props.gui) != null ? typeof _ref.key_down === "function" ? _ref.key_down(event) : void 0 : void 0;
    },
    key_up: function(event) {
      var _ref;
      return (_ref = this.props.gui) != null ? typeof _ref.key_up === "function" ? _ref.key_up(event) : void 0 : void 0;
    },
    key_press: function(event) {
      var _ref;
      return (_ref = this.props.gui) != null ? typeof _ref.key_press === "function" ? _ref.key_press(event) : void 0 : void 0;
    },
    mouse_click: function(event) {
      var _ref, _ref1;
      if ((_ref = this.get_textarea()) != null) {
        _ref.focus();
      }
      return (_ref1 = this.props.gui) != null ? typeof _ref1.mouse_click === "function" ? _ref1.mouse_click(event, this.props.layer_list[0]) : void 0 : void 0;
    },
    mouse_down: function(event) {
      var _ref;
      return (_ref = this.props.gui) != null ? typeof _ref.mouse_down === "function" ? _ref.mouse_down(event, this.props.layer_list[0]) : void 0 : void 0;
    },
    mouse_up: function(event) {
      var _ref, _ref1;
      if ((_ref = this.get_textarea()) != null) {
        _ref.focus();
      }
      return (_ref1 = this.props.gui) != null ? typeof _ref1.mouse_up === "function" ? _ref1.mouse_up(event, this.props.layer_list[0]) : void 0 : void 0;
    },
    mouse_out: function(event) {
      var _ref;
      return (_ref = this.props.gui) != null ? typeof _ref.mouse_out === "function" ? _ref.mouse_out(event, this.props.layer_list[0]) : void 0 : void 0;
    },
    mouse_move: function(event) {
      var _ref;
      return (_ref = this.props.gui) != null ? typeof _ref.mouse_move === "function" ? _ref.mouse_move(event, this.props.layer_list[0]) : void 0 : void 0;
    },
    mouse_wheel: function(event) {
      var _ref;
      return (_ref = this.props.gui) != null ? typeof _ref.mouse_wheel === "function" ? _ref.mouse_wheel(event, this.props.layer_list[0]) : void 0 : void 0;
    },
    focus_out: function(event) {
      var _ref;
      return (_ref = this.props.gui) != null ? typeof _ref.focus_out === "function" ? _ref.focus_out(event, this.props.layer_list[0]) : void 0 : void 0;
    }
  }));

  define_com("Canvas_multi", conf);

}).call(this);
