const express = require("express");
const router = new express.Router();

const scraper = require("../controllers/scraper");

let browserInstance = browser.startBrowser();

router.get("/scrape", scraper(browserInstance));

module.exports = router;
