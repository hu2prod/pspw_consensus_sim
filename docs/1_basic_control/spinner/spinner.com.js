(function() {
  var com_name, conf;

  com_name = "Spinner";

  conf = React.createClass(CKR.react_key_map(com_name, {
    render: function() {
      var size;
      size = this.props.size || 10;
      return div({
        "class": "smt-spinner-circle",
        style: {
          width: size,
          height: size
        }
      }, (function(_this) {
        return function() {
          return div({
            "class": "smt-spinner"
          });
        };
      })(this));
    }
  }));

  define_com("Spinner", conf);

}).call(this);
