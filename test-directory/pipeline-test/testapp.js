/**
  testapp.js
*/


setup("resources/islands-map.png", pressedKeys); // initialize app background
var sora = addResource("sora", 0,0,"resources/SoraKHCOM.png"); // setup resources
//var enemy = addResource("enemy", 16,16, "resources/spaceship.jpg");
init(); // start emulator

// game logic
// window.addEventListener("keydown", function (evt) {
//   var e = evt.which;
//   switch (e) {
//     case 37:
//        sora.x -= 3;   
//       break;
//     case 38:
//        sora.y -= 4;
//       break;
//     case 39:
//        sora.x += 3;
//       break;
//     case 40:
//        sora.y += 4;
//       break;
//   }
//  });

// game logic
function pressedKeys () {
  if (RIGHT_KEY) {    
    sora.x += 3;
   }
  if (LEFT_KEY) {
    sora.x -= 3;
   }
  if (DOWN_KEY) {
    sora.y -= 4
   }
  if (UP_KEY) {
    sora.y += 4;
   }
}