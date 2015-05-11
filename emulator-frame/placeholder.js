$(document).ready(function(){
	var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    var x = 20;
    var y = 20;
    ctx.fillStyle = "red";
    ctx.rect(x,y,10,50);
    ctx.fill();
 });