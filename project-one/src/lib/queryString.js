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
export const queryString = (obj) => {
  return Object.entries(obj).map(keyValueToString).join('&');
};

/**
 * @param {string} str
 * @return {object}
 */
export const parse = (str) => {
  return str
    .split('&')
    .map((str) => str.split('='))
    .reduce((acc, [key, value]) => {
      const valueDecoded = decodeURIComponent(value);
      if (valueDecoded.includes(',')) acc[key] = valueDecoded.split(',');
      else acc[key] = valueDecoded;
      return acc;
    }, {});
};
