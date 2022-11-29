const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Please check your params');
  }
  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
};

/**
 * @param {object} obj
 * @return {string}
 */
module.exports.queryString = (obj) => {
  return Object.entries(obj).map(keyValueToString).join('&');
};

/**
 * @param {string} str
 * @return {object}
 */
module.exports.parse = (str) => {
  return str
    .split('&')
    .map((str) => str.split('='))
    .reduce((acc, [key, value]) => {
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
};
