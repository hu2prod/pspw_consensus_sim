(function() {
  var com_name, conf;

  com_name = "App";

  conf = React.createClass(CKR.react_key_map(com_name, {
    mount: function() {
      var route, route_list, v, _i, _len, _results;
      route_list = ["", "sandbox"];
      window.route2com_hash = {
        "": {
          com: "Page_samples",
          title: "Samples"
        },
        "sandbox": {
          com: "Page_sandbox",
          title: "Sandbox"
        }
      };
      window.map_hash = {};
      _results = [];
      for (_i = 0, _len = route_list.length; _i < _len; _i++) {
        route = route_list[_i];
        v = route2com_hash[route];
        _results.push(window.map_hash[v.com] = v.title);
      }
      return _results;
    },
    render: function() {
      return Router_multi({
        render: (function(_this) {
          return function(hash) {
            var com, path, _ref;
            _this.path = path = ((_ref = hash[""]) != null ? _ref.path : void 0) || "";
            if (com = window.route2com_hash[path]) {
              return window[com.com]({});
            } else {
              return div("404");
            }
          };
        })(this)
      });
    }
  }));

  define_com("App", conf);

}).call(this);
