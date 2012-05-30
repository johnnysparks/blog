var fs = require('fs');
/*
 * GET home page.
 */

exports.index = function(req, res){
  preload(function( pagedata ){
    pagedata.main = "";
    res.render('index', pagedata );
  });
};


exports.blog = function(req, res){
  var path = 'public/posts/'+req.params.entry+'.html';
  preload(function( pagedata ) {
    fs.stat(path, function( err, stats ){
      if( err ){ pagedata.main = ""; res.render('index', pagedata );}
      else {
        fs.readFile( path, 'ascii', function(err, fcontents){
          if( err ) { pagedata.main = "" }
          else {
            pagedata.main = fcontents.toString();
          }
          res.render('index', pagedata );
        });
      }
    });
  });
};


function preload( callback ){
  var pagedata = { title: 'E80;083', files : [] }
  fs.readdir('public/posts/', function(err, files){
    for(i in files){
      if( files[i].match(/[a-zA-Z_]\.html/) ){
        pagedata.files.push( {
          name: files[i].split('.')[0].replace(/_/gi, ' ').toUpperCase(),
          link: files[i].split('.')[0]
        });
      }
    }
    callback( pagedata );
  });
}
