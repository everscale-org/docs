# Getting started

## Before we start

Before proceeding with the material explaining what it means to be a validator of Everscale, firstly consult with [Everscale overview page](../../learn/everscale-overview/01-overview.md), in order to get familiar with Everscale blockchain essentials.

## Overview

A validator on the Everscale network is basically a server tasked with confirmation of new blocks generated in the blockchain. 

In order for a new block to be confirmed, it has to be signed by several validators (or nodes). This way, a consensus in the network is reached, which is needed to ensure its reliability. Practically, this mechanism secures resistance to failures of individual nodes and protects the network from deliberate attacks.

To become a validator on the Everscale network, a stake (deposit) is required. It allows the participation in the election of validators and subsequent validation of the Proof-of-Stake consensus algorithm. Right now, the stake required amounts to 350 000 Ever.

For their work, validators receive  remuneration at the end of each validation cycle, consisting of two parts: 

1. Processing fees - 1,7 EVER for a new block on the masterchain, and 1 EVER for a new block on the shardchain. 
2. Fees from the emission of new tokens distributed to validators, which is currently fixed in the network at the level of ~0.5% per year.

Based on the current network configuration, validator elections take place every 18 hours. Each period consists of 3 phases:

1. The election is open, the elector's smart contract accepts new stakes, and previous validators can return their stakes from the elector's smart contract;
2. The election is over and the smart contract determines the group of validators for the next phase;
3. A new group of validators starts working. The stakes of the former group of validators are temporarily frozen.

Check out the [validator elections page](../run-validator/validator-elections.md) to get better understanding the elections mechanism.

To accomodate participants with stakes lower than those required, as mentioned above, DePool smart contracts are designed. They permit any validator, irrespective of the stake size, to participate in staking and receive their part of the reward. DePool smart contracts guarantee that the validator cannot use the participants' funds in any other way, thereby guaranteeing the security of their funds from the validator's dishonesty. 

## Let’s get started

[**Run Validator**](../run-validator/) - here you can find information explaining how to launch a validation node in prod or testnet, as well as learn all additional information regarding this topic.

[**Depools**](../depools/) - in this section you can find information on interaction with DePools. More on this, you can read in the [Learn section](../../learn/).

## Help and News

[Everscale validator's Telegram chat](https://t.me/freetonvalidators)

[Everscale validator's Telegram group](https://t.me/ever_validators)