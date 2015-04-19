#include <stdlib.h>
#include <stdio.h>
#include "schoolutils.h"

void emalloc(size_t s){
	void result = malloc(s);
	if(result == NULL){
		fprintf(stderr, "Failed to allocate memory\n");
		return EXIT_FAILURE;
	}
	return result;
}