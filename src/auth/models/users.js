'use strict';

const bcrypt = require('bcrypt');
const SECRET = process.env.API_SECRET || 'ThisIsMySecret';
const jwt = require('jsonwebtoken');

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false, },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET, {expiresIn: 86400000});
      },
      set(){
        return jwt.sign({ username: this.username }, SECRET,  {expiresIn: 86400000});
      },
    }
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    // console.log(hashedPass);
    user.password = hashedPass;
    // console.log(`user hashed password: ${user.password}`);
  }); 

  // Basic AUTH: Validating strings (username, password) 
  model.authenticateBasic = async function (username, password) {
    console.log(`authenticate basic function`);
    const user = await this.findOne({ where: {username} })
    console.log('user ', user);
    const valid = await bcrypt.compare(password, user.password)
    if (valid) { return user; }
    throw new Error('Invalid User');
  }

  // Bearer AUTH: Validating a token
  model.authenticateToken = async (token) => {
    try {
      console.log('authenticate token function');
      const parsedToken = jwt.verify(token, SECRET);
      const user = await this.findOne({where: { username: parsedToken.username }})
      if (user) { 
        return user;
      }
    } catch (e) {
      console.error(e.message);
      return e;
    }
  }

  return model;
}

module.exports = userSchema;