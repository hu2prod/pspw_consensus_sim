(function() {
  window.global_mouse_up = new Event_mixin;

  document.onmouseup = function(event) {
    return global_mouse_up.dispatch("mouse_up", event);
  };

}).call(this);
