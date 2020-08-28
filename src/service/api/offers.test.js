'use strict';
/* eslint-disable no-undef, max-nested-callbacks */

const request = require(`supertest`);
const {API_PREFIX} = require(`../constants`);
const {services} = require(`./`);
const {server, setup, teardown} = require(`../test-setup`);

const testUserAttrs = {
  name: `Джон Доу`,
  email: `test@email.com`,
  password: `123456aa`
};

const offerAttrs = {
  category: [`1`, `2`, `3`],
  description: `При покупке с меня бесплатная доставка в черте города. Две страницы заляпаны свежим кофе. Пользовались бережно и только по большим праздникам., Бонусом отдам все аксессуары.`,
  title: `Продам новую приставку Sony Playstation 5.`,
  sum: 42698,
  type: `buy`
};

const commentAttrs = {
  text: `Какой-то комментарий`
};

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await teardown();
});

describe(`${API_PREFIX}/offers api endpoint`, () => {
  let testOffer;
  let testComment;
  let testUser;

  beforeEach(async () => {
    await services.users.create(testUserAttrs);
    testUser = await services.users.login(testUserAttrs.email, testUserAttrs.password);

    const offer = await services.offers.create({authorId: testUser.id, ...offerAttrs});
    const comment = await services.comments.create(offer, {authorId: testUser.id, ...commentAttrs});
    testOffer = (await offer.reload()).convertToJSON();
    testComment = comment.convertToJSON();
  });

  afterEach(async () => {
    await services.offers.delete(testOffer.id);
    await services.comments.delete(testComment.id);
    await services.users.logout(testUser.tokens.access);
    await services.users.delete(testUser.id);
  });

  describe(`GET ${API_PREFIX}/offers`, () => {
    test(`Should return an offers list`, async () => {
      const response = await request(server)
        .get(`${API_PREFIX}/offers`)
        .expect(200);

      const comparator = (a, b) => a.id - b.id;
      const storedOffers = (await services.offers.findAll())
        .map((offer) => offer.convertToJSON()).sort(comparator);
      const offers = response.body.items.sort(comparator);

      expect(offers.length).toBe(storedOffers.length);
      for (let i = 0; i < offers.length; i++) {
        expect(storedOffers[i].id).toBe(offers[i].id);
        expect(storedOffers[i].title).toBe(offers[i].title);
        expect(storedOffers[i].description).toBe(offers[i].description);
        expect(storedOffers[i].type).toBe(offers[i].type);
        expect(storedOffers[i].createdAt).toBe(offers[i].createdAt);
        expect(storedOffers[i].updatedAt).toBe(offers[i].updatedAt);
        expect(storedOffers[i].picture).toStrictEqual(offers[i].picture);
        expect(storedOffers[i].category.sort(comparator)).toEqual(offers[i].category.sort(comparator));
      }
    });

    test(`Should return 400 error if wrong params`, async () => {
      let response;

      response = await request(server)
        .get(`${API_PREFIX}/offers?limit=sdsd4`);
      expect(response.status).toBe(400);

      response = await request(server)
        .get(`${API_PREFIX}/offers?limit=4`);
      expect(response.status).toBe(200);

      response = await request(server)
        .get(`${API_PREFIX}/offers?page=sdsd4`);
      expect(response.status).toBe(400);

      response = await request(server)
        .get(`${API_PREFIX}/offers?page=1`);
      expect(response.status).toBe(200);
    });
  });

  describe(`GET ${API_PREFIX}/offers/:id`, () => {
    test(`Should get an offer by offerId`, async () => {
      const response = await request(server)
        .get(`${API_PREFIX}/offers/${testOffer.id}`)
        .expect(200);

      const offer = response.body;
      expect(testOffer).toEqual(expect.objectContaining(offer));
    });

    test(`Should return 404 error if offerId is wrong`, async () => {
      const response = await request(server)
        .get(`${API_PREFIX}/offers/1234`);

      expect(response.status).toBe(404);
    });

    test(`Should return 400 error if offerId isn't a string`, async () => {
      const response = await request(server)
        .get(`${API_PREFIX}/offers/123asd`);

      expect(response.status).toBe(400);
    });
  });

  describe(`POST ${API_PREFIX}/offers`, () => {
    test(`Should create an offer`, async () => {
      const response = await request(server)
        .post(`${API_PREFIX}/offers`)
        .set(`authorization`, testUser.tokens.access)
        .send(offerAttrs)
        .expect(201);

      const offer = response.body;
      expect(offer.title).toEqual(offerAttrs.title);
      expect(offer.description).toEqual(offerAttrs.description);
      expect(offer.sum).toEqual(offerAttrs.sum);
      expect(offer.type).toEqual(offerAttrs.type);
      offer.category.forEach((category) => expect(offerAttrs.category).toContain(category.id.toString()));
    });

    test(`Should return 400 error if wrong attributes`, async () => {
      let response = await request(server)
        .post(`${API_PREFIX}/offers`)
        .set(`authorization`, testUser.tokens.access)
        .send({...offerAttrs, sum: 90});
      expect(response.status).toBe(400);

      response = await request(server)
        .post(`${API_PREFIX}/offers`)
        .set(`authorization`, testUser.tokens.access)
        .send({...offerAttrs, title: 123});
      expect(response.status).toBe(400);

      // title.length < 10
      response = await request(server)
        .post(`${API_PREFIX}/offers`)
        .set(`authorization`, testUser.tokens.access)
        .send({...offerAttrs, title: `123`});
      expect(response.status).toBe(400);

      // title.length > 1000
      const title = Array.from(Array(1001)).map((_el, i) => i).join(``);
      response = await request(server)
        .post(`${API_PREFIX}/offers`)
        .set(`authorization`, testUser.tokens.access)
        .send({...offerAttrs, title});
      expect(response.status).toBe(400);

      // description.length < 50
      response = await request(server)
        .post(`${API_PREFIX}/offers`)
        .set(`authorization`, testUser.tokens.access)
        .send({...offerAttrs, description: `123`});
      expect(response.status).toBe(400);

      let description;

      // 50 <= description < 1000
      description = Array.from(Array(52)).map((_el, i) => i).join(``);
      response = await request(server)
        .post(`${API_PREFIX}/offers`)
        .set(`authorization`, testUser.tokens.access)
        .send({...offerAttrs, description});
      expect(response.status).toBe(201);

      // description.length > 1000
      description = Array.from(Array(1001)).map((_el, i) => i).join(``);
      response = await request(server)
        .post(`${API_PREFIX}/offers`)
        .set(`authorization`, testUser.tokens.access)
        .send({...offerAttrs, description});
      expect(response.status).toBe(400);

      // category.length < 1
      response = await request(server)
        .post(`${API_PREFIX}/offers`)
        .set(`authorization`, testUser.tokens.access)
        .send({...offerAttrs, category: []});
      expect(response.status).toBe(400);

      // category.length >= 1
      response = await request(server)
        .post(`${API_PREFIX}/offers`)
        .set(`authorization`, testUser.tokens.access)
        .send({...offerAttrs, category: [1]});
      expect(response.status).toBe(201);

      // [`buy`, `sell`].includes(type) === false
      response = await request(server)
        .post(`${API_PREFIX}/offers`)
        .set(`authorization`, testUser.tokens.access)
        .send({...offerAttrs, type: `offer`});
      expect(response.status).toBe(400);
    });
  });

  describe(`PUT ${API_PREFIX}/offers/:offerId`, () => {
    const toUpdate = {
      title: `Обновленный заголовок`,
      sum: 120
    };

    test(`Should update an offer`, async () => {
      let response = await request(server)
        .put(`${API_PREFIX}/offers/${testOffer.id}`)
        .set(`authorization`, testUser.tokens.access)
        .send(toUpdate)
        .expect(200);

      const updated = response.body;
      expect(updated).toEqual(expect.objectContaining(toUpdate));

      response = await request(server)
        .get(`${API_PREFIX}/offers/${testOffer.id}`)
        .expect(200);

      const received = response.body;
      expect(updated).toEqual(received);
    });

    test(`Should return 404 error if offerId is wrong`, async () => {
      const respone = await request(server)
        .put(`${API_PREFIX}/offers/1234`)
        .set(`authorization`, testUser.tokens.access)
        .send(toUpdate);

      expect(respone.status).toBe(404);
    });
  });

  describe(`DELETE ${API_PREFIX}/offers/:id`, () => {
    test(`Should delete an offer`, async () => {
      const response = await request(server)
        .delete(`${API_PREFIX}/offers/${testOffer.id}`)
        .set(`authorization`, testUser.tokens.access)
        .expect(200);

      const deleted = response.body;
      expect(testOffer).toEqual(expect.objectContaining(deleted));
    });

    test(`Should return 404 error if offerId is wrong`, async () => {
      const response = await request(server)
        .delete(`${API_PREFIX}/offers/1234`)
        .set(`authorization`, testUser.tokens.access);

      expect(response.status).toBe(404);
    });
  });

  describe(`GET ${API_PREFIX}/offers/:offerId/comments`, () => {
    test(`Should get comments list by offerid`, async () => {
      const response = await request(server)
        .get(`${API_PREFIX}/offers/${testOffer.id}/comments`)
        .expect(200);

      const comments = response.body.items;
      expect(Array.isArray(comments)).toBe(true);
      expect(comments.length).toBe(1);
      expect(comments[0].text).toEqual(commentAttrs.text);
    });

    test(`Should return 404 error if offerId is wrong`, async () => {
      const response = await request(server)
        .get(`${API_PREFIX}/offers/1234/comments`);

      expect(response.status).toBe(404);
    });

    test(`Should return 400 error if offerId isn't a number`, async () => {
      const response = await request(server)
        .get(`${API_PREFIX}/offers/1234sdsd/comments`);

      expect(response.status).toBe(400);
    });
  });

  describe(`DELETE ${API_PREFIX}/offers/:offerId/comments/:commentId`, () => {
    test(`Should delete comment by id`, async () => {
      let response = await request(server)
        .delete(`${API_PREFIX}/offers/${testOffer.id}/comments/${testComment.id}`)
        .set(`authorization`, testUser.tokens.access)
        .expect(200);

      const comment = response.body;
      expect(testComment).toEqual(expect.objectContaining(comment));

      response = await request(server)
        .get(`${API_PREFIX}/offers/${testOffer.id}/comments/${testComment.id}`);

      expect(response.status).toBe(404);
    });

    test(`Should return 404 error if offerId is wrong`, async () => {
      const response = await request(server)
        .delete(`${API_PREFIX}/offers/1234/comments/${testComment.id}`)
        .set(`authorization`, testUser.tokens.access);

      expect(response.status).toBe(404);
    });

    test(`Should return 404 error if commentId is wrong`, async () => {
      const response = await request(server)
        .delete(`${API_PREFIX}/offers/${testOffer.id}/comments/1234`)
        .set(`authorization`, testUser.tokens.access);

      expect(response.status).toBe(404);
    });

    test(`Should return 400 error if commentId isn't a string`, async () => {
      const response = await request(server)
        .delete(`${API_PREFIX}/offers/${testOffer.id}/comments/1234asd`)
        .set(`authorization`, testUser.tokens.access);

      expect(response.status).toBe(400);
    });
  });

  describe(`POST ${API_PREFIX}/offers/:offerId/comments`, () => {
    const toCreate = {
      text: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis`,
    };

    test(`Should create a comment`, async () => {
      let response = await request(server)
        .post(`${API_PREFIX}/offers/${testOffer.id}/comments`)
        .set(`authorization`, testUser.tokens.access)
        .send(toCreate)
        .expect(201);

      const created = response.body;
      expect(created).toEqual(expect.objectContaining(toCreate));

      response = await request(server)
        .get(`${API_PREFIX}/offers/${testOffer.id}/comments`)
        .expect(200);

      const comments = response.body.items;
      expect(comments).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: created.id,
          text: created.text,
          author: created.author
        })
      ]));
    });

    test(`Should return 404 error if offerId is wrong`, async () => {
      const response = await request(server)
        .post(`${API_PREFIX}/offers/1234`)
        .set(`authorization`, testUser.tokens.access)
        .send(toCreate);

      expect(response.status).toBe(404);
    });

    test(`Should return 400 error if wrong attributes`, async () => {
      const response = await request(server)
        .post(`${API_PREFIX}/offers/${testOffer.id}/comments`)
        .set(`authorization`, testUser.tokens.access)
        .send({...toCreate, someWrongAttr: true});

      expect(response.status).toBe(400);
    });
  });

  describe(`PUT ${API_PREFIX}/offers/:offerId/comments/:commentId`, () => {
    const toUpdate = {
      text: `Обновленный комментарий`
    };

    test(`Should update a comment`, async () => {
      let response = await request(server)
        .put(`${API_PREFIX}/offers/${testOffer.id}/comments/${testComment.id}`)
        .set(`authorization`, testUser.tokens.access)
        .send(toUpdate)
        .expect(200);

      const updated = response.body;
      expect(updated).toEqual(expect.objectContaining(toUpdate));

      response = await request(server)
        .get(`${API_PREFIX}/offers/${testOffer.id}/comments`)
        .expect(200);

      const comments = response.body.items;
      expect(comments).toContainEqual(updated);
    });

    test(`Should return 404 error if offerId is wrong`, async () => {
      const response = await request(server)
        .put(`${API_PREFIX}/offers/1234/comments/${testComment.id}`)
        .set(`authorization`, testUser.tokens.access)
        .send(toUpdate);

      expect(response.status).toBe(404);
    });

    test(`Should return 404 error if commentId is wrong`, async () => {
      const response = await request(server)
        .put(`${API_PREFIX}/offers/${testOffer.id}/1234`)
        .set(`authorization`, testUser.tokens.access)
        .send(toUpdate);

      expect(response.status).toBe(404);
    });

    test(`Should return 404 error if commentId and offerId are wrong`, async () => {
      const response = await request(server)
        .put(`${API_PREFIX}/offers/1234/comments/34343`)
        .set(`authorization`, testUser.tokens.access)
        .send(toUpdate);

      expect(response.status).toBe(404);
    });

    test(`Should return 400 error if attributes are wrong`, async () => {
      const response = await request(server)
        .put(`${API_PREFIX}/offers/${testOffer.id}/comments/${testComment.id}`)
        .set(`authorization`, testUser.tokens.access)
        .send({...toUpdate, someWrongAttr: true});

      expect(response.status).toBe(400);
    });
  });
});
