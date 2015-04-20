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

	/* fontset */
	unsigned char chip8_fontset[80] = {
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
	};

}

/* Just allocate the memory to chip8*/
chip8 chip8_new(){
	chip8 c = emalloc(sizeof chip8);
	return c;
}
/*
	I can probably combine chip8_new and initialize()
*/
chip8 initialize(chip8 cpu){
	/*
		Clear memory and point SP to top of ROM.
	*/
	cpu.pc = 0x200;
	cpu.opcode = 0;
	cpu.I = 0;
	cpu.sp = 0;
	
	int i;
	/* load fontset into memory*/
	for(i = 0; i < 80; i++){
		cpu.memory[i] = cpu.chip8_fontset[i];
	}
	/* reset timers*/
	return cpu;
}

void emulateCycle(chip8 cpu){
	/*
		- fetch
		- decode
		- execute
		- update timer
	*/
}

void loadProgram(chip8 cpu)
}


