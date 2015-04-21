class chip8{
  
  var memory = []; // 4096 bits
  var display = []; // 32 * 64 pixels
  var v = []; // 16 general purpose registers
  var stack = []; // 18 bit register
  var I; // 16 bit register. should be char.
  var PC; // Program Counter
  var SP; // Stack Pointer
  var opcode; // 2-byte opcodes --> 0xF000
  
  /*
   * Constructor initializes cpu.
   */
   chip8(){
    print("initialize");
    /* reset memory */
    for(var i = 0; i < 4096; i++){
      memory[i] = 0;
    }
    /* reset registers */
    for(var i = 0; i < 16; i++){
      v[i] = 0;
    }
    /* clear stack */
    for(int i = 0; i < 18; i++){
      stack[i] = 0;
    }
    /* clear state */
    PC = 0;
    SP = 0;
    opcode = 0;
    I = 0;
  }
  void bootup(){
    print("bootup");
  }
}