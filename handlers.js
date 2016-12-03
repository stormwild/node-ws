var exec = require('child_process').exec;

function sleep(ms) {
    var startTime = new Date().getTime();
    while(new Date().getTime() < startTime + ms );
}

function start(res, postData) {
    console.log("Request handler 'start' was called.");
    
    var body = '<!doctype html>'
+ '<html lang="en">'
+ '<head>'
+ '    <meta charset="UTF-8">'
+ '    <title>Node File Upload Sample Application</title>'
+ '</head>'
+ '<body>'
+ '    <form action="/upload" method="post">'
+ '        <textarea name="text" rows="20" cols="60"></textarea>'
+ '        <input type="submit" value="Submit"/>'
+ '    </form>'
+ '</body>'
+ '</html>';

    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(body);
    res.end();
}

function upload(res, postData) {
    console.log("Request handler 'upload' was called.");
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("You've sent: " + postData);
    res.end();
}

exports.start = start;
exports.upload = upload;