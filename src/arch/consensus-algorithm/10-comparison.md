# Comparison with other solutions

In order to better understand the Catchain, the EverX team researched similar blockchain consensus algorithms, as this makes code reverse engineering much simpler.

Everscale consensus overall idea is quite similar to PBFT schemes (PBFT, Tendermint, Algorand). The same three-step phase pattern (Block approval, Voting, Pre-committing) may be found in all of them with slight variations. Let us compare some features of some of these protocols with Catchain:

## PBFT

Oldest of this family of protocols, first described in 1999 by Miguel Castro and Barbara Liskov [4].

- Slot leader is re-elected only if it does not perform well. In comparison, Catchain changes leader each round in determenistic fashion.
- One round of block voting requires O(n²) messages (where n = number of nodes). Each node sends a message to all other. Catchain uses a special protocol which greatly reduces the number of messages: the outgoing messages are sent to a small number of neighbors (5 is a default number) and then those neighbors resend them further.

## Tendermint

The closest algorithm to Catchain of all discussed in this chapter, described in [3].

- As in Catchain, the proposer node is selected in a round-robin fashion each turn.
- Tendermint requires only local clocks to compute timeouts. This is different from Catchain, which require globally synchronous clocks. This scheme may make Catchain vulnerable to “eclipse” attack: by manipulating NTP messages one may make a node completely out of sync (blockchain will remain correct, but this particular node will not be able to vote and propose its blocks).
- A gossip message-propagation algorithm is implemented, which allows reducing the number of messages to O(n log n) for each voting. Catchain has Catchain overlay protocol for broadcasting messages, which does a similar thing.

## Algorand

- A smaller subset of voters is elected at each step (a “committee”). These elections are held according to a determined, but secret procedure (only a user knows that she is selected to participate in the committee, but she may prove it to others). Only these committee members participate in voting; thanks to cryptographic measures in place, it does not compromise security.
- Requires no synchronous clocks, only the timeout delay should be equal among the nodes.
- Algorand also uses gossip message-propagation algorithm, like Catchain. The authors claim that each node, participating in voting process, sends exactly one message during each voting stage.

## Ouroboros, CBC Casper

- These consensus algorithms [5][6] are quite different: they prefer to build multiple block chains, and forks are made easily. At any given moment there is a set of valid chains, and the algorithms guarantee that any valid transaction is present in any of these chains after generation of R blocks (where R depends on configuration and may be rather big).

This algorithm type requires a lot fewer synchronization messages, yet it takes more resources to handle multiple parallel chains; also new transactions becomes publicly available much later.