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
Once you have a client instance, you can begin making API calls. Each API "category" is organized into corresponding resources. For instance, "customer" related APIs can be accessed via the `customer` resource; brand APIs can be accessed via the `brand` resource, etc.
For example, to lookup a customer by email address, you would execute the following call:
```js
const omedaApi = require('omeda-node')(/* options */);
const customer = omedaApi.resources.customer;

customer.lookupByEmail('foo@bar.com')
  .then(data => console.info(data))
  .catch(err => console.info('An error was found!', err))
;
```
All API resource functions will return a `Promise` (specifically a `bluebird` promise) via the [request-promise](https://github.com/request/request-promise) library.

You can also make any number of "generic" API calls that may not be covered by this library, or if you're just feeling fancy :) This is the equivelant to calling `customer.lookupByEmail('foo@bar.com')` from above:
```js
const omedaApi = require('omeda-node')(/* options */);

omedaApi.request('brand', 'GET', '/customer/email/foo@bar.com/*').then(/* ... */);
```

### Complete API Reference
---
### The Customer Resource
Access the resource:
```js
const omedaApi = require('omeda-node')(/* options */);
const customer = omedaApi.resources.customer;
```

**customer.lookup(customerId, [returnMerged=true])**

Performs a [Comprehensive Customer Lookup](https://jira.omeda.com/wiki/en/Customer_Comprehensive_Lookup_Service).
Will return the full details of the customer.
By default, if the customer that was found was merged into another, it will return the merged version.
```js
customer.lookup(1013321055).then().catch()
```

**customer.lookupByEmail(email, [productId])**

Performs a [Customer Lookup By Email](https://jira.omeda.com/wiki/en/Customer_Lookup_Service_By_Email). Can optionally limit the result to a specified product ID.
```js
customer.lookupByEmail('foo@bar.com').then().catch()
```

**lookupByEncryptedId(encryptedId, [returnMerged = true])**

Performs a [Customer Lookup by EncryptedCustomerId](https://jira.omeda.com/wiki/en/Customer_Lookup_Service_By_EncryptedCustomerId).
By default, if the customer that was found was merged into another, it will return the merged version.
```js
customer.lookupByEncryptedId('1773F6238056C8U').then().catch()
```

**lookupByExternalId(namespace, externalId)**

Performs a [Customer Lookup Service By External ID](https://jira.omeda.com/wiki/en/Customer_Lookup_Service_By_External_ID).
```js
customer.lookupByExternalId('some-namespace', 'some-external-id').then().catch()
```

**lookupById(customerId, [returnMerged = true])**

Performs a [Customer Lookup by CustomerId]{@link https://jira.omeda.com/wiki/en/Customer_Lookup_Service_By_CustomerId}.
By default, if the customer that was found was merged into another, it will return the merged version.
```js
customer.lookupById(1013321055).then().catch()
```

**save(payload)**

aves (creates/updates) a customer and/or order payload via the [Save Customer and Order API](https://jira.omeda.com/wiki/en/Save_Customer_and_Order_API).
```js
customer.save({ payload }).then().catch()
```

### The Brand Resource
Access the resource:
```js
const omedaApi = require('omeda-node')(/* options */);
const brand = omedaApi.resources.brand;
```

**brand.lookup()**

Performs a [Brand Comprehensive Lookup](https://jira.omeda.com/wiki/en/Brand_Comprehensive_Lookup_Service).
```js
brand.lookup().then().catch()
```

## Developing / Contributing
- Clone this repository
- Install dependencies using [Yarn](https://yarnpkg.com/en/)
  - `cd omeda-node`
  - `yarn install`
### Running tests
- Execute `npm run test`
- To see code coverage, run `npm run coverage`
### Contributing
- Ensure that both the `npm run lint` and `npm run test` commands are successful before PRing.
- Preferably, code coverage should remain unchanged (or become better).

