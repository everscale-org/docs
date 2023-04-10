---
sidebar_position: 2
---

# The First Project

## Initialize new project

Run the following command line:

```shell
locklift init --path sample-project
```

This command initializes a new Locklift project, filled with samples:

```
├── locklift.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
│
├── contracts
│   └── Sample.tsol
├── scripts
│   └── 1-deploy-sample.ts
├── test
│   └── sample-test.ts
```

You can see that your smart contract `Sample.tsol` appeared in the `sample-project/contracts` directory.

## Configuration

The configuration file is called `locklift.config.ts`. Here's how the basic layout for local node looks like (note, that your config may contain more networks, but the way they are configured is the same): 

```typescript
import { LockliftConfig } from "locklift";
import { FactorySource } from "./build/factorySource";
declare global {
 const locklift: import("locklift").Locklift<FactorySource>;
}

const LOCAL_NETWORK_ENDPOINT = process.env.NETWORK_ENDPOINT || "http://localhost/graphql";
const DEV_NET_NETWORK_ENDPOINT = process.env.DEV_NET_NETWORK_ENDPOINT || "https://devnet-sandbox.evercloud.dev/graphql";
const VENOM_TESTNET_ENDPOINT = process.env.VENOM_TESTNET_ENDPOINT || "https://jrpc-testnet.venom.foundation/rpc";
const VENOM_TESTNET_TRACE_ENDPOINT = process.env.VENOM_TESTNET_TRACE_ENDPOINT || "https://gql-testnet.venom.foundation/graphql";
// Create your own link on https://dashboard.evercloud.dev/
const MAIN_NET_NETWORK_ENDPOINT = process.env.MAIN_NET_NETWORK_ENDPOINT || "https://mainnet.evercloud.dev/XXX/graphql";
const config: LockliftConfig = {
 compiler: {
  // Specify path to your TON-Solidity-Compiler
  // path: "/mnt/o/projects/broxus/TON-Solidity-Compiler/build/solc/solc",
  // Or specify version of compiler
  version: "0.62.0",
  // Specify config for extarnal contracts as in exapmple
  // externalContracts: {
  //  "node_modules/broxus-ton-tokens-contracts/build": ['TokenRoot', 'TokenWallet']
  // }
 },
 linker: {
  // Specify path to your stdlib
  // lib: "/mnt/o/projects/broxus/TON-Solidity-Compiler/lib/stdlib_sol.tvm",
  // // Specify path to your Linker
  // path: "/mnt/o/projects/broxus/TVM-linker/target/release/tvm_linker",
  // Or specify version of linker
  version: "0.15.48",
 },
 networks: {
  local: {
   // Specify connection settings for https://github.com/broxus/everscale-standalone-client/
   connection: {
    id: 1,
    group: "localnet",
    type: "graphql",
    data: {
     endpoints: [LOCAL_NETWORK_ENDPOINT],
     latencyDetectionInterval: 1000,
     local: true,
    },
   },
   // This giver is default local-node giverV2
   giver: {
    // Check if you need provide custom giver
    address: "0:ece57bcc6c530283becbbd8a3b24d3c5987cdddc3c8b7b33be6e4a6312490415",
    key: "172af540e43a524763dd53b26a066d472a97c4de37d5498170564510608250c3",
   },
   tracing: {
    endpoint: LOCAL_NETWORK_ENDPOINT,
   },
   keys: {
    // Use everdev to generate your phrase
    // !!! Never commit it in your repos !!!
    // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
    amount: 20,
   },
  },
  
  // ... (configs for other networks go here)
  ```

For the avoidance of doubt, it’s important that we go through each of the parameters:  

`compiler.version` - the version of the solidity compiler binary 

`linker.version` - the version of the TVM-linker binary

`networks` - specify which networks are available for deployment and testing. 

`networks.[NETWORK_NAME].keys.phrase` - if you leave this field value empty - a new random seed will be generated each time you're running locklift.

Or specify it explicitly - fill the `phrase` field with a mnemonic phrase. 

## Build 

You can run tests and start to develop your amazing projects. To do this, you need to run the following command. The command uses the specified TON Solidity compiler and TVM linker to build all project contracts:

```shell
npx locklift build
```

Now, let’s proceed with testing the sample contract.

## Test

This command runs the project Mocha tests, `test` folder by default. The `locklift` object will be set up and included automatically, you don't need to import it manually.

```shell
npx locklift test -n local
```

If you are able to follow the steps and see the above, you’re on the right path to building smart contracts on Everscale.