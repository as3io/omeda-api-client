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
    let endpoint = `/customer/email/${emailAddress}`;
    if (productId) {
      endpoint = `${endpoint}/productid/${productId}${SUFFIX}`;
    } else {
      endpoint = `${endpoint}${SUFFIX}`;
    }
    return this.client.request('brand', 'GET', endpoint);
  },
};
