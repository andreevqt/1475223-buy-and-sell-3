'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

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
  MAX_IMAGE_IDX
} = require(`../../constants`);

const usersData = [{
  id: 1,
  name: `Евгений Cмирнов`,
  email: `evgen2002@ya.ru`,
  avatar: `/img/avatar02.jpg`,
  password: `5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5`,
}, {
  id: 2,
  name: `Василий Уткин`,
  email: `vas12121@ya.ru`,
  avatar: `/img/avatar.jpg`,
  password: `5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5`,
}];

const getRndField = (arr) => arr[randomInt(0, arr.length - 1)];

const generatePicture = () => {
  const idx = randomInt(1, MAX_IMAGE_IDX);
  return `/img/item${pad(idx, getNumLen(MAX_IMAGE_IDX))}.jpg`;
};

const makeCommentsQuery = (comments) => {
  return `-- comments
INSERT INTO public.comments (text, author_id, offer_id) VALUES 
\t${comments.map((comment) => `('${comment.text}', ${comment.author.id}, ${comment.offer.id})`).join(`,\n\t`)};\n\n`;
};

const makeCategoriesQuery = (categories) => {
  return `-- categories
INSERT INTO public.categories (name) VALUES
\t${categories.map((category) => `('${category.name}')`).join(`,\n\t`)};\n\n`;
};

const makeOffersQuery = (offers) => {
  return `-- offers
INSERT INTO public.offers (title, description, type, picture, sum, author_id) VALUES
\t${offers.map((offer) => `('${offer.title}', '${offer.description}', '${offer.type}', '${offer.picture}', ${offer.sum}, ${offer.author.id})`).join(`,\n\t`)};\n\n`;
};

const makeOffersCategoriesQuery = (items) => {
  return `-- offers_categories
INSERT INTO public.offers_categories (offer_id, category_id) VALUES
\t${items.map((item) => `(${item.offer.id}, ${item.category.id})`).join(`,\n\t`)};\n\n`;
};

const makeUsersQuery = (users) => {
  return `-- users
INSERT INTO public.users (name, email, avatar, password) VALUES
  ${users.map((user) => `('${user.name}', '${user.email}', '${user.avatar}', '${user.password}')`).join(`,\n\t`)};\n\n`;
};

const generateOffer = (id, titles, sentences, users) => {
  return {
    id,
    type: getRndField(TYPES),
    title: getRndField(titles),
    description: shuffle(sentences).slice(0, randomInt(1, 5)).join(` `),
    picture: generatePicture(),
    sum: randomInt(MIN_PRICE, MAX_PRICE),
    author: users[randomInt(0, users.length - 1)],
  };
};

const generateCategory = (id, name) => {
  return {
    id,
    name
  };
};

const generateComment = (id, text, author, offer) => {
  return {
    id,
    text,
    author,
    offer
  };
};

const writeFile = (outDir, data) => {
  const {offers, categories, comments, categoriesForOffers, users} = data;
  let query = ``;

  query += makeUsersQuery(users);
  query += makeOffersQuery(offers);
  query += makeCategoriesQuery(categories);
  query += makeOffersCategoriesQuery(categoriesForOffers);
  query += makeCommentsQuery(comments);

  return fs.mkdir(outDir, {recursive: true})
    .then(() => fs.writeFile(`${outDir}/fill-db.sql`, query));
};

const readFile = (file) => {
  return fs.readFile(file, `utf8`).then((data) => data.split(/\r?\n/));
};

const fill = async (manager, args) => {
  const count = +args[0] || 0;

  if (count > MAX_OFFERS_COUNT) {
    throw Error(`Максимальное количество предложений ${MAX_OFFERS_COUNT}`);
  }

  const rootDir = `${process.cwd()}/data`;

  const sentences = await readFile(`${rootDir}/sentences.txt`);
  const cats = await readFile(`${rootDir}/categories.txt`);
  const titles = await readFile(`${rootDir}/titles.txt`);
  const commentsTxt = await readFile(`${rootDir}/comments.txt`);

  const offers = Array(count).fill({})
    .map((_item, idx) => generateOffer(idx + 1, titles, sentences, usersData));

  const categories = cats.map((cat, idx) => generateCategory(idx + 1, cat));

  const comments = offers.reduce((acc, offer) => {
    const replies = shuffle(commentsTxt)
      .slice(0, randomInt(1, commentsTxt.length))
      .map((text, idx) => generateComment(idx + 1, text, usersData[randomInt(0, usersData.length - 1)], offer));
    return [...acc, ...replies];
  }, []);

  const categoriesForOffers = offers.reduce((acc, offer) => {
    const items = shuffle(categories)
      .slice(0, randomInt(1, categories.length))
      .map((category) => ({category, offer}));
    return [...acc, ...items];
  }, []);

  const data = {
    offers,
    comments,
    categories,
    categoriesForOffers,
    users: usersData
  };

  return writeFile(process.cwd(), data)
    .then(() => console.log(chalk.green(`Сгенерировано ${offers.length} предложений!`)));
};

module.exports = fill;
