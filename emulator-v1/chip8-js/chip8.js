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
	delay_timer : 0,
	sound_timer : 0,
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


function bootup(filename){
	initialize();
	emulate_cycle();

function decode(opcode) {

Vx = Chip8.v[opcode & 0x0F00 >> 8];
Vy = Chip8.v[(opcode & 0x00F0) >> 4];

switch (opcode & 0xF000) {

case 0x0000:

 switch (opcode & 0x000F) {

	case 0x000: // clear the screen
	for (var a = 0; a < (32 * 64); a++) {
		Chip8.display_screen = 0;
		drawFlag = 1;
     }
    break;	

    case 0x000E: // return from sub-routine
    Chip8.SP--;
    Chip8.PC = Chip8.stack[Chip8.SP];
    Chip8.PC += 2;
    break;

    case 0x1000: // 1nnn - Jump to location nnn.
    Chip8.PC = opcode & 0x0FFF;
    break;
	
	case 0x2000: // 2nnn - Call sub-rountine at nnn
	Chip8.stack[Chip8.SP] = Chip8.PC;
	Chip8.SP++;
	Chip8.PC = opcode & 0x0FFF;
	break;

	case 0x3000: // 3xkk - Skip next instruction if v[x] = kk
	if (Vx == (opcode & 0x00FF)) {
		Chip8.PC += 4; 
	} else {	
		Chip8.PC += 2;
	}
	break;

    case 0x4000: // 4xkk - Skip next instruction if v[x] != kk
    if (Vx != (opcode & 0x00FF)) {
    	Chip8.PC += 4;
    } else {
    	Chip8.PC += 2;
    }
    break;

    case 0x5000: // 5xy0 - Skip next instruction if v[x] = v[y]
    if (Vx == Vy) {
    	Chip8.PC += 4;
    } else {
    	Chip8.PC += 2;
    }
    break;

    case 0x6000: // 6xkk - Set v[x] = kk 
    Vx = opcode & 0x00FF;
	Chip8.PC += 2;
	break;
	}

	case 0x7000: // 7xkk - Set v[x] = v[x] + kk
	Vx += 0x00FF;
	Chip8.PC += 2;
	break;


	case 0x8000:
    switch(opcode & 0x000F) {

     case 0x0000: // 8xy0 - Set v[x] = v[y]
     Vx = Vy;
     Chip8.PC += 2;
     break;

     case 0x0001: // 8xy1 - Set v[x] = v[x] or v[y]
     Vx != Vy;
     Chip8.PC += 2;
     break;

     case 0x0002: // 8xy2 - Set v[x] = v[x] and v[y]
     Vx &= Vy;
     Chip8.PC += 2;
     break;

     case 0x0003: // 8xy3 - Set v[x] = v[x] XOR x[y]
     Vx ^= Vy;
     Chip8.PC += 2;
     break;

     case 0x0004: // 8xy4 - Set v[x] = v[x] + v[y] and VF = carry
     Vx += Vy;

     if (Vy > Vx) {
     	Chip8.v[0xF] = 1;
     } else {
     	Chip8.v[0xF] = 0;
     }
     Chip8.PC += 2;
     break;

    case 0x0005: // 8xy5 - Set v[x] = v[x] - v[y] and VF = NOT borrow
    Vx -= Vy;

     if (Vy > (0xFF - Vx)) {
     	Chip8.v[0xF] = 0;
     } else {
     	Chip8.v[0xF] = 1;
     }
     Chip8.PC += 2;
     break;

    case 0x0006: // 8xy6 - Set v[x] = v[x] SHR 1
    Chip8.v[0xF] = Vx & 0x1;
    Vx >> 1;
    Chip8.PC += 2;
    break; 

    case 0x0007: // 8xy7 Set v[x] = v[y] - v[x] and VF = NOT borrow
    Vx = Vy - Vx;

    if (Vy < Vx) {
    	Chip8.v[0xF] = 0;
    } else {
    	Chip8.v[0xF] = 1;
     }
    Chip8.PC += 2;
    break;

    case 0x000E: // Set Vx = Vx SHL 1
    Chip8.v[0xF] = Vx >> 7;
    Vx <<= 1;
    Chip8.PC += 2;
    break;
    } // End Of 0x8000 

    case 0x9000: // Skip next instruction if Vx != Vy
    if (Vx != Vy) {
    	Chip8.PC += 4;
    } else {
    	Chip8.PC += 2;
    }
    break;

    case 0xA000: // Annn - Set I = nnn
    Chip8.I = opcode & 0x0FFF;
    Chip8.PC += 2;
    break;

    case 0xB000: // Bnnn - Jump to location nnn + V0
    Chip8.PC = (opcode & 0x0FFF) + Chip8.v[0];
    break;

    case 0xC000: // Cxkk - Set Vx = random byte AND kk
    Vx = (random() % 0xFF) & (opcode & 0x00FF);
    Chip8.PC += 2;
    break;

    case 0xD000: // Dxyn - Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision
    x = Vx;
    y = Vy;
    height = opcode & 0x000F;

    v[0xF] = 0;
    for (var i = 0; i < height; i++) {
    	pixel = Chip8.memory[Chip8.I + i];
    	for (var j = 0; j < 8; j++) {
    		if (pixel & (0x80 >> b)
    	}
    }
    case 0xF000:
    	switch(opcode & 0x000F){
    		case 0x0007: // LD Vx, DT
    		Vx = Chip8.delay_timer;
    		// load delay timer into Vx
    			break;

    		case 0x000A: // LD Vx, K
    		/*
				wait for key press, then store into Vx
				Vx = keyPress event.
    		*/
    		break;

    		case 0x0015: // LD DT, Vx
    		Chip8.delay_timer = Vx;
    		// Load Vx into delay timer
    		break;

    		case 0x0018: // LD ST, Vx
    		Chip8.sound_timer = Vx;
    		// load Vx into sound_timer
    		break;

    		case 0x001E: // Add I, Vx
    		Chip8.I += Vx;
    		// Add Vx to I
    		break;

    		case 0x029: // LD F, Vx
    		Chip8.I = Vx;
    		// sprite location == Vx
    		break;

    		case 0x033: // LD B, Vx
    		// store BCD representations of Vx into memory.
    		Chip8.memory[Chip8.I] = v[(opcode & 0x0F00) >> 8] / 100;
    		Chip8.memory[Chip8.I + 1] = (v[(opcode & 0x0F00) >> 8] / 10) % 10;
    		Chip8.memory[Chip8.I + 2] = (v[(opcode & 0x0F00) >> 8] / 100) % 10;
    		Chip8.PC += 2;
    		break;

    		case 0x055: // LD I, Vx
    		// copies address V0 - Vx in into memory.
    		for(var a = 0; a  <= ((opcode & 0xF00) >> 8); a++){
    			Chip8.memory[Chip8.I + a] = Chip8.v[a];
    		}
    		Chip8.I += ((opcode & 0x0F00) >> 8) + 1;
    		Chip8.PC += 2;
    		break;

    		case 0x065: // LD Vx, I
    		// read registers V0 to Vx from memory starting at I
    			for(var a = 0; a  <= ((opcode & 0xF00) >> 8); a++){
    			Chip8.v[a] = Chip8.memory[Chip8.I + a];
    		}
    		Chip8.I += ((opcode & 0x0F00) >> 8) + 1;
    		Chip8.PC += 2;
    		break;
    	}
    	break; 
  }	
}

// load program
 // $('#start').on('click', function(){
 // 	var selected = $('#selection :selected');
	// var s = selected.text();
	// var filename = selected.attr('fname');
	// var message = "Loading " + s + " from " + filename + " file."
	// $('#display').val(message);
	// console.log(message);	
	// bootup(filename);
 // });



