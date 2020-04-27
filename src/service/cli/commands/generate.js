'use strict';

const fs = require(`fs`).promises;

const {
  snuffle,
  rnd,
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

const getRndField = (arr) => arr[rnd(0, arr.length - 1)];

const generatePicture = () => {
  const idx = rnd(0, MAX_IMAGE_IDX);
  return `item${pad(idx, getNumLen(MAX_IMAGE_IDX))}`;
}

const generateOffer = () => {
  return {
    title: getRndField(TITLES),
    picture: generatePicture(),
    category: snuffle(CATEGORIES),
    description: snuffle(DESCRIPTIONS).join(` `),
    type: getRndField(TYPES),
    sum: rnd(MIN_PRICE, MAX_PRICE),
  };
};

const generate = async (args) => {
  const count = +args[0];
  if (count > MAX_OFFERS_COUNT) {
    throw Error("Максимальное количество предложений 1000");
  }

  const offers = [...Array(count).keys()].map(() => generateOffer());
  const path = `${process.cwd()}/data`;

  return fs.mkdir(path, { recursive: true })
    .then(() => fs.writeFile(`${path}/mock.json`, JSON.stringify(offers, null, 2)));
};

module.exports = generate;
