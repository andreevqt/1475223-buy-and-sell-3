'use strict';
/* eslint-disable no-undef, max-nested-callbacks */

const request = require(`supertest`);
const {API_PREFIX} = require(`../constants`);
const {services} = require(`./`);
const {server, setup, teardown} = require(`../test-setup`);

const offerAttrs = {
  authorId: 1,
  category: [1, 2, 3],
  description: `При покупке с меня бесплатная доставка в черте города. Две страницы заляпаны свежим кофе. Пользовались бережно и только по большим праздникам., Бонусом отдам все аксессуары.`,
  picture: `item03.jpg`,
  title: `Продам новую приставку Sony Playstation 5.`,
  sum: 42698,
  type: `offer`
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
  let testOffer = null;
  let testComment = null;

  beforeEach(async () => {
    const offer = await services.offers.create(offerAttrs);
    const comment = await services.comments.create(offer, commentAttrs);
    testOffer = (await offer.reload()).convertToJSON();
    testComment = comment.convertToJSON();
  });

  describe(`GET ${API_PREFIX}/offers`, () => {
    test(`Should return an offers list`, async () => {
      const response = await request(server)
        .get(`${API_PREFIX}/offers`)
        .expect(200);

      const storedOffers = (await services.offers.findAll())
        .map((offer) => offer.convertToJSON());
      const offers = response.body;

      expect(storedOffers).toEqual(expect.arrayContaining(offers));
      expect(Array.isArray(offers)).toBe(true);
      expect(offers.length).toBe(storedOffers.length);
      expect(storedOffers).toEqual(expect.objectContaining(offers));
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
  });

  describe(`POST ${API_PREFIX}/offers`, () => {
    test(`Should create an offer`, async () => {
      const response = await request(server)
        .post(`${API_PREFIX}/offers`)
        .send(offerAttrs)
        .expect(201);

      const offer = response.body;
      expect(offer.title).toEqual(offerAttrs.title);
      expect(offer.description).toEqual(offerAttrs.description);
      expect(offer.sum).toEqual(offerAttrs.sum);
      expect(offer.type).toEqual(offerAttrs.type);
      offer.category.forEach((category) => expect(offerAttrs.category).toContain(category.id));
    });

    test(`Should return 400 error if wrong attributes`, async () => {
      const response = await request(server)
        .post(`${API_PREFIX}/offers`)
        .send({...offerAttrs, wrongAttribute: true});

      expect(response.status).toBe(400);
    });
  });

  describe(`PUT ${API_PREFIX}/offers/:offerId`, () => {
    const toUpdate = {
      title: `Обновленный заголовок`,
      sum: 24
    };

    test(`Should update an offer`, async () => {
      let response = await request(server)
        .put(`${API_PREFIX}/offers/${testOffer.id}`)
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
        .send(toUpdate);

      expect(respone.status).toBe(404);
    });
  });

  describe(`DELETE ${API_PREFIX}/offers/:id`, () => {
    test(`Should delete an offer`, async () => {
      const response = await request(server)
        .delete(`${API_PREFIX}/offers/${testOffer.id}`)
        .expect(200);

      const deleted = response.body;
      expect(testOffer).toEqual(expect.objectContaining(deleted));
    });

    test(`Should return 404 error if offerId is wrong`, async () => {
      const response = await request(server)
        .delete(`${API_PREFIX}/offers/1234`);

      expect(response.status).toBe(404);
    });
  });

  describe(`GET ${API_PREFIX}/offers/:offerId/comments`, () => {
    test(`Should get comments list by offerid`, async () => {
      const response = await request(server)
        .get(`${API_PREFIX}/offers/${testOffer.id}/comments`)
        .expect(200);

      const comments = response.body;
      expect(Array.isArray(comments)).toBe(true);
      expect(comments.length).toBe(1);
      expect(comments[0].text).toEqual(commentAttrs.text);
    });

    test(`Should return 404 error if offerId is wrong`, async () => {
      const response = await request(server)
        .get(`${API_PREFIX}/offers/1234/comments`);

      expect(response.status).toBe(404);
    });
  });

  describe(`DELETE ${API_PREFIX}/offers/:offerId/comments/:commentId`, () => {
    test(`Should delete comment by id`, async () => {
      let response = await request(server)
        .delete(`${API_PREFIX}/offers/${testOffer.id}/comments/${testComment.id}`)
        .expect(200);

      const comment = response.body;
      expect(testComment).toEqual(expect.objectContaining(comment));

      response = await request(server)
        .get(`${API_PREFIX}/offers/${testOffer.id}/comments/${testComment.id}`);

      expect(response.status).toBe(404);
    });

    test(`Should return 404 error if offerId is wrong`, async () => {
      const response = await request(server)
        .delete(`${API_PREFIX}/offers/1234/comments/${testComment.id}`);

      expect(response.status).toBe(404);
    });
  });

  describe(`POST ${API_PREFIX}/offers/:offerId/comments`, () => {
    const toCreate = {
      text: `Новый комментарий`
    };

    test(`Should create a comment`, async () => {
      let response = await request(server)
        .post(`${API_PREFIX}/offers/${testOffer.id}/comments`)
        .send(toCreate)
        .expect(201);

      const created = response.body;
      expect(created).toEqual(expect.objectContaining(toCreate));

      response = await request(server)
        .get(`${API_PREFIX}/offers/${testOffer.id}/comments`)
        .expect(200);

      const comments = response.body;
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
        .send(toCreate);

      expect(response.status).toBe(404);
    });

    test(`Should return 400 error if wrong attributes`, async () => {
      const response = await request(server)
        .post(`${API_PREFIX}/offers/${testOffer.id}/comments`)
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
        .send(toUpdate)
        .expect(200);

      const updated = response.body;
      expect(updated).toEqual(expect.objectContaining(toUpdate));

      response = await request(server)
        .get(`${API_PREFIX}/offers/${testOffer.id}/comments`)
        .expect(200);

      const comments = response.body;
      expect(comments).toContainEqual(updated);
    });

    test(`Should return 404 error if offerId is wrong`, async () => {
      const response = await request(server)
        .put(`${API_PREFIX}/offers/1234/comments/${testComment.id}`)
        .send(toUpdate);

      expect(response.status).toBe(404);
    });

    test(`Should return 404 error if commentId is wrong`, async () => {
      const response = await request(server)
        .put(`${API_PREFIX}/offers/${testOffer.id}/1234`)
        .send(toUpdate);

      expect(response.status).toBe(404);
    });

    test(`Should return 404 error if commentId and offerId are wrong`, async () => {
      const response = await request(server)
        .put(`${API_PREFIX}/offers/1234/comments/34343`)
        .send(toUpdate);

      expect(response.status).toBe(404);
    });

    test(`Should return 400 error if attributes are wrong`, async () => {
      const response = await request(server)
        .put(`${API_PREFIX}/offers/${testOffer.id}/comments/${testComment.id}`)
        .send({...toUpdate, someWrongAttr: true});

      expect(response.status).toBe(400);
    });
  });
});
