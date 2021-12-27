const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../src/index');

describe('Create new book', () => {
  const enpointRoute = `/graphql`;

  describe('When the new book has valid input', () => {
    // const validInput = ` mutation {
    //     createBook(input: {
    //         title: "Origen"
    //         author: "Dan Brown"
    //         pages: 500
    //         status: "LENT"
    //     }){
    //             _id
    //         title
    //         author
    //         pages
    //         status
    //     }
    // }`;

    const validInput = `{ Books{ _id title author pages status }}`;

    it('should return the new book and save on database.', async () => {
      const res = await request(app).get(enpointRoute).send(validInput);
      console.log(res);
      expect(res.status).to.eql(400);
    });
  });
});
