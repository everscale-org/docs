---
sidebar_position: 0
---

# Overview

## Introduction

Before you start developing or integrating anything into Everscale, we would like to tell you about the tools and environment that you will use in your work.

First of all, it is worth noting that Everscale is really a decentralized blockchain, not only from a technical point of view, but also from a management side, so the key tools and approaches to development may differ from different teams, technical contributors on the network.

At the moment, there are two active companies of technical contributors in Everscale network:

- [EverX](https://everx.dev/about)
- [Broxus](https://broxus.com/)


And it is their solutions and tools that you will use when developing, while you will have every opportunity to write your own solutions as well, if necessary or desired.

## Tools

### Set up Development Environment

- [Everdev](https://github.com/tonlabs/everdev)(by EverX) - CLI tool and Javascript package that helps set up all the core developer tools and work with Everscale blockchain from a single interface

### Interaction with blockchain

- [TONOS CLI](tonos-cli.md)(by EverX) - is a multi-platform command line interface for Ever OS. It allows you to work with keys and seed phrases, deploy contracts, call any of their methods, generate and broadcast messages. It supports specific commands for [DeBot](../debots/getting-started.md), [DePools](../../validate/depools/getting-started.md) and Multisig contracts, as well as a number of supplementary functions.

### Tools for contract developers:

- [Everdev](https://github.com/tonlabs/everdev) (by EverX) - helps manage keys and networks and local testing blockchain, and compile, deploy and call contracts from CLI or from Javascript with a convenient API. 

- [Evernode-SE](https://github.com/tonlabs/evernode-se) - local blockchain for contract and Dapp testing, exposing GraphQL API. Can be managed from [everdev](https://github.com/tonlabs/everdev).

- [Locklift](locklift.md) (by Broxus) - development environment, analogous to Hardhat.

- [TestSuite4](everdev/command-line-interface/testsuite4.md) (by EverX) - a framework designed to simplify development and testing of Everscale Contracts. It contains a lightweight blockchain emulator making it easy to develop contracts in a TDD-friendly style.

- [Ever.bytie.moe](ever-bytie.md) (by Broxus) - smart contracts interaction playground.
