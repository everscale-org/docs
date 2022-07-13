---
description: Specifies the compiler version
---

# Hello world

`pragma` specifies the compiler version of TVM Solidity.

```solidity
// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.53.3 and less than 0.54.0
pragma ton-solidity ^0.53.3;

contract HelloWorld {
    string public greet = "Hello World!";
}
```
