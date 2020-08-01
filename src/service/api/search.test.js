'use strict';
/* eslint-disable no-undef, max-nested-callbacks */

const request = require(`supertest`);
const {API_PREFIX} = require(`../constants`);
const {services} = require(`./`);
const {server, setup, teardown} = require(`../test-setup`);

const offersData = [
  {title: `Продам коллекцию журналов «Огонёк».`, authorId: 1},
  {title: `Продам книги Стивена Кинга.`, authorId: 1},
  {title: `Куплю книги Стивена Кинга.`, authorId: 1},
];

beforeAll(async () => {
  await setup();
  await services.offers.bulkCreate(offersData);
});

afterAll(async () => {
  await teardown();
});

describe(`Search api endpoint`, () => {
  describe(`GET ${API_PREFIX}/search`, () => {
    test(`Should filter offers by title`, async () => {
      const query = `ПрОдАМ`;

      const response = await request(server)
        .get(`${API_PREFIX}/search`)
        .query({query})
        .expect(200);

      const results = response.body.items;
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

      const response = await request(server)
        .get(`${API_PREFIX}/search`)
        .query({query})
        .expect(404);

      expect(response.status).toBe(404);

      const results = response.body.items;
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(0);
    });
  });
});
