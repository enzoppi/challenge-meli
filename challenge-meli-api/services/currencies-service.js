module.exports = function currenciesService(config) {
  return {
    getCurrency: async () => {
      // We fetch all currencies since there
      // aren't many results and it's cheaper
      // to have the data in memory
      return await fetch(config.meliEndpoints.currencies);
    }
  }
};
