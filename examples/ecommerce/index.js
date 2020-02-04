'use strict';

const nova = require('../../index');

(async function test () {
  const cpe = await nova.fetchContextProcessorEngine({paths: ['./examples/ecommerce/contextprocessors']});
  cpe.execute({categories: ['product']}, {productId: 1}).then(outputContentModel => {
    console.log('Content Model: ', JSON.stringify(outputContentModel, null, 2));
  }).catch(error => console.error(error));
})();
