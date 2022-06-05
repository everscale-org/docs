---
sidebar_position: 0
---

# Overview

## Introduction

Before you start developing or integrating anything into Everscale, we would like to tell you about the tools and environment that you will use in your work.

First of all, it is worth noting that Everscale is really a decentralized blockchain, not only from a technical point of view, but also from a management side, so the key tools and approaches to development may differ from different teams, technical contributors on the network.

At the moment, there are two active companies of technical contributors in Everscale network:

[Broxus](https://broxus.com/)

[EverX](https://everx.dev/about)

And it is their solutions and tools that you will use when developing, while you will have every opportunity to write your own solutions as well, if necessary or desired.

## Tools

Solutions for configuring and running nodes:

- [Evernode DS](evernode-ds.md)(by EverX) - Mainnet validating node with a GraphQL server that allows you to collect a large amount of data about the network.
*Suitable for integration by exchanges and other platforms.

- [Evernode NQ](evernode-nq.md)(under development, beta version by EverX) - a solution for delivering encrypted messages from the blockchain to end-users. The solution ensures that neither the sender nor the "man in the middle'' can decrypt messages or match which smart contracts (e.g. wallets) belong to which recipient.

- [Ever Cloud](ever-cloud.md) (by EverX) - provides Everscale developers with services on top of scalable blockchain infrastructure, so that developers can focus on business logic instead of infrastructure maintenance.

- [TON Wallet API](ton-wallet-api.md)(by Broxus) - a non-validating node with a built-in wallet for convenient integration with exchanges and other projects.

- [TON Kafka Producer](ton-kafka.md)(by Broxus) - a non-validating node that writes blockchain data to Kafka. It can be used for further work with data in the required format and location. This node is lighter than Evernote DS.

- [TON Indexer](ton-inderxer.md)(by Broxus) - the solution is in the form of RUST libraries for building your own variation of the Everscale node. For example, with the help of this solution, nodes TON Wallet API, TON Kafka Producer and a number of other nodes are made.

Solutions and tools for interaction with blockchain:

- Graph QL Server (by EverX) - is a major [Everscale Operating System](../../arch/00-ever-os.md) component that provides API and runtime to access Everscale Blockchain, learn documentation before starting.

- [SDK](api-sdk/sdk/)(by EverX) - GraphQL API goes along with SDK that helps one to create messages, handle network issues and implement any possible use-case over this API.

- [TONOS CLI](tonos-cli.md)(by EverX) - is a multi-platform command line interface for Ever OS. It allows you to work with keys and seed phrases, deploy contracts, call any of their methods, generate and broadcast messages. It supports specific commands for DeBot(текст-ссылка на страницу DeBot), DePools(текст-ссылка на страницу DePools в Validate) and Multisig contracts, as well as a number of supplementary functions.

- [Everscale Inpage Provider](inpage-provider.md)(by Broxus) - Web 3.0 library for Everscale. Typed wrappers over contracts etc.

Other useful tools for developers:

- [Locklift](locklift.md)(by Broxus) - development environment, analogous to Hardhat.

- [TestSuite4](everdev/command-line-interface/testsuite4.md)(by EverX) - a framework designed to simplify development and testing of Everscale Contracts. It contains a lightweight blockchain emulator making it easy to develop contracts in a TDD-friendly style.

- [Signer Tool](signer-tool.md)(by EverX) - centralized place where you can store your development keys.

- [Ever.bytie.moe](ever-bytie.md)(by Broxus) - smart contracts interaction playground.

- [Network Tool](network-tool.md)(by EverX) - a convenient way to organize all of your network configurations in one place.

- [Contract management](contract-management.md)(by EverX) - tool to easily deploy and run your smart contracts on blockchain network(s).