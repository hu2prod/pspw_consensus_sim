(function() {
  window.scenario_gen = function(opt) {
    var block_generation_duration_max, block_generation_duration_min, block_interval, block_round_count, block_start_offset, curr_node_hashrate, curr_pow, hash_count, i, idx, node, node_count, node_hashrate, node_idx, node_list, pow_diff, pow_simulation_step, pow_type_count, round_delimiter_ts_list, round_duration, round_idx, target_pow_count_per_round, ts, ts_max, _base, _i, _j, _k, _l, _len, _len1, _m, _n, _ref;
    if (opt == null) {
      opt = {};
    }
    node_count = opt.node_count, ts_max = opt.ts_max, block_round_count = opt.block_round_count, node_hashrate = opt.node_hashrate, pow_simulation_step = opt.pow_simulation_step;
    if (opt.blockchain) {
      _ref = opt.blockchain, block_interval = _ref.block_interval, block_start_offset = _ref.block_start_offset, round_duration = _ref.round_duration, block_generation_duration_min = _ref.block_generation_duration_min, block_generation_duration_max = _ref.block_generation_duration_max, target_pow_count_per_round = _ref.target_pow_count_per_round, pow_type_count = _ref.pow_type_count, pow_diff = _ref.pow_diff;
    }
    if (node_count == null) {
      node_count = 3;
    }
    if (block_round_count == null) {
      block_round_count = 4;
    }
    if (node_hashrate == null) {
      node_hashrate = 100;
    }
    if (pow_simulation_step == null) {
      pow_simulation_step = 100;
    }
    if (block_interval == null) {
      block_interval = 2000;
    }
    if (block_start_offset == null) {
      block_start_offset = -1000;
    }
    if (round_duration == null) {
      round_duration = 60 * 60 * 1000;
    }
    if (block_generation_duration_min == null) {
      block_generation_duration_min = 100;
    }
    if (block_generation_duration_max == null) {
      block_generation_duration_max = 500;
    }
    if (target_pow_count_per_round == null) {
      target_pow_count_per_round = 100;
    }
    if (pow_type_count == null) {
      pow_type_count = 4;
    }
    if (pow_diff == null) {
      pow_diff = 100 * node_hashrate * node_count;
    }
    window.rand_seed = 1;
    if (ts_max == null) {
      ts_max = round_duration * block_round_count;
    }
    round_delimiter_ts_list = [];
    for (idx = _i = 1; 1 <= block_round_count ? _i < block_round_count : _i > block_round_count; idx = 1 <= block_round_count ? ++_i : --_i) {
      round_delimiter_ts_list.push(round_duration * idx);
    }
    node_list = [];
    for (node_idx = _j = 0; 0 <= node_count ? _j < node_count : _j > node_count; node_idx = 0 <= node_count ? ++_j : --_j) {
      node_list.push(node = {
        title: "node " + (node_idx + 1),
        event_list: [],
        round_grouped_pow_list: []
      });
    }
    for (ts = _k = 0; pow_simulation_step > 0 ? _k < ts_max : _k > ts_max; ts = _k += pow_simulation_step) {
      round_idx = Math.floor(ts / round_duration);
      for (_l = 0, _len = node_list.length; _l < _len; _l++) {
        node = node_list[_l];
        curr_node_hashrate = node_hashrate;
        hash_count = pow_simulation_step * curr_node_hashrate / 1000;
        for (i = _m = 0; _m < hash_count; i = _m += 1) {
          if (rand_range(0, pow_diff) === 0) {
            node.event_list.push(curr_pow = {
              type: "tx_pow_mine",
              ts: ts,
              tx_pow_type: rand_range(0, 4)
            });
            if ((_base = node.round_grouped_pow_list)[round_idx] == null) {
              _base[round_idx] = [];
            }
            node.round_grouped_pow_list[round_idx].push(curr_pow);
          }
        }
      }
    }
    for (_n = 0, _len1 = node_list.length; _n < _len1; _n++) {
      node = node_list[_n];
      node.event_list.sort(function(a, b) {
        return a.ts - b.ts;
      });
    }
    return {
      ts: 0,
      ts_max: ts_max,
      round_delimiter_ts_list: round_delimiter_ts_list,
      node_list: node_list
    };
  };

}).call(this);
