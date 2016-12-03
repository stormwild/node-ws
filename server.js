var http = require('http');
var url = require('url');

function start(route, handle) {
  var onReq = function(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
    
    res.writeHead(200, { "Content-Type": "text/plain" });
    var content = route(handle, pathname);
    res.write(content);
    res.end();
  };
  
  var server = http.createServer(onReq);
  
  server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function (){
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
  });
}

exports.start = start;