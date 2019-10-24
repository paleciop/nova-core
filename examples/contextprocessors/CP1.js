'use strict';

const contextProcessor = require('../../index').pathAwareContextProcessor;
const NonFatalError = require('../../index').errors.NonFatalError;

module.exports = contextProcessor.extend({
  patterns: ["/api/document/*", "/api/docs/testname"],
  priority: 40,
  name: 'CP1 40',
  process (executionContext, contentModel) {
    console.log('CP1 start');
    //throw new NonFatalError('CP111111!!!!')
    contentModel.test2 = 'Path CP Property45';
    return Promise.resolve('CP1!').then(a => console.log('CP1 end') || a);
  }
});