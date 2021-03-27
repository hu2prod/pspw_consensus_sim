(function() {
  var str, v, _i, _len, _ref;

  window.distinct_color_list = [];

  str = "dimgray\n#696969\ndarkolivegreen\n#556b2f\nmaroon2\n#7f0000\ndarkslateblue\n#483d8b\ngreen\n#008000\nmediumseagreen\n#3cb371\ndarkcyan\n#008b8b\nperu\n#cd853f\nyellowgreen\n#9acd32\ndarkblue\n#00008b\npurple2\n#7f007f\nmaroon3\n#b03060\norangered\n#ff4500\ndarkorange\n#ff8c00\nyellow\n#ffff00\nchartreuse\n#7fff00\nblueviolet\n#8a2be2\nspringgreen\n#00ff7f\ncrimson\n#dc143c\naqua\n#00ffff\ndeepskyblue\n#00bfff\nblue\n#0000ff\nlightcoral\n#f08080\nlightsteelblue\n#b0c4de\nfuchsia\n#ff00ff\ndodgerblue\n#1e90ff\ndeeppink\n#ff1493\nmediumslateblue\n#7b68ee\nviolet\n#ee82ee\nmoccasin\n#ffe4b5";

  _ref = str.split("\n");
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    v = _ref[_i];
    if (v[0] !== "#") {
      continue;
    }
    distinct_color_list.push(v);
  }

  distinct_color_list.reverse();

}).call(this);
