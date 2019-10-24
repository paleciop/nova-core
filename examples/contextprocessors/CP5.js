'use strict';

const contextProcessor = require('../../index').pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ["/api/document/*", "/api/docs/testname"],
  name: 'CP5 50',
  priority: 50,
  process (executionContext, contentModel) {
    console.log('CP5 start');
    contentModel.test2 = 'Path CP Property4';
    return new Promise (r => {
      setTimeout(r, 1500, 'funky');
    }).then(a =>     console.log('CP5 end') || a);
  }
});