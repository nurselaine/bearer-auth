'use strict';

process.env.SECRET = "TEST_SECRET";

const { handleGetUsers } = require('../../../../../src/auth/router/handler');
const { db } = require('../../../../../src/auth/models/index');

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});


describe('Router handler for /users', () => {

  const res = {
    send: jest.fn(() => res),
    status: jest.fn(() => res),
    json: jest.fn(() => res),
  }
  const next = jest.fn();

  test('Should fetch users and send user objects in the response', async () => {

    let req = {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvIiwiaWF0IjoxNjY0MzI0OTQwfQ.TjjO6qMkP41Qpbb9TKfkjEU8A4uKNr7TZJtba7uWhLk'
      }
    };

    await handleGetUsers(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.anything());
  });

});