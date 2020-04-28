'use strict';

const fs = require(`fs`).promises;

const {
  snuffle,
  randomInt,
  pad,
  getNumLen
} = require(`../../../utils`);

const {
  TITLES,
  CATEGORIES,
  DESCRIPTIONS,
  TYPES,
  MIN_PRICE,
  MAX_PRICE,
  MAX_OFFERS_COUNT,
  MAX_IMAGE_IDX
} = require(`../constants`);

const getRndField = (arr) => arr[randomInt(0, arr.length - 1)];

const generatePicture = () => {
  const idx = randomInt(0, MAX_IMAGE_IDX);
  return `item${pad(idx, getNumLen(MAX_IMAGE_IDX))}.jpg`;
};

const generateOffer = () => {
  return {
    title: getRndField(TITLES),
    picture: generatePicture(),
    category: snuffle(CATEGORIES).slice(0, randomInt(1, 3)),
    description: snuffle(DESCRIPTIONS).slice(1, 5).join(` `),
    type: getRndField(TYPES),
    sum: randomInt(MIN_PRICE, MAX_PRICE),
  };
};

const writeFile = (path, offers) => {
  return fs.mkdir(path, {recursive: true})
    .then(() => fs.writeFile(`${path}/mocks.json`, JSON.stringify(offers, null, 2)));
};

const generate = async (args) => {
  const count = +args[0];

  if (count > MAX_OFFERS_COUNT) {
    throw Error(`Максимальное количество предложений ${MAX_OFFERS_COUNT}`);
  }

  const path = `../../../data`;
  const offers = count ? [...Array(count).keys()].map(() => generateOffer()) : [];

  return writeFile(path, offers);
};

module.exports = generate;
