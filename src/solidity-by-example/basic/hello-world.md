---
sidebar_position: 1
title: "Hello World"
description: Specifies the compiler version of Solidity
---

`pragma` specifies the compiler version of Solidity.


```solidity
// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.70.0 and less than 0.71.0
pragma ever-solidity ^0.70.0;

contract HelloWorld {
    string public greet = "Hello World!";
}
```

## Deploying the contract

```shell
npx everdev sol set --compiler 0.70.0
npx everdev sol compile hello-world.sol
npx everdev contract deploy hello-world -v 100000000
```

## Interacting with the contract

```shell
npx everdev contract run-local hello-world greet
```
