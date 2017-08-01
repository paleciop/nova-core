'use strict';

const contextProcessor = require('../../../index').contextProcessor;

module.exports = contextProcessor.extend({
  categories: ['test'],
  name: 'Text ContextProcessor 3',
  process (contentModel) {
    contentModel.test3 = 'Test Property! 3';
  }
});