
function route(handler, pathname, res, postData) {
    console.log("About to route a request for " + pathname);
    
    if (typeof handler[pathname] === 'function') {
        return handler[pathname](res, postData);
    } else {
        console.log("No request handler found for " + pathname);
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write('404 Not found');
        res.end();
    }
}

exports.route = route;