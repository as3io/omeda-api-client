const nock = require('nock');
const utils = require('../src/utils');

module.exports = nock(utils.buildRequestSchemeAndHost(false));
