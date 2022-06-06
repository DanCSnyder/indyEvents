const bodyParser = require('body-parser');

module.exports = (app, express) => {
  app.use(express.static('client/public'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};