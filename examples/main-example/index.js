/**
 * This is an example of Nova's capabilities, uses sync and async Context Processors with different with different priorities in
 * an attempt to show all the possible configurations.
 */
'use strict';

const nova = require('../..'); // Require the Nova framework

(async () => {
  const ObjectContextProcessor = {
    // Define a Context Processor as a JavaScript Object
    name: 'ObjectContextProcessor',
    categories: 'test',
    process(executionContext, contentModel) {
      console.log(
        '> ObjectContextProcessor - This Context Processor runs independently from the rest.'
      );
      contentModel.independentProperty =
        'This property was added by the Context Processor that was defined as an object';
    }
  };

  // Define the context processor objects and the paths where the Context Processors are found.
  const configuration = {
    contextProcessors: [ObjectContextProcessor],
    paths: __dirname + '/context-processors'
  };
  // Initialize the context Processor engine.
  const contextProcessorEngine = await nova.fetchContextProcessorEngine(
    configuration
  );
  // The starting content model
  const initialContentModel = {};
  // The starting execution context, where the categories are defined
  const executionContext = { categories: 'test' };
  console.log('> Context Processor engine start.');
  // Execute the context processor engine against the specified execution context and content model.
  const contentModel = await contextProcessorEngine.execute(
    executionContext,
    initialContentModel
  );

  if (contentModel.debug) {
    //Output the visual representation to an HTML file
    require('fs').writeFileSync(
      __dirname + '/debug.html',
      contentModel.debug.visualRepresentation
    );
  }
  // Log the results.
  console.log('Final Content Model:', JSON.stringify(contentModel, null, 2));
})();
