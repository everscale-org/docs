---
title: Gas limits
description: Gas limits and external message size
sidebar_position: 7
---

# Gas limits and external message size

There are size restrictions for external messages (now it is about 16 kilobytes). So you will not be able to send more than 16 kb to a data contract in one message, and you will also not be able to deploy a contract with an external call larger than 16 kb.

Of course, there are workarounds. You can make a contract where you first fill in the data bit by bit, and then the contract will glue this data together and send it in one big internal message. But it is better to keep contract sizes relatively small.

These restrictions apply only to the size of external messages, not to the sizes of contracts and internal messages.

There is also a limit on the amount of gas that one transaction can spend, and it is quite small.

The absolute limit is about a million gas, but this will not tell you anything :-) You have to test it to see. For example, if you have a mapping with more than 1000 elements, you can write no more than 200 new keys in one transaction. Gas limits can be bypassed recursively by calling yourself (by sending an internal message to yourself).

#### More about

- [Managing gas](../../../arch/30-managing-gas.md)
- [Fee calculation](../../../arch/20-fee-calculation.md)
- [BlockchainConfig parameters](../../../arch/60-executor.md#blockchainconfig-parameters)

>  The documentation in Everscale repository is a community effort. Therefore, everyone can contribute with proposals for new topics, suggest new content elements, participate in editing, and provide ideas that will be of great help for network development.
Please be informed that our documentation can be [edited via GitHub](https://github.com/everscale-org/docs/issues).  
  Also please make sure to consult our rules and rewards policy via [this link](https://docs.everscale.network/contribute/hot-streams/documentations).  
  Feel free to join [Everscale Documentation Development Telegram chat](https://t.me/+C2IpQXWZtCwxYzEy) and [Everscale Developers Onboarding Telegram chat](https://t.me/+Vca1Gs6uPzIyNWVi)!
