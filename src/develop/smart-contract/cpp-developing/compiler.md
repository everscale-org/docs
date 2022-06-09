---
sidebar_position: 1
---

# C/C++ Compiler

The code we wrote so far can be found at Hello, world!. Let’s assume that we put the contract interface into HelloWorld.hpp and its implementation into HelloWorld.cpp. Compilation consist of two steps:

1. Generating the ABI

clang++ -target tvm --sysroot=$TVM_INCLUDE_PATH -export-json-abi -o HelloWorld.abi HelloWorld.cpp

2. Compiling and linking

tvm-build++.py --abi HelloWorld.abi HelloWorld.cpp --include $TVM_INCLUDE_PATH --linkerflags="--genkey key"

The first command produces the ABI file. Note that in case the contract uses an unsupported type, clang will silently generate "unknown" for it in the ABI and the contract will not link. The second command compiles and links the contract. It produces address.tvc file and the file named “key”. Option --genkey produces keys to sign messages and store them to specified files (<filename> - for the private key and <filename.pub> for the public one). Currently all external messages have to be signed, otherwise an error number 40 will occur, so we need a key to sign if we plan to test a contract locally.
