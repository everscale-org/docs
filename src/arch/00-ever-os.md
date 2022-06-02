---
title: Ever OS
description: An operating system (OS) is system software that manages computer hardware...
---

# What is Ever OS

> An operating system (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs.
> — from Wikipedia

TON Operating System is an intermediary between a user and a blockchain — a distributed verifiable computing platform.

## Why we call it Ever OS?

A modern blockchain like Everscale is not just an immutable ledger. Bitcoin and other earlier blockchains were mostly ledgers, yet even Bitcoin supports a non-Turing complete script that provides some transaction execution instructions. In fact, the Bitcoin script is a Forth-like instruction set, which makes it somewhat similar in origin to TON Virtual Machine assembly language, but more on that later.

Most blockchains after Ethereum are, in large part, distributed computing engines that execute and verify Turing-complete programs called smart contracts. In simpler words they are a special breed of network processors working in orchestration (called "consensus") to perform common operations and in that way verify correctness of their execution.

In Everscale this paradigm is taken to the extreme. The immutable ledger is quite a small part of Everscale. Of course it is an immutable ledger and a chain of blocks — that is how the data is written and transmitted from one network processor to another — yet there are at least two aspects which make Everscale uniquely more so a computing engine than a simple ledger.

Almost everything in Everscale is smart contracts. Every account in Everscale must be associated with a smart contract code (or **initialized**) in order for a user to be able to perform any operation with it. Smart contracts are Everscale Assembly programs executed in the Everscale Virtual machine much like any assembly code is executed by hardware or by a virtual processor in a regular computer.

Between a regular computer and a user (which may be a developer who would like to write programs for that computer or a regular user who would like to execute and interact with these programs) there is something called an operating system.

That is how GNU defines operating system:

> Linux is an operating system: a series of programs that let you interact with your computer and run other programs.
> 
> An operating system consists of various fundamental programs which are needed by your computer so that it can communicate and receive instructions from users; read and write data to hard disks, tapes, and printers; control the use of memory; and run other software.

It is quite obvious why computers need an operating system. Before operating systems existed, interaction with computers looked something like this:

![](https://zeroheight-user-uploads.s3-eu-west-1.amazonaws.com/images/nDfRMdLKjDCljSuXmMBsNA.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJXTVUC4XZENV3LPQ%2F20220503%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20220503T212805Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=90fdb12a9a08d62bf6c19f56004d38f5b5f59f38317375839a7a66818abf547e)

> I still think the "world computer" is a good analogy. The idea that you have a shared computing environment that anybody can build and run stuff on is still a totally legitimate and valuable thing to emphasize.
>
> — Vitalik Buterin

Any way you look at it, blockchain is quite a good candidate to be called a decentralized computer. At least some of the blockchains are. Everscale most definitely is.

And just as with any computer, a blockchain needs an intermediate layer (or layers) that manages its resources and provides services to the programs the user runs or interacts with. Of course blockchain, in terms of architecture, cannot perhaps be compared directly 1:1 with a regular PC. But in logical terms, whenever we think about a software stack needed to enable interaction with a user — to call it an operating system is quite compelling.

Let's run some arguments. For reasons of practicality we will not talk only about Free Everscale blockchain, but most of the arguments could be applied to some other modern blockchains as well.

A classical operating system is expected to provide:

- Memory Management
- Processor Managing
- Device Managing
- File handling
- Security Handling
- System performance control
- Job accounting and handling
- Error detecting and handling
- Synchronization with other software and users

- Let's compare with Ever OS and the services it provides:

### Memory Management

Individual blocks containing data are created, validated and finalized under governance by the consensus blockchain software. Nodes participating in processing blocks are chosen dynamically without requiring interference from the blockchain user.

### Processor Managing

Smart contracts are blockchain programs that are executed by the Everscale Virtual Machine across many network devices and locally (if we consider how a user is accessing the blockchain). A user does not think about how a smart contract is executed. Following some deployment instructions, a developer can deploy and run smart contracts without thinking about which virtual machine it is executed on or how this execution has been synchronized across the network and verified. In this respect it is safe to say that Ever OS provides processor management capabilities.

### Device Managing

Blockchain software, including full node implementation, allows users to control, handle, configure and diagnose individual blockchain nodes.

### File handling

Via a smart contract users can store and access persistent data on the blockchain.

### Security Handling

Access to restricted areas of the system is authorized through extensive use of specialized smart contracts. Cases of unauthorized access attempts are recorded and monitored using security smart contracts.

### System performance control

System-wide smart contracts deployed to the blockchain are in charge of monitoring system performance and receiving events which pinpoint various cases of system malfunction.

### Job accounting and handling

Smart contracts execution inside the blockchain is governed by specialized software modules. Details of the execution are available for view and analysis through the blockchain explorer.

### Error detecting and handling

Cases of misbehavior and inconsistency of smart contracts and blockchain software are monitored, collected and stored for subsequent analysis by specialized smart contracts.

### Synchronization with other software and users

System smart contracts form an interconnected decentralized network by exchanging addresses, interfaces and specifications with each other to provide users and other smart contracts with the information required to properly utilize their functionality.
