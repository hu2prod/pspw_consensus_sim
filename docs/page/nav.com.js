(function() {
  var com_name, conf;

  com_name = "Page_nav";

  conf = React.createClass(CKR.react_key_map(com_name, {
    render: function() {
      return Tab_bar({
        value: this.props.com.name,
        hash: window.map_hash,
        on_change: (function(_this) {
          return function(t) {
            var k, v, _ref;
            _ref = window.route2com_hash;
            for (k in _ref) {
              v = _ref[k];
              if (v.com === t) {
                route_go(k);
              }
            }
          };
        })(this),
        btn_style: {
          fontSize: 20
        }
      });
    }
  }));

  define_com("Page_nav", conf);

}).call(this);
