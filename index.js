'use strict';

const fetchContextProcessorEngine = require('./lib/fetchContextProcessorEngine');
const compileTemplate = require('./lib/templatingEngine');
const contextProcessor = require('./lib/context-processors/contextProcessor');
const errors = require('./lib/errors/errors');

module.exports = {
  fetchContextProcessorEngine,
  compileTemplate,
  contextProcessor,
  pathAwareContextProcessor,
  errors
};