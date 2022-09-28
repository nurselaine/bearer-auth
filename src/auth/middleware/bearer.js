'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {
    console.log('bearer middleware');
    if (!req.headers.authorization) { next('Invalid Login') }
    // console.log(`res headers auth ${req.headers.authorization}`);
    const token = req.headers.authorization.split(' ').pop();
    // token to put into bearer of thunderclient
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvIiwiaWF0IjoxNjY0MzI0OTQwfQ.TjjO6qMkP41Qpbb9TKfkjEU8A4uKNr7TZJtba7uWhLk
    const validUser = await users.authenticateToken(token);

    req.user = validUser;
    req.token = validUser.token;
    // console.log(`req.user ${req.user} req.token ${req.token}`);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
}