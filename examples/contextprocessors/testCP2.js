'use strict';

const contextProcessor = require('../../index').contextProcessor;

module.exports = contextProcessor.extend({
  categories: ['test'],
  process (executionContext, contentModel) {
    contentModel.test2 = 'Test Property 2! Mid';
  }
});