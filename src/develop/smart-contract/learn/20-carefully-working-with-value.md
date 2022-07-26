---
title: Working with Value
description: Carefully working with value when creating messages
sidebar_position: 6
---

# Carefully working with `value` when creating messages

In general, whenever you create outgoing messages while processing incoming internal messages, you must be very careful with the value that you attach to messages.

The subtlety here is that if you create outgoing messages while processing an incoming message, then value can be deducted from your contract account, even if there is not enough money to pay for this value in the incoming message and you did not call `tvm.accept()`.


Here is an example of a function that can spend money from a contract account.

```solidity
function deployWallet(
    uint256 _wallet_public_key,
    uint128 _deploy_evers
) external {
    TvmCell stateInit = tvm.buildStateInit({
        contr: TokenWalletContract,
        varInit: {
            root_address: address(this),
            wallet_code: wallet_code
        },
        pubkey: _wallet_public_key,
        code: wallet_code
    });

    new TokenWalletContract{
        stateInit: stateInit,
        value: _deploy_evers,
        wid: address(this).wid,
        flag: 0
    }();
}
```

Everything seems to look good; the function should deploy the wallet and send the specified amount of EVER there. But due to the separation of phases (read above about phases), the creation of the message is paid from the money in the incoming message, and the message is put into the register of outgoing messages, where it will wait for the action phase. And in the action phase, it is created, and value is deducted from the contract account instead of the message account. And if we attach 1 ever to the message and request to deploy the wallet with 3 ever, then the remaining 2 ever will be deducted from the contract account.

Working with flags and value can be very tricky and you need to play around with them to understand the logic of `TVM`.

Here is another example:

```solidity
function deployWallet(
    uint256 _wallet_public_key,
    uint128 _deploy_evers
) external {
    require(msg.value - 0.1 ever > _deploy_evers);

    TvmCell stateInit = tvm.buildStateInit({
        contr: TokenWalletContract,
        varInit: {
            root_address: address(this),
            wallet_code: wallet_code
        },
        pubkey: _wallet_public_key,
        code: wallet_code
    });

    new TokenWalletContract{
        stateInit: stateInit,
        value: _deploy_evers,
        wid: address(this).wid,
        flag: 0
    }();

    msg.sender.transfer({ value: 0, bounce: false, flag: 64 });
}
```

Here we have the example as above, but now we’ve checked that the `msg.value` is `0.1 ever` greater than the `_deploy_evers`, and we want to return the change back to the sender.

But this is also incorrect. For example, we send `1 ever` with the message and request to deploy the wallet with `0.5 ever`.

During the computation phase, `TVM` will queue the wallet creation request with `0.5 ever`, and then the reverse transfer creation intention, with the value of `1 ever - gas` (let’s say the price of gas is `0.01 ever`), i.e. `0.99 ever`.

As a result, we will have two outgoing messages with `0.5` and `0.99 ever`, and only `1 ever` in the incoming message.

The correct way to write this function is as follows:

```solidity
function deployWallet(
    uint256 _wallet_public_key,
    uint128 _deploy_evers
) external {
    tvm.rawReserve(address(this).balance - msg.value, 2);

    TvmCell stateInit = tvm.buildStateInit({
        contr: TokenWalletContract,
        varInit: {
            root_address: address(this),
            wallet_code: wallet_code
        },
        pubkey: _wallet_public_key,
        code: wallet_code
    });

    new TokenWalletContract{
        stateInit: stateInit,
        value: _deploy_evers,
        wid: address(this).wid,
        flag: 0
    }();

    msg.sender.transfer({ value: 0, bounce: false, flag: 128 });
}
```

What we actually have to do first it to call `tvm.rawReserve`, which is like sending a message to yourself, with a `value` equal to the initial balance of the contract.

Then we deploy the wallet with `_deploy_evers`, and at the end, all the money that is left on the balance after the first two messages is sent back to the caller.

This function is guaranteed not to spend the money on the contract. If, in the action phase it does not have enough money to send a message, it will simply be aborted.

The most important thing from the chapter above, when processing internal messages, is this:

- If you apply a `value` that is not `0` to a message, always call `tvm.rawReserve` first.
- `Flag 64` can only be used if your transaction is only sending one outgoing message.

>  The documentation in Everscale repository is a community effort. Therefore, everyone can contribute with proposals for new topics, suggest new content elements, participate in editing, and provide ideas that will be of great help for network development.
Please be informed that our documentation can be [edited via GitHub](https://github.com/everscale-org/docs/issues).  
  Also please make sure to consult our rules and rewards policy via [this link](https://docs.everscale.network/contribute/hot-streams/documentations).  
  Feel free to join [Everscale Documentation Development Telegram chat](https://t.me/+C2IpQXWZtCwxYzEy) and [Everscale Developers Onboarding Telegram chat](https://t.me/+Vca1Gs6uPzIyNWVi)!