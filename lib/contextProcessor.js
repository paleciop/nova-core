'use strict';

module.exports = {
  priority: 50,
  name: 'ContextProcessor',
  categories: [],
  accepts(categories = []) {
    for (let i = 0; i < this.categories.length; i++) {
      if (categories.indexOf(this.categories[i]) !== -1) {
        return true;
      }
    }
  },
  process(contentModel) {
    console.log('Processing:', contentModel);
  },
  extend(extendedProperties) {
    const newObject = Object.create(this);
    return Object.assign(newObject, extendedProperties);
  }
};
