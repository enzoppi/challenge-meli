module.exports = function (config) {
  return {
    parseItems: (searchResults, currencies) => {
      const findCurrency = (item) => currencies.find(currency => currency.id === item.currency_id).decimal_places;
      const categoryFilters = searchResults.available_filters.find(filter => filter.id === 'category');
      const sortedCategories = categoryFilters.values.sort((a, b) => a.results - b.results).map(category => category.name);
      const items = searchResults.results.map(item => ({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: findCurrency(item),
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
    }
  }
}