/**
 * Error handling function. Receives an error and decides what to do with it based on its severity.
 * Fatal errors stop Context Processor execution while non-fatal errors just get logged and don't stop Context Processor execution.
 * @param error the error to be handled
 */
module.exports = error => {
  const isFatal = typeof error.isFatal === 'undefined' || error.isFatal;
  if (isFatal) { //It's fatal, we're screwed! Throw the error back so it stops execution and gets handled by the application.
    throw error;
  } else { //It's not fatal, log it and move on with life.
    console.error('Error handler', error.stack);
  }
};