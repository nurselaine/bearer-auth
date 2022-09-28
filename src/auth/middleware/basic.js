'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {
  console.log('basic middleware');
  if (!req.headers.authorization) {
    return `Not Authorized`;
  } else {
    let basic = req.headers.authorization;
    let encodedAuth = basic.split(' ').pop();
    console.log(`encoded auth ${encodedAuth}`);
    let [username, password] = base64.decode(encodedAuth).split(':');
    try {
      // console.log(base64.decode(basic));
      // console.log(`username ${username} password ${password}`);
      req.user = await users.authenticateBasic(username, password);
      next();
    } catch (e) {
      console.error(e);
      res.status(403).send('Invalid Login');
    }
  }
}