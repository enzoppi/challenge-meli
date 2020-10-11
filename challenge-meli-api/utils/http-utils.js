const fetch = require('node-fetch');

module.exports = {
  fetchAndDecode: async (url, type) => {
    try {
      let response = await fetch(url);
    
      let content;
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
    } catch (err) {
      throw(`Failed to get response from ${url}. Error: ${err}`);
    }
  }
}
