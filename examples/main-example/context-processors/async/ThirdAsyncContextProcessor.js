'use strict';
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

module.exports = {
  priority: 0,
  categories: 'test',
  process(executionContext, contentModel) {
    console.log(
      '> ThirdAsyncContextProcessor - running last, at the same time as all the async Context Processors but because it has a smaller timeout, it will finish first.'
    );
    return setTimeoutPromise(50).then(() => {
      contentModel.asyncTest = contentModel.asyncTest
        ? contentModel.asyncTest + '3'
        : '3';
      console.log('> ThirdAsyncContextProcessor - finished running.');
    });
  }
};
