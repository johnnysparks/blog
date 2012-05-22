var fs = require('fs');
/*
 * GET home page.
 */

exports.index = function(req, res){
  var data = { title: 'E80;083', files : [] }
  fs.readdir('public/posts/', function(err, files){
    for(i in files){
      if( files[i].match(/[a-zA-Z_]\.html/) ){
        data.files.push( {
          name: files[i].split('.')[0].replace(/_/gi, ' ').toUpperCase(),
          link: files[i].split('.')[0]
        });
      }
    }
    res.render('index', data );
  });
};


