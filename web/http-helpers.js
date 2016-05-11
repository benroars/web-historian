// var path = require('path');
// var fs = require('fs');
// var archive = require('../helpers/archive-helpers');

// exports.headers = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10, // Seconds.
//   'Content-Type': 'text/html'
// };

// exports.serveAssets = function(response, asset, callback) {
//   // Write some code here that helps serve up your static files!
//   // (Static files are things like html (yours or archived from others...),
//   // css, or anything that doesn't change often.)

//   if(asset.split('.')[1] === 'css') {
//   	type = 'text/css';
//   } else {
//   	type = 'text/html'
//   }

//   if(asset.split('.')[2] === 'com') {
// 	  console.log('found com', archive.paths.archivedSites + asset);
// 	  fs.readFile(archive.paths.archivedSites + asset, function(error, content) {
//       if (error) {
//       	console.log('error', error);
//         callback(404, type, '500 code');
//       } else {
//         callback(200, type, content);
//       }
// 	  });
	
// 	} else {

// 		fs.readFile(archive.paths.siteAssets + asset, function(error, content) {
//       if (error) {
//       	console.log('error', error);
//         callback(404, type, '500 code');
//       } else {
//         callback(200, type, content);
//       }
// 	  });

// 	}

// };



// // As you progress, keep thinking about what helper functions you can put here!


// exports.postURL = function(request, callback) {



// }



