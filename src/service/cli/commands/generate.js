'use strict';

const fs = require(`fs`).promises;
const path = require(`path`);
const chalk = require(`chalk`);

const {
  snuffle,
  randomInt,
  pad,
  getNumLen
} = require(`../../../utils`);

const {
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

const generateOffer = (titles, sentences, categories) => {
  return {
    type: getRndField(TYPES),
    title: getRndField(titles),
    description: snuffle(sentences).slice(0, randomInt(1, 5)).join(` `),
    picture: generatePicture(),
    sum: randomInt(MIN_PRICE, MAX_PRICE),
    category: snuffle(categories).slice(0, randomInt(1, 3)),
  };
};

const writeFile = (outDir, offers) => {
  return fs.mkdir(outDir, {recursive: true})
    .then(() => fs.writeFile(`${outDir}/mocks.json`, JSON.stringify(offers, null, 2)));
};

const readFile = (file) => {
  return fs.readFile(file, `utf8`).then((data) => data.split(/\r?\n/));
};

const generate = async (manager, args) => {
  const count = +args[0] || 0;

  if (count > MAX_OFFERS_COUNT) {
    throw Error(`Максимальное количество предложений ${MAX_OFFERS_COUNT}`);
  }

  const rootDir = path.resolve(__dirname, `../../../../`);

  const sentences = await readFile(`${rootDir}/data/sentences.txt`);
  const categories = await readFile(`${rootDir}/data/categories.txt`);
  const titles = await readFile(`${rootDir}/data/titles.txt`);

  const offers = Array(count).fill(``)
    .map(() => generateOffer(titles, sentences, categories));

  return writeFile(rootDir, offers)
    .then(() => console.log(chalk.green(`Сгенерировано ${offers.length} предложений!`)));
};

module.exports = generate;
