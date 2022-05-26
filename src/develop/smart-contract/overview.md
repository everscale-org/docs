# Overview

## Smart contracts development.
  
This guide is designed for developers interested in smart-contracts programming, irrespective of their prior experience in blockchain development. Thanks to our well structured step by step guidance, developers will gradually learn all the information needed to start deploying and interacting with smart-contracts. 

In the interest of developers, Everscale network puts at their disposal smart-contracts programming using developer-friendly languages: Solidity and C++.

It should be noted that for developers experienced with Python or other languages such as C, C++, JavaScript, and C#, starting programming smart-contracts will be of maximum ease due to syntax similarity. 

Familiarity with the mentioned programming languages will help developers make sense of differences in smart-contract languages. Before analysing development technicalities and language comparisons in detail, first consult our overview explaining what [smart-contracts are at their core]().

## Getting started with Everscale smart-contracts development.

We provide a set of compilers and tools to assist with the full smart contract development cycle on the Everscale network: 

Write source code: check out contract examples of high level languages of choice - Solidity, C++.

Compile source to assembly: invoke optimizing compilers generating native code for TON VM (TVM).

Translate assembly text to binary: assemble and link contract code with standard or custom libraries.

Secure blockchain interaction: generate or use an existing key pair to communicate with the contract in the blockchain.

Define account address: compute a unique address for the contract based on its code, initial data and keys.

Create an account: prepare an account for contract deployment by sending a message transferring blockchain currency to the account address.

Secure contract deployment: encode the contract binary and sign it with the key pair.

Initialize the account: send the prepared constructor message to the contract address.

Work with the contract: use the contract as intended by sending messages to the account address on the blockchain.

[Develop smart-contracts in Solidity](developing-with-solidity.md)

[Develop smart-contracts in C++](developing-with-c%2B%2B.md)

## Solidity.

Object-oriented, high-level language for implementing smart contracts.

Curly-bracket language that has been most profoundly influenced by C++.

Statically typed (the type of a variable is known at compile time).

Libraries (you can create reusable code that you can call from different contracts – like static functions in a static class in other object oriented programming languages).

Writing smart-contracts in Solidity.

Before starting you will need:

A PC or laptop with a basic set of developer tools. We recommend Ubuntu 18.04 for Linux, Windows, MacOS. 

Use Wallet.sol below

Use your own code

Take one of the samples from the samples repository

Utilities to link and deploy contract to the blockchain

build from sources

download as a binary

run in a docker container

## Recommended setup

- **OS**: Ubuntu 18.04 is the easiest to run.

> tip: running Ubuntu in VM works fine. Check out this install guide.

Build Solidity compiler from the source (4-6 minutes)

checkout from github (a few seconds);

install dependencies as per README (1-2 minutes)

build the compiler from source per README (~3-5 minutes)

Contract source code:

Use Wallet.sol below

Command line tools, either of:

download as a part of a binary package

build tvm_linker and tonos-cli from sources

Install the compiler

Install Everscale network Solidity Compiler from the open source repository.