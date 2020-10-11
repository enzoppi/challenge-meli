const fetch = require('node-fetch');
const errorUtils = require('../utils/error-utils');

module.exports = {
  fetchAndDecode: async (url, type) => {
    let response = await fetch(url);
  
    let content;
  
    if (!response.ok) {
      if (response.status === 404) {
        throw errorUtils.createErrorObject({
          status: 404,
          message: 'Resource not found on external application',
        });
      }
      if (response.status === 400) {
        throw errorUtils.createErrorObject({
          status: 400,
          message: 'There was an error calling the external application',
        });
      }
      throw new Error('An unexpected error ocurred calling the external application');
    } else {
      if (type === 'json') {
        content = await response.json();
      } else if (type === 'blob') {
        content = await response.blob();
      } else if (type === 'text') {
        content = await response.text();
      }
  
      return content;
    }
  }
}
