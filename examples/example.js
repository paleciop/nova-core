'use strict';
console.log('>>>> Testing Nova Core.');

const nova = require('../index');

const templatingEngine = nova.templatingEngine;

async function test () {
  const cpe = await nova.fetchContextProcessorEngine({paths: ['./examples/contextprocessors']});
  const originalContentModel = {original: true};
  console.log('Input Content Model', originalContentModel);
  cpe.execute({path: "/api/docs/testname"}, originalContentModel).then(contentModel => {
    console.log('Content Model: ', contentModel);
    const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
        </head>
        <body>
            <p>Test: {% test %}</p>
            <p>Test2: {% test2 %}</p>
            <p>Test3: {%test3%}</p>
            <p>Test5: {%test5%}</p>
        </body>
        </html>`;
    console.log('Output Content Model', contentModel);
  });

}
test();

