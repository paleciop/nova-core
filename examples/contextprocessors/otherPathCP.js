'use strict';

const contextProcessor = require('../../index').pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ["/api/document/*", "/api/docs/testname"],
  name: 'Other Path Context Processor',
  process (executionContext, contentModel) {
    contentModel.test2 = 'Path CP Property2';
  }
});