const { fetchAndDecode } = require('../utils/http-utils');

module.exports = function currenciesService(config) {
  return {
    getCurrency: async () => {
      // We fetch all currencies since there
      // aren't many results and it's cheaper
      // to have the data in memory
      const currencies = fetchAndDecode(config.meliEndpoints.currencies, 'json');
      return await currencies;
    }
  }
};
