'use strict';

const contextProcessor = require('./contextProcessor');
const utils = require('./utils');
const fsPromised = require('./fsPromised');
const C = require('./constants');
const path = require('path');

module.exports = async function fetchContextProcessorEngine(
  configuration = {}
) {
  const { paths = [] } = configuration;

  const contextProcessors = {};

  const priorityComparator = (contextProcessor1, contextProcessor2) => contextProcessor1.priority - contextProcessor2.priority;

  const execute = function execute(cats = [], contentModel = {}) {
    console.log('>> Executing Context Processors.');
    const categories = Array.isArray(cats) ? cats : [cats];
    return Object.keys(contextProcessors)
      .map(contextProcessorName => contextProcessors[contextProcessorName])
      .sort(priorityComparator)
      .reverse()
      .reduce((thePromise, contextProcessor) => {
        let resultPromise = Promise.resolve();
        if (contextProcessor.accepts(categories)) {
          console.log('Running', contextProcessor.name);
          resultPromise = thePromise.then(() =>
            Promise.resolve(contextProcessor.process(contentModel))
          );
        }
        return resultPromise;
      }, Promise.resolve())
      .then(() => contentModel);
  };

  const fetchContextProcessorPaths = function fetchContextProcessorPaths(
    paths = []
  ) {
    return Promise.all(paths.map(fsPromised.walkFiles)).then(pathsArray =>
      pathsArray
        .reduce(utils.reducers.toSingleArray, [])
        .filter(utils.filters.unique)
    );
  };

  const getContextProcessorNameFromPath = (thePath = C.BLANK) =>
    path.basename(thePath).split(C.DOT)[0];

  const loadContextProcessors = async function loadContextProcessors(
    paths = []
  ) {
    console.log('>> Loading Context Processors');
    console.log('>> Paths: ', paths);
    try {
      const contextProcessorsPaths = await fetchContextProcessorPaths(paths);
      contextProcessorsPaths.forEach(contextProcessorsPath => {
        const contextProcessor = require(contextProcessorsPath);
        if (utils.isValidContextProcessor(contextProcessor)) {
          const hasName = contextProcessor.hasOwnProperty(C.NAME);
          const contextProcessorName = !hasName
            ? getContextProcessorNameFromPath(contextProcessorsPath)
            : contextProcessor.name;
          contextProcessors[contextProcessorName] = !hasName
            ? Object.assign(contextProcessor, {
                name: contextProcessorName
              })
            : contextProcessor;
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  await loadContextProcessors(paths);

  console.log('>> Context Processors:', contextProcessors);

  return {
    execute,
    loadContextProcessors
  };
};
