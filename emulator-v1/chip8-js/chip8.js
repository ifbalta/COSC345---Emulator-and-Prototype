var Chip8 = {
	memory : [], // 4096
	display_screen : [], // 32 * 64
	v : [], // 16
	stack : [], // 
	keys : [], 
	I : 0,
	PC : 0,
	SP : 0,
	opcode : 0,
	drawFlag : 0
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
	// clear display
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
	// PC starts at 0x200
}

function emulate_cycle(){
	Chip8.PC = 0x200;
	Chip8.opcode = (Chip8.memory[Chip8.PC]) << 8 | (Chip8.memory[Chip8.PC + 1]);
}



initialize();
emulate_cycle();