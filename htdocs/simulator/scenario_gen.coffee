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
  node_count ?= 20
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
  # pow_diff       ?= 100*node_hashrate*node_count
  pow_diff       ?= 10*node_hashrate*node_count
  
  block_count_per_round = round_duration // block_interval
  # ###################################################################################################
  #    logical
  # ###################################################################################################
  window.rand_seed = 1
  ts_max ?= round_duration*block_round_count
  
  round_delimiter_ts_list = []
  
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
  
  block_schedule_list_per_round_list = []
  
  # расписание поездов по умолчанию
  # только node 1 генерирует
  block_schedule_list = []
  for i in [0 ... block_count_per_round]
    block_schedule_list.push [0]
  
  block_schedule_list_per_round_list.push block_schedule_list
  
  for node, idx in node_list
    node.curr_round_vote_power = 0
    node.id = idx
  node_list[0].curr_round_vote_power = 1
  
  round_idx = 0
  block_in_round_idx = 0
  last_block_ts = -Infinity
  curr_round_pow_tx_list = []
  
  for ts in [0 ... ts_max] by pow_simulation_step
    for node, node_idx in node_list
      curr_node_hashrate = node_hashrate
      
      hash_count = pow_simulation_step*curr_node_hashrate / 1000
      for i in [0 ... hash_count] by 1
        if rand_range(0, pow_diff) == 0
          node.event_list.push curr_pow = {
            type : "tx_pow_mine"
            ts
            tx_pow_type : rand_range(0, 4) # странная логика, но пускай будет так для красоты
            source_idx  : node_idx
          }
          node.round_grouped_pow_list[round_idx] ?= []
          node.round_grouped_pow_list[round_idx].push curr_pow
          curr_round_pow_tx_list.push curr_pow
    
    # it's time for block?
    # if ts - last_block_ts > block_interval + block_start_offset
    if ts - last_block_ts > block_interval
      last_block_ts = ts
      # TODO тут сложнее, тут надо чтобы все начинали делать выпуск
      # каждая следующая в очереди через 100 ms после предыдущей
      node_idx = block_schedule_list[block_in_round_idx++][0] # главная нода
      node = node_list[node_idx]
      tx_pow_list = []
      
      tx_pow_list.append curr_round_pow_tx_list
      curr_round_pow_tx_list.clear()
      
      node.event_list.push {
        type : "block"
        ts
        tx_pow_list
      }
    
    # более правильный вариант по количеству блоков, но для демки пока пофиг
    # if it's time to generate block - generate block
    if block_in_round_idx >= block_count_per_round
      round_delimiter_ts_list.push ts
      block_in_round_idx = 0
      curr_round_pow_tx_list = [] # а эти в пролёте и TODO их надо исключить из round_grouped_pow_list
      # ###################################################################################################
      #    генерация расписания поездов
      # ###################################################################################################
      # old_block_schedule_list = block_schedule_list
      for node in node_list
        node.prev_round_vote_power = node.curr_round_vote_power
        node.curr_round_vote_power = (node.round_grouped_pow_list[round_idx] ? []).length
      
      total_curr_round_vote_power = 0
      total_prev_round_vote_power = 0
      
      for node in node_list
        total_curr_round_vote_power += node.curr_round_vote_power
        total_prev_round_vote_power += node.prev_round_vote_power
      
      # защита от застревания блокчейна
      if total_curr_round_vote_power == 0
        # taking from prev_round_vote_power
        for node in node_list
          node.next_round_vote_power = node.prev_round_vote_power
        total_round_vote_power = total_prev_round_vote_power
      else
        for node in node_list
          node.next_round_vote_power = node.curr_round_vote_power
        total_round_vote_power = total_curr_round_vote_power
      
      save_seed = window.rand_seed # HACK
      window.rand_seed = round_idx # может даже так лучше, чем какой-то источник энтропии
      
      
      block_schedule_list = []
      for block_idx in [0 ... block_count_per_round]
        node_sort_list = node_list.clone()
        for node in node_sort_list
          node.roll = rand_range(0, 1024*1024)*node.next_round_vote_power
        
        # id на случай выпадения одинаковых roll'ов (в реальном БЧ берется с адреса валидатора)
        node_sort_list.sort (a,b)->-(a.roll-b.roll) or (a.id - b.id) # DESC
        
        block_schedule_list.push sort_list = []
        for node in node_sort_list
          sort_list.push node.id
        
      for node in node_list
        rand_range
      
      for node in node_list
        node.curr_round_vote_power = node.next_round_vote_power
      
      window.rand_seed = save_seed # HACK
      block_schedule_list_per_round_list.push block_schedule_list
      
      round_idx++
  
  
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
    block_schedule_list_per_round_list
  }