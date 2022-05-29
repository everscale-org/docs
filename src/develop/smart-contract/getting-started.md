---
sidebar_position: 1
description: Get started by creating a new DApp
---

# Getting started with smart contracts development.
  
This guide is designed for developers interested in smart-contracts programming, irrespective of their prior experience in blockchain development.  
Thanks to our well structured step by step guidance, developers will gradually learn all the information needed to start deploying and interacting with smart-contracts. 

In the interest of developers, Everscale network puts at their disposal smart-contracts programming using developer-friendly languages: **Solidity** and **C++**.

It should be noted that for developers experienced with Python or other languages such as C, C++, JavaScript, and C#, starting programming smart-contracts will be of maximum ease due to syntax similarity.  
Familiarity with the mentioned programming languages will help developers make sense of differences in smart-contract languages.

Before proceeding with the launch of your Dapp, let us first go through an overview explaining what technical information needed for up-to-date smart-contracts programming we prepared for our developers.

## What you can learn.

Experienced developers with advanced knowledge of Solidity programming language and solid understanding of Ethereum blockchain design, are advised to consult our [Learn section](../../learn/) where all necessary technical information is provided in a comprehensive way. 

For those with no prior knowledge of smart contracts, as well as for intermediaries and advanced developers who strive to learn new things in the blockchain industry, we recommend you to consult our [DeBots page](debots.md).  
DeBots, in essence, is an intuitive, no prior knowledge required interface for smart contracts on the Everscale blockchain.

Having studied the information provided above, now, let's start our DApp launch.

## Prerequisite

- [Node.js >= 14.x installed](https://nodejs.org)
  - [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm)
  - [NVM-windows](https://github.com/coreybutler/nvm-windows)
- [Docker >= 19.x installed and running](https://docs.docker.com/desktop/#download-and-install)

## Generate a new project

```shell
mkdir my-project && cd $_
npm init --force
npm install --save everdev
```

## Setup local environment

Set Local Blockchain [SE (Startup Edition)](https://github.com/tonlabs/tonos-se) as the default network:

**Startup `SE` at this step, you may have to wait until the docker image is downloaded:**
```shell
npx everdev se start
```

A local network explorer is available at [localhost](http://localhost) check it.

**Setting `SE` as default network:** 
```shell
npx everdev network default se
```

### Configure Giver

Configure Giver wallet that will sponsor **EVER** for deploy operation:

```shell
npx everdev signer add giver 172af540e43a524763dd53b26a066d472a97c4de37d5498170564510608250c3
npx everdev network giver se 0:b5e9240fc2d2f1ff8cbb1d1dee7fb7cae155e5f6320e585fcc685698994a19a5 --signer giver
npx everdev network giver dev 0:b5e9240fc2d2f1ff8cbb1d1dee7fb7cae155e5f6320e585fcc685698994a19a5 --signer giver
```

### Generate the key pair for contract ownership

Key pair file — used in contracts with implemented authorization. It is the file containing private and public keys authorized to access the contract. In `--sign` parameter the corresponding seed phrase may be used instead of it.

```shell
npx everdev signer generate coder
npx everdev signer default coder
npx everdev signer list 
```

## Generate a new smart-contract

```shell
npx everdev sol create App
```

You are got `App.sol`:

```solidity
pragma ton-solidity >= 0.35.0;
pragma AbiHeader expire;

// This is class that describes you smart contract.
contract App {
    // Contract can have an instance variables.
    // In this example instance variable `timestamp`
    // is used to store the time of `constructor`
    // or `touch` function call.
    uint32 public timestamp;

    // Contract can have a `constructor`. 
    // The function that will be called when contract will be deployed to the blockchain.
    // In this example constructor adds current time to the instance variable.
    // All contracts need call `tvm.accept()` for succeeded deploy.
    constructor() public {
        // Check that contract's public key is set
        require(tvm.pubkey() != 0, 101);
        // Check that message has signature (msg.pubkey() is not zero) and
        // message is signed with the owner's private key
        require(msg.pubkey() == tvm.pubkey(), 102);
        // The current smart contract agrees to buy some gas to finish the
        // current transaction. This actions required to process external
        // messages, which bring no value (hence no gas) with themselves.
        tvm.accept();

        timestamp = now;
    }

    function renderHelloWorld () public pure returns (string) {
        return 'helloWorld';
    }

    // Updates variable `timestamp` with current blockchain time.
    function touch() external {
        // Each function that accepts external message must check that
        // message is correctly signed.
        require(msg.pubkey() == tvm.pubkey(), 102);
        // Tells to the TVM that we accept this message.
        tvm.accept();
        // Update timestamp
        timestamp = now;
    }

    function sendValue(address dest, uint128 amount, bool bounce) public view {
        require(msg.pubkey() == tvm.pubkey(), 102);
        tvm.accept();
        // It allows to make a transfer with arbitrary settings
        dest.transfer(amount, bounce, 0);
    }
}
```

For more about [Solidity](https://docs.soliditylang.org/en/v0.8.10/structure-of-a-contract.html) and specific of [Everscale Solidity](https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/API.md)

## Compile smart-contract

```shell
npx everdev sol compile App.sol
```

You are got:

- `App.abi.json` — **ABI** `*.abi.json` file — a file that describes the contract interface, the methods and parameters used to interact with it, for detail see [ABI Specification V2](https://docs.ton.dev/86757ecb2/p/40ba94-abi-specification-v2).
- `App.tvc` — **TVC** `*.tvc` file — the compiled smart contract file. Used only when generating contract address and deploying contract code to the blockchain.

## Deploy smart-contract

> The `1` **EVER** is `1000000000` **nano EVER**

**Local network:**
```shell
npx everdev contract deploy --network se --value 1000000000 App
```

**Developer network:**
```shell
npx everdev contract deploy --network dev --value 1000000000 App
```

## Address smart-contract

**Address of smart-contract is calculated from `TVC` and signer (`coder`) public:**
```shell
npx everdev contract info --network se --signer coder App
```

**Getting only address:**
```shell
appAddress=$(npx everdev contract info --network se --signer coder App | grep Address | cut -d ' ' -f 4)
echo $appAddress
```

## Interact with smart-contract

**Read:**
```shell
npx everdev contract run-local --network se App renderHelloWorld
npx everdev contract run-local --network se App timestamp
```

**Write:**
```shell
npx everdev contract run --network se --signer coder App touch
```

For more details see: [Get started with Development Tools](../../develop/sdk-tools/everdev/guides/quick-start.md).
