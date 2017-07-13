const { SUFFIX } = require('../constants');

/**
 * @todo Implement this!
 */
function handleMergedCustomer(enabled, endpoint, client) {
  return client.request('brand', 'GET', endpoint);
}

module.exports = {
  /**
   * Performs a [Comprehensive Customer Lookup]{@link https://jira.omeda.com/wiki/en/Customer_Comprehensive_Lookup_Service}.
   * Will return the full details of the customer.
   * By default, if the customer that was found was merged into another,
   * it will return the merged version.
   *
   * @param {integer} customerId
   * @param {boolean} [true] returnMerged Whether to automatically return a merged customer.
   * @return {Promise}
   */
  lookup(customerId, returnMerged = true) {
    const endpoint = `/customer/${customerId}/comp${SUFFIX}`;
    return handleMergedCustomer(returnMerged, endpoint, this.client);
  },

  /**
   * Performs a [Customer Lookup By Email]{@link https://jira.omeda.com/wiki/en/Customer_Lookup_Service_By_Email}.
   * Can optionally limit the result to a specified product ID.
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

  /**
   * Performs a [Customer Lookup by EncryptedCustomerId]{@https://jira.omeda.com/wiki/en/Customer_Lookup_Service_By_EncryptedCustomerId}.
   * By default, if the customer that was found was merged into another,
   * it will return the merged version.
   *
   * @param {integer} customerId
   * @param {boolean} [true] returnMerged Whether to automatically return a merged customer.
   * @return {Promise}
   */
  lookupByEncryptedId(encryptedId, returnMerged = true) {
    return this.lookupById(encryptedId, returnMerged);
  },

  /**
   * Performs a [Customer Lookup Service By External ID]{@link https://jira.omeda.com/wiki/en/Customer_Lookup_Service_By_External_ID}.
   *
   * @param {string} namespace
   * @param {string} externalId
   * @return {Promise}
   */
  lookupByExternalId(namespace, externalId) {
    const endpoint = `/customer/${namespace}/externalcustomeridnamespace/${externalId}/externalcustomerid${SUFFIX}`;
    return this.client.request('brand', 'GET', endpoint);
  },

  /**
   * Performs a [Customer Lookup by CustomerId]{@link https://jira.omeda.com/wiki/en/Customer_Lookup_Service_By_CustomerId}.
   * By default, if the customer that was found was merged into another,
   * it will return the merged version.
   *
   * @param {integer} customerId
   * @param {boolean} [true] returnMerged Whether to automatically return a merged customer.
   * @return {Promise}
   */
  lookupById(customerId, returnMerged = true) {
    const endpoint = `/customer/${customerId}${SUFFIX}`;
    return handleMergedCustomer(returnMerged, endpoint, this.client);
  },

  /**
   * Saves (creates/updates) a customer and/or order payload via the
   * [Save Customer and Order API]{@link https://jira.omeda.com/wiki/en/Save_Customer_and_Order_API}.
   *
   * @param {object|string} payload
   * @return {Promise}
   */
  save(payload) {
    return this.client.request('brand', 'POST', '/storecustomerandorder/*', payload);
  },
};
