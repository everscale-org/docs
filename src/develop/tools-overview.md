---
sidebar_position: 1
---

# Developer Tools Overview

### Wallets
- [Ever Surf](https://ever.surf/)
- [Ever Wallet](https://everwallet.net)

### API
- [Evercloud](https://evercloud.dev) ([docs](https://docs.evercloud.dev))

### Blockchain Explorers
- [Ever Live](https://ever.live) ([devnet](https://net.ever.live) [fld](https://fld.ever.live) [rfld](https://rfld.ever.live))
- [Everscan](https://everscan.io) ([devnet](https://testnet.everscan.io))

### Tools for developers
- [Everdev CLI](https://github.com/tonlabs/everdev) ([Quick start](smart-contracts/everdev.md) | [docs](https://docs.everos.dev/everdev)) - Everdev is a Node.js package with CLI interface that allows to set up developer environment and develop on TVM compatible blockchains (Everscale, Venom, TON, Gosh, etc).
- [Locklift](https://github.com/broxus/locklift) - development environment, analogous to Hardhat.
- [Bytie](https://ever.bytie.moe) - smart contracts interaction playground and useful devtools
- [T-Sol compiler](https://github.com/tonlabs/TON-Solidity-Compiler) ([reference](https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/API.md)) - Solidity dialect for smart contract development. Can be installed within Locklift or Everdev environments as well

### T-Sol IDE integrations

- [VSCode T-Sol plugin 1](https://marketplace.visualstudio.com/items?itemName=everscale.solidity-support)
- [VSCode T-Sol plugin 2](https://marketplace.visualstudio.com/items?itemName=mytonwallet.ton-solidity-extension)
- [JetBrains T-Sol plugin](https://plugins.jetbrains.com/plugin/20696-t-sol)

### Libraries for developers
- [JavaScript Ever SDK](https://github.com/tonlabs/ever-sdk-js) ([docs](https://docs.everos.dev/ever-sdk)) - Client Library built for Everscale, Venom blockchain, TON, Gosh for Web, Node.js and React Native platforms
- [Rust Ever SDK](https://github.com/tonlabs/ever-sdk) - Rust Client Library (core) for DApp development in TVM blockchains (Everscale, TON, Venom Blockchain, etc). Bindings to multiple languages available.
- [Surf Keeper JS Provider](https://github.com/EverSurf/surfkeeper-provider)
- [EVER Wallet JS Provider](https://github.com/broxus/everscale-inpage-provider/)
- [Alternative NodeJS Client](https://github.com/broxus/everscale-standalone-client)


### Node-related repos
- [Evernode dApp Server](https://github.com/tonlabs/evernode-ds) -  a community (open source) version of Evernode Platform (client supernode with GraphQL API) for TVM blockchains that exposes GraphQL API.
- [Local Node](https://github.com/tonlabs/evernode-se) - local blockchain for contract and Dapp testing, exposing GraphQL API. Can be installed and managed within Everdev environment
- [Light Node](https://github.com/broxus/ton-indexer) - Lightweight node implementation
- [Everscale Node](https://github.com/tonlabs/ever-node) - Validator and Full Node implementation
- [Nodekeeper](https://github.com/broxus/nodekeeper) - All-in-one node management tool
- [everscale-network](https://github.com/broxus/everscale-network) - minimal implementation of the Everscale network protocol