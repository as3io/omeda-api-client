const { HOST_PROD, HOST_STAGING, BASE_ENDPOINT, SCHEME } = require('./constants');

/**
 * Cleans an endpoint for proper use with higher-level endpoint and URI building.
 *
 * @param {string} endpoint
 * @return {string}
 */
function cleanEndpoint(endpoint) {
  return (endpoint.substring(0, 1) !== '/') ? `/${endpoint}` : endpoint;
}

/**
 * Builds the API scheme and host.
 *
 * @param {boolean} useStaging Whether to use the staging API.
 * @param {string} endpoint The API resource endpoint.
 * @return {string}
 */
function buildRequestSchemeAndHost(useStaging) {
  const host = (useStaging) ? HOST_STAGING : HOST_PROD;
  return `${SCHEME}${host}`;
}

/**
 * Builds an API request body.
 *
 * @param {*} body The request body payload.
 * @param {string} contentType The intended payload content type.
 * @return string
 */
function buildRequestBody(body, contentType) {
  if (contentType === 'application/json') {
    return (typeof body === 'string') ? body : JSON.stringify(body);
  }
  return String(body);
}

/**
 * Builds the API request headers
 *
 * @param {string} method The request method.
 * @param {string} contentType The request content type.
 * @param {string} appId The API app id.
 * @param {string} inputId The API input id.
 * @return {object}
 */
function buildRequestHeaders(method, contentType, appId, inputId) {
  const headers = { 'x-omeda-appid': appId };

  if (['POST', 'PUT', 'DELETE'].includes(method.toUpperCase())) {
    headers['x-omeda-inputid'] = inputId;
    headers['content-type'] = contentType;
  }
  return headers;
}

/**
 * Builds an API request URI.
 *
 * @param {boolean} useStaging Whether to use the staging API.
 * @param {string} endpoint The API resource endpoint.
 * @return {string}
 */
function buildRequestUri(useStaging, endpoint) {
  return `${buildRequestSchemeAndHost(useStaging)}${BASE_ENDPOINT}${cleanEndpoint(endpoint)}`;
}

exports.cleanEndpoint = cleanEndpoint;
exports.buildRequestUri = buildRequestUri;
exports.buildRequestSchemeAndHost = buildRequestSchemeAndHost;
exports.buildRequestHeaders = buildRequestHeaders;
exports.buildRequestBody = buildRequestBody;
