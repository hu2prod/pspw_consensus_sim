module.exports =
  state:
    scenario_selected_idx : 0
  
  mount : ()->
    @scenario_list = [
      {
        title : "Scenario mining 4 rounds"
        value : scenario_gen()
      }
      {
        title : "Scenario sample"
        value : scenario_sample
      }
    ]
    
  render : ()->
    table {
      style:
        width : "100%"
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
                for scenario, scenario_idx in @scenario_list
                  do (scenario, scenario_idx)=>
                    _class = ""
                    _class = "selected" if scenario_idx == @state.scenario_selected_idx
                    tr {
                      class : _class
                      style :
                        cursor : "pointer"
                      on_click : ()=>
                        @set_state scenario_selected_idx : scenario_idx
                    }
                      td scenario.title
          td {
            style:
              verticalAlign : "top"
          }
            Sequencer_panel {
              value : @scenario_list[@state.scenario_selected_idx].value
            }
