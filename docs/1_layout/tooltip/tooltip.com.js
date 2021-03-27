(function() {
  var com_name, conf, default_mount_point_x, default_mount_point_y, default_position_x, default_position_y;

  com_name = "Tooltip";

  default_mount_point_x = "center";

  default_position_x = "center";

  default_mount_point_y = "top";

  default_position_y = "bottom";

  conf = React.createClass(CKR.react_key_map(com_name, {
    state: {
      c_hover: false,
      tc_hover: false
    },
    c_hover: false,
    tc_hover: false,
    render: function() {
      var hide_lag, show_lag;
      show_lag = this.props.show_lag || 0;
      hide_lag = this.props.hide_lag || 100;
      return div({
        style: Object.assign({
          display: "inline-block"
        }, this.props.style)
      }, (function(_this) {
        return function() {
          var container, offset_x, offset_y, opacity, show, tooltip_container;
          div({
            ref: "container",
            style: {
              display: "inline-block"
            },
            on_hover: function() {
              if (_this.props.show != null) {
                return;
              }
              _this.c_hover = true;
              return setTimeout(function() {
                return _this.set_state({
                  c_hover: _this.c_hover
                });
              }, show_lag);
            },
            on_mouse_out: function() {
              if (_this.props.show != null) {
                return;
              }
              _this.c_hover = false;
              return setTimeout(function() {
                return _this.set_state({
                  c_hover: _this.c_hover
                });
              }, hide_lag);
            }
          }, _this.props.children);
          if (_this.props.show != null) {
            show = _this.props.show;
          } else {
            show = _this.state.c_hover || _this.state.tc_hover;
          }
          if (show) {
            opacity = 1;
            if (_this.refs.container) {
              container = _this.refs.container.getBoundingClientRect();
            } else {
              opacity = 0;
              container = {
                width: 0,
                height: 0
              };
            }
            if (_this.refs.tooltip_container) {
              tooltip_container = _this.refs.tooltip_container.getBoundingClientRect();
            } else {
              opacity = 0;
              tooltip_container = {
                width: 0,
                height: 0
              };
              setTimeout(function() {
                return _this.force_update();
              });
            }
            offset_x = 0;
            offset_y = 0;
            switch (_this.props.mount_point_x || default_mount_point_x) {
              case "center":
              case "middle":
                offset_x += container.width / 2;
                break;
              case "right":
                offset_x += container.width;
            }
            switch (_this.props.position_x || default_position_x) {
              case "left":
                offset_x -= tooltip_container.width;
                break;
              case "center":
              case "middle":
                offset_x -= tooltip_container.width / 2;
            }
            switch (_this.props.mount_point_y || default_mount_point_y) {
              case "top":
                offset_y -= container.height;
                break;
              case "center":
              case "middle":
                offset_y -= container.height / 2;
            }
            switch (_this.props.position_y || default_position_y) {
              case "top":
                offset_y -= 0;
                break;
              case "center":
              case "middle":
                offset_y -= tooltip_container.height / 2;
                break;
              case "bottom":
                offset_y -= tooltip_container.height;
            }
            return div({
              style: {
                position: "relative",
                left: offset_x,
                top: offset_y,
                opacity: opacity
              }
            }, function() {
              return div({
                ref: "tooltip_container",
                style: {
                  position: "absolute"
                },
                on_hover: function() {
                  if (_this.props.show != null) {
                    return;
                  }
                  _this.tc_hover = true;
                  return setTimeout(function() {
                    return _this.set_state({
                      tc_hover: _this.tc_hover
                    });
                  }, show_lag);
                },
                on_mouse_out: function() {
                  if (_this.props.show != null) {
                    return;
                  }
                  _this.tc_hover = false;
                  return setTimeout(function() {
                    return _this.set_state({
                      tc_hover: _this.tc_hover
                    });
                  }, hide_lag);
                }
              }, function() {
                return _this.props.tooltip_render();
              });
            });
          }
        };
      })(this));
    }
  }));

  define_com("Tooltip", conf);

}).call(this);
