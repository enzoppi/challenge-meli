const { fetchAndDecode } = require('../utils/http-utils');
const itemsUtilsBuilder = require('../adapters/items-adapter')
const currenciesServiceBuilder = require('./currencies-service')
const categoryServiceBuilder = require('./categories-service');
const { findElementWithHighest } = require('../utils/array-utils');

module.exports = function itemsService(config) {
  const itemsUtils = itemsUtilsBuilder(config);
  const currenciesService = currenciesServiceBuilder(config);
  const categoriesService = categoryServiceBuilder(config);

  return {
    searchItems: async (queryString) => {
      const searchItemsPromise = fetchAndDecode(`${config.meliEndpoints.search}?q=${queryString}`, 'json');
      const currenciesPromise = currenciesService.getCurrencies();
      // We use Promise.all() to achieve parallel calls to the api instead of awaiting each request before the next
      const [searchItems, currencies] = await Promise.all([searchItemsPromise, currenciesPromise]);
      const categoryFilters = searchItems.available_filters.find(filter => filter.id === 'category');
      let categoryData;
      if (searchItems.results.length) {
        const categoryWithMostResults = findElementWithHighest(categoryFilters?.values || [], 'results');
        categoryData = await categoriesService.getCategoryById(categoryWithMostResults.id);
      }
      return itemsUtils.parseSearchItems(searchItems, currencies, categoryData);
    },
    getItemById: async (id) => {
      const itemPromise = fetchAndDecode(`${config.meliEndpoints.items}/${id}`, 'json');
      const itemDescriptionPromise = fetchAndDecode(`${config.meliEndpoints.items}/${id}/description`, 'json');
      const currenciesPromise = currenciesService.getCurrencies();
      // We use Promise.all() to achieve parallel calls to the api instead of awaiting each request before the next
      const [item, itemDescription, currencies] = await Promise.all([itemPromise, itemDescriptionPromise, currenciesPromise]);
      return itemsUtils.parseItemById(item, itemDescription, currencies);
    },
  }
};
