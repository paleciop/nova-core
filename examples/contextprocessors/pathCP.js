'use strict';

const contextProcessor = require('../../index').pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ["/api/document/*", "/api/docs/:name"],
  name: 'Path Context Processor',
  process (executionContext, contentModel) {
    contentModel.test = 'Path CP Property';
  }
});