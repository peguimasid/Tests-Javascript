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
const queryString = (obj) => {
  return Object.entries(obj).map(keyValueToString).join('&');
};

module.exports = queryString;
