'use strict';

const contextProcessor = require('../../index').pathAwareContextProcessor;

module.exports = contextProcessor.extend({
  patterns: ["/api/document/*", "/api/docs/:name"],
  name: 'Path Context Processor',
  process (executionContext, contentModel) {
    console.log('Execution Context:', executionContext);
    contentModel.pathCP = 'Path CP Property';
  }
});