(function() {
  var rand_a, rand_b, rand_mod;

  window.rand_seed = 1;

  rand_a = 16807;

  rand_b = 0;

  rand_mod = Math.pow(2, 31) - 1;

  window._rand = function() {
    return window.rand_seed = (rand_a * window.rand_seed + rand_b) % rand_mod;
  };

  window.rand_range = function(a, b) {
    var val;
    val = _rand();
    return (val % (b - a + 1)) + a;
  };

  window.rand_list = function(list) {
    var idx, val;
    val = _rand();
    idx = val % list.length;
    return list[idx];
  };

}).call(this);
