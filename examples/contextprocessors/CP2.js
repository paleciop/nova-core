'use strict';

const contextProcessor = require('../../index').pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ["/api/document/*", "/api/docs/testname"],
  priority: 60,
  name: 'CP2 60',
  process (executionContext, contentModel) {
    console.log('CP2 start');
    contentModel.test2 = 'Path CP Property2';

    return new Promise (r => {
      setTimeout(r, 1500, 'funky');
    }).then(a =>     console.log('CP2 end') || a);
  }
});