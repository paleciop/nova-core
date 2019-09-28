'use strict';

const contextProcessor = require('../../index').pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ["/api/document/*", "/api/docs/testname"],
  priority: 60,
  name: 'CP2 60',
  process (executionContext, contentModel) {
    contentModel.test2 = 'Path CP Property2';
  }
});