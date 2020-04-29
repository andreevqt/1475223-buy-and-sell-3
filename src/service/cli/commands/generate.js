'use strict';

const fs = require(`fs`).promises;
const path = require(`path`);

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
    type: getRndField(TYPES),
    title: getRndField(TITLES),
    description: snuffle(DESCRIPTIONS).slice(0, randomInt(1, 5)).join(` `),
    picture: generatePicture(),
    sum: randomInt(MIN_PRICE, MAX_PRICE),
    category: snuffle(CATEGORIES).slice(0, randomInt(1, 3)),
  };
};

const writeFile = (outDir, offers) => {
  return fs.mkdir(outDir, {recursive: true})
    .then(() => fs.writeFile(`${outDir}/mocks.json`, JSON.stringify(offers, null, 2)));
};

const generate = async (args) => {
  const count = +args[0];

  if (count > MAX_OFFERS_COUNT) {
    throw Error(`Максимальное количество предложений ${MAX_OFFERS_COUNT}`);
  }

  const outDir = path.resolve(__dirname, `../../../../`);
  const offers = count ? [...Array(count).keys()].map(() => generateOffer()) : [];

  return writeFile(outDir, offers);
};

module.exports = generate;
