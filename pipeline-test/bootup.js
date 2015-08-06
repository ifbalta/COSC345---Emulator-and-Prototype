/*
	node server to avoid Chrome cross origin errors
*/
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 3000);
console.log("started node server on port 3000 for emulator app testing");