/**
 * @fileOverview Path Aware Context Processor, meant to be extended with {@link extend}
 * @author <a href="mailto:paleciop@gmail.com">Pablo Alecio</a>
 */
'use strict';

const RoutePattern = require('route-pattern');
const contextProcessor = require('./contextProcessor');

/**
 * @module lib/pathAwareContextProcessor
 *
 */
module.exports = contextProcessor.extend({
  /**
   * The context processor name.
   */
  name: 'PathAwareContextProcessor',
  /**
   * A list of URL patterns which the request path has to match in order for this Context Processor to be executed.
   */
  patterns: [],
  /**
   * Checks if this Context Processor has to be executed based on the path in the execution context.
   * @param {Object} executionContext The execution context.
   * @returns {boolean} True if the path sent as argument matches any of the patterns; false otherwise.
   */
  accepts(executionContext) {
    const thePath = executionContext.path || (executionContext.request && executionContext.request.path) || C.BLANK;
    let accepts = false;
    for (let i = 0; i < this.patterns.length; i++) {
      const routePattern = RoutePattern.fromString(this.patterns[i]);
      accepts = routePattern.matches(thePath);
      if (accepts) {
        executionContext.match = routePattern.match(thePath);
        break;
      }
    }
    return accepts;
  }
});
