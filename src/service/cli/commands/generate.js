'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {
  shuffle,
  randomInt,
  pad,
  getNumLen
} = require(`../../../utils`);

const {
  TYPES,
  MIN_PRICE,
  MAX_PRICE,
  MAX_OFFERS_COUNT,
  MAX_IMAGE_IDX,
  ID_LEN
} = require(`../../constants`);

const getRndField = (arr) => arr[randomInt(0, arr.length - 1)];

const generatePicture = () => {
  const idx = randomInt(1, MAX_IMAGE_IDX);
  return `item${pad(idx, getNumLen(MAX_IMAGE_IDX))}.jpg`;
};

const generateComments = (comments) => {
  return shuffle(comments)
    .slice(0, randomInt(1, comments.length))
    .map((comment) => ({
      id: nanoid(ID_LEN),
      text: comment
    }));
};

const generateOffer = (titles, sentences, categories, comments) => {
  return {
    id: nanoid(ID_LEN),
    type: getRndField(TYPES),
    title: getRndField(titles),
    description: shuffle(sentences).slice(0, randomInt(1, 5)).join(` `),
    picture: generatePicture(),
    sum: randomInt(MIN_PRICE, MAX_PRICE),
    comments: generateComments(comments),
    category: shuffle(categories).slice(0, randomInt(1, 3)),
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

  const rootDir = `${process.cwd()}/data`;

  const sentences = await readFile(`${rootDir}/sentences.txt`);
  const categories = await readFile(`${rootDir}/categories.txt`);
  const titles = await readFile(`${rootDir}/titles.txt`);
  const comments = await readFile(`${rootDir}/comments.txt`);

  const offers = Array(count).fill(``)
    .map(() => generateOffer(titles, sentences, categories, comments));

  return writeFile(process.cwd(), offers)
    .then(() => console.log(chalk.green(`Сгенерировано ${offers.length} предложений!`)));
};

module.exports = generate;
