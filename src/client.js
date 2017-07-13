const rp = require('request-promise');
const resources = require('./resources');
const utils = require('./utils');

/**
 * The default options to set to the client when none are passed to the factory.
 * Ulimately, requests will fail options are given to the factory.
 */
const defaultOptions = {
  clientKey: undefined,
  brandKey: undefined,
  appId: undefined,
  inputId: undefined,
  useStaging: false,
};

/**
 * Builds an API endpoint.
 *
 * @param {string} type The endpoint type, either `client` or `brand`.
 * @param {string} key The endpoint key, such as the client or brand key.
 * @param {string} endpoint The endpoint to call.
 * @return {string}
 */
function buildEndpoint(type, key, endpoint) {
  return `/${type}/${key}${utils.cleanEndpoint(endpoint)}`;
}

/**
 * The API client object prototype.
 */
const proto = {
  /**
   * The API client options.
   */
  options: defaultOptions,

  /**
   * The API resources, such as `brand` or `customer`.
   */
  resources: {},

  /**
   * Builds a standard brand endpoint, e.g. /brand/{brandKey}/{endpoint}
   *
   * @param {string} endpoint
   * @return {string}
   */
  buildBrandEndpoint(endpoint) {
    return buildEndpoint('brand', this.options.brandKey, endpoint);
  },

  /**
   * Builds a client endpoint, e.g. /brand/{clientKey}/{endpoint}
   *
   * @param {string} endpoint
   * @return {string}
   */
  buildClientEndpoint(endpoint) {
    return buildEndpoint('client', this.options.clientKey, endpoint);
  },

  /**
   * Determines if the current Omeda API client options are valid.
   *
   * @return {boolean}
   */
  hasValidOptions() {
    let valid = true;
    const required = ['clientKey', 'brandKey', 'appId', 'inputId'];
    required.forEach((key) => {
      if (!this.options[key]) {
        valid = false;
      }
    });
    return valid;
  },

  /**
   * Performs an Omeda API request.
   *
   * @param {string} type The root API type, either `brand` or `client`.
   * @param {string} method The request method, e.g. `GET` or `POST`.
   * @param {string} endpoint The API resource endpoint, e.g. `/customer/...`.
   * @param {*} body The request payload body.
   * @param {string} [application/json] contentType
   * @return {Promise}
   */
  request(type, method, endpoint, body, contentType = 'application/json') {
    if (!this.hasValidOptions()) {
      return Promise.reject(new Error('The Omeda API optons are not valid. Unable to perform request.'));
    }
    const path = (type === 'brand') ? this.buildBrandEndpoint(endpoint) : this.buildClientEndpoint(endpoint);
    const options = {
      method: method.toUpperCase(),
      uri: utils.buildRequestUri(this.options.useStaging, path),
      headers: utils.buildRequestHeaders(
        method,
        contentType,
        this.options.appId,
        this.options.inputId,
      ),
    };
    if (body) {
      options.body = utils.buildRequestBody(body, contentType);
    }
    return rp(options);
  },

  /**
   * Specifies whether to use the Omeda staging API.
   *
   * @param {boolean} [true] bit
   * @return {object}
   */
  useStaging(bit = true) {
    this.options.useStaging = Boolean(bit);
    return this;
  },
};

/**
 * Exports the API client factory.
 *
 * @param {object} opts The client configuration options.
 * @return {object} The API client object instance.
 */
module.exports = (opts) => {
  const hash = (opts && typeof opts === 'object') ? opts : {};
  const options = Object.assign({}, defaultOptions, hash);
  const client = Object.create(proto);

  return Object.freeze(Object.assign(client, { options, resources: resources(client) }));
};
