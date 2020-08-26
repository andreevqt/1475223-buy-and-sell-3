'use strict';
/* eslint-disable no-undef */

const {setup, teardown} = require(`../test-setup`);
const cryptService = require(`../crypt-service`);
const {User} = require(`./`);
const {ValidationError} = require(`sequelize`);

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await teardown();
});

describe(`Should generate password for user correctly when creating / updating`, () => {
  test(`Create user`, async () => {
    const user = await User.create({
      name: `John Doe`,
      email: `johndoe@google.com`,
      avatar: `/img/avatar02.jpg`,
      password: `12345`,
    });

    expect(cryptService.compare(`12345`, user.password)).toBe(true);
  });

  test(`Update user`, async () => {
    let user = await User.findByPk(1);
    await user.update({password: `333`});

    expect(cryptService.compare(`333`, user.password)).toBe(true);
  });
});

describe(`Should check against duplicated emails`, () => {
  test(`Has the same email`, async () => {
    await User.create({
      name: `John Doe`,
      email: `a@google.com`,
      avatar: `/img/avatar02.jpg`,
      password: `12345`,
    });

    // throws
    await expect(User.create({
      name: `John Doe Junior`,
      email: `a@google.com`,
      avatar: `/img/avatar02.jpg`,
      password: `911`,
    })).rejects.toThrowError(ValidationError);
  });
});
