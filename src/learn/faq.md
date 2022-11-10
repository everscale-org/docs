---
title: Everscale FAQ
sidebar_position: 5
---

# FAQ

Welcome to the FAQ page.

Here you will find answers to the most common questions that arise when getting to know Everscale.

## What is Everscale?

**Everscale** is a peer-to-peer multi-blockchain system. It is a new and unique blockchain design that proposes a scalable decentralized world computer, paired with a distributed operating system — [Ever OS](../arch/00-ever-os.md).

## Why Everscale?

It is important to understand that Everscale, unlike many other new networks, does not aim to create a second Ethereum.

Even at the design stage, Everscale took into account the errors and shortcomings of the Ethereum architecture, thanks to which Everscale is now a truly unique blockchain.

Consider its main advantages:

- Record speed, reliability, and thoughtful [architecture](../arch/).
- [Smart contracts](../develop/smart-contracts/) can perform operations on different nodes, which allows the blockchain to scale ([sharding](../arch/10-basics.md/#blockchain-structure)) and increases the speed of smart contract execution to an absolute record.
- Everscale is an asynchronous blockchain that is flexible in software development and rich in languages. You can write smart contracts in C ++, Solidity, and other high-level programming languages for your projects. Everscale has already implemented wallets, bridges, decentralized bots and exchanges, NFTs.

It is also a promising and decentralized [ecosystem](../ecosystem/explore/projects.md), each participant of which can offer the community an idea for development, competition, or partnership.

## Everscale blockchain explorer

> **Blockchain explorer** is a tool that allows you to track and view blocks, messages, transactions and other information contained in the network.

Currently available blockchain explorers for use:

- [Evescan.io](https://everscan.io) by [Broxus](https://broxus.com)
- [Ever.live](https://ever.live) by [EverX](https://everx.dev/)

## How does Everscale works?

To understand the basic principles and mechanisms of Everscale, we recommend that you familiarize yourself with the following sections of the documentation:

- [Architecture section](../arch/)
  - ( [Blockchain basics](../arch/10-basics.md), [fee calculation](../arch/20-fee-calculation.md), [security](../arch/90-security.md), [account](../arch/40-accounts.md), [messages](../arch/50-message.md), [EVER OS](../arch/00-ever-os.md), etc.)
- [Decentralization section](../learn/decentralization/)
- [Smart Contracts section](../develop/smart-contracts/)
  - [Introduction](../develop/smart-contracts/01-introduction.md)
  - [DeBots](../develop/debots/getting-started.md)
- [Standards section](../standard/)

## What is EVER?

**EVER** - is the native coin of Everscale blockchain, unique blockchain design that proposes a scalable decentralized world computer, paired with a distributed operating system. EVER is the token that captures the value of all community sponsored projects, therefore optimized for a value capturing, it also used for network usage fee payments. It has a max supply of ~2 billion EVER coins. 

### **Wrapped EVER** 

EVER is a cryptocurrency that runs on blockchain, but different blockchains have different functions, features, and protocols. Because of this difference, EVER is not able to interact with other blockchains. While this increases the security of a blockchain-based digital asset, it creates immense difficulties for the development of an interoperable exchange or system of cryptocurrencies where the data of one crypto gets transferred into another crypto. However, for decentralized finance to exist, the exchange of information from one to another cryptocurrency is crucial. This is where Wrapped EVER comes in. In simple words, WEVER represents a cryptocurrency based on a separate blockchain and is worth the same, but can be used on non-native blockchains and later, redeemed for the original cryptocurrency. Putting it in reference, Wrapped EVER (wEVER) is a digital token that has the same value as one EVER but is based on TIP-3 standard, which makes it usable on the Decentralised Finance ecosystem. WEVER is also available on ETH and BNB (BSC) networks, which makes it usable on the Decentralized Finance ecosystem.

Contracts of EVER (Wrapped EVER):

TIP-3: [0:a49cd4e158a9a15555e624759e2e4e766d22600b7800d891e46f9291f044a93d](https://everscan.io/accounts/0:a49cd4e158a9a15555e624759e2e4e766d22600b7800d891e46f9291f044a93d)
Ethereum: [0x29d578CEc46B50Fa5C88a99C6A4B70184C062953](https://etherscan.io/token/0x29d578CEc46B50Fa5C88a99C6A4B70184C062953)
BNB Smart Chain: [0x0A7e7D210C45c4abBA183C1D0551B53AD1756ecA](https://bscscan.com/token/0x0A7e7D210C45c4abBA183C1D0551B53AD1756ecA)

### Use-cases

- Cross-chain transaction fees. 

Using the cross-chain bridge [Octus Bridge](https://octusbridge.io), it is possible to transfer crypto-assets between Everscale, Ethereum, BNB Chain (Binance Smart Chain), Fantom Opera, Polygon, Avalanche, Milkomeda networks and pay commission in EVER.

- [Validating](../validate/) 

Validators stakes required to maintain the blockchain. To raise a validator node in the Everscale network, a Validator will need to purchase EVERs to provide a stake, as well as acquire a server that will withstand the projected loads due to block validation.

- Participation in DAO. 

Using [EVER DAO](https://everdao.net), a new decentralized governance mechanism that brings users into the fold on decisions that affect the entire Everscale ecosystem. Any user can stake their wEVER on the platform to submit proposals and vote on proposals submitted by others.

- Payment for services. 

Many apps and bots use EVER, for example, you can pay Combot subscription, play PokerTON, etc.

## How can i store and trade EVER?

For storing your TIP-3 tokens you need to use appropriate wallets - check out the [wallets section](../ecosystem/explore/wallets.md). 

To buy EVER you can use [exchange wallets](../ecosystem/explore/wallets.md), [CEX](../ecosystem/explore/projects.md/#exchanges) (centralize exchanges) or [DEX](../ecosystem/explore/projects.md/#defi) (decentralize exchanges).

## What are the Everscale earning opportunities?

### Earning EVERs

#### [Staking](../validate/staking.md)

In Everscale, here is [DePool](https://everpools.io/), which is a specialized smart contract that collects stakes from various participants to be pooled together and forwarded as one stake to the Elector on behalf of a validator node. The validator node owner supports the DePool providing a guaranteed minimal stake, and allowing smaller token holders to participate in and benefit from validation. The owner's benefit, in turn, is the increased stake for their node. Stake collection is continuous. Stakes can be made at any time, and will be distributed to whichever round is currently in the pooling stage. Every time an election begins on the blockchain, the accumulated pool is locked and staked in this election, and the pooling stage of the next round begins.

#### [Farming](https://app.flatqube.io/farming)

Yield-farming is an increasingly popular product in many various DeFi protocols, and Everscale is no different in this respect! Similar to staking, farming income is expressed as a percentage per year, and is added to your tokens as long as they are locked into a farming pool. These farming pool consist of LP tokens (Liquidity provider tokens) which are obtained through providing liquidity to the exchange pools in their respective pairs. Depending on which tokens are paired for farming, the amount of income can vary greatly. Generally speaking, pairs with better known coins and stable tokens offer a lower percentage yield than those pairs with less known tokens. The income indicator for the year is APR and is expressed as a percentage.

#### [Grants](../develop/hackathons-grants.md)

Everscale Grants is a new method of funding teams to develop Everscale blockchain that has come to replace contests. Grants aim to help promising IT startups launch and onramp into the Everscale ecosystem. In a word, the program was successful. Take a look for yourself at the results. A total of 17 projects were interviewed as part of the project. Of those 17, 8 of the best and brightest were selected to be part of the project. As of right now, the elite 8 are going through DD procedures and more technical interviews as partnership terms are being negotiated. You’ll be able to read the full details about each participant once all of the procedures have been completed and partnership terms have been agreed upon. While DeFi is our thing, the projects that are involved with the grants program come from all different sectors and stand to add some diversity to the Everscale ecosystem. In the first round, Everscale had projects from GameFi, the NFT space, DeFi, AML and the crypto news sphere apply. Everscale Grants campaign has grand pool of 15 000 000 EVERs.

#### [Validation](../validate/)

## What about validation process?

Everscale validator is a network node (server) that participates in the validation of generated new blocks of the blockchain. These nodes are selected as validators for a certain period (validation cycle), during which they participate in validation together. Validation is the signing of blocks by several nodes in order to reach a consensus (general agreement) on the correctness of the block. The very procedure of reaching consensus is necessary for the network to ensure the reliability of its functioning, that is, resistance to failures of individual nodes or deliberate attacks.

In fact, validators provide the basis for the functioning of a decentralized network. For their work, they receive remuneration consisting of a processing fee (1,7 EVER for a new block in the masterchain, 1 EVER for a new block in the shardchain), as well as from the emission of new tokens distributed to validators. In the current network parameters, the emission is fixed at the level of ~0.5% per year. It is distributed each validation cycle to all validators in proportion to their stakes.

> Check out the [Validation section](../validate/) for more information. 

## What can I do as a developer?

Since Everscale is quite a young network, there are a lot of opportunities for developers here: [hachatons and grants](../develop/hackathons-grants.md), [Smart Contracts](../develop/smart-contracts/) developing, [DAO](https://everdao.net), etc.

Check out the [developer section](../develop/) to learn more.

## How to contribute to Everscale?

Since Everscale was created on the principles of decentralization, the management and development of the network is completely decentralized with the help of a community where each participant can contribute, through DAOs, grants, making improvements to the network documentation, etc.

Go to the [Contributing section](../ecosystem/contribute/) and see the main features of Everscale's self-improvement

## How to integrate with Everscale?

Everscale is open to everything new, including integrations with other projects, teams and products.
You can add EVER to your exchange, integrate your network into Octus Bridge, etc.

For a detailed introduction to integration options and their implementation, see the [Integration section](../develop/integrate/).

## What about Everscale ecosystem?

Check out the [Projects section](../ecosystem/explore/projects.md).

