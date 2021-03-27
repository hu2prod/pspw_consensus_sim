module.exports =
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
          }
            scenario_list = [
              {
                title: "Scenario mining 4 rounds"
              }
            ]
            table {class : "table"}
              tbody
                for v in scenario_list
                  tr # TODO on_click
                    td v.title
          td
            Sequencer_panel {}
