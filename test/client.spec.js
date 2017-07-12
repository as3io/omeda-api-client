const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const clientFactory = require('../src/client');
const api = require('./mock-api-scope');
const { BASE_ENDPOINT } = require('../src/constants');

chai.use(chaiAsPromised);
const expect = chai.expect;

const fauxOptions = {
  clientKey: 'client_foo',
  brandKey: 'foo',
  appId: '1234',
  inputId: '1234',
};

describe('client', function() {
  describe('factory', function(){
    it('should return a frozen object', function(done) {
      const client = clientFactory(fauxOptions);
      expect(client).to.be.frozen;
      done();
    });
  });
  describe('#options', function() {
    const client = clientFactory(fauxOptions);
    it('should reflect the passed options', function(done) {
      const keys = ['clientKey','brandKey','appId','inputId'];
      keys.forEach(key => expect(client.options[key]).to.eql(fauxOptions[key]));
      done();
    });
    it('should not be a frozen object', function(done) {
      expect(client.options).to.not.be.frozen;
      client.options.clientKey = 'client_bar';
      expect(client.options.clientKey).to.eql('client_bar');
      done();
    });
  });
  describe('#resources', function() {
    it('should contain the expected API resources', function(done) {
      const client = clientFactory(fauxOptions);
      expect(client.resources).to.be.an('object');
      const cases = ['customer'];
      cases.forEach(key => expect(client.resources).to.have.property(key));
      done();
    });
  });
  describe('#buildBrandEndpoint()', function() {
    const client = clientFactory(fauxOptions);
    it('should return the correct endpoint value', function(done) {
      const expected = '/brand/foo/some/path';
      expect(client.buildBrandEndpoint('some/path')).to.eql(expected);
      expect(client.buildBrandEndpoint('/some/path')).to.eql(expected);
      done();
    });
    it('should return the correct endpoint when options are changed', function(done) {
      client.options.brandKey = 'bar';
      const expected = '/brand/bar/some/path';
      expect(client.buildBrandEndpoint('some/path')).to.eql(expected);
      done();
    });
  });
  describe('#buildClientEndpoint()', function() {
    const client = clientFactory(fauxOptions);
    it('should return the correct endpoint value', function(done) {
      const expected = '/client/client_foo/some/path';
      expect(client.buildClientEndpoint('some/path')).to.eql(expected);
      expect(client.buildClientEndpoint('/some/path')).to.eql(expected);
      done();
    });
    it('should return the correct endpoint when options are changed', function(done) {
      client.options.clientKey = 'client_bar';
      const expected = '/client/client_bar/some/path';
      expect(client.buildClientEndpoint('some/path')).to.eql(expected);
      done();
    });
  });
  describe('#request()', function() {
    it('should return a successful response', function() {
      api.get(`${BASE_ENDPOINT}/foo/bar`).reply(200);
      const client = clientFactory(fauxOptions);
      const promise = client.request('GET', '/foo/bar');
      return expect(promise).to.be.fulfilled;
    });
    it('should return a successful response with a body', function() {
      api.post(`${BASE_ENDPOINT}/foo/bar`).reply(200);
      const client = clientFactory(fauxOptions);
      const promise = client.request('POST', '/foo/bar', {foo: 'bar'});
      return expect(promise).to.be.fulfilled;
    });
    it('should error when the config is invalid', function() {
      const client = clientFactory();
      const promise = client.request('GET', '/foo');
      return expect(promise).to.be.rejectedWith(Error);
    });
  });
  describe('#useStaging()', function() {
    it('should support switching between production and staging APIs.', function(done) {
      const client = clientFactory(fauxOptions);
      expect(client.options.useStaging).to.be.false;

      client.useStaging();
      expect(client.options.useStaging).to.be.true;

      client.useStaging(false);
      expect(client.options.useStaging).to.be.false;

      client.useStaging(1);
      expect(client.options.useStaging).to.be.true;

      client.useStaging(0);
      expect(client.options.useStaging).to.be.false;
      done();
    });
  });
});
