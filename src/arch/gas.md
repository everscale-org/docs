---
title: Gas Calculation for Processing
description: The entire state of TVM consists of the five components
sidebar_position: 10
---

# Gas Calculation for Processing

## Gas calculation basics

### Specification Overview

The entire state of TVM consists of the five components:

- Stack
- Control registers
- Current continuation
- Current codepage
- Gas limits

Collectively these are called `SCCCG`.

Check out section **1.4** of the [TVM specification](https://ton.org/tvm.pdf).

The **Gas** component limits gas usage and сontains four signed 64-bit integers:

- the remaining gas: **gr**
- the current gas limit: **gl**
- the maximal gas limit: **gm**
- the gas credit: **gc**

The following is always true:

$$
0 ≤ gl ≤ gm, gc ≥ 0, and gr ≤ gl + gc
$$

**gc** is initialized by zero for internal messages, **gr** is initialized by `gl + gc` and gradually decreases, as the TVM runs. When gr becomes negative or if contract terminates with `gc > 0`, an **out of gas** exception is triggered.

### Gas prices

As stated in **A.1** of the [TVM specification](https://ton.org/tvm.pdf).

According to the original TON, for most primitives gas is calculated according to the following formula:

$$
Pb := 10 + b
$$

where **b** is the instruction length in bits. The same is true for EverX implementation.

**For example:** the gas required for `A0` (**ADD**) instruction is `10 + 8 = 18 gas`, while the gas for `A6cc` (**ADDCONST** `cc`) instruction is `10 + 16 = 26 gas`.

For some instructions this rule does not apply. TVM specification lists either total gas prices, or prices in addition to the basic **Pb** for them explicitly.

Instruction list with additional information may be obtained in **A.2** through **A.13** of the [TVM specification](https://ton.org/tvm.pdf).

Apart from integer constants, the following expressions may appear:

- The total price of loading cells. Currently it is 100 gas units per cell. Reloading a cell again now costs 25 gas units.
- The total price of creating new Cells from Builders. Currently it is 500 gas units.
- Exception throwing. 50 gas units per exception.
- Exiting the block costs 5 gas units per implicit RET. Jumping to the first link costs 10 gas units - implicit JUMP.
- Moving to a new continuation with transferring parameters costs gas if there are more then 32 parameters. It costs N-32 gas, where N is the number of parameters.
- Tuple gas price. 1 gas unit for every tuple element.

> **Note:** that the most expensive operations are dictionary read/write operations. Dictionaries are stored in the form of trees of cells, where each cell can only be linked to four others. As result, these trees can grow quite large, depending on the data that needs to be stored. To read data in any cell, all its parent cells need to be read first, at the price of 100 gas per cell, and to write data in a cell, similarly all its parent cells need to be (re)created at the price of 500 gas per cell.


### Global gas limits

Global gas limits are values stored in the masterchain configuration contract. Global values are standard and do not change at contract deployment. Only validator consensus can modify them.

The values currently used can always be reviewed on [ever.live](https://ever.live/) in the latest key block details ([example](https://net.ever.live/blocks?section=details&id=8cee868a94b1e22794a927279286dc95498310cda982f4657e351a3da693cf27) `FIXME broken link`). `p20` config parameter values are used for masterchain and `p21` values are used for workchain.

### Gas-related TVM primitives

These is the list of official TVM primitives used for gas-related operations:

- `F800` — `ACCEPT`, sets current gas limit **gl** to its maximal allowed value **gm**, and resets the gas credit **gc** to zero, decreasing the value of **gr** by **gc** in the process. In other words, the current smart contract agrees to buy some gas to finish the current transaction. This action is required to process external messages, which bring no value (hence no gas) with themselves.
- `F801` — `SETGASLIMIT (g – )`, sets current gas limit gl to the minimum of g and gm, and resets the gas credit **gc** to zero. If the gas consumed so far (including the present instruction) exceeds the resulting value of **gl**, an (unhandled) out of gas exception is thrown before setting new gas limits. Notice that `SETGASLIMIT` with an argument `g ≥ 2 63 − 1` is equivalent to `ACCEPT`.
- `F802` — `BUYGAS (x – )`, computes the amount of gas that can be bought for **x** nanotokens, and sets **gl** accordingly in the same way as SETGASLIMIT.
- `F804` — `GRAMTOGAS (x – g)`, computes the amount of gas that can be bought for **x** nanotokens. If **x** is negative, returns 0. If **g** exceeds 2 63−1, it is replaced with this value.
- `F805` — `GASTOGRAM (g – x)`, computes the price of **g** gas in nanotokens.
- `F806–F80F` — Reserved for gas-related primitives. These are yet to be released.

> **Note:** F802, F804, F805 are not implemented in Telegram TON node.

In Evernode, the general gas formula is the same as specified by TON specifications. Overall, Evernode operate in compliance with the specification.

For every executed primitive, the amount of gas is added to the virtual machine according to the specification formula. Gas value for every primitive is based on gr.

## Gas initialization types

### 1. Calling contract from another contract

An internal message with a balance value is received. In this case, the following formulas are applied to determine limits:

```text
gm = MIN(account balance / gas price, global_gas_limit)
gl = MIN(message value / gas price, global_gas_limit)
gc = 0
gr = gc + gl
```

By default, gas costs are allocated to the caller contract that triggers the transaction with a message. Accepting is also available for internal contracts. If `ACCEPT` is not called, gas is taken from the caller contract according to the message value. In other words, the message value defines the current limit. The message value determines the starting TVM gas limit.

So, to put it plain, if `ACCEPT` is not called, the message pays, if `ACCEPT` is used, additional gas can be bought by the target contract. This approach enables flexible contract design where either total gas is paid by the caller contract (but in this case it has to have enough gas at any moment of time) or the target contract also incurs costs.

### 2. Offchain contract call

External messages do not carry balance values. In this case, the values are calculated according to the following formulas:

```text
gm = MIN(account balance / gas price, global_gas_limit)
gl = 0
gc = MIN(gm, global_gas_credit)
gr = gc + gl
```

As external messages have no gas value, gas is credited to execute it. Target contracts have to cover costs by calling Accept to buy gas.

If a contract returns an exception before the credit is given, no gas fee applies.

As the public code for node has just been released this documentation is likely to be updated.



Managing Gas in Solidity
Some Theory
Anyone can send external message to your contract. When a message arrives, the contract initial gas limit is equal to 10,000 units of credit gas that should be bought later by the ACCEPT TVM primitive. Otherwise when credit gas falls to zero, the TVM throws the out of gas exception. The contract is supposed to spend these 10,000 units of 'free' gas to check the body of an inbound message tp make sure that it is valid and can be processed by contract successfully.

The idea of credit gas allowance is that as long as it is beyond zero, any exception thrown by contract prevents all further gas charges. But once the contract accepts a message, all gas consumed by contract is converted to gas fees regardless of whether a transaction is aborted or not.

ACCEPT is useful in internal messages too. When another contract sends an internal message to your contract, initial gas limit is equal to an inbound message value divided by the gas_price or global gas limit, if it is smaller. If this value is not enough to finish execution, the contract then can increase its gas limit by calling ACCEPT or SETGASLIMIT primitive. The ACCEPT primitive increases the limit to the value of its balance divided by the gas_price, and the SETGASLIMIT primitive sets the current gas limit to the value popped from the TVM stack (the value cannot be bigger than the gm limit).

With the ACCEPT command a contract can choose whether gas for its execution is paid by the caller contract or by the contract itself.

Implementation
In EverX the ACCEPT primitive is implemented in Solidity as a private function called by public functions.

Find below actual usage examples. All can be compiled using EverX Solidity compiler.



Accept gas inside function
To avoid gas payment when the foo function is called by another contract, we can use the following code:

Remember that the caller contract should attach enough tokens to its message to cover all gas that will be spend by foo function.



Accept gas inside modifier

```solidity
contract AcceptExample2 {
    uint _sum = 0;
    
    modifier AlwaysAccept() {
        tvm.accept();
        _;
    }
    
    function foo(uint a, uint b) AlwaysAccept() public {
        _sum = a + b;
    }
}
```
> **Important:** modifier is called before arguments are deserialized from inbound message body. In the example above `AlwaysAccept()` will be called before `a` and `b` are decoded.