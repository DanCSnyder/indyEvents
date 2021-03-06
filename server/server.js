const express = require('express');

const middleware = require('./config/middleware');
const router = require('./config/routes');
const browser = require('./config/browser');
const scraper = require('./controllers/scraper')

const app = express();
const port = 3000;

middleware(app, express);
app.use(router);

app.listen(port, () => {
  console.log('listening on ', port);
});

module.exports = app;