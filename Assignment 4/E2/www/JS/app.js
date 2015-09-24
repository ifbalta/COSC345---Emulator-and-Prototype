/*
 app.js - created 6/05/2015
 Application for Smartwatch Emulator
 for COSC345 project.

 Authors: [[REDACTED]]
 */

var App = (function(){

    var pub = {};
    var stage;
    var calls;
    var sounds;
    var shownPage = 0;
    var currentPage = 2;
    var hammertime;
    var homeLocation;
    var numPages = 3;

    var mainCanvas;
    var mainContext;
    var requestAnimationFrame;
    var cancelRequestAnimationFrame;
    var animFrame;
    var connected = false;
    var isPlaying = false;

    //vars to make sure sounds don't play over and over again
    var lastBTState = "";

    /*
        Calls contains:
            testBluetooth();
            getLocation();
     */
    var button, label, button2, labelClear, circle2, labelClearNew;

    /**
     * This main function runs every second.
     * This contains the main code.
     */
    function main(){
        checkDistance();
        /*if(($("#connect").html() == "Connect") && currentPage == 3 && lastBTState != "disconnected"){
            drawScreen2();
        } else if(($("#connect").html() == "Disconnect") && currentPage == 3 && lastBTState != "connected"){
            drawScreen2();
        }*/

        setTimeout(main, 1000); //run again in a second
    }

    function setHomeLocation(){
        homeLocation = calls.getLocation();
    }


    /**
    *   Resets the coordinate values to 0
    */
    function clearHomeLocation(){
        homeLocation.lat = 0.0;
        homeLocation.lon = 0.0;
    }

    /**
    *  Convert the given number in degrees to radians.
    */
    function toRad(degrees){
        return (degrees * Math.PI / 180);
    }

    /**
    *  Returns the distance in metres between the current home position
    *  and a given location.
    */
    function distanceToHome(location){
        var home = homeLocation;

        var lat1 = homeLocation.lat;
        var lat2 = location.lat;
        var lon1 = homeLocation.lon;
        var lon2 = location.lon;

        var R = 6371000; // metres
        var dLat = toRad(lat2-lat1);
        var dLon = toRad(lon2-lon1);
        lat1 = toRad(lat1);
        lat2 = toRad(lat2);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;

        return d;
    }

    function setCurrentScreen(){
        if (shownPage !== currentPage){
           clearCanvas();
            shownPage = currentPage;
            if (currentPage === 1){
                drawScreen();
            } else if(currentPage === 2){
                mainScreen();
            } else if (currentPage === 3){
                drawScreen2();
            }
        }
    }

    /**
    *  Checks if the current gps coordinates are within 100m of our saved home location.
    */
    function checkDistance(){
        if(distanceToHome(calls.getLocation()) > 100){
            if(!calls.testBluetooth()){
                connected = false;
                phoneAlert();
            } else{
                connected = true;
                if(isPlaying){
                    isPlaying = false;
                    shownPage = 9;
                    setCurrentScreen();
                }
                /*if(!connected){
                    mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
                    setCurrentScreen();
                }*/
            }
        }
        else{
            console.log("awhdhawdhaw");
            connected = true;
            if(isPlaying){
                    isPlaying = false;
                    shownPage = 9;
                    setCurrentScreen();
            }
           /* if(!connected){
                mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
                setCurrentScreen();
            }*/
        }
    }
    function clearCanvas(){
        stage.removeAllChildren();
        stage.update();
    }
    function phoneAlert(){

        console.log("inside phoneAlert func");
        sounds.alert.play();
        var angle = 0;



        function drawCircle() {

            isPlaying = true;
            clearCanvas();
            stage = new createjs.Stage("canvas");

            var circle = new createjs.Shape();
            circle.graphics.beginFill("#EB0000").drawCircle(0, 0, 50);
            circle.x=50;
            circle.y=150;
            stage.addChild(circle);


            createjs.Tween.get(circle, {loop: true})
                .to({x: 270}, 1000, createjs.Ease.getPowInOut(4))
                .to({alpha: 0, y: 150}, 300, createjs.Ease.getPowInOut(2))
                .to({alpha: 0, y: 150}, 100)
                .to({alpha: 1, y: 150}, 300, createjs.Ease.getPowInOut(2))
                .to({x: 50}, 800, createjs.Ease.getPowInOut(2))
                .to({alpha: 0, x: 50}, 800, createjs.Ease.getPowInOut(2));

            var textAlert = new createjs.Text("Forgot Phone!", "bold 40px Arial", "#FFFFFF");
            textAlert.x = 15;
            textAlert.y= 20;
            stage.addChild(textAlert);
            stage.update();

            var ball = new createjs.Shape();
            ball.graphics.beginFill("#1AE300").drawCircle(0,0,50);
            ball.x= 270;
            ball.y= 150;
            stage.addChild(ball);

            createjs.Tween.get(ball, {loop: true})
                .to({x: 50}, 1000, createjs.Ease.getPowInOut(4))
                .to({alpha: 0, y: 150}, 300, createjs.Ease.getPowInOut(2))
                .to({alpha: 0, y: 150}, 100)
                .to({alpha: 1, y: 150}, 300, createjs.Ease.getPowInOut(2))
                .to({x: 270}, 800, createjs.Ease.getPowInOut(2))
                .to({alpha: 0, x: 270}, 800, createjs.Ease.getPowInOut(2));

            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener("tick", stage);
        }
        if(!isPlaying){
            drawCircle();
        }
    }

    function mainScreen(){
        console.log("main screen fnc");
        var circle, text;
        var x=10;
        var y=10;
        var dx=5;
        var dy=5;
        init(stage);

        function init(stage) {
            console.log("init func");

            text= new createjs.Text("Swipe left for settings,", "bold 25px Arial","#FFFFFF" );
            text.name="text";
            text.textAlign = "center";
           //text.textBaseline = "bottom";
            text.x = 320/2;
            text.y = 320/2;
            stage.addChild(text);

            textSecond = new createjs.Text("right for status", "bold 25px Arial","#FFFFFF");
            textSecond.x = 75;
            textSecond.y = 320/2+100;

            stage.addChild(textSecond);

            stage.update();

            circle = new createjs.Shape();
            circle.y =35;
            circle.x=20;
            circle.graphics.beginFill("#CCCCFF").drawCircle(x, y, 10);

            stage.addChild(circle);

            createjs.Ticker.on("tick", tick);
            createjs.Ticker.setFPS(30);
        }
        function tick(event) {
            //console.log("tick fnc");

            if( circle.x<10 || circle.x>310){
                dx=-dx;
            }
            if( circle.y<10 || circle.y>310) {
                dy=-dy;
            }
            circle.x+=dx;
            circle.y+=dy;

            stage.update(event);
        }

    }

    /*Draws to the canvas the "settings"*/
    function drawScreen(){

        stage.name = "stage";

        background = new createjs.Shape();
        background.name = "background";
        background.graphics.beginFill("DeepSkyBlue").drawRoundRect(50, 20, 180, 80, 10);

        label = new createjs.Text("Set Location!", "bold 24px Arial", "black");
        label.name = "label";
        label.textAlign = "center";
        label.textBaseline = "middle";
        label.x = 140;
        label.y = 60;


        button = new createjs.Container();
        button.name = "button";
        button.x = 20;
        button.y = 20;
        button.addChild(background, label);

        stage.addChild(button);


        labelNew= new createjs.Text("Location set!", "bold 24px Arial", "black");
        labelNew.name="newLabel";
        labelNew.textAlign = "center";
        labelNew.textBaseline = "middle";
        labelNew.x = 140;
        labelNew.y = 60;


        labelClearNew= new createjs.Text("Zone Reset!", "bold 24px Arial", "black");
        labelClearNew.textAlign = "center";
        labelClearNew.textBaseline = "middle";
        labelClearNew.x = 160;
        labelClearNew.y = 190;


        var circle2 = new createjs.Shape();
        circle2.graphics.beginFill("DeepSkyBlue").drawRoundRect(70,150,180,80,10);

        labelClear= new createjs.Text("Clear Zone!", "bold 24px Arial", "black");
        labelClear.textAlign="center";
        labelClear.x=160;
        labelClear.y=180;

        button2 = new createjs.Container();
        button2.addChild(circle2,labelClear);
        stage.addChild(button2);


        var targets = [stage,button,label,background,circle2,labelClear,button2];
        for (var i=0; i<targets.length; i++) {
            var target = targets[i];
            target.addEventListener("click", handleClick, false);
            target.addEventListener("click", handleClick, true);
        }

        stage.update();


    }

    function handleClick(event) {
        if (event.currentTarget == button) {   // if you click the button should do something
            sounds.setHome.play();
            setHomeLocation();
            console.log(homeLocation);
            button.removeChild(label);
            button.addChild(labelNew);
        }  else if(event.currentTarget == button2){
            sounds.clearHome.play();
            clearHomeLocation();
            button2.removeChild(labelClear);
            button2.addChild(labelClearNew);
            console.log("button2 pressed");
        }


        stage.update();

    }

    function drawScreen2(){

        var connect, notConnected;
        stage = new createjs.Stage("canvas");
        text= new createjs.Text("You are currently at:", "bold 20px Arial", "white");
        text.x=60;
        stage.addChild(text);
        currlocation = calls.getLocation();
        textLocation= new createjs.Text(currlocation.lat + " " + currlocation.lon,"bold 20px Arial", "white");
        textLocation.y=60;
        stage.addChild(textLocation);
        stage.update();

        if ($("#connect").html() == "Connect"){
            if(lastBTState != "disconnected"){
                sounds.btDisconnect.play();
                lastBTState = "disconnected";
            }
            notConnected= new createjs.Text("Phone is undetected!", "bold 20px Arial","white");
            notConnected.y=120;
            notConnected.x=260;
            notConnected.textAlign = "end";
            stage.addChild(notConnected);
            stage.update();
        }  else if($("#connect").html()=="Disconnect"){
            if(lastBTState != "connected"){
                sounds.btConnect.play();
                lastBTState = "connected";
            }
            var connected=new createjs.Text("Phone is connected!", "bold 20px Arial", "white");
            connected.y=120;
            connected.x=60;
            stage.addChild(connected);
            stage.update();



        }


        console.log("current location is: "+ calls.getLocation());
        console.log("in drawScreen2");
        console.log("connected to phone"+ calls.testBluetooth());

    }

    function swipeRight(ev){
        //console.log("swiped right");
        if(currentPage < numPages && !isPlaying){
            sounds.swipe1.play();
            currentPage++;
            setCurrentScreen();
        }
    }

    function swipeLeft(ev){
        //console.log("swiped left");
        if(currentPage > 1 && !isPlaying){
            sounds.swipe2.play();
            currentPage--;
            setCurrentScreen();
        }
    }


    /**
     * Initialisation for the app.
     * @param calls_in Function calls that can be made to the Emulator
     * @param stage_in The CreateJS Stage representing the watch screen
     */
    pub.init = function(calls_in, stage_in, sounds_in){
        calls = calls_in;
        stage = stage_in;
        sounds = sounds_in;
        console.log(stage);
        hammertime = new Hammer(document.getElementById("canvas"));

        setHomeLocation();

        hammertime.on("swipeleft", swipeLeft);
        hammertime.on("swiperight", swipeRight);

        mainCanvas = document.getElementById("canvas");
        mainContext = mainCanvas.getContext('2d');
        requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;
        cancelRequestAnimationFrame = cancelRequestAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame;

        setCurrentScreen();
        main();
    };

    return pub;

}());
