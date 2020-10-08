module.exports = function itemsService(config) {
  const itemsUtils = require('../utils/items-utils')(config);
  const currenciesService = require('./currencies-service')(config);

  return {
    searchItems: async (queryString) => {
      const searchResults = await fetch(`${config.meliEndpoints.search}?q=${queryString}`);
      const currencies = currenciesService.getCurrency();
      const newRes = itemsUtils.parseItems(searchResults, currencies);
      return newRes;
    },
    getItemById: (cb) => {
      request.get(config.meliEndpoints.items, (err, response, body) => {
        return cb(err, body);
      });
    },
  }
};
