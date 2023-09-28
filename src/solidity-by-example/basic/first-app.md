---
sidebar_position: 2
title: First Application
description: Specifies the compiler version of Solidity
---

Here is a simple contract that you can get, increment and decrement the count store in this contract.

```solidity
// SPDX-License-Identifier: MIT
pragma ever-solidity ^0.70.0;

contract Counter {
    uint public count;

    // Function to increment count by 1
    function inc() public {
        // This action is required to process external messages that bring no value
        tvm.accept();
        count += 1;
    }

    // Function to decrement count by 1
    function dec() public {
        // This action is required to process external messages that bring no value
        tvm.accept();
        // This function will fail if count = 0
        count -= 1;
    }
}
```

## Deploying the contract

```shell
npx everdev sol compile first-app.sol
npx everdev contract deploy first-app -v 100000000
```

## Interacting with the contract

```shell
npx everdev contract run first-app inc
npx everdev contract run-local first-app count
npx everdev contract run first-app dec
npx everdev contract run-local first-app count
```
