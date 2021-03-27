(function() {
  window.scenario_sample = {
    ts: 0,
    ts_max: 5000,
    round_delimiter_ts_list: [2000, 4000],
    node_list: [
      {
        title: "Node 1",
        event_list: [
          {
            type: "block",
            ts: 0,
            tx_pow_list: []
          }, {
            type: "tx_pow_mine",
            ts: 100,
            tx_pow_type: 1
          }, {
            type: "tx_pow_mine",
            ts: 500,
            tx_pow_type: 3
          }, {
            type: "block",
            ts: 4000,
            tx_pow_list: []
          }
        ]
      }, {
        title: "Node 2",
        event_list: [
          {
            type: "tx_pow_mine",
            ts: 200,
            tx_pow_type: 2
          }, {
            type: "tx_pow_mine",
            ts: 800,
            tx_pow_type: 0
          }, {
            type: "block",
            ts: 2000,
            tx_pow_list: [
              {
                tx_pow_type: 0,
                source_idx: 1
              }, {
                tx_pow_type: 1,
                source_idx: 0
              }, {
                tx_pow_type: 2,
                source_idx: 1
              }, {
                tx_pow_type: 3,
                source_idx: 0
              }
            ]
          }
        ]
      }, {
        title: "Node 3",
        event_list: [
          {
            type: "block",
            ts: 100,
            tx_pow_list: []
          }, {
            type: "block_drop",
            ts: 400,
            tx_pow_list: []
          }
        ]
      }
    ]
  };

}).call(this);
