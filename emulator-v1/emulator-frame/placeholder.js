$(document).ready(function(){
	var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    ctx.fillStyle = "red";
    ctx.rect(20,20,150,100);
	ctx.fill();
});