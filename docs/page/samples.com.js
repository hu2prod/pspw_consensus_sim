(function() {
  var com_name, conf;

  com_name = "Page_samples";

  conf = React.createClass(CKR.react_key_map(com_name, {
    state: {
      scenario_selected_idx: 0
    },
    mount: function() {
      var boring_scenario, less_boring_scenario, scenario;
      boring_scenario = scenario_gen({
        blockchain: {
          round_duration: 10 * 1000
        }
      });
      less_boring_scenario = scenario_gen({
        blockchain: {
          round_duration: 60 * 1000
        }
      });
      scenario = scenario_gen();
      return this.scenario_list = [
        {
          title: "Обычный блокчейн",
          value: boring_scenario,
          pref_set: {}
        }, {
          title: "Тоже ок",
          value: less_boring_scenario,
          pref_set: {}
        }, {
          title: "Сороконожка",
          value: scenario,
          pref_set: {}
        }, {
          title: "Ужас летящий на крыльях ночи",
          value: scenario,
          pref_set: {
            autotrack: true,
            mode_hide_future: true,
            zoom: 40,
            autoplay: true
          }
        }, {
          title: "Ну можно же нормальную валидацию",
          value: scenario,
          pref_set: {
            speed_scale: 20,
            ts: 2.05 * 60 * 60 * 1000,
            autotrack: true,
            mode_hide_future: true,
            zoom: 40,
            autoplay: true
          }
        }, {
          title: "3 блока не считая собаки",
          value: scenario_sample,
          pref_set: {
            speed_scale: 1
          }
        }
      ];
    },
    render: function() {
      return Page_wrap({
        com: this
      }, (function(_this) {
        return function() {
          return table({
            style: {
              width: "100%",
              textAlign: "left"
            }
          }, function() {
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
                  var scenario_set;
                  scenario_set = _this.scenario_list[_this.state.scenario_selected_idx];
                  return Sequencer_panel({
                    value: scenario_set.value,
                    pref_set: scenario_set.pref_set,
                    height: 500
                  });
                });
              });
            });
          });
        };
      })(this));
    }
  }));

  define_com("Page_samples", conf);

}).call(this);
