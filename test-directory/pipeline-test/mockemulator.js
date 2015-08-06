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
  var imagePos = initializePos();
  var spriteImage = new Image();
  spriteImage.src = getImage();

  var uFlag = false;
  var dFlag = false;
  var lFlag = false;
  var rFlag = false;

  // start gameloop
  function init () {
    paint();
    if (typeof game_loop != "undefined") clearInterval(game_loop);
    game_loop = setInterval(paint, 60);
  }

  function paint () {
    imagePos = updatePosition(uFlag, dFlag, lFlag, rFlag);
    ctxt.fillStyle = "red";
    ctxt.rect(20,20,150,100);
    ctxt.fill();
    ctxt.drawImage(spriteImage, imagePos[1], imagePos[0]);
    uFlag = false;
    dFlag = false;
    lFlag = false;
    rFlag = false;
  }

  // START ME UP!!
  init();

  $(document).keydown(function (evt) {
    // left
    if (e == 37) {
      lFlag = true;
    }
    // right
    if (e == 39) {
      rFlag = true;
    }
    // up
    if (e == 38) {
     uFlag = true;
   }
   // down
    if (e == 40) {
      dFlag = true;    
    }
  });

});

