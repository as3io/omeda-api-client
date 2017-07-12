const { SUFFIX } = require('../constants');

module.exports = {
  /**
   * Performs a [Customer Lookup By Email]{@link https://jira.omeda.com/wiki/en/Customer_Lookup_Service_By_Email}.
   *
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
