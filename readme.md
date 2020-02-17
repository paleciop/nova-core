# Nova

Nova is a JavaScript framework based on [XumaK](https://xumak.com)'s [Danta](https://github.com/DantaFramework). It provides a mechanism where the business logic is constructed as modular, granular and reusable pieces called Context Processors, has a simple and clear API which is independent from any particular technology and allows to easily test the logic either piece by piece or several pieces in conjunction.

## Motivation
Even though XumaK's Danta solved many development problems for content management applications of the time,
it still had some areas of improvement. Nova addresses some of these problems _and_ it's written in JavaScript!
Some of the improvements Nova has over Danta are:

- Parallel Context Processor execution
- Context Processors can be simple JavaScript objects, reducing overhead and boilerplate code
- Danta was oriented towards Content Management applications while Nova can be used to create pretty much anything (especially web APIs).

## Install

```javascript
npm install @palecio/nova-core
```

## Hello World

```javascript
const nova = require('@palecio/nova-core'); // import framework

nova
  .fetchContextProcessorEngine({ // get a promise that when resolved will return the context processor engine
    contextProcessors: { // the context processor object, can be a single object or an array of objects
      name: 'HelloWorld',
      categories: 'hw',
      process(executionContext, contentModel) { // this is where the context processor logic goes
        contentModel.greeting = 'Hello World';
      }
    }
  })
  .then(contextProcessorEngine => contextProcessorEngine.execute({ categories: 'hw' }, {})) // the execute() method receives an execution context and an initial content model
  .then(contentModel => console.log('Content Model:', contentModel)); // get the resulting content model
```

## Context Processors

Context Processors are small, modular, granular and reusable pieces of code. The results from these Context Processors are values aggregated to a generic stack called
"context". The order of execution determines the final result and there is no way of manipulating the output directly from any specific Context Processor. The context
is a hierarchical stack that stores properties with their values. These properties can be nested and have the concept of "scope". For example, a variable set by a higher
Context Processor will be available in all the following Context Processors and all the modifications to that variable affect the whole scope and all its children A variable
set in a lower Context Processor won’t be available in Context Processors above it so the effects become incrementally granular.
In this way, each processing level adds to the one before and creates unique variables that are available after but won’t conflict with other Context Processor scopes or its children.
Context Processors are meant to be very small and lightweight. They do the least amount of processing needed and rely on following Context Processors to modify their result (if required) into something appropriate.

### Independent CPs

### Dependent CPs

### Content Model
TODO

### Execution Context
TODO

### Context Processor Flow Example
![Context Processor Diagram](./docs/img/NovaContextProcessorExample.jpg)

### Anatomy of a Context Processor

![Anatomy of a Context Processor](./docs/img/context-processor-anatomy.png)

## Error Handling
TODO

## Run example
```bash
node run example
```

## Run Tests
```bash
npm test
```
---
**Author: Pablo Alecio (paleciop@gmail.com)**
