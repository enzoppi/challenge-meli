const meliUrl = 'https://api.mercadolibre.com/';

const meliEndpoints = {
  search: meliUrl + 'sites/MLA/search',
  items: meliUrl + 'items',
  currencies: meliUrl + 'currencies',
  categories: meliUrl + 'categories',
};

const authorData = {
  name: 'Enzo',
  lastName: 'Zoppi',
};

module.exports = { meliEndpoints, authorData };
