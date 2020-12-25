// 23.cpp

// #include <iostream>
// #include <unordered_map>

#include <iostream>
#include <string>
#include <unordered_map>

using namespace std;

#define ROUNDS 10000000 // 10^7
// #define ROUNDS 100 // 10^7
#define M 1000 // 10^6
#define L 1000000 // 10^6

// 10^7
// #define ROUNDS 100 // 10^7
// #define L 9 // 10^6

unsigned int ni(unsigned int i){
    if (i < 0){
        i = L + i;
    }
    return i % L;
}

unsigned int no(unsigned int i){
    if (i < 1){
        return L + i;
    }
    return i;
}

bool arrayHasValue(unsigned int array[], int length, unsigned int find){
    int i = 0;
    while(i < length){
        if (array[i++] == find){ return true; }
    }
    return false;
}

void log(unsigned int n,  unsigned int input[]){
    cout << n << " - ";
    for(unsigned int i = 0; i < L; i++) {
        cout << input[i] << " ";
    }
    cout << endl;
}

int main()
{
    // unsigned int input0[] = {3,8,9,1,2,5,4,6,7};
    unsigned int input0[] = {9,7,4,6,1,8,3,5,2};
    unsigned int *input = (unsigned int*)malloc(sizeof(unsigned int) * L);
    cout << "reserving size: " << sizeof(unsigned int) * L << endl;

    for(unsigned int i = 0; i < L; i++) {
        input[i] = i + 1;
    }

    // Fill in the standard input
    for(unsigned int i = 0; i < sizeof(input0)/sizeof(input0[0]); i++) {
        input[i] = input0[i];
    }

    for (unsigned int j = 0; j < 9; j++)
    {
        cout << input[ni(j)] << " ";
    }
    cout << endl;

    for(unsigned int i = 0; i < ROUNDS; i++){
        // log(i, input);
        if (i % M == 0){
            cout << i/M << "/" << (ROUNDS/M) << endl;
        }

        unsigned int index = ni(i);

        unsigned int selected = input[index];
        unsigned int pickUp[] = {input[ni(index+1)], input[ni(index+2)], input[ni(index+3)]};

        // We can not cut them out, we have to find the new positions for them,
        // find the diff between, and move all the elements between
        // input.splice(1, 3)

        unsigned int targetNumber = no(selected - 1);

        while(arrayHasValue(pickUp, 3, targetNumber)){
            targetNumber = no(targetNumber - 1);
        }

        // unsigned int targetIndex;

        // Find the target number in the array
        // It's likely that the numbers will be somewhere around: +/-10 as the first is scrambled.
        // let's go +/-1 each step, so that it's being
        // for(unsigned int scope = 0; scope <= L / 2; scope++){
        //     unsigned int up = ni(index + scope);
        //     unsigned int down = ni(index - scope);

        //     if (input[up] == targetNumber){
        //         targetIndex = up;
        //         break;
        //     }
        //     if (input[down] == targetNumber){
        //         targetIndex = down;
        //         break;
        //     }
        // }
        // Now we just have to move the 3 elements from one index to another, by
        // moving all the elements in between.
        unsigned int ptr = index;
        do{
            ptr = ni(ptr + 1);
            input[ptr] = input[ni(ptr + 3)];
        }while(input[ptr] != targetNumber);
        // When we are at the end, let's place pickUp there.
        ptr = ni(ptr+1);
        for (int i = 0; i<3; i++){
            input[ni(ptr++)] = pickUp[i];
        }
    }

    cout << "The End: ";
    log(0, input);

    // find 1
    unsigned int i;
    for(i = 0; i < L; i++) {
        if (input[i] == 1){ break; }
    }

    // now print numbers to 9 after 1
    cout << "after one: ";
    for (unsigned int j = 0; j < 9; j++)
    {
        cout << input[ni(i+j)] << " ";
    }
    cout << endl;

    // First Number after 1:
    unsigned int one = input[ni(i+1)];
    unsigned int two = input[ni(i+2)];

    cout << "ONE: " << one << endl;
    cout << "TWO: " << two << endl;
    cout << "Answer: " << (one * two) << endl;

    return 0;
}

// 3216999728 is too low

// 149245887792 is too high
