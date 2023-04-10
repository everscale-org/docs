---
sidebar_position: 3
---

# DHT - Distributed Hash Table

In fact, it is a distributed key-value database, where each network participant can save something. In Everscale, it is used to locate nodes in the network. 

The implementation of DHT in Everscale is similar to that of Kademlia used in IPFS. Any member of the network can run a DHT node, to generate keys and store data. To do this, it is needed to generate a random ID and inform other nodes about it.

To determine in which node to save data, a special algorithm to determine the distance (it is not about geographic location) between the node and the key is used. The algorithm is pretty straightforward: it is just needed to take both the ID of the node and the ID of the key, and perform the XOR operation. The smaller the resulting value, the closer the node is. The task is to keep the key as close to the nodes as possible. This way, other network participants can use the algorithm to find a node that can provide data about the key.

## DHT nodes

Each DHT node has a 256-bit DHT address. Contrary to ADNL addresses, a DHT address should not change often. In case it is changed too often, other nodes would not be able to locate the keys they are searching for. 

It is expected that the value of key `K` will be stored on `S` Kademlia-nearest nodes to `K`.

Kademlia distance = 256-bit key `XOR` 256-bit DHT node address. 

`S` is a small parameter, for example `S = 7`, which is required in order to improve the reliability of DHT. If we were to keep the key only on one node. The nearest one to `K`. The value of the respective key would be lost if that single node goes offline.

## Kademlia routing table​

Each node in DHT usually keeps a Kademlia routing table. It is comprised of 256 buckets (from 0 to 255). 

The `i`-th bucket incorporates the information about some known nodes, a fixed number of the “best” nodes and maybe some extra candidates that find themselves at a Kademlia distance from `2^i` to `2^(i+1) − 1` from the node’s address `a`.

The information includes: **DHT addresses, IP addresses and UDP ports**. Also, there is some other information such as the **time** and the **delay** of the last ping.

When a Kademlia node learns about any other Kademlia node as a result of some query, it places it into a suitable bucket of its routing table. First, as a candidate, then, if some of the “best” nodes in that bucket fail, for instance, do not respond to ping queries for a long time, they can be replaced by some of these candidates. In this way, the Kademlia routing table stays populated.

## Key-value pairs​

Everscale DHT allows key-value pairs addition and editing.

It should be mentioned that **updating rules** can vary. In some instances, it is just the replacement of the old value with the new one. It is applicable in case the new value is signed by the owner. The signature, in turn, must be kept as part of the value. It is to be checked later by other nodes after they obtain the value of the key. In other instances, the old value somehow affects the new value. For instance, it can contain a sequence number and the old value is overwritten only if the new sequence number is larger. This is done in order to prevent replay attacks.

The purpose of Everscale DHT is not only for storing IP Addresses of ADNL nodes. Besides this, it has many other applications, such as, the storage of: 

- Lists of addresses of nodes included in an overlay subnetwork
- ADNL Addresses of Everscale services 
- ADNL addresses of accounts of the Everscale blockchain