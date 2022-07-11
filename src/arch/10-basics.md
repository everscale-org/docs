---
title: Basics
description: Introduction to understand the basic terminology and concepts
sidebar_position: 0
---

# Basics of Everscale Blockchain

## Blockchain structure

At the moment, blockchain consists of 2 workchains. One of them (-1), a so-called masterchain, is needed for service contracts and validator contracts, another one (0) is for simple users. In the future, it is possible to add more simple workchains (1, 2, etc) to the blockchain.

In turn, a workchain is split into shards (so-called shardchains). When the load is low, there are 16 shards. When it increases, shards split and when they decrease they merge.

Blockchain is validated by validators. Part of them validate masterchain, others are split into groups and validate shardchains. Periodically, the global set of validators changes with elections. Within one election cycle, shardchain validators rotate as well.

## Account (contract)

An account (contract) is identified by its full address consisting of a workchain and ID. Full information about the Account is stored in its state.    
An account can have some balance, a place for its code, a place for its data and many other fields. 
It can have 1 owner, many owners and no owners at all.  
Account ID is calculated during deploy from its initial code and data.

In order to learn what Accounts are in detail, please follow [this page](40-accounts.md).

### About deploy

Deploy — placing the code of the account onto the blockchain.

You can not deploy an account's code if its balance is empty because deploy is paid out of that money. This is why any deploy operation must begin with sponsoring the account with some tokens.

Because the account's ID is unequivocally calculated from code and data, this calculation can be done before the actual deploy.

### Address

An Address is calculated from the initial contract's code and data that is attached to the deploy message.

When a contract performs SETCODE operation, its address does not change.

To calculate the contract address, you need to know its code and its initial data (public key of the owner is also stored in the data).

### About digital assets transfers 

Digital assets can be transferred from one account to another only by execution of the account's code. 

DO NOT transfer digital assets to the addresses where you can not deploy code because it will stay there forever.

About fees

There are several types of fees for operations with contracts.

For example, commission for storage, execution, and message delivery.

Please follow [this page](30-fee-calculation.md) for Fee calculation details. 

### About get methods

Get method is a method of the contract which doesn't change its state, so it can be executed locally on the client's machine for free.

What shard my account is in right now? An account shard is defined by the first bits of its address and the current list of shards.

Encode the hex shard prefix to binary format, discard the most right 1. You just got the shard mask. Put this mask on top of the account address, if the bits are equal — the account is in this shard.

An account can change its shard depending on the load of the network. So, before calculating an account's shard, check the current list of shards.

## Message

All interactions in Everscale are performed via messages.

External inbound messages help deploy and call contracts from outside.

Internal messages allow contracts to communicate with each other.

External outbound messages are the events the contracts produce for the outside world. Use them to implement some off-chain logic — subscribe for these messages and perform some off-chain actions whenever you receive them.

For example, a simple value transfer can be initiated with an external inbound message (by developers or a service) or with an internal message from another contract. This message will produce a transaction (read below) and an internal message with value transfer.

In order to learn what Messages are in detail, please follow [this page](50-message.md).

## Transaction

A transaction is the result of a contract execution.

In general, a transaction is generated with one incoming message (external or internal) and can generate several outcoming messages (external or internal) as a result.

The transaction can be successful or aborted.

For example, a simple value transfer consists of 2 transactions — Sender's transaction which generated an internal message with a value transfer, and Recipient's transaction where it received the message with value and updated its balance.

## BOC (Bag of cells)

It is a universal format for data packaging in Everscale. Every object — account, transaction, message, block is stored in the blockchain database as bocs. By the way, the boc of the block includes bocs of all messages and transactions that were executed in this block inside of it.

## TVM

Turing-complete virtual machine for contract code execution. It works with data represented in boc format. TVM itself does not calculate any commissions and can be used on the client side for running the get methods of the contracts. TVM is used for debot engine execution on the client side as well.

Also, TVM is used by validators together with higher level protocols, such as Transaction Executor, to additionally calculate commissions and perform other necessary checks.

In order to learn what TVM is in detail, please follow [this link](tvm.md).

## Transaction Executor

It takes the results of TVM, calculates fees, checks balances and other things. Used by validators to validate blocks. Can also be used on the client side to debug contract execution.

In order to learn what Transaction Executor is in detail, please follow [this link](60-executor.md).

In order to understand how Everscale blockchain works please follow [this page](../develop/smart-contract/learn/45-blockchain.md).
