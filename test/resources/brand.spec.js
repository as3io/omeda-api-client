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
}).resources.brand;

describe('resources/brand', function() {
  describe('#lookup()', function(){
    it('should return a successful response', function() {
      api.get(`${BASE_ENDPOINT}/brand/foo/comp${SUFFIX}`).reply(200);
      return expect(resource.lookup()).to.be.fulfilled;
    });
  });
});
