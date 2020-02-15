'use strict';
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

module.exports = {
  name: 'IndependentAsyncContextProcessor',
  categories: 'test',
  process(executionContext, contentModel) {
    console.log(
      '> IndependentAsyncContextProcessor - This Context Processor will run independently but because it has a 1 second timeout, it will be the deat last to finish.'
    );
    return setTimeoutPromise(1000).then(() => {
      contentModel.independentAsync =
        'This property was added by the IndependentAsyncContextProcessor';
      console.log('> IndependentAsyncContextProcessor - finished running.');
    });
  }
};
