'use strict';

const contextProcessor = require('../../index').pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ["/api/document/*", "/api/docs/testname"],
  priority: 50,
  name: 'CP2',
  process (executionContext, contentModel) {
    contentModel.test2 = 'Path CP Property2';
  }
});