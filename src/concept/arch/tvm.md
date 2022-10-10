---
sidebar_position: 1
description: The TVM, is the virtual machine used to execute smart-contract
---

# TVM

[Everscale Virtual Machine description](https://docs.everscale.network/tvm.pdf)

## About TVM

The TVM, is the virtual machine used to execute smart-contract code in the masterchain and in the basic workchain. Other workchains may use other virtual machines alongside or instead of the TVM. Here we list some of its features. 

- TVM represents all data as a collection of (TVM) cells. Each cell contains up to 128 data bytes and up to 4 references to other cells. As a consequence of the “everything is a bag of cells” philosophy, this enables TVM to work with all data related to the Everscale Blockchain, including blocks and blockchain global state if necessary. 
- TVM can work with values of arbitrary algebraic data types, represented as trees or directed acyclic graphs of TVM cells. However, it is agnostic towards the existence of algebraic data types; it just works with cells. 
- TVM has built-in support for hashmaps.
- TVM is a stack machine. Its stack keeps either 64-bit integers or cell references. 
- 64-bit, 128-bit and 256-bit arithmetic is supported. All n-bit arithmetic operations come in three flavors: for unsigned integers, for signed integers and for integers modulo 2^n (no automatic overflow checks in the latter case). 
- TVM has unsigned and signed integer conversion from n-bit to m-bit, for all 0 ≤ m, n ≤ 256, with overflow checks. 
- All arithmetic operations perform overflow checks by default, greatly simplifying the development of smart contracts. 
- TVM has “multiply-then-shift” and “shift-then-divide” arithmetic operations with intermediate values computed in a larger integer type; this simplifies implementing fixed-point arithmetic. 
- TVM offers support for bit strings and byte strings. 
- Support for 256-bit Elliptic Curve Cryptography (ECC) for some predefined curves, including Curve25519, is present. 
- Support for Weil pairings on some elliptic curves, useful for fast implementation of zk-SNARKs, is also present. 
- Support for popular hash functions, including sha256, is present. 
- TVM can work with Merkle proofs.
- TVM offers support for “large” or “global” smart contracts. Such smart contracts must be aware of sharding. Usual (local) smart contracts can be sharding-agnostic. 
- TVM supports closures. 
- A “spineless tagless G-machine” can be easily implemented inside TVM. 

Several high-level languages can be designed for TVM, in addition to the “TVM assembly”. All these languages will have static types and will support algebraic data types. We envision the following possibilities: 

- A Java-like imperative language, with each smart contract resembling a separate class. 
- A lazy functional language (think of Haskell). 
- An eager functional language (think of ML). 

## Peculiarities of TVM.

The TVM, used to run smart contracts in the masterchain and Workchain Zero, is considerably different from customary designs inspired by the EVM (Ethereum Virtual Machine): it works not just with 256-bit integers, but actually with (almost) arbitrary “records”, “structures”, or “sum-product types”, making it more suitable to execute code written in high-level (especially functional) languages. Essentially, TVM uses tagged data types, not unlike those used in implementations of Prolog or Erlang. \

One might imagine first that the state of a TVM smart contract is not just a hashmap 2^256 → 2^256, or Hashmap(256, 2^256), but (as a first step) Hashmap(256, X), where X is a type with several constructors, enabling it to store, apart from 256-bit integers, other data structures, including other hashmaps Hashmap(256, X) in particular. This would mean that a cell of TVM (persistent or temporary) storage—or a variable or an element of an array in a TVM smart-contract code—may contain not only an integer, but a whole new hashmap. Of course, this would mean that a cell contains not just 256 bits, but also, say, an 8-bit tag, describing how these 256 bits should be interpreted. 

In fact, values do not need to be precisely 256-bit. The value format used by TVM consists of a sequence of raw bytes and references to other structures, mixed in arbitrary order, with some descriptor bytes inserted in suitable locations to be able to distinguish pointers from raw data (e.g., strings or integers);

This raw value format may be used to implement arbitrary sum-product algebraic types. In this case, the value would contain a raw byte first, describing the “constructor” being used (from the perspective of a high-level language), and then other “fields” or “constructor arguments”, consisting of raw bytes and references to other structures depending on the constructor chosen. However, TVM does not know anything about the correspondence between constructors and their arguments; the mixture of bytes and references is explicitly described by certain descriptor bytes.* 

The Merkle tree hashing is extended to arbitrary such structures: to compute the hash of such a structure, all references are recursively replaced by hashes of objects referred to, and then the hash of the resulting byte string (descriptor bytes included) is computed. 

In this way, the Merkle tree hashing for hashmaps, described in 2.3.8, is just a special case of hashing for arbitrary (dependent) algebraic data types, applied to type Hashmap(n, X) with two constructors.**

> *These two descriptor bytes, present in any TVM cell, describe only the total number of references and the total number of raw bytes; references are kept together either before or after all raw bytes. 

> **Actually, Leaf and Node are constructors of an auxiliary type, HashmapAux(n, X). Type Hashmap(n, X) has constructors Root and EmptyRoot, with Root containing a value of type HashmapAux(n, X).

## TVM Cells

Ultimately, the TVM keeps all data in a collection of (TVM) cells. Each cell contains two descriptor bytes first, indicating how many bytes of raw data are present in this cell (up to 128) and how many references to other cells are present (up to four). Then these raw data bytes and references follow. Each cell is referenced exactly once, so we might have included in each cell a reference to its “parent” (the only cell referencing this one). However, this reference need not be explicit. 

In this way, the persistent data storage cells of a Everscale smart contract are organized into a tree,* with a reference to the root of this tree kept in the smart-contract description. If necessary, a Merkle tree hash of this entire persistent storage is recursively computed, starting from the leaves and then simply replacing all references in a cell with the recursively computed hashes of the referenced cells, and subsequently computing the hash of the byte string thus obtained.

>*Logically; the “bag of cells” representation described in 2.5.5 identifies all duplicate cells, transforming this tree into a directed acyclic graph (dag) when serialized.

## Additionally

You can learn more about TVM and how it works from several sources:

1. [Legacy TON Whitepaper](https://zeroheight.com/86757ecb2/p/822e19-2-ton-blockchain/t/01c684)
2. [TVM Whitepaper](https://docs.ton.dev/86757ecb2/p/23c378-introduction)
3. [TVM Extended Instructions](https://tonlabs.notion.site/tonlabs/TVM-Extended-Instructions-f22fb9a10bec4f8cadd9757e7d6df51d)
