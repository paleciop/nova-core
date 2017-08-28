'use strict';

const contextProcessor = require('../../index').contextProcessor;

module.exports = contextProcessor.extend({
  categories: ['test'],
  process (contentModel) {
    contentModel.test2 = 'Test Property 2! Mid';
  }
});