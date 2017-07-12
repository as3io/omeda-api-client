const brand = require('./brand');
const customer = require('./customer');

/**
 * Factory for creating individual resource objects.
 *
 * @param {object} client The Omeda API client instance.
 * @param {object} resource The API resource instance.
 * @return {object}
 */
function factory(client, resource) {
  const proto = Object.assign({}, resource, { client });
  return Object.freeze(Object.create(proto));
}

/**
 * Exports the API resources factory.
 *
 * @param {object} client The Omeda API client instance.
 * @return {object}
 */
module.exports = (client) => {
  const resources = {
    brand: factory(client, brand),
    customer: factory(client, customer),
  };
  return Object.freeze(Object.assign({}, resources));
};
