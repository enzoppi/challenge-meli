const { fetchAndDecode } = require('../utils/http-utils');

module.exports = function currenciesService(config) {
  return {
    getCategoryById: async (categoryId) => {
      const categoryData = fetchAndDecode(`${config.meliEndpoints.categories}/${categoryId}`, 'json');
      return await categoryData;
    }
  }
};
