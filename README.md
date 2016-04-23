# mithril-source-hint
With a growing [Mithril](https://lhorie.github.io/mithril/) app, you (or your
coworkers) may sometimes wonder, where a specific DOM element comes from.

This little packages allows you to show the origin of any element by just hovering it.

## Installation

    npm install --save mithril-source-hint

To make use of it, you need to change all your files to use a custom Mithril
wrapper, that - as a nice goodie - allows you to toggle hints by URL parameter.
In the following example, we use ``?mdebug`` for as url parameter:

    'use strict'

    // by default we keep Mithril itself
    module.exports = require('mithril')

    // wrap Mithril if we add ?mdebug to the url
    if (window.location.search.indexOf('mdebug') > 0) {
      module.exports = require('mithril-source-hint')
    }

To update all your require statements to use your custom Mithril wrapper, you
may use something like that in your application's root directory (your wrapper
is probably not named ``my/mithril``, so you need to change that):

    for js in `find . -type f -name '*.js'`; do sed -i s@require\(\'mithril\'\)@require\(\'my/mithril\'\)@g $js; done

## Usage

Call your site (with the URL parameter, if you require it in your wrapper).
Hover a element, you want to see the origin of, and you will see file and line of it as title.
