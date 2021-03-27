var Keymap, Websocket_wrap, client_int, deep_clone, define_tag, global, image_uid, protocol, request_div, server_int, timer, update_style, update_style_uid, url_parser, v, websocket_list, _base, _base1, _base2, _base3, _base4, _base5, _i, _len, _log10, _log2, _react_attr_map, _react_key_map, _ref,
  __slice = [].slice;

global = window;

if (window.console == null) {
  window.console = {};
}

if ((_base = window.console).log == null) {
  _base.log = function() {};
}

if ((_base1 = window.console.log).bind == null) {
  _base1.bind = function() {
    return function() {};
  };
}

if ((_base2 = window.console).error == null) {
  _base2.error = function() {};
}

if ((_base3 = window.console.error).bind == null) {
  _base3.bind = function() {
    return function() {};
  };
}

if (Date.now == null) {
  Date.now = function() {
    return new Date().getTime();
  };
}

if ((_base4 = String.prototype).trim == null) {
  _base4.trim = function() {
    return this.replace(/^[\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF\xA0]+|[\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF\xA0]+$/g, '');
  };
}

if (Object.keys == null) {
  Object.keys = function(t) {
    var k, ret;
    ret = [];
    for (k in t) {
      ret.push(k);
    }
    return ret;
  };
}

if ((_base5 = Array.prototype).indexOf == null) {
  _base5.indexOf = function(t) {
    var k, v, _i, _len;
    for (k = _i = 0, _len = this.length; _i < _len; k = ++_i) {
      v = this[k];
      if (v === t) {
        return k;
      }
    }
    return -1;
  };
}

if (window.devicePixelRatio == null) {
  window.devicePixelRatio = 1;
}

window.p = console.log.bind(console);

window.puts = console.log.bind(console);

window.pe = console.error.bind(console);

window.perr = console.error.bind(console);

window.print = console.log.bind(console);

window.println = console.log.bind(console);

timer = null;

window.tic = function() {
  return timer = new Date;
};

window.toc = function() {
  return (new Date - timer) / 1000;
};

window.ptoc = function() {
  return console.log(toc().toFixed(3) + " s");
};

String.prototype.reverse = function() {
  return this.split("").reverse().join("");
};

String.prototype.capitalize = function() {
  return this.substr(0, 1).toUpperCase() + this.substr(1);
};

String.prototype.ljust = function(length, char) {
  var append;
  if (char == null) {
    char = " ";
  }
  append = new Array(Math.max(0, length - this.length) + 1).join(char);
  append = append.substr(0, length - this.length);
  return this + append;
};

String.prototype.rjust = function(length, char) {
  var append;
  if (char == null) {
    char = " ";
  }
  append = new Array(Math.max(0, length - this.length) + 1).join(char);
  append = append.substr(0, length - this.length);
  return append + this;
};

String.prototype.center = function(length, char) {
  var append, post, pre, req_length;
  if (char == null) {
    char = " ";
  }
  req_length = Math.floor((length - this.length + 1) / 2);
  append = new Array(Math.max(0, req_length * 2)).join(char);
  append = append.substr(0, req_length);
  pre = append;
  post = append;
  if ((2 * req_length + this.length) > length) {
    post = post.substr(0, req_length - 1);
  }
  return pre + this + post;
};

String.prototype.repeat = function(count) {
  var res;
  res = new Array(count + 1);
  return res.join(this);
};

Number.prototype.ljust = function(length, char) {
  if (char == null) {
    char = " ";
  }
  return this.toString().ljust(length, char);
};

Number.prototype.rjust = function(length, char) {
  if (char == null) {
    char = " ";
  }
  return this.toString().rjust(length, char);
};

Number.prototype.center = function(length, char) {
  if (char == null) {
    char = " ";
  }
  return this.toString().center(length, char);
};

Number.prototype.repeat = function(count) {
  return this.toString().repeat(count);
};

window.call_later = function(cb) {
  return setTimeout(cb, 0);
};

if (window.requestAnimationFrame == null) {
  window.requestAnimationFrame = call_later;
}

Array.prototype.has = function(t) {
  return -1 !== this.indexOf(t);
};

Array.prototype.upush = function(t) {
  if (-1 === this.indexOf(t)) {
    this.push(t);
  }
};

if (Array.isArray == null) {
  Array.isArray = function(obj) {
    return obj instanceof Array;
  };
}

Array.prototype.clone = Array.prototype.slice;

Array.prototype.clear = function() {
  return this.length = 0;
};

Array.prototype.idx = Array.prototype.indexOf;

Array.prototype.remove_idx = function(idx) {
  if (idx < 0 || idx >= this.length) {
    return this;
  }
  this.splice(idx, 1);
  return this;
};

Array.prototype.fast_remove = function(t) {
  var idx;
  idx = this.indexOf(t);
  if (idx === -1) {
    return;
  }
  this[idx] = this[this.length - 1];
  this.pop();
  return this;
};

Array.prototype.fast_remove_idx = function(idx) {
  if (idx < 0 || idx >= this.length) {
    return this;
  }
  this[idx] = this[this.length - 1];
  this.pop();
  return this;
};

Array.prototype.remove = function(t) {
  this.remove_idx(this.idx(t));
  return this;
};

Array.prototype.last = Array.prototype.end = function() {
  return this[this.length - 1];
};

Array.prototype.insert_after = function(idx, t) {
  this.splice(idx + 1, 0, t);
  return t;
};

Array.prototype.append = function(list) {
  var v, _i, _len;
  for (_i = 0, _len = list.length; _i < _len; _i++) {
    v = list[_i];
    this.push(v);
  }
  return this;
};

Array.prototype.uappend = function(list) {
  var v, _i, _len;
  for (_i = 0, _len = list.length; _i < _len; _i++) {
    v = list[_i];
    this.upush(v);
  }
  return this;
};

window.h_count = window.count_h = window.hash_count = window.count_hash = function(t) {
  var k, ret;
  ret = 0;
  for (k in t) {
    ret++;
  }
  return ret;
};

window.is_object = function(t) {
  return t === Object(t);
};

window.obj_set = Object.assign;

window.obj_clear = function(t) {
  var k, v;
  for (k in t) {
    v = t[k];
    delete t[k];
  }
  return t;
};

Array.prototype.set = function(t) {
  var k, v, _i, _len;
  this.length = t.length;
  for (k = _i = 0, _len = t.length; _i < _len; k = ++_i) {
    v = t[k];
    this[k] = v;
  }
  return this;
};

window.arr_set = function(dst, src) {
  var k, v, _i, _len;
  dst.length = src.length;
  for (k = _i = 0, _len = src.length; _i < _len; k = ++_i) {
    v = src[k];
    dst[k] = v;
  }
  return dst;
};

window.array_merge = window.arr_merge = function() {
  var a, r, _i, _len;
  r = [];
  for (_i = 0, _len = arguments.length; _i < _len; _i++) {
    a = arguments[_i];
    r = r.concat(a);
  }
  return r;
};

window.obj_merge = function() {
  var a, k, ret, v, _i, _len;
  ret = {};
  for (_i = 0, _len = arguments.length; _i < _len; _i++) {
    a = arguments[_i];
    for (k in a) {
      v = a[k];
      ret[k] = v;
    }
  }
  return ret;
};

RegExp.escape = function(text) {
  return text.replace(/[-\/[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

Function.prototype.sbind = function() {
  var athis, main_rest, ret, __this;
  athis = arguments[0], main_rest = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  __this = this;
  ret = function() {
    var rest;
    rest = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return __this.apply(athis, main_rest.concat(rest));
  };
  ret.call = function() {
    var rest, _new_athis;
    _new_athis = arguments[0], rest = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return __this.apply(_new_athis, main_rest.concat(rest));
  };
  ret.apply = function(_new_athis, rest) {
    return __this.apply(_new_athis, main_rest.concat(rest));
  };
  return ret;
};

window.clone = function(t) {
  var k, ret, v;
  if (t !== Object(t)) {
    return t;
  }
  if (Array.isArray(t)) {
    return t.slice();
  }
  ret = {};
  for (k in t) {
    v = t[k];
    ret[k] = v;
  }
  return ret;
};

window.deep_clone = deep_clone = function(t) {
  var k, res, v, _i, _len;
  if (t !== Object(t)) {
    return t;
  }
  if (Array.isArray(t)) {
    res = [];
    for (_i = 0, _len = t.length; _i < _len; _i++) {
      v = t[_i];
      res.push(deep_clone(v));
    }
    return res;
  }
  res = {};
  for (k in t) {
    v = t[k];
    res[k] = deep_clone(v);
  }
  return res;
};

_log2 = Math.log(2);

_log10 = Math.log(10);

if (Math.log2 == null) {
  Math.log2 = function(t) {
    return Math.log(t) / _log2;
  };
}

if (Math.log10 == null) {
  Math.log10 = function(t) {
    return Math.log(t) / _log10;
  };
}

_ref = "abs min max sqrt log round ceil floor log2 log10".split(" ");
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  v = _ref[_i];
  global[v] = Math[v];
}

Object.defineProperty(global, "__STACK__", {
  get: function() {
    var err, orig, stack;
    orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack) {
      return stack;
    };
    err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(global, "__LINE__", {
  get: function() {
    return __STACK__[1].getLineNumber();
  }
});

Object.defineProperty(global, "__FILE__", {
  get: function() {
    return __STACK__[1].getFileName().split("/").slice(-1)[0];
  }
});

JSON.eq = function(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
};

JSON.ne = function(a, b) {
  return JSON.stringify(a) !== JSON.stringify(b);
};

Promise.prototype.cb = function(cb) {
  var used, wrap_cb;
  used = false;
  wrap_cb = function(err, res) {
    if (!used) {
      used = true;
      cb(err, res);
    }
  };
  return this["catch"]((function(_this) {
    return function(err) {
      return wrap_cb(err);
    };
  })(this)).then((function(_this) {
    return function(res) {
      return wrap_cb(null, res);
    };
  })(this));
};

puts("reload date " + (new Date));

window.event_mixin_constructor = function(_t) {
  _t.$event_hash = {};
  _t.$event_once_hash = {};
  _t.on("delete", function() {
    var k, _ref1;
    _ref1 = _t.$event_hash;
    for (k in _ref1) {
      v = _ref1[k];
      if (k === "delete") {
        continue;
      }
      _t.$event_hash[k].clear();
    }
  });
};

window.event_mixin = function(_t) {
  var _base6;
  _t.prototype.$delete_state = false;
  _t.prototype.$event_hash = {};
  if ((_base6 = _t.prototype)["delete"] == null) {
    _base6["delete"] = function() {
      this.dispatch("delete");
    };
  }
  _t.prototype.once = function(event_name, cb) {
    var _base7, _j, _len1;
    if (event_name instanceof Array) {
      for (_j = 0, _len1 = event_name.length; _j < _len1; _j++) {
        v = event_name[_j];
        this.once(v, cb);
      }
      return this;
    }
    this.on(event_name, cb);
    if ((_base7 = this.$event_once_hash)[event_name] == null) {
      _base7[event_name] = [];
    }
    this.$event_once_hash[event_name].push(cb);
    return this;
  };
  _t.prototype.ensure_on = function(event_name, cb) {
    var _base7, _j, _len1;
    if (event_name instanceof Array) {
      for (_j = 0, _len1 = event_name.length; _j < _len1; _j++) {
        v = event_name[_j];
        this.ensure_on(v, cb);
      }
      return this;
    }
    if ((_base7 = this.$event_hash)[event_name] == null) {
      _base7[event_name] = [];
    }
    if (!this.$event_hash[event_name].has(cb)) {
      this.$event_hash[event_name].push(cb);
    }
    return this;
  };
  _t.prototype.on = function(event_name, cb) {
    var _base7, _j, _len1;
    if (event_name instanceof Array) {
      for (_j = 0, _len1 = event_name.length; _j < _len1; _j++) {
        v = event_name[_j];
        this.on(v, cb);
      }
      return this;
    }
    if ((_base7 = this.$event_hash)[event_name] == null) {
      _base7[event_name] = [];
    }
    this.$event_hash[event_name].push(cb);
    return this;
  };
  _t.prototype.off = function(event_name, cb) {
    var e, idx, list, _j, _len1, _ref1;
    this.$delete_state = true;
    if (event_name instanceof Array) {
      for (_j = 0, _len1 = event_name.length; _j < _len1; _j++) {
        v = event_name[_j];
        this.off(v, cb);
      }
      return;
    }
    list = this.$event_hash[event_name];
    if (!list) {
      puts("probably lose some important because no event_name '" + event_name + "' found");
      e = new Error;
      puts(e.stack);
      return;
    }
    idx = list.idx(cb);
    if (idx >= 0) {
      list[idx] = null;
    }
    if ((_ref1 = this.$event_once_hash[event_name]) != null) {
      _ref1.fast_remove(cb);
    }
  };
  return _t.prototype.dispatch = function(event_name, hash) {
    var cb, e, idx, list, remove_cb, _j, _k, _len1, _len2, _ref1, _ref2;
    if (hash == null) {
      hash = {};
    }
    if (this.$event_hash[event_name]) {
      _ref1 = list = this.$event_hash[event_name];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        cb = _ref1[_j];
        if (cb === null) {
          continue;
        }
        try {
          cb.call(this, hash);
        } catch (_error) {
          e = _error;
          perr(e);
        }
      }
      if (this.$delete_state) {
        while (0 < (idx = list.idx(null))) {
          list.remove_idx(idx);
        }
        this.$delete_state = false;
      }
      if (this.$event_once_hash[event_name]) {
        _ref2 = this.$event_once_hash[event_name];
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          remove_cb = _ref2[_k];
          list.fast_remove(remove_cb);
        }
        this.$event_once_hash[event_name].clear();
      }
    }
  };
};

window.Event_mixin = (function() {
  event_mixin(Event_mixin);

  function Event_mixin() {
    event_mixin_constructor(this);
  }

  return Event_mixin;

})();

window.event_manager = new window.Event_mixin();

websocket_list = [];

if (!window.WebSocket) {
  request_div = document.createElement('div');
  document.body.appendChild(request_div);
  client_int = 1000;
  server_int = 15000;
  server_int = 5000;
  window.__ws_cb = function(uid, msg_uid, data) {
    var child, seek, ws, _j, _k, _len1, _len2, _ref1;
    for (_j = 0, _len1 = websocket_list.length; _j < _len1; _j++) {
      ws = websocket_list[_j];
      if (ws.uid === uid) {
        if (data != null) {
          ws.dispatch("data", data);
        }
        ws.active_script_count--;
        break;
      }
    }
    if ((ws != null ? ws.active_script_count : void 0) < 2) {
      ws.send(null);
    }
    seek = "?u=" + uid + "&mu=" + msg_uid + "&";
    _ref1 = request_div.children;
    for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
      child = _ref1[_k];
      if (-1 !== child.src.indexOf(seek)) {
        request_div.removeChild(child);
        child.onerror = null;
        break;
      }
    }
  };
  setInterval(function() {
    var ws, _j, _len1;
    for (_j = 0, _len1 = websocket_list.length; _j < _len1; _j++) {
      ws = websocket_list[_j];
      if (ws.active_script_count < 2) {
        ws.send(null);
      }
    }
  }, client_int);
}

Websocket_wrap = (function() {
  Websocket_wrap.uid = 0;

  Websocket_wrap.prototype.uid = 0;

  Websocket_wrap.prototype.msg_uid = 0;

  Websocket_wrap.prototype.websocket = null;

  Websocket_wrap.prototype.timeout_min = 100;

  Websocket_wrap.prototype.timeout_max = 5 * 1000;

  Websocket_wrap.prototype.timeout_mult = 1.5;

  Websocket_wrap.prototype.timeout = 100;

  Websocket_wrap.prototype.url = '';

  Websocket_wrap.prototype.reconnect_timer = null;

  Websocket_wrap.prototype.queue = [];

  Websocket_wrap.prototype.quiet = false;

  Websocket_wrap.prototype.fallback_mode = false;

  Websocket_wrap.prototype.active_script_count = 0;

  event_mixin(Websocket_wrap);

  function Websocket_wrap(url) {
    this.url = url;
    event_mixin_constructor(this);
    this.uid = Websocket_wrap.uid++;
    this.queue = [];
    this.timeout = this.timeout_min;
    this.ws_init();
    websocket_list.push(this);
  }

  Websocket_wrap.prototype["delete"] = function() {
    return this.close();
  };

  Websocket_wrap.prototype.close = function() {
    clearTimeout(this.reconnect_timer);
    this.websocket.onopen = function() {};
    this.websocket.onclose = function() {};
    this.websocket.onclose = function() {};
    this.websocket.close();
    return websocket_list.remove(this);
  };

  Websocket_wrap.prototype.ws_reconnect = function() {
    if (this.reconnect_timer) {
      return;
    }
    this.reconnect_timer = setTimeout((function(_this) {
      return function() {
        _this.ws_init();
      };
    })(this), this.timeout);
  };

  Websocket_wrap.prototype.ws_init = function() {
    if (!window.WebSocket) {
      this.fallback_mode = true;
      this.uid = "" + Math.random();
      this.url = this.url.replace("ws:", "http:");
      this.url = this.url.replace("wss:", "https:");
      this.url += "/ws";
      this.url = this.url.replace(/\/\/ws$/, "/ws");
      return;
    }
    this.reconnect_timer = null;
    this.websocket = new WebSocket(this.url);
    this.timeout = Math.min(this.timeout_max, Math.round(this.timeout * this.timeout_mult));
    this.websocket.onopen = (function(_this) {
      return function() {
        var data, q, _j, _len1;
        _this.dispatch("reconnect");
        _this.timeout = _this.timeout_min;
        q = _this.queue.clone();
        _this.queue.clear();
        for (_j = 0, _len1 = q.length; _j < _len1; _j++) {
          data = q[_j];
          _this.send(data);
        }
      };
    })(this);
    this.websocket.onerror = (function(_this) {
      return function(e) {
        if (!_this.quiet) {
          perr("Websocket error.");
          perr(e);
        }
        _this.ws_reconnect();
      };
    })(this);
    this.websocket.onclose = (function(_this) {
      return function() {
        if (!_this.quiet) {
          perr("Websocket disconnect. Restarting in " + _this.timeout);
        }
        _this.ws_reconnect();
      };
    })(this);
    this.websocket.onmessage = (function(_this) {
      return function(message) {
        var data;
        data = JSON.parse(message.data);
        _this.dispatch("data", data);
      };
    })(this);
  };

  Websocket_wrap.prototype.send = function(data) {
    var script;
    if (this.fallback_mode) {
      script = document.createElement('script');
      script.src = "" + this.url + "?u=" + this.uid + "&mu=" + (this.msg_uid++) + "&i=" + server_int + "&d=" + (encodeURIComponent(JSON.stringify(data)));
      script.onerror = (function(_this) {
        return function() {
          request_div.removeChild(script);
          script.onerror = null;
          _this.active_script_count--;
          _this.send(data);
        };
      })(this);
      setTimeout((function(_this) {
        return function() {
          if (script.parentElement) {
            script.onerror();
          }
        };
      })(this), server_int * 3);
      request_div.appendChild(script);
      this.active_script_count++;
      return;
    }
    if (this.websocket.readyState !== this.websocket.OPEN) {
      this.queue.push(data);
    } else {
      this.websocket.send(JSON.stringify(data));
    }
  };

  Websocket_wrap.prototype.write = Websocket_wrap.prototype.send;

  return Websocket_wrap;

})();

window.Websocket_wrap = Websocket_wrap;

window.autoreload = true;

protocol = location.protocol === "http:" ? "ws:" : "wss:";

image_uid = 0;

if (window.config_hot_reload) {
  update_style_uid = 0;
  update_style = function(image_update) {
    var e, k, style_cont, style_list, style_tag, _ref1;
    if (image_update == null) {
      image_update = false;
    }
    style_list = [];
    _ref1 = window.framework_style_hash;
    for (k in _ref1) {
      v = _ref1[k];
      style_list.push(v);
    }
    style_tag = document.getElementsByTagName("style")[0];
    style_cont = style_list.join("\n");
    if (window.host_patch) {
      style_cont = style_cont.replace(/url\(\//g, "url(" + host_patch + "/");
    }
    if (image_update) {
      update_style_uid++;
    }
    style_cont = style_cont.replace(/url\(\"([^"'\)]+)\"\)/g, "url(\"$1?" + update_style_uid + "\")");
    style_cont = style_cont.replace(/url\(\'([^"'\)]+)\'\)/g, "url('$1?" + update_style_uid + "')");
    style_cont = style_cont.replace(/url\(([^"'\)]+)\)/g, "url($1?" + update_style_uid + ")");
    try {
      style_tag.innerHTML = style_cont;
    } catch (_error) {
      e = _error;
      return false;
    }
    return true;
  };
  update_style();
  window.hot_reload_event_mixin = new Event_mixin;
  url_parser = function(url) {
    var parser;
    parser = document.createElement("a");
    parser.href = url;
    return parser;
  };
  if (window.hot_reload_websocket == null) {
    window.hot_reload_websocket = new window.Websocket_wrap("" + protocol + "//" + location.hostname + ":" + config_hot_reload_port + location.pathname);
  }
  window.hot_reload_websocket.on("data", window.hot_reload_handler = function(data) {
    var content, loc_img, new_script, src, url, _j, _len1, _ref1;
    if (!autoreload) {
      return;
    }
    if (data.event === "add" && data["switch"] !== "hotreload_image") {
      location.reload();
    }
    switch (data["switch"]) {
      case "hotreload_full":
        if (data.start_ts === start_ts) {
          return;
        }
        hot_reload_event_mixin.dispatch("hotreload_full");
        location.reload();
        break;
      case "hotreload_js":
        if (data.start_ts === start_ts) {
          return;
        }
        if (!file_list.has(data.path)) {
          return;
        }
        if (/\.com\.coffee$/.test(data.path)) {
          if (window.hot_reload_extension) {
            content = data.content;
            puts("exec " + data.path);
            content += "//# sourceURL=" + data.path;
            window.hotreplace = true;
            eval(content);
            window.hotreplace = false;
            if (typeof window.bootstrap === "function") {
              window.bootstrap();
            }
            return;
          }
          hot_reload_event_mixin.dispatch("hotreload_com");
          new_script = document.createElement("script");
          window.hotreplace = true;
          new_script.onload = (function(_this) {
            return function() {
              window.hotreplace = false;
              return typeof window.bootstrap === "function" ? window.bootstrap() : void 0;
            };
          })(this);
          new_script.src = data.path;
          document.body.appendChild(new_script);
        } else {
          hot_reload_event_mixin.dispatch("hotreload_full");
          location.reload();
        }
        break;
      case "hotreload_style":
        window.framework_style_hash[data.path] = data.content;
        if (!update_style()) {
          location.reload();
        }
        break;
      case "hotreload_template":
        window.framework_template_hash[data.path] = window.template_preprocess(data.content);
        hot_reload_event_mixin.dispatch("hotreload_template", data.path);
        break;
      case "hotreload_image":
        _ref1 = document.getElementsByTagName("img");
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          loc_img = _ref1[_j];
          url = url_parser(loc_img.src);
          src = url.pathname;
          src = src.replace(/^\//, "");
          data.path = data.path.replace(/^\//, "");
          if (src === data.path) {
            if (url.protocol) {
              loc_img.src = "" + url.protocol + "//" + url.host + url.pathname + "?cache_killer=" + (image_uid++);
            } else {
              loc_img.src = "" + url.pathname + "?cache_killer=" + (image_uid++);
            }
          }
        }
        if (!update_style(true)) {
          location.reload();
        }
    }
  });
}

_react_key_map = {
  mount: "componentWillMount",
  mount_done: "componentDidMount",
  unmount: "componentWillUnmount",
  unmount_done: "componentDidUnmount",
  props_change: "componentWillReceiveProps"
};

_react_attr_map = {
  "class": "className",
  "on_change": "onChange",
  "on_input": "onInput",
  "on_invalid": "onInvalid",
  "on_reset": "onReset",
  "on_submit": "onSubmit",
  "on_error": "onError",
  "on_load": "onLoad",
  "on_key_down": "onKeyDown",
  "on_key_press": "onKeyPress",
  "on_key_up": "onKeyUp",
  "on_copy": "onCopy",
  "on_cut": "onCut",
  "on_paste": "onPaste",
  "on_click": "onClick",
  "on_dblclick": "onDoubleClick",
  "on_context_menu": "onContextMenu",
  "on_wheel": "onWheel",
  "on_mouse_move": "onMouseMove",
  "on_mouse_down": "onMouseDown",
  "on_mouse_up": "onMouseUp",
  "on_mouse_out": "onMouseOut",
  "on_mouse_over": "onMouseOver",
  "on_move_enter": "onMouseEnter",
  "on_move_leave": "onMouseLeave",
  "on_drag": "onDrag",
  "on_drag_end": "onDragEnd",
  "on_drag_enter": "onDragEnter",
  "on_drag_exit": "onDragExit",
  "on_drag_leave": "onDragLeave",
  "on_drag_over": "onDragOver",
  "on_drag_start": "onDragStart",
  "on_drop": "onDrop",
  "on_touch_cancel": "onTouchCancel",
  "on_touch_end": "onTouchEnd",
  "on_touch_move": "onTouchMove",
  "on_touch_start": "onTouchStart",
  "on_focus": "onFocus",
  "on_blur": "onBlur",
  "on_select": "onSelect",
  "on_scroll": "onScroll",
  "on_hover": "onMouseOver"
};

window.CKR = {
  __node_buffer: [],
  prop: function(t) {
    var lookup_list, _j, _len1, _ref1;
    _ref1 = CKR.__node_buffer;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      lookup_list = _ref1[_j];
      lookup_list.remove(t);
    }
    return t;
  },
  list: function(t) {
    return CKR.__node_buffer.uappend(t);
  },
  item: function() {
    var arg, fn;
    fn = arguments[0], arg = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return CKR.__node_buffer.last().upush(fn.apply(null, arg));
  },
  react_key_map: function(name, t) {
    var k, k2, old_state, ret;
    ret = {
      name: name,
      displayName: name
    };
    if (t.state) {
      if (typeof t.state !== "function") {
        old_state = t.state;
        t.state = function() {
          return clone(old_state);
        };
      }
      t.getInitialState = t.state;
      delete t.state;
    }
    for (k in t) {
      v = t[k];
      if (k2 = _react_key_map[k]) {
        ret[k2] = v;
      }
      ret[k] = v;
    }
    ret.set_state = function() {
      return this.setState.apply(this, arguments);
    };
    ret.force_update = function() {
      return this.forceUpdate.apply(this, arguments);
    };
    return ret;
  }
};

define_tag = function(name) {
  window[name] = function() {
    var arg, attrs, buf, children, k, last, ret, t, _j, _k, _l, _len1, _len2, _len3, _ref1;
    children = [];
    attrs = {};
    for (_j = 0, _len1 = arguments.length; _j < _len1; _j++) {
      arg = arguments[_j];
      if (arg == null) {
        continue;
      }
      if (arg.$$typeof != null) {
        children.push(arg);
      } else if (Array.isArray(arg)) {
        children.uappend(arg);
      } else if (typeof arg === "object") {
        for (k in arg) {
          v = arg[k];
          attrs[_react_attr_map[k] || k] = v;
        }
      } else if (typeof arg === "function") {
        CKR.__node_buffer.push([]);
        t = arg();
        children.uappend(CKR.__node_buffer.pop());
        if (Array.isArray(t)) {
          children.uappend(t);
        } else {
          children.upush(t);
        }
      } else if (typeof arg === "string") {
        children.push(arg);
      } else if (typeof arg === "number") {
        children.push(arg.toString());
      }
    }
    if (window.host_patch && (name === "img" || name === "video")) {
      if (attrs.src[0] === "/") {
        attrs.src = window.host_patch + attrs.src;
      }
    }
    ret = children.length ? React.createElement.apply(React, [name, attrs].concat(__slice.call(children))) : React.createElement(name, attrs);
    if (last = CKR.__node_buffer.last()) {
      _ref1 = CKR.__node_buffer;
      for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
        buf = _ref1[_k];
        buf.remove(ret);
        for (_l = 0, _len3 = children.length; _l < _len3; _l++) {
          v = children[_l];
          buf.remove(v);
        }
      }
      last.push(ret);
    }
    return ret;
  };
};

window.define_com = function(name, react_class) {
  if (window[name] != null) {
    if (!window.hotreplace) {
      perr("WARNING something bad is happening. You trying to rewrite already defined window property " + name + ". It can break app");
    }
  }
  window[name] = function() {
    var arg, attrs, buf, children, k, last, ret, t, _j, _k, _l, _len1, _len2, _len3, _ref1;
    children = [];
    attrs = {};
    for (_j = 0, _len1 = arguments.length; _j < _len1; _j++) {
      arg = arguments[_j];
      if (arg == null) {
        continue;
      }
      if (arg.$$typeof != null) {
        children.push(arg);
      } else if (Array.isArray(arg)) {
        children.uappend(arg);
      } else if (typeof arg === "object") {
        for (k in arg) {
          v = arg[k];
          attrs[k] = v;
        }
      } else if (typeof arg === "function") {
        CKR.__node_buffer.push([]);
        t = arg();
        children.uappend(CKR.__node_buffer.pop());
        if (Array.isArray(t)) {
          children.uappend(t);
        } else {
          children.upush(t);
        }
      } else if (typeof arg === "string") {
        children.push(arg);
      } else if (typeof arg === "number") {
        children.push(arg.toString());
      }
    }
    ret = children.length ? React.createElement.apply(React, [react_class, attrs].concat(__slice.call(children))) : React.createElement(react_class, attrs);
    if (last = CKR.__node_buffer.last()) {
      _ref1 = CKR.__node_buffer;
      for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
        buf = _ref1[_k];
        buf.remove(ret);
        for (_l = 0, _len3 = children.length; _l < _len3; _l++) {
          v = children[_l];
          buf.remove(v);
        }
      }
      last.push(ret);
    }
    return ret;
  };
};

define_tag("a");

define_tag("address");

define_tag("applet");

define_tag("area");

define_tag("article");

define_tag("aside");

define_tag("b");

define_tag("base");

define_tag("basefont");

define_tag("bgsound");

define_tag("big");

define_tag("blockquote");

define_tag("body");

define_tag("br");

define_tag("button");

define_tag("caption");

define_tag("center");

define_tag("code");

define_tag("col");

define_tag("colgroup");

define_tag("canvas");

define_tag("dd");

define_tag("desc");

define_tag("details");

define_tag("dialog");

define_tag("dir");

define_tag("div");

define_tag("dl");

define_tag("dt");

define_tag("em");

define_tag("embed");

define_tag("fieldset");

define_tag("figcaption");

define_tag("figure");

define_tag("font");

define_tag("footer");

define_tag("foreignObject");

define_tag("form");

define_tag("frame");

define_tag("frameset");

define_tag("h1");

define_tag("h2");

define_tag("h3");

define_tag("h4");

define_tag("h5");

define_tag("h6");

define_tag("head");

define_tag("header");

define_tag("hgroup");

define_tag("hr");

define_tag("html");

define_tag("i");

define_tag("img");

define_tag("image");

define_tag("input");

define_tag("iframe");

define_tag("keygen");

define_tag("label");

define_tag("li");

define_tag("link");

define_tag("listing");

define_tag("main");

define_tag("malignmark");

define_tag("marquee");

define_tag("math");

define_tag("menu");

define_tag("menuitem");

define_tag("meta");

define_tag("mglyph");

define_tag("mi");

define_tag("mo");

define_tag("mn");

define_tag("ms");

define_tag("mtext");

define_tag("nav");

define_tag("nobr");

define_tag("noframes");

define_tag("noembed");

define_tag("noscript");

define_tag("object");

define_tag("ol");

define_tag("optgroup");

define_tag("option");

define_tag("p");

define_tag("param");

define_tag("plaintext");

define_tag("pre");

define_tag("rb");

define_tag("rp");

define_tag("rt");

define_tag("rtc");

define_tag("ruby");

define_tag("s");

define_tag("script");

define_tag("section");

define_tag("select");

define_tag("source");

define_tag("small");

define_tag("span");

define_tag("strike");

define_tag("strong");

define_tag("style");

define_tag("sub");

define_tag("summary");

define_tag("sup");

define_tag("table");

define_tag("tbody");

define_tag("template");

define_tag("textarea");

define_tag("tfoot");

define_tag("td");

define_tag("th");

define_tag("thead");

define_tag("title");

define_tag("tr");

define_tag("track");

define_tag("tt");

define_tag("u");

define_tag("ul");

define_tag("svg");

define_tag("var");

define_tag("video");

define_tag("wbr");

define_tag("xmp");

define_tag("progress");

Keymap = (function() {
  function Keymap() {}

  Keymap.map = {
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84,
    u: 85,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 90,
    0: 48,
    1: 49,
    2: 50,
    3: 51,
    4: 52,
    5: 53,
    6: 54,
    7: 55,
    8: 56,
    9: 57,
    tab: 9,
    enter: 13,
    shift: 16,
    backspace: 8,
    ctrl: 17,
    alt: 18,
    esc: 27,
    escape: 27,
    space: 32,
    menu: 93,
    pause: 19,
    cmd: 91,
    win: 91,
    winkey: 91,
    cmd_left: 91,
    win_left: 91,
    winkey_left: 91,
    cmd_right: 92,
    winkey_right: 92,
    insert: 45,
    home: 36,
    pageup: 33,
    "delete": 46,
    end: 35,
    pagedown: 34,
    f1: 112,
    f2: 113,
    f3: 114,
    f4: 115,
    f5: 116,
    f6: 117,
    f7: 118,
    f8: 119,
    f9: 120,
    f10: 121,
    f11: 122,
    f12: 123,
    num_0: 96,
    num_1: 97,
    num_2: 98,
    num_3: 99,
    num_4: 100,
    num_5: 101,
    num_6: 102,
    num_7: 103,
    num_8: 104,
    num_9: 105,
    num_slash: 11,
    num_star: 106,
    num_hyphen: 109,
    num_minus: 109,
    num_plus: 107,
    num_dot: 110,
    "num_/": 11,
    "num_*": 106,
    "num_-": 109,
    "num_+": 107,
    "num_.": 110,
    capslock: 20,
    numlock: 144,
    scrolllock: 145,
    equals: 61,
    hyphen: 109,
    minus: 109,
    coma: 188,
    comma: 188,
    dot: 190,
    "=": 61,
    "-": 109,
    ",": 188,
    ".": 190,
    gravis: 192,
    "`": 192,
    backslash: 220,
    "\\": 220,
    sbopen: 219,
    sbclose: 221,
    "[": 219,
    "]": 221,
    slash: 191,
    "/": 191,
    semicolon: 59,
    ";": 59,
    apostrophe: 222,
    "'": 222,
    left: 37,
    up: 38,
    right: 39,
    down: 40
  };

  Keymap.init = function() {
    var i, k, _j, _ref1, _ref2, _ref3, _ref4;
    Keymap.rev_map = {};
    _ref1 = Keymap.map;
    for (k in _ref1) {
      v = _ref1[k];
      Keymap.rev_map[v] = k;
    }
    for (i = _j = 0; _j <= 9; i = ++_j) {
      Keymap.map["num" + i] = Keymap.map["num_" + i];
    }
    _ref2 = Keymap.map;
    for (k in _ref2) {
      v = _ref2[k];
      if (/^num_/.test(k)) {
        Keymap.map[k.replace("num_", "num")] = v;
        Keymap.map[k.replace("num_", "numpad_")] = v;
        Keymap.map[k.replace("num_", "numpad ")] = v;
      }
    }
    _ref3 = Keymap.map;
    for (k in _ref3) {
      v = _ref3[k];
      Keymap.map[k.toUpperCase()] = v;
    }
    _ref4 = Keymap.map;
    for (k in _ref4) {
      v = _ref4[k];
      this[k] = v;
    }
  };

  Keymap.parse = function(k) {
    var ch_end, ch_start, k_end, k_start, res, res_list, templ_res, _j, _ref1;
    k = k.toLowerCase();
    templ_res = {
      opt_shift: /\[shift[-+]\]/i.test(k),
      opt_ctrl: /\[ctrl[-+]\]/i.test(k),
      opt_alt: /\[alt[-+]\]/i.test(k),
      shift: /shift[-+]/i.test(k),
      ctrl: /ctrl[-+]/i.test(k),
      alt: /alt[-+]/i.test(k),
      prevent_default: true,
      handler: null,
      code: 0
    };
    k = k.replace(/shift[-+]/i, "");
    k = k.replace(/ctrl[-+]/i, "");
    k = k.replace(/alt[-+]/i, "");
    k = k.replace(/\[\]/g, "");
    if (/-/.test(k)) {
      _ref1 = k.split(/-/), ch_start = _ref1[0], ch_end = _ref1[1];
    } else {
      ch_start = k;
      ch_end = k;
    }
    if (Keymap.map[ch_start] == null) {
      perr("code for ch_start " + ch_start + " not found");
      return [];
    }
    if (Keymap.map[ch_end] == null) {
      perr("code for ch_end " + ch_end + " not found");
      return [];
    }
    k_start = Keymap.map[ch_start];
    k_end = Keymap.map[ch_end];
    res_list = [];
    for (k = _j = k_start; k_start <= k_end ? _j <= k_end : _j >= k_end; k = k_start <= k_end ? ++_j : --_j) {
      res = clone(templ_res);
      res.code = k;
      res_list.push(res);
    }
    return res_list;
  };

  return Keymap;

})();

Keymap.init();

window.Keymap = Keymap;

window.Keyboard_scheme = (function() {
  Keyboard_scheme.prototype.code_map = {};

  function Keyboard_scheme() {
    this.code_map = {};
  }

  Keyboard_scheme.prototype.register = function(hotkey, handler, opt) {
    var event, event_list, _base6, _j, _len1, _name;
    if (opt == null) {
      opt = {};
    }
    event_list = window.Keymap.parse(hotkey);
    for (_j = 0, _len1 = event_list.length; _j < _len1; _j++) {
      event = event_list[_j];
      if (opt.prevent_default != null) {
        event.prevent_default = opt.prevent_default;
      }
      if (opt.description != null) {
        event.description = opt.description;
      }
      event.handler = handler;
      if ((_base6 = this.code_map)[_name = event.code] == null) {
        _base6[_name] = [];
      }
      this.code_map[event.code].push(event);
    }
  };

  Keyboard_scheme.prototype.keypressed = function(event) {
    var list, _j, _len1;
    if (list = this.code_map[event.keyCode]) {
      for (_j = 0, _len1 = list.length; _j < _len1; _j++) {
        v = list[_j];
        if (!v.opt_ctrl && v.ctrl !== event.ctrlKey) {
          continue;
        }
        if (!v.opt_shift && v.shift !== event.shiftKey) {
          continue;
        }
        if (!v.opt_alt && v.alt !== event.altKey) {
          continue;
        }
        return v.handler(event);
      }
    }
  };

  return Keyboard_scheme;

})();

window.Keyboard_switchable_scheme = (function() {
  Keyboard_switchable_scheme.prototype.mode = 'default';

  Keyboard_switchable_scheme.prototype.mode_to_scheme = {};

  Keyboard_switchable_scheme.prototype.active_scheme = null;

  function Keyboard_switchable_scheme() {
    this.mode_to_scheme = {
      "default": new window.Keyboard_scheme
    };
    this.scheme_select('default');
  }

  Keyboard_switchable_scheme.prototype.scheme_select = function(name) {
    var new_scheme;
    new_scheme = this.mode_to_scheme[name];
    if (!new_scheme) {
      perr("unknown scheme '" + name + "'");
      return;
    }
    this.active_scheme = new_scheme;
  };

  Keyboard_switchable_scheme.prototype.keypressed = function(event) {
    var list, _j, _len1;
    if (list = this.active_scheme.code_map[event.keyCode]) {
      for (_j = 0, _len1 = list.length; _j < _len1; _j++) {
        v = list[_j];
        if (!v.opt_ctrl && v.ctrl !== event.ctrlKey) {
          continue;
        }
        if (!v.opt_shift && v.shift !== event.shiftKey) {
          continue;
        }
        if (!v.opt_alt && v.alt !== event.altKey) {
          continue;
        }
        if (v.prevent_default) {
          event.preventDefault();
        }
        return v.handler(event);
      }
    }
  };

  return Keyboard_switchable_scheme;

})();
