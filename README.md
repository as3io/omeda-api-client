# Omeda API Client for NodeJS
## Installing
`npm install omeda-node --save`
## Usage
### Create an API client instance
```js
const omedaApi = require('omeda-node')({
  brandKey: 'yourbrand', // your Omeda brand/db name
  clientKey: 'client_yourclient', // your Omeda client id
  appId: '1d381ff5-ba0b-47ce-8730-ce91b05f7b54', // your API app-id to access the brand
  inputId: 'XXXXXXX', // the API input-id to write data to the db
  useStaging: false, // default, switch to true to access the staging db
});
```
You can also create multiple instances of the API client to connect to different brand databases...
```js
const omedaFactory = require('omeda-node');

const fooBrand = omedaFactory({ brandKey: 'foo' /* additional options */ });
const barBrand = omedaFactory({ brandKey: 'bar' /* additional options */ });
```
### Making API calls
Once you have an API client instance established, you can begin making API calls. Each API "type" is organized into corresponding resources. For instance, "customer" related APIs can be accessed via the `customer` resource. Brand APIs can be accessed via `brand`, etc.
For example, to lookup a customer via email address, you would execute the following call:
```js
const omedaApi = require('omeda-node')(/* options */);
const customer = omedaApi.resources.customer;

customer.lookupByEmail('foo@bar.com')
  .then(data => console.info(data))
  .catch(err => console.info('An error was found!', err))
;
```
As you can see, all resource function calls will return a `Promise` object (specifically a `bluebird` promise) via the [request-promise](https://github.com/request/request-promise) library.
### Complete API Reference
Coming soon...

## Developing / Contributing
- Clone this repository
- Install dependencies using [Yarn](https://yarnpkg.com/en/)
  - `cd omeda-node`
  - `yarn install`
### Running tests
- Execute `npm run test`
- To see code coverage, run `npm run test-with-coverage`
### Contributing
- Ensure that both the `npm run lint` and `npm run test` commands are successful before PRing.
- Preferably, code coverage should remain unchanged (or become better).

