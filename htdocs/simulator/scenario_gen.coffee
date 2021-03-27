window.scenario_gen = (opt = {})->
  {
    node_count
    ts_max
    block_round_count
    node_hashrate
    pow_simulation_step
  } = opt
  if opt.blockchain
    {
      block_interval
      block_start_offset
      round_duration
      
      
      block_generation_duration_min
      block_generation_duration_max
      target_pow_count_per_round
      
      
      pow_type_count
      pow_diff
    } = opt.blockchain
  node_count ?= 3
  block_round_count ?= 4
  node_hashrate ?= 100
  pow_simulation_step ?= 100
  
  
  block_interval    ?= 2000
  block_start_offset?= -1000
  
  round_duration ?= 60*60*1000
  
  block_generation_duration_min ?= 100
  block_generation_duration_max ?= 500
  target_pow_count_per_round    ?= 100
  
  pow_type_count ?= 4
  # тут проблема что target_pow_count_per_round это каждой, а мы разбрасываем
  pow_diff       ?= 100*node_hashrate*node_count
  
  # ###################################################################################################
  #    logical
  # ###################################################################################################
  window.rand_seed = 1
  ts_max ?= round_duration*block_round_count
  
  round_delimiter_ts_list = []
  for idx in [1 ... block_round_count]
    round_delimiter_ts_list.push round_duration*idx
  
  # ###################################################################################################
  #    physical
  # ###################################################################################################
  node_list = []
  for node_idx in [0 ... node_count]
    node_list.push node = {
      title      : "node #{node_idx+1}"
      event_list : []
      round_grouped_pow_list : []
    }
    # TODO node hashrate for each pow
  
  # ###################################################################################################
  #    simulate pow
  # ###################################################################################################
  
  for ts in [0 ... ts_max] by pow_simulation_step
    round_idx = ts//round_duration
    for node in node_list
      curr_node_hashrate = node_hashrate
      
      hash_count = pow_simulation_step*curr_node_hashrate / 1000
      for i in [0 ... hash_count] by 1
        if rand_range(0, pow_diff) == 0
          node.event_list.push curr_pow = {
            type : "tx_pow_mine"
            ts
            tx_pow_type : rand_range(0, 4) # странная логика, но пускай будет так для красоты
          }
          node.round_grouped_pow_list[round_idx] ?= []
          node.round_grouped_pow_list[round_idx].push curr_pow
  
  # ###################################################################################################
  #    генерация расписания поездов
  # ###################################################################################################
  
  
  # ###################################################################################################
  #    finalize
  # ###################################################################################################
  for node in node_list
    node.event_list.sort (a,b)->a.ts - b.ts
  
  
  
  {
    ts      : 0
    ts_max
    round_delimiter_ts_list
    node_list
    # [
    #   {
    #     title : "Node 1"
    #     event_list : [
    #       {
    #         type : "block"
    #         ts   : 0
    #         tx_pow_list : []
    #       }
    #       {
    #         type : "tx_pow_mine"
    #         ts   : 100
    #         tx_pow_type : 1
    #       }
    #       {
    #         type : "tx_pow_mine"
    #         ts   : 500
    #         tx_pow_type : 3
    #       }
    #       {
    #         type : "block"
    #         ts   : 4000
    #         tx_pow_list : []
    #       }
    #     ]
    #   }
    #   {
    #     title : "Node 2"
    #     event_list : [
    #       {
    #         type : "tx_pow_mine"
    #         ts   : 200
    #         tx_pow_type : 2
    #       }
    #       {
    #         type : "tx_pow_mine"
    #         ts   : 800
    #         tx_pow_type : 0
    #       }
    #       {
    #         type : "block"
    #         ts   : 2000
    #         tx_pow_list : [  # edge case
    #           {
    #             tx_pow_type : 0
    #             source_idx  : 1
    #           }
    #           {
    #             tx_pow_type : 1
    #             source_idx  : 0
    #           }
    #           {
    #             tx_pow_type : 2
    #             source_idx  : 1
    #           }
    #           {
    #             tx_pow_type : 3
    #             source_idx  : 0
    #           }
    #         ]
    #       }
    #     ]
    #   }
    #   {
    #     title : "Node 3"
    #     event_list : [
    #       {
    #         type : "block"
    #         ts   : 100
    #         tx_pow_list : []
    #       }
    #       {
    #         type : "block_drop"
    #         ts   : 400
    #         tx_pow_list : []
    #       }
    #     ]
    #   }
    # ]
  }