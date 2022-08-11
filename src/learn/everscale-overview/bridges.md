---
description: Cross-chain bridges were made for transferring assets between chains
sidebar_position: 4
---

# Bridges

## What is a cross-chain bridge?

Cross-chain bridges were made for transferring assets between chains.  
They lock assets in the source chain and creates an equivalent number of wrapped assets in the destination blockchain.  
When you initiate an asset transfer from one blockchain to another using a bridge, assets are not actually moved or sent anywhere. Instead, the transfer functionality is used in a two-step process and handled by a smart contract.  

In simple terms - Let's say you want to move tokens from chain A to chain B. What the bridge does is it temporarily locks or freezes your asset in chain A. They then create an equivalent number of new tokens that will be unlocked for you in chain B. When you want to redeem the tokens, that is, when you want to move the original assets back from chain B to the original chain (chain A), the tokens created in chain B will be burned and the original assets will be unlocked.  

The concept of interchain communication and token transfer is done using a two-way binding system; where the value of a token in either blockchain is the same, as it remains tied to the value of the initial ones.

## Everscale Bridges

### [Octus Bridge](https://octusbridge.io/) 

Octus Bridge is a platform built by the Broxus team that enables cross-chain asset transfers between Everscale and other networks such as Ethereum, BNB Chain, Fantom, Polygon, Avalanche and Milkomeda.  
The platform also implements the Governance interface or DAO, which provides a level of decentralization unprecedented for bridges due to the ability to make decisions directly by network participants, as well as a staking interface.

### [Adaever](https://adaever.io/)

Cross-chain bridge between Cardano and Everscale built by the Broxus team.
