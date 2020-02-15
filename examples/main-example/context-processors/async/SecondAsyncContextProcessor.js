'use strict';
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

module.exports = {
  name: 'SecondAsyncContextProcessor',
  priority: 0,
  categories: 'test',
  process(executionContext, contentModel) {
    console.log(
      '> SecondAsyncContextProcessor - running last, at the same time as all the async Context Processors but because it has a bigger timeout, it will finish last.'
    );
    return setTimeoutPromise(200).then(() => {
      contentModel.asyncTest = contentModel.asyncTest
        ? contentModel.asyncTest + '2'
        : '2';
      console.log('> SecondAsyncContextProcessor - finished running.');
    });
  }
};
