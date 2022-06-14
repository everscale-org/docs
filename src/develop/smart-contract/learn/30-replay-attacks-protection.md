---
title: Replay attacks
description: Protection against replay attacks
sidebar_position: 8
---

# Protection against replay attacks for external messages

External messages can be in any format, for example, an external message could be a plain text without a signature or any data signed with a private key.

In the TON protocol itself, there is no built-in protection against validators including your message any number of times.

How can this be implemented? Validators can store all external messages and not allow the same message to be inserted into processing twice at the protocol level. But this approach is contrary to the philosophy of TON, because it leads to an ever-increasing tail of data that must be stored by validators and, in our network, all data must pay for its storage in the state.

So protection against replay attacks was shifted to smart contracts so that they can implement the protection that suits them.

Let me remind you how external messages work. You send a message to a contract out of nowhere, the validator gives it `10k gas` credits and tries to apply it. If the contract agrees to do `tvm.accept()` for `10k gas` then it will pay for the message and the transaction will go through. If there is no `tvm.accept()` call or an exception occurs, then this message will not go to the block.

`TON-Solidity` has built-in protection against replay attacks. It works at the `SDK` + `ABI level`. To work with a smart contract using sdk or tonos-cli, you need `contract.abi.json`, a description of the functions and their variables, so that the SDK can properly package the call. This abi has a `header` field where Solidity always writes at least :`time` when compiling. This is an instruction for the `SDK` to apply a time to each external message, which will be used to protect against replay attacks.

Solidity, before processing an external message, performs a check, which can be understood as something similar to the following (pseudocode):

:::note
This is not the actual code, so approach this skeptically
:::

```solidity
contract any {
    uint64 hidden_ts_replay_variable;
    
    func beforeAnyExternalMessageProcessing() {
        uint64 header_time = msg.header.time;
        
        require(uint64(now) + 3600 > header_time, 52);
        require(hidden_ts_replay_variable < header_time, 52);
        
        hidden_ts_replay_variable = header_time;
    }
}
```

As you can understand, this default check is very simple but will not work well if you want to send a bunch of parallel external messages to a contract. So you can always come up with a more comprehensive checking mechanism, for example something like [this](https://github.com/tonlabs/tonos-se/blob/9466178c356180577c0408882d32e1f3c1c34be7/contracts/giver_v2/GiverV2.sol#L51).

> The documentation in Everscale repository is a community effort. Therefore, everyone can contribute with proposals for new topics, suggest new content elements, participate in editing, and provide ideas that will be of great help for network development. Please be informed that our documentation can be edited via GitHub. It can be found [**here**](https://docs.everscale.network/). 
Please make sure to consult our rules and rewards policy via [**this link**](https://docs.everscale.network/contribute/hot-streams/documentations).  
Also, for any questions that may arise, you can text via this [**Telegram chat**](https://t.me/+C2IpQXWZtCwxYzEy).