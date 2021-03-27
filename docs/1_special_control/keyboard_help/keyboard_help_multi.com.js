(function() {
  var com_name, conf;

  com_name = "Keyboard_help_multi";

  conf = React.createClass(CKR.react_key_map(com_name, {
    render: function() {
      return div({
        "class": "keyboard"
      }, (function(_this) {
        return function() {
          var alt, code, ctrl, list, shift, tooltip_hash, v, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
          _ref = [false, true];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ctrl = _ref[_i];
            _ref1 = [false, true];
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              shift = _ref1[_j];
              _ref2 = [false, true];
              for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                alt = _ref2[_k];
                tooltip_hash = {};
                _ref3 = _this.props.scheme.code_map;
                for (code in _ref3) {
                  list = _ref3[code];
                  for (_l = 0, _len3 = list.length; _l < _len3; _l++) {
                    v = list[_l];
                    if ((v.ctrl || v.opt_ctrl) !== ctrl) {
                      continue;
                    }
                    if ((v.alt || v.opt_alt) !== alt) {
                      continue;
                    }
                    if ((v.shift || v.opt_shift) !== shift) {
                      continue;
                    }
                    tooltip_hash[Keymap.rev_map[code]] = v.description;
                  }
                }
                if (0 === h_count(tooltip_hash)) {
                  continue;
                }
                div({
                  "class": "keyboard_mod"
                }, function() {
                  return Keyboard_help({
                    tooltip_hash: tooltip_hash,
                    ctrl: ctrl,
                    shift: shift,
                    alt: alt
                  });
                });
              }
            }
          }
        };
      })(this));
    }
  }));

  define_com("Keyboard_help_multi", conf);

}).call(this);
