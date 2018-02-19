'use strict'

const mithril = require('mithril')
const errorparser = require('error-stack-parser')
const stacktraceGps = require('stacktrace-gps')
const gps = new stacktraceGps()

module.exports = function() {
  const vnode = mithril.apply(null, arguments)
  vnode.attrs = vnode.atts || {};
  const onmouseover = vnode.attrs.onmouseover
  const error = new Error('boom')
  let title
  vnode.attrs.onmouseover = function(event) {
    event.stopPropagation()
    const el = event.currentTarget
    if (!title) {
      const stack = errorparser.parse(error)
      gps.getMappedLocation(stack[1]).then(function(location) {
        el.title = location.fileName + ':' + location.lineNumber
      })
    } else {
      el.title = title
    }
    if(onmouseover) {
      onmouseover.apply(this, arguments);
    }
  };
  return vnode;
};

for (const key in mithril) {
  module.exports[key] = mithril[key]
}
