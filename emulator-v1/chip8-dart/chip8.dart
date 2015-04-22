import "opcodes.dart";
class chip8{
  
  var memory = new List(4096); // 4096 bits
  var display = new List(32 * 64); // 32 * 64 pixels
  var v = new List(16); // 16 general purpose registers
  var stack = new List(16); // 18 bit register
  var keys = new List(16);
  var I; // 16 bit register. should be char.
  var PC; // Program Counter
  var SP; // Stack Pointer
  var opcode; // 2-byte opcodes --> 0xF000
  var drawFlag = 0;
  var delay_timer = 0;
  var sound_timer = 0;
  var keyPress = 0;
  var  fontset = [
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
    ];
  
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
    for(int i = 0; i < 16; i++){
      stack[i] = 0;
    }
    /* clear state */
    PC = 0;
    SP = 0;
    opcode = 0;
    I = 0;
    /* load fontset */
    for(var i = 0; i < 80; i++){
      memory[i] = fontset[i];
    }
  }
  void bootup(){
    print("bootup");
  }
}