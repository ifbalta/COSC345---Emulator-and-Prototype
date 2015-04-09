/*
  cpu.js - responsible for interrupt handling and instruction decoding.
  Emulating single core 800 mhz AMD chip
 */

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
var initial_pc, initial_counter;
var PC, counter;
var cpu;

cpu = function(){
	this.pc = null;
	this.sp = null;
	this.link_reg = null;
	this.cspr = null;
	this.spsr = [null, null, null, null, null];
	
	// 30 general purpose registers
	this.reg = {
		r1:null, r2:null, r3:null, r4:null, r5:null, 
		r6:null, r7:null, r8:null, r9:null, r10:null,
		r11:null, r12:null, r13:setSP, r14:setLinkReg, r15:setPC, 
		r16:null, r17:null, r18:null, r19:null, r20:null,
		r21:null, r22:null, r23:null, r24:null, r25:null, 
		r26:null, r27:null, r28:null, r29:null, r30:null

	};	

	/**
		Functions accessed through register array only.
		Can be accessed as so, reg.r13(arg).
	*/
	function setPC(p){
		this.pc = p;
	}
	function setSP(p){
		this.registers.r13 = p;
	}
	function setLinkReg(p){
		this.link_reg = p;
	}

}

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
