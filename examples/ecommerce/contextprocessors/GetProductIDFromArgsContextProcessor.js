'use strict';

const contextProcessor = require('../../../index').contextProcessor;

module.exports = contextProcessor.extend({
  categories: ['product'],
  priority: 20,
  name: 'Get Product ID From Args Context Processor',
  process (executionContext, contentModel) {
    const paramsArray = process.argv.slice(2);
    const productId = paramsArray.length > 1 && paramsArray[0] === '--productId' && Number.parseInt(paramsArray[1]) || null;
    if(Number.isInteger(productId)) {
      contentModel.productId = productId;
    }

  }
});