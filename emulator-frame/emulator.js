// load program
var links = {
	"placeholder.js":"https://www.dropbox.com/s/ljarw44tg0zte1u/placeholder.js?dl=0"
};

var runningScript;


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
	runningScript = filename;	
	bootup(filename);
 });

function bootup(filename){
	$.getScript(filename, function(){
		console.log("starting " + filename);
	});
}

/*
	if script is running.
	Send interrupt.
*/
