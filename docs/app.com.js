(function() {
  var com_name, conf;

  com_name = "App";

  conf = React.createClass(CKR.react_key_map(com_name, {
    state: {
      scenario_selected_idx: 0
    },
    mount: function() {
      return this.scenario_list = [
        {
          title: "Scenario mining 4 rounds",
          value: scenario_gen()
        }, {
          title: "Scenario sample",
          value: scenario_sample
        }
      ];
    },
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
                  width: 300,
                  verticalAlign: "top"
                }
              }, function() {
                return table({
                  "class": "table"
                }, function() {
                  return tbody(function() {
                    var scenario, scenario_idx, _i, _len, _ref, _results;
                    _ref = _this.scenario_list;
                    _results = [];
                    for (scenario_idx = _i = 0, _len = _ref.length; _i < _len; scenario_idx = ++_i) {
                      scenario = _ref[scenario_idx];
                      _results.push((function(scenario, scenario_idx) {
                        var _class;
                        _class = "";
                        if (scenario_idx === _this.state.scenario_selected_idx) {
                          _class = "selected";
                        }
                        return tr({
                          "class": _class,
                          style: {
                            cursor: "pointer"
                          },
                          on_click: function() {
                            return _this.set_state({
                              scenario_selected_idx: scenario_idx
                            });
                          }
                        }, function() {
                          return td(scenario.title);
                        });
                      })(scenario, scenario_idx));
                    }
                    return _results;
                  });
                });
              });
              return td({
                style: {
                  verticalAlign: "top"
                }
              }, function() {
                return Sequencer_panel({
                  value: _this.scenario_list[_this.state.scenario_selected_idx].value,
                  height: 500
                });
              });
            });
          });
        };
      })(this));
    }
  }));

  define_com("App", conf);

}).call(this);
