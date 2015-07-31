/**
  testapp.js
*/


setup("resources/ice-map.bmp"); // initialize app background
var sora = addResource("sora", 0,0,"resources/SoraKHCOM.png"); // setup resources
var enemy = addResource("enemy", 16,16, "resources/spaceship.jpg");
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
var xDir = true;
var yDir = true;

// while (true) {
//   if (xDir) {
//     enemy.x++;
//     if (enemy.x >= 30) xDir = !xDir;
//   } else {
//     enemy.x--;
//     if (enemy.x <= 2) xDir = !xDir;
//   }
//   if (yDir) {
//     enemy.y++;
//     if (enemy.y >= 30) yDir = !yDir;
//   } else {
//     enemy.y--;
//     if (enemy.y <= 2) yDir = !yDir;
//   }
// }