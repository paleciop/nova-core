'use strict';

module.exports = {
  priority: 60,
  name: 'AddTwoNumbersContextProcessor',
  categories: ['add'],
  process(executionContext, contentModel) { contentModel.result = contentModel.firstNumber + contentModel.secondNumber; }
};



