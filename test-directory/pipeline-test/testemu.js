/**
  I/O pipeline between browser and app.js.
*/

$(document).ready(function(){
    //Inititialize canvas
  var canvas = $("#canvas")[0];
  var ctxt = canvas.getContext("2d");
  var w = $("#canvas").width();
  var h = $("#canvas").height();
  
  var bg = new Image();
  var images = []; // GameObject array

  function addResource (x, y, imgFile) {
    images.push(new GameObject(x, y, imgFile));    
  }

  function setBG(bgFile){
    bg.src = bgFile;    
  }

  
  // start gameloop
  function init () {
    paint();
    if (typeof game_loop != "undefined") clearInterval(game_loop);
    game_loop = setInterval(paint, 60);
  }

  function paint () {
    ctxt.fillStyle = "red";
    ctxt.rect(20,20,150,100);
    ctxt.fill();
    ctxt.drawImage(spriteImage, imagePos[1], imagePos[0]);
  }

});

