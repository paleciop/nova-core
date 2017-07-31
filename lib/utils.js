'use strict';

const hasMethod = (obj, methodName) => obj[methodName] && (typeof obj[methodName] === 'function');

const isValidContextProcessor = function isValidContextProcessor (contextProcessor) {
  return hasMethod(contextProcessor, 'process') && hasMethod(contextProcessor, 'accepts');
};

module.exports = {
  isValidContextProcessor
};