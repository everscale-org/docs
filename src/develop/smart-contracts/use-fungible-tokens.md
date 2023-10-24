---
sidebar_position: 2
---

# Deploy TIP-3 Token

One of the most popular use cases for Everscale is the creation of custom tokens using the TIP-3 standard. TIP-3 tokens are fungible tokens that follow a set of rules and standards, making them compatible with a variety of wallets, exchanges, and other Everscale-based services. 
  
TIP-3 provides the following functionalities:
- transfer tokens from one account to another
- get the current token balance of an account
- get the total supply of the token available on the network
- mint and burn tokens

The TIP-3 standard is made up of a set of interfaces, contracts, and utilities that work together to facilitate the creation and management of tokens. They include:

- `TIP3TokenRoot`: is an interface that defines the minimal required functionality for a TIP-3 compliant token root contract. It includes functions for querying the name, symbol, number of decimals, total supply, and wallet code of the token. These functions are used for display purposes and do not affect the contract's arithmetic.

- `ITokenRoot`: the interface for the token root contract that stores general information about the token, such as the name, symbol, decimals, and total supply.

- `TokenRootBase`: is an implementation of the TIP-3 Token Standard for the Everscale blockchain. It provides the minimal required functionality for a token root contract, including storing general information about the token such as name, symbol, decimals, and total supply.

To get started with developing your token, you can inspect the Everscale source code for [TIP-3 token implementation here](https://github.com/broxus/tip3). Then you need to install and set up your [smart contract development environment](#todo-add). 

Next, you follow the steps below:

## Install Dependencies

To install dependencies, add TIP-3 implementation repository as a `devDependencies` in the corresponding section of the `package.json` file.

```json
{
  "devDependencies": {
    "tip3": "git://github.com/broxus/tip3#v5"
  }
}
```

Then run following command to install dependency:

```shell
npm i
```

Specify installed contracts to the `externalContracts` section of `locklift.config.ts`, by providing a path to contracts artifacts (`.abi.json` files, `.tvc` files, etc., most commonly placed in a `build` folder of smart contracts projects) and contract names array.

```typescript
const config: LockliftConfig = {
  compiler: {
    // ...
    externalContracts: {
      "node_modules/tip3/build": ["TokenRoot", "TokenWallet"],
    },
  },
  // ...  
}
```

## Compile Contract

Next, the contracts need to be compiled to ensure that artifacts are created. To do this, run the following:

```shell
npx locklift build
```

## Deploy

After compiling the contract, we move to deploy. Firstly, we make a new deploy script in the `scripts` directory for the `TokenRoot` contract:

<details>
    <summary>scripts/01-deploy-token-root.ts</summary>

```typescript
import { Address, getRandomNonce, toNano, zeroAddress } from "locklift"
import BigNumber from "bignumber.js"
async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!
  // Address of initial token supply recipient (write your own)
  const initialSupplyTo   = new Address("0:7542...")
  // Address of token owner (write your own)
  const rootOwner         = new Address("0:7542...")
  // Name of the token
  const name              = "First Everscale Token"
  // Symbol of the token
  const symbol            = "FET"
  // How many token will be issued instantly after deploy
  const initialSupply     = 0
  // The number of decimals the token uses
  const decimals          = 18
  // If true, disables token minting
  const disableMint       = false
  // If true, disables token burning by root
  const disableBurnByRoot = false
  // If true, pauses token burning
  const pauseBurn         = false
  
  /*
  Returns compilation artifacts based on the .sol file name
  or name from value config.externalContracts[pathToLib].
  */
  const TokenWallet = locklift.factory.getContractArtifacts("TokenWallet")

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
    // this field should be zero address if deploying with public key (see source code)
      deployer_: zeroAddress, 
      randomNonce_: getRandomNonce(),
      rootOwner_: rootOwner,
      name_: name,
      symbol_: symbol,
      decimals_: decimals,
      walletCode_: TokenWallet.code,
    },
    constructorParams: {
      initialSupplyTo: initialSupplyTo,
      initialSupply: new BigNumber(initialSupply).shiftedBy(decimals).toFixed(),
      deployWalletValue: toNano(1),
      mintDisabled: disableMint,
      burnByRootDisabled: disableBurnByRoot,
      burnPaused: pauseBurn,
      remainingGasTo: zeroAddress,
    },
    value: toNano(5),
  });
  console.log(${name}: ${tokenRoot.address})
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e)
    process.exit(1)
  });
```
</details>

Finally, we can deploy a new token to local network. For this, make sure the local node is running, if not - run the following command:

```shell
docker run -d --name local-node -e USER_AGREEMENT=yes -p80:80 tonlabs/local-node
```

Then run the deploy script:

```shell
npx locklift run -s ./scripts/01-deploy-token.ts -n local
```

If you succeeded with all steps above, you should see the address, where the `TokenRoot` contract is deployed.
