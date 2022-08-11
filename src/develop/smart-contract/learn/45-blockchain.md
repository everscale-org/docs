---
title: Blockchain
description: How the blockchain works
sidebar_position: 2
---

# How the blockchain works on the block and queue level

This note is just for a general understanding of how the blockchain works, it’s not 100% accurate, we are waiting for a description from the writers of the node. This may change after a new consensus.

There is a workchain `-1`, this is the master chain, it is validated by the validators with the largest stake.

Contracts can be deployed in the `-1` workchain, but it is more expensive, and it was made mainly for governorship. (Probably in the future there will be no user contracts)

There is a workchain `0`, where contracts are mostly located. More workchains will be launched in the future.

Workchains are further divided into Processing threads. There is a workchain parameter that indicates the minimum number of processing threads, and currently it is `16` for a `0` workchain.

Thread processing is an interesting concept. In ES, only computation is shared between the validators of the same workchain, but they all have the same storage. Let’s look at what that means and how it works.

For example, we have 160 validators for the 0 workchain. They are randomly divided into 16 groups of 10 validators, and each gets its own Processing thread. All workchain contracts are also divided into 16 groups, simply by address ranges. (0.00 - 0:08, 0:08 - 0.18, etc.).

Each group of validators executes transactions only for their group of smart contracts, and releases blocks of their processing thread.

But at the same time, they are constantly downloading blocks of other processing threads in order to see their outgoing and incoming message queues. At the same time, blocks are not a list of transactions that need to be rolled up, but a list of incoming messages + a state delta. So, when you download a block of another processing thread, you do not have to do computation in order to update your state. You’re just rolling state changes.

How roughly works:

1. The Masterchain generates block 1.
2. All threads download the last master block.
3. Threads create their own block and register it in the master block.
4. The masterchain generates block 2, which contains the hashes of all blocks of threads that have registered in it.
5. All threads download masterblock 2.
6. All threads look at the hashes of the registered blocks of other threads, and download them all.
7. All threads generate a block.
8. This process gets repeated.

Message delivery guarantees also work in this way. When you create a message, it is placed on that thread’s outgoing queue:

1. Thread A generates a message for the contract that is in thread B, and creates a block with a new outgoing message in the outgoing queue.
2. Thread A is registered in the master block.
3. The masterchain generates a block.
4. Thread B downloads the master block, and downloads the block of thread A registered there.
5. Thread B sees the message in thread A and imports it into its inbound queue. (When a message is imported, it is immediately executed (transaction starts) If there is not enough gas for a transaction in the current block, then the message is simply not imported, and waits for its turn in another block. At the same time, there is a message import order, so that validators will not be able to ignore it forever).
6. Thread B creates a block with a message in the incoming queue, and registers with the master.
7. Thread A downloads the block in which it sees its message in thread B’s incoming queue and removes the message from its outgoing queue since it was delivered successfully.
8. Generally, thread A generates a block, then registers it in the master block. Then thread B downloads it, sees that thread A has removed it from its outgoing queue, and deletes it from its incoming one.

In fact, sharding in this blockchain is the sharding of computational resources. And the data is the same for everyone, with the expectation that all validators have gigabit channels, and we rest only on computation.

If some processing thread is heavily loaded with the last N blocks, then it will split into two, and new processing threads can also split in turn. Then when the load drops, they all merge.
