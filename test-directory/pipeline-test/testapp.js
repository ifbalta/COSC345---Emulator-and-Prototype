/**
  testapp.js
*/

setup("grass.png"); // initialize app background
var sora = addResource("sora", 0,0,"SoraKHCOM.png"); // setup resources
init(); // start emulator

// game logic
window.addEventListener("keydown", function (evt) {
  var e = evt.which;
  switch (e) {
    case 37:
       sora.x -= 3;   
      break;
    case 38:
       sora.y -= 4;
      break;
    case 39:
       sora.x += 3;
      break;
    case 40:
       sora.y += 4;
      break;
  }
 });