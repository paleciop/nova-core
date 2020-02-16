const describe = require('riteway').describe;
const nova = require('../');

describe('TestCategory', async assert => {
  const configuration = { paths: './examples/main-example/context-processors' };
  const contextProcessorEngine = await nova.fetchContextProcessorEngine(configuration);
  const initialContentModel = {};
  const executionContext = { categories: 'test' };
  const contentModel = await contextProcessorEngine.execute(executionContext, initialContentModel);

  assert({
    given: 'The First, Second and Third Context Processors run',
    should: `return '123' in the test context.`,
    actual: contentModel.test,
    expected: '123'
  });

  assert({
    given: 'The First, Second and Third async Context Processors run',
    should: `return '312' in the asyncTest context.`,
    actual: contentModel.asyncTest,
    expected: '312'
  });

  assert({
    given: 'The Independent Async Context Processor runs',
    should: `return 'This property was added by the IndependentAsyncContextProcessor' in the independentAsync context.`,
    actual: contentModel.independentAsync,
    expected: 'This property was added by the IndependentAsyncContextProcessor'
  })

});