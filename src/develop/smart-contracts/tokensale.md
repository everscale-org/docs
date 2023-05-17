---
sidebar_position: 3
---

# Tutorial: Tokensale

Let's write a simple, step-by-step tokensale contract. 

For this we need an Everscale development environment. If you don't have it installed yet, please [follow this link](https://github.com/broxus/locklift#quick-start).   
In case you do, please proceed with locklift init. 

```shell
npx locklift init --path my-first-crowdsale
```

Now, we need TIP-3 sources. Let’s add them.

```json title="package.json" showLineNumbers
{
  "devDependencies": {
    "tip3": "git://github.com/broxus/tip3#v5",
    ...
  },
}
```

```typescript title="locklift.config.ts" showLineNumbers
compiler: {
    ...
    externalContracts: {
      "node_modules/tip3/build": ["TokenRoot", "TokenWallet"],
    },
  }
```

Well done! Now it's the time to proceed with our tokensale contract.        
Create a `Tokensale.sol` file in your contracts folder. Let's firstly arrange pragmas and imports.


```solidity title="Tokensale.sol" showLineNumbers
pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "tip3/contracts/interfaces/IAcceptTokensTransferCallback.sol";
import "tip3/contracts/interfaces/ITokenRoot.sol";
import "tip3/contracts/interfaces/ITokenWallet.sol";
```

We will use some interfaces from the TIP-3 implementation. Let's define our contract state and constructor.

```solidity title="Tokensale.sol" showLineNumbers
contract Tokensale {
    uint16  static _nonce; // Some random value to affect on contract address
    address static _owner; // Tokensale owner. Will receive all transfers

    address public _distributedTokenRoot; // TIP3 TokenRoot address for deploying wallet for Tokensale. This token will be distributed
    address public _distributedTokenWallet; // TIP3 wallet for Tokensale for sending purchased tokens
    uint256 public _supply; // How much tokens will be distributed (with decimals)
    uint128 public _rate; // How much tokens buyer will receive for 1 nanoever (1*10^9)

    constructor(
        address distributedTokenRoot,
        uint256 supply,
        uint128 rate,
        address sendRemainingGasTo
    ) public {
        tvm.accept(); // This action is required to process external messages that bring no value - deploy as we have.
        tvm.rawReserve(1 ever, 0); // we will always reserve 1 ever on this contract
        _distributedTokenRoot = distributedTokenRoot;
        _rate = rate;
        _supply = supply;

        // fundamental mechanic of dapps working with tip3 - deploy it's own wallet to operate with. check tip3 specs for more info
        ITokenRoot(distributedTokenRoot).deployWallet {
            value: 0.2 ever,
            flag: 1,
            callback: Tokensale.onTokenWallet // this callback will be called by TokenRoot after deploying wallet for tokensale
        } (
            address(this),
            0.1 ever
        );
        // sending remaining gas after setups
        sendRemainingGasTo.transfer({ value: 0, flag: 128, bounce: false });
    }
}
```

Let's delve a bit into some mechanics of this piece of code. The first thing that you should look at is gas management.     
Look at these two lines:

```solidity
tvm.rawReserve(1 ever, 0);
sendRemainingGasTo.transfer({ value: 0, flag: 128, bounce: false });
```

The **first line** reserves 1 EVER in this contract. Practically, it generates an outbound message carrying reserve nanoevers to oneself so that the next actions performed would not be able to spend more evers than the remainder.

**The second line** is a best practice for gas management in Everscale. You should always send the remaining gas to the message sender or another given address. 

Pay attention to `value` and `flag` parameters of `transfer` function. Flag 128 means that this transfer will carry all remaining non-reserved gas! To sum up, we have the following flow:

Reserving some initial contract balance for an always active state.     
Perform contract logic (may be checking inbound value in case needed).      
Send remaining gas with 128 flag to the message sender or another pointed address.      
The next important logic of our constructor code is deploying a wallet for the contract on-chain.       


```solidity title="Tokensale.sol" showLineNumbers
...
        ITokenRoot(distributedTokenRoot).deployWallet {
            value: 0.2 ever,
            flag: 1,
            callback: Tokensale.onTokenWallet // this callback will be called by TokenRoot after deploying wallet for tokensale
        } (
            address(this),
            0.1 ever
        );
...
```

This action generates an outbound message to `TokenRoot` contract by calling a `deployWallet` function. This function is `responsible`. It means that it will generate an internal outbound message by `calling` a function that was passed in a callback parameter (`onTokenWallet` in our case). Let's implement this function for our `Tokensale` contract. From TIP-3 source code we know that `deployWallet` returns only one parameter - deployed wallet address. So, just store it in our state.


```solidity title="Tokensale.sol" showLineNumbers
...
    function onTokenWallet(address value) external {
        require (
            msg.sender.value != 0 &&
            msg.sender == _distributedTokenRoot, // check, that calling was from TokenRoot we need
            101 // some error code for this require
        );
        tvm.rawReserve(1 ever, 0);
        _distributedTokenWallet = value; // store deployed tip3 wallet address
        _owner.transfer({ value: 0, flag: 128, bounce: false }); // sending remaining gas after setups
    }
...
```

That's all. When we deploy the `Tokensale` contract, `deployWallet` will be called too and the returned value will be stored in our contract state. All we need is a function to sell our tokens.


```solidity title="Tokensale.sol" showLineNumbers
...
    function buyTokens(uint128 deposit) external view {
        tvm.rawReserve(1 ever, 0);
        // 1 ever is a technical value for fee...remaining gas will be returned after tokens transfer (from tip3 wallet)
        if (deposit > msg.value + 1 ever) { // if we using require, we are frozing incoming value in this contract, so just return it 
            msg.sender.transfer({ value: 0, flag: 128, bounce: false });
        } else {
            uint128 purchase = _rate * deposit;
            if (purchase > _supply) {
                msg.sender.transfer({ value: 0, flag: 128, bounce: false});
            } else {
                TvmCell empty;
                // here we just operate with deployed in constructor wallet. owner should provide token supply on this wallet before sales!
                ITokenWallet(_distributedTokenWallet).transfer{ value: 0, flag: 128 }(
                    purchase,
                    msg.sender,
                    0.1 ever, // this parameter allows to deploy wallet for user, if it's not deployed yet. (fee takes from message so will be payed by user)
                    msg.sender,
                    false,
                    empty
                );
            }
        }
    }
...
```

Notice that we don't use `require` instruction to check incoming value. If we use `require`, the user's deposit will not be returned to the sender and will stay in the contract. So anyone can take this as a remaining gas, according to gas management (because these evers won't be reserved). Best practice - when you check something incoming (evers, other TIP-3 tokens), you should use `if` instead of `require`.

The next mechanic is already familiar to you. Tokensale just calls its own deployed in the constructor wallet to transfer tokens for a buyer. Of course, you should transfer supply tokens to the tokensale wallet before the sale starts :)


```solidity
ITokenWallet(_distributedTokenWallet).transfer{ value: 0, flag: 128 }(
    purchase,
    msg.sender,
    0.1 ever, // this parameter allows to deploy wallet for user, if it's not deployed yet. (fee takes from message so will be payed by user)
    msg.sender,
    false,
    empty
);
```

Pay attention to `value` and `flag`. Again 0 and 128. This allows us to delegate sending of the remaining gas to the TokenWallet contract (of course if you are sure, that delegate performs this action). We send all remaining non-reserved gas to TokenWallet, and, after its own actions, TokenWallet will return the remaining gas where required. (4th parameter of transfer function).

So, let's check our final contract code


```solidity title="Tokensale.sol" showLineNumbers
pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "tip3/contracts/interfaces/IAcceptTokensTransferCallback.sol";
import "tip3/contracts/interfaces/ITokenRoot.sol";
import "tip3/contracts/interfaces/ITokenWallet.sol";


contract Tokensale {
    uint16  static _nonce; // some random value to affect on contract address
    address static _owner; // tokensale owner. will receive all transfers

    address public _distributedTokenRoot; // TIP3 TokenRoot address for deploying wallet for Tokensale. This token will be distributed
    address public _distributedTokenWallet; // TIP3 wallet for Tokensale for sending purchased tokens
    uint256 public _supply; // How much tokens will be distributed (with decimals)
    uint128 public _rate; // How much tokens buyer will receive for 1 nanoever (1*10^9)

    constructor(
        address distributedTokenRoot,
        uint256 supply,
        uint128 rate,
        address sendRemainingGasTo
    ) public {
        tvm.accept();
        tvm.rawReserve(1 ever, 0); // we will always reserve 1 ever on this contract
        _distributedTokenRoot = distributedTokenRoot;
        _rate = rate;
        _supply = supply;

        // fundamental mechanic of dapps working with tip3 - deploy it's own wallet to operate with. check tip3 specs for more info
        ITokenRoot(distributedTokenRoot).deployWallet {
            value: 0.2 ever,
            flag: 1,
            callback: Tokensale.onTokenWallet // this callback will be called by TokenRoot after deploying wallet for tokensale
        } (
            address(this),
            0.1 ever
        );
        // sending remaining gas after setups
        sendRemainingGasTo.transfer({ value: 0, flag: 128, bounce: false });
    }

    function onTokenWallet(address value) external {
        require (
            msg.sender.value != 0 &&
            msg.sender == _distributedTokenRoot,
            101
        );
        tvm.rawReserve(1 ever, 0);
        _distributedTokenWallet = value; // store deployed tip3 wallet address
        _owner.transfer({ value: 0, flag: 128, bounce: false }); // sending remaining gas after setups
    }

    function buyTokens(uint128 deposit) external view {
        tvm.rawReserve(1 ever, 0);
        // 1 ever is a technical value for fee...remaining gas will be returned after tokens transfer (from tip3 wallet)
        if (deposit > msg.value + 1 ever) { // if we using require, we are frozing incoming value in this contract, so just return it 
            msg.sender.transfer({ value: 0, flag: 128, bounce: false });
        } else {
            uint128 purchase = _rate * deposit;
            if (purchase > _supply) {
                msg.sender.transfer({ value: 0, flag: 128, bounce: false});
            } else {
                TvmCell empty;
                // here we just operate with deployed in constructor wallet. owner should provide token supply on this wallet before sales!
                ITokenWallet(_distributedTokenWallet).transfer{ value: 0, flag: 128 }(
                    purchase,
                    msg.sender,
                    0.1 ever, // this parameter allows to deploy wallet for user, if it's not deployed yet. (fee takes from message so will be payed by user)
                    msg.sender,
                    false,
                    empty
                );
            }
        }
    }
}
```

All you need now is to write some tests with locklift support. There are some simple tests and deploy scripts available in the following [repo](https://github.com/venom-blockchain/guides/tree/master/tokensale-contracts).