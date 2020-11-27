const express = require('express');

const { config } = require('../scraper');

const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ data: Object.keys(config.tagRegexMap) });
});

module.exports = router;
