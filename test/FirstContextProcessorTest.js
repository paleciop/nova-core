const describe = require('riteway').describe;
const contextProcessor = require('../examples/main-example/context-processors/FirstContextProcessor');

describe('FirstContextProcessor', async assert => {
  const contentModel = {};
  contextProcessor.process({}, contentModel);
  assert({
    given: 'the first Context Processor',
    should: `return '1' in its test context.`,
    actual: contentModel.test,
    expected: '1'
  })

});