const { findElementWithHighest } = require("../utils/array-utils");

const findCurrencyDecimals = (item, currencies) => currencies.find(currency => currency.id === item.currency_id).decimal_places;
const getCategoryBreadcrumb = (searchResults) => {
  const categoryAvailableFilters = searchResults.available_filters.find(filter => filter.id === 'category');
  const categoryFilters = searchResults.filters.find(filter => filter.id === 'category');
  let categoryData = [];
  if (categoryAvailableFilters?.values) {
    const categoryWithMostResults = findElementWithHighest(categoryAvailableFilters.values || [], 'results');
    categoryData.push(categoryWithMostResults);
  }
  if (categoryFilters?.values) {
    categoryData.push(...categoryFilters.values[0].path_from_root);
  }
  return categoryData.map(category => category.name);
}

module.exports = function (config) {
  return {
    parseSearchItems: (searchResults, currencies) => {
      const items = searchResults.results.map(item => ({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: findCurrencyDecimals(item, currencies),
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      }));

      return {
        author: {
          name: config.authorData.name,
          lastName: config.authorData.lastName,
        },
        categories: getCategoryBreadcrumb(searchResults),
        items,
      }
    },
    parseItemById: (item, itemDescription, currencies, categoryData) => {
      const categoryBreadcrumb = categoryData.path_from_root.map(category => category.name);
      return {
        author: {
          name: config.authorData.name,
          lastName: config.authorData.lastName,
        },
        item: {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: item.price,
            decimals: findCurrencyDecimals(item, currencies),
          },
          categories: categoryBreadcrumb,
          picture: item.pictures[0].url,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          sold_quantity: item.sold_quantity,
          description: itemDescription.plain_text,
        }
      }
    }
  }
}
