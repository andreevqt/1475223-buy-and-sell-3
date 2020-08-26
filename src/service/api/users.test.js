'use strict';
/* eslint-disable no-undef, max-nested-callbacks */

const request = require(`supertest`);
const {API_PREFIX} = require(`../constants`);
const {services} = require(`./`);
const {server, setup, teardown} = require(`../test-setup`);

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await teardown();
});

describe(`Users api endpoint`, () => {
  let testUser;

  const attrs = {
    name: `Джон Доу`,
    email: `test@email.com`,
    avatar: `/img/avatar02.jpg`,
    password: `123456aa`
  };

  beforeEach(async () => {
    testUser = await services.users.create(attrs);
  });

  afterEach(async () => {
    await services.users.delete(testUser.id);
  });

  describe(`GET ${API_PREFIX}/users`, () => {
    test(`Should return users list with proper object structure`, async () => {
      const response = await request(server).get(`${API_PREFIX}/users`)
        .expect(200);

      const users = (await services.users.findAll())
        .map((user) => user.convertToJSON());
      const results = response.body.items;

      expect(users).toEqual(expect.arrayContaining(results));
      expect(Array.isArray(results)).toBe(true);
      expect(results.length > 0).toBe(true);
      expect(results).toEqual(expect.arrayContaining(users));
    });
  });

  describe(`GET ${API_PREFIX}/users/:userId`, () => {
    test(`Should get a user by userId`, async () => {
      const storedUser = (await services.users.findById(testUser.id)).convertToJSON();

      const response = await request(server)
        .get(`${API_PREFIX}/users/${storedUser.id}`)
        .expect(200);

      const user = response.body;

      expect(storedUser).toEqual(expect.objectContaining(user));
    });

    test(`Should return 404 error if userId is wrong`, async () => {
      const response = await request(server)
        .get(`${API_PREFIX}/users/1234`);

      expect(response.status).toBe(404);
    });

    test(`Should return 400 error if userId isn't a string`, async () => {
      const response = await request(server)
        .get(`${API_PREFIX}/users/123asd`);

      expect(response.status).toBe(400);
    });
  });

  describe(`POST ${API_PREFIX}/users`, () => {
    const toCreate = {
      name: `Джейн Доу`,
      email: `test1234@email.com`,
      avatar: `/img/avatar02.jpg`,
      password: `123456aa`
    };

    test(`Should create a user`, async () => {
      const response = await request(server)
        .post(`${API_PREFIX}/users`)
        .send(toCreate)
        .expect(201);

      const user = response.body;
      expect(user.name).toEqual(toCreate.name);
      expect(user.email).toEqual(toCreate.email);
      expect(user.avatar).toEqual(toCreate.avatar);

      await services.users.delete(user.id);
    });

    test(`Should return 400 status code if attributes are wrong`, async () => {
      let response;

      // Name consists of latin characters
      response = await request(server)
        .post(`${API_PREFIX}/users`)
        .send({...toCreate, name: `sdsdsd`});
      expect(response.status).toBe(400);

      // duplicate email
      response = await request(server)
        .post(`${API_PREFIX}/users`)
        .send({...toCreate, email: attrs.email});
      expect(response.status).toBe(400);

      // password less than 6
      response = await request(server)
        .post(`${API_PREFIX}/users`)
        .send({...toCreate, password: `123`});
      expect(response.status).toBe(400);

      // email isn't valid
      response = await request(server)
        .post(`${API_PREFIX}/users`)
        .send({...toCreate, email: `asdad`});
      expect(response.status).toBe(400);
    });
  });

  describe(`PUT ${API_PREFIX}/users`, () => {
    test(`Should update a user`, async () => {
      const toUpdate = {
        name: `Джон Ди`,
      };

      const response = await request(server)
        .put(`${API_PREFIX}/users/1`)
        .send(toUpdate)
        .expect(200);

      const updated = response.body;
      expect(updated).toEqual(expect.objectContaining(toUpdate));
    });
  });

  describe(`DELETE ${API_PREFIX}/users`, () => {
    test(`Should delete a user`, async () => {
      const response = await request(server)
        .delete(`${API_PREFIX}/users/${testUser.id}`)
        .expect(200);

      const deleted = response.body;
      expect(testUser).toEqual(expect.objectContaining(deleted));
    });
  });
});
