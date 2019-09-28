'use strict';

const contextProcessor = require('../../index').pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ["/api/document/*", "/api/docs/testname"],
  name: 'CP4',
  process (executionContext, contentModel) {
    contentModel.test2 = 'Path CP Property4';
  }
});