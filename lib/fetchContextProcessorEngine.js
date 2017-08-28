/**
 * TODO finish documenting.
 * @fileOverview Contains the logic for the Context Processor Engine.
 * @author <a href="mailto:paleciop@gmail.com">Pablo Alecio</a>
 */
'use strict';

const contextProcessor = require('./contextProcessor');
const utils = require('./utils');
const fsPromised = require('./fsPromised');
const C = require('./constants');
const path = require('path');

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
  const priorityComparator = (contextProcessor1, contextProcessor2) =>
    contextProcessor2.priority - contextProcessor1.priority;

  /**
   *
   * @param {Array} cats the categories to evaluate.
   * @param {Object} contentModel the Content Model to operate on.
   * @returns {Promise.<Object>} A promise that when resolved, returns the object
   */
  const execute = function execute(cats = [], contentModel = {}) {
    console.log('>> Executing Context Processors.');
    const categories = Array.isArray(cats) ? cats : [cats]; // If cats is a string, turn it into an Array.
    /**
     * Accepts filter.
     * @param contextProcessor The Context Processor to evaluate.
     */
    const accepts = contextProcessor => contextProcessor.accepts(categories);
    console.time('Execute');
    return Object.values(contextProcessors) // Get the Context Processor Objects.
      .filter(accepts) // Remove the Context Processors that don't need to be executed.
      .sort(priorityComparator) // Sort the Context Processors by priority.
      .reduce((arrangedContextProcessors, contextProcessor) => { // Reduce the CPs into arrays of CPs with the same priority.
        // See if there's already an array of CPs with the same priority.
        const samePriorityContextProcessors = arrangedContextProcessors.find(
          element => element[0].priority === contextProcessor.priority
        );

        if (samePriorityContextProcessors) { // If there's an array of CPs with the same priority, add the current one.
          samePriorityContextProcessors.push(contextProcessor);
        } else { // If there isn't, add a new array with the current CP.
          arrangedContextProcessors.push([contextProcessor]);
        }
        return arrangedContextProcessors;
      }, [])
      .reduce( // Reduce the CPs into a Promise chain.
        (thePromise, contextProcessorArray) =>
          thePromise.then(() =>
            Promise.all(
              contextProcessorArray.map(contextProcessor =>
                // Wrap the results of .process() with Promise.resolve() to ensure a Promise is returned.
                Promise.resolve(contextProcessor.process(contentModel))
              )
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
   *
   * @param paths
   * @returns {Promise.<*>}
   */
  const fetchContextProcessorPaths = function fetchContextProcessorPaths(
    paths = []
  ) {
    return Promise.all(paths.map(fsPromised.walkFiles)).then(pathsArray =>
      pathsArray
        .reduce(utils.reducers.toSingleArray, [])
        .filter(utils.filters.unique)
    );
  };

  /**
   *
   * @param thePath
   */
  const getContextProcessorNameFromPath = (thePath = C.BLANK) =>
    path.basename(thePath).split(C.DOT)[0];

  /**
   *
   * @param paths
   */
  const loadContextProcessors = async function loadContextProcessors(
    paths = []
  ) {
    console.log('>> Loading Context Processors');
    console.log('>> Paths: ', paths);
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

  console.log('>> Context Processors:', Object.values(contextProcessors));

  return {
    execute,
    loadContextProcessors
  };
};
