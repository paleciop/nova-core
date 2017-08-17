'use strict';

const contextProcessor = require('../../../index').contextProcessor;

module.exports = contextProcessor.extend({
  categories: ['tests'],
  priority: 30,
  name: 'Test ContextProcessor 4',
  process (contentModel) {
    contentModel.test4 = 'Test Property 4!';
  }
});