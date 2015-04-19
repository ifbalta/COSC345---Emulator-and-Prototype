#include <stdio.h>
#include <stdlib.h>
#include "chip8.h"
/*
	Runs chip8 while loop

	Compile command:
	gcc -W -Wall -ansi -pedantic -O2 -lm *.c -o bootup
	
	To run:
	Linux: ./bootup
	Windows: bootup.exe
*/

/*
	By the way, malloc() works by getting a size_t
	The size_t is the size of your item (like a String)
	and if your allocating an array, the size of your item * array length
	And if your mallocing a String, remember to go + 1, to include the NULL end.

	So mallocing a String x into an array wordList:
		emalloc((strlen(x) + 1) * sizeof wordList[0][0]);
	Meaning: 
		Prepare a space for a String and it's null into the
		size of the space store into wordList[0][0].
		Since wordList is an array of Strings, wordList[0][0]
		is the size of a String.

*/

chip8 myChip8;

int main(){
	printf("Hello C!");
	/* allocated here */
	myChip8 = chip8_new();
	/* deallocate here*/
	free(myChip8);
	return EXIT_SUCCESS;
}