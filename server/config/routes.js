const express = require("express");
const router = new express.Router();

const scraper = require("../controllers/scraper");

router.get("/", scraper.getAll);

module.exports = router;
