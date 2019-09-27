/**
 * TODO finish documenting.
 * @fileOverview Contains the logic for the Context Processor Engine.
 * @author <a href="mailto:paleciop@gmail.com">Pablo Alecio</a>
 */
'use strict';

const utils = require('./utils');
const fsPromised = require('./fsPromised');
const C = require('./constants');
const path = require('path');

const log = utils.log;

/**
 * @module lib/fetchContextProcessorEngine
 * @param {Object} configuration The config object.
 * @returns {{execute: execute, loadContextProcessors: loadContextProcessors}}
 */
module.exports = async function fetchContextProcessorEngine(
  configuration = {}
) {
  /**
   * The paths where the Context Processor Engine should look for Context Processors.
   * @type {Array}
   */
  const { paths = [] } = configuration;

  /**
   * The loaded Context Processors
   * @type {Object}
   */
  const contextProcessors = {};

  /**
   * Compares the priorities between the two context processors sent as arguments.
   * @param contextProcessor1
   * @param contextProcessor2
   * @return {number} -1 if  <tt>contextProcessor1</tt>.priority > <tt>contextProcessor2</tt>.priority, 1 if <tt>contextProcessor1</tt>.priority < <tt>contextProcessor2</tt>.priority and 0 if both priorities are equal.
   */
  const priorityComparator = (contextProcessor1, contextProcessor2) => contextProcessor2.priority - contextProcessor1.priority;

  /**
   *
   * @param {Object} executionContext the executionContext.
   * @param {Object} originalContentModel the original Content Model to operate on.
   * @returns {Promise.<Object>} A promise that when resolved, returns the object
   */
  const execute = function execute(executionContext, originalContentModel = {}) {
    const contentModel = JSON.parse(JSON.stringify(originalContentModel)); // Deep clone the content model

    /**
     * Accepts filter.
     * @param contextProcessor The Context Processor to evaluate.
     */
    const accepts = contextProcessor =>
      contextProcessor.accepts(executionContext);

    console.time('Execute');
    return Object.values(contextProcessors) // Get the Context Processor Objects.
      .filter(accepts) // Remove the Context Processors that don't need to be executed.
      .sort(priorityComparator) // Sort the Context Processors by priority.
      .reduce((arrangedContextProcessors, contextProcessor) => {// Reduce the CPs into arrays of CPs with the same priority.

        if (typeof contextProcessor.priority !== 'undefined') {
          // See if there's already an array of CPs with the same priority.
          const samePriorityContextProcessors = arrangedContextProcessors.find(
            element => element[0].priority === contextProcessor.priority
          );

          if (samePriorityContextProcessors) {
            // If there's an array of CPs with the same priority, add the current one.
            samePriorityContextProcessors.push(contextProcessor);
          } else {
            // If there isn't, add a new array with the current CP.
            arrangedContextProcessors.push([contextProcessor]);
          }
        } else { // If the priority is undefined, the context processor is considered independent, so we put it at the beginning of the list.
          if (arrangedContextProcessors.length > 0) {
            arrangedContextProcessors[0].push(contextProcessor);
          } else {
            arrangedContextProcessors.push([contextProcessor]);
          }
        }

        return arrangedContextProcessors;
      }, [])
      .filter(cps => { // Add Context Processor name to the statistics object in the content model.
        const names = cps.length === 1 ? cps[0].name : cps.map(cp => cp.name);
        if (Array.isArray(contentModel.statistics)) {
            contentModel.statistics.push(names);
        } else {
          contentModel.statistics = [names];
        }
        return true;
      })
      .reduce(
        // Reduce the CPs into a Promise chain.
        (thePromise, contextProcessorArray) =>
          thePromise.then(() =>
            Promise.all(
              contextProcessorArray.map(contextProcessor => {
                const match = contextProcessor.getMatch(executionContext);
                const executionContextCopy = Object.assign({match}, executionContext);
                // Wrap the results of .process() with Promise.resolve() to ensure a Promise is returned.
                return Promise.resolve(
                  contextProcessor.process(executionContextCopy, contentModel)
                );
              })
            )
          ),
        Promise.resolve() // The initial promise.
      )
      .then(() => {
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
  const getContextProcessorNameFromPath = (thePath = C.BLANK) =>
    path.basename(thePath).split(C.DOT)[0];

  /**
   * Loads the Context Processors found in the paths provided.
   * @param paths The paths to look for Context Processors in.
   */
  const loadContextProcessors = async function loadContextProcessors(
    paths = []
  ) {
    log('Loading Context Processors from paths: ');
    log(paths);
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
  };

  await loadContextProcessors(paths); // Wait for the CPs to be loaded.
  const contextProcessorNames = Object.keys(contextProcessors);
  log(`Loaded ${contextProcessorNames.length} Context Processors:`);
  log(contextProcessorNames);

  return {
    execute,
    loadContextProcessors
  };
};
