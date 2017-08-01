'use strict';

const hasMethod = (obj, methodName) =>
  methodName in obj && typeof obj[methodName] === 'function';

const isValidContextProcessor = contextProcessor =>
  hasMethod(contextProcessor, 'process') &&
  hasMethod(contextProcessor, 'accepts');

/* Filters */

const unique = (value, index, self) => self.indexOf(value) === index;

/* Reducers */

const toSingleArray = (theArray, anArray) => theArray.concat(anArray);

module.exports = {
  isValidContextProcessor,
  filters: {
    unique
  },
  reducers: {
    toSingleArray
  }
};
