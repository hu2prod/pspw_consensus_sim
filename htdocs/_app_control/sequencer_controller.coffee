class @Sequencer_controller
  com                   : null
  model                 : null
  $canvas_panel_fg      : null
  $textarea             : null
  scheme                : null
  node_color_list       : []
  
  play_state            : false
  # mode_hide_future      : true
  mode_hide_future      : false
  display_block         : true
  display_tx_pow        : true
  display_tx_pow_src_lines : true
  speed_scale           : 100
  show_help             : false
  speed_step            : 0.1
  
  zoom                  : 1
  offset_x              : 0 # mouse coord (НЕ grid)
  zoom_mult_wheel       : 1.2
  zoom_mult_keyb        : 1.2
  
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
    
    @scheme.active_scheme.register "home", fn, description: "Go to start"
    
    fn = ()=>
      @show_help = !@show_help
      @com.force_update()
    @scheme.active_scheme.register "f1", fn, description: "toggle help"
    
    rel_speed = (step)=>
      new_speed = +(@speed_scale + step).toFixed(2)
      if new_speed > 0
        @speed_scale_set new_speed
    
    @scheme.active_scheme.register "num_plus",  (()=>rel_speed(+@speed_step)), description: "increase speed"
    @scheme.active_scheme.register "num_minus", (()=>rel_speed(-@speed_step)), description: "decrease speed"
    
    
    rel_ts = (diff)=>
      @ts_set @model.ts + diff
      @refresh()
    
    @scheme.active_scheme.register "left",  (()=>rel_ts(-60000)),  description: "-1 min"
    @scheme.active_scheme.register "right", (()=>rel_ts(+60000)),  description: "+1 min"
    @scheme.active_scheme.register "comma", (()=>rel_ts( -1000)),  description: "-1 sec"
    @scheme.active_scheme.register "dot",   (()=>rel_ts( +1000)),  description: "+1 sec"
    
    # TODO zoom_in, zoom_out
    
  
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
    {ts, ts_max} = @model
    {
      offset_x
      zoom
    } = @
    
    # L1
    block_color = "#AAFFAA"
    block_drop_color = "#AAAAAA"
    pow_type_color = [
      "#00FFFF"
      "#0094FF"
      "#0026FF"
      # "#4800FF"
      "#B200FF"
      # "#FF00DC"
    ]
    node_bar_size_y = 20
    pad = 4
    # Прим я скорее потом эти иконки уберу, но пока пусть будут
    node_icon_count = pow_type_color.length
    node_icon_size  = 16
    node_icon_size_timeline = 4
    node_icon_pad   = 2
    node_icon_pad_left = 3
    node_icon_offset_top = 3
    
    # внутри блока
    node_icon2_size  = 10
    node_icon2_pad   = 4
    node_icon2_offset_left = 3
    node_icon2_offset_top = 3
    
    text_offset_top = -3
    bar_pad = 8
    ruler_pad = 20
    @left_panel_size_x = left_panel_size_x = 300
    
    # L2
    node_icon2_size_2 = node_icon2_size/2
    block_size_x= node_icon_count*(node_icon2_size + node_icon2_pad) + 3
    font_size_y = node_bar_size_y-pad
    font_size_x = font_size_y/1.8 # MAGIC number
    # +1 т.к. еще иконка цвета ноды
    left_panel_text_x = (node_icon_count+1)*(node_icon_size + node_icon_pad) + node_icon_pad_left
    display_size_x = size_x - left_panel_size_x
    
    pow_type_color_disabled = "#AAAAAA"
    
    node_state_list = []
    
    pow_blink_duration = 1000 * @speed_scale
    
    # ed_ts event delta timestamp
    
    filter_a_ts = ts - 1000 * @speed_scale
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
    #    tx_pow
    # ###################################################################################################
    if @display_tx_pow
      for node, node_idx in @model.node_list
        y = 0.5 + (node_idx+1) * node_bar_size_y + node_icon_offset_top
        for event in node.event_list
          if @mode_hide_future
            break    if event.ts > filter_b_ts
          continue if event.type != "tx_pow_mine"
          
          t = event.ts / ts_max
          x = display_size_x * t
          x = 0.5 + left_panel_size_x + Math.round x*zoom + offset_x
          ctx.fillStyle = pow_type_color[event.tx_pow_type]
          ctx.fillRect x, y, node_icon_size_timeline, node_icon_size
    
    # ###################################################################################################
    #    blocks
    # ###################################################################################################
    if @display_block
      for node, node_idx in @model.node_list
        y = 0.5 + (node_idx+1) * node_bar_size_y + node_icon_offset_top
        for event, event_idx in node.event_list
          if @mode_hide_future
            break    if event.ts > filter_b_ts
          continue if event.type != "block"
          
          block_drop_ts = null
          # немного калично, но всё же
          for future_event_idx in [event_idx+1 ... node.event_list.length] by 1
            future_event = node.event_list[future_event_idx]
            break if future_event.type == "block" # not hide
            if future_event.type == "block_drop"
              if future_event.ts < filter_b_ts
                block_drop_ts = future_event.ts
          
          t = event.ts / ts_max
          x = display_size_x * t
          x = 0.5 + left_panel_size_x + Math.round x*zoom + offset_x
          ctx.fillStyle = if block_drop_ts? then block_drop_color else block_color
          
          ctx.strokeStyle = "#000"
          ctx.fillRect    x, y, block_size_x, node_icon_size
          ctx.strokeRect  x, y, block_size_x, node_icon_size
          
          x += node_icon2_offset_left
          y += node_icon2_offset_top
          
          for tx_pow in event.tx_pow_list
            
            if @display_tx_pow_src_lines and tx_pow.source_idx != node_idx
              ctx.beginPath()
              ctx.moveTo x+node_icon2_size_2, y+node_icon2_size_2
              ctx.lineTo x+node_icon2_size_2, y+(node_bar_size_y * (tx_pow.source_idx - node_idx))
              ctx.stroke()
              ctx.closePath()
            
            ctx.fillStyle = pow_type_color[tx_pow.tx_pow_type]
            ctx.fillRect    x, y, node_icon2_size, node_icon2_size
            ctx.strokeRect  x, y, node_icon2_size, node_icon2_size
            
            x += node_icon2_size + node_icon2_pad
          
          if block_drop_ts
            t = block_drop_ts / ts_max
            x = display_size_x * t
            x = 0.5 + left_panel_size_x + Math.round x*zoom + offset_x
            ctx.beginPath()
            x_a = x
            y_a = y
            x_b = x+node_icon2_size
            y_b = y+node_icon2_size
            
            ctx.moveTo x_a, y_a
            ctx.lineTo x_b, y_b
            ctx.moveTo x_a, y_b
            ctx.lineTo x_b, y_a
            ctx.stroke()
            ctx.closePath()
          
    # ###################################################################################################
    #    round_delimiter_ts_list
    # ###################################################################################################
    ctx.textAlign = "right"
    round_id = 0
    for delimiter_ts, idx in @model.round_delimiter_ts_list
      round_id++ if delimiter_ts < ts
      x = (delimiter_ts / ts_max) * display_size_x
      x = 0.5 + left_panel_size_x + Math.round x*zoom + offset_x
      ctx.strokeStyle = "#F00"
      ctx.beginPath()
      ctx.moveTo x, 0.5+0
      ctx.lineTo x, 0.5-1+size_y
      ctx.stroke()
      
      y = 0.5+font_size_y
      ctx.fillStyle = "#F00"
      ctx.fillText "round \##{idx+1} ", x, y
    
    
    # ###################################################################################################
    #    left panel
    # ###################################################################################################
    ctx.fillStyle = "rgba(250,250,255,0.9)"
    ctx.strokeStyle = "#000"
    ctx.fillRect   0.5+1, 0.5+1, left_panel_size_x-1, size_y-2
    ctx.strokeRect 0.5+0, 0.5+0, left_panel_size_x-2, size_y-1
    ctx.textAlign = "left"
    
    # icons
    for node, node_idx in @model.node_list
      node_state = node_state_list[node_idx]
      
      y = 0.5 + (node_idx+1) * node_bar_size_y + node_icon_offset_top
      
      ctx.globalAlpha = 1
      for type_idx in [0 ... pow_type_color.length]
        ctx.fillStyle = pow_type_color_disabled
        x = 0.5 + type_idx*(node_icon_size + node_icon_pad) + node_icon_pad_left
        ctx.fillRect x, y, node_icon_size, node_icon_size
      
      for type_idx in [0 ... pow_type_color.length]
        ctx.globalAlpha = node_state.pow_icon_opacity[type_idx]
        ctx.fillStyle = pow_type_color[type_idx] # возможно чтобы меньше переключать цвета нужно перетасовать циклы
        x = 0.5 + type_idx*(node_icon_size + node_icon_pad) + node_icon_pad_left
        ctx.fillRect x, y, node_icon_size, node_icon_size
      
      ctx.globalAlpha = 1
      ctx.fillStyle = distinct_color_list[node_idx]
      x = pow_type_color.length*(node_icon_size + node_icon_pad) + node_icon_pad_left
      ctx.fillRect x, y, node_icon_size, node_icon_size
    
    ctx.fillStyle = "#000"
    ctx.strokeStyle = "rgba(0,0,0,0.3)"
    ctx.font = "#{font_size_y}px monospace"
    
    ctx.globalAlpha = 1
    # text
    for node, node_idx in @model.node_list
      # y  = 0.5 - 1 + Math.round pad + (node_icon_offset)*(node_bar_size_y+bar_pad) + font_size_y + ruler_pad
      y = 0.5 + -1 + (node_idx + 2) * node_bar_size_y + text_offset_top
      ctx.fillText node.title, left_panel_text_x, y
      
      delimiter_y = 4 + 0.5+Math.round y
      # bottom line
      ctx.beginPath()
      ctx.moveTo 0, delimiter_y
      ctx.lineTo size_x, delimiter_y
      ctx.stroke()
      ctx.closePath()
    
    # top line
    y = 0.5 + -1 + 1 * node_bar_size_y + text_offset_top
    delimiter_y = 4 + 0.5+Math.round y
    
    ctx.beginPath()
    ctx.moveTo 0, delimiter_y
    ctx.lineTo size_x, delimiter_y
    ctx.stroke()
    ctx.closePath()
    
    # ###################################################################################################
    #    vertical scrub
    # ###################################################################################################
    x = (ts / ts_max) * display_size_x
    x = 0.5 + left_panel_size_x +  Math.round x*zoom + offset_x
    
    ctx.strokeStyle = "#000"
    ctx.fillStyle = "#000"
    
    ctx.beginPath()
    ctx.moveTo x, 0.5+0
    ctx.lineTo x, 0.5-1+size_y
    ctx.stroke()
    
    x = 0.5+size_x - pad
    y = 0.5+font_size_y
    
    ts = Math.round ts
    time_str = tsd_fmt ts, "hh:MM:SS.ms"
    ctx.textAlign = "right"
    ctx.fillText "round \##{round_id+1} #{time_str}", x, y
    
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
  _mouse_mode : "none"
  
  mouse_down : (event, layer_name)->
    {x:mx,x:my} = rel_mouse_coords event
    {x:gx,y:gy} = @get_grid_coord mx, my
    
    switch layer_name
      when "panel_fg"
        switch event.nativeEvent.which
          when 1 # left
            @_mouse_mode = "seek"
          when 2 # wheel
            @_mouse_mode = "drag"
        
        @seek gx
  
  mouse_up   : (event, layer_name)->
    @_mouse_mode = "none"
  
  _last_mouse_event_x : 0
  _last_mouse_event_y : 0
  _last_grid_x : 0
  _last_grid_y : 0
  mouse_move : (event, layer_name)->
    {x:mx,y:my} = rel_mouse_coords event
    {x:gx,y:gy} = @get_grid_coord mx, my
    # puts "move", gx, gy
    switch @_mouse_mode
      when "seek"
        @seek gx
      when "drag"
        @offset_x += mx - @_last_mouse_event_x
        @refresh()
    
    @_last_mouse_event_x = mx
    @_last_mouse_event_y = my
    @_last_grid_x = gx
    @_last_grid_y = gy
    return
  
  mouse_wheel : (e)->
    if e.deltaY < 0
      @zoom_adjust @zoom_mult_wheel
    else
      @zoom_adjust 1/@zoom_mult_wheel
    return
  
  key_down : (event)->
    @scheme.keypressed event.nativeEvent
  
  # ###################################################################################################
  #    L2 controls
  # ###################################################################################################
  _animation_interval : null
  start_ts : 0
  
  ts_set : (ts)->
    ts = Math.round ts
    ts = Math.max 0, ts
    ts = Math.min @model.ts_max, ts
    @model.ts = ts
    @start_ts = Date.now() - @model.ts/@speed_scale
  
  play : ()->
    clearInterval @_animation_interval if @_animation_interval
    @play_state = true
    @com.force_update()
    
    if @model.ts == @model.ts_max
      @start_ts = Date.now()
    else
      @ts_set @model.ts
    
    # TODO requestAnimationFrame
    @_animation_interval = setInterval ()=>
      ts = (Date.now() - @start_ts)*@speed_scale
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
    @_animation_interval = null
  
  toggle_play : ()->
    if @play_state
      @stop()
    else
      @play()
  
  seek : (gx)->
    {size_x, left_panel_size_x} = @
    display_size_x = (size_x - left_panel_size_x)
    t = (gx - @offset_x/@zoom)  / display_size_x
    t = Math.max 0, t
    t = Math.min 1, t
    ts = t * @model.ts_max
    @ts_set ts
    @refresh()
  
  speed_scale_set : (speed_scale)->
    @speed_scale = speed_scale
    @ts_set @model.ts
    @com.force_update()
  
  get_grid_coord : (x = @_last_mouse_event_x, y = @_last_mouse_event_y)->
    ret = {
      x : (x - @left_panel_size_x)/@zoom
      # y : y/@zoom*devicePixelRatio
      y
    }
  
  zoom_in : ()->
    @zoom_adjust @zoom_mult_keyb
    return
  
  zoom_out : ()->
    @zoom_adjust 1/@zoom_mult_keyb
    return
  
  zoom_adjust : (mult)->
    gx_1 = (@_last_mouse_event_x - @left_panel_size_x - @offset_x)/@zoom
    
    @zoom *= mult
    
    @offset_x = @_last_mouse_event_x - @left_panel_size_x - gx_1*@zoom
    
    @refresh()
    return
  