---
sidebar_position: 2
title: Evernode Dapp Server
---

# Evernode DApp Server (DS)

Client Node with GraphQL API that allows you to collect a large amount of data about the network.
*Suitable for integration by exchanges and other platforms.

Evernode DS is a set of services enabling you to work with Everscale blockchain.

The core element of Evernode DS is [Everscale node written in Rust](https://github.com/tonlabs/ton-labs-node) focused on performance and safety.  
Evernode DS provides a set of services serving EVER SDK endpoint: scalable multi-model database [ArangoDB](https://www.arangodb.com/documentation/) with the information about all blockchain entities (like accounts, blocks, transactions, etc.) stored over time, distributed high-throughput, low-latency streaming platform [Kafka](https://kafka.apache.org/documentation/), [Everscale GraphQL Server](https://github.com/tonlabs/ton-q-server) (aka Q-Server) for serving GraphQL queries to the database and [Nginx](https://nginx.org/en/docs/) web-server.

[This repository](https://github.com/tonlabs/evernode-ds#what-is-evernode-dapp-server) contains instructions on how to build and configure your own free instance of Evernode Platform to connect your application to Everscale. 

> **You can try to [run a core network node](../../validate/run-validator/run-mainnet-node.md) yourself [using the Evernode DS solution.](https://github.com/tonlabs/evernode-ds#what-is-evernode-dapp-server)**






>  The documentation in Everscale repository is a community effort. Therefore, everyone can contribute with proposals for new topics, suggest new content elements, participate in editing, and provide ideas that will be of great help for network development.
Please be informed that our documentation can be [edited via GitHub](https://github.com/everscale-org/docs/issues).  
  Also please make sure to consult our rules and rewards policy via [this link](https://docs.everscale.network/contribute/hot-streams/documentations).  
  Feel free to join [Everscale Documentation Development Telegram chat](https://t.me/+C2IpQXWZtCwxYzEy) and [Everscale Developers Onboarding Telegram chat](https://t.me/+Vca1Gs6uPzIyNWVi)!
