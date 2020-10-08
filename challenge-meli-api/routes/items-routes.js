var express = require('express');
var router = express.Router();
const config = require('../config/config');
const itemsService = require('../services/items-service')(config);

router.get('/', function(req, res, next) {
  const results = itemsService.searchItems(req.query.q);
  res.send(results);
});

module.exports = router;
