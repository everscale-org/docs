---
sidebar_position: 1
[//]: # (draft: true)
---

# TON Solidity Compiler

[TON Solidity Compiler](https://github.com/tonlabs/TON-Solidity-Compiler) is the Solidity smart contract compiler port for the Everscale blockchain. 

You can read the TON Solidity API documentation at [this link](https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/API.md).

In this section we will tell you how to build and install the Solidity Compiler.    
For more information, see the [appropriate EverX repository.](https://github.com/tonlabs/TON-Solidity-Compiler)

## Prerequisites:

- [GitBash](https://git-scm.com/downloads)
- [Cmake](https://cmake.org/)

## Ubuntu Linux

```shell
git clone git@github.com:tonlabs/TON-Solidity-Compiler.git
cd TON-Solidity-Compiler
sh ./compiler/scripts/install_deps.sh
mkdir build
cd build
cmake ../compiler/ -DCMAKE_BUILD_TYPE=Release
cmake --build . -- -j8
```

Make other Everscale toolchain utilities aware of the language runtime library location via an environment variable: specify path to `stdlib_sol.tvm`.

```
sh ./compiler/scripts/install_lib_variable.sh
```

## Windows

```
git clone https://github.com/tonlabs/TON-Solidity-Compiler
cd TON-Solidity-Compiler
cmake -P compiler\scripts\install_deps.cmake
mkdir build
cd build
cmake ..\compiler
cmake --build . --config Release -j 8
```

To facilitate work with other Everscale tools add path to `stdlib_sol.tvm` into environment variable `TVM_LINKER_LIB_PATH`.

>  The documentation in Everscale repository is a community effort. Therefore, everyone can contribute with proposals for new topics, suggest new content elements, participate in editing, and provide ideas that will be of great help for network development.
Please be informed that our documentation can be [edited via GitHub](https://github.com/everscale-org/docs/issues).  
  Also please make sure to consult our rules and rewards policy via [this link](https://docs.everscale.network/contribute/hot-streams/documentations).  
  Feel free to join [Everscale Documentation Development Telegram chat](https://t.me/+C2IpQXWZtCwxYzEy) and [Everscale Developers Onboarding Telegram chat](https://t.me/+Vca1Gs6uPzIyNWVi)!
