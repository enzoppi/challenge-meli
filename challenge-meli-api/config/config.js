const meliUrl = 'https://api.mercadolibre.com/';

const meliEndpoints = {
  search: meliUrl + 'sites/MLA/search',
  items: meliUrl + 'items',
  currencies: meliUrl + 'currencies',
};

const authorData = {
  name: 'Enzo',
  lastName: 'Zoppi',
};

module.exports = function () {
  switch (process.env.NODE_ENV) {
    case 'development':
      return { meliEndpoints, authorData };
    case 'production':
      return { meliEndpoints, authorData };
    default:
      return { meliEndpoints, authorData };
  }
};
