$(document).ready(function () {
    /*
        global variables
        level: store the image of the maze level.
        roundCounter: count the current level.
    */
        var canvas = $("#canvas")[0];;
        var context = canvas.getContext("2d");;
        var currRectX = 8;
        var currRectY = 3;
        var mazeWidth = 320;
        var mazeHeight = 320;
        var intervalVar;
        var mazeImg = new Image();
        var roundCounter =0;
        var level = new Array("Level1.gif", "Level2.gif", "Level3.gif");
      
        // mazeImg.src = level[roundCounter];

        /*
            Start the new round of game
        */
        function init(){
            mazeImg.src = level[roundCounter];
            urrRectX = 8;
            currRectY = 3;
            return setInterval(draw(8,3),10);
        }

        /*
            draw the level picture and moving square
        */
        function draw(rectX,rectY){
            
            //bg
            context.drawImage(mazeImg, 0, 0);
            
            //middle/goal
            //context.arc(100, 150, 5, 0, 2 * Math.PI, false);
            context.beginPath();
            context.arc(mazeWidth/2, mazeHeight/2, 5, 0, 2 * Math.PI, false);
            context.closePath();
            context.fillStyle = '#00FF00';
            context.fill();

            drawRectangle(rectX,rectY,"purple");
        }



        function drawRectangle(x, y, style) {
            //makeWhite(currRectX, currRectY, 15, 15);
            context.drawImage(mazeImg, 0, 0);
            
            //middle/goal
            context.beginPath();
            context.arc(mazeWidth/2, mazeHeight/2, 5, 0, 2 * Math.PI, false);
            context.closePath();
            context.fillStyle = '#00FF00';
            context.fill();

            currRectX = x;
            currRectY = y;
            context.beginPath();
            context.rect(x, y, 15, 15);
            context.closePath();
            context.fillStyle = style;
            context.fill();
        }


        /*
            moving the rectangle, bye "up down left right " key
        */
        function move(e) {
            var newX;
            var newY;
            var movingAllowed;
            e = e || window.event;
 
            switch (e.keyCode) {
                case 38:   // arrow up key
                case 87: // W key
                    newX = currRectX;
                    newY = currRectY - 3;
                    break;
                case 37: // arrow left key
                case 65: // A key
                    newX = currRectX - 3;
                    newY = currRectY;
                    break;
                case 40: // arrow down key
                case 83: // S key
                    newX = currRectX;
                    newY = currRectY + 3;
                    break;
                case 39: // arrow right key
                case 68: // D key
                    newX = currRectX + 3;
                    newY = currRectY;
                    break;
            }

            can_Move = canMoveTo(newX, newY);
            if (can_Move === 1) {  // 1 means no collision with black,  can move
                drawRectangle(newX, newY, "purple");
                currRectX = newX;
                currRectY = newY;
            }
            else if (can_Move === 2) { // rectangle has met the goal.
                roundCounter++;
                 if(roundCounter >= level.length){
                    clearInterval(intervalVar);
                    make_Screen_White(0, 0, canvas.width, canvas.height);
                    context.font = "20px Arial";
                    context.fillStyle = "blue";
                    context.textAlign = "center";
                    context.textBaseline = "middle";
                    context.fillText("Goal!", canvas.width / 2, canvas.height / 2);
                    window.removeEventListener("keydown", move, true);
                }else{
                    // clearInterval(intervalVar);
                    
                    init();
                }
            }
        }
        /*
            decide the quare can move or not
            canMove = 0 , the rectangle can not move
            canMove = 1 , the rectangle can move
            can Move = 2, the rectangle reached the end
        */
        function canMoveTo(destX, destY) {
            var imgData = context.getImageData(destX, destY, 15, 15);
            var data = imgData.data;
            var canMove = 1; // 1 means: the rectangle can move
            if (destX >= 0 && destX <= mazeWidth-15 && destY >= 0 && destY <= mazeHeight-15) {
                for (var i = 0; i < 4 * 15 * 15; i += 4) {
                    if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) { // black
                        canMove = 0; // 0 means: the rectangle can't move
                        break;
                    }
                    else if (data[i] === 0 && data[i + 1] === 255 && data[i + 2] === 0) { // #00FF00
                        // window.alert(data[i]);
                        canMove = 2; // 2 means: the end point is reached
                        break;
                    }
                }
            }
            else {
                canMove = 0;
            }
            return canMove;
        }

        /*
            The finished screen when passed all levels
        */
        function make_Screen_White(x, y, w, h) {
            context.beginPath();
            context.rect(x, y, w, h);
            context.closePath();
            context.fillStyle = "white";
            context.fill();
        }
        //drawMazeAndRectangle(200, 3);
        init();
        window.addEventListener("keydown", move, true);
        //createTimer(300); // 2 minutes

});