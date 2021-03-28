module.exports =
  mount : ()->
    route_list = [
      ""
      "sandbox"
    ]
    window.route2com_hash =
      ""              : {com:"Page_samples",      title:"Samples"}
      "sandbox"       : {com:"Page_sandbox",      title:"Sandbox"}
    window.map_hash = {}
    for route in route_list # proper order
      v = route2com_hash[route]
      window.map_hash[v.com] = v.title
    
  render : ()->
    Router_multi {
      render : (hash)=>
        @path = path = hash[""]?.path or ""
        if com = window.route2com_hash[path]
          window[com.com] {}
        else
          div "404"
    }
