(function() {
  var __iced_k, __iced_k_noop;

  __iced_k = __iced_k_noop = function() {};

  this.Sequencer_controller = (function() {
    function Sequencer_controller() {}

    Sequencer_controller.prototype.com = null;

    Sequencer_controller.prototype.model = null;

    Sequencer_controller.prototype.$canvas_panel_fg = null;

    Sequencer_controller.prototype.$textarea = null;

    Sequencer_controller.prototype.scheme = null;

    Sequencer_controller.prototype.node_color_list = [];

    Sequencer_controller.prototype.play_state = false;

    Sequencer_controller.prototype.mode_hide_future = false;

    Sequencer_controller.prototype.display_block = true;

    Sequencer_controller.prototype.display_tx_pow = true;

    Sequencer_controller.prototype.display_tx_pow_src_lines = true;

    Sequencer_controller.prototype.speed_scale = 100;

    Sequencer_controller.prototype.show_help = false;

    Sequencer_controller.prototype.autotrack = false;

    Sequencer_controller.prototype.speed_step = 0.1;

    Sequencer_controller.prototype.zoom = 1;

    Sequencer_controller.prototype.offset_x = 0;

    Sequencer_controller.prototype.zoom_mult_wheel = 1.2;

    Sequencer_controller.prototype.zoom_mult_keyb = 1.2;

    Sequencer_controller.prototype.canvas_controller = function(canvas_hash) {
      var $canvas_panel_fg;
      if (canvas_hash.panel_fg) {
        if (!(this.$canvas_panel_fg = $canvas_panel_fg = canvas_hash.panel_fg)) {
          return;
        }
        this.redraw_panel_fg();
      }
    };

    Sequencer_controller.prototype.animation_loop = true;

    Sequencer_controller.prototype.init = function() {
      var fn, rel_speed, rel_ts;
      global_mouse_up.on("mouse_up", this.global_mouse_up_handler = (function(_this) {
        return function(e) {
          return _this.mouse_up(e);
        };
      })(this));
      this.scheme = new Keyboard_switchable_scheme;
      this.scheme.active_scheme.register("space", ((function(_this) {
        return function() {
          return _this.toggle_play();
        };
      })(this)), {
        description: "toggle play"
      });
      fn = (function(_this) {
        return function() {
          _this.model.ts = 0;
          return _this.refresh();
        };
      })(this);
      this.scheme.active_scheme.register("home", fn, {
        description: "Go to start"
      });
      fn = (function(_this) {
        return function() {
          _this.show_help = !_this.show_help;
          return _this.com.force_update();
        };
      })(this);
      this.scheme.active_scheme.register("f1", fn, {
        description: "toggle help"
      });
      rel_speed = (function(_this) {
        return function(step) {
          var new_speed;
          new_speed = +(_this.speed_scale + step).toFixed(2);
          if (new_speed > 0) {
            return _this.speed_scale_set(new_speed);
          }
        };
      })(this);
      this.scheme.active_scheme.register("num_plus", ((function(_this) {
        return function() {
          return rel_speed(+_this.speed_step);
        };
      })(this)), {
        description: "increase speed"
      });
      this.scheme.active_scheme.register("num_minus", ((function(_this) {
        return function() {
          return rel_speed(-_this.speed_step);
        };
      })(this)), {
        description: "decrease speed"
      });
      rel_ts = (function(_this) {
        return function(diff) {
          _this.ts_set(_this.model.ts + diff);
          return _this.refresh();
        };
      })(this);
      this.scheme.active_scheme.register("left", ((function(_this) {
        return function() {
          return rel_ts(-60000);
        };
      })(this)), {
        description: "-1 min"
      });
      this.scheme.active_scheme.register("right", ((function(_this) {
        return function() {
          return rel_ts(+60000);
        };
      })(this)), {
        description: "+1 min"
      });
      this.scheme.active_scheme.register("comma", ((function(_this) {
        return function() {
          return rel_ts(-1000);
        };
      })(this)), {
        description: "-1 sec"
      });
      this.scheme.active_scheme.register("dot", ((function(_this) {
        return function() {
          return rel_ts(+1000);
        };
      })(this)), {
        description: "+1 sec"
      });
      return (function(_this) {
        return function() {
          var err, ___iced_passed_deferral, __iced_deferrals, __iced_k;
          __iced_k = __iced_k_noop;
          ___iced_passed_deferral = iced.findDeferral(arguments);
          (function(__iced_k) {
            var _while;
            _while = function(__iced_k) {
              var _break, _continue, _next;
              _break = __iced_k;
              _continue = function() {
                return iced.trampoline(function() {
                  return _while(__iced_k);
                });
              };
              _next = _continue;
              if (!_this.animation_loop) {
                return _break();
              } else {
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral
                  });
                  requestAnimationFrame(__iced_deferrals.defer({
                    lineno: 72
                  }));
                  __iced_deferrals._fulfill();
                })(function() {
                  try {
                    _this.redraw_panel_fg();
                  } catch (_error) {
                    err = _error;
                    perr(err);
                  }
                  return _next();
                });
              }
            };
            _while(__iced_k);
          })(function() {});
        };
      })(this)();
    };

    Sequencer_controller.prototype["delete"] = function() {
      this.animation_loop = false;
      global_mouse_up.off("mouse_up", this.global_mouse_up_handler);
      return clearInterval(this._animation_interval);
    };

    Sequencer_controller.prototype.has_redraw_changes_panel_fg = true;

    Sequencer_controller.prototype.left_panel_size_x = 1;

    Sequencer_controller.prototype.size_x = 1;

    Sequencer_controller.prototype.redraw_panel_fg = function() {
      var bar_pad, base_y, block_color, block_drop_color, block_drop_ts, block_size_x, canvas, ctx, delimiter_ts, delimiter_y, display_size_x, ed_ts, event, event_idx, filter_a_ts, filter_b_ts, font_size_x, font_size_y, future_event, future_event_idx, idx, left_panel_size_x, left_panel_text_x, node, node_bar_size_y, node_icon2_offset_left, node_icon2_offset_top, node_icon2_pad, node_icon2_size_x, node_icon2_size_x_2, node_icon2_size_y, node_icon2_size_y_2, node_icon_count, node_icon_offset_top, node_icon_pad, node_icon_pad_left, node_icon_size, node_icon_size_timeline, node_idx, node_state, node_state_list, offset_x, pad, pow_blink_duration, pow_type_color, pow_type_color_disabled, round_id, ruler_pad, size_x, size_y, t, text_offset_top, this_node_icon_count, time_str, ts, ts_max, tx_pow, type_idx, x, x_a, x_b, y, y_a, y_b, zoom, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _len7, _len8, _len9, _m, _n, _o, _p, _q, _r, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _s, _t, _u;
      if (!this.has_redraw_changes_panel_fg) {
        return;
      }
      this.has_redraw_changes_panel_fg = false;
      if (!this.$canvas_panel_fg) {
        return;
      }
      canvas = this.$canvas_panel_fg;
      ctx = canvas.getContext("2d");
      size_x = canvas.width = canvas.width;
      size_y = canvas.height = canvas.height;
      this.size_x = size_x;
      ctx.strokeStyle = "#000";
      ctx.strokeRect(0.5, 0.5, 0.5 - 1 + size_x, 0.5 - 1 + size_y);
      if (!this.model) {
        return;
      }
      _ref = this.model, ts = _ref.ts, ts_max = _ref.ts_max;
      offset_x = this.offset_x, zoom = this.zoom;
      block_color = "#AAFFAA";
      block_drop_color = "#AAAAAA";
      pow_type_color = ["#00FFFF", "#0094FF", "#0026FF", "#B200FF"];
      node_bar_size_y = 20;
      pad = 4;
      node_icon_count = pow_type_color.length;
      node_icon_size = 16;
      node_icon_size_timeline = Math.max(1, 0.01 * zoom);
      node_icon_pad = 2;
      node_icon_pad_left = 3;
      node_icon_offset_top = 3;
      node_icon2_size_x = 10;
      node_icon2_size_y = 10;
      node_icon2_pad = 4;
      node_icon2_offset_left = 3;
      node_icon2_offset_top = 3;
      text_offset_top = -3;
      bar_pad = 8;
      ruler_pad = 20;
      this.left_panel_size_x = left_panel_size_x = 300;
      node_icon2_size_x_2 = node_icon2_size_x / 2;
      node_icon2_size_y_2 = node_icon2_size_y / 2;
      font_size_y = node_bar_size_y - pad;
      font_size_x = font_size_y / 1.8;
      left_panel_text_x = (node_icon_count + 1) * (node_icon_size + node_icon_pad) + node_icon_pad_left;
      display_size_x = size_x - left_panel_size_x;
      pow_type_color_disabled = "#AAAAAA";
      node_state_list = [];
      pow_blink_duration = 1000 * this.speed_scale;
      filter_a_ts = ts - 1000 * this.speed_scale;
      filter_b_ts = ts;
      _ref1 = this.model.node_list;
      for (idx = _i = 0, _len = _ref1.length; _i < _len; idx = ++_i) {
        node = _ref1[idx];
        node_state_list.push(node_state = {
          pow_icon_opacity: [0, 0, 0, 0]
        });
        _ref2 = node.event_list;
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          event = _ref2[_j];
          if (event.ts < filter_a_ts) {
            continue;
          }
          if (event.ts > filter_b_ts) {
            break;
          }
          switch (event.type) {
            case "tx_pow_mine":
              ed_ts = Math.max(0, pow_blink_duration + event.ts - ts);
              node_state.pow_icon_opacity[event.tx_pow_type] = ed_ts / pow_blink_duration;
          }
        }
        node_state;
      }
      if (this.display_tx_pow) {
        _ref3 = this.model.node_list;
        for (node_idx = _k = 0, _len2 = _ref3.length; _k < _len2; node_idx = ++_k) {
          node = _ref3[node_idx];
          y = 0.5 + (node_idx + 1) * node_bar_size_y + node_icon_offset_top;
          _ref4 = node.event_list;
          for (_l = 0, _len3 = _ref4.length; _l < _len3; _l++) {
            event = _ref4[_l];
            if (this.mode_hide_future) {
              if (event.ts > filter_b_ts) {
                break;
              }
            }
            if (event.type !== "tx_pow_mine") {
              continue;
            }
            t = event.ts / ts_max;
            x = display_size_x * t;
            x = 0.5 + left_panel_size_x + x * zoom + offset_x;
            ctx.fillStyle = pow_type_color[event.tx_pow_type];
            ctx.fillRect(x, y, node_icon_size_timeline, node_icon_size);
          }
        }
      }
      if (this.display_block) {
        _ref5 = this.model.node_list;
        for (node_idx = _m = 0, _len4 = _ref5.length; _m < _len4; node_idx = ++_m) {
          node = _ref5[node_idx];
          base_y = 0.5 + (node_idx + 1) * node_bar_size_y + node_icon_offset_top;
          _ref6 = node.event_list;
          for (event_idx = _n = 0, _len5 = _ref6.length; _n < _len5; event_idx = ++_n) {
            event = _ref6[event_idx];
            if (this.mode_hide_future) {
              if (event.ts > filter_b_ts) {
                break;
              }
            }
            if (event.type !== "block") {
              continue;
            }
            y = base_y;
            block_drop_ts = null;
            for (future_event_idx = _o = _ref7 = event_idx + 1, _ref8 = node.event_list.length; _o < _ref8; future_event_idx = _o += 1) {
              future_event = node.event_list[future_event_idx];
              if (future_event.type === "block") {
                break;
              }
              if (future_event.type === "block_drop") {
                if (future_event.ts < filter_b_ts) {
                  block_drop_ts = future_event.ts;
                }
              }
            }
            t = event.ts / ts_max;
            x = display_size_x * t;
            x = 0.5 + left_panel_size_x + x * zoom + offset_x;
            ctx.fillStyle = block_drop_ts != null ? block_drop_color : block_color;
            this_node_icon_count = Math.max(1, event.tx_pow_list.length);
            block_size_x = this_node_icon_count * (node_icon2_size_x + node_icon2_pad) + 3;
            ctx.strokeStyle = "#000";
            ctx.fillRect(x, y, block_size_x, node_icon_size);
            ctx.strokeRect(x, y, block_size_x, node_icon_size);
            x += node_icon2_offset_left;
            y += node_icon2_offset_top;
            _ref9 = event.tx_pow_list;
            for (_p = 0, _len6 = _ref9.length; _p < _len6; _p++) {
              tx_pow = _ref9[_p];
              if (this.display_tx_pow_src_lines && tx_pow.source_idx !== node_idx) {
                ctx.beginPath();
                ctx.moveTo(x + node_icon2_size_x_2, y + node_icon2_size_y_2);
                ctx.lineTo(x + node_icon2_size_x_2, y + (node_bar_size_y * (tx_pow.source_idx - node_idx)));
                ctx.stroke();
                ctx.closePath();
              }
              ctx.fillStyle = pow_type_color[tx_pow.tx_pow_type];
              ctx.fillRect(x, y, node_icon2_size_x, node_icon2_size_y);
              ctx.strokeRect(x, y, node_icon2_size_x, node_icon2_size_y);
              x += node_icon2_size_x + node_icon2_pad;
            }
            if (block_drop_ts) {
              t = block_drop_ts / ts_max;
              x = display_size_x * t;
              x = 0.5 + left_panel_size_x + x * zoom + offset_x;
              ctx.beginPath();
              x_a = x;
              y_a = y;
              x_b = x + node_icon2_size_y;
              y_b = y + node_icon2_size_y;
              ctx.moveTo(x_a, y_a);
              ctx.lineTo(x_b, y_b);
              ctx.moveTo(x_a, y_b);
              ctx.lineTo(x_b, y_a);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      }
      ctx.textAlign = "right";
      round_id = 0;
      _ref10 = this.model.round_delimiter_ts_list;
      for (idx = _q = 0, _len7 = _ref10.length; _q < _len7; idx = ++_q) {
        delimiter_ts = _ref10[idx];
        if (delimiter_ts < ts) {
          round_id++;
        }
        x = (delimiter_ts / ts_max) * display_size_x;
        x = 0.5 + left_panel_size_x + Math.round(x * zoom + offset_x);
        ctx.strokeStyle = "#F00";
        ctx.beginPath();
        ctx.moveTo(x, 0.5 + 0);
        ctx.lineTo(x, 0.5 - 1 + size_y);
        ctx.stroke();
        y = 0.5 + font_size_y;
        ctx.fillStyle = "#F00";
        ctx.fillText("round \#" + (idx + 1) + " ", x, y);
      }
      ctx.fillStyle = "rgba(250,250,255,0.9)";
      ctx.strokeStyle = "#000";
      ctx.fillRect(0.5 + 1, 0.5 + 1, left_panel_size_x - 1, size_y - 2);
      ctx.strokeRect(0.5 + 0, 0.5 + 0, left_panel_size_x - 2, size_y - 1);
      ctx.textAlign = "left";
      _ref11 = this.model.node_list;
      for (node_idx = _r = 0, _len8 = _ref11.length; _r < _len8; node_idx = ++_r) {
        node = _ref11[node_idx];
        node_state = node_state_list[node_idx];
        y = 0.5 + (node_idx + 1) * node_bar_size_y + node_icon_offset_top;
        ctx.globalAlpha = 1;
        for (type_idx = _s = 0, _ref12 = pow_type_color.length; 0 <= _ref12 ? _s < _ref12 : _s > _ref12; type_idx = 0 <= _ref12 ? ++_s : --_s) {
          ctx.fillStyle = pow_type_color_disabled;
          x = 0.5 + type_idx * (node_icon_size + node_icon_pad) + node_icon_pad_left;
          ctx.fillRect(x, y, node_icon_size, node_icon_size);
        }
        for (type_idx = _t = 0, _ref13 = pow_type_color.length; 0 <= _ref13 ? _t < _ref13 : _t > _ref13; type_idx = 0 <= _ref13 ? ++_t : --_t) {
          ctx.globalAlpha = node_state.pow_icon_opacity[type_idx];
          ctx.fillStyle = pow_type_color[type_idx];
          x = 0.5 + type_idx * (node_icon_size + node_icon_pad) + node_icon_pad_left;
          ctx.fillRect(x, y, node_icon_size, node_icon_size);
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = distinct_color_list[node_idx];
        x = pow_type_color.length * (node_icon_size + node_icon_pad) + node_icon_pad_left;
        ctx.fillRect(x, y, node_icon_size, node_icon_size);
      }
      ctx.fillStyle = "#000";
      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.font = "" + font_size_y + "px monospace";
      ctx.globalAlpha = 1;
      _ref14 = this.model.node_list;
      for (node_idx = _u = 0, _len9 = _ref14.length; _u < _len9; node_idx = ++_u) {
        node = _ref14[node_idx];
        y = 0.5 + -1 + (node_idx + 2) * node_bar_size_y + text_offset_top;
        ctx.fillText(node.title, left_panel_text_x, y);
        delimiter_y = 4 + 0.5 + Math.round(y);
        ctx.beginPath();
        ctx.moveTo(0, delimiter_y);
        ctx.lineTo(size_x, delimiter_y);
        ctx.stroke();
        ctx.closePath();
      }
      y = 0.5 + -1 + 1 * node_bar_size_y + text_offset_top;
      delimiter_y = 4 + 0.5 + Math.round(y);
      ctx.beginPath();
      ctx.moveTo(0, delimiter_y);
      ctx.lineTo(size_x, delimiter_y);
      ctx.stroke();
      ctx.closePath();
      x = (ts / ts_max) * display_size_x;
      x = 0.5 + left_panel_size_x + Math.round(x * zoom + offset_x);
      ctx.strokeStyle = "#000";
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.moveTo(x, 0.5 + 0);
      ctx.lineTo(x, 0.5 - 1 + size_y);
      ctx.stroke();
      x = 0.5 + size_x - pad;
      y = 0.5 + font_size_y;
      ts = Math.round(ts);
      time_str = tsd_fmt(ts, "hh:MM:SS.ms");
      ctx.textAlign = "right";
      ctx.fillText("round \#" + (round_id + 1) + " " + time_str, x, y);
    };

    Sequencer_controller.prototype.refresh = function(layer_name) {
      if (layer_name == null) {
        layer_name = "all";
      }
      switch (layer_name) {
        case "panel_fg":
          this.has_redraw_changes_panel_fg = true;
          break;
        case "all":
          this.has_redraw_changes_panel_fg = true;
      }
    };

    Sequencer_controller.prototype._mouse_mode = "none";

    Sequencer_controller.prototype.mouse_down = function(event, layer_name) {
      var gx, gy, mx, my, _ref, _ref1;
      _ref = rel_mouse_coords(event), mx = _ref.x, my = _ref.x;
      _ref1 = this.get_grid_coord(mx, my), gx = _ref1.x, gy = _ref1.y;
      switch (layer_name) {
        case "panel_fg":
          switch (event.nativeEvent.which) {
            case 1:
              this._mouse_mode = "seek";
              break;
            case 2:
              this._mouse_mode = "drag";
          }
          return this.seek(gx);
      }
    };

    Sequencer_controller.prototype.mouse_up = function(event, layer_name) {
      return this._mouse_mode = "none";
    };

    Sequencer_controller.prototype._last_mouse_event_x = 0;

    Sequencer_controller.prototype._last_mouse_event_y = 0;

    Sequencer_controller.prototype._last_grid_x = 0;

    Sequencer_controller.prototype._last_grid_y = 0;

    Sequencer_controller.prototype.mouse_move = function(event, layer_name) {
      var gx, gy, mx, my, _ref, _ref1;
      _ref = rel_mouse_coords(event), mx = _ref.x, my = _ref.y;
      _ref1 = this.get_grid_coord(mx, my), gx = _ref1.x, gy = _ref1.y;
      switch (this._mouse_mode) {
        case "seek":
          this.seek(gx);
          break;
        case "drag":
          this.offset_x += mx - this._last_mouse_event_x;
          this.refresh();
      }
      this._last_mouse_event_x = mx;
      this._last_mouse_event_y = my;
      this._last_grid_x = gx;
      this._last_grid_y = gy;
    };

    Sequencer_controller.prototype.mouse_wheel = function(e) {
      if (e.deltaY < 0) {
        this.zoom_adjust(this.zoom_mult_wheel);
      } else {
        this.zoom_adjust(1 / this.zoom_mult_wheel);
      }
    };

    Sequencer_controller.prototype.key_down = function(event) {
      return this.scheme.keypressed(event.nativeEvent);
    };

    Sequencer_controller.prototype._animation_interval = null;

    Sequencer_controller.prototype.start_ts = 0;

    Sequencer_controller.prototype.ts_set = function(ts) {
      ts = Math.round(ts);
      ts = Math.max(0, ts);
      ts = Math.min(this.model.ts_max, ts);
      this.model.ts = ts;
      return this.start_ts = Date.now() - this.model.ts / this.speed_scale;
    };

    Sequencer_controller.prototype.play = function() {
      if (this._animation_interval) {
        clearInterval(this._animation_interval);
      }
      this.play_state = true;
      this.com.force_update();
      if (this.model.ts === this.model.ts_max) {
        this.start_ts = Date.now();
      } else {
        this.ts_set(this.model.ts);
      }
      return this._animation_interval = setInterval((function(_this) {
        return function() {
          var display_size_x, ts, ts_to_px;
          ts = (Date.now() - _this.start_ts) * _this.speed_scale;
          if (ts >= _this.model.ts_max) {
            ts = _this.model.ts_max;
            _this.stop();
          }
          _this.model.ts = ts;
          if (_this.autotrack) {
            display_size_x = _this.size_x - _this.left_panel_size_x;
            ts_to_px = display_size_x / _this.model.ts_max;
            _this.offset_x = display_size_x / 2 - _this.zoom * ts * ts_to_px;
          }
          return _this.refresh();
        };
      })(this), 10);
    };

    Sequencer_controller.prototype.stop = function() {
      this.play_state = false;
      this.com.force_update();
      clearInterval(this._animation_interval);
      return this._animation_interval = null;
    };

    Sequencer_controller.prototype.toggle_play = function() {
      if (this.play_state) {
        return this.stop();
      } else {
        return this.play();
      }
    };

    Sequencer_controller.prototype.seek = function(gx) {
      var display_size_x, left_panel_size_x, size_x, t, ts;
      size_x = this.size_x, left_panel_size_x = this.left_panel_size_x;
      display_size_x = size_x - left_panel_size_x;
      t = (gx - this.offset_x / this.zoom) / display_size_x;
      t = Math.max(0, t);
      t = Math.min(1, t);
      ts = t * this.model.ts_max;
      this.ts_set(ts);
      return this.refresh();
    };

    Sequencer_controller.prototype.speed_scale_set = function(speed_scale) {
      this.speed_scale = speed_scale;
      this.ts_set(this.model.ts);
      return this.com.force_update();
    };

    Sequencer_controller.prototype.get_grid_coord = function(x, y) {
      var ret;
      if (x == null) {
        x = this._last_mouse_event_x;
      }
      if (y == null) {
        y = this._last_mouse_event_y;
      }
      return ret = {
        x: (x - this.left_panel_size_x) / this.zoom,
        y: y
      };
    };

    Sequencer_controller.prototype.zoom_in = function() {
      this.zoom_adjust(this.zoom_mult_keyb);
    };

    Sequencer_controller.prototype.zoom_out = function() {
      this.zoom_adjust(1 / this.zoom_mult_keyb);
    };

    Sequencer_controller.prototype.zoom_adjust = function(mult) {
      var gx_1;
      gx_1 = (this._last_mouse_event_x - this.left_panel_size_x - this.offset_x) / this.zoom;
      this.zoom *= mult;
      this.offset_x = this._last_mouse_event_x - this.left_panel_size_x - gx_1 * this.zoom;
      this.refresh();
    };

    return Sequencer_controller;

  })();

}).call(this);
