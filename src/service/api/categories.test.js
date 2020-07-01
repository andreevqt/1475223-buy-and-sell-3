'use strict';
/* eslint-disable no-undef */

const request = require(`supertest`);
const {API_PREFIX} = require(`../constants`);

const {
  app,
  api: {categoryService}
} = require(`../testSetup`);

let api = app;

const categories = [
  `Журналы`,
  `Игры`,
  `Разное`,
  `Посуда`,
  `Животные`
];

describe(`Categories api endpoint`, () => {
  beforeAll(async () => {
    const offers = categories.map((category) => ({category: [category]}));
    categoryService.offers = offers;
  });

  describe(`GET ${API_PREFIX}/categories`, () => {
    test(`Should return categories list with proper object structure`, async () => {
      const response = await request(api).get(`${API_PREFIX}/categories`);
      const results = response.body;

      expect(Array.isArray(results)).toBe(true);
      expect(results.length > 0).toBe(true);

      expect(results).toEqual(expect.arrayContaining(categories));
    });
  });
});
