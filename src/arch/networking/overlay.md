---
sidebar_position: 5
---

# Overlay

Everscale is a multi-blockchain platform. That is, its architecture is built in such a way that a lot of chains can exist simultaneously and even independently. With this, there is a constant need for updates on the network. For instance, full nodes could require updates for new blocks of some chains. All chains in the network, including the masterchain, communicate via their own overlay. To join it, it is needed to find the nodes that are already in it, and start exchanging data with them. 

Overlay subnetworks can be **public** to which anyone can connect, and **private** to which additional credentials are needed. The credentials, in turn, are known only to a certain number of people.

:::tip Tip

For public overlays you can find nodes using DHT

:::

## ADNL in comparison with Overlay networks

Everscale overlay networks usually do not send datagrams to other arbitrary nodes as happens in ADNL. Alternatively, there are some **semi-permanent links** established between certain nodes (called **neighbors**) with respect to the overlay network. The messages are usually forwarded along these links. For instance, from a node to one of its neighbors. 

:::tip Tip

Each overlay subnetwork has a 256-bit network identifier. Usually, it is equal to a SHA256 of the description of the overlay network—a TL-serialized object

:::

Overlay subnetworks work according to a special [gossip](https://en.wikipedia.org/wiki/Gossip_protocol) protocol.
