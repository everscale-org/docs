---
sidebar_position: 0
---

# Quick start

## Guide overview

This guide will help you get started with such essensial Everscale tools as:

* [Solidity Compiler](../../everdev/command-line-interface/solidity.md)
* [Local Blockchain](../../everdev/command-line-interface/evernode-platform-startup-edition-se)
* [Everscale Blockchain Explorer](https://ever.live)
* [GraphQL API](https://docs.everos.dev/ever-sdk/reference/ever-os-api)

You will learn how to:

* Create and compile your first Solidity contract
* Run Local blockchain for testing
* Deploy your first contract
* Run it on-chain
* Run a getter-function

## Install everdev

`everdev` — single interface to access all the developer tools.

```shell
npm install -g everdev
```

If you experience any problems with installation, check out our [troubleshooting section](../troubleshooting.md).

## Create helloWorld contract

```shell
npx everdev sol create helloWorld
```

## Compile it

```shell
npx everdev sol compile helloWorld.sol
```

## Run Local Blockchain

:::caution Attention
Docker should be running.
:::

```shell
npx everdev se start
```

## Configure default network

Set Local Blockchain [SE (Simple Emulator)](../../everdev/evernode-se.md) as the default network:

```shell
npx everdev network default se
```

## Configure Giver wallet that will sponsor deploy operation

Here we use address and private key of [SE High Load Giver](https://github.com/tonlabs/evernode-se/tree/master/contracts/giver_v2).

:::caution Attention!
This giver is available only in SE. If you work in `DevNet` or `MainNet`, you need to deploy your own giver.

[**Check how to do it in this guide**](work-with-devnet.md).
:::

```shell
npx everdev signer add giver_keys 172af540e43a524763dd53b26a066d472a97c4de37d5498170564510608250c3
npx everdev network giver se 0:b5e9240fc2d2f1ff8cbb1d1dee7fb7cae155e5f6320e585fcc685698994a19a5 --signer giver_keys
```

## Generate the keys for contract ownership

```shell
npx everdev signer generate owner_keys
npx everdev signer default owner_keys
npx everdev signer list 
Signer                Public Key       Used
--------------------  ---------------  ---------------------------
giver_keys            2ada2e...b25a16  se network giver signer
owner_keys (Default)  382620...1ecf7b
```

:::note Note
That there are shortcuts for all the commands: `sl = signer list` and `sd = signer default` :)

Don't forget to make the owner key default otherwize giver keys will be used as default.
:::

## Calculate the contract address

```shell
npx everdev contract info helloWorld
Configuration
  Network: se (http://localhost)
  Signer:  owner_keys (public 3826202b129ea8c041b8d49a655512648fc94377d1958a7a4fc9f4b3051ecf7b)
Address:   0:e74c4258496e79e62e014ca96911acbf5cb0e286fd55dd6f4e3da54e4197ddf5 (calculated from TVC and signer public)
Code Hash: c517820144a4daf5a3414c9233556b2b0ad34cdd228f200ea68a4c0327e0bd29 (from TVC file)
Account:   Doesn't exist
```

You can see that the contract does not exist yet (is not deployed) but you can already see its future address.

## Deploy

Here we deploy the contract, sponsoring it with 10 Tokens (Everscale native currency has 9 decimals). The money for deploy are taken from the giver we configured in the previous steps.

```shell
npx everdev contract deploy -v 10000000000 helloWorld
Configuration
  Network: se (http://localhost)
  Signer:  owner_keys (public 3826202b129ea8c041b8d49a655512648fc94377d1958a7a4fc9f4b3051ecf7b)
Address:   0:e74c4258496e79e62e014ca96911acbf5cb0e286fd55dd6f4e3da54e4197ddf5 (calculated from TVC and signer public)
Deploying...
Contract has deployed at address: 0:e74c4258496e79e62e014ca96911acbf5cb0e286fd55dd6f4e3da54e4197ddf5
```

## View contract information with Explorer

Go to [localhost](http://localhost) and search for your contract address in search bar. Open your account page. You will need it later to see its transactions and messages, that we will produce in the next steps.

## Explore contract information with GraphQL

Go to [localhost/graphql](http://localhost/graphql). Enter in the left pane and click Run button (replace the contract's address with the one you got in the previous steps).

```graphql
query {
  accounts(
    filter: {
      id: {
        eq: "0:e74c4258496e79e62e014ca96911acbf5cb0e286fd55dd6f4e3da54e4197ddf5"
      }
    }
  ) {
    acc_type_name
    balance
    code
    code_hash
    data
  }
}
```

You will see:

```json
{
  "data": {
    "accounts": [
      {
        "acc_type_name": "Active",
        "balance": "0x1db0832ba",
        "code": "te6ccgECEwEAAnkABCj/AIrtUyDjAyDA/+MCIMD+4wLyCxECARICoiHbPNMAAY4SgQIA1xgg+QFY+EIg+GX5EPKo3tM/AY4d+EMhuSCfMCD4I4ED6KiCCBt3QKC53pMg+GPg8jTYMNMfAfgjvPK50x8B2zz4R27yfAUDATQi0NcLA6k4ANwhxwDcIdMfId0B2zz4R27yfAMDQCCCEDtj1H67joDgIIIQaBflNbuOgOAgghBotV8/uuMCCwYEAlgw+EFu4wD4RvJzcfhm0fhC8uBl+EUgbpIwcN74Qrry4Gb4APgj+GrbPH/4ZwUPAHjtRNAg10nCAY4U0//TP9MA1wsf+Gp/+GH4Zvhj+GKOG/QFcPhqcAGAQPQO8r3XC//4YnD4Y3D4Zn/4YeICKCCCEFTWvRi64wIgghBoF+U1uuMCCAcBSts8+EqNBHAAAAAAAAAAAAAAAAA6BflNYMjOIc8LH8lw+wB/+GcQAnIw0ds8IcD/jikj0NMB+kAwMcjPhyDOjQQAAAAAAAAAAAAAAAANTWvRiM8WIc8UyXD7AN4w4wB/+GcJDwECiAoAFGhlbGxvV29ybGQCKCCCEDcxLkW64wIgghA7Y9R+uuMCDgwDSDD4QW7jAPpA1w1/ldTR0NN/39cMAJXU0dDSAN/R2zzjAH/4ZxANDwBU+EUgbpIwcN74Qrry4Gb4AFRxIMjPhYDKAHPPQM4B+gKAa89AyXD7AF8DAkAw+EFu4wDR+EUgbpIwcN74Qrry4Gb4APgj+GrbPH/4ZxAPAC74QsjL//hDzws/+EbPCwD4SgHLH8ntVAAu7UTQ0//TP9MA1wsf+Gp/+GH4Zvhj+GIBCvSkIPShEgAA",
        "code_hash": "c517820144a4daf5a3414c9233556b2b0ad34cdd228f200ea68a4c0327e0bd29",
        "data": "te6ccgEBAQEALwAAWTgmICsSnqjAQbjUmmVVEmSPyUN30ZWKek/J9LMFHs97AAABesq/uBawfEB6wA=="
      }
    ]
  }
}
```

You can specify any other fields in the result section that are available in GraphQL Schema. (Click `Docs` on the right side of your screen to explore it).

**What is GraphQL?** This is the API of blockchain, to retrieve data from it and to send data into it. You can use this playground later, if you will need need to test some queries.

## Run on-chain

Let's move on and run an on-chain method.

```shell
npx everdev contract run helloWorld
Configuration
  Network: se (http://localhost)
  Signer:  owner_key (public 3826202b129ea8c041b8d49a655512648fc94377d1958a7a4fc9f4b3051ecf7b)
Address:   0:e74c4258496e79e62e014ca96911acbf5cb0e286fd55dd6f4e3da54e4197ddf5 (calculated from TVC and signer public)
Available functions:
  1) constructor
  2) renderHelloWorld
  3) touch
  4) sendValue
  5) timestamp
  Select function (number): 
```

Let's enter 3. You will see the transaction ID of the operation.

```shell
"transaction": {
    "json_version": 5,
    "id": "8087f774d4b8b4d4716cb31a74deea32550a04b40e853f55c64579fa3897108f",
    "boc": "te6ccgECBw......
    ........................
```

You can also execute it inline like this: `npx everdev contract run helloWorld touch`

In the result you can see the transaction\_id. Search for it on your Contract's page in Explorer and in GraphQL playground (use `transactions` collection instead of `accounts`).

## Run a getter function

```shell
npx everdev contract run-local helloWorld timestamp
Configuration
  Network: se (http://localhost)
  Signer:  owner_keys (public 3826202b129ea8c041b8d49a655512648fc94377d1958a7a4fc9f4b3051ecf7b)
Address:   0:e74c4258496e79e62e014ca96911acbf5cb0e286fd55dd6f4e3da54e4197ddf5 (calculated from TVC and signer public)
Execution has finished with result: {
    "output": {
        "timestamp": "1626898677"
    },
    "out_messages": []
}
```

## Transfer some tokens

```shell
npx everdev contract run helloWorld sendValue
Configuration
  Network: se (http://localhost)
  Signer:  owner_keys (public 3826202b129ea8c041b8d49a655512648fc94377d1958a7a4fc9f4b3051ecf7b)
Address:   0:e74c4258496e79e62e014ca96911acbf5cb0e286fd55dd6f4e3da54e4197ddf5 (calculated from TVC and signer public)
Parameters of sendValue:
  dest (address): 0:b5e9240fc2d2f1ff8cbb1d1dee7fb7cae155e5f6320e585fcc685698994a19a5
  amount (uint128): 1000000000
  bounce (bool): true
Running...
Execution has finished with result: {
    "transaction": {
        "json_version": 5,
        "id": "550731bb26e5054387a781257e077dbdd769367f16b19bfa529c20475e2a08f6",
        "boc": "te6ccgECCwEAAkwAA7V+dMQlhJbnnmLgFMqWkRrL9csOKG/VXdb049pU5Bl931AAAAAAAAADdx7fDdz4W9u1NnBVF9To555bwxWhiXk8pjgn1OO6cR6wAAAAAAAAAzYPiDAAADRxN2doBQQBAg8MSMYbFBYEQAMCAG/Jh6EgTBRYQAAAAAAAAgAAAAAAAmHZXn3oj36iIsmePH9xls7+ruVE+XB4H24a
```
:::caution Attention!
* Contracts take value in nanotokens, so in this step we transfered 1 token.
* Bounce = true means that if the recipient does not exist, money will be returned back. **If you plan to transfer money for deploy, specify Bounce = false!**
:::

Again, now you can find this transaction in Explorer or GraphQL API.

## What's next?

1. If you want to migrate to Dev Network, read [Working with DevNet guide](work-with-devnet.md).
2. Also take a look at our [blockchain basics page](../../../../arch/10-basics.md) that will help you understand the core concepts of Everscale:)
3. If you want to integrate your application with Everscale - dive into our [SDK Quick Start](../../api-sdk/sdk/installation.md)!
4. If you are an exchange - check out our [exchange guide](../../../../develop/integrate/tutorial/add-everscale-to-your-exchange.md)!

If you have any difficulties/questions/suggestions/etc please write to [telegram channel @everdev](https://t.me/everdev).
