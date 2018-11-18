const config = require('./config');
const express = require('./express');

module.exports.start = ()=> {
  const app = express.init();
  app.listen(config.port, ()=> {
    console.log('App listening on port', config.port);
  });
};