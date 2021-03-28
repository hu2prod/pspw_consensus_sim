(function() {
  var com_name, conf, __iced_k, __iced_k_noop;

  __iced_k = __iced_k_noop = function() {};

  com_name = "Page_sandbox";

  conf = React.createClass(CKR.react_key_map(com_name, {
    state: {
      node_count: 20,
      block_round_count: 4,
      node_hashrate: 100,
      pow_simulation_step: 100,
      block_interval: 2000,
      block_start_offset: -1000,
      round_duration: 60 * 60 * 1000,
      target_pow_count_per_round: 100,
      pow_diff: 10 * 100 * 20,
      in_progress: false
    },
    scenario: null,
    mount: function() {
      return this.scenario = scenario_gen(this.state);
    },
    refresh: function() {
      var val, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      this.set_state({
        in_progress: true
      });
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral
          });
          setTimeout(__iced_deferrals.defer({
            lineno: 19
          }), 10);
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          val = clone(_this.state);
          val.blockchain = val;
          _this.scenario = scenario_gen(val);
          return _this.set_state({
            in_progress: false
          });
        };
      })(this));
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
                      var number_param_gen;
                      number_param_gen = function(name) {
                        return tr(function() {
                          td(name);
                          return td(Number_input(bind2(_this, name)));
                        });
                      };
                      number_param_gen("node_count");
                      number_param_gen("block_round_count");
                      number_param_gen("node_hashrate");
                      number_param_gen("pow_simulation_step");
                      number_param_gen("block_interval");
                      number_param_gen("block_start_offset");
                      number_param_gen("round_duration");
                      number_param_gen("target_pow_count_per_round");
                      number_param_gen("pow_diff");
                      tr(function() {
                        return td({
                          colSpan: 2
                        }, function() {
                          return Button({
                            label: "Regenerate",
                            on_click: function() {
                              return _this.refresh();
                            },
                            style: {
                              width: "100%"
                            }
                          });
                        });
                      });
                      if (_this.state.in_progress) {
                        return tr(function() {
                          return td({
                            colSpan: 2
                          }, function() {
                            return Spinner({});
                          });
                        });
                      }
                    });
                  });
                });
                return td({
                  style: {
                    verticalAlign: "top"
                  }
                }, function() {
                  return Sequencer_panel({
                    value: _this.scenario,
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

  define_com("Page_sandbox", conf);

}).call(this);
