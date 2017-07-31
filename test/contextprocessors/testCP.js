'use strict';

const contextProcessor = require('../../index').contextProcessor;

module.exports = contextProcessor.extend({
  categories: ['test'],
  name: 'Text ContextProcessor',
  accepts (categories = []) {
    for (let i = 0; i < this.categories.length; i++) {
      if (categories.indexOf(this.categories[i]) !== -1) {
        return true;
      }
    }
  },
  process (contentModel) {
    contentModel.test = 'Test Property!';
  }
});