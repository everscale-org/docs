---
sidebar_position: 0
---

# Overview

## Introduction

Before you start developing or integrating anything into Everscale, we would like to tell you about the tools and environment that you will use in your work.

First of all, it is worth noting that Everscale is really a decentralized blockchain, not only from a technical point of view, but also from a management side, so the key tools and approaches to development may differ from different teams, technical contributors on the network.

At the moment, there are two active companies of technical contributors in Everscale network:

[EverX](https://everx.dev/about)

[Broxus](https://broxus.com/)


And it is their solutions and tools that you will use when developing, while you will have every opportunity to write your own solutions as well, if necessary or desired.

## APIs and Client Libraries for Everscale Access

- [EVER SDK](https://docs.everos.dev/ever-sdk/) (by EverX) - Core Client Library built on the EVER OS GraphQL API for Everscale DApp development

- [GraphQL API](./gql-api) (by EverX) - Mainnet validating node with a GraphQL server that allows you to collect a large amount of data about the network.
*Suitable for integration by exchanges and other platforms.

- [ever-sdk-js](./js-api/ever-sdk-js.md) (by EverX) - EverX Web3 Javascript library that works on top of GraphQL API - is a binding over [core Rust ever-sdk library](https://github.com/tonlabs/ever-sdk).
It allows Everscale developers work with contracts and query data from GraphQL API. 

- [everscale-inpage-provider](./js-api/inpage-provider.md) (by Broxus) - Web 3.0 library for Everscale. Typed wrappers over contracts etc.

- [Rust Core Library](rust-api.md) (by EverX) - provides Everscale developers with services on top of scalable blockchain infrastructure, so that developers can focus on business logic instead of infrastructure maintenance.

- [Other Languages](other-lang.md) (by EverX) - Community bindings over Rust Core Library. 
