
// randomly choose a letter based on the frequency statistics passed in.
// letterStats contains a property for the total letter occurrences counted,
// as well as properties for each individual letter count
function chooseLetter(letterStats) {
    if (!letterStats) {
        throw "NoStats";
    }
    var draw = Math.floor(Math.random() * letterStats.total);
    var count = 0;
    for(var letter in letterStats) {
        if (letter === 'total') {
            continue;
        }
        count += letterStats[letter];
        if (count > draw) {
            return letter;
        }
    }
    throw "NoStats"; // shouldn't get here with proper stats
}

 syllable = require('syllable');


// create a Markov word of length syllables based on the stats passed in.
// the stats object contains counts of first letter occurrences,
// second letter occurrences relative to the first letter,
// letter occurrences relative to the preceding two letters,
// second to last letter occurrences relative to the preceding two letters,
// and last letter occurrences relative to the preceding two letters.
function createWord(stats, syllables) {

    // start by choosing the first two letters (syllables is at least 3)
    var l1 = chooseLetter(stats.firstLetters),
        l2 = chooseLetter(stats.secondLetters[l1]),
        currentWord = l1 + l2,
        nextLetter,
        syllable_count=0;

   
    while(syllable_count < syllables) {

        nextLetter = chooseLetter(stats.letters[l1 + l2]);
        currentWord += nextLetter;
        l1 = l2;
        l2 = nextLetter;

        syllable_count=syllable(currentWord);
        // console.log(syllable_count,currentWord)
    }

    return currentWord;
}


// entry point to generate the Markov word(s). syllables must be at least 3,
// numberOfWords is optional and is 1 by default.
function generate(stats, syllables, numberOfWords) {
    if (arguments.length < 2 || arguments.length > 3) {
        throw new Error("Incorrect number of arguments");
    }
    if (!stats.firstLetters || stats.firstLetters.total < 1) {
        throw new Error("Invalid letter stats");
    }
    if (syllables < 2) {
        throw new Error("Syllables must be at least 3 letters");
    }
    numberOfWords = numberOfWords || 1;
    if (numberOfWords < 1) {
        throw new Error("Invalid number of words");
    }

    // create the specified number of words. the letters
    // chosen in the middle of the word will sometimes lead to
    // combinations that we have no word endings for, in which
    // case we will retry. if the stats passed in aren't sufficient
    // enough we could retry too many times. if a reasonably sized
    // dictionary was used to generate the stats, retries should be
    // relatively rare.
    var result = [],
        retries = 0;
    for(var i = 0; i < numberOfWords; i++) {
        try {
            result.push(createWord(stats, syllables));
            retries = 0;
        } catch(ex) {
            if (ex === "NoStats") {
                // occasionally word endings won't work out - retry
                if (retries > 5) {
                    throw new Error(
                        "Error generating words - insufficient stats");
                }
                retries++;
                i--;
            } else { // something else went wrong
                throw ex;
            }
        }
    }
    return result;
}
 
module.exports = {generate: generate};

