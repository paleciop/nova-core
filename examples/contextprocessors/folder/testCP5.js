'use strict';

const contextProcessor = require('../../../index').contextProcessor;
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

module.exports = contextProcessor.extend({
  categories: ['test'],
  priority: 70,
  name: 'Test ContextProcessor 5',
  process (executionContext, contentModel) {
    return setTimeoutPromise(1000).then(() => {
      contentModel.test5 = 'Test Property! 5';
    });
  }
});