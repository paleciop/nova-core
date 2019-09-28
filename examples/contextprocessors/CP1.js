'use strict';

const contextProcessor = require('../../index').pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ["/api/document/*", "/api/docs/testname"],
  priority: 40,
  name: 'CP1',
  process (executionContext, contentModel) {
    contentModel.test2 = 'Path CP Property45';
  }
});