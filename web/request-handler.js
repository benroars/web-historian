var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

// var sendResponse = function(response, data, statusCode) {
// 	statusCode = statusCode || 200;
// 	response.writeHead(statusCode, helpers.headers);
// 	response.end(JSON.stringify(data));
// }

// var collectData = function(request, callback) {
// 	var data = '';
// 	request.on('data', function(chunk) {
// 		data += chunk;
// 	});

// 	console.log('the chunks', data);
// 	request.on('end', function() {
// 		callback( JSON.parse(data) );
// 	});
// }

var actions = {

  'GET': function(request, response) {
		
    var path = url.parse(request.url).pathname;
	
	//the path will always be /sitename
    if (path === '/') {
      path = '/index.html';
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
      body += '\n';
      fs.appendFile(archive.paths.list, body, 'utf8', function(err) {
        if(err) {
          throw err;
        }
        response.writeHead(302, helpers.headers);
        response.end();
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
	
	//archive.paths.list is the list of urls in sites.txt
  //response.end(archive.paths.list);
};
