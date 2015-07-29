/**
I/O pipeline between browser and app.js.
*/


//Inititialize canvas
var canvas = $("#canvas")[0];
var ctxt = canvas.getContext("2d");
var w = $("#canvas").width();
var h = $("#canvas").height();

var bg = new Image();
var images = []; // GameObject array

function addResource (name, x, y, imgFile) {
  images[name] = new GameObject(x, y, imgFile); // to allow access by name
  images.push(images[name]); // to allow access through forEach
  return images[name];   
}

function setup(bgFile){
  bg.src = bgFile;
  bg.height=h;
  bg.width=w;        
}

// start clock
function init () {
  paint();
  if (typeof clock_cycle != "undefined") clearInterval(clock_cycle);
  clock_cycle = setInterval(paint, 60);
}

function paint () {
  ctxt.drawImage(bg, 0, 0);
  images.forEach(function (gObj) {
    ctxt.drawImage(gObj.sprite, gObj.x, gObj.y);  
  })
  
}


