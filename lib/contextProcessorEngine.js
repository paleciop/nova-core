'use strict';

const contextProcessor = require('./contextProcessor');
const utils = require('./utils');
const fsPromised = require('./fsPromised');

module.exports = async function initContextProcessorEngine (configuration = {}) {
  const {
    paths = []
  } = configuration;

  const contextProcessors = {};

  const execute = function execute (categories, contentModel) {
    console.log('Executing Context Processors.');
    console.log('Categories:', categories);
    console.log('Content Model:', contentModel);
  };

  const loadContextProcessors = async function loadContextProcessors (paths = []) {
    console.log('Loading Context Processors');
    console.log('Paths: ', paths);
    const thePath = './test/contextprocessors';
    try{
      const contextProcessorsPaths = await fsPromised.walkFiles(thePath);
      const test = require(contextProcessorsPaths[0]);
      console.log('Path?', contextProcessorsPaths[0]);
      contextProcessors['testCP'] = test;
    } catch (error) {
      console.error(error, thePath);
    }
  };

  await loadContextProcessors(paths);

  console.log('Context Processors:', contextProcessors);

  return {
    execute,
    loadContextProcessors
  }
};