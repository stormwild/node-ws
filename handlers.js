var querystring = require("querystring"),
    fs = require("fs"), 
    formidable = require('formidable');

var body = '<!doctype html>'
+ '<html lang="en">'
+ '<head>'
+ '    <meta charset="UTF-8">'
+ '    <title>Node File Upload Sample Application</title>'
+ '</head>'
+ '<body>'
+ '    <form action="/upload" method="post" enctype="multipart/form-data">'
+ '        <input type="file" name="upload">'
+ '        <input type="submit" value="Upload File"/>'
+ '    </form>'
+ '</body>'
+ '</html>';

var bodyUpload = '<!doctype html>'
+ '<html lang="en">'
+ '<head>'
+ '    <meta charset="UTF-8">'
+ '    <title>Node File Upload Sample Application</title>'
+ '</head>'
+ '<body>'
+ '    <p>Received img</p>'
+ '    <img src="/show">'
+ '</body>'
+ '</html>';

function start(res, req) {
    console.log("Request handler 'start' was called.");

    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(body);
    res.end();
}

function upload(res, req) {
    console.log("Request handler 'upload' was called.");
    
    var form = new formidable.IncomingForm();
    
    form.parse(req, function(error, fields, files) {
        console.log('parsing done');    
        fs.rename(files.upload.path, "/tmp/test.png", function(error){
           if(error) {
               fs.unlink("/tmp/test.png");
               fs.rename(files.upload.path, "/tmp/test.png");
           } 
        });
    });
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(bodyUpload);
    res.end();
}

function show(res, req) {
    console.log('Request handler "show" was called');
    res.writeHead(200, {"Content-Type": "img/png"});
    fs.createReadStream("/tmp/test.png").pipe(res);
}

exports.start = start;
exports.upload = upload;
exports.show = show;