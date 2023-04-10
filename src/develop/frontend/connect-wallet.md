---
sidebar_position: 2
---

# Connect Wallet

This is the most basic routine when you start working with any blockchain.

And of course we have a way to do it in Everscale. In this chapter, we cover different parts of the interface exposed by EVER Wallet to your web application. You can see the full React integration sample [here](https://github.com/mnill/everscale-crash-course-token-dice-frontend/blob/main/src/providers/EverWalletProvider/hooks/useEverWallet.js).

First, we need to install [EVER Wallet](https://everwallet.net/) browser extension. It expose an interface to all web pages we visit. Let’s take a look how to interact with it.

### Check if the extension is available

We always start our interaction with the wallet by checking if the user has a wallet installed:

```
import {hasEverscaleProvider} from 'everscale-inpage-provider';
const isEverWaleltInstalled = await hasEverscaleProvider();
```

If the user doesn't have a wallet installed, ask him to install.

### Initialize Provider

Next, we initialize the provider and retrieve its current state:

```
import { ProviderRpcClient } from 'everscale-inpage-provider';
const ever = new ProviderRpcClient();
// We may want to await for the extension to be fully initialized
// await ever.ensureInitialized();
// Get current provider state
const currentProviderState = await ever.getProviderState();
```

The response should look like following (the values of parameters may change depending on version and selected network):

```
{
"version": "0.3.12",
"numericVersion": 3012,
"networkId": 31337,
"selectedConnection": "localnet",
"supportedPermissions": [
"basic",
"accountInteraction"
],
"permissions": {},
"subscriptions": {}
}
```

### Login and logout

To login, we ask a user for permissions to interact with one of the accounts available in his wallet. Two permissions are supported. These are:

- `basic` - allows the site to retrieve data from the blockchain and use the API to decrypt transactions.
- `accountInteraction` - allows the page to prompt the user for transactions and perform other interactions such as signing a message.

Asking the user for permission (connect the wallet):

```
// Subscribe to new permissions
(await ever.subscribe('permissionsChanged')).on('data', permissions = > {
// You can monitor changes in permissions there
console.log('permissions from subscription', permissions);
});
// The provider has several events to subscribe to
// connected, disconnected, networkChanged, permissionsChanged, loggedOut

// Or you can get new permissions there
const permissions = await ever.requestPermissions({
permissions: ['basic', 'accountInteraction']
});
```

The response should look like following (may vary depending on the wallet address, public key, and wallet contract type)

```
{
"accountInteraction": {
"address": "0:3036eb00ab5e3e6824d564b53c4e37f999e8d3db2cb1d878db1d20ae3a5408b6",
"publicKey": "8eea533b840a598af3975d139926ba7f3888d3226f8597732227fe0fbf3875ac",
"contractType": "SafeMultisigWallet"
},
"basic": true
}
```

You may want to provide “logout” and “change account” features in your app, using following interface:

```
// To disconnect, you can use
await ever.disconnect();
// or changeAccount
await ever.changeAccount();
```

### NetworkId check

After we got the permissions, we can interact with the wallet and retrieve data from the blockchain. You may want to render different thing for differend networks (mainnet / testnet).

Let’s assume our target contract is deployed in the testnet. We want to check the networkId to ensure, that we are connected correctly.

```
// Subscribe to network changed event
const networkSubscriber = await ever.subscribe('networkChanged');
networkSubscriber.on('data', (event) => {
// track changes in the network id
if (event.networkId === 2) {
// We are on the testnet now
} else {
// Still not on the testnet
}
});
// You can use await networkSubscriber.unsubscribe(); to cancel the subscription
const currentProviderState = await ever.getProviderState();
if (currentProviderState.networkId !== 2) {
// Ask user to change the network
} else {
// Everything is okay
}
```