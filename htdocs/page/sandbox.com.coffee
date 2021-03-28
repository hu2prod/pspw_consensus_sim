module.exports =
  state:
    node_count          : 20
    block_round_count   : 4
    node_hashrate       : 100
    pow_simulation_step : 100
    block_interval                : 2000
    block_start_offset            : -1000
    round_duration                : 60*60*1000
    
    
    # block_generation_duration_min
    # block_generation_duration_max
    target_pow_count_per_round    : 100
    
    
    # pow_type_count                : 4
    pow_diff                      : 10*100*20
    
    in_progress : false
  
  scenario : null
  mount : ()->
    @scenario = scenario_gen @state
  
  refresh : ()->
    @set_state in_progress:true
    await setTimeout defer(), 10
    
    val = clone @state
    val.blockchain = val # ЛЕНЬ
    
    @scenario = scenario_gen val
    @set_state in_progress:false
  
  render : ()->
    Page_wrap {
      com   : @
      # title : "Editor"
    }
      table {
        style:
          width     : "100%"
          textAlign : "left"
      }
        tbody
          tr
            td {
              style:
                width : 300
                verticalAlign : "top"
            }
              table {class : "table"}
                tbody
                  number_param_gen = (name)=>
                    tr
                      td name
                      td Number_input bind2 @, name
                  
                  number_param_gen "node_count"
                  number_param_gen "block_round_count"
                  number_param_gen "node_hashrate"
                  number_param_gen "pow_simulation_step"
                  
                  number_param_gen "block_interval"
                  number_param_gen "block_start_offset"
                  number_param_gen "round_duration"
                  
                  number_param_gen "target_pow_count_per_round"
                  number_param_gen "pow_diff"
                  
                  tr
                    td {colSpan : 2}
                      Button {
                        label : "Regenerate"
                        on_click : ()=>@refresh()
                        style :
                          width : "100%"
                      }
                  if @state.in_progress
                    tr
                      td {
                        colSpan : 2
                      }
                        Spinner {}
            td {
              style:
                verticalAlign : "top"
            }
              Sequencer_panel {
                value   : @scenario
                height  : 500
              }
