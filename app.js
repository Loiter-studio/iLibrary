"use strict";
var encypt = require('../lib/sha1.js');

function valid(req){
	var echoStr = req.query.echostr;
	var signature = req.query.signature;
	
	var token = "qihang";
	var args = Array();
	args.push(req.query.timestamp);
	args.push(req.query.nonce);
	args.push(token);
	
	if(signature == encypt(args.sort().join(''))){
		return echoStr;
	}
}

server = http.createServer(function(req, res){
	res.writeHeader(200, {"Content-Type": "text/plain"});
	res.end(valid(req));
});
server.listen(3000);
console.log("listen 3000");