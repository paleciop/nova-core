# Nova

Provides a mechanism where the business logic is constructed as modular, granular and reusable pieces called Context Processors with a simple and clear API which is independent from any particular technology.
Allows to easily test the logic either piece by piece or several pieces in conjunction, reusing the Context Processor logic is as easy as executing them in a given order to obtain certain output and the program’s behavior can be modified without having to modify existing code by adding a new Context Processor to the chain.
Nova is a tool for creating web APIs written in JavaScript.

Based on XumaK's Danta Framework.

## Run example
```bash
node examples/example.js
```

## Run Tests
```bash
npm test
```

## Generate API docs
```bash
npm run jsdoc2md
```

```javascript
const nova = require('nova-core');

(async () => {
  const cpe = await nova.fetchContextProcessorEngine({paths: ['./contextprocessors']});
  const executionContext = {categories: 'test'};
  const initialContentModel = {};
  cpe.execute(executionContext, initialContentModel).then(contentModel => {
    console.log('Content Model:', contentModel);
  });
})();
```