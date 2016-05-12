var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

var actions = {

  'GET': function(request, response) {
		
    var path = url.parse(request.url).pathname;
	
	//the path will always be /sitename
    if (path === '/') {
      path = '/index.html';
      // path = '../../archives/sites/www.google.com';
     // path = '/www.google.com';
    }  
    helpers.serveAssets(response, path, function(status, type, content) {
      response.writeHead(status, {'Content-Type': type});
      response.end(content);
    });
	
  },

  'POST': function(request, response) {

    var path = url.parse(request.url).pathname;

    var body = '';
    
    request.on('data', function(chunk) {
      body += chunk;
    });

    request.on('end', function() {
      body = body.slice(4);


      archive.isUrlArchived(body, function(bool) {
        
        if (bool) {
          body = '/' + body;
          //console.log('should be /www.google.com', body);
          helpers.serveAssets(response, body, function(status, type, content) {
            response.writeHead(status, {'Content-Type': type});
            response.end(content);
          });
        } else {

          //need to add isUrlInList to not have repeats

          body = '\n' + body + '\n';
          fs.appendFile(archive.paths.list, body, 'utf8', function(err) {
            if (err) {
              throw err;
            }
            helpers.serveAssets(response, '/loading.html', function(status, type, content) {
              response.writeHead(status, {'Content-Type': type});
              response.end(content);
            });
          });

        }
      });  
    });

  }
};


exports.handleRequest = function (request, response) {


  var action = actions[request.method];
  if ( action ) {
    action(request, response);
  } else {
		//handle error
  }
	
};
