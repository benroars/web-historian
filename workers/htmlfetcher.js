// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

var cron = require('cron');

var cronJob = cron.job('*/5 * * * * *', function() {
 // exports.fileDownloader();
  console.log('cron completed');
});

exports.fileDownloader = function() {
  //console.log('started');
  
  archive.readListOfUrls(function(data) {
    console.log(data);
    archive.downloadUrls(data);
  });


  //console.log('run ? ');
};

//cronJob.start();