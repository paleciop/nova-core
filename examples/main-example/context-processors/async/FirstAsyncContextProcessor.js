'use strict';
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

module.exports = {
  name: 'FirstAsyncContextProcessor',
  priority: 0,
  categories: 'test',
  process(executionContext, contentModel) {
    console.log(
      '> FirstAsyncContextProcessor - Running last, at the same time as all the async Context Processors.'
    );
    return setTimeoutPromise(100).then(() => {
      contentModel.asyncTest = contentModel.asyncTest
        ? contentModel.asyncTest + '1'
        : '1';
      console.log('> FirstAsyncContextProcessor - finished running.');
    });
  }
};
