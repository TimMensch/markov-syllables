# markov-words
Node package to generate pronounceable words via Markov chains.
```js
var markov = require('markov-words');
var result = markov(stats, 8); // generate an array of one 8 letter word
```
To get the stats, use `word-stats`:
```js
var stats = require('word-stats')(array_of_words);
var result = require('markov-words').generate(stats, 8, 40); //40 8 letter words
```
