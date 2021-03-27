(function() {
  var com_name, conf;

  com_name = "Sequencer_panel";

  conf = React.createClass(CKR.react_key_map(com_name, {
    mount: function() {
      this.controller = new Sequencer_controller;
      this.controller.com = this;
      return this.controller.model = this.props.value;
    },
    props_change: function(new_props) {
      if (new_props.value !== this.props.value) {
        this.controller.model = new_props.value;
        return this.controller.refresh();
      }
    },
    render: function() {
      var size_x, size_y;
      size_x = this.props.width || this.props.size_x;
      size_y = this.props.height || this.props.size_y;
      return table({
        style: {
          width: "100%"
        }
      }, (function(_this) {
        return function() {
          return tbody(function() {
            tr(function() {
              return td(function() {
                return div({
                  style: {
                    display: _this.controller.show_help ? "" : "none"
                  }
                }, function() {
                  var _ref;
                  if ((_ref = _this.controller.scheme) != null ? _ref.active_scheme : void 0) {
                    return Keyboard_help_multi({
                      scheme: _this.controller.scheme.active_scheme
                    });
                  }
                });
              });
            });
            tr(function() {
              td({
                style: {
                  width: 250
                }
              }, function() {
                return Button({
                  label: _this.controller.play_state ? "Stop" : "Play",
                  on_click: function() {
                    return _this.controller.toggle_play();
                  }
                });
              });
              return td({
                style: {
                  color: "#777"
                }
              }, "If you focus timeline you can use some hotkeys. Focus and press F1 for help");
            });
            tr(function() {
              td("Speed");
              return td(Number_input({
                value: _this.controller.speed_scale,
                on_change: function(speed_scale) {
                  return _this.controller.speed_scale_set(speed_scale);
                }
              }));
            });
            tr(function() {
              td("Hide future");
              return td(Checkbox({
                value: _this.controller.mode_hide_future,
                on_change: function(mode_hide_future) {
                  _this.controller.mode_hide_future = mode_hide_future;
                  _this.controller.refresh();
                  return _this.force_update();
                }
              }));
            });
            tr(function() {
              td("Display tx_pow on timeline");
              return td(Checkbox({
                value: _this.controller.display_tx_pow,
                on_change: function(display_tx_pow) {
                  _this.controller.display_tx_pow = display_tx_pow;
                  _this.controller.refresh();
                  return _this.force_update();
                }
              }));
            });
            tr(function() {
              td("Display block");
              return td(Checkbox({
                value: _this.controller.display_block,
                on_change: function(display_block) {
                  _this.controller.display_block = display_block;
                  _this.controller.refresh();
                  return _this.force_update();
                }
              }));
            });
            tr(function() {
              td("Display block tx_pow усики");
              return td(Checkbox({
                value: _this.controller.display_tx_pow_src_lines,
                on_change: function(display_tx_pow_src_lines) {
                  _this.controller.display_tx_pow_src_lines = display_tx_pow_src_lines;
                  _this.controller.refresh();
                  return _this.force_update();
                }
              }));
            });
            return tr(function() {
              return td({
                colSpan: 2
              }, function() {
                return Canvas_multi({
                  width: size_x,
                  height: size_y,
                  layer_list: ["panel_fg"],
                  resize_fix: true,
                  canvas_cb: function(canvas_hash) {
                    var _ref;
                    return (_ref = _this.controller) != null ? _ref.canvas_controller(canvas_hash) : void 0;
                  },
                  gui: _this.controller,
                  textarea: _this.props.textarea,
                  ref_textarea: function($textarea) {
                    var _ref, _ref1;
                    if (_this.$textarea !== $textarea) {
                      _this.$textarea = $textarea;
                      _this.force_update();
                    }
                    if ((_ref = _this.controller) != null) {
                      _ref.$textarea = $textarea;
                    }
                    return (_ref1 = _this.controller) != null ? _ref1.init() : void 0;
                  }
                });
              });
            });
          });
        };
      })(this));
    }
  }));

  define_com("Sequencer_panel", conf);

}).call(this);
