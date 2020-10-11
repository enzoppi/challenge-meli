const express = require('express');
const router = express.Router();
const config = require('../config/config');
const itemsService = require('../services/items-service')(config);

router.get('/', async function(req, res, next) {
  const { q, limit } = req.query;
  const results = await itemsService.searchItems(q, limit);
  res.send(results);
});

router.get('/:id', async function(req, res, next) {
  const results = await itemsService.getItemById(req.params.id);
  res.send(results);
});

module.exports = router;
