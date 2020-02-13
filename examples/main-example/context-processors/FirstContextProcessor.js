'use strict';

module.exports = {
  name: 'FirstContextProcessor',
  priority: 100,
  categories: 'test',
  process(executionContext, contentModel) {
    console.log(
      '> FirstContextProcessor - this Context Processor has a very high priority. It will be the first to run.'
    );
    contentModel.test = '1';
  }
};
