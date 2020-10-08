const { fetchAndDecode } = require('../utils/http-utils');
const itemsUtilsBuilder = require('../adapters/items-adapter')
const currenciesServiceBuilder = require('./currencies-service')

module.exports = function itemsService(config) {
  const itemsUtils = itemsUtilsBuilder(config);
  const currenciesService = currenciesServiceBuilder(config);

  return {
    searchItems: async (queryString) => {
      const searchItemsPromise = fetchAndDecode(`${config.meliEndpoints.search}?q=${queryString}`, 'json');
      const currenciesPromise = currenciesService.getCurrency();
      // We use Promise.all() to achieve parallel calls to the api instead of awaiting each request before the next
      const [searchItems, currencies] = await Promise.all([searchItemsPromise, currenciesPromise]);
      const newRes = itemsUtils.parseSearchItems(searchItems, currencies);
      return newRes;
    },
    getItemById: async (id) => {
      const itemPromise = fetchAndDecode(`${config.meliEndpoints.items}/${id}`, 'json');
      const itemDescriptionPromise = fetchAndDecode(`${config.meliEndpoints.items}/${id}/description`, 'json');
      const currenciesPromise = currenciesService.getCurrency();
      // We use Promise.all() to achieve parallel calls to the api instead of awaiting each request before the next
      const [item, itemDescription, currencies] = await Promise.all([itemPromise, itemDescriptionPromise, currenciesPromise]);
      const newRes = itemsUtils.parseItemById(item, itemDescription, currencies);
      return newRes;
    },
  }
};
