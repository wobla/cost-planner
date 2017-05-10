var http = require("http");

const server = http.createServer(function(req, res) {
    console.log('Request received');
    res.writeHead(200, "OK", {'Content-Type': "text/plain"});
    //res.write("Hello world");
    res.end("Hello world v2", function(){
        console.log("HTTP response stream is finished");
    });
});

server.listen(8888, function(){
    console.log('Running on port 8888');
});