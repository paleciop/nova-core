const nova = require('../index');

nova
  .fetchContextProcessorEngine({
    contextProcessors: {
      name: 'HelloWorld',
      categories: 'hw',
      process(executionContext, contentModel) {
        contentModel.greeting = 'Hello World';
      }
    }
  })
  .then(contextProcessorEngine =>
    contextProcessorEngine.execute({ categories: 'hw' }, {})
  )
  .then(contentModel => console.log('Content Model:', contentModel));
