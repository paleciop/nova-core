/**
 * TODO finish documenting.
 * @fileOverview Promised File System operations.
 * @author <a href="mailto:paleciop@gmail.com">Pablo Alecio</a>
 */
'use strict';

const fs = require('fs-extra');
const klaw = require('klaw');

/**
 * 
 * @param directory
 * @param options
 * @returns {Promise}
 */
const walk = function walk(directory, options) {
  return new Promise((resolve, reject) => {
    const items = [];
    klaw(directory, options)
      .on('data', item => items.push(item))
      .on('end', () => resolve(items))
      .on('error', error => reject(error));
  });
};

/**
 * 
 * @param directory
 * @param options
 * @returns {Promise.<Array>}
 */
const walkDirectories = function walkDirectories(directory, options) {
  return walk(directory, options).then(items =>
    items.filter(item => item.stats.isDirectory()).map(item => item.path)
  );
};

/**
 * 
 * @param directory
 * @param options
 * @returns {Promise.<Array>}
 */
const walkFiles = function walkFiles(directory, options) {
  return walk(directory, options).then(items =>
    items.filter(item => item.stats.isFile()).map(item => item.path)
  );
};

/**
 * @module lib/fsPromised 
 * @type {{walk: walk, walkDirectories: walkDirectories, walkFiles: walkFiles}}
 */
module.exports = {
  walk,
  walkDirectories,
  walkFiles
};
