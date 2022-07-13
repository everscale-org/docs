---
description: Here is a simple contract that you can get
---

# First Application

Here is a simple contract that you can get, increment and decrement the count store in this contract.

```solidity
// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.53.3 and less than 0.54.0
pragma ton-solidity ^0.53.3;

contract Counter {
    uint public count;

    // Function to get the current count
    function get() public view returns (uint) {
        return count;
    }

    // Function to increment count by 1
    function inc() public {
        count += 1;
    }

    // Function to decrement count by 1
    function dec() public {
        count -= 1;
    }
}
```
