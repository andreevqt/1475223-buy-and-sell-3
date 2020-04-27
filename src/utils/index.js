// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const snuffle = (arr) => {
  let currentIndex = arr.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr.slice(0, rnd(1, arr.length));
};

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const rnd = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const singleton = (Base) => class extends Base {
  static getInstance() {
    if (!this.instance) {
      Base.instance = new Base;
    }
    return this.instance;
  }
}

const pad = (num, size) => ('000000000' + num).substr(-size);

const getNumLen = (num) => num.toString().length; 

module.exports = {
  singleton,
  snuffle,
  rnd,
  pad,
  getNumLen
}
