(function() {
  var com_name, conf, remap_hash;

  com_name = "Keyboard_help";

  remap_hash = {
    pageup: "pgup",
    pagedown: "pgdn",
    "num_/": "/",
    "num_*": "*",
    "num_-": "-",
    "num_+": "+",
    "num_.": ".",
    num_0: "0",
    num_1: "1",
    num_2: "2",
    num_3: "3",
    num_4: "4",
    num_5: "5",
    num_6: "6",
    num_7: "7",
    num_8: "8",
    num_9: "9",
    capslock: "caps lock",
    numlock: "num",
    up: "^",
    win_left: "win",
    win_right: "win",
    left: "<",
    down: "V",
    right: ">"
  };

  conf = React.createClass(CKR.react_key_map(com_name, {
    render: function() {
      return ul({
        "class": "__keyboard"
      }, (function(_this) {
        return function() {
          var ch, ch_render, i, letter_skip_render, spacer_render, str_norm, tooltip_hash, v, val, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _len7, _len8, _len9, _m, _n, _o, _p, _q, _r, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _s;
          tooltip_hash = _this.props.tooltip_hash || {};
          ch_render = function(ch, _class, li_style, tt_style, selected) {
            var remap_ch, view_text, _ref;
            if (_class == null) {
              _class = "letter";
            }
            if (li_style == null) {
              li_style = {};
            }
            if (tt_style == null) {
              tt_style = {};
            }
            if (selected == null) {
              selected = false;
            }
            remap_ch = remap_hash[ch] || ch;
            view_text = (_ref = tooltip_hash[ch]) != null ? _ref : tooltip_hash[remap_ch];
            return Tooltip({
              style: tt_style,
              show_lag: 100,
              hide_lag: 0,
              tooltip_render: function() {
                if (!view_text) {
                  return;
                }
                return div({
                  "class": "keyboard_tooltip"
                }, function() {
                  div({
                    "class": "keyboard_tooltip-arrow"
                  });
                  return div({
                    "class": "keyboard_tooltip-inner"
                  }, view_text);
                });
              }
            }, function() {
              return li({
                "class": "" + _class + " " + (selected || view_text ? 'selected' : ''),
                style: li_style
              }, remap_ch);
            });
          };
          spacer_render = function() {
            return div({
              style: {
                display: "inline-block"
              }
            }, li({
              "class": "pad"
            }));
          };
          letter_skip_render = function() {
            return div({
              style: {
                display: "inline-block"
              }
            }, li({
              "class": "letter_pad"
            }));
          };
          ch_render("esc");
          for (i = _i = 1; _i <= 12; i = ++_i) {
            ch_render("f" + i);
          }
          br(function() {});
          str_norm = "`1234567890-=";
          for (_j = 0, _len = str_norm.length; _j < _len; _j++) {
            v = str_norm[_j];
            ch_render(v);
          }
          ch_render("backspace", "backspace");
          spacer_render();
          _ref = ["insert", "home", "pageup"];
          for (_k = 0, _len1 = _ref.length; _k < _len1; _k++) {
            val = _ref[_k];
            ch_render(val);
          }
          spacer_render();
          _ref1 = ["numlock", "num_/", "num_*", "num_-"];
          for (_l = 0, _len2 = _ref1.length; _l < _len2; _l++) {
            val = _ref1[_l];
            ch_render(val);
          }
          ch_render("tab", "tab");
          str_norm = "qwertyuiop[]\\";
          for (_m = 0, _len3 = str_norm.length; _m < _len3; _m++) {
            ch = str_norm[_m];
            ch_render(ch);
          }
          spacer_render();
          _ref2 = ["delete", "end", "pagedown"];
          for (_n = 0, _len4 = _ref2.length; _n < _len4; _n++) {
            val = _ref2[_n];
            ch_render(val);
          }
          spacer_render();
          _ref3 = "789";
          for (_o = 0, _len5 = _ref3.length; _o < _len5; _o++) {
            val = _ref3[_o];
            ch_render("num_" + val);
          }
          ch_render("num_+", "letter num_key", {
            height: 88
          }, {
            position: "absolute"
          });
          ch_render("capslock", "capslock");
          str_norm = "asdfghjkl;'";
          for (_p = 0, _len6 = str_norm.length; _p < _len6; _p++) {
            ch = str_norm[_p];
            ch_render(ch);
          }
          ch_render("enter", "enter");
          spacer_render();
          letter_skip_render();
          letter_skip_render();
          letter_skip_render();
          spacer_render();
          _ref4 = "456";
          for (_q = 0, _len7 = _ref4.length; _q < _len7; _q++) {
            val = _ref4[_q];
            ch_render("num_" + val);
          }
          ch_render("shift", "left-shift", {}, {}, _this.props.shift);
          str_norm = "zxcvbnm,./";
          for (_r = 0, _len8 = str_norm.length; _r < _len8; _r++) {
            ch = str_norm[_r];
            ch_render(ch);
          }
          ch_render("shift", "right-shift", {}, {}, _this.props.shift);
          spacer_render();
          letter_skip_render();
          ch_render("up", "letter", {
            fontSize: 25
          });
          letter_skip_render();
          spacer_render();
          _ref5 = "123";
          for (_s = 0, _len9 = _ref5.length; _s < _len9; _s++) {
            val = _ref5[_s];
            ch_render("num_" + val);
          }
          ch_render("enter", "letter num_key", {
            height: 88
          }, {
            position: "absolute"
          });
          ch_render("ctrl", "left-ctrl", null, null, _this.props.ctrl);
          ch_render("win_left");
          ch_render("alt", null, null, null, _this.props.alt);
          ch_render("space", "space");
          ch_render("alt", null, null, null, _this.props.alt);
          ch_render("win_right");
          ch_render("list");
          ch_render("ctrl", "right-ctrl", null, null, _this.props.ctrl);
          spacer_render();
          ch_render("left", "letter", {
            fontWeight: 700
          });
          ch_render("down", "letter", {
            fontWeight: 700
          });
          ch_render("right", "letter", {
            fontWeight: 700
          });
          spacer_render();
          ch_render("num_0", "letter2");
          return ch_render("num_.");
        };
      })(this));
    }
  }));

  define_com("Keyboard_help", conf);

}).call(this);
