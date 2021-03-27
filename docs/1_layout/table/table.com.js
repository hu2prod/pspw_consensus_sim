(function() {
  var com_name, conf;

  com_name = "Table";

  conf = React.createClass(CKR.react_key_map(com_name, {
    state: {
      filter: "",
      sort: "",
      sort_dir: ""
    },
    render: function() {
      var $col_list, $row_list, col, col_list, data, field, filter, filter_chunk_list, filter_data, k, pass, pass_all, row, v, _fn, _i, _j, _k, _l, _len, _len1, _len2, _len3;
      col_list = this.props.col_list || [];
      $col_list = [];
      _fn = (function(_this) {
        return function(col) {
          return $col_list.push(th({
            "class": col.sort || _this.props.sort ? "sort " + (col.key === _this.state.sort ? _this.state.sort_dir : "") : "",
            on_click: function() {
              if (!col.sort && !_this.props.sort) {
                return;
              }
              if (_this.state.sort !== col.key) {
                _this.set_state({
                  sort: col.key,
                  sort_dir: "asc"
                });
              } else {
                _this.set_state({
                  sort_dir: _this.state.sort_dir === "asc" ? "desc" : "asc"
                });
              }
            }
          }, col.title || col.key));
        };
      })(this);
      for (_i = 0, _len = col_list.length; _i < _len; _i++) {
        col = col_list[_i];
        _fn(col);
      }
      data = this.props.data || this.props.list || [];
      if (this.state.filter) {
        filter_chunk_list = this.state.filter.toLowerCase().split(/\s+/g);
        if (filter_chunk_list.length) {
          filter_data = [];
          for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
            row = data[_j];
            pass_all = true;
            for (_k = 0, _len2 = filter_chunk_list.length; _k < _len2; _k++) {
              filter = filter_chunk_list[_k];
              pass = false;
              for (k in row) {
                v = row[k];
                if (typeof v === "string") {
                  v = v.toLowerCase();
                } else if (typeof v === "number") {
                  v = v.toString();
                } else {
                  continue;
                }
                if (-1 !== v.indexOf(filter)) {
                  pass = true;
                  break;
                }
              }
              if (!pass) {
                pass_all = false;
                break;
              }
            }
            if (pass_all) {
              filter_data.push(row);
            }
          }
          data = filter_data;
        }
      }
      if (this.state.sort) {
        data = data.clone();
        field = this.state.sort;
        if (row = data[0]) {
          if (typeof row[field] === "string") {
            if (this.state.sort_dir === "asc") {
              data.sort(function(a, b) {
                return (a[field] || "").localeCompare(b[field]);
              });
            } else {
              data.sort(function(a, b) {
                return -(a[field] || "").localeCompare(b[field]);
              });
            }
          } else if (typeof row[field] === "number") {
            if (this.state.sort_dir === "asc") {
              data.sort(function(a, b) {
                return a[field] - b[field];
              });
            } else {
              data.sort(function(a, b) {
                return -(a[field] - b[field]);
              });
            }
          }
        }
      }
      $row_list = [];
      for (_l = 0, _len3 = data.length; _l < _len3; _l++) {
        row = data[_l];
        $row_list.push(tr((function(_this) {
          return function() {
            var ret, _len4, _m;
            ret = [];
            for (_m = 0, _len4 = col_list.length; _m < _len4; _m++) {
              col = col_list[_m];
              if (col.renderer == null) {
                col.renderer = col.render;
              }
              if (col.renderer) {
                ret.push(td(col.renderer(row[col.key], row, _this)));
              } else {
                ret.push(td(row[col.key]));
              }
            }
            return ret;
          };
        })(this)));
      }
      return div((function(_this) {
        return function() {
          if (_this.props.filter) {
            Text_input({
              value: _this.state.filter,
              on_change: function(filter) {
                return _this.set_state({
                  filter: filter
                });
              },
              placeholder: "Filter by all fields"
            });
          }
          return table({
            "class": "table"
          }, function() {
            return tbody(function() {
              tr($col_list);
              return $row_list;
            });
          });
        };
      })(this));
    },
    props_change: function() {
      return this.force_update();
    }
  }));

  define_com("Table", conf);

}).call(this);
