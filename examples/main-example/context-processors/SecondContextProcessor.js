'use strict';

module.exports = {
  name: 'SecondContextProcessor',
  priority: 50,
  categories: 'test',
  process(executionContext, contentModel) {
    console.log(
      '> SecondContextProcessor - this Context Processor has a medium priority. It will run after the first one.'
    );
    contentModel.test = contentModel.test + '2';
  }
};
