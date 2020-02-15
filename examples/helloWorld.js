const nova = require('../index');

nova
  .fetchContextProcessorEngine({
    contextProcessors: {
      name: 'HelloWorld',
      categories: 'hw',
      process(ec, cm) {
        cm.greeting = 'Hello World';
      }
    }
  })
  .then(cpe => cpe.execute({ categories: 'hw' }, {}))
  .then(contentModel => console.log('Content Model:', contentModel));
