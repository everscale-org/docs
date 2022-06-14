---
title: Transaction execution
description: Phases of transaction execution
sidebar_position: 5
---

# Phases of transaction execution

1. Storage phase — First, money is withdrawn for storing the contract data in the blockchain, and at this stage the contract can be frozen if it does not have enough money to pay for storage.
Credit phase - the account balance is increased from the value sent in the message.
2. Computation phase — execution of the transaction. If there is an error in this phase, then we go from here to phase 5 if we have the bounce: true flag. The subtle point here is that the creation of outgoing messages and computing are separated. If your transaction tries to create outgoing messages, then it simply adds the intentions to create outgoing messages into a special register. This does not check that you have enough money to attach value to all these messages. So, if you have 1 ever on your account and you are trying to create two messages, each of which wants to send 0.8 ever, then the computation phase will succeed, the tvm exit code will be 0 and the success: true. That is, the transaction will not fail at the moment when you do not have enough value to apply, it will only fail if you run out of money to pay for gas.
3. Action phase — in this phase, the outgoing messages are created that were put in a special register in phase 3. And if you do not have enough money to pay for outgoing messages, the transaction will be rolled back and go to phase 5 (if the flag is on). In this situation, you will have the computation - success: true, action - success: false, abort: true. There is also a special flag when creating a message, which says that this message should be ignored if there is not enough money to create it.
4. Bounce phase — if the bounce: true flag was set for the incoming message, then in this phase a back message is created (if there is enough money left to pay for the message), which will call the onBounce utility function. Any remaining value will be attached to the message.

See more details in [Transaction executor](../../../arch/60-executor.md#transaction-executor-message-processing-general-scheme)

> The documentation in Everscale repository is a community effort. Therefore, everyone can contribute with proposals for new topics, suggest new content elements, participate in editing, and provide ideas that will be of great help for network development. Please be informed that our documentation can be edited via GitHub. It can be found [**here**](https://docs.everscale.network/). 
Please make sure to consult our rules and rewards policy via [**this link**](https://docs.everscale.network/contribute/hot-streams/documentations).  
Also, for any questions that may arise, you can text via this [**Telegram chat**](https://t.me/+C2IpQXWZtCwxYzEy).