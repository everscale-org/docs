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

## Solutions for configuring and running nodes

- [Evernode DS](evernode-ds.md)(by EverX) - Client Node with GraphQL API that allows you to collect a large amount of data about the network.
*Suitable for integration by exchanges and other platforms.

- [Ever Cloud](evercloud.md) (by EverX) - provides Everscale developers with services on top of scalable blockchain infrastructure, so that developers can focus on business logic instead of infrastructure maintenance.

- [TON Wallet API](ton-wallet-api.md)(by Broxus) - a non-validating node with a built-in wallet for convenient integration with exchanges and other projects.

- [TON Kafka Producer](ton-kafka.md)(by Broxus) - a non-validating node that writes blockchain data to Kafka. It can be used for further work with data in the required format and location. This node is lighter than Evernote DS.

- [TON Indexer](ton-inderxer.md)(by Broxus) - the solution is in the form of RUST libraries for building your own variation of the Everscale node. For example, with the help of this solution, nodes TON Wallet API, TON Kafka Producer and a number of other nodes are made.
