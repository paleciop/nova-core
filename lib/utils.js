/**
 * @fileOverview Nova utilities.
 * @author <a href="mailto:paleciop@gmail.com">Pablo Alecio</a>
 */
'use strict';

const path = require('path');
const { JS_EXT } = require('./constants');

/**
 * Checks the process arguments to see if it's being run in debug mode (has a debug flag)
 * @returns {boolean} true if the process was run in debug mode. False if it wasn't.
 */
const isDebug = process.argv.some(arg => arg === '--debug' || arg === '-d');

/**
 * Outputs <tt>args</tt> to the console, adding '> Nova:' as prefix.
 * @param args The arguments to log.
 */
const log = (...args) => console.log('> Nova:', ...args);

/**
 * Deep clones <tt>obj</tt> and returns the clone.
 * @param obj The object to clone
 */
const cloneObject = obj =>
  (typeof obj === 'object' && JSON.parse(JSON.stringify(obj))) || null;

/**
 * Checks if <tt>obj</tt> has a method called <tt>methodName</tt>.
 * @example hasMethod(Object, 'create') // true
 * @param {Object} obj the object to check.
 * @param {string} methodName the name of the method.
 * @returns {boolean} whether or not the object has the method specified.
 */
const hasMethod = (obj, methodName) =>
  methodName in obj && typeof obj[methodName] === 'function';

/**
 * Checks if <tt>contextProcessor</tt> is valid.
 * @param {Object} contextProcessor the Context Processor to check.
 * @returns {boolean} whether or not the context processor is valid.
 */
const isValidContextProcessor = contextProcessor =>
  hasMethod(contextProcessor, 'process');

/* Filters */

/**
 * Filter used to check if <tt>value</tt> is unique in the array.
 * @example [1,2,2].filter(unique) // [1,2]
 * @param {*} value The current value.
 * @param {number} index The current index.
 * @param {*} self the array filter was called upon.
 * @returns {boolean} whether or not the value is unique.
 */
const unique = (value, index, self) => self.indexOf(value) === index;

/**
 * Used to filter ony js file paths
 * @example ['test.js','test.html'].filter(jsFiles) // ['test.js']
 * @param {*} value The current value.
 * @returns {boolean} whether or not the path ends with .js
 */
const jsFiles = value => path.extname(value) === JS_EXT;

/* Reducers */

/**
 * Concatenates <tt>theArray</tt> and <tt>anArray</tt>
 * @example [[1], [2]].reduce(toSingleArray) // [1,2]
 * @param {Array} theArray the accumulator.
 * @param {Array} anArray the current array.
 * @return The concatenation between the accumulated array and the current array.
 */
const toSingleArray = (theArray, anArray) => theArray.concat(anArray);

/**
 * @module lib/utils
 * @type {{isValidContextProcessor: (function(): boolean), filters: {unique: (function(): boolean)}, reducers: {toSingleArray: (function(): Array.<*>)}}}
 */
module.exports = {
  isDebug,
  log,
  hasMethod,
  cloneObject,
  isValidContextProcessor,
  filters: {
    unique,
    jsFiles
  },
  reducers: {
    toSingleArray
  }
};
