'use strict';

const fs = require('fs-extra');
const klaw = require('klaw');

const walk = function walk(directory, options) {
  return new Promise((resolve, reject) => {
    const items = [];
    klaw(directory, options)
      .on('data', item => items.push(item))
      .on('end', () => resolve(items))
      .on('error', error => reject(error));
  });
};

const walkDirectories = function walkDirectories(directory, options) {
  return walk(directory, options).then(items =>
    items.filter(item => item.stats.isDirectory()).map(item => item.path)
  );
};

const walkFiles = function walkFiles(directory, options) {
  return walk(directory, options).then(items =>
    items.filter(item => item.stats.isFile()).map(item => item.path)
  );
};

module.exports = {
  walk,
  walkDirectories,
  walkFiles
};
