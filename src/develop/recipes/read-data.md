---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Read data from blockchain

There are several types of things you can read from a blockchain. These are various queries to blockchain RPC node, contract get-methods and contract events.

Usually you will connect your dApp to existing smart contract system, deployed on-chain by a smart-contract developer. Thus, you will have an address (a string, that usually looks like `0:abcdef…7890`) and an ABI (`.json` file) of a contract you want to interact with.

In each example below, we will assume that you have following definitions of the address and ABI:

<Tabs>
  <TabItem value="inp-prov" label="everscale-inpage-provider">

  ```typescript
  import { Address } from 'everscale-inpage-provider';
  import contractABI from "path/to/Contract.abi.json";
  const contractAddress = new Address("0:deadbeef...00");
  ```
  </TabItem>

  <TabItem value="surf-keeper" label="surf-keeper-provider">

  ```typescript
  import { Address } from 'surf-keeper-provider';
  import contractABI from "path/to/Contract.abi.json";
  const contractAddress = new Address("0:deadbeef...00");
  ```
  </TabItem>

  <TabItem value="ever-sdk" label="ever-sdk-js">

  ```typescript
  import contractABI from "path/to/Contract.abi.json";
  const contractAddress = "0:deadbeef...00";
  ```
  </TabItem>
</Tabs>


## Invoke a get-method

<Tabs>
  <TabItem value="inp-prov" label="everscale-inpage-provider">

  ```typescript
  console.log('inpage provider');
  ```
  </TabItem>

  <TabItem value="surf-keeper" label="surf-keeper-provider">

  ```typescript
  console.log('surf keeper');
  ```
  </TabItem>

  <TabItem value="ever-sdk" label="ever-sdk-js">

  ```typescript
  console.log('ever sdk');
  ```
  </TabItem>
</Tabs>

## Fetch or subscribe to contract events

<Tabs>
  <TabItem value="inp-prov" label="everscale-inpage-provider">

  ```typescript
  console.log('inpage provider');
  ```
  </TabItem>

  <TabItem value="surf-keeper" label="surf-keeper-provider">

  ```typescript
  console.log('surf keeper');
  ```
  </TabItem>

  <TabItem value="ever-sdk" label="ever-sdk-js">

  ```typescript
  console.log('ever sdk');
  ```
  </TabItem>
</Tabs>


## Read arbitrary data from blockchain

In most cases, the starting point for reading blockchain data is an account address. But sometimes you may want to perform arbitrary queries.

For such cases, the fullnode GraphQL API is a perfect solution. There is a public [Evercloud](https://evercloud.dev/) infrastructure for that. Head over to [Evercloud Docs](https://docs.evercloud.dev/) to read more.

It is fully opensource, so you may want to deploy your own full node instance with Graph QL interface. You can also reconfigure it for your dApp needs. For example - build various custom indexes according to your smart contract system architecture. Head over to [Graph QL Server repository](https://github.com/tonlabs/ton-q-server) to learn more details.