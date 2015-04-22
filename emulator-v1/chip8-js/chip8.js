/*
	JavaScript implementation of Chip8.
*/
var Chip8 = {
	memory : new Array(4096), // 4096
	display_screen : new Array(32 * 64), // 32 * 64
	v : new Array(16), // 16
	stack : new Array(16), // 16
	keys : new Array(16), 
	I : 0,
	PC : 0,
	SP : 0,
	opcode : 0,
	drawFlag : 0,
	fontset : [
		 0xF0, 0x90, 0x90, 0x90, 0xF0, 
		 0x20, 0x60, 0x20, 0x20, 0x70,
		 0xF0, 0x10, 0xF0, 0x80, 0xF0,
		 0xF0, 0x10, 0xF0, 0x10, 0xF0,
		 0x90, 0x90, 0xF0, 0x10, 0x10,
		 0xF0, 0x80, 0xF0, 0x10, 0xF0,
		 0xF0, 0x80, 0xF0, 0x90, 0xF0,
		 0xF0, 0x10, 0x20, 0x40, 0x40,
		 0xF0, 0x90, 0xF0, 0x90, 0xF0,
		 0xF0, 0x90, 0xF0, 0x10, 0xF0,
		 0xF0, 0x90, 0xF0, 0x90, 0x90,
		 0xE0, 0x90, 0xE0, 0x90, 0xE0,
		 0xF0, 0x80, 0x80, 0x80, 0xF0,
		 0xE0, 0x90, 0x90, 0x90, 0xE0,
		 0xF0, 0x80, 0xF0, 0x80, 0xF0,
		 0xF0, 0x80, 0xF0, 0x80, 0x80
	]
}

/*
var opcode = {
		"00E0":CLS, 
		"8xy1":OR, 
		"8xy2":AND
	}

	function CLS(c) {
		opcode.00E0 = c;
	}
	function OR(c) {
		opcode.8xy1 = c;
	}
	function AND(c) {
		opcode.8xy2 = c;
	}	
*/



// initialize Chip8
function initialize(){
	// clear memory
	for(var i = 0; i < 4096; i++){
		Chip8.memory[i] = 0;
	}
	//clear display
		for(var i = 0; i < (32 * 64); i++){
		Chip8.display_screen[i] = 0;
	}
	// reset registers
	for(var i = 0; i < 16; i++){
		Chip8.v[i] = 0;
	}
	// clear stack
	for(var i = 0; i < 16; i++){
		Chip8.stack[i] = 0;
	}
	// map keys
	for(var i = 0; i < 16; i++){
		Chip8.keys[i] = i;
	}
	//load fontset
	for(var i = 0; i < 80; i++){
		Chip8.memory[i] = Chip8.fontset[i];
	}
	// PC starts at 0x200
}

function emulate_cycle(){
	Chip8.PC = 0x200;
	// print(Chip8.PC);
	Chip8.opcode = (Chip8.memory[Chip8.PC]) << 8 | (Chip8.memory[Chip8.PC + 1]);
	// print(Chip8.opcode);
	decode(Chip8.opcode);
}

// load program
 $('#start').on('click', function(){
 	var selected = $('#selection :selected');
	var s = selected.text();
	var filename = selected.attr('fname');
	var message = "Loading " + s + " from " + filename + " file."
	$('#display').val(message);
	console.log(filename);
 });


initialize();
emulate_cycle();