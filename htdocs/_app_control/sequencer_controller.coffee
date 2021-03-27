class @Sequencer_controller
  com                   : null
  model                 : null
  $canvas_panel_fg      : null
  $textarea             : null
  scheme                : null
  node_color_list       : []
  
  play_state            : false
  
  canvas_controller: (canvas_hash)->
    if canvas_hash.panel_fg
      return if !@$canvas_panel_fg = $canvas_panel_fg = canvas_hash.panel_fg
      @redraw_panel_fg()
    
    return
  
  init: ()->
    # TODO scheme
    global_mouse_up.on "mouse_up", @global_mouse_up_handler = (e)=>
      @mouse_up e
    
    @scheme = new Keyboard_switchable_scheme
    @scheme.active_scheme.register "space",   (()=>@toggle_play()), description: "toggle play"
    
    fn = ()=>
      @model.ts = 0
      @refresh()
    
    @scheme.active_scheme.register "home", fn, description: "Go to start of video"
    
  
  delete : ()->
    global_mouse_up.off "mouse_up", @global_mouse_up_handler
    clearInterval @_animation_interval
  
  # ###################################################################################################
  #    panel_fg
  # ###################################################################################################
  has_redraw_changes_panel_fg: true
  # memoized old values
  left_panel_size_x : 1
  size_x : 1
  
  redraw_panel_fg : ()->
    return if !@has_redraw_changes_panel_fg
    @has_redraw_changes_panel_fg = false
    
    
    return if !@$canvas_panel_fg
    canvas = @$canvas_panel_fg
    ctx = canvas.getContext "2d"
    # WTF clear
    size_x = canvas.width  = canvas.width
    size_y = canvas.height = canvas.height
    
    @size_x = size_x
    
    ctx.strokeStyle = "#000"
    ctx.strokeRect 0.5, 0.5, 0.5-1+size_x, 0.5-1+size_y
    return if !@model
    # ###################################################################################################
    #    const
    # ###################################################################################################
    {ts} = @model
    
    # TODO pattern_ -> node_
    # L1
    pow_type_color = [
      "#00FFFF"
      "#0094FF"
      "#0026FF"
      # "#4800FF"
      "#B200FF"
      # "#FF00DC"
    ]
    pattern_bar_size_y = 20
    pad = 4
    # Прим я скорее потом эти иконки уберу, но пока пусть будут
    node_icon_count = pow_type_color.length
    node_icon_size  = 16
    node_icon_pad   = 2
    node_icon_pad_left = 4
    node_icon_offset_top = 3
    text_offset_top = -3
    bar_pad = 8
    ruler_pad = 20
    @left_panel_size_x = left_panel_size_x = 300
    
    # L2
    font_size_y = pattern_bar_size_y-pad
    font_size_x = font_size_y/1.8 # MAGIC number
    # +1 т.к. еще иконка цвета ноды
    left_panel_text_x = (node_icon_count+1)*(node_icon_size + node_icon_pad) + node_icon_pad_left
    
    pow_type_color_disabled = "#AAAAAA"
    
    node_state_list = []
    
    pow_blink_duration = 1000
    
    # ed_ts event delta timestamp
    
    filter_a_ts = ts - 1000
    filter_b_ts = ts
    for node, idx in @model.node_list
      node_state_list.push node_state =
        pow_icon_opacity : [0,0,0,0]
      for event in node.event_list
        continue if event.ts < filter_a_ts
        break    if event.ts > filter_b_ts
        switch event.type
          when "tx_pow_mine"
            ed_ts = Math.max 0, pow_blink_duration + event.ts - ts
            node_state.pow_icon_opacity[event.tx_pow_type] = ed_ts / pow_blink_duration
      
      node_state
    
    # ###################################################################################################
    #    left panel
    # ###################################################################################################
    ctx.fillStyle = "rgba(250,250,255,0.9)"
    ctx.strokeStyle = "#000"
    ctx.fillRect   0.5+1, 0.5+1, left_panel_size_x-1, size_y-2
    ctx.strokeRect 0.5+0, 0.5+0, left_panel_size_x-2, size_y-1
    
    
    # icons
    for node, idx in @model.node_list
      node_state = node_state_list[idx]
      
      y = 0.5 + idx * pattern_bar_size_y + node_icon_offset_top
      
      ctx.globalAlpha = 1
      for type_idx in [0 ... pow_type_color.length]
        ctx.fillStyle = pow_type_color_disabled
        x = type_idx*(node_icon_size + node_icon_pad) + node_icon_pad_left
        ctx.fillRect x, y, node_icon_size, node_icon_size
      
      for type_idx in [0 ... pow_type_color.length]
        ctx.globalAlpha = node_state.pow_icon_opacity[type_idx]
        ctx.fillStyle = pow_type_color[type_idx] # возможно чтобы меньше переключать цвета нужно перетасовать циклы
        x = type_idx*(node_icon_size + node_icon_pad) + node_icon_pad_left
        ctx.fillRect x, y, node_icon_size, node_icon_size
      
      ctx.globalAlpha = 1
      ctx.fillStyle = distinct_color_list[idx]
      x = pow_type_color.length*(node_icon_size + node_icon_pad) + node_icon_pad_left
      ctx.fillRect x, y, node_icon_size, node_icon_size
    
    ctx.fillStyle = "#000"
    ctx.strokeStyle = "rgba(0,0,0,0.3)"
    ctx.font = "#{font_size_y}px monospace"
    
    ctx.globalAlpha = 1
    # text
    for node, idx in @model.node_list
      # y  = 0.5 - 1 + Math.round pad + (node_icon_offset)*(pattern_bar_size_y+bar_pad) + font_size_y + ruler_pad
      y = 0.5 + -1 + (idx + 1) * pattern_bar_size_y + text_offset_top
      ctx.fillText node.title, left_panel_text_x, y
      
      delimiter_y = 4 + 0.5+Math.round y
      
      ctx.beginPath()
      ctx.moveTo 0, delimiter_y
      ctx.lineTo size_x, delimiter_y
      ctx.stroke()
      ctx.closePath()
    
    # ###################################################################################################
    #    tx_pow
    # ###################################################################################################
    for node, idx in @model.node_list
      for event in node.event_list
        break    if event.ts > filter_b_ts
        continue if event.type != "tx_pow_mine"
        
    
    # ###################################################################################################
    #    blocks
    # ###################################################################################################
    
    # ###################################################################################################
    #    vertical scrub
    # ###################################################################################################
    display_size_x = size_x - left_panel_size_x
    x = left_panel_size_x + (ts / @model.ts_max) * display_size_x
    x = 0.5+Math.round x
    
    ctx.strokeStyle = "#000"
    
    ctx.beginPath()
    ctx.moveTo x, 0.5+0
    ctx.lineTo x, 0.5-1+size_y
    ctx.stroke()
    
    x = size_x - pad
    y = font_size_y
    ctx.textAlign = "right"
    ctx.fillText "#{(ts/1000).toFixed 2}", x, y
    ctx.textAlign = "left"
    
    
    return
  
  
  refresh: (layer_name = "all")->
    switch layer_name
      when "panel_fg"
        @has_redraw_changes_panel_fg = true
      when "all"
        @has_redraw_changes_panel_fg = true
    
    @redraw_panel_fg()
    return
  
  # ###################################################################################################
  #    controls (direct handlers)
  # ###################################################################################################
  _is_mouse_down : false
  mouse_down : (event, layer_name)->
    {x,y} = rel_mouse_coords event
    
    switch layer_name
      when "panel_fg"
        @_is_mouse_down = true
        @seek x
  
  mouse_up   : (event, layer_name)->
    @_is_mouse_down = false
  
  mouse_move : (event, layer_name)->
    {x,y} = rel_mouse_coords event
    if @_is_mouse_down
      @seek x
    
    return
  
  key_down : (event)->
    @scheme.keypressed event.nativeEvent
  # ###################################################################################################
  #    L2 controls
  # ###################################################################################################
  _animation_interval : null
  start_ts : 0
  play : ()->
    @play_state = true
    @com.force_update()
    # TODO requestAnimationFrame
    if @model.ts == @model.ts_max
      @start_ts = Date.now()
    else
      @start_ts = Date.now() - @model.ts
    
    @_animation_interval = setInterval ()=>
      ts = Date.now() - @start_ts
      if ts >= @model.ts_max
        ts = @model.ts_max
        @stop() # redraw final frame and stop
      
      @model.ts = ts
      
      @refresh()
    , 10
  
  stop : ()->
    @play_state = false
    @com.force_update()
    clearInterval @_animation_interval
  
  toggle_play : ()->
    if @play_state
      @stop()
    else
      @play()
  
  seek : (x)->
    {size_x, left_panel_size_x} = @
    display_size_x = size_x - left_panel_size_x
    t = (x - left_panel_size_x) / display_size_x
    t = Math.max 0, t
    t = Math.min 1, t
    ts = t * @model.ts_max
    @model.ts = ts
    
    @refresh()
  