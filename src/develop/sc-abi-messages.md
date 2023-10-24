---
sidebar_position: 5
---

# Smart Contracts, ABI and Messages

Frontend developers used to build a UI around some machinery called “backend”, that can be accessed via an API. The common practice in software development is to have some schema definitions, usually built with tool called swagger.

In blockchain development, the “backend” thing is called a smart contract. It is usually being built with Solidity language, and also has schema definition called an Abstract Binary Interface, or ABI. In most cases, a frontend developer doesn’t need to bother his mind with understanding the smart-contract code. But it is crucial to understand the ABI to interact with a smart contract.

Let’s see how an ABI looks like, and what can we underfstand from it without reading the smart contract itself.

<details>
  <summary>ABI</summary>

```json5
{
  // Major version of ABI standart
  "ABI version": 2,
    // Full version of ABI
    // Can be – 2.0, 2.1, 2.2, 2.3
  version: "2.3",
  // Headers, specifying SDK which additional fields to attach to external message
  // Defined in the contract code, there are:
  // pragma AbiHeader time;
  // pragma AbiHeader pubkey;
  // pragma AbiHeader expire;
  header: [
    "time", "pubkey", "expire"
  ],
  // Description of callable function signatures
  // both internal and external messages
  functions: [
    {
      "name": "constructor",
      "inputs": [],
      "outputs": []
    },
    {
      "name": "get",
      "inputs": [],
      "outputs": [{"name":"value0","type":"uint256"}]
    },
    {
      "name": "getInternal",
      "inputs": [
        {"name":"answerId","type":"uint32"}
      ],
      "outputs": [
        {"name":"value0","type":"uint256"}
      ]
    },
    {
      "name": "set",
      "inputs": [{"name":"_value","type":"uint256"}],
      "outputs": []
    }
  ],
  // A description of the events that a contract can create
  events: [
    {
      "name": "VariableChanged",
      "inputs": [{"name":"new_value","type":"uint256"}],
      "outputs": []
    }
  ],
  // A list of static variables that must be specified to deploy the contract
  data: [
    {"key":1,"name":"owner","type":"address"}
    // There are also three hidden variables that SDK will set by itself
    // _pubkey, _timestamp, _constructorFlag
  ],
  // a list of all variables, so that you can
  // download the contract state and decode it
  fields: [
    {"name":"_pubkey","type":"uint256"}, // tvm.pubkey()
    {"name":"_timestamp","type":"uint64"}, // set by SDK
    {"name":"_constructorFlag","type":"bool"}, // set by SDK
    {"name":"owner","type":"address"},
    {"name":"variable","type":"uint256"}
  ]
}
```   

</details>          

An ABI describes how we pack the data into a TOC (Tree Of Cells) - the fundamental internal data structure of Everscale blockchain. We need that to encode the message according to Everscale standard and send it to the blockchain.

Any message have a body for the function call. Let's look at an example function from abi:

```json
{
  "name": "set",
  "inputs": [{"name":"_value","type":"uint256"}],
  "outputs": []
}
```

In the Recipes section, we provide snippets for `ever-sdk-js`, `surf-keeper-provider` and `everscale-inpage-provider` libraries, where we use ABI to interact with smart-contracts. It’s important to understand what happens under the hood, so lets summarize: we want to encode the payload, construct the message to some contract and send it over the RPC to a blockhain.

Usually you will connect your dApp to existing smart contract system, deployed on-chain by a smart-contract developer. We assume that you have an ABI an address of one or several contracts.

In further examples we will learn how to perform common routines.
