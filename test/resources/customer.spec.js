const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const clientFactory = require('../../src/client');
const api = require('../mock-api-scope');
const { BASE_ENDPOINT, SUFFIX } = require('../../src/constants');

chai.use(chaiAsPromised);
const expect = chai.expect;

const resource = clientFactory({
  clientKey: 'client_foo',
  brandKey: 'foo',
  appId: '1234',
  inputId: '1234',
}).resources.customer;

describe('resources/customer', function() {
  describe('#lookupByEmail()', function(){
    it('should return a successful response', function() {
      const email = 'foo@bar.com';
      const productId = 1234;
      api.get(`${BASE_ENDPOINT}/brand/foo/customer/email/${email}${SUFFIX}`).reply(200);
      api.get(`${BASE_ENDPOINT}/brand/foo/customer/email/${email}/productid/${productId}${SUFFIX}`).reply(200);

      return Promise.all([
        expect(resource.lookupByEmail(email)).to.be.fulfilled,
        expect(resource.lookupByEmail(email, productId)).to.be.fulfilled,
      ]);
    });
  });
});
