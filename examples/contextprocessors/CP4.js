'use strict';

const contextProcessor = require('../../index').pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ["/api/document/*", "/api/docs/testname"],
  name: 'CP4 no priority',
  process (executionContext, contentModel) {
    console.log('CP4 start');
    contentModel.test2 = 'Path CP Property4';
    return new Promise (r => {
      setTimeout(r, 1500, 'funky');
    }).then(a =>     console.log('CP4 end') || a);
  }
});