// #include <iostream>
// #include <unordered_map>

#include <iostream>
#include <string>
#include <unordered_map>

// using namespace std;

// #define UNTIL 30000000
#define UNTIL 2020
#define TYPE int

int main()
{
    TYPE input[] = {0, 3, 6};
    // TYPE input[] = {0,13,1,8,6,15};
    std::unordered_map<TYPE,TYPE> map = {};
    TYPE inputLength = (sizeof(input)/sizeof(*input));

    std::cout << "Starting..." << std::endl;

    TYPE nextNumberToTell;
    TYPE lastNumber;

    for(TYPE i = 0; i<inputLength; i++){
        std::unordered_map<TYPE, TYPE>::const_iterator got = map.find (nextNumberToTell);
        if (got == map.end()){
            nextNumberToTell = 0;
        } else {
            nextNumberToTell = i - got->second;
        }
        map.emplace(input[i], i);
        std::cout << input[i] << std::endl;
    }

    for(TYPE i = inputLength; i<UNTIL; i++){
        if (i % 1000000 == 1) {
            std::cout << i << " " << nextNumberToTell << std::endl;
        }
        lastNumber = nextNumberToTell;
        std::unordered_map<TYPE, TYPE>::const_iterator got = map.find (nextNumberToTell);
        if (got == map.end()){
            nextNumberToTell = 0;
        } else {
            nextNumberToTell = i - got->second;
            map.erase(lastNumber);
        }
        map.emplace(lastNumber, i);
    }
    std::cout << lastNumber << std::endl;
    return 0;
}