/**
 * TODO finish documenting.
 * @fileOverview Contains the logic for the Context Processor Engine.
 * @author <a href="mailto:paleciop@gmail.com">Pablo Alecio</a>
 */
'use strict';

const utils = require('./utils');
const fsPromised = require('./fsPromised');
const { NAME, BLANK, DOT } = require('./constants');
const path = require('path');
const baseCP = require('./context-processors/contextProcessor');

const log = utils.log;

/**
 * @module lib/fetchContextProcessorEngine
 * @param {{contextProcessors, paths}} configuration The config object.
 * @returns {Promise<Object>}
 */
module.exports = async function fetchContextProcessorEngine(
  configuration = {}
) {
  log('Initializing Nova.');

  /**
   * The paths where the Context Processor Engine should look for Context Processors.
   * @type {Array}
   */
  const { paths = [], contextProcessors = [] } = configuration;

  /**
   * The loaded Context Processors
   * @type {Object}
   */
  const loadedContextProcessors = {};

  /**
   * Compares the priorities between the two context processors sent as arguments.
   * @param contextProcessor1
   * @param contextProcessor2
   * @return {number} -1 if  <tt>contextProcessor1</tt>.priority > <tt>contextProcessor2</tt>.priority, 1 if <tt>contextProcessor1</tt>.priority < <tt>contextProcessor2</tt>.priority and 0 if both priorities are equal.
   */
  const priorityComparator = (contextProcessor1, contextProcessor2) =>
    contextProcessor2.priority - contextProcessor1.priority;

  /**
   *
   * @param {Object} executionContext the executionContext.
   * @param {Object} originalContentModel the original Content Model to operate on.
   * @returns {Promise.<Object>} A promise that when resolved, returns the object
   */
  const execute = function execute(
    executionContext,
    originalContentModel = {}
  ) {
    // Add the statistics object
    const contentModel = Object.assign(
      { statistics: { dependent: [], independent: [] } },
      originalContentModel
    );
    const processCP = contextProcessor => {
      if (contextProcessor.getMatch) {
        //TODO move it elsewhere since getMatch is not really a core functionality
        executionContext.match = contextProcessor.getMatch(executionContext);
      }
      const executionContextCopy = Object.assign({}, executionContext);
      // Wrap the results of .process() with Promise.resolve() to ensure a Promise is returned.
      return Promise.resolve(
        contextProcessor.process(executionContextCopy, contentModel)
      );
    };

    const processCPChain = contextProcessorArray =>
      contextProcessorArray.reduce(
        // Reduce the CPs into a Promise chain.
        (thePromise, contextProcessorArray) =>
          thePromise.then(() =>
            Promise.all(
              contextProcessorArray.map(contextProcessor =>
                processCP(contextProcessor)
              )
            )
          ),
        Promise.resolve() // The initial promise.
      );

    /**
     * Accepts filter.
     * @param contextProcessor The Context Processor to evaluate.
     */
    const accepts = contextProcessor =>
      contextProcessor.accepts(executionContext);

    console.time('Execute');
    const arrangedContextProcessors = Object.values(loadedContextProcessors) // Get the Context Processor Objects.
      .map(cp => (!cp.accepts && baseCP.extend(cp)) || cp) // Extend from the base Context Processor
      .filter(accepts) // Remove the Context Processors that don't need to be executed.
      .sort(priorityComparator) // Sort the Context Processors by priority.
      .reduce(
        (arrangedContextProcessors, contextProcessor) => {
          // Reduce the CPs into arrays of CPs with the same priority.
          if (
            contextProcessor.priority !== null ||
            !(typeof contextProcessor.priority !== 'undefined')
          ) {
            // See if there's already an array of CPs with the same priority.
            const samePriorityContextProcessors = arrangedContextProcessors.dependent.find(
              element => element[0].priority === contextProcessor.priority
            );

            if (samePriorityContextProcessors) {
              // If there's an array of CPs with the same priority, add the current one to the dependent array.
              samePriorityContextProcessors.push(contextProcessor);
            } else {
              // If there isn't, add a new array with the current CP to the dependent array.
              arrangedContextProcessors.dependent.push([contextProcessor]);
            }
          } else {
            // If the priority is undefined or null, the context processor is considered independent, so we just add it to the independent.
            arrangedContextProcessors.independent.push(contextProcessor);
          }
          return arrangedContextProcessors;
        },
        { independent: [], dependent: [] }
      );

    contentModel.statistics.independent = arrangedContextProcessors.independent.map(
      cp => cp.name
    );
    contentModel.statistics.dependent = arrangedContextProcessors.dependent.map(
      array => ({
        priority: array[0].priority,
        contextProcessors: array.map(cp => cp.name)
      })
    );

    const independentContextProcessorPromises = Promise.all(
      arrangedContextProcessors.independent.map(cp => processCP(cp))
    );
    const dependentContextProcessorPromises = processCPChain(
      arrangedContextProcessors.dependent
    );

    return Promise.all([
      independentContextProcessorPromises,
      dependentContextProcessorPromises
    ]).then(() => {
      console.timeEnd('Execute');
      return contentModel;
    });
  };

  /**
   * Walks the paths sent as arguments looking for unique js files.
   * @param {Array} paths The list of paths to walk.
   * @returns {Promise.<Array>} A promise that when resolved returns an array of paths to potential Context Processors.
   */
  const fetchContextProcessorPaths = function fetchContextProcessorPaths(
    paths = []
  ) {
    paths = Array.isArray(paths) ? paths : [paths];
    return Promise.all(paths.map(fsPromised.walkFiles)).then(pathsArray =>
      pathsArray
        .reduce(utils.reducers.toSingleArray, [])
        .filter(utils.filters.unique)
        .filter(utils.filters.jsFiles)
    );
  };

  /**
   * I think the name is self explanatory...
   * @param thePath The context processor path.
   * @returns {string} The context processor name.
   */
  const getContextProcessorNameFromPath = (thePath = BLANK) =>
    path.basename(thePath).split(DOT)[0];

  /**
   * Loads the Context Processors found in the paths provided.
   * @param paths The paths to look for Context Processors in.
   */
  const loadContextProcessorsFromPaths = async function loadContextProcessorsFromPaths(
    paths = []
  ) {
    log(`Loading Context Processors from paths: ${paths}`);
    const contextProcessorsPaths = await fetchContextProcessorPaths(paths);
    contextProcessorsPaths.forEach(contextProcessorsPath => {
      const contextProcessor = require(contextProcessorsPath);
      if (utils.isValidContextProcessor(contextProcessor)) {
        const hasName = contextProcessor.hasOwnProperty(NAME);
        const contextProcessorName = !hasName
          ? getContextProcessorNameFromPath(contextProcessorsPath)
          : contextProcessor.name;
        loadedContextProcessors[contextProcessorName] = !hasName
          ? Object.assign(contextProcessor, {
              name: contextProcessorName
            })
          : contextProcessor;
      }
    });
  };

  /**
   * Loads the Context Processors found in TODO refactor.
   * @param contextProcessorObjects TODO
   */
  const loadContextProcessorsFromObjects = async function loadContextProcessorsFromObjects(
    contextProcessorObjects = []
  ) {
    let i = 0;
    contextProcessorObjects = Array.isArray(contextProcessorObjects)
      ? contextProcessorObjects
      : [contextProcessorObjects];
    log(
      `Loading ${contextProcessorObjects.length} Context Processor(s) from objects.`
    );
    contextProcessorObjects.forEach(contextProcessorsObj => {
      if (utils.isValidContextProcessor(contextProcessorsObj)) {
        const hasName = contextProcessorsObj.hasOwnProperty(NAME);
        const contextProcessorName =
          (hasName && contextProcessorsObj.name) ||
          'AnonymousContextProcessor' + i++;
        loadedContextProcessors[contextProcessorName] = !hasName
          ? Object.assign(contextProcessorsObj, {
              name: contextProcessorName
            })
          : contextProcessorsObj;
      }
    });
  };

  await loadContextProcessorsFromObjects(contextProcessors);
  await loadContextProcessorsFromPaths(paths); // Wait for the CPs to be loaded.
  const contextProcessorNames = Object.keys(loadedContextProcessors);
  log(
    `Loaded ${contextProcessorNames.length} Context Processors: ${contextProcessorNames.join(
      ', '
    )}\n`
  );

  return {
    execute,
    loadContextProcessorsFromPaths: loadContextProcessorsFromPaths
    //TODO loadContextProcessorsFromObjects
  };
};
