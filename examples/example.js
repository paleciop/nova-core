'use strict';
console.log('>>>> Testing Nova Core.');

const nova = require('../index');
const fsPromised = require('../lib/fsPromised');

const templatingEngine = nova.templatingEngine;

async function test () {
  const cpe = await nova.fetchContextProcessorEngine({paths: ['examples/contextprocessors']});
  cpe.execute('test', {}).then(contentModel => {
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
    console.log(templatingEngine.compileTemplate(html, contentModel))
  });

}
test();

