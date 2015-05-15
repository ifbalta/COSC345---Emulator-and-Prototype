/**
 *  emulator.js
 *
 *  Compatibility layer between the browser and smart watch application.
 *  The emulator is compatible with Safari and needs a server for compatibility with
 *  Chrome, Firefox, Internet Explorer and Opera.
 *
 *  Authors: Isabel Baltazar
 *           Lennox Huang
 *
 *  Version: 1.0.0
 *  Language: JavaScript
 *  Dependencies: jQuery version 1.11.1
 *
 * */

/** Holds the filename of the currently running app */
var runningScript;
/** Regex pattern for all filenames containing 'prototype' */
var protoRegex = new RegExp("prototype");
/** File path so that resource files can find each other */
var resourcePath;

/**
 * Clears the screen.
 * */
function clear(){
	var canvas = $("#canvas")[0]; 
	var ctxt = canvas.getContext("2d");
	var width = $("#canvas").width();
	var height = $("#canvas").height();
	console.log("clearing screen");
	ctxt.clearRect(0,0,width, height);
}

$('#clear').on('click', function(){
	clear();
});

/**
 * Function linked with the 'start' button on emulator.html
 * Selects a file from the app tray and sends it to bootup()
 * */
 $('#start').on('click', function(){
    clear();

    var canvas = document.getElementById('canvas').focus();
    var selected = $('#selection :selected');
    var s = selected.text();
    var filename = selectFile(selected.attr("value"));
    console.log("Filename: " + filename);
    var message = "Loading " + s + " from " + filename + " file."
    $('#display').val(message);
    console.log(message);
    bootup(filename);
 });

/**
 *  Takes a filename and adds the file path.
 *  @param filename
 * */
function selectFile(filename){
    resourcePath = "appDir/" + filename.replace(".js", "/");
    var selectedFile =  resourcePath + filename;
    return selectedFile;
}

/**
 * Stops previously running application, and runs the new application.
 * @param filename The chosen app
 * */
function bootup(filename){
    var prev = null;
    console.log("booting " + filename);
    if(prev != null) {
        console.log("Stopping " + runningScript);
        $.getScript(runningScript, function () {
            prev.stopScript();
            prev.clearScreen();
        });
        prev = null;
    }
    console.log("getting script");
    runningScript = $.getScript(filename, function(){
        console.log("starting " + filename);
        if (protoRegex.test(filename)) {
            console.log("creating AppObject");
            prev = new AppObject();
            prev.startApp();
        }
    });
	console.log("fetched program");	
}
