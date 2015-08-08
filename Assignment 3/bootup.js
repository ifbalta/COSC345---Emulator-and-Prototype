/*
	node server powered by node Express.js
  to avoid Chrome cross origin errors
*/
var express = require('express');
var app = express();


app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 3000);
console.log("started serving maze game applicaton on port 3000");