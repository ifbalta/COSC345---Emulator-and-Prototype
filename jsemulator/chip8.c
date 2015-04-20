/* Chip8 emulator */
#include <stdio.h>
#include <stdlib.h>
#include "chip8.h"
#include "schoolutils.h"

/*
 System Memory Map (Zero page?)
	0x000-0x1FF - Interpreter 
	0x050-0x0A0 - font set (0-F) or 0-15
	0x200-0xFFF - program ROM and work RAM
*/
struct chip8{
	unsigned short opcode;
	unsigned char memory[4096]; /* 12-bit memory*/
	/* 
		Chip8 has 15 general purpose registers
		the 16th register is the carry flag.
	 */
	unsigned char v[16];

	unsigned short I; /* register I*/
	unsigned short pc; /* program counter*/
	unsigned short sp; /* stack pointer */
	unsigned short stack[16]; /* stack */

	/* Graphics stuff*/
	unsigned char gfx[64 * 32]; /*screen of 2048 pixels*/
	unsigned char delay_timer;
	unsigned char sound_timer;

	/* keypad -- 0x0-0xF */
	unsigned char key['16']

}

/* Just allocate the memory to chip8*/
chip8 chip8_new(){
	chip8 c = emalloc(sizeof chip8);
}

chip8::initialize(){
	/*
		Clear memory and point SP to top of ROM.
	*/
	pc = 0x200;
	opcode = 0;
	I = 0;
	sp = 0;
	
	int i;
	for(i = 0; i < 80; i++){
		memory[i]
	}
}

chip8::emulateCycle(){
	// fetch
	// decode
	// execute
	// update timer
}

}


