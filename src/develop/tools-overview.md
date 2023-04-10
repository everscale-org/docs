---
sidebar_position: 1
---

# Developer Tools Overview

Before you start developing or integrating anything into Everscale, we would like to tell you about the tools and environment that you will use in your work.

## For both dev and non-dev users

- [Ever Wallet](https://everwallet.net)
- [Ever Surf](https://ever.surf/)
- [Blockchain Explorer](https://everscan.io)

### Tools for developers

- [Locklift](https://github.com/broxus/locklift) - development environment, analogous to Hardhat.
- [Bytie](https://ever.bytie.moe) - smart contracts interaction playground.
- [Everdev](https://github.com/tonlabs/everdev) - CLI tool and Javascript package that helps set up all the core developer tools and work with Everscale blockchain from a single interface
- [RPC endpoints](https://docs.evercloud.dev/) - get started with RPC endpoints using this doc
- [T-Sol compiler](https://github.com/tonlabs/TON-Solidity-Compiler) - Solidity-like language for smart contract development. Can be installed within Locklift or Everdev environments as well
- [TONOS CLI](https://github.com/tonlabs/tonos-cli) - is a multi-platform command line interface for Everscale. It allows you to work with keys and seed phrases, deploy contracts, call any of their methods, generate and broadcast messages and more

### T-Sol IDE integrations

- [VSCode T-Sol plugin 1](https://marketplace.visualstudio.com/items?itemName=everscale.solidity-support)
- [VSCode T-Sol plugin 2](https://marketplace.visualstudio.com/items?itemName=mytonwallet.ton-solidity-extension)
- [JetBrains T-Sol plugin](https://plugins.jetbrains.com/plugin/20696-t-sol)

### Libraries for developers

- [Rust SDK](https://github.com/broxus/nekoton)
- [Ever SDK with support of 10+ languages](https://docs.everos.dev/ever-sdk/)
- [JS SDK recommended for building frontend](https://github.com/broxus/everscale-inpage-provider/)
- [Build backend with the same friendly API as frontend devs have](https://github.com/broxus/everscale-standalone-client)


### Node-related repos

- [Local Node](https://github.com/tonlabs/evernode-se) - local blockchain for contract and Dapp testing, exposing GraphQL API. Can be installed and managed within Everdev environment
- [Light Node](https://github.com/broxus/ton-indexer) - Lightweight node implementation, useful for developing custom indexers
- [Everscale Node](https://github.com/tonlabs/ever-node) - Validator and Full Node implementation
- [Nodekeeper](https://github.com/broxus/nodekeeper) - All-in-one node management tool
- [everscale-network](https://github.com/broxus/everscale-network) - implementation of the network part of the Everscale blockchain.