const bodyParser = require("body-parser");
const path = require("path");

module.exports = (app, express) => {
  app.use(express.static(path.join(__dirname, "./../../client/public")));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};