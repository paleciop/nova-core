'use strict';

const fetchContextProcessorEngine = require('./lib/fetchContextProcessorEngine');
const templatingEngine = require('./lib/templatingEngine');
const contextProcessor = require('./lib/contextProcessor');
const pathAwareContextProcessor = require('./lib/pathAwareContextProcessor');

module.exports = {
  fetchContextProcessorEngine,
  templatingEngine,
  contextProcessor,
  pathAwareContextProcessor
};