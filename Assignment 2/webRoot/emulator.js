/** Holds the filename of the currently running app */
var runningScript;
/** Regex pattern for all filenames containing 'prototype' */
var protoRegex = new RegExp("prototype");
/** File path that resource files can find each other */
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
    var selected = $('#selection :selected');
    var s = selected.text();
    var filename = selected.attr('fname');
     resourcePath = "/appDir/" + filename.replace(".js", "/")
    filename = resourcePath + filename
    var message = "Loading " + s + " from " + filename + " file."
    $('#display').val(message);
    console.log(message);
    bootup(filename);
 });

/**
 * Stops previously running application, and runs the new application.
 * @param filename The chosen app
 * */
function bootup(filename){
	var prev;
	console.log("booting " + filename);
	if(prev != null) {
		console.log("Stopping " + runningScript);
		$.getScript(runningScript, function () {
			this.stopScript();
			this.clearScreen();
			this.continueFlag = false;
		});
		prev = null;
	}
		console.log("getting script");
		runningScript = $.getScript(filename, function(){
		console.log("starting " + filename);

		if (protoRegex.test(filename)) {
			console.log("creating appObject");
			prev = new appObject();
			prev.startApp();
		}
	});
	console.log("fetched program");	
}
