/**
 * Fatal errors stop Context Processor execution. If or when a fatal error is thrown, the context processor engine will stop
 * the execution and throw the fatal error so it can be handled by the application. Uncaught errors in the Context Processor's
 * process() method will result in fatal errors. They can also be explicitly thrown, useful when a high
 * priority Context Processor on which many other Context Processors depend on fails; it would not make sense to continue
 * execution if a vital piece of data is missing.
 */
class FatalError extends Error {
  constructor(message) {
    super(message);
    this.name = "FatalError";
    this.isFatal = true;
  }
}

/**
 * Non-Fatal errors don't stop Context Processor execution. They will be caught and logged so they don't stop the execution
 * of the rest of Context Processors. Useful for independent Context Processors or for non-essential data.
 * Note: Non-Fatal errors will stop the execution of the Context Processor where they are thrown.
 */
class NonFatalError extends Error {
  constructor(message) {
    super(message);
    this.name = "NonFatalError";
    this.isFatal = false;
  }
}

/**
 * Nova errors
 * @type {{NonFatal: NonFatal, Fatal: Fatal}}
 */
module.exports = {
  //yourLife() {},
  FatalError,
  NonFatalError
};