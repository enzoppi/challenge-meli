const { fetchAndDecode } = require('../utils/http-utils');

module.exports = function itemsService(config) {
  const itemsUtils = require('../utils/items-utils')(config);
  const currenciesService = require('./currencies-service')(config);

  return {
    searchItems: async (queryString) => {
      const searchItems = fetchAndDecode(`${config.meliEndpoints.search}?q=${queryString}`, 'json');
      const currencies = currenciesService.getCurrency();
      // We use Promise.all() to achieve parallel calls to the api instead of awaiting each request before the next
      const [searchResults, currenciesResults] = await Promise.all([searchItems, currencies]);
      const newRes = itemsUtils.parseItems(searchResults, currenciesResults);
      return newRes;
    },
    getItemById: (cb) => {
      request.get(config.meliEndpoints.items, (err, response, body) => {
        return cb(err, body);
      });
    },
  }
};
