const expect = require('chai').expect;
const utils = require('../src/utils');

describe('utils', function() {
  describe('#cleanEndpoint()', function() {
    it('should return the properly formatted endpoint', function(done) {
      const cases = ['foo/bar', '/foo/bar'];
      cases.forEach(endpoint => expect(utils.cleanEndpoint(endpoint)).to.eql('/foo/bar'));
      done();
    });
  });
  describe('#buildRequestUri()', function() {
    it('should return the properly formatted uri', function(done) {
      const cases = ['foo/bar', '/foo/bar'];
      cases.forEach((endpoint) => {
        expect(utils.buildRequestUri(false, endpoint)).to.eql('https://ows.omeda.com/webservices/rest/foo/bar');
        expect(utils.buildRequestUri(true, endpoint)).to.eql('https://ows.omedastaging.com/webservices/rest/foo/bar');
      });
      done();
    });
  });
  describe('#buildRequestHeaders()', function() {
    it('should return the properly formatted headers', function(done) {
      const appId = '1234';
      const inputId = '5678';
      const contentType = 'application/json';

      ['GET', 'get'].forEach((method) => {
        const headers = utils.buildRequestHeaders(method, contentType, appId, inputId);
        expect(headers).to.be.an('object');
        expect(headers['x-omeda-appid']).to.eql(appId);
      });

      ['post', 'POST', 'put', 'PUT', 'delete', 'DELETE'].forEach((method) => {
        const headers = utils.buildRequestHeaders(method, contentType, appId, inputId);
        expect(headers).to.be.an('object');
        expect(headers['x-omeda-appid']).to.eql(appId);
        expect(headers['x-omeda-inputid']).to.eql(inputId);
        expect(headers['content-type']).to.eql(contentType);
      });
      done();
    });
  });
  describe('#buildRequestBody()', function() {
    it('should return the properly formatted body', function(done) {
      const json = [`{"foo":"bar"}`, { foo: 'bar'}];
      json.forEach((body) => {
        expect(utils.buildRequestBody(body, 'application/json')).to.eql(`{"foo":"bar"}`);
      });
      const other = [1, '1'];
      other.forEach((body) => {
        expect(utils.buildRequestBody(body, 'application/something-else')).to.eql('1');
      });
      done();
    });
  });
});
