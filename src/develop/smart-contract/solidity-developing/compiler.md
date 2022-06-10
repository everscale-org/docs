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
