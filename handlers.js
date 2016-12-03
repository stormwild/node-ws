function sleep(ms) {
    var startTime = new Date().getTime();
    while(new Date().getTime() < startTime + ms );
}

function start() {
    console.log("Request handler 'start' was called.");
    sleep(10000);
    return 'Hello Start';
}

function upload() {
    console.log("Request handler 'upload' was called.");
    return 'Hello Upload';
}

exports.start = start;
exports.upload = upload;