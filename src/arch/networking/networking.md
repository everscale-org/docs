---
sidebar_position: 0
---

# Networking

Everscale uses its own peer-to-peer network protocols.      
We use these protocols to propagate new blocks, send and collect transaction candidates and so on. 

While the networking demands of single-blockchain projects, such as Bitcoin or Ethereum, can be met quite easily. One essentially needs to construct a peer-to-peer network and then propagate all new blocks and transaction candidates via a [gossip](https://en.wikipedia.org/wiki/Gossip_protocol) protocol.     

Multi-blockchain projects, such as Everscale, are much more demanding. One must be able to subscribe to updates of only some workchains, not necessarily all of them.
