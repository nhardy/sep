import { fromPairs } from 'lodash-es';


/**
 * Takes a `fetch()` response and either returns resolved `Response`
 *   if 200 <= response.status < 300. Otherwise or a rejected
 *   `Promise` with text, code and response.
 * @param {Response} response Response from `fetch()`
 * @returns {Response|Promise} Raw Response or rejected `Promise`
 */
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.code = response.statusCode;
  error.response = response;

  return Promise.reject(error);
}

/**
 * Parses the `fetch` `response.headers` object. As there are
 *   there are subtle differences between `whatwg-fetch` and
 *   `node-fetch`, we need a way to do this in a way that
 *   handles both the server and browser. Microsoft Edge is also
 *   missing key interfaces on `Headers`.
 * @param {Headers|Object} headers Headers object from `fetch()`
 * @returns {Object} Object containing key value pairs
 */
export function parseHeaders(headers) {
  if (__SERVER__) {
    return Object.keys(headers.raw())
      .reduce((acc, key) => ({ ...acc, [key]: headers.get(key) }), {});
  }
  if (headers instanceof Headers && Headers.prototype.entries) {
    return fromPairs(Array.from(headers.entries()));
  }
  const pairs = [];
  headers.forEach((value, key) => pairs.push([key, value]));
  return fromPairs(pairs);
}
