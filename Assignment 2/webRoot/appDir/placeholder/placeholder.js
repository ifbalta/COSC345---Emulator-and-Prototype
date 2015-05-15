/**
 *  placeholder.js
 *
 *  Draws a red rectangle in the upper left corner.
 *  Test a script that draws one object once, without
 *  worrying about the AppObject structure.
 *
 *  Author: Isabel Baltazar
 *          Lennox Huang
 *
 *  Version: 1.0.0.0
 *  Language: JavaScript
 *  Dependencies: jQuery version 1.11.1
 *
 * */
$(document).ready(function(){
	var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    ctx.fillStyle = "red";
    ctx.rect(20,20,150,100);
	ctx.fill();
});