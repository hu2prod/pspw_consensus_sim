(function() {
  window.scenario_gen = function(opt) {
    var block_count_per_round, block_generation_duration_max, block_generation_duration_min, block_idx, block_in_round_idx, block_interval, block_round_count, block_schedule_list, block_schedule_list_per_round_list, block_start_offset, curr_node_hashrate, curr_pow, curr_round_pow_tx_list, hash_count, i, idx, last_block_ts, node, node_count, node_hashrate, node_idx, node_list, node_sort_list, pow_diff, pow_simulation_step, pow_type_count, round_delimiter_ts_list, round_duration, round_idx, save_seed, sort_list, target_pow_count_per_round, total_curr_round_vote_power, total_prev_round_vote_power, total_round_vote_power, ts, ts_max, tx_pow_list, _base, _i, _j, _k, _l, _len, _len1, _len10, _len2, _len3, _len4, _len5, _len6, _len7, _len8, _len9, _m, _n, _o, _p, _q, _r, _ref, _ref1, _s, _t, _u, _v, _w, _x, _y;
    if (opt == null) {
      opt = {};
    }
    node_count = opt.node_count, ts_max = opt.ts_max, block_round_count = opt.block_round_count, node_hashrate = opt.node_hashrate, pow_simulation_step = opt.pow_simulation_step;
    if (opt.blockchain) {
      _ref = opt.blockchain, block_interval = _ref.block_interval, block_start_offset = _ref.block_start_offset, round_duration = _ref.round_duration, block_generation_duration_min = _ref.block_generation_duration_min, block_generation_duration_max = _ref.block_generation_duration_max, target_pow_count_per_round = _ref.target_pow_count_per_round, pow_type_count = _ref.pow_type_count, pow_diff = _ref.pow_diff;
    }
    if (node_count == null) {
      node_count = 20;
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
      pow_diff = 10 * node_hashrate * node_count;
    }
    block_count_per_round = Math.floor(round_duration / block_interval);
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
    block_schedule_list_per_round_list = [];
    block_schedule_list = [];
    for (i = _k = 0; 0 <= block_count_per_round ? _k < block_count_per_round : _k > block_count_per_round; i = 0 <= block_count_per_round ? ++_k : --_k) {
      block_schedule_list.push([0]);
    }
    block_schedule_list_per_round_list.push(block_schedule_list);
    for (idx = _l = 0, _len = node_list.length; _l < _len; idx = ++_l) {
      node = node_list[idx];
      node.curr_round_vote_power = 0;
      node.id = idx;
    }
    node_list[0].curr_round_vote_power = 1;
    round_idx = 0;
    block_in_round_idx = 0;
    last_block_ts = -Infinity;
    curr_round_pow_tx_list = [];
    for (ts = _m = 0; pow_simulation_step > 0 ? _m < ts_max : _m > ts_max; ts = _m += pow_simulation_step) {
      for (node_idx = _n = 0, _len1 = node_list.length; _n < _len1; node_idx = ++_n) {
        node = node_list[node_idx];
        curr_node_hashrate = node_hashrate;
        hash_count = pow_simulation_step * curr_node_hashrate / 1000;
        for (i = _o = 0; _o < hash_count; i = _o += 1) {
          if (rand_range(0, pow_diff) === 0) {
            node.event_list.push(curr_pow = {
              type: "tx_pow_mine",
              ts: ts,
              tx_pow_type: rand_range(0, 4),
              source_idx: node_idx
            });
            if ((_base = node.round_grouped_pow_list)[round_idx] == null) {
              _base[round_idx] = [];
            }
            node.round_grouped_pow_list[round_idx].push(curr_pow);
            curr_round_pow_tx_list.push(curr_pow);
          }
        }
      }
      if (ts - last_block_ts > block_interval) {
        last_block_ts = ts;
        node_idx = block_schedule_list[block_in_round_idx++][0];
        node = node_list[node_idx];
        tx_pow_list = [];
        tx_pow_list.append(curr_round_pow_tx_list);
        curr_round_pow_tx_list.clear();
        node.event_list.push({
          type: "block",
          ts: ts,
          tx_pow_list: tx_pow_list
        });
      }
      if (block_in_round_idx >= block_count_per_round) {
        block_in_round_idx = 0;
        curr_round_pow_tx_list = [];
        for (_p = 0, _len2 = node_list.length; _p < _len2; _p++) {
          node = node_list[_p];
          node.prev_round_vote_power = node.curr_round_vote_power;
          node.curr_round_vote_power = ((_ref1 = node.round_grouped_pow_list[round_idx]) != null ? _ref1 : []).length;
        }
        total_curr_round_vote_power = 0;
        total_prev_round_vote_power = 0;
        for (_q = 0, _len3 = node_list.length; _q < _len3; _q++) {
          node = node_list[_q];
          total_curr_round_vote_power += node.curr_round_vote_power;
          total_prev_round_vote_power += node.prev_round_vote_power;
        }
        if (total_curr_round_vote_power === 0) {
          for (_r = 0, _len4 = node_list.length; _r < _len4; _r++) {
            node = node_list[_r];
            node.next_round_vote_power = node.prev_round_vote_power;
          }
          total_round_vote_power = total_prev_round_vote_power;
        } else {
          for (_s = 0, _len5 = node_list.length; _s < _len5; _s++) {
            node = node_list[_s];
            node.next_round_vote_power = node.curr_round_vote_power;
          }
          total_round_vote_power = total_curr_round_vote_power;
        }
        save_seed = window.rand_seed;
        window.rand_seed = round_idx;
        block_schedule_list = [];
        for (block_idx = _t = 0; 0 <= block_count_per_round ? _t < block_count_per_round : _t > block_count_per_round; block_idx = 0 <= block_count_per_round ? ++_t : --_t) {
          node_sort_list = node_list.clone();
          for (_u = 0, _len6 = node_sort_list.length; _u < _len6; _u++) {
            node = node_sort_list[_u];
            node.roll = rand_range(0, 1024 * 1024) * node.next_round_vote_power;
          }
          node_sort_list.sort(function(a, b) {
            return -(a.roll - b.roll) || (a.id - b.id);
          });
          block_schedule_list.push(sort_list = []);
          for (_v = 0, _len7 = node_sort_list.length; _v < _len7; _v++) {
            node = node_sort_list[_v];
            sort_list.push(node.id);
          }
        }
        for (_w = 0, _len8 = node_list.length; _w < _len8; _w++) {
          node = node_list[_w];
          rand_range;
        }
        for (_x = 0, _len9 = node_list.length; _x < _len9; _x++) {
          node = node_list[_x];
          node.curr_round_vote_power = node.next_round_vote_power;
        }
        window.rand_seed = save_seed;
        block_schedule_list_per_round_list.push(block_schedule_list);
        round_idx++;
      }
    }
    for (_y = 0, _len10 = node_list.length; _y < _len10; _y++) {
      node = node_list[_y];
      node.event_list.sort(function(a, b) {
        return a.ts - b.ts;
      });
    }
    return {
      ts: 0,
      ts_max: ts_max,
      round_delimiter_ts_list: round_delimiter_ts_list,
      node_list: node_list,
      block_schedule_list_per_round_list: block_schedule_list_per_round_list
    };
  };

}).call(this);
