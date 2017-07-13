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
  describe('#lookup()', function(){
    it('should return a successful response', function() {
      const customerId = '1234';
      api.get(`${BASE_ENDPOINT}/brand/foo/customer/${customerId}/comp${SUFFIX}`).reply(200);
      const promise = resource.lookup(customerId);
      return expect(promise).to.be.fulfilled;
    });
  });
  describe('#lookupByEncryptedId()', function(){
    it('should return a successful response', function() {
      const customerId = '5678';
      api.get(`${BASE_ENDPOINT}/brand/foo/customer/${customerId}${SUFFIX}`).reply(200);
      const promise = resource.lookupByEncryptedId(customerId);
      return expect(promise).to.be.fulfilled;
    });
  });
  describe('#lookupByExternalId()', function(){
    it('should return a successful response', function() {
      const namespace = 'foo';
      const externalId = '1234';
      api.get(`${BASE_ENDPOINT}/brand/foo/customer/${namespace}/externalcustomeridnamespace/${externalId}/externalcustomerid${SUFFIX}`).reply(200);
      const promise = resource.lookupByExternalId(namespace, externalId);
      return expect(promise).to.be.fulfilled;
    });
  });
  describe('#lookupById()', function(){
    it('should return a successful response', function() {
      const customerId = '1234';
      api.get(`${BASE_ENDPOINT}/brand/foo/customer/${customerId}${SUFFIX}`).reply(200);
      const promise = resource.lookupById(customerId);
      return expect(promise).to.be.fulfilled;
    });
  });
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
  describe('#save()', function(){
    it('should return a successful response', function() {
      api.post(`${BASE_ENDPOINT}/brand/foo/storecustomerandorder${SUFFIX}`).reply(200);
      const promise = resource.save({ foo: 'bar' });
      return expect(promise).to.be.fulfilled;
    });
  });
});
