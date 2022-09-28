'use strict';

const { users } = require('../models/index');

async function handleSignup(req, res, next) {
  try {
    let userRecord = await users.create(req.body);
    // console.log(`req.body ${JSON.stringify(req.body)}`);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    // console.log(`request.user ${req.user}`);
    const user = {
      user: req.user,
      token: req.user.token
    };
    res.status(201).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    console.log('handle get users function');

    const userRecords = await users.findAll();
    // console.log(`user records ${userRecords}`);
    const list = userRecords.map(user => user.username);
    console.log(`these are all the users: ${list}`);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  /*
Using an HTTP REST client, send a request to a “protected” route, such as /secretstuff
Your request must send an “Authorization” header, with the value of Bearer TOKEN
TOKEN is the token that you would have returned to the user after their signin step (above)
If the TOKEN is valid (i.e. if it represents an actual user)
The route should function as it normally would (sending a response)
If not
Send the user an error message stating “Invalid Login”

  */
 console.log('handle secrect function');
      res.status(200).send("Welcome to the secret area!");
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret
}