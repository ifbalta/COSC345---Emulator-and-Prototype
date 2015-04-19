/*
  emulator.js
  Emulator Version 1
	  - Version 1 only waits for interrupts
*/

$(document).ready(function () {
	alert("Emulator started!");
	while(true){
		handleInterrupts
	}
    
});

/**
	Checks for interrupts.
*/
function handleInterrupts(evt){
	// iterate through flag array.	
}

function myFunction(evt){
	alert("HI!");
}
