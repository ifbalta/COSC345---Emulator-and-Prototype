function appObject () {
        var canvas = $("#canvas")[0];
        var context = canvas.getContext("2d");
        var currRectX = 8;
        var currRectY = 3;
        var mazeWidth = 310;
        var mazeHeight = 314;
        var intervalVar;
        var roundCounter = 0;
        var mazeImg = new Image();
        var level = new Array("Level1.gif", "Level2.gif", "Level3.gif");

        // mazeImg.src = "Level1.gif";     

        // this.startApp = function startApp(){
        //     console.log("starting maze game prototype");
        //     return setInterval(draw(currRectX,currRectY),10);
        // }

        // this.clearScreen = function clearScren(){
        //     console.log("clearing maze screen");
        //     ctxt.clearRect(0,0,w, h);
        // }

        // this.stopScript = function stopScript() {
        //     startApp = null;
        //     clear();
        // }

        nextLevel(roundCounter);

        //this.startApp = startApp();

        //this.stopScript = stopScript();
        //
        //this.clearScreen = clearScreen();

        function nextLevel(var round){
            mazeImg.src = level[round];     

            this.startApp = function startApp(){
                console.log("starting maze game prototype");
                return setInterval(draw(currRectX,currRectY),10);
            }

            this.clearScreen = function clearScren(){
                console.log("clearing maze screen");
                ctxt.clearRect(0,0,w, h);
            }

            this.stopScript = function stopScript() {
                startApp = null;
                clear();
            }
        }

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


        function move(e) {
            var newX;
            var newY;
            var movingAllowed;
            e = e || window.event;
            //bg
            // context.drawImage(mazeImg, 0, 0);
            

            // //middle/goal
            // context.beginPath();
            // context.arc(mazeWidth/2, mazeHeight/2, 5, 0, 2 * Math.PI, false);
            // context.closePath();
            // context.fillStyle = '#00FF00';
            // context.fill();


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
            if (can_Move === 1) {  // 1 means collision with black, therefore can't move
                drawRectangle(newX, newY, "purple");
                currRectX = newX;
                currRectY = newY;
            }
            else if (can_Move === 2) { // rectangle has met the goal.
                if(roundCounter > level.length){
                    roundCounter = 0;
                    clearInterval(intervalVar);
                    make_Screen_White(0, 0, canvas.width, canvas.height);
                    context.font = "20px Arial";
                    context.fillStyle = "blue";
                    context.textAlign = "center";
                    context.textBaseline = "middle";
                    context.fillText("Goal!", canvas.width / 2, canvas.height / 2);
                    window.removeEventListener("keydown", move, true);
                }else{
                    roundCounter++;
                    nextLevel(roundCounter);
                }
            }
        }

        function canMoveTo(destX, destY) {
            var imgData = context.getImageData(destX, destY, 15, 15);
            var data = imgData.data;
            var canMove = 1; // 1 means: the rectangle can move
            if (destX >= 0 && destX <= mazeWidth - 15 && destY >= 0 && destY <= mazeHeight - 15) {
                for (var i = 0; i < 4 * 15 * 15; i += 4) {
                    if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) { // black
                        canMove = 0; // 0 means: the rectangle can't move
                        break;
                    }
                    else if (data[i] === 0 && data[i + 1] === 255 && data[i + 2] === 0) { // #00FF00
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

        function make_Screen_White(x, y, w, h) {
            context.beginPath();
            context.rect(x, y, w, h);
            context.closePath();
            context.fillStyle = "white";
            context.fill();
        }
        //drawMazeAndRectangle(200, 3);
        //startApp();
        window.addEventListener("keydown", move, true);
        //createTimer(300); // 2 minutes

}