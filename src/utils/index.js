'use strict';

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const snuffle = (arr) => {
  let currentIndex = arr.length;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    const temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
};

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const pad = (num, size) => (`000000000` + num).substr(-size);

const getNumLen = (num) => num.toString().length;

module.exports = {
  snuffle,
  randomInt,
  pad,
  getNumLen
};
