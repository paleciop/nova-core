'use strict';
console.log('>>>> Testing Nova Core.');

const nova = require('../index');
const fsPromised = require('../lib/fsPromised');

nova.fetchContextProcessorEngine({paths: ['test/contextprocessors']}).then(contextProcessorEngine => console.log(contextProcessorEngine.execute('test', {})));

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
