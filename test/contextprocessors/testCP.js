'use strict';

const contextProcessor = require('../../index').contextProcessor;

module.exports = contextProcessor.extend({
  categories: ['test'],
  priority: 40,
  name: 'Text ContextProcessor',
  process (contentModel) {
    contentModel.test = 'Test Property 1! Last';
  }
});