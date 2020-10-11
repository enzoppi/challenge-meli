const { fetchAndDecode } = require('../utils/http-utils');
const itemsUtilsBuilder = require('../adapters/items-adapter');
const currenciesServiceBuilder = require('./currencies-service');
const categoriesServiceBuilder = require('./categories-service');

module.exports = function itemsService(config) {
  const itemsUtils = itemsUtilsBuilder(config);
  const currenciesService = currenciesServiceBuilder(config);
  const categoriesService = categoriesServiceBuilder(config);

  return {
    searchItems: async (queryString, queryLimit) => {
      const searchItemsPromise = fetchAndDecode(`${config.meliEndpoints.search}?q=${queryString}&limit=${queryLimit || 4}`, 'json');
      const currenciesPromise = currenciesService.getCurrencies();
      // We use Promise.all() to achieve parallel calls to the api instead of awaiting each request before the next
      const [searchItems, currencies] = await Promise.all([searchItemsPromise, currenciesPromise]);
      return itemsUtils.parseSearchItems(searchItems, currencies);
    },
    getItemById: async (id) => {
      const itemPromise = fetchAndDecode(`${config.meliEndpoints.items}/${id}`, 'json');
      const itemDescriptionPromise = fetchAndDecode(`${config.meliEndpoints.items}/${id}/description`, 'json');
      const currenciesPromise = currenciesService.getCurrencies();
      // We use Promise.all() to achieve parallel calls to the api instead of awaiting each request before the next
      const [item, itemDescription, currencies] = await Promise.all([itemPromise, itemDescriptionPromise, currenciesPromise]);
      const categoryData = await categoriesService.getCategoryById(item.category_id);
      return itemsUtils.parseItemById(item, itemDescription, currencies, categoryData);
    },
  }
};
