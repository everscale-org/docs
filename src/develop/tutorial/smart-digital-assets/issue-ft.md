---
sidebar_position: 0
---

# Issue a Fungible Token using Locklift

## Reference

- [TIP-3 Core description](../../../standard/TIP-3/core-description.md)

## Prerequisites

Before we begin, make sure that you already have the following installed:

- [NodeJs](https://nodejs.org/) - version 16 or later
- [Docker](https://www.docker.com/) - version 19 or later

## Getting Started

To begin with, let us recall the architecture of the [TIP-3 token](../../../standard/TIP-3/core-description.md):

- The information about the token is stored in the **Token root** contract.
- Each holder has its own instance of **Token Wallet**. This contract is used to store tokens.  
It also can send tokens to any smart contract or receive them from another Token Wallet.

As an example, we will use the [TIP-3 token repository](https://github.com/broxus/tip3) by Broxus.  
However, we will rewrite the scripts in this repository in Typescript for the new version of Locklift.

### Creating a project

The first thing we need to do is to install [Locklift](https://www.notion.so/tools/locklift.md) and create a new project.
Locklift is a development environment designed to help writing Everscale smart contracts.

Start by creating a folder.
We'll call it `tip-3`, but you can choose any other name you like.

```shell
mkdir tip-3
cd tip-3
```

Afterwards, create an NPM project.

```shell
npm init
```

Now, we need to install the Locklift locally. If you have a globally installed Locklift, you can skip this step.

```shell
npm install --save-dev locklift
```

To install Locklift globally, you can use the following command:

```shell
npm install -g locklift
```

After that, initialize the project with this command:

```shell
npx locklift init -f
```

As a result of the initialization, a new Locklift project will be created, filled with samples:

```
├── contracts
│   └── Sample.sol
├── locklift.config.ts
├── scripts
│   └── 1-deploy-sample.ts
├── giverSettings
|   └── index.ts
└── test
    └── sample-test.ts
```

### Locklift config settings

Since we will be using a sandbox, it is nedded to remove `graphql` from `LOCAL_NETWORK_ENDPOINT` in `locklift.config.ts` :

```typescript
const LOCAL_NETWORK_ENDPOINT = "<http://localhost/graphql>";
// to
const LOCAL_NETWORK_ENDPOINT = "<http://localhost/>;
```

### Add Sandbox

Let's add a Sandbox script to `package.json`, with which we will launch a local node.

```
 "scripts": {
    "test": "npx locklift test --network local",
    "start-sandbox": "everdev se start",
    "stop-sandbox": "everdev se stop",
    "reload-sandbox": "npx stop-sandbox && npx start-sandbox"
  },
```

You can start the sandbox with the `yarn start-sandbox` command, and stop it with `yarn stop-sandbox` command.

### Embedding the TIP-3 token repository

After the project is created, it is needed to import the TIP-3 token repository. It will be used for the work thank follows.    
To do this, please use the import method directly in Locklift.

Let's add the [TIP-3 repository](https://github.com/broxus/tip3) and Broxus contracts to the `package.json` dependencies:

```json
{
// ...
"devDependencies": {
    "@broxus/tip3": "git+https://github.com/broxus/tip3.git",
    "@broxus/contracts": "^1.1.0",
    ...
  },
 ...
}
```

Also, we need to tell Locklift that there are external contracts.
To do this, add the following lines to `locklift.config.ts/compiler`:

```typescript
    externalContracts: {
    "node_modules/@broxus/tip3/build": ["TokenRoot", "TokenWallet"],
 },
  },
```

Now, we can configure and compile our contracts:

```shell
npm i
npx locklift build
```

## Deploy account 

To deploy [Token Root](#deploy-token-root), [Token Wallet](#deploy-token-wallet) and [Token Transfer](#transfer-tip-3-tokens), you need a deployed account.

Let's write a simple script that will use Locklift to deploy an Account.

Take [the script](https://github.com/broxus/tip3/blob/master/scripts/00-deploy-account.js) from the [Broxus repository](https://github.com/broxus/tip3) and rewrite it for the typescript and the newer version of Locklift:

```typescript
async function main() {
  const keyNumber = "0";
  const balance = 300;

  /* We get a pair of private and public keys,
      which we get from the mnemonic phrase from the config

    SimpleSigner {
      keyPair: {
        secretKey: 'bb2903d025a330681e78f3bcb248d7d89b861f3e8a480eb74438ec0299319f7a',
        publicKey: 'e85f61aaef0ea43afc14e08e6bd46c3b996974c495a881baccc58760f6349300'
      },
      publicKey: 'e85f61aaef0ea43afc14e08e6bd46c3b996974c495a881baccc58760f6349300'
    }

  */
  const signer = (await locklift.keystore.getSigner(keyNumber))!;

  /* Get a accountFactory from contract name. You can provide your own implementation of account
      if needed, there is only one constraint - custom contract
    should include SendTransaction method */
  let accountsFactory = locklift.factory.getAccountsFactory("Account");

  /* Deploy new Account.
    @params value: Initial balance in EVERs, receoved from giver.
  */
  const { account: Account } = await accountsFactory.deployNewAccount({
    publicKey: signer.publicKey,
    initParams: {
      _randomNonce: locklift.utils.getRandomNonce(),
    },
    constructorParams: {},
    value: locklift.utils.toNano(10),
  });
  console.log(`Account deployed at: ${Account.address}`);
}
main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
```

Giver - is a contract that has a `sendTransaction` method. The local-node already has a pre-installed contract with the initial amount of EVERs. For other networks, you can configure your giver in `locklift.config.ts`.

If you need a permanent address for testing, then set the `_randomNonce` constant. By changing  `_randomNonce` you change the byte code of the contract, and the final address.

Done. Now, using the following command we will deploy the account:

```shell
npx locklift run -s ./scripts/00-deploy-account.ts -n local
```

## Deploy Token Root

Token root contract stores the general information about the token, e.g. name, symbol, decimals, token wallet code and so on.

Let's write a script `scripts/01-deploy-token.ts` to deploy Token Root:

```typescript
import { Address } from "locklift/.";
import { isValidEverAddress, isNumeric, zeroAddress, Migration } from "./utils";
async function main() {
const signer = (await locklift.keystore.getSigner("0"))!;
const initialSupplyTo = zeroAddress;
const rootOwner = "";
const name = "Onboarding Token";
const symbol = "ONT42";
const decimals = 6;
const disableMint = "false";
const disableBurnByRoot = "false";
const pauseBurn = "false";
let initialSupply = "0";
/*
Returns compilation artifacts based on the .sol file name
or name from value config.extarnalContracts[pathToLib].
*/
const TokenWallet = locklift.factory.getContractArtifacts("TokenWallet");
/*
Deploy the TIP-3 Token Root contract.
@params deployWalletValue: Along with the deployment of the root token,
the wallet will be automatically deployed to the owner.
This is the amount of EVERs that will be sent to the wallet.
*/
  const { contract: tokenRoot } = await locklift.factory.deployContract({
    contract: "TokenRoot",
    publicKey: signer.publicKey,
    initParams: {
      deployer_: new Address(zeroAddress),
      randomNonce_: (Math.random() * 6400) | 0,
      rootOwner_: rootOwner,
      name_: name,
      symbol_: symbol,
      decimals_: decimals,
      walletCode_: TokenWallet.code,
    },
    constructorParams: {
      initialSupplyTo: initialSupplyTo,
      initialSupply: new BigNumber(initialSupply).shiftedBy(decimals).toFixed(),
      deployWalletValue: locklift.utils.toNano(1),
      mintDisabled: disableMint,
      burnByRootDisabled: disableBurnByRoot,
      burnPaused: pauseBurn,
      remainingGasTo: new Address(myAccountAddress),
    },
    value: locklift.utils.toNano(5),
  });
  console.log(`${name}: ${tokenRoot.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
```

You can then run the script using the following Locklift command:

```shell
npx locklift run -s ./scripts/01-deploy-token.ts -n local
```

After running the script, your TIP-3 Token Root will be deployed, and in the terminal you will see token data:

```shell
...
Root owner ...
Name ...
Symbol ...
Decimals ...
...
```

## Deploy Token Wallet

Let's write the script `/scripts/02-deploy-wallet.js` for Token Wallet deployment.

```typescript
import { Address, Contract } from "locklift/.";
import { AccountAbi } from "../build/factorySource";
async function main() {
  const tokenRootAddress = "";
  const myAccountAddress = "";

  const signer = (await locklift.keystore.getSigner("0"))!;
  const accountFactory = locklift.factory.getAccountsFactory("Account");

  /*
    Get Account contract instance: Account<AccountAbi>
  */
  const account = accountFactory.getAccount(myAccountAddress, signer.publicKey);

  /*
    Get instance of already deployed contract
  */
  const tokenRoot = locklift.factory.getDeployedContract(
    "TokenRoot",
    new Address(tokenRootAddress),
  );

  /*
    Under the hood of runTarget, the Account sendTransaction method is called
  */
  await account.runTarget(
    {
      contract: tokenRoot,
      value: locklift.utils.toNano(1),
    },
    tr =>
      tr.methods.deployWallet({
        answerId: 0,
        walletOwner: account.address,
        deployWalletValue: 0,
      }),
  );

  /*
    We call the get method on the contract.
    @params answerId: If the function marked as responsible then
      field answerId appears in the list of input parameters
        of the function in *abi.json file. answerId is function id
        that will be called.
      In external calls, we did not notice that this affected anything.
        But answerid is critical when you call these functions on-chain
  */
  const wallet = await tokenRoot.methods
    .walletOf({
      answerId: 0,
      walletOwner: account.address,
    })
    .call({ responsible: true });
  console.log(`Account deployed at: ${Account.address}`);
  console.log(`TIP3 Wallet deployed at: ${wallet.value0.toString()}`);
}
main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
```

[The TON Soidity Compiler](https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/API.md#external-function-calls) allows you to specify different parameters (`value`,`currencies`, `bounce` or `flag`) of an outgoing internal message sent through an external function call.


Be informed that all external function calls are asynchronous. Thus, a function will be called after the end of the current transaction.

Note that if the `value` is not set, the default value will be 0.01 EVER, or 10^7 nanoever. This value is exactly 10_000 gas units in the workchain.

If the called function returns some value and is marked as `responsible`, then a callback option must be set. This callback function will be called by another contract.    

The Remote function will pass its return values as function arguments for the callback function. That's why the types of return values must be equal to function arguments of the callback function.

If the function is marked as `responsible`, then field `answerId` appears in the list of input parameters of the function in `*abi.json` file. `answerId` is the function id that will be called.

Use this command and deploy the token wallet:

```shell
npx locklift run -s ./scripts/02-deploy-wallet.js -n local
```

After running the script, the Token Wallet will be deployed:

```shell
...
Public key number ...
Token Root address ...
TIP3 Wallet deployed at: ...
...
```

## Transfer TIP-3 tokens

TIP-3 Token Wallet has two transfer methods:

`Transfer` - Transfer tokens and optionally deploy TokenWallet for recipient account address.
Transfer tokens using another TokenWallet address. That wallet must be deployed previously.
Let's do a token transfer using the previously deployed account.
To do this, add the following strings to `/scripts/03-transfer-tip3.ts`:

```typescript
import { Address, Contract } from "locklift/.";
import { AccountAbi } from "../build/factorySource";
const EMPTY_TVM_CELL = "te6ccgEBAQEAAgAAAA==";
async function main() {
  const tokenWalletAddress = "";
  const myAccountAddress = "";
  const aliceAccount = "";
  const signer = (await locklift.keystore.getSigner("0"))!;

  const accountFactory = locklift.factory.getAccountsFactory("Account");
  const account = accountFactory.getAccount(myAccountAddress, signer.publicKey);

  const tw = locklift.factory.getDeployedContract(
    "TokenWallet",
    new Address(tokenWalletAddress),
  );

  /*
    Transfer with the deployment of a wallet for the recipient account.

    Don't pay attention to notify and payload yet, we'll get back to them.
  */
  await account.runTarget(
    {
      contract: tw,
      value: locklift.utils.toNano(6),
    },
    tw =>
      tw.methods.transfer({
        amount: 100,
        recipient: aliceAccount,
        deployWalletValue: locklift.utils.toNano(5),
        remainingGasTo: account.address,
        notify: true,
        payload: EMPTY_TVM_CELL,
      }),
  );

  const tokenRootAddress = await tw.methods
    .root({
      answerId: 0,
    })
    .call({ responsible: true });

  const tokenRoot = locklift.factory.getDeployedContract(
    "TokenRoot",
    tokenRootAddress.value0,
  );

  /*
    We recognize the newly created token wallet for Alice.
    To send her more tokens.
  */
  const aliceTokenWallet = (await tokenRoot.methods
    .walletOf({
      answerId: 0,
      walletOwner: aliceAccount,
    })
    .call({ responsible: true }))
    .value0;
   /*
     Сhecking Alice's balance
   */
   const aliceTW: Contract<TokenWalletAbi> =
    locklift.factory.getDeployedContract(
      "TokenWallet",
      aliceTokenWallet,
    );

    const  aliceBalance = (await tw.methods
      .balance({
        answerId: 0,
      })
      .call({ responsible: true })).value0;

    /*
       Transfer to deployed token wallet
    */
    await account.runTarget(
      {
        contract: tw,
        value: locklift.utils.toNano(1),
      },
      tw =>
        tw.methods.transferToWallet({
          amount: 100,
          recipientTokenWallet: aliceTokenWallet,
          remainingGasTo: account.address,
          notify: true,
          payload: EMPTY_TVM_CELL,
        }),
    );

}
main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
```

Done. Now we can run the transfer using the following command:

```shell
npx locklift run -s ./scripts/03-transfer-tip3.ts -n local
```

As a result, you will see the transfer process on the command line:

```shell
...
Public key number ...
Token Wallet address ...
Transfer recipient ...
Transfer amount ...
Initiial balance (will send from your wallet) ...
...
```
