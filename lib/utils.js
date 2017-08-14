'use strict';

/**
 * Checks if obj has a method called `methodName`.
 * @param {Object} obj the object to check.
 * @param {string} methodName the name of the method.
 * @returns {boolean} whether or not the object has the method specified.
 */
const hasMethod = (obj, methodName) =>
  methodName in obj && typeof obj[methodName] === 'function';

/**
 * Checks if `contextProcessor` is valid.
 * @param {Object} contextProcessor the Context Processor to check.
 * @returns {boolean} whether or not the context processor is valid.
 */
const isValidContextProcessor = contextProcessor =>
  hasMethod(contextProcessor, 'process') &&
  hasMethod(contextProcessor, 'accepts');

/* Filters */

/**
 * Filter used to check if `value` is unique in the array.
 * @param {*} value The current value.
 * @param {number} index The current index.
 * @param {*} self the array filter was called upon.
 * @returns {boolean} whether or not the value is unique.
 */
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
