'use strict';
/* eslint-disable no-undef, max-nested-callbacks */

const request = require(`supertest`);
const {API_PREFIX} = require(`../constants`);
const _ = require(`lodash`);
const {
  app,
  api: {searchService}
} = require(`../testSetup`);

const offers = [
  {title: `Продам коллекцию журналов «Огонёк».`},
  {title: `Продам книги Стивена Кинга.`},
  {title: `Куплю книги Стивена Кинга.`},
];

describe(`Search api endpoint`, () => {
  beforeAll(() => {
    searchService.offers = offers;
  });

  describe(`GET ${API_PREFIX}/search`, () => {
    test(`Should filter offers by title`, async () => {
      const query = `ПрОдАМ`;

      const response = await request(app)
        .get(`${API_PREFIX}/search`)
        .query({query})
        .expect(200);

      const results = response.body;
      expect(Array.isArray(results)).toBe(true);
      expect(results.length > 0).toBe(true);

      const regex = new RegExp(`^${query}`, `i`);
      const isOffersCorrect = results.every((offer) => {
        return regex.test(offer.title);
      });

      expect(isOffersCorrect).toBe(true);
    });

    test(`Should return 404 error and empty array if nothing is found`, async () => {
      const query = `asdsds`;

      const response = await request(app)
        .get(`${API_PREFIX}/search`)
        .query({query});

      expect(response.status).toBe(404);

      const results = response.body;
      expect(_.isArray(results)).toBe(true);
      expect(results.length).toBe(0);
    });
  });
});
