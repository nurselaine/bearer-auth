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
    res.status(200).json(output);
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
    res.status(200).json(user);
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
  res.status(200).send("Welcome to the secret area!");
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret
}