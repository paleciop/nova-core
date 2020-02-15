const nova = require('../index');
console.log(nova);
nova
  .fetchContextProcessorEngine({
    contextProcessors: {
      name: 'TemplatingEngineHelloWorld',
      categories: 'tehw',
      process(ec, cm) {
        cm.world = 'World!';
      }
    }
  })
  .then(cpe => cpe.execute({ categories: 'tehw' }, { hello: 'Hello' }))
  .then(contentModel => {
    console.log(
      nova.compileTemplate('<h1>{{hello}} {{world}}</h1>', contentModel)
    );
  });
