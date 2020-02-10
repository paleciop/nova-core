'use strict';

const fetchContextProcessorEngine = require('./lib/fetchContextProcessorEngine');
const templatingEngine = require('./lib/templatingEngine');
const contextProcessor = require('./lib/context-processors/contextProcessor');

module.exports = {
  fetchContextProcessorEngine,
  templatingEngine,
  contextProcessor
};