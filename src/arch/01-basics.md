---
title: Basics
description: Introduction to understand the basic terminology and concepts
---

# Basics of Everscale Blockchain

Read this short introduction to understand the basic terminology and concepts of Everscale

## Blockchain structure

At the moment blockchain consists of 2 `workchains`. One of them (`-1`), so-called `masterchain`, is needed for service contracts and validator contracts, another one (`0`) is for simple users. In the future, it is possible to add more simple workchains (`1`, `2`, etc) to the blockchain.

In turn, `workchain` is splitted into shards (so-called shardchains). When the load is low there are 16 shards, when it increases shards split and when decreases they merge.

Blockchain is validated by validators. Part of them validate masterchain, others are splitted into groups and validate shardchains. Periodically global set of validators changes with elections. Within one election cycle shardchain validators rotate as well.

## Account (contract)

Account (contract) is identified by its full address consisting of `workchain` and ID. Full information about Account is stored in its state.  Account can have some balance, a place for its `code`, place for its `data` and many other fields.

It can have 1 owner, many owners and no owners at all.

Account ID is calculated during deploy from its initial code and data.

### About deploy

Deploy — placing `code` of the account into blockchain.

You can not deploy  account's `code`  if its balance is empty because deploy is paid out of that money. This is why any deploy operation must begin with sponsoring the account with some tokens.

Because account's ID is unequivocally calculated from `code` and `data`, this calculation can be done before actual deploy.

### About address

Address is calculated from initial contract's code and data, that is attached to the deploy message.

When contract performs `SETCODE` operation, its address does not change.

To calculate the contract address, you need to know its code and its initial data (public key of the owner is also stored in data).

### About money transfer

Money can be transferred from one account to another only by execution of the account's code. Do not transfer money to the addresses where you can not deploy code because they will stay there forever.

### About commissions

There are several types of fees for operations with contracts.

For example, commission for storage, for execution, for message delivery.

Read more about them here [Fee calculation details](03-fee-calculation.md).

### About get methods

Get method is a method of the contract which doesn't change contract state, thus can be executed locally on the client's machine for free.

What shard my account is in right now?
Account shard is defined by the first bits of its address and the current list of shards.

Encode hex shard prefix to binary format, discard the most right 1. You just got the shard mask. Put this mask on top of account address, if the bits are equal — the account is in this shard.

Account can change its shard depending on the load of the network. So before calculating account's shard check the current list of shards.

## Message

All interactions in Free TON are performed via messages.

External inbound messages help deploy and call contracts from outside.

Internal messages allow contracts to communicate with each other.

External outbound messages are the events the contracts produce for the outside world. Use them to implement some off-chain logic — subscribe for these messages and perform some off-chain actions whenever you receive them.

For example, simple value transfer can be initiated with an external inbound message (by a human or some service) or with internal message from another contract. This message will produce a transaction (read below) and an internal message with value transfer.

## Transaction

Transaction is the result of contract execution.

In general transaction is generated with one incoming message (external or internal) and can generate several outcoming messages (external or internal) as a result.

Transaction can be successful or aborted.

For example, simple value transfer consists of 2 transactions — Sender's transaction which generated  an internal message with value transfer, and Recipient's transaction where it received the message with value and updated its balance.

## BOC (Bag of cells)

Is a universal format for data packaging in Free TON. Every object — account, transaction, message, block are stored in blockchain database as bocs. By the way, boc of the block includes bocs of all messages and transactions that were executed in this block inside of it.

## TVM

Ton Virtual Machine. Turing complete virtual machine for contract code execution. It works with data represented in boc format. TVM itself does not calculate any commissions and can be used on client side for running get methods of the contracts. TVM is used for debot engine execution on client side as well.

Also, TVM is used on validators together with higher level protocols, such as Transaction Executor, to additionally calculate commissions and perform other necessary checks

## Transaction Executor

Take results of TVM, calculate fees, checks balance and other things. Used by validators to validate blocks. Can also be used on the client side to debug contract execution.
