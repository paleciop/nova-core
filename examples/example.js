'use strict';
console.log('>>>> Testing Nova Core.');

const nova = require('../index');

async function test () {
  const cpe = await nova.fetchContextProcessorEngine({paths: ['./examples/contextprocessors']});
  const originalContentModel = {original: true};
  console.log('Input Content Model', originalContentModel);
  cpe.execute({path: "/api/docs/testname"}, originalContentModel).then(contentModel => {
    console.log('Content Model: ', JSON.stringify(contentModel, null, 2));
  });

}
test();

