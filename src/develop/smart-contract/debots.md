# DeBots

> EverX DeBots Github repository https://github.com/tonlabs/debots

# Table of Content
- [Table of Content](#table-of-content)
- [What is a DeBot?](#what-is-a-debot)
  - [Basic terms](#basic-terms)
  - [DeBot interfaces](#debot-interfaces)
- [Prerequisites](#prerequisites)
    - [everdev](#everdev)
    - [Tonos-cli](#tonos-cli)
- [DeBots](#debots)
- [How to try DeBot](#how-to-try-debot)

# What is a DeBot?

DeBot (Decentralized Bot) is an intuitive, no-prior-knowledge-required interface for smart
contracts on TON Blockchain.

Blockchain technology is complex and can be hard to learn for users without experience in the field or a technical background. With DeBots we aim to simplify the interactions required to achieve a user’s goals on the blockchain, and streamline the development process of blockchain-based services, while maintaining the level of security expected of such products.

At its most basic a DeBot is a secure chat-based interface that allows a user to interact with a smart contract on the blockchain and access its various functions in the form of a dialogue.

## Basic terms

- **DeBot** - a smart contract facilitating conversation-like flow communication with a target smart contract.
- **Target smart contract** - a smart contract for which DeBot is created. DeBot is an interface to this smart contract.
- **DeBot browser** - a program that executes DeBot and parses its answer using DeBot protocol.
- **DeBot protocol** - a set of rules describing the communication between browser and DeBot: how to call DeBot functions and how to interpret its answers.

DeBot is deployed to the blockchain. DeBot browser runs on client. It downloads DeBot code and runs it inside the engine.

## DeBot interfaces

To fulfill their functions as a user interface DeBots must be able to facilitate a number of interactions between the user, the user's device and the target smart contract on the blockchain:

- receive input from users;
- query info about other smart contracts;
- query transactions and messages;
- receive data from external subsystems (like file system) and external devices (like NFC, camera and so on);
- call external function libraries that allow to do operations that are not supported by VM. For example, work with json, convert numbers to string and vice versa, encrypt/decrypt/sign data.

These needs are covered in various DeBot Interfaces (DInterfaces) which can be used in DeBots and which must be supported in DeBot Browsers.

To use an interface DeBot should import source file with DInterface declaration and call its methods as any other smart contract methods in TON - by sending internal messages to interface address, which is unique and explicitly defined for every interface.

Every DInterface must be discussed and accepted by DeBot Interface Specifications (DIS) Consortium before it can be used in DeBots. All accepted interfaces are published in the repo:

[https://github.com/tonlabs/DeBot-IS-consortium](https://github.com/tonlabs/DeBot-IS-consortium)

Also you can check [DeBot-is-consortium Everscale Documentation page](../../learn/decentralization/debot-consortium.md)

# Prerequisites

### everdev

To build DeBots install [`everdev`](https://github.com/tonlabs/everdev):

```bash
npm install -g everdev
```

### Tonos-cli

To run and debug debots install [`tonos-cli`](https://github.com/tonlabs/tonos-cli):

Note: minimal required version >= 0.11.4.

Install using `everdev`:

```bash
everdev tonos-cli install
```

Or download binaries from here:

- `linux` [http://sdkbinaries.tonlabs.io/tonos-cli-0_11_4-linux.zip](http://sdkbinaries.tonlabs.io/tonos-cli-0_11_4-linux.zip)
- `macos` [http://sdkbinaries.tonlabs.io/tonos-cli-0_11_4-darwin.zip](http://sdkbinaries.tonlabs.io/tonos-cli-0_11_4-darwin.zip)
- `windows` [http://sdkbinaries.tonlabs.io/tonos-cli-0_11_4-win32.zip](http://sdkbinaries.tonlabs.io/tonos-cli-0_11_4-win32.zip)


# DeBots

- [`helloworld`](https://github.com/tonlabs/debots/tree/main/helloworld) - Hello World DeBot. Can be used as a template for new DeBots.
- [`multisig`](https://github.com/tonlabs/debots/tree/main/multisig) - DeBot for multisignature wallet. Uses several basic DeBot interfaces: Terminal, AddressInput, AmountInput, ConfirmInput. It supports all functions of the multisig wallet contract, such as submitting and confirming transactions and viewing wallet information.

# How to try DeBot

You can start by trying out [`multisig`](https://github.com/tonlabs/debots/tree/main/multisig) DeBot. It's already deployed to [net.ton.dev](http://net.ton.dev) and can be called through any DeBot browser that supports it.

To try it out in TON Surf, go to https://beta.ton.surf/

To try it out in `tonos-cli` call:

```bash
./tonos-cli --url net.ton.dev debot fetch 0:09403116d2d04f3d86ab2de138b390f6ec1b0bc02363dbf006953946e807051e
```

If you do not have a multisig wallet to try it out with, you can use the following test wallet address and seed phrase:

```bash
address: 0:5d3d540ebeb545be95ad05e22efc0ad3cb2e0172884fba2cedfde445ef16ebf9
seed phrase: final axis aware because grace sort giant defy dragon blouse motor virus
```

> Please don't empty out its balance, so others can try it out too.
