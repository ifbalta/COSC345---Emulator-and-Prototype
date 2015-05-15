/**
 *  testgameprototype.js
 *
 *  Draws a red rectangle in the upper left corner.
 *  AppObject implementation of placholder.js
 *
 *  Author: Isabel Baltazar
 *          Lennox Huang
 *
 *  Version: 1.0.0.0
 *  Language: JavaScript
 *  Dependencies: jQuery version 1.11.1
 *
 * */
function AppObject(){

    /**
     *  startApp property according to AppObject structure.
     *  Draws a red rectangle in the upper left corner.
     * */
    this.startApp = function startApp(){
        console.log("Starting test game");
        var canvas = $("#canvas")[0];
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "red";
        ctx.rect(20,20,150,100);
        ctx.fill();
    }

    /**
     * stopScript property according to AppObject structure.
     * Stops the application by clearing the screen.
     * */
    this.stopScript = function stopScript() {
        this.clearScreen();
        console.log("stopping game");
    }

    /**
     * clearScreen property according to AppObject structure.
     * Clears the screen.
     * */
    this.clearScreen = function clearScreen(){
        var screen = $("#canvas")[0];
        var context = screen.getContext("2d");
        console.log("Clearing test prototype screen.");
        context.clearRect(0,0,$("#canvas").width(), $("#canvas").height())
    }
}