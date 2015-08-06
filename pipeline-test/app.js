/**
  Draws a moving square.
*/
var coords = [0,0];
var imgName = "spaceship.jpg";


function initializePos() {
  return coords;
}

function getImage () {
  return imgName;
}

function updatePosition (up, down, left, right) {
  if (up) coords[0]--;
  if (down) coords[0]++;
  if (left)coords[1]--;
  if (right) coords[1]++; 
  return coords;
}