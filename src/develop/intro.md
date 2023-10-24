---
sidebar_position: 0
---

# Intro

To start your developer journey with Everscale, some important concepts should be understood first.

The first one is the mechanism of Dynamic Multithreading, which allows the network to scale as the load increase. 

:::info

The Dynamic Multithreading is part of Everscale's approach to **Infinite Scalability**. Please follow [here](overview/infinite-scalability.md) to dive deeper.

:::

Shortly speaking, a single workchain can split to shardchains dynamically, and a different subsets of accounts are assigned to different threads, running in parallel. 

To take advantage from that in your Smart Contracts, you can't simply use the same approach as in Ethereum development (where we allow a single smart contract to store lot of data).

This leads us to the Distributed Programming approach.

## Distributed Programming approach

Instead of writing contracts in which the state can continuously grow, we write distributed systems of smart contracts. For example TIP-3 token standard is designed as a system of main `TokenRoot` contract, which stores metadata, and has a function to deploy a separate smart-contract called `TokenWallet` for each token owner (that is what a wallet is) and can send tokens directly among contracts without a central hub.

:::info Important concept

In Everscale, each contract address is a uniquely computed value. A contract address is a hash of the contract code and initial data (initial data is a value of static variables, and not what you pass to the constructor, since in Everscale the constructor is a function that you call after the deployment of the contract in one transaction).

This is a very important pattern of distributed programming (as it is understood in Everscale). Knowing the code of a contract, and its initial data you can make sure that you are being called by a contract with the same parents as your own. Or, knowing the contract code and its initial data, you can compute the address of a contract on the fly and send messages to it.

:::

By creating small contracts for a single system (like in TIP-3 token) we solve a number of issues:

*  All contracts end up in different shards which distributes the load evenly throughout the network.
* Contract states are very small. Validators can load them very quickly from a disk.
* Storage fee. If we had one contract with a huge hash map, then it would have to pay a large fee for its storage, and it is not clear who should pay and how for this storage. If there are many accounts with small balances that their owners no longer need, then naturally they will not pay for its storage, and the rest of the holders of this token will have to pay for all of the “remainders.” So that smart contract programmers do not have to think about how to force users to pay for storage or clean up old data inside the contract, Everscale has allowed each user to deploy their own contract. Each user determines how long they will pay for storage and can always adjust these parameters.

## Contract Deployment

The concept about deterministic address calculations, described above, is also tied to how contracts are deployed in Everscale. The contract can naturally be deployed by another contract. But what should we do if we want to deploy a contract from outside?

To do this, we have to take the contract code and its initial data, and compute its future address.

After that, we simply send money there, with a bounce flag = false. And the money just stays on the address, which has no initialized code.

Then we send a special external message to this address with the code and initial data, and we say “Look, here we have the code and initial data, the hash of which gives us this address, initialize it please” and the network initializes the contract.