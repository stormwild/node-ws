var http = require('http');
var url = require('url');
var formidable = require('formidable');
var sys = require('sys');

function start(route, handle) {
  var onReq = function(req, res) {
    
    if(req.url == '/upload' && req.method.toLowerCase() == 'post') {
      var form = new formidable.IncomingForm();
      form.parse(req, function(error, fields, files){
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(sys.inspect({fields: fields, files: files}));
      });
      return;
    }
    
    var body = '<!doctype html>'
+ '<html lang="en">'
+ '<head>'
+ '    <meta charset="UTF-8">'
+ '    <title>Node File Upload Sample Application</title>'
+ '</head>'
+ '<body>'
+ '    <form action="/upload" method="post" enctype="multipart/form-data">'
+ '        <input type="text" name="title"><br>'
+ '        <input type="file" name="upload" multiple="multiple"><br>'
+ '        <input type="submit" value="Upload"/>'
+ '    </form>'
+ '</body>'
+ '</html>';

    res.writeHead(200, {"Content-Type": "text/html"});
    //res.write();
    res.end(body);
    
    
    
  };
  
  var server = http.createServer(onReq);
  
  server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function (){
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
  });
}

exports.start = start;