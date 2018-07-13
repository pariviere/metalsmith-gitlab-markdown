var basename = require('path').basename;
var debug = require('debug')('metalsmith-gitlab-markdown');
var dirname = require('path').dirname;
var extname = require('path').extname;
var axios = require('axios');
var pluginKit = require("metalsmith-plugin-kit");

/**
 * Expose `plugin`.
 */

module.exports = plugin;

var promiseQueues;

function plugin(opts) {
  opts = pluginKit.defaultOptions({
      pattern: [],
      apiUrl: 'https://framagit.org/api/v4/markdown',
      apiOptions: {gfm: true}
  }, opts);

  return pluginKit.middleware({
      each: (filename, file, files) => {
        promise = queueMarkdownTransformation(opts, files, filename, file);
        promiseQueues.push(promise);
      },
      match: "*.{md,markdown}",
      matchOptions: {
          basename: true
      },
      after: (files) => {
        return Promise.all(promiseQueues).then(function(values) {
          debug("all proceed");
        })
      },
      before: () => {
        promiseQueues = [];
      }
  });
}


function queueMarkdownTransformation(opts, files, filename, file) {
  var dir = dirname(filename);

  var html = basename(filename, extname(filename)) + '.html';
  if ('.' != dir) html = dir + '/' + html;

  // remove markdown suffix filename
  // to be replace by html 
  debug('delete file : %s', filename);
  delete files[filename];
  
  // include html filename
  debug('include file : %s', filename);
  files[html] = file;

  var contents = file.contents.toString("utf8");

  var params = Object.assign({text: contents}, opts.apiOptions);

  return axios.post(opts.apiUrl, params).then(response => {
    debug('response received');
    file.contents = Buffer.from(response.data.html, "utf8");
  })
}
