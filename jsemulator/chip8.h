#ifndef CHIP8_H_
#define CHIP8_H_

/* a pointer to chip8*/
typedef struct chip8rec *chip8;

chip8 chip8_new();

void intialize(chip8 cpu);

void emulateCycle(chip8 cpu);

void loadProgram(chip8 cpu);

#endif