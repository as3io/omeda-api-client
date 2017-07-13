module.exports = {
  /**
   * Performs a [Brand Comprehensive Lookup]{@link https://jira.omeda.com/wiki/en/Brand_Comprehensive_Lookup_Service}.
   *
   * @return {Promise}
   */
  lookup() {
    return this.client.request('brand', 'GET', '/comp/*');
  },
};
