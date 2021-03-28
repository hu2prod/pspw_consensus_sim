(function() {
  var com_name, conf;

  com_name = "Router_multi";

  conf = React.createClass(CKR.react_key_map(com_name, {
    state: {
      router_hash: {}
    },
    mount: function() {
      this.location_change();
      window.onpopstate = (function(_this) {
        return function() {
          return _this.location_change();
        };
      })(this);
      window.route_go = (function(_this) {
        return function(path, key) {
          var chunk_list, route_delimiter, subroute_delimiter, v, _base, _ref;
          if (key == null) {
            key = "";
          }
          if ((_base = _this.state.router_hash)[key] == null) {
            _base[key] = {
              path: "",
              split: []
            };
          }
          _this.state.router_hash[key].path = path;
          chunk_list = [];
          route_delimiter = _this.props.route_delimiter || "/";
          subroute_delimiter = _this.props.subroute_delimiter || ";";
          _ref = _this.state.router_hash;
          for (key in _ref) {
            v = _ref[key];
            chunk_list.push("" + key + route_delimiter + v.path);
          }
          location.hash = chunk_list.join(subroute_delimiter);
          _this.location_change();
        };
      })(this);
    },
    location_change: function() {
      var hash, key, path, route_delimiter, router_hash, split, sub_route, subroute_delimiter, _i, _len, _ref;
      router_hash = {};
      hash = location.hash.replace(/^#/, "");
      subroute_delimiter = this.props.subroute_delimiter || ";";
      route_delimiter = this.props.route_delimiter || "/";
      _ref = hash.split(subroute_delimiter);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sub_route = _ref[_i];
        split = sub_route.split(route_delimiter);
        key = split.shift();
        path = split.join(route_delimiter);
        router_hash[key] = {
          path: path,
          split: split
        };
      }
      this.set_state({
        router_hash: router_hash
      });
    },
    render: function() {
      return this.props.render(this.state.router_hash);
    }
  }));

  define_com("Router_multi", conf);

}).call(this);
