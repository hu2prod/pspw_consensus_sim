(function() {
  var com_name, conf;

  com_name = "App";

  conf = React.createClass(CKR.react_key_map(com_name, {
    render: function() {
      return table({
        style: {
          width: "100%"
        }
      }, (function(_this) {
        return function() {
          return tbody(function() {
            return tr(function() {
              td({
                style: {
                  width: 300
                }
              }, function() {
                var scenario_list;
                scenario_list = [
                  {
                    title: "Scenario mining 4 rounds"
                  }
                ];
                return table({
                  "class": "table"
                }, function() {
                  return tbody(function() {
                    var v, _i, _len, _results;
                    _results = [];
                    for (_i = 0, _len = scenario_list.length; _i < _len; _i++) {
                      v = scenario_list[_i];
                      _results.push(tr(function() {
                        return td(v.title);
                      }));
                    }
                    return _results;
                  });
                });
              });
              return td(function() {
                return Sequencer_panel({});
              });
            });
          });
        };
      })(this));
    }
  }));

  define_com("App", conf);

}).call(this);
