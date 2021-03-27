module.exports =
  state:
    scenario_selected_idx : 0
  
  mount : ()->
    scenario = scenario_gen()
    @scenario_list = [
      {
        title : "Сороконожка"
        value : scenario
        pref_set : {}
      }
      {
        title : "Ужас летящий на крыльях ночи"
        value : scenario
        pref_set :
          autotrack         : true
          mode_hide_future  : true
          zoom              : 40
          autoplay          : true
      }
      {
        title : "Ну можно же нормальную валидацию"
        value : scenario
        pref_set :
          speed_scale       : 20
          ts                : 2.05*60*60*1000
          autotrack         : true
          mode_hide_future  : true
          zoom              : 40
          autoplay          : true
      }
      {
        title : "3 блока не считая собаки"
        value : scenario_sample
        pref_set :
          speed_scale : 1
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
            scenario_set = @scenario_list[@state.scenario_selected_idx]
            Sequencer_panel {
              value   : scenario_set.value
              pref_set: scenario_set.pref_set
              height  : 500
            }
