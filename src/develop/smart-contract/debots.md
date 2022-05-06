# DeBots

> EverX DeBots Github repository https://github.com/tonlabs/debots

## What is a DeBot?

DeBot (Decentralized Bot) is an intuitive, no-prior-knowledge-required interface for smart contracts on Everscale Blockchain.

Blockchain technology is complex and can be hard to learn for users without experience in the field or a technical background. With DeBots we aim to simplify the interactions required to achieve a user’s goals on the blockchain, and streamline the development process of blockchain-based services, while maintaining the level of security expected of such products.

At its most basic a DeBot is a secure chat-based interface that allows a user to interact with a smart contract on the blockchain and access its various functions in the form of a dialogue.

## Basic terms

- **DeBot** — a smart contract facilitating conversation-like flow communication with a target smart contract.
- **Target smart contract** — a smart contract for which DeBot is created. DeBot is an interface to this smart contract.
- **DeBot browser** — a program that executes DeBot and parses its answer using DeBot protocol.
- **DeBot protocol** — a set of rules describing the communication between browser and DeBot: how to call DeBot functions and how to interpret its answers.

DeBot is deployed to the blockchain. DeBot browser runs on client. It downloads DeBot code and runs it inside the engine.

## DeBot interfaces

To fulfill their functions as a user interface DeBots must be able to facilitate a number of interactions between the user, the user's device and the target smart contract on the blockchain:

- receive input from users;
- query info about other smart contracts;
- query transactions and messages;
- receive data from external subsystems (like file system) and external devices (like NFC, camera and so on);
- call external function libraries that allow to do operations that are not supported by VM. For example, work with json, convert numbers to string and vice versa, encrypt/decrypt/sign data.

These needs are covered in various DeBot Interfaces (DInterfaces) which can be used in DeBots and which must be supported in DeBot Browsers.

To use an interface DeBot should import source file with DInterface declaration and call its methods as any other smart contract methods in Everscale — by sending internal messages to interface address, which is unique and explicitly defined for every interface.

Every DInterface must be discussed and accepted by DeBot Interface Specifications (DIS) Consortium before it can be used in DeBots. All accepted interfaces are published in [DeBot Interface Specifications Consortium](../../learn/decentralization/debot-consortium.md).

## Prerequisites

To build DeBots install [`everdev`](https://github.com/tonlabs/everdev):

```bash
npm install -g everdev
```

To run and debug DeBots install [`tonos-cli`](https://github.com/tonlabs/tonos-cli):

:::note
For run DeBots **required** `tonos-cli` version >= `0.11.4`.
:::

Install using `everdev`:

```bash
npx everdev tonos-cli install
```

or

```bash
npx everdev tonos-cli set --version 0.26.2
```

Or download binaries from here:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="linux" label="Linux" default>

[http://sdkbinaries.tonlabs.io/tonos-cli-0_26_2-linux.zip](http://sdkbinaries.tonlabs.io/tonos-cli-0_26_2-linux.zip)
  </TabItem>
  <TabItem value="macos" label="MacOS">

[http://sdkbinaries.tonlabs.io/tonos-cli-0_26_2-darwin.zip](http://sdkbinaries.tonlabs.io/tonos-cli-0_26_2-darwin.zip)
  </TabItem>
  <TabItem value="windows" label="Windows">

[http://sdkbinaries.tonlabs.io/tonos-cli-0_26_2-win32.zip](http://sdkbinaries.tonlabs.io/tonos-cli-0_26_2-win32.zip)
  </TabItem>
</Tabs>

## DeBots

- [`Hello`](https://github.com/tonlabs/debots/tree/main/helloworld) — Hello World DeBot. Can be used as a template for new DeBots.
- [`Multisig`](https://github.com/tonlabs/debots/tree/main/multisig) — DeBot for multi-signature wallet (multisig). Uses several basic DeBot interfaces: Terminal, AddressInput, AmountInput, ConfirmInput. It supports all functions of the multisig wallet contract, such as submitting and confirming transactions and viewing wallet information.
- [`DEvergence`](https://github.com/everscale-contest/hackathon2022-tezos-DEvergence) — DeBot for the Ever Surf App which the user employs to connect to a Tezos wallet and transact. DeBots are smart contracts with a chat interface similar to those on Telegram.

## How to try DeBot

You can start by trying out [`multisig`](https://github.com/tonlabs/debots/tree/main/multisig) DeBot. It's already deployed to [net.ever.live](https://net.ever.live/) and can be called through any DeBot browser that supports it.

To try it out in Ever Surf, go to https://ever.surf/ or in `tonos-cli` call:

### DeBot `DEvergence`

```bash
tonos-cli config --url eri01.net.everos.dev
tonos-cli debot fetch 0:38a53a8bff83c57b6334f369d5ff678bdaa2b8e229d9b5552dfdda2b4d90cf92
```

or in Ever Surf [0:38a53a8bff83c57b6334f369d5ff678bdaa2b8e229d9b5552dfdda2b4d90cf92](https://uri.ever.surf/debot/0:38a53a8bff83c57b6334f369d5ff678bdaa2b8e229d9b5552dfdda2b4d90cf92?net=devnet)

### DeBot `Multisig`

```bash
tonos-cli config --url eri01.net.everos.dev
tonos-cli debot fetch 0:c69a0ed4a11b467ec1a981f29139dc3ff6af47eeacd2cd93e67a6cfc6f771cfb
```

or in Ever Surf [0:c69a0ed4a11b467ec1a981f29139dc3ff6af47eeacd2cd93e67a6cfc6f771cfb](https://uri.ever.surf/debot/0:c69a0ed4a11b467ec1a981f29139dc3ff6af47eeacd2cd93e67a6cfc6f771cfb?net=devnet)

If you do not have a multisig wallet to try it out with, you can use the following test wallet address and seed phrase:

```bash
address: 0:66e01d6df5a8d7677d9ab2daf7f258f1e2a7fe73da5320300395f99e01dc3b5f
seed phrase: final axis aware because grace sort giant defy dragon blouse motor virus
```

> Please don't empty out its balance, so others can try it out too.
