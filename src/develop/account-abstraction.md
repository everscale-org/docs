---
sidebar_position: 2
title: "Account Abstraction"
---

## On the differences between Ethereum and Everscale approaches to Account Abstraction

The EIP-4337, also known as an Account Abstraction (AA) was recently deployed on the Ethereum mainnet. In the Everscale blockchain, we believe in the idea of AA as a key enabler for extended wallet functionality, better security, and UX. 

However, due to the desire to deploy it without changes to the core protocol, the original Ethereum AA design is a bit complicated and comes with a separate alt-mempool, bundler nodes, and EntryPoint contract. 

Everscale comes with natively built-in "AA batteries", which makes the dev experience with AA much easier to pick up, especially for newbies. Let's dive deeper into how Everscale's AAs work.

### No AA and EOA. Just A

The Value, be it a native coin or TIP-3 token, can only flow as an effect of smart contract code execution. For us, the notion of EOA shouldn't exist per se, and all Accounts are "abstract". 

### Lifecycle of an Account

The Account is deployed with some initial state (code + data). 

The TVM comes with instructions to access and modify Accounts' code, state, send Messages, deploy new Accounts, and more.

Executing the code in the TVM is invoked by an inbound Message. Both Account-to-Account and User-2-Account Messages are possible. 

### No EntryPoint

Users interact with Accounts via sending External Messages. They also may want to use key pairs or session keys to authorize External Messages. As there are no EOAs, all External Messages carry no value. 

When External Message is processed by an Account, the TVM gives some small portion of "credit gas". The developer can use it to perform certain logic before accepting a Message. 

Using the Accounts' own balance requires the "accept" to be done explicitly with a corresponding TVM instruction.

To reject the External Message, an Account should just not accept it. Rejected External Messages are never included in blocks. 

Thus, each Account is an EntryPoint itself.

### Content Addressable Account Spaces

Each Account is content-addressable: the Account address is deterministically derived from its initial code and state.

Imagine A1 sends the Message to A2. If such a message includes A1's initial data, A2 can check if A1 has the same code. For that, it will take its own initial code + A1's data and derive the expected address for A1. 

This approach to auth enables developers to build secure systems with address-based access control rules without the need to maintain access control lists explicitly.

### Upgradeability 

On EVM, to implement upgradeability for a given A1 you need to deploy at least one additional A2 for your A1. Each upgrade will require at least 1 new Account to be deployed. This approach is well-adopted and known as **Upgradeable Proxy Pattern**.

On TVM, there is `SETCODE` instruction, which allows Account to upgrade itself with any code, that it can take from inbound Message, or its own storage. Accounts' address remains unchanged, and the Upgrade requires no extra deployments.

### Smart Contract Wallets

One of the key motivations for AA is to put the ownership model in the developers' hands to implement (code is a law).

With greater power comes great responsibility, and cooking AAs right is important. The best practices and audited templates for AAs are yet to come into the EVM ecosystem.

At Everscale, there is a [formally verified implementation](https://github.com/EverSurf/multisig2) for singlesig / multisig + the Upgradable version, that enables one to build any logic and plug it on top (keeping the address unchanged)