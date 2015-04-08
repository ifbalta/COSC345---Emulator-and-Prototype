/*
  cpu.js - responsible for interrupt handling and instruction decoding.
  Emulating single core 800 mhz AMD chip
 */
var initial_pc, initial_counter;
var PC, counter;

function main(){
    // infinite while loop
}

function decode(){
    // massive switch statement
}

function handleInterrupt(){
    // decode/fetch instruction
}

function init(){
    // initialize pointers
}

/*
	Register List:
	1 PC
	1 cpsr
	5 spsr
	30 general purpose registers
	----------------------------
	r0-r12 are registers
	r13 is the Stack Pointer
	r14 is the Link Register
	r15 is the PC	
*/