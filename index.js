'use strict';

// Start up DB Server
const { db } = require('./src/auth/models/index.js');
db.sync()
  .then(() => {
    console.log('connected to DB!');
    // Start the web server
    require('./src/server.js').startup(process.env.PORT);
  });