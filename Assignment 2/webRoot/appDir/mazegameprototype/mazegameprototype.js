/**
 *  mazegameprototype.js
 *
 *  Ball-in-the-maze puzzle app.
 *  AppObject implementation of mazegame.js.
 *
 *  Authors: Raeciel Reyes
 *           Kimi Zhou
 *
 *  Version: 1.0.0
 *  Language: JavaScript
 *  Dependencies: jQuery version 1.11.1
 *
 * */
function AppObject() {
    /*
     global variables
     level: store the image of the maze level.
     round_counter: counts the current level.
     */
    var canvas = $("#canvas")[0];;
    var context = canvas.getContext("2d");;
    var current_x = 8;
    var current_y = 3;
    var maze_width = 320;
    var maze_height = 320;
    var intervalVar;
    var maze_img = new Image();
    var round_counter = 0;
    var level = new Array("Level1.gif", "Level2.gif", "Level3.gif");
    var continueFlag = true;

    /**
     * startApp property according to AppObject structure.
     * */
    this.startApp = function startApp(){
        init();
    }

    /**
     * Initializes the game.
     * */
     function init(){
        maze_img.src = resourcePath + level[round_counter];
        current_x = 8;
        current_y = 3;
        return setInterval(draw(8,3),10);
    }

     /**
     * stopScript property according to AppObject structure.
     * Stops the application.
     * */
    this.stopScript = function stopScript(){
        continueFlag = false;
    }

    /**
     * clearScreen property according to AppObject.
     * Clears the screen.
     * */
    this.clearScreen = function clearScreen(){
        var canvas = $("#canvas")[0];
        var ctxt = canvas.getContext("2d");
        var width = $("#canvas").width();
        var height = $("#canvas").height();
        console.log("clearing screen");
        ctxt.clearRect(0,0,width, height);
    }

    /**
     * Draw the level picture and player
     * @param rectX player's x-coordinates
     * @param rectY player's y-coordinates
     */
    function draw(rectX,rectY){
        //bg
        context.drawImage(maze_img, 0, 0);

        //middle/goal
        //context.arc(100, 150, 5, 0, 2 * Math.PI, false);
        context.beginPath();
        context.arc(maze_width/2, maze_height/2, 5, 0, 2 * Math.PI, false);
        context.closePath();
        context.fillStyle = '#00FF00';
        context.fill();

        drawRectangle(rectX,rectY,"purple");
    }


    /**
     * Draws the player character.
     * @param x x-coordinates
     * @param y y-coordinates
     * @param style the player's color
     * */
    function drawRectangle(x, y, style) {
        context.drawImage(maze_img, 0, 0);

        //middle/goal
        context.beginPath();
        context.arc(maze_width/2, maze_height/2, 5, 0, 2 * Math.PI, false);
        context.closePath();
        context.fillStyle = '#00FF00';
        context.fill();

        current_x = x;
        current_y = y;
        context.beginPath();
        context.rect(x, y, 15, 15);
        context.closePath();
        context.fillStyle = style;
        context.fill();
    }


    /**
     * Moving the rectangle, by pressing one of the up, down, left, or right keys.
     * @param e a keyPress event
     */
    function move(e) {
        var newX;
        var newY;
        var movingAllowed;
        e = e || window.event;

        switch (e.keyCode) {
            case 38:   // arrow up key
                newX = current_x;
                newY = current_y - 3;
                break;
            case 37: // arrow left key
                newX = current_x - 3;
                newY = current_y;
                break;
            case 40: // arrow down key
                newX = current_x;
                newY = current_y + 3;
                break;
            case 39: // arrow right key
                newX = current_x + 3;
                newY = current_y;
                break;
        }

        can_Move = canMoveTo(newX, newY);
        if (can_Move === 1) {  // 1 means no collision with black,  can move
            drawRectangle(newX, newY, "purple");
            current_x = newX;
            current_y = newY;
        }
        else if (can_Move === 2) { // rectangle has met the goal.
            round_counter++;
            if(round_counter >= level.length){
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

                if (continueFlag) init();
            }
        }
    }

    /**
     * Collision checking for the walls and screen edge.
     * canMove = 0 , the rectangle can not move
     * canMove = 1 , the rectangle can move
     * can Move = 2, the rectangle reached the end
     * @param destX x-coordinates of the destination
     * @param destY y-coordinates of the destination
     */
    function canMoveTo(destX, destY) {
        var imgData = context.getImageData(destX, destY, 15, 15);
        var data = imgData.data;
        var canMove = 1; // 1 means: the rectangle can move
        if (destX >= 0 && destX <= maze_width-15 && destY >= 0 && destY <= maze_height-15) {
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

    /**
     * Shows the finish screen when completing all levels.
     * @param x x-coordinates
     * @param y y-coordinates
     * @param w the canvas width
     * @param h the canvas height
     */
    function make_Screen_White(x, y, w, h) {
        context.beginPath();
        context.rect(x, y, w, h);
        context.closePath();
        context.fillStyle = "white";
        context.fill();
    }

    init();
    window.addEventListener("keydown", move, true);

}
