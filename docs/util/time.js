(function() {
  window.tsd_fmt = window.ts_duration_format = function(ts, format) {
    var d, dd, dd_, h, hh, hh_, m, mm, mm_, ms, ms_, n, nn, nn_, ret, s, ss, ss_, y, yy, yy_, yyyy, yyyy_;
    if (format == null) {
      format = "hh:MM:SS";
    }
    ms_ = ts;
    ms = ts % 1000;
    ts = Math.floor(ts / 1000);
    ss_ = ts;
    ss = ts % 60;
    ts = Math.floor(ts / 60);
    mm_ = ts;
    mm = ts % 60;
    ts = Math.floor(ts / 60);
    hh_ = ts;
    hh = ts % 24;
    ts = Math.floor(ts / 24);
    dd_ = ts;
    dd = ts % 30;
    ts = Math.floor(ts / 30);
    nn_ = ts;
    nn = ts % 12;
    yyyy_ = yyyy = Math.floor(dd_ / 365);
    yy_ = yy = yyyy % 100;
    s = ss;
    m = mm;
    h = hh;
    d = dd;
    n = nn;
    y = yy;
    ms = ms.rjust(3, "0");
    ss = ss.rjust(2, "0");
    mm = mm.rjust(2, "0");
    hh = hh.rjust(2, "0");
    dd = dd.rjust(2, " ");
    nn = nn.rjust(2, " ");
    yy = yy.rjust(2, " ");
    yyyy = yyyy.rjust(4, " ");
    ms_ = ms_.rjust(3, "0");
    ss_ = ss_.rjust(2, "0");
    mm_ = mm_.rjust(2, "0");
    hh_ = hh_.rjust(2, "0");
    dd_ = dd_.rjust(2, " ");
    nn_ = nn_.rjust(2, " ");
    yy_ = yy_.rjust(2, " ");
    yyyy_ = yyyy_.rjust(4, " ");
    ret = format;
    ret = ret.replace("ms_", ms_);
    ret = ret.replace("ss_", ss_);
    ret = ret.replace("mm_", mm_);
    ret = ret.replace("hh_", hh_);
    ret = ret.replace("dd_", dd_);
    ret = ret.replace("nn_", nn_);
    ret = ret.replace("yy_", yy_);
    ret = ret.replace("ms", ms);
    ret = ret.replace("SS", ss);
    ret = ret.replace("ss", ss);
    ret = ret.replace("MM", mm);
    if (mm) {
      ret = ret.replace("mm", mm);
    } else {
      ret = ret.replace("mm:", "");
    }
    ret = ret.replace("HH", hh);
    if (hh) {
      ret = ret.replace("hh", hh);
    } else {
      ret = ret.replace("hh:", "");
    }
    ret = ret.replace("DD", dd);
    if (d || n || y) {
      ret = ret.replace("dd", dd);
    } else {
      ret = ret.replace("dd", "");
    }
    ret = ret.replace("NN", nn);
    if (n || y) {
      ret = ret.replace("nn", nn);
    } else {
      ret = ret.replace("nn", "");
    }
    ret = ret.replace("YYYY", yyyy);
    if (y) {
      ret = ret.replace("yyyy", yyyy);
    } else {
      ret = ret.replace("yyyy", "");
    }
    ret = ret.replace("YY", yy);
    if (y) {
      ret = ret.replace("yy", yy);
    } else {
      ret = ret.replace("yy", "");
    }
    ret = ret.replace("S", s);
    ret = ret.replace("s", s);
    ret = ret.replace("M", m);
    if (m) {
      ret = ret.replace("m", m);
    } else {
      ret = ret.replace("m:", "");
    }
    ret = ret.replace("H", h);
    if (h) {
      ret = ret.replace("h", h);
    } else {
      ret = ret.replace("h:", "");
    }
    ret = ret.replace("D", d);
    if (d) {
      ret = ret.replace("d", d);
    } else {
      ret = ret.replace("d", "");
    }
    ret = ret.replace("N", n);
    if (n) {
      ret = ret.replace("n", n);
    } else {
      ret = ret.replace("n", "");
    }
    ret = ret.replace("Y", y);
    if (y) {
      ret = ret.replace("y", y);
    } else {
      ret = ret.replace("y", "");
    }
    return ret;
  };

  window.ffmpeg2ts = window.timecode2ts = function(str) {
    var hh, mm, ms, ms_radix, ss, ts, _ref;
    _ref = str.split(/[:\.]/g), hh = _ref[0], mm = _ref[1], ss = _ref[2], ms = _ref[3];
    hh = +(hh || "0");
    mm = +(mm || "0");
    ss = +(ss || "0");
    ms_radix = Math.pow(10, ms.length);
    ms = +(ms || "0");
    ts = ((hh * 60) + mm) * 60 + ss;
    ts += ms / ms_radix;
    return ts * 1000;
  };

}).call(this);
