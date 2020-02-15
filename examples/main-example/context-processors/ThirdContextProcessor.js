'use strict';

module.exports = {
  name: 'ThirdContextProcessor',
  priority: 10,
  categories: 'test',
  process(executionContext, contentModel) {
    console.log(
      '> ThirdContextProcessor - This Context Processor has a low priority. It will run after the first and second.'
    );
    contentModel.test = contentModel.test + '3';
  }
};
