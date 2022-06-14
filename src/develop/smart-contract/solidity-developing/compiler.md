---
sidebar_position: 1
---

# Solidity Compiler

Compile the contract code to TVM assembler with the Solidity Compiler.

    <PATH_TO>/TON-Solidity-Compiler/compiler/build/solc/solc Wallet.sol

The compiler produces Wallet.code and Wallet.abi.json to be used in the following steps.

Assemble and link with a standard library into TVM bytecode:

    <PATH_TO>/tvm_linker compile Wallet.code --lib <path-to>/TON-Solidity-Compiler/lib/stdlib_sol.tvm

Binary code of your contract is recorded into WalletAddress.tvc file, where WalletAddress is a temporary address of the contract. 

> The documentation in Everscale repository is a community effort. Therefore, everyone can contribute with proposals for new topics, suggest new content elements, participate in editing, and provide ideas that will be of great help for network development. Please be informed that our documentation can be edited via GitHub. It can be found [**here**](https://docs.everscale.network/). 
Please make sure to consult our rules and rewards policy via [**this link**](https://docs.everscale.network/contribute/hot-streams/documentations).  
Also, for any questions that may arise, you can text via this [**Telegram chat**](https://t.me/+C2IpQXWZtCwxYzEy).