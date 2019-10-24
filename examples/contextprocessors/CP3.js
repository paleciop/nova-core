'use strict';

const contextProcessor = require('../../index').pathAwareContextProcessor;
const Warning = require('../../index').errors.Warning;

module.exports = contextProcessor.extend({
  patterns: ["/api/document/*", "/api/docs/:name"],
  name: 'CP3 50',
  priority: 50,
  process (executionContext, contentModel) {
    console.log('CP3 start');
    contentModel.test = 'CP3';
    //throw new Warning('Whoa!');
    return Promise.resolve('hello 3').then(a => console.log('CP3 end') || a);
  }
});