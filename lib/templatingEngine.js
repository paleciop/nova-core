/**
 * @fileOverview Contains the logic for the Templating Engine.
 * @author <a href="mailto:paleciop@gmail.com">Pablo Alecio</a>
 */
'use strict';

const handlebars = require('handlebars');

/**
 * Replaces '{%' and '%}', custom delimiters with handlebars' default ones ('{{' and '}}')
 * @param {string} markup The markup with custom delimiters
 * @returns {string} the markup with default handlebars delimiters.
 */
const replaceDelimiters = markup => markup.replace(/{%/g, '{{').replace(/%}/g, '}}');

/**
 * Compiles the <tt>markup</tt> using the <tt>contentModel</tt>
 * @param {string} markup
 * @param {Object} contentModel
 * @returns {string} the compiled markup
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

