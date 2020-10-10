module.exports = {
  findElementWithHighest: (array, property) => {
    let result = 0;
    array.forEach(element => {
      if (element[property] > result) {
        result = element;
      }
    });
    return result;
  }
}
