module.exports =
  mount : ()->
    @controller = new Sequencer_controller
    @controller.com = @
    @controller.model = @props.value
    obj_set @controller, @props.pref_set
  
  props_change : (new_props)->
    if new_props.value != @props.value
      @controller.model = new_props.value
    
    if new_props.pref_set != @props.pref_set
      @controller.offset_x = 0
      
      new_props.pref_set.mode_hide_future ?= false
      new_props.pref_set.autotrack    ?= false
      new_props.pref_set.speed_scale  ?= 100
      new_props.pref_set.zoom         ?= 1
      
      obj_set @controller, new_props.pref_set
      
      @controller.ts_set new_props.pref_set.ts ? 0
      
      if new_props.pref_set.autoplay
        @controller.play()
      else
        @controller.stop()
      
    
    @controller.refresh()
  
  render : ()->
    size_x = @props.width  or @props.size_x
    size_y = @props.height or @props.size_y
    table {
      style:
        width : "100%"
    }
      tbody
        tr
          td
            # perf (draw, but hide)
            div {
              style:
                display : if @controller.show_help then "" else "none"
            }
              if @controller.scheme?.active_scheme
                Keyboard_help_multi {
                  scheme : @controller.scheme.active_scheme
                }
        tr
          td {
            style :
              width : 250
          }
            Button {
              label : if @controller.play_state then "Stop" else "Play"
              on_click : ()=>
                @controller.toggle_play()
            }
          td {
            style:
              color : "#777"
          }, "If you focus timeline you can use some hotkeys. Focus and press F1 for help"
            
        tr
          td "Speed"
          td Number_input {
            value : @controller.speed_scale
            on_change : (speed_scale)=>
              @controller.speed_scale_set speed_scale
          }
        tr
          td "Hide future"
          td Checkbox {
            value : @controller.mode_hide_future
            on_change : (mode_hide_future)=>
              @controller.mode_hide_future = mode_hide_future
              @controller.refresh()
              @force_update()
          }
        tr
          td "Display tx_pow on timeline"
          td Checkbox {
            value     : @controller.display_tx_pow
            on_change : (display_tx_pow)=>
              @controller.display_tx_pow = display_tx_pow
              @controller.refresh()
              @force_update()
          }
        tr
          td "Display block"
          td Checkbox {
            value     : @controller.display_block
            on_change : (display_block)=>
              @controller.display_block = display_block
              @controller.refresh()
              @force_update()
          }
        tr
          td "Display block tx_pow усики"
          td Checkbox {
            value     : @controller.display_tx_pow_src_lines
            on_change : (display_tx_pow_src_lines)=>
              @controller.display_tx_pow_src_lines = display_tx_pow_src_lines
              @controller.refresh()
              @force_update()
          }
        tr
          td "autotrack"
          td Checkbox {
            value     : @controller.autotrack
            on_change : (autotrack)=>
              @controller.autotrack = autotrack
              @controller.refresh()
              @force_update()
          }
        tr
          td {colSpan : 2}
            Canvas_multi {
              width       : size_x
              height      : size_y
              layer_list  : ["panel_fg"]
              resize_fix  : true
              canvas_cb   : (canvas_hash)=>
                @controller?.canvas_controller canvas_hash
              gui         : @controller
              
              textarea    : @props.textarea
              ref_textarea: ($textarea)=>
                if @$textarea != $textarea
                  # I hope this will not cause infinite loop
                  @$textarea = $textarea
                  @force_update()
                
                @controller?.$textarea = $textarea
                @controller?.init()
            }
