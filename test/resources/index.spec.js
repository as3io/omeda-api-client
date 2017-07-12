const expect = require('chai').expect;
const resourcesFactory = require('../../src/resources');

const resourcesKeys = ['customer', 'brand'];

describe('resources/index', function() {
  describe('factory', function(){
    const resources = resourcesFactory({});
    it('should return a frozen object', function(done) {
      expect(resources).to.be.frozen;
      done();
    });
    it('should return an object with each resource (frozen)', function(done) {
      resourcesKeys.forEach((key) => {
        expect(resources).to.have.property(key);
        expect(resources[key]).to.be.frozen;
      });
      done();
    });
  });
});
