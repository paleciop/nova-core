'use strict';

const contextProcessor = require('../../../index').contextProcessor;
const fs = require('fs').promises;

module.exports = contextProcessor.extend({
  categories: ['product'],
  priority: 40,
  name: 'Get Product Information Context Processor',
  process (executionContext, contentModel) {
    return fs.readFile('./examples/ecommerce/db/products.json').then(productsBuffer => {
      const productsJson = JSON.parse(productsBuffer.toString());
      contentModel.product = productsJson.find(product => product.id === contentModel.productId) || {};
    });
  }
});