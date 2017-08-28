/**
 * @fileOverview Contains the logic for the Templating Engine.
 * @author <a href="mailto:paleciop@gmail.com">Pablo Alecio</a>
 */
'use strict';

const handlebars = require('handlebars');

/**
 *
 * @param markup
 */
const replaceDelimiters = markup => markup.replace(/{%/g, '{{').replace(/%}/g, '}}');

/**
 *
 * @param markup
 * @param contentModel
 * @returns {*}
 */
const compileTemplate = (markup, contentModel) => {
  const newMarkup = replaceDelimiters(markup);
  const template = handlebars.compile(newMarkup);
  return template(contentModel);
};

/**
 * @module lib/templatingEngine
 * @type {{compileTemplate: (function())}}
 */
module.exports = { compileTemplate };

