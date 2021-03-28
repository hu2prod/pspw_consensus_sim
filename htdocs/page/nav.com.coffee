module.exports =
  render : ()->
    Tab_bar {
      value : @props.com.name
      hash  : window.map_hash
      on_change : (t)=>
        for k,v of window.route2com_hash
          if v.com == t
            route_go k
        return
      btn_style :
        fontSize  : 20
    }
