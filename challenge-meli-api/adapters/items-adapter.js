const findCurrencyDecimals = (item, currencies) => currencies.find(currency => currency.id === item.currency_id).decimal_places;

module.exports = function (config) {
  return {
    parseSearchItems: (searchResults, currencies) => {
      const categoryFilters = searchResults.available_filters.find(filter => filter.id === 'category');
      const sortedCategories = categoryFilters.values.sort((a, b) => b.results - a.results).map(category => category.name);
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
        categories: sortedCategories,
        items,
      }
    },
    parseItemById: (item, itemDescription, currencies) => {
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
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          sold_quantity: item.sold_quantity,
          description: itemDescription.plain_text,
        }
      }
    }
  }
}
