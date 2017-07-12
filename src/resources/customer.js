const { SUFFIX } = require('../constants');

module.exports = {
  /**
   * @param {string} emailAddress
   * @param {?string} productId
   * @return {Promise}
   */
  lookupByEmail(emailAddress, productId) {
    let path = `/customer/email/${emailAddress}`;
    if (productId) {
      path = `${path}/productid/${productId}${SUFFIX}`;
    } else {
      path = `${path}${SUFFIX}`;
    }
    const endpoint = this.client.buildBrandEndpoint(path);
    return this.client.request('GET', endpoint);
  },
};
