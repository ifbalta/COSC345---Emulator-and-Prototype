$(document).ready(function () {
    //Inititialize canvas
    var canvas = $("#canvas")[0];
    var ctxt = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $("#canvas").height();
    var cw = 10;
    var dir;
    var snake_arr;//snake
    var score;
    var food;
    var tail;
    var l;
    var image = new Image();
    var bg = new Image();
    var pat;
    bg.src = "snakebg.png";
    image.src = "snakebox.png";
    pat = ctxt.createPattern(bg, "no-repeat");


    function init() {
        dir = "right";
        l = 5;
        create_snake(0);
        create_food();
        score = 0;
        if (typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop = setInterval(paint, 60);
    }
    //if we click on the document, then the game should start
    // $(document).onClick(function(){
    init();
    //  })

    //Makes snake info
    function create_snake(y) {
        snake_arr = [];//empy array initialized

        for (var i = l; i >= 0; i--) {
            snake_arr.push({ x: i, y: 0 });
        }
    }

    //randomize food
    function create_food() {
        food = {
            x: Math.round(Math.random() * (w - cw) / cw),
            y: Math.round(Math.random() * (h - cw) / cw)
        }
    }

    function paint_cell(x, y, color) {
        ctxt.drawImage(image, x * cw, y * cw);
    }

    function check_collision(x, y, a) {
        for (var i = 0; i < a.length; i++) {
            if (x == a[i].x && y == a.y) return true;
        }
        return false;
    }




    //Snake painting
    function paint() {

        //This clears everything to redraw the BG,
        //avoiding a snake tail
        ctxt.drawImage(bg, 0, 0);


        //movement
        var nx = snake_arr[0].x;
        var ny = snake_arr[0].y;

        //direction
        switch (dir) {
            case "right":
                nx++;
                break;
            case "left":
                nx--;
                break;
            case "up":
                ny--;
                break;
            case "down":
                ny++;
                break;
        }

        //check if we ate food
        if (nx == food.x && ny == food.y) {
            tail = { x: nx, y: ny };
            create_food();
            score++;
        } else {
            tail = snake_arr.pop();
            tail.x = nx;
            tail.y = ny;

        }

        snake_arr.unshift(tail);

        //reinitialize game and restart only when you hit yourself
        if (nx == -1 || ny == -1 || nx == w / cw || ny == h / cw || check_collision(nx, ny, snake_arr)) {
            //  var respond = confirm("GAME OVER!\n Final Score: " + score);
            // if (respond == true) init();
            init();
            return;
        }



        /** PAINTING!  **/

        //pop tail, reset to be new x, return tail as head
        //this is kinda like kicking the last to be the first
        for (var i = 0; i < snake_arr.length; i++) {
            var c = snake_arr[i];
            paint_cell(c.x, c.y, "blue");
        }
        paint_cell(food.x, food.y, "blue");
        var score_text = "Score: " + score;
        ctxt.fillStyle = "black";
        ctxt.fillText(score_text, 5, h - 5);
    }

    $(document).keydown(function (e) {
        var k = e.which;
        switch (k) {
            case 37:
                if (dir != "right") dir = "left";
                break;
            case 38:
                if (dir != "down") dir = "up";
                break;
            case 39:
                if (dir != "left") dir = "right";
                break;
            case 40:
                if (dir != "up") dir = "down";
                break;
        }
    })



});
