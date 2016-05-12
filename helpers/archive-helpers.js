var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

var test = require('../workers/htmlfetcher');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

//test.fileDownloader();

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, function(err, data) {
    if (err) {
      throw err;
    }
    data = data.toString('ascii');
 //   data.trim();
    data = data.split('\n');
    callback(data);
  });

};

exports.isUrlInList = function(target, callback) {
  var found = false;
  this.readListOfUrls(function(data) {
    _.each(data, function(value) {
      if (target === value) {
        callback(true);
        found = true;
      }
    });

    if (!found) {
      callback(false);
    }
  });

};

exports.addUrlToList = function(url, callback) {

  fs.appendFile(this.paths.list, url + '\n', function(err) {
    if (err) {
      throw err;
    }
    callback(url); //isURLinList
  });
};

exports.isUrlArchived = function(url, callback) {
  var found = false;
  fs.readdir(this.paths.archivedSites, function(err, data) {
    if (err) {
      throw err;
    }
    _.each(data, function(filename) {
      if (filename === url) {
        callback(true);
        found = true;
      }
    });
    if (!found) {
      callback(false);
    }
  });

  
};

exports.downloadUrls = function(urlArray) {
  var that = this;

  _.each(urlArray, function(url) {
    if (url !== '') {
      http.get('http://' + url, function(response) {
      
        var body = '';
        response.on('data', function(chunk) {
          body += chunk;
        });
        //console.log('body', body);

        response.on('end', function(err) {
          if (err) { 
            throw err;
          }
          fs.writeFile(that.paths.archivedSites + '/' + url, body, function(err) {
            if (err) {
              throw err;
            }

          });
        });

      });
    }
  });
  
};
