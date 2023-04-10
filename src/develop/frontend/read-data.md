---
sidebar_position: 3
---

# Read data from blockchain

There are several types of things you can read from a blockchain. These are various queries to blockchain RPC node, contract get-methods and contract events.

Usually you will connect your dApp to existing smart contract system, deployed on-chain by a smart-contract developer. Thus, you will have an address (a string, that usually looks like 0:abcdef…7890) and an ABI (.json file) of a contract you want to interact with.

For such needs, the everscale-inpage-provider is a great fit.

In each example below, we will assume that you have following definitions of the address and ABI:

```
import { Address } from 'everscale-inpage-provider';
import contractABI from "path/to/Contract.abi.json";
const contractAddress = new Address("0:deadbeef...00");
```

### Invoke a get-method

### Fetch or subscribe to contract events

### Read arbitrary data from blockchain

In most cases, the starting point for reading blockchain data is an account address. But sometimes you may want to perform arbitrary queries.

For such cases, the fullnode GraphQL API is a perfect solution. There is a public [Evercloud](https://evercloud.dev/) infrastructure for that. Head over to [Evercloud Docs](https://docs.evercloud.dev/) to read more.

It is fully opensource, so you may want to deploy your own full node instance with Graph QL interface. You can also reconfigure it for your dApp needs. For example - build various custom indexes according to your smart contract system architecture. Head over to [Graph QL Server repository](https://github.com/tonlabs/ton-q-server) to learn more details.