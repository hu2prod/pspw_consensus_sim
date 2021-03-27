(function() {
  this.Sequencer_controller = (function() {
    function Sequencer_controller() {}

    Sequencer_controller.prototype.com = null;

    Sequencer_controller.prototype.model = null;

    Sequencer_controller.prototype.$canvas_panel_fg = null;

    Sequencer_controller.prototype.$textarea = null;

    Sequencer_controller.prototype.scheme = null;

    Sequencer_controller.prototype.node_color_list = [];

    Sequencer_controller.prototype.play_state = false;

    Sequencer_controller.prototype.canvas_controller = function(canvas_hash) {
      var $canvas_panel_fg;
      if (canvas_hash.panel_fg) {
        if (!(this.$canvas_panel_fg = $canvas_panel_fg = canvas_hash.panel_fg)) {
          return;
        }
        this.redraw_panel_fg();
      }
    };

    Sequencer_controller.prototype.init = function() {
      var fn;
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
      return this.scheme.active_scheme.register("home", fn, {
        description: "Go to start of video"
      });
    };

    Sequencer_controller.prototype["delete"] = function() {
      global_mouse_up.off("mouse_up", this.global_mouse_up_handler);
      return clearInterval(this._animation_interval);
    };

    Sequencer_controller.prototype.has_redraw_changes_panel_fg = true;

    Sequencer_controller.prototype.left_panel_size_x = 1;

    Sequencer_controller.prototype.size_x = 1;

    Sequencer_controller.prototype.redraw_panel_fg = function() {
      var bar_pad, canvas, ctx, delimiter_y, display_size_x, ed_ts, event, filter_a_ts, filter_b_ts, font_size_x, font_size_y, idx, left_panel_size_x, left_panel_text_x, node, node_icon_count, node_icon_offset_top, node_icon_pad, node_icon_pad_left, node_icon_size, node_state, node_state_list, pad, pattern_bar_size_y, pow_blink_duration, pow_type_color, pow_type_color_disabled, ruler_pad, size_x, size_y, text_offset_top, ts, type_idx, x, y, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _o, _p, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
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
      ts = this.model.ts;
      pow_type_color = ["#00FFFF", "#0094FF", "#0026FF", "#B200FF"];
      pattern_bar_size_y = 20;
      pad = 4;
      node_icon_count = pow_type_color.length;
      node_icon_size = 16;
      node_icon_pad = 2;
      node_icon_pad_left = 4;
      node_icon_offset_top = 3;
      text_offset_top = -3;
      bar_pad = 8;
      ruler_pad = 20;
      this.left_panel_size_x = left_panel_size_x = 300;
      font_size_y = pattern_bar_size_y - pad;
      font_size_x = font_size_y / 1.8;
      left_panel_text_x = (node_icon_count + 1) * (node_icon_size + node_icon_pad) + node_icon_pad_left;
      pow_type_color_disabled = "#AAAAAA";
      node_state_list = [];
      pow_blink_duration = 1000;
      filter_a_ts = ts - 1000;
      filter_b_ts = ts;
      _ref = this.model.node_list;
      for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
        node = _ref[idx];
        node_state_list.push(node_state = {
          pow_icon_opacity: [0, 0, 0, 0]
        });
        _ref1 = node.event_list;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          event = _ref1[_j];
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
      ctx.fillStyle = "rgba(250,250,255,0.9)";
      ctx.strokeStyle = "#000";
      ctx.fillRect(0.5 + 1, 0.5 + 1, left_panel_size_x - 1, size_y - 2);
      ctx.strokeRect(0.5 + 0, 0.5 + 0, left_panel_size_x - 2, size_y - 1);
      _ref2 = this.model.node_list;
      for (idx = _k = 0, _len2 = _ref2.length; _k < _len2; idx = ++_k) {
        node = _ref2[idx];
        node_state = node_state_list[idx];
        y = 0.5 + idx * pattern_bar_size_y + node_icon_offset_top;
        ctx.globalAlpha = 1;
        for (type_idx = _l = 0, _ref3 = pow_type_color.length; 0 <= _ref3 ? _l < _ref3 : _l > _ref3; type_idx = 0 <= _ref3 ? ++_l : --_l) {
          ctx.fillStyle = pow_type_color_disabled;
          x = type_idx * (node_icon_size + node_icon_pad) + node_icon_pad_left;
          ctx.fillRect(x, y, node_icon_size, node_icon_size);
        }
        for (type_idx = _m = 0, _ref4 = pow_type_color.length; 0 <= _ref4 ? _m < _ref4 : _m > _ref4; type_idx = 0 <= _ref4 ? ++_m : --_m) {
          ctx.globalAlpha = node_state.pow_icon_opacity[type_idx];
          ctx.fillStyle = pow_type_color[type_idx];
          x = type_idx * (node_icon_size + node_icon_pad) + node_icon_pad_left;
          ctx.fillRect(x, y, node_icon_size, node_icon_size);
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = distinct_color_list[idx];
        x = pow_type_color.length * (node_icon_size + node_icon_pad) + node_icon_pad_left;
        ctx.fillRect(x, y, node_icon_size, node_icon_size);
      }
      ctx.fillStyle = "#000";
      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.font = "" + font_size_y + "px monospace";
      ctx.globalAlpha = 1;
      _ref5 = this.model.node_list;
      for (idx = _n = 0, _len3 = _ref5.length; _n < _len3; idx = ++_n) {
        node = _ref5[idx];
        y = 0.5 + -1 + (idx + 1) * pattern_bar_size_y + text_offset_top;
        ctx.fillText(node.title, left_panel_text_x, y);
        delimiter_y = 4 + 0.5 + Math.round(y);
        ctx.beginPath();
        ctx.moveTo(0, delimiter_y);
        ctx.lineTo(size_x, delimiter_y);
        ctx.stroke();
        ctx.closePath();
      }
      _ref6 = this.model.node_list;
      for (idx = _o = 0, _len4 = _ref6.length; _o < _len4; idx = ++_o) {
        node = _ref6[idx];
        _ref7 = node.event_list;
        for (_p = 0, _len5 = _ref7.length; _p < _len5; _p++) {
          event = _ref7[_p];
          if (event.ts > filter_b_ts) {
            break;
          }
          if (event.type !== "tx_pow_mine") {
            continue;
          }
        }
      }
      display_size_x = size_x - left_panel_size_x;
      x = left_panel_size_x + (ts / this.model.ts_max) * display_size_x;
      x = 0.5 + Math.round(x);
      ctx.strokeStyle = "#000";
      ctx.beginPath();
      ctx.moveTo(x, 0.5 + 0);
      ctx.lineTo(x, 0.5 - 1 + size_y);
      ctx.stroke();
      x = size_x - pad;
      y = font_size_y;
      ctx.textAlign = "right";
      ctx.fillText("" + ((ts / 1000).toFixed(2)), x, y);
      ctx.textAlign = "left";
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
      this.redraw_panel_fg();
    };

    Sequencer_controller.prototype._is_mouse_down = false;

    Sequencer_controller.prototype.mouse_down = function(event, layer_name) {
      var x, y, _ref;
      _ref = rel_mouse_coords(event), x = _ref.x, y = _ref.y;
      switch (layer_name) {
        case "panel_fg":
          this._is_mouse_down = true;
          return this.seek(x);
      }
    };

    Sequencer_controller.prototype.mouse_up = function(event, layer_name) {
      return this._is_mouse_down = false;
    };

    Sequencer_controller.prototype.mouse_move = function(event, layer_name) {
      var x, y, _ref;
      _ref = rel_mouse_coords(event), x = _ref.x, y = _ref.y;
      if (this._is_mouse_down) {
        this.seek(x);
      }
    };

    Sequencer_controller.prototype.key_down = function(event) {
      return this.scheme.keypressed(event.nativeEvent);
    };

    Sequencer_controller.prototype._animation_interval = null;

    Sequencer_controller.prototype.start_ts = 0;

    Sequencer_controller.prototype.play = function() {
      this.play_state = true;
      this.com.force_update();
      if (this.model.ts === this.model.ts_max) {
        this.start_ts = Date.now();
      } else {
        this.start_ts = Date.now() - this.model.ts;
      }
      return this._animation_interval = setInterval((function(_this) {
        return function() {
          var ts;
          ts = Date.now() - _this.start_ts;
          if (ts >= _this.model.ts_max) {
            ts = _this.model.ts_max;
            _this.stop();
          }
          _this.model.ts = ts;
          return _this.refresh();
        };
      })(this), 10);
    };

    Sequencer_controller.prototype.stop = function() {
      this.play_state = false;
      this.com.force_update();
      return clearInterval(this._animation_interval);
    };

    Sequencer_controller.prototype.toggle_play = function() {
      if (this.play_state) {
        return this.stop();
      } else {
        return this.play();
      }
    };

    Sequencer_controller.prototype.seek = function(x) {
      var display_size_x, left_panel_size_x, size_x, t, ts;
      size_x = this.size_x, left_panel_size_x = this.left_panel_size_x;
      display_size_x = size_x - left_panel_size_x;
      t = (x - left_panel_size_x) / display_size_x;
      t = Math.max(0, t);
      t = Math.min(1, t);
      ts = t * this.model.ts_max;
      this.model.ts = ts;
      return this.refresh();
    };

    return Sequencer_controller;

  })();

}).call(this);
