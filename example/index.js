'use strict';
console.log('>>>> Testing Nova Core.');

const nova = require('../index');

const test = {categories: 'test', process(ec, cm) { cm.result = cm.firstNumber + cm.secondNumber; }};

(async () => {
  const cpe = await nova.fetchContextProcessorEngine({contextProcessors: [test]});
  const originalContentModel = {original: true, firstNumber: 2, secondNumber: 4};
  console.log('Input Content Model', originalContentModel);
  cpe.execute({categories: "test"}, originalContentModel).then(contentModel => {
    console.log('Content Model: ', JSON.stringify(contentModel, null, 2));
  });
})();

