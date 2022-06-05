---
sidebar_position: 6
---

# FAQ

## Getting started

### How can I become a Everscale validator?

To set up a validator node you should follow the instructions in [Run validator](run-validator) section.

### Can I test out the node?

You may setup a node on the `net.ton.dev` test network. The procedure is [similar](run-validator/run-testnet-node.md).

## Requirements

### What kind of hardware do I need to run a node?

| Configuration | CPU (cores)  | RAM (GiBs)     | Storage (GiBs) | Network (Bbits/s) |
|---------------|--------------|----------------|----------------|-------------------|
| Minimal       | 8            | 16             | 1000           | 1                 |
| Recommended   | 16           | 32             | 1000           | 1                 |

SSD disks are recommended for `/var/ton-work/db` storage

### Does the validator node require a public IP?

Yes, the validator requires a public IP, otherwise other nodes will not be able to communicate with it.

### What ports are needed for a node to work?

- The UDP port set [here](https://github.com/tonlabs/main.ton.dev/blob/6e4c842aceb2c52229730cab0fd394a4ae944e84/scripts/env.sh#L38) (`ADNL_PORT` parameter) for the node itself.
- HTTPS port 443 for the [TONOS-CLI](../develop/api-tools/tonos-cli.md) utility.

### What volumes of outgoing traffic do you need for the validator at the moment? How about in the future?

In general, the traffic requirements are high (up to tens of TB per month), so it’s best to find a server without traffic limitations. Currently the network has 16 shards by default, and a block is issued every 2-4 seconds in each shard, even if there are no transactions and it is empty – such is the Ever architecture. On the other hand, as the number of transactions increases, traffic will not grow too fast. Furthermore, as the number of validators grows, they will be divided into groups, each to validate their own shards. This means that the number of constantly communicating neighboring validator nodes will be approximately the same.

## Node Setup

### What network does the node work with by default?

The node is compatible with all Everscale networks, but connects to just one at a time. It is specified in the configs during node setup.

### Why are there different initial DiffTime values? Why do some start at 40k and others at 190k?

Nodes begin synchronization from the latest key block, which is generally issued whenever validator elections end or the validator set is changed. Thus initial DiffTime depends on when in the election cycle the node began synchronization.

Synchronization speed is also very dependent on the hardware and the network throughput.

### How can I make sure synchronization is proceeding as it should?

It’s normal for synchronization to take multiple hours. However, if you have noticed that `DiffTime` has not been decreasing for an hour, or even started increasing, then something is wrong. Make sure you have followed the instructions exactly and that you are using an SSD, check your network status, review the logs. If no obvious reason for the lag presents itself, contact support to get help.

### How can I correctly stop the node?

```
pkill -f validator-engine
```
