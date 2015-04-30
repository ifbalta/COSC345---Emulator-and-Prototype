// load program

var runningScript;

 $('#start').on('click', function(){
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