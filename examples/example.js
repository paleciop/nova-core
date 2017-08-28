'use strict';
console.log('>>>> Testing Nova Core.');

const nova = require('../index');
const fsPromised = require('../lib/fsPromised');

async function test () {
  const cpe = await nova.fetchContextProcessorEngine({paths: ['examples/contextprocessors']});
  cpe.execute('test', {}).then(contentModel => console.log('Content Model: ', contentModel));

}
test();

/*
fsPromised.walkFiles('./test/contextprocessors').then(files => console.log(files));
*/

/*const contextProcessor = require('../lib/contextProcessor');

console.log(contextProcessor);*/

/*
async function test () {
  console.log('Before');
  const a = await Promise.resolve('Async Await Test');
  console.log('After');
  return a;
}

test().then(a => console.log('Test results:', a));
*/
