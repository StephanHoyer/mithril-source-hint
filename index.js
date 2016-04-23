'use strict';

var mithril = require('mithril');
var errorparser = require('error-stack-parser');
var stacktracGps = require('stacktrace-gps');
var gps = new stacktracGps();

module.exports = function() {
  var res = mithril.apply(null, arguments);
  var error = new Error('boom');
  var title;
  res.attrs.onmouseover = function(event) {
    event.stopPropagation();
    var el = event.currentTarget;
    if (!title) {
      var stack = errorparser.parse(error);
      gps.getMappedLocation(stack[1]).then(function(location) {
        el.title = location.fileName + ':' + location.lineNumber;
      });
    } else {
      el.title = title;
    }
  };
  return res;
};

for (var key in mithril) {
  module.exports[key] = mithril[key];
}
