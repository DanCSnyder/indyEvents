const express = require('express');
const router = new express.Router();
const scraper = require ('./../controllers/scraper')

router.get('/scrape', scraper.scrapeAll);

module.exports = router;