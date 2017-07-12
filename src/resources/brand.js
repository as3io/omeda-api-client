module.exports = {
  /**
   * Performs a [Brand Comprehensive Lookup]{@link https://jira.omeda.com/wiki/en/Brand_Comprehensive_Lookup_Service}.
   *
   * @return {Promise}
   */
  lookup() {
    const endpoint = this.client.buildBrandEndpoint('/comp/*');
    return this.client.request('GET', endpoint);
  },
};
