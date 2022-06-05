---
title: Security
description: External messages pose threats
sidebar_position: 9
---

# Smart Contract Security

## Replay Attack Protection

All external messages must be protected against replay attacks. Otherwise, a malicious party can resend an external message obtained from blockchain and repeat a transaction for a smart contract. For example, a hacker can repeat a Token transfer and bring an account balance to zero. For internal messages the risk of replay attacks is irrelevant, as they only can be generated inside blockchain by other contracts.

## Implementation Options

Different approaches to implementing replay attack protection exist. None of them is a silver bullet, but there are several indicators applied to compare and evaluate them:

- Gas consumption
- Storage fees
- Race condition
- Usability

## Sequence number

This is a very simple protection option. It implies that each protected contract stores a counter (i.e. 32bit integer) that is initially set to zero. An external message is then accepted by the contract only under condition that it contains a number equal to the current contract counter value. Each time a new message is accepted, the contract counter value is incremented by one.

Pros:

- simple implementation in contracts
- low gas and storage fees

Cons:

- To get the right sequence number off-chain, a client must request the contract state from blockchain before sending an external message. If the state is large, it can cause a network traffic overhead
- Race condition issue that arises when there are multiple contract owners who can simultaneously call it. One owner can increment the contract counter value before this counter becomes available to the next owner
- Less sensitive issue of a potential counter overflow in the future. In this case the TVM will throw an exception causing the owner to lose access to the contract

## Timestamp

Another simple protection option is adding a timestamp to every external message. It can be a 64-bit value in unixtime format. The contract must store the timestamp of the last accepted external message. When a new external message comes, the contract verifies the message timestamp. It must to be bigger than the previous message timestamp and less then `now + interval`. The `interval` value is necessary, because now does not stand for the current time, but indicates creation time of the relevant block. The interval can be equal the block generation period or bigger.

Pros:

- Very simple implementation
- No need to request account state before sending external messages

Cons:

- Race condition issues remains unresolved as in case of sequence number implementation
- Client time must be synchronized with blockchain time

## Set of accepted messages

Dictionary of randoms

This option implies that every external message contains a random value, for example, a 32bit integer. A protected contract, in turn, stores previously used randoms in a dictionary, compares message randoms with it and rejects a message if there is a match detected.

Pros:

- No need to request account state before sending an external message
- No race condition; simultaneous access to contract of multiple parties is supported. Collisions are still possible when multiple clients have the same random, but chances can be minimized.

Cons:

- Consumes a lot of gas for dictionary write/read operations. Note that the gas fee will increase in the future
- High storage fees for storing dictionary

Dictionary of messages with garbage collection
This option implies that every external message contains an `expire-at` integer that defines the time when the message becomes invalid (i.e. expires). The contract, in turn, must store a dictionary with all recently accepted and not expired external messages. The key is a message hash, the value is the relevant `expire-at` integer.

The contract then rejects all messages that are already present in its dictionary. To avoid persistent data increase, a protected contract can delete messages with the `expire-at` value less than `now` from its dictionary.

Pros:
- No need to request the account state before sending an external message
- No race condition issues

Cons:
- Harder to implement compared to the above option with a dictionary of randoms
- High gas fees caused by the need to access a dictionary
- High storage fees, yet these can be reduced by deleting expired messages from the dictionary
- Garbage collecting also involves some gas costs

## Sessions

Before sending requests to contract, a user creates a session with a contract by sending a `create_session` external message. The message contains a new session ID, its expired-at time and a starting sequence number. The contract stores a session dictionary.

After a session is created, the user adds the `session_id` and the next session sequence number to every external message. For every external message (not `create_session`) the contract checks that:

- The message session ID exists in dictionary
- The message sequence number is equal to the stored session number, and
- The `now` value is less then the `expired-at` value for session

- If all checks are passed successfully, the contract increments the stored sequence number for the session. In case of failure, the message is rejected.

Also, expired sessions require some garbage collection.

Pros:
- No need to request the account state before sending an external message
- No race condition issues
- No collisions

Cons:
- Harder to implement compared to all the options covered above
- High gas fees
- High storage fees
- Need to use garbage collecting
- Unsuitable for simple single-user contracts

## Conclusion

In EverX, we selected a lightweight and simple replay protection option, it will be implemented in the compiler by default and based on the `timestamp` approach. It is supposed to work well for single-user contracts, as well as for contracts without heavy race conditions. It is easy to use given that EverX SDK enables inserting a timestamp automatically on the client side. Also, there will be an option to redefine the default protection method by overloading a special contract function. This is how contract developers will be able to implement any protection option they seem fit.
