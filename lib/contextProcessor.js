'use strict';

module.exports = {
  priority: 50,
  name: 'ContextProcessor',
  categories: [],
  accepts () {
    return true;
  },
  process (contentModel) {
    console.log('Processing:', contentModel);
  },
  extend (extendedProperties) {
    const newObject = Object.create(this);
    return Object.assign(newObject, extendedProperties);
  }
};