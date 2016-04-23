'use strict';

var mithril = require('mithril');
var errorparser = require('error-stack-parser');
var stacktracGps = require('stacktrace-gps');
var gps = new stacktracGps();

var debugCount = 0;

module.exports = function() {
  var className = 'template-hint-' + debugCount++;
  var res = mithril.apply(null, arguments);
  var stack = errorparser.parse(new Error('boom'));
  gps.getMappedLocation(stack[1]).then(function(location) {
    var loc = location.fileName + ':' + location.lineNumber;
    var el = document.getElementsByClassName(className)[0];
    if (el) {
      el.classList.remove(className);
      el.title = el.title || loc;
      el.dataset.debugLocation = loc;
    }
  });
  res.attrs.className += ' ' + className;
  return res;
};

for (var key in mithril) {
  module.exports[key] = mithril[key];
}
