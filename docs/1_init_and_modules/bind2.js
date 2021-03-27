(function() {
  window.bind2 = function(athis, key, opt) {
    if (opt == null) {
      opt = {};
    }
    return Object.assign({}, opt, {
      value: athis.state[key],
      on_change: function(value) {
        var state;
        state = {};
        state[key] = value;
        athis.set_state(state);
        return typeof opt.on_change === "function" ? opt.on_change(value) : void 0;
      }
    });
  };

  window.bind2ls = function(athis, key, opt) {
    var err, local_storage_key, stored_value_json, value;
    if (opt == null) {
      opt = {};
    }
    local_storage_key = "" + athis.name + "." + key;
    value = null;
    if (stored_value_json = localStorage.getItem(local_storage_key)) {
      try {
        value = JSON.parse(stored_value_json);
      } catch (_error) {
        err = _error;
        perr(err);
      }
    }
    if (opt.value_preprocess) {
      value = opt.value_preprocess(value);
    }
    return Object.assign({}, opt, {
      value: value,
      on_change: function(value) {
        localStorage.setItem(local_storage_key, JSON.stringify(value));
        if (typeof opt.on_change === "function") {
          opt.on_change(value);
        }
        return athis.force_update();
      }
    });
  };

  window.load_ls = function(athis, key) {
    var err, local_storage_key, stored_value_json, value;
    local_storage_key = "" + athis.name + "." + key;
    if (!(stored_value_json = localStorage.getItem(local_storage_key))) {
      return;
    }
    value = null;
    try {
      value = JSON.parse(stored_value_json);
    } catch (_error) {
      err = _error;
      perr(err);
    }
    return value;
  };

  window.save_ls = function(athis, key, value, opt) {
    var local_storage_key;
    if (opt == null) {
      opt = {
        force_update: true
      };
    }
    local_storage_key = "" + athis.name + "." + key;
    if (value === void 0) {
      localStorage.removeItem(local_storage_key);
    } else {
      localStorage.setItem(local_storage_key, JSON.stringify(value));
    }
    if (opt.force_update) {
      athis.force_update();
    }
  };

}).call(this);
