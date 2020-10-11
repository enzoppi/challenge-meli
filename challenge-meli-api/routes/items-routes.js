const express = require('express');
const router = express.Router();
const config = require('../config/config');
const itemsService = require('../services/items-service')(config);

router.get('/', async function(req, res, next) {
  const { q, limit } = req.query;
  try {
    const results = await itemsService.searchItems(q, limit);
    res.send(results);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const results = await itemsService.getItemById(req.params.id);
    res.send(results);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
