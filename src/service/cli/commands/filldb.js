'use strict';

const {Category, Offer, Comment, User, service} = require(`../../models`);
const moment = require(`moment`);

const {
  readData,
  shuffle,
  randomInt,
  pad,
  getNumLen
} = require(`../../../utils`);

const {
  TYPES,
  MAX_IMAGE_IDX,
  MIN_PRICE,
  MAX_PRICE
} = require(`../../constants`);

const {data} = require(`../../test-setup`);

const generatePicture = () => {
  const idx = randomInt(1, MAX_IMAGE_IDX);
  return `item${pad(idx, getNumLen(MAX_IMAGE_IDX))}.jpg`;
};

const generateDate = () => {
  const now = moment();
  const diff = +now - +now.subtract(2, `months`);
  const randomDate = +now - randomInt(0, diff);
  return moment(randomDate).format(`YYYY-MM-DD hh:mm:ss`);
};

const getRndField = (arr) => arr[randomInt(0, arr.length - 1)];

const filldb = async (manager, args) => {
  const count = +args[0] || 0;
  const root = `${process.cwd()}/data`;

  // users
  await service.bulkDelete(`users`);
  const users = await User.bulkCreate(data.users);

  // categories
  await service.bulkDelete(`categories`);
  const categoriesText = await readData(`${root}/categories.txt`);
  const categories = await Category.bulkCreate(categoriesText.map((name) => ({name})));

  // offers
  await service.bulkDelete(`offers`);
  const titles = await readData(`${root}/titles.txt`);
  const sentences = await readData(`${root}/sentences.txt`);
  const offers = await Offer.bulkCreate(
    Array(count).fill({})
      .map(() => ({
        type: getRndField(TYPES),
        title: getRndField(titles),
        description: shuffle(sentences).slice(0, randomInt(1, 5)).join(` `),
        picture: generatePicture(),
        sum: randomInt(MIN_PRICE, MAX_PRICE),
        authorId: users[randomInt(0, users.length - 1)].id,
        createdAt: generateDate(),
        updatedAt: generateDate(),
      }))
  );

  // offers_categories
  await service.bulkDelete(`offers_categories`);
  const offersCategories = offers.reduce((acc, offer) => {
    const items = shuffle(categories)
      .slice(0, randomInt(1, categories.length))
      .map((category) => ({categoryId: category.id, offerId: offer.id}));
    return [...acc, ...items];
  }, []);
  await service.bulkInsert(`offers_categories`, offersCategories);

  // comments
  await service.bulkDelete(`comments`, null, {});
  const commentsTxt = await readData(`${root}/comments.txt`);
  const comments = offers.reduce((acc, offer) => {
    const replies = shuffle(commentsTxt)
      .slice(0, randomInt(1, commentsTxt.length))
      .map((text) => ({
        text,
        authorId: users[randomInt(0, users.length - 1)].id,
        offerId: offer.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
    return [...acc, ...replies];
  }, []);
  await Comment.bulkCreate(comments);

  await service.close();
};

module.exports = filldb;
