// load program
var runningScript;
var protoRegex = new RegExp("prototype");


function clear(){
	var canvas = $("#canvas")[0]; 
	var ctxt = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;
	console.log("clearing screen");
	ctxt.clearRect(0,0,width, height);
}

function clear(){
	var canvas = $("#canvas")[0]; 
	var ctxt = canvas.getContext("2d");
	var width = $("#canvas").width();
	var height = $("#canvas").height();
	console.log("clearing screen");
	ctxt.clearRect(0,0,width, height);
}

 $('#start').on('click', function(){
 	clear();
 	var selected = $('#selection :selected');
	var s = selected.text();
	var filename = selected.attr('fname');
	var message = "Loading " + s + " from " + filename + " file."
	$('#display').val(message);
	console.log(message);
	bootup(filename);
 });

function bootup(filename){
	var prev;
	console.log("booting " + filename);
	if(prev != null) {
			console.log("Stopping " + runningScript);
			prev.stopScript();
			clear();
			prev = null;
			runningScript = null;
		}
		console.log("getting script");
	runningScript = $.getScript(filename, function(){
		console.log("starting " + filename);
//		if (protoRegex.test(filename)) {
			console.log("creating appObject");
			prev = new appObject();
			prev.startApp;
	//	}
	});
	console.log("fetched program");	
}


/*
	if script is running.
	Send interrupt.
*/
