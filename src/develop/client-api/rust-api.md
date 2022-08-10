---
sidebar_position: 3
---

# Rust API

## About Core Rust Library

Core Client Library is written in Rust that can be dynamically linked. It provides all heavy-computation components and functions, such as TON Virtual Machine, TON Transaction Executor, ABI-related functions, boc-related functions, crypto functions.

The decision to create the Rust library was made after a period of time using pure JavaScript to implement these use cases.

We ended up with very slow work of pure JavaScript and decided to move all this to Rust library and link it to Javascript as a compiled binary including a wasm module for browser applications.

Also this approach provided an opportunity to easily create bindings for any programming language and platform, thus, to make it possible to develop distributed applications (DApps) for any possible use-cases, such as: mobile DApps, web DApps, server-side DApps, enterprise DApp etc.

Client Library exposes all the functionality through a few of exported functions. All interaction with library is performed using JSON-RPC like protocol.

Library works over GraphQL API of Evernode Platform. So, it can be used to interact directly with Evercloud, local blockchain Evernode-SE or Community version Dapp Server.

## [Library Source Code](https://github.com/tonlabs/ever-sdk)

**Get quick help in our telegram channel:**

[![Channel on Telegram](https://img.shields.io/badge/chat-on%20telegram-9cf.svg)](https://t.me/ever\_sdk)

## Library documentation

Via following [**this link**](https://github.com/broxus/ton-wallet-api) you can find all necessary information concerning the interaction and configuration with Ton wallet API.  


>  The documentation in Everscale repository is a community effort. Therefore, everyone can contribute with proposals for new topics, suggest new content elements, participate in editing, and provide ideas that will be of great help for network development.
Please be informed that our documentation can be [edited via GitHub](https://github.com/everscale-org/docs/issues).  
  Also please make sure to consult our rules and rewards policy via [this link](https://docs.everscale.network/contribute/hot-streams/documentations).  
  Feel free to join [Everscale Documentation Development Telegram chat](https://t.me/+C2IpQXWZtCwxYzEy) and [Everscale Developers Onboarding Telegram chat](https://t.me/+Vca1Gs6uPzIyNWVi)!
