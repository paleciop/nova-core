'use strict';

const fetchContextProcessorEngine = require('./lib/fetchContextProcessorEngine');
const compileTemplate = require('./lib/templatingEngine');
const contextProcessor = require('./lib/context-processors/contextProcessor');

module.exports = {
  fetchContextProcessorEngine,
  compileTemplate,
  contextProcessor
};