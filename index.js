'use strict';

const fetchContextProcessorEngine = require('./lib/fetchContextProcessorEngine');
const templatingEngine = require('./lib/templatingEngine');
const contextProcessor = require('./lib/context-processors/contextProcessor');
const pathAwareContextProcessor = require('./lib/context-processors/pathAwareContextProcessor');
const errors = require('./lib/errors/errors');
module.exports = {
  fetchContextProcessorEngine,
  templatingEngine,
  contextProcessor,
  pathAwareContextProcessor,
  errors
};