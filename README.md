# markov-words
Node package to generate pronounceable words via Markov chains.  In order to do this, the program requires statistics on frequency of letter combinations.  Here called stats.
```js
var markov = require('markov-words');
var result = markov(stats, 8); // generate an array of one 8 letter word
```
To generate the stats from an array of example words, use the `calculateStats` function:
```js
var markov_words = require('markov-words');
var array_of_words = ["a", "aarau", "aardvark"] // etc.
var stats = markov_words.calculateStats(array_of_words);
var result = markov_words.generate(stats, 8, 40); //40 8 letter words
```
