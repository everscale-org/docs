# TVM Instructions

## Contents
1. [**Introduction**](#_1-introduction)
   1. [**Gas prices**](#_11-gas-prices)
   2. [**CSV table**](#_12-csv-table)
2. [**Stack manipulation primitives**](#_2-stack-manipulation-primitives)
   1. [**Basic stack manipulation primitives**](#_21-basic-stack-manipulation-primitives)
   2. [**Complex stack manipulation primitives**](#_22-complex-stack-manipulation-primitives)
3. [**Tuple, List, and Null primitives**](#_3-tuple-list-and-null-primitives)
4. [**Constant, or literal primitives**](#_4-constant-or-literal-primitives)
   1. [**Integer and boolean constants**](#_41-integer-and-boolean-constants)
   2. [**Constant slices, continuations, cells, and references**](#_42-constant-slices-continuations-cells-and-references)
5. [**Arithmetic primitives**](#_5-arithmetic-primitives)
   1. [**Addition, subtraction, multiplication**](#_51-addition-subtraction-multiplication)
   2. [**Division**](#_52-division)
   3. [**Shifts, logical operations**](#_53-shifts-logical-operations)
   4. [**Quiet arithmetic primitives**](#_54-quiet-arithmetic-primitives)
6. [**Comparison primitives**](#_6-comparison-primitives)
   1. [**Integer comparison**](#_61-integer-comparison)
   2. [**Other comparison**](#_62-other-comparison)
7. [**Cell primitives**](#_7-cell-primitives)
   1. [**Cell serialization primitives**](#_71-cell-serialization-primitives)
   2. [**Cell deserialization primitives**](#_72-cell-deserialization-primitives)
8. [**Continuation and control flow primitives**](#_8-continuation-and-control-flow-primitives)
   1. [**Unconditional control flow primitives**](#_81-unconditional-control-flow-primitives)
   2. [**Conditional control flow primitives**](#_82-conditional-control-flow-primitives)
   3. [**Control flow primitives: loops**](#_83-control-flow-primitives-loops)
   4. [**Manipulating the stack of continuations**](#_84-manipulating-the-stack-of-continuations)
   5. [**Creating simple continuations and closures**](#_85-creating-simple-continuations-and-closures)
   6. [**Operations with continuation savelists and control registers**](#_86-operations-with-continuation-savelists-and-control-registers)
   7. [**Dictionary subroutine calls and jumps**](#_87-dictionary-subroutine-calls-and-jumps)
9. [**Exception generating and handling primitives**](#_9-exception-generating-and-handling-primitives)
10. [**Dictionary manipulation primitives**](#_10-dictionary-manipulation-primitives)
    1. [**Dictionary creation**](#_101-dictionary-creation)
    2. [**Dictionary serialization and deserialization**](#_102-dictionary-serialization-and-deserialization)
    3. [**Get dictionary operations**](#_103-get-dictionary-operations)
    4. [**Set/Replace/Add dictionary operations**](#_104-setreplaceadd-dictionary-operations)
    5. [**Builder-accepting variants of Set dictionary operations**](#_105-builder-accepting-variants-of-set-dictionary-operations)
    6. [**Delete dictionary operations**](#_106-delete-dictionary-operations)
    7. [**"Maybe reference" dictionary operations**](#_107-maybe-reference-dictionary-operations)
    8. [**Prefix code dictionary operations**](#_108-prefix-code-dictionary-operations)
    9. [**Variants of GetNext and GetPrev operations**](#_109-variants-of-getnext-and-getprev-operations)
    10. [**GetMin, GetMax, RemoveMin, RemoveMax operations**](#_1010-getmin-getmax-removemin-removemax-operations)
    11. [**Special Get dictionary and prefix code dictionary operations, and constant dictionaries**](#_1011-special-get-dictionary-and-prefix-code-dictionary-operations-and-constant-dictionaries)
    12. [**SubDict dictionary operations**](#_1012-subdict-dictionary-operations)
11. [**Application-specific primitives**](#_11-application-specific-primitives)
    1. [**Gas-related primitives**](#_111-gas-related-primitives)
    2. [**Pseudo-random number generator primitives**](#_112-pseudo-random-number-generator-primitives)
    3. [**Configuration primitives**](#_113-configuration-primitives)
    4. [**Global variable primitives**](#_114-global-variable-primitives)
    5. [**Hashing and cryptography primitives**](#_115-hashing-and-cryptography-primitives)
    6. [**Miscellaneous primitives**](#_116-miscellaneous-primitives)
    7. [**Currency manipulation primitives**](#_117-currency-manipulation-primitives)
    8. [**Message and address manipulation primitives**](#_118-message-and-address-manipulation-primitives)
    9. [**Outbound message and output action primitives**](#_119-outbound-message-and-output-action-primitives)
12. [**Debug primitives**](#_12-debug-primitives)
13. [**Codepage primitives**](#_13-codepage-primitives)
14. [**Gosh Network**](#_14-gosh-network)

## 1 Introduction
This document provides a list of TVM instrucions, their opcodes and mnemonics.

[Here](https://ton-blockchain.github.io/docs/tvm.pdf) is a description of TVM.

Fift is a stack-based programming language designed to manage TON smart contracts. The Fift assembler is a Fift library that converts mnemonics of TVM instructions to their binary representation.

A description of Fift, including the introduction to the Fift assembler, can be found [here](https://github.com/Piterden/TON-docs/blob/master/Fift.%20A%20Brief%20Introduction.md).

This document specifies the corresponding mnemonic for each instruction. Note the following:

1. Fift is a stack-based language, therefore all arguments of an instruction are written before it (e.g. `5 PUSHINT`, `s0 s4 XCHG`).
2. Stack registers are denoted by `s0, s1, ..., s15`. Other stack registers (up to 255) are denoted by `i s()` (e.g. `100 s()`).
3. Control registers are denoted by `c0, c1, ..., c15`.

### 1.1 Gas prices
The gas price of each instruction is specified in this document. The basic gas price of an instruction is `10 + b`, where `b` is the instruction length in bits. Some operations have additional fees:
1. _Parsing cells_: Transforming a cell into a slice costs **100 gas units** if the cell is loading for the first time and **25** for subsequent loads during the same transaction. For such instructions, two gas prices are specified (e.g. `CTOS`: `118/43`).
2. _Cell creation_: **500 gas units**.
3. _Throwing exceptions_: **50 gas units**. In this document the exception fee is only specified for an instruction if its primary purpose is to throw (e.g. `THROWIF`, `FITS`). If the instruction only throws in some cases, two gas prices are specified (e.g. `FITS`: `26/76`).
4. _Tuple creation_: **1 gas unit** for every tuple element.
5. _Implicit jumps_: **10 gas units** for an implicit jump, **5 gas units** for an implicit back jump. This fee is not a part of any instruction.
6. _Moving stack elements between continuations_: **1 gas unit** per element, however first 32 elements moving is free.

### 1.2 CSV table
Machine-readable list of TVM instructions is available [here](./opcodes/tvm_opcodes.csv).

## 2 Stack manipulation primitives
Here `0 <= i,j,k <= 15` if not stated otherwise.

### 2.1 Basic stack manipulation primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`00`** | `NOP` |  | _`-`_ | <div id='instr-nop'>Does nothing.</div> | `18` |
| **`01`** | `SWAP` | `yo` | _`x y - y x`_ | <div id='instr-swap'>Same as [`s1 XCHG0`](#instr-xchg-0i).</div> | `18` |
| **`0i`** | `s[i] XCHG0` |  |  | <div id='instr-xchg-0i'>Interchanges `s0` with `s[i]`, `1 <= i <= 15`.</div> | `18` |
| **`10ij`** | `s[i] s[j] XCHG` |  |  | <div id='instr-xchg-ij'>Interchanges `s[i]` with `s[j]`, `1 <= i < j <= 15`.</div> | `26` |
| **`11ii`** | `s0 [ii] s() XCHG` |  |  | <div id='instr-xchg-0i-long'>Interchanges `s0` with `s[ii]`, `0 <= ii <= 255`.</div> | `26` |
| **`1i`** | `s1 s[i] XCHG` |  |  | <div id='instr-xchg-1i'>Interchanges `s1` with `s[i]`, `2 <= i <= 15`.</div> | `18` |
| **`2i`** | `s[i] PUSH` |  |  | <div id='instr-push'>Pushes a copy of the old `s[i]` into the stack.</div> | `18` |
| **`20`** | `DUP` | `0x20` | _`x - x x`_ | <div id='instr-dup'>Same as [`s0 PUSH`](#instr-push).</div> | `18` |
| **`21`** | `OVER` | `0x21` | _`x y - x y x`_ | <div id='instr-over'>Same as [`s1 PUSH`](#instr-push).</div> | `18` |
| **`3i`** | `s[i] POP` |  |  | <div id='instr-pop'>Pops the old `s0` value into the old `s[i]`.</div> | `18` |
| **`30`** | `DROP` | `0x30` | _`x -`_ | <div id='instr-drop'>Same as [`s0 POP`](#instr-pop), discards the top-of-stack value.</div> | `18` |
| **`31`** | `NIP` | `0x31` | _`x y - y`_ | <div id='instr-nip'>Same as [`s1 POP`](#instr-pop).</div> | `18` |
### 2.2 Complex stack manipulation primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`4ijk`** | `s[i] s[j] s[k] XCHG3` | `[s1 = parse_stack_register_u4] [s2 = parse_stack_register_u4] [s3 = parse_stack_register_u4] 0x40 ｜ s1, (s2 << 4) ｜ s3` |  | <div id='instr-xchg3'>Equivalent to [`s2 s[i] XCHG`](#instr-xchg-ij) [`s1 s[j] XCHG`](#instr-xchg-ij) [`s[k] XCHG0`](#instr-xchg-0i).</div> | `26` |
| **`50ij`** | `s[i] s[j] XCHG2` | `[s1 = parse_stack_register_u4] [s2 = parse_stack_register_u4] 0x50, (s1 << 4) ｜ s2` |  | <div id='instr-xchg2'>Equivalent to [`s1 s[i] XCHG`](#instr-xchg-ij) [`s[j] XCHG0`](#instr-xchg-0i).</div> | `26` |
| **`51ij`** | `s[i] s[j] XCPU` | `[s1 = parse_stack_register_u4][s2 = parse_stack_register_u4] 0x51, (s1 << 4) ｜ s2` |  | <div id='instr-xcpu'>Equivalent to [`s[i] XCHG0`](#instr-xchg-0i) [`s[j] PUSH`](#instr-push).</div> | `26` |
| **`52ij`** | `s[i] s[j-1] PUXC` | `[s1 = parse_stack_register_u4][s2 = parse_stack_register_u4_minus_one] 0x52, (s1 << 4) ｜ s2` |  | <div id='instr-puxc'>Equivalent to [`s[i] PUSH`](#instr-push) [`SWAP`](#instr-swap) [`s[j] XCHG0`](#instr-xchg-0i).</div> | `26` |
| **`53ij`** | `s[i] s[j] PUSH2` | `[s1 = parse_stack_register_u4] [s2 = parse_stack_register_u4] 0x53, (s1 << 4) ｜ s2` |  | <div id='instr-push2'>Equivalent to [`s[i] PUSH`](#instr-push) [`s[j+1] PUSH`](#instr-push).</div> | `26` |
| **`540ijk`** | `s[i] s[j] s[k] XCHG3_l` |  |  | <div id='instr-xchg3-alt'>Long form of [`XCHG3`](#instr-xchg3).</div> | `34` |
| **`541ijk`** | `s[i] s[j] s[k] XC2PU` | `[s1 = parse_stack_register_u4] [s2 = parse_stack_register_u4] [s3 = parse_stack_register_u4] 0x54, 0x10 ｜ s1, (s2 << 4) ｜ s3` |  | <div id='instr-xc2pu'>Equivalent to [`s[i] s[j] XCHG2`](#instr-xchg2) [`s[k] PUSH`](#instr-push).</div> | `34` |
| **`542ijk`** | `s[i] s[j] s[k-1] XCPUXC` | `[s1 = parse_stack_register_u4] [s2 = parse_stack_register_u4] [s3 = parse_stack_register_u4_minus_one] 0x54, 0x20 ｜ s1, (s2 << 4) ｜ s3` |  | <div id='instr-xcpuxc'>Equivalent to [`s1 s[i] XCHG`](#instr-xchg-ij) [`s[j] s[k-1] PUXC`](#instr-puxc).</div> | `34` |
| **`543ijk`** | `s[i] s[j] s[k] XCPU2` | `[s1 = parse_stack_register_u4] [s2 = parse_stack_register_u4] [s3 = parse_stack_register_u4] 0x54, 0x30 ｜ s1, (s2 << 4) ｜ s3` |  | <div id='instr-xcpu2'>Equivalent to [`s[i] XCHG0`](#instr-xchg-0i) [`s[j] s[k] PUSH2`](#instr-push2).</div> | `34` |
| **`544ijk`** | `s[i] s[j-1] s[k-1] PUXC2` |  |  | <div id='instr-puxc2'>Equivalent to [`s[i] PUSH`](#instr-push) [`s2 XCHG0`](#instr-xchg-0i) [`s[j] s[k] XCHG2`](#instr-xchg2).</div> | `34` |
| **`545ijk`** | `s[i] s[j-1] s[k-1] PUXCPU` | `[s1 = parse_stack_register_u4] [s2 = parse_stack_register_u4_minus_one] [s3 = parse_stack_register_u4_minus_one] 0x54, 0x50 ｜ s1, (s2 << 4) ｜ s3` |  | <div id='instr-puxcpu'>Equivalent to [`s[i] s[j-1] PUXC`](#instr-puxc) [`s[k] PUSH`](#instr-push).</div> | `34` |
| **`546ijk`** | `s[i] s[j-1] s[k-2] PU2XC` | `[s1 = parse_stack_register_u4] [s2 = parse_stack_register_u4_minus_one] [s3 = parse_stack_register_u4_minus_two] 0x54, 0x60 ｜ s1, (s2 << 4) ｜ s3` |  | <div id='instr-pu2xc'>Equivalent to [`s[i] PUSH`](#instr-push) [`SWAP`](#instr-swap) [`s[j] s[k-1] PUXC`](#instr-puxc).</div> | `34` |
| **`547ijk`** | `s[i] s[j] s[k] PUSH3` |  |  | <div id='instr-push3'>Equivalent to [`s[i] PUSH`](#instr-push) [`s[j+1] s[k+1] PUSH2`](#instr-push2).</div> | `34` |
| **`55ij`** | `[i+1] [j+1] BLKSWAP` | `[c1 = parse_const_u4_plus_one] [c2 = parse_const_u4_plus_one] => 0x55, (c1 << 4) ｜ c2` |  | <div id='instr-blkswap'>Permutes two blocks `s[j+i+1] … s[j+1]` and `s[j] … s0`.<br/>`0 <= i,j <= 15`<br/>Equivalent to [`[i+1] [j+1] REVERSE`](#instr-reverse) [`[j+1] 0 REVERSE`](#instr-reverse) [`[i+j+2] 0 REVERSE`](#instr-reverse).</div> | `26` |
| **`5513`** | `ROT2`<br/>`2ROT` | `0x55, 0x13` | _`a b c d e f - c d e f a b`_ | <div id='instr-rot2'>Rotates the three topmost pairs of stack entries.</div> | `26` |
| **`550i`** | `[i+1] ROLL` | `[c = parse_const_u4_plus_one] 0x55, c` |  | <div id='instr-roll'>Rotates the top `i+1` stack entries.<br/>Equivalent to [`1 [i+1] BLKSWAP`](#instr-blkswap).</div> | `26` |
| **`55i0`** | `[i+1] -ROLL`<br/>`[i+1] ROLLREV` | `[c = parse_const_u4_plus_one] 0x55, c << 4` |  | <div id='instr-rollrev'>Rotates the top `i+1` stack entries in the other direction.<br/>Equivalent to [`[i+1] 1 BLKSWAP`](#instr-blkswap).</div> | `26` |
| **`56ii`** | `[ii] s() PUSH` |  |  | <div id='instr-push-long'>Pushes a copy of the old `s[ii]` into the stack.<br/>`0 <= ii <= 255`</div> | `26` |
| **`57ii`** | `[ii] s() POP` |  |  | <div id='instr-pop-long'>Pops the old `s0` value into the old `s[ii]`.<br/>`0 <= ii <= 255`</div> | `26` |
| **`58`** | `ROT` | `0x58` | _`a b c - b c a`_ | <div id='instr-rot'>Equivalent to [`1 2 BLKSWAP`](#instr-blkswap) or to [`s2 s1 XCHG2`](#instr-xchg2).</div> | `18` |
| **`59`** | `ROTREV`<br/>`-ROT` | `0x59` | _`a b c - c a b`_ | <div id='instr-rotrev'>Equivalent to [`2 1 BLKSWAP`](#instr-blkswap) or to [`s2 s2 XCHG2`](#instr-xchg2).</div> | `18` |
| **`5A`** | `SWAP2`<br/>`2SWAP` | `0x5A` | _`a b c d - c d a b`_ | <div id='instr-swap2'>Equivalent to [`2 2 BLKSWAP`](#instr-blkswap) or to [`s3 s2 XCHG2`](#instr-xchg2).</div> | `18` |
| **`5B`** | `DROP2`<br/>`2DROP` | `0x5B` | _`a b -`_ | <div id='instr-drop2'>Equivalent to [`DROP`](#instr-drop) [`DROP`](#instr-drop).</div> | `18` |
| **`5C`** | `DUP2`<br/>`2DUP` | `0x5C` | _`a b - a b a b`_ | <div id='instr-dup2'>Equivalent to [`s1 s0 PUSH2`](#instr-push2).</div> | `18` |
| **`5D`** | `OVER2`<br/>`2OVER` | `0x5D` | _`a b c d - a b c d a b`_ | <div id='instr-over2'>Equivalent to [`s3 s2 PUSH2`](#instr-push2).</div> | `18` |
| **`5Eij`** | `[i+2] [j] REVERSE` | `[c1 = parse_const_u4_plus_two] [c2 = parse_const_u4] 0x5E, (c1 << 4) ｜ c2` |  | <div id='instr-reverse'>Reverses the order of `s[j+i+1] … s[j]`.</div> | `26` |
| **`5F0i`** | `[i] BLKDROP` | `[c = parse_const_u4] 0x5F, c` |  | <div id='instr-blkdrop'>Equivalent to [`DROP`](#instr-drop) performed `i` times.</div> | `26` |
| **`5Fij`** | `[i] [j] BLKPUSH` | `[c1 = parse_const_u4_nonzero] [c2 = parse_const_u4] 0x5F, (c1 << 4) ｜ c2` |  | <div id='instr-blkpush'>Equivalent to `PUSH s(j)` performed `i` times.<br/>`1 <= i <= 15`, `0 <= j <= 15`.</div> | `26` |
| **`60`** | `PICK`<br/>`PUSHX` | `0x60` |  | <div id='instr-pick'>Pops integer `i` from the stack, then performs [`s[i] PUSH`](#instr-push).</div> | `18` |
| **`61`** | `ROLLX` | `0x61` |  | <div id='instr-rollx'>Pops integer `i` from the stack, then performs [`1 [i] BLKSWAP`](#instr-blkswap).</div> | `18` |
| **`62`** | `-ROLLX`<br/>`ROLLREVX` | `0x62` |  | <div id='instr--rollx'>Pops integer `i` from the stack, then performs [`[i] 1 BLKSWAP`](#instr-blkswap).</div> | `18` |
| **`63`** | `BLKSWX` | `0x63` |  | <div id='instr-blkswx'>Pops integers `i`,`j` from the stack, then performs [`[i] [j] BLKSWAP`](#instr-blkswap).</div> | `18` |
| **`64`** | `REVX` | `0x64` |  | <div id='instr-revx'>Pops integers `i`,`j` from the stack, then performs [`[i] [j] REVERSE`](#instr-reverse).</div> | `18` |
| **`65`** | `DROPX` | `0x65` |  | <div id='instr-dropx'>Pops integer `i` from the stack, then performs [`[i] BLKDROP`](#instr-blkdrop).</div> | `18` |
| **`66`** | `TUCK` | `0x66` | _`a b - b a b`_ | <div id='instr-tuck'>Equivalent to [`SWAP`](#instr-swap) [`OVER`](#instr-over) or to [`s1 s1 XCPU`](#instr-xcpu).</div> | `18` |
| **`67`** | `XCHGX` | `0x67` |  | <div id='instr-xchgx'>Pops integer `i` from the stack, then performs [`s[i] XCHG`](#instr-xchg-ij).</div> | `18` |
| **`68`** | `DEPTH` | `0x68` | _`- depth`_ | <div id='instr-depth'>Pushes the current depth of the stack.</div> | `18` |
| **`69`** | `CHKDEPTH` | `0x69` | _`i -`_ | <div id='instr-chkdepth'>Pops integer `i` from the stack, then checks whether there are at least `i` elements, generating a stack underflow exception otherwise.</div> | `18/58` |
| **`6A`** | `ONLYTOPX` | `0x6A` |  | <div id='instr-onlytopx'>Pops integer `i` from the stack, then removes all but the top `i` elements.</div> | `18` |
| **`6B`** | `ONLYX` | `0x6B` |  | <div id='instr-onlyx'>Pops integer `i` from the stack, then leaves only the bottom `i` elements. Approximately equivalent to [`DEPTH`](#instr-depth) [`SWAP`](#instr-swap) [`SUB`](#instr-sub) [`DROPX`](#instr-dropx).</div> | `18` |
| **`6Cij`** | `[i] [j] BLKDROP2` | `[c1 = parse_const_u4_nonzero] [c2 = parse_const_u4] 0x6C, (c1 << 4) ｜ c2` |  | <div id='instr-blkdrop2'>Drops `i` stack elements under the top `j` elements.<br/>`1 <= i <= 15`, `0 <= j <= 15`<br/>Equivalent to [`[i+j] 0 REVERSE`](#instr-reverse) [`[i] BLKDROP`](#instr-blkdrop) [`[j] 0 REVERSE`](#instr-reverse).</div> | `26` |

## 3 Tuple, List, and Null primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`6D`** | `NULL`<br/>`PUSHNULL` | `0x6D` | _`- null`_ | <div id='instr-null'>Pushes the only value of type _Null_.</div> | `18` |
| **`6E`** | `ISNULL` | `0x6E` | _`x - ?`_ | <div id='instr-isnull'>Checks whether `x` is a _Null_, and returns `-1` or `0` accordingly.</div> | `18` |
| **`6F0n`** | `[n] TUPLE` | `[s = parse_const_u4] 0x6F, s` | _`x_1 ... x_n - t`_ | <div id='instr-tuple'>Creates a new _Tuple_ `t=(x_1, … ,x_n)` containing `n` values `x_1`,..., `x_n`.<br/>`0 <= n <= 15`</div> | `26+n` |
| **`6F00`** | `NIL` | `0x6F, 0x00` | _`- t`_ | <div id='instr-nil'>Pushes the only _Tuple_ `t=()` of length zero.</div> | `26` |
| **`6F01`** | `SINGLE` | `0x6F, 0x01` | _`x - t`_ | <div id='instr-single'>Creates a singleton `t:=(x)`, i.e., a _Tuple_ of length one.</div> | `27` |
| **`6F02`** | `PAIR`<br/>`CONS` | `0x6F, 0x02` | _`x y - t`_ | <div id='instr-pair'>Creates pair `t:=(x,y)`.</div> | `28` |
| **`6F03`** | `TRIPLE` | `0x6F, 0x03` | _`x y z - t`_ | <div id='instr-triple'>Creates triple `t:=(x,y,z)`.</div> | `29` |
| **`6F1k`** | `[k] INDEX` | `[c = parse_const_u4] 0x6F, 0x10 ｜ c` | _`t - x`_ | <div id='instr-index'>Returns the `k`-th element of a _Tuple_ `t`.<br/>`0 <= k <= 15`.</div> | `26` |
| **`6F10`** | `FIRST`<br/>`CAR` | `0x6F, 0x10` | _`t - x`_ | <div id='instr-first'>Returns the first element of a _Tuple_.</div> | `26` |
| **`6F11`** | `SECOND`<br/>`CDR` | `0x6F, 0x11` | _`t - y`_ | <div id='instr-second'>Returns the second element of a _Tuple_.</div> | `26` |
| **`6F12`** | `THIRD` | `0x6F, 0x12` | _`t - z`_ | <div id='instr-third'>Returns the third element of a _Tuple_.</div> | `26` |
| **`6F2n`** | `[n] UNTUPLE` | `[c = parse_const_u4] 0x6F, 0x20 ｜ c` | _`t - x_1 ... x_n`_ | <div id='instr-untuple'>Unpacks a _Tuple_ `t=(x_1,...,x_n)` of length equal to `0 <= n <= 15`.<br/>If `t` is not a _Tuple_, or if `\|t\| != n`, a type check exception is thrown.</div> | `26+n` |
| **`6F21`** | `UNSINGLE` | `0x6F, 0x21` | _`t - x`_ | <div id='instr-unsingle'>Unpacks a singleton `t=(x)`.</div> | `27` |
| **`6F22`** | `UNPAIR`<br/>`UNCONS` | `0x6F, 0x22` | _`t - x y`_ | <div id='instr-unpair'>Unpacks a pair `t=(x,y)`.</div> | `28` |
| **`6F23`** | `UNTRIPLE` | `0x6F, 0x23` | _`t - x y z`_ | <div id='instr-untriple'>Unpacks a triple `t=(x,y,z)`.</div> | `29` |
| **`6F3k`** | `[k] UNPACKFIRST` | `[c = parse_const_u4] 0x6F, 0x30 ｜ c` | _`t - x_1 ... x_k`_ | <div id='instr-unpackfirst'>Unpacks first `0 <= k <= 15` elements of a _Tuple_ `t`.<br/>If `\|t\|<k`, throws a type check exception.</div> | `26+k` |
| **`6F30`** | `CHKTUPLE` | `0x6F, 0x30` | _`t -`_ | <div id='instr-chktuple'>Checks whether `t` is a _Tuple_. If not, throws a type check exception.</div> | `26` |
| **`6F4n`** | `[n] EXPLODE` | `[c = parse_const_u4] 0x6F, 0x40 ｜ c` | _`t - x_1 ... x_m m`_ | <div id='instr-explode'>Unpacks a _Tuple_ `t=(x_1,...,x_m)` and returns its length `m`, but only if `m <= n <= 15`. Otherwise throws a type check exception.</div> | `26+m` |
| **`6F5k`** | `[k] SETINDEX` | `[c = parse_const_u4] 0x6F, 0x50 ｜ c` | _`t x - t'`_ | <div id='instr-setindex'>Computes _Tuple_ `t'` that differs from `t` only at position `t'_{k+1}`, which is set to `x`.<br/>`0 <= k <= 15`<br/>If `k >= \|t\|`, throws a range check exception.</div> | `26+\|t\|` |
| **`6F50`** | `SETFIRST` | `0x6F, 0x50` | _`t x - t'`_ | <div id='instr-setfirst'>Sets the first component of _Tuple_ `t` to `x` and returns the resulting _Tuple_ `t'`.</div> | `26+\|t\|` |
| **`6F51`** | `SETSECOND` | `0x6F, 0x51` | _`t x - t'`_ | <div id='instr-setsecond'>Sets the second component of _Tuple_ `t` to `x` and returns the resulting _Tuple_ `t'`.</div> | `26+\|t\|` |
| **`6F52`** | `SETTHIRD` | `0x6F, 0x52` | _`t x - t'`_ | <div id='instr-setthird'>Sets the third component of _Tuple_ `t` to `x` and returns the resulting _Tuple_ `t'`.</div> | `26+\|t\|` |
| **`6F6k`** | `[k] INDEXQ` | `[c = parse_const_u4] 0x6F, 0x60 ｜ c` | _`t - x`_ | <div id='instr-indexq'>Returns the `k`-th element of a _Tuple_ `t`, where `0 <= k <= 15`. In other words, returns `x_{k+1}` if `t=(x_1,...,x_n)`. If `k>=n`, or if `t` is _Null_, returns a _Null_ instead of `x`.</div> | `26` |
| **`6F60`** | `FIRSTQ`<br/>`CARQ` | `0x6F, 0x60` | _`t - x`_ | <div id='instr-firstq'>Returns the first element of a _Tuple_.</div> | `26` |
| **`6F61`** | `SECONDQ`<br/>`CDRQ` | `0x6F, 0x61` | _`t - y`_ | <div id='instr-secondq'>Returns the second element of a _Tuple_.</div> | `26` |
| **`6F62`** | `THIRDQ` | `0x6F, 0x62` | _`t - z`_ | <div id='instr-thirdq'>Returns the third element of a _Tuple_.</div> | `26` |
| **`6F7k`** | `[k] SETINDEXQ` | `[c = parse_const_u4] 0x6F, 0x70 ｜ c` | _`t x - t'`_ | <div id='instr-setindexq'>Sets the `k`-th component of _Tuple_ `t` to `x`, where `0 <= k < 16`, and returns the resulting _Tuple_ `t'`.<br/>If `\|t\| <= k`, first extends the original _Tuple_ to length `n’=k+1` by setting all new components to _Null_. If the original value of `t` is _Null_, treats it as an empty _Tuple_. If `t` is not _Null_ or _Tuple_, throws an exception. If `x` is _Null_ and either `\|t\| <= k` or `t` is _Null_, then always returns `t'=t` (and does not consume tuple creation gas).</div> | `26+\|t’\|` |
| **`6F70`** | `SETFIRSTQ` | `0x6F , 0x70` | _`t x - t'`_ | <div id='instr-setfirstq'>Sets the first component of _Tuple_ `t` to `x` and returns the resulting _Tuple_ `t'`.</div> | `26+\|t’\|` |
| **`6F71`** | `SETSECONDQ` | `0x6F , 0x71` | _`t x - t'`_ | <div id='instr-setsecondq'>Sets the second component of _Tuple_ `t` to `x` and returns the resulting _Tuple_ `t'`.</div> | `26+\|t’\|` |
| **`6F72`** | `SETTHIRDQ` | `0x6F , 0x72` | _`t x - t'`_ | <div id='instr-setthirdq'>Sets the third component of _Tuple_ `t` to `x` and returns the resulting _Tuple_ `t'`.</div> | `26+\|t’\|` |
| **`6F80`** | `TUPLEVAR` | `0x6F , 0x80` | _`x_1 ... x_n n - t`_ | <div id='instr-tuplevar'>Creates a new _Tuple_ `t` of length `n` similarly to [`TUPLE`](#instr-tuple), but with `0 <= n <= 255` taken from the stack.</div> | `26+n` |
| **`6F81`** | `INDEXVAR` | `0x6F , 0x81` | _`t k - x`_ | <div id='instr-indexvar'>Similar to [`k INDEX`](#instr-index), but with `0 <= k <= 254` taken from the stack.</div> | `26` |
| **`6F82`** | `UNTUPLEVAR` | `0x6F , 0x82` | _`t n - x_1 ... x_n`_ | <div id='instr-untuplevar'>Similar to [`n UNTUPLE`](#instr-untuple), but with `0 <= n <= 255` taken from the stack.</div> | `26+n` |
| **`6F83`** | `UNPACKFIRSTVAR` | `0x6F , 0x83` | _`t n - x_1 ... x_n`_ | <div id='instr-unpackfirstvar'>Similar to [`n UNPACKFIRST`](#instr-unpackfirst), but with `0 <= n <= 255` taken from the stack.</div> | `26+n` |
| **`6F84`** | `EXPLODEVAR` | `0x6F , 0x84` | _`t n - x_1 ... x_m m`_ | <div id='instr-explodevar'>Similar to [`n EXPLODE`](#instr-explode), but with `0 <= n <= 255` taken from the stack.</div> | `26+m` |
| **`6F85`** | `SETINDEXVAR` | `0x6F , 0x85` | _`t x k - t'`_ | <div id='instr-setindexvar'>Similar to [`k SETINDEX`](#instr-setindex), but with `0 <= k <= 254` taken from the stack.</div> | `26+\|t’\|` |
| **`6F86`** | `INDEXVARQ` | `0x6F , 0x86` | _`t k - x`_ | <div id='instr-indexvarq'>Similar to [`n INDEXQ`](#instr-indexq), but with `0 <= k <= 254` taken from the stack.</div> | `26` |
| **`6F87`** | `SETINDEXVARQ` | `0x6F , 0x87` | _`t x k - t'`_ | <div id='instr-setindexvarq'>Similar to [`k SETINDEXQ`](#instr-setindexq), but with `0 <= k <= 254` taken from the stack.</div> | `26+\|t’\|` |
| **`6F88`** | `TLEN` | `0x6F , 0x88` | _`t - n`_ | <div id='instr-tlen'>Returns the length of a _Tuple_.</div> | `26` |
| **`6F89`** | `QTLEN` | `0x6F , 0x89` | _`t - n or -1`_ | <div id='instr-qtlen'>Similar to [`TLEN`](#instr-tlen), but returns `-1` if `t` is not a _Tuple_.</div> | `26` |
| **`6F90`** | `ZEROSWAPIF` | `0x6F, 0x90` | _`x - x or 0 x`_ | <div id='instr-zeroswapif'>Pushes a Zero under the topmost Integer x, but only if x != 0.</div> | `26` |
| **`6F91`** | `ZEROSWAPIFNOT` | `0x6F, 0x91` | _`x – x or 0 x`_ | <div id='instr-zeroswapifnot'>Pushes a Zero under the topmost Integer x, but only if x = 0.</div> | `26` |
| **`6F92`** | `ZEROROTRIF` | `0x6F, 0x92` | _`x y – x y or 0 x`_ | <div id='instr-zerorotrif'>Pushes a Zero under the second stack entry from the top, but only if the topmost Integer y is non-zero.</div> | `26` |
| **`6F93`** | `ZEROROTRIFNOT` | `0x6F, 0x93` | _`x y – x y or 0 x y`_ | <div id='instr-zerorotrifnot'>Pushes a Zero under the second stack entry from the top, but only if the topmost Integer y is zero.</div> | `26` |
| **`6F94`** | `ZEROSWAPIF2` | `0x6F, 0x94` | _`x – x or 0 0 x`_ | <div id='instr-zeroswapif2'>Pushes two Zeros under the topmost Integer x, but only if x != 0. Equivalent to ZEROSWAPIF; ZEROSWAPIF.</div> | `26` |
| **`6F95`** | `ZEROSWAPIFNOT2` | `0x6F, 0x95` | _`x – x or 0 0 x`_ | <div id='instr-zeroswapifnot2'>Pushes two Zeros under the topmost Integer x, but only if x = 0. Equivalent to ZEROSWAPIFNOT; ZEROSWAPIFNOT.</div> | `26` |
| **`6F96`** | `ZEROROTRIF2` | `0x6F, 0x96` | _`x y – x y or 0 0 x y`_ | <div id='instr-zerorotrif2'>Pushes two Zeros under the second stack entry from the top, but only if the topmost Integer y is non-zero. Equivalent to ZEROROTRIF; ZEROROTRIF.</div> | `26` |
| **`6F97`** | `ZEROROTRIFNOT2` | `0x6F, 0x97` | _`x y – x y or 0 0 x y`_ | <div id='instr-zerorotrifnot2'>Pushes two Zeros under the second stack entry from the top, but only if the topmost Integer y is zero. Equivalent to ZEROROTRIFNOT; ZEROROTRIFNOT.</div> | `26` |
| **`6F8A`** | `ISTUPLE` | `0x6F , 0x8A` | _`t - ?`_ | <div id='instr-istuple'>Returns `-1` or `0` depending on whether `t` is a _Tuple_.</div> | `26` |
| **`6F8B`** | `LAST` | `0x6F , 0x8B` | _`t - x`_ | <div id='instr-last'>Returns the last element of a non-empty _Tuple_ `t`.</div> | `26` |
| **`6F8C`** | `TPUSH`<br/>`COMMA` | `0x6F , 0x8C` | _`t x - t'`_ | <div id='instr-tpush'>Appends a value `x` to a _Tuple_ `t=(x_1,...,x_n)`, but only if the resulting _Tuple_ `t'=(x_1,...,x_n,x)` is of length at most 255. Otherwise throws a type check exception.</div> | `26+\|t’\|` |
| **`6F8D`** | `TPOP` | `0x6F , 0x8D` | _`t - t' x`_ | <div id='instr-tpop'>Detaches the last element `x=x_n` from a non-empty _Tuple_ `t=(x_1,...,x_n)`, and returns both the resulting _Tuple_ `t'=(x_1,...,x_{n-1})` and the original last element `x`.</div> | `26+\|t’\|` |
| **`6FA0`** | `NULLSWAPIF` | `0x6F , 0xA0` | _`x - x or null x`_ | <div id='instr-nullswapif'>Pushes a _Null_ under the topmost _Integer_ `x`, but only if `x!=0`.</div> | `26` |
| **`6FA1`** | `NULLSWAPIFNOT` | `0x6F , 0xA1` | _`x - x or null x`_ | <div id='instr-nullswapifnot'>Pushes a _Null_ under the topmost _Integer_ `x`, but only if `x=0`. May be used for stack alignment after quiet primitives such as [`PLDUXQ`](#instr-plduxq).</div> | `26` |
| **`6FA2`** | `NULLROTRIF` | `0x6F , 0xA2` | _`x y - x y or null x y`_ | <div id='instr-nullrotrif'>Pushes a _Null_ under the second stack entry from the top, but only if the topmost _Integer_ `y` is non-zero.</div> | `26` |
| **`6FA3`** | `NULLROTRIFNOT` | `0x6F , 0xA3` | _`x y - x y or null x y`_ | <div id='instr-nullrotrifnot'>Pushes a _Null_ under the second stack entry from the top, but only if the topmost _Integer_ `y` is zero. May be used for stack alignment after quiet primitives such as [`LDUXQ`](#instr-lduxq).</div> | `26` |
| **`6FA4`** | `NULLSWAPIF2` | `0x6F , 0xA4` | _`x - x or null null x`_ | <div id='instr-nullswapif2'>Pushes two nulls under the topmost _Integer_ `x`, but only if `x!=0`.<br/>Equivalent to [`NULLSWAPIF`](#instr-nullswapif) [`NULLSWAPIF`](#instr-nullswapif).</div> | `26` |
| **`6FA5`** | `NULLSWAPIFNOT2` | `0x6F , 0xA5` | _`x - x or null null x`_ | <div id='instr-nullswapifnot2'>Pushes two nulls under the topmost _Integer_ `x`, but only if `x=0`.<br/>Equivalent to [`NULLSWAPIFNOT`](#instr-nullswapifnot) [`NULLSWAPIFNOT`](#instr-nullswapifnot).</div> | `26` |
| **`6FA6`** | `NULLROTRIF2` | `0x6F , 0xA6` | _`x y - x y or null null x y`_ | <div id='instr-nullrotrif2'>Pushes two nulls under the second stack entry from the top, but only if the topmost _Integer_ `y` is non-zero.<br/>Equivalent to [`NULLROTRIF`](#instr-nullrotrif) [`NULLROTRIF`](#instr-nullrotrif).</div> | `26` |
| **`6FA7`** | `NULLROTRIFNOT2` | `0x6F , 0xA7` | _`x y - x y or null null x y`_ | <div id='instr-nullrotrifnot2'>Pushes two nulls under the second stack entry from the top, but only if the topmost _Integer_ `y` is zero.<br/>Equivalent to [`NULLROTRIFNOT`](#instr-nullrotrifnot) [`NULLROTRIFNOT`](#instr-nullrotrifnot).</div> | `26` |
| **`6FBij`** | `[i] [j] INDEX2` | `[i = parse_const_u2] [j = parse_const_u2] 0x6F, 0xB0 ｜ (i << 2) ｜ j` | _`t - x`_ | <div id='instr-index2'>Recovers `x=(t_{i+1})_{j+1}` for `0 <= i,j <= 3`.<br/>Equivalent to [`[i] INDEX`](#instr-index) [`[j] INDEX`](#instr-index).</div> | `26` |
| **`6FB4`** | `CADR` | `0x6F, 0xB4` | _`t - x`_ | <div id='instr-cadr'>Recovers `x=(t_2)_1`.</div> | `26` |
| **`6FB5`** | `CDDR` | `0x6F, 0xB5` | _`t - x`_ | <div id='instr-cddr'>Recovers `x=(t_2)_2`.</div> | `26` |
| **`6FE_ijk`** | `[i] [j] [k] INDEX3` | `[i = parse_const_u2] [j = parse_const_u2] [k = parse_const_u2] 0x6F, 0xC0 ｜ (i << 4) ｜ (j << 2) ｜ k` | _`t - x`_ | <div id='instr-index3'>Recovers `x=t_{i+1}_{j+1}_{k+1}`.<br/>`0 <= i,j,k <= 3`<br/>Equivalent to [`[i] [j] INDEX2`](#instr-index2) [`[k] INDEX`](#instr-index).</div> | `26` |
| **`6FD4`** | `CADDR` | `0x6F, 0xD4` | _`t - x`_ | <div id='instr-caddr'>Recovers `x=t_2_2_1`.</div> | `26` |
| **`6FD5`** | `CDDDR` | `0x6F, 0xD5` | _`t - x`_ | <div id='instr-cdddr'>Recovers `x=t_2_2_2`.</div> | `26` |

## 4 Constant, or literal primitives
### 4.1 Integer and boolean constants
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`7i`** | `[x] PUSHINT`<br/>`[x] INT` |  | _`- x`_ | <div id='instr-pushint-4'>Pushes integer `x` into the stack. `-5 <= x <= 10`.<br/>Here `i` equals four lower-order bits of `x` (`i=x mod 16`).</div> | `18` |
| **`70`** | `ZERO`<br/>`FALSE` | `0x70` | _`- 0`_ | <div id='instr-zero'>Pushes a zero.</div> | `18` |
| **`71`** | `ONE` | `0x71` | _`- 1`_ | <div id='instr-one'></div> | `18` |
| **`72`** | `TWO` | `0x72` | _`- 2`_ | <div id='instr-two'></div> | `18` |
| **`7A`** | `TEN` | `0x7A` | _`- 10`_ | <div id='instr-ten'>Pushes a ten.</div> | `18` |
| **`7F`** | `TRUE` | `0x7F` | _`- -1`_ | <div id='instr-true'></div> | `18` |
| **`80xx`** | `[xx] PUSHINT`<br/>`[xx] INT` |  | _`- xx`_ | <div id='instr-pushint-8'>Pushes integer `xx`. `-128 <= xx <= 127`.</div> | `26` |
| **`81xxxx`** | `[xxxx] PUSHINT`<br/>`[xxxx] INT` |  | _`- xxxx`_ | <div id='instr-pushint-16'>Pushes integer `xxxx`. `-2^15 <= xx < 2^15`.</div> | `34` |
| **`81FC18`** | `[1000] PUSHINT` |  | _`- 1000`_ | <div id='instr-'></div> | `34` |
| **`82lxxx`** | `[xxx] PUSHINT`<br/>`[xxx] INT` |  | _`- xxx`_ | <div id='instr-pushint-long'>Pushes integer `xxx`.<br/>_Details:_ 5-bit `0 <= l <= 30` determines the length `n=8l+19` of signed big-endian integer `xxx`.<br/>The total length of this instruction is `l+4` bytes or `n+13=8l+32` bits.</div> | `23` |
| **`83xx`** | `[xx+1] PUSHPOW2` | `[s1 = parse_const_u8_plus_one] 0x83, s1` | _`- 2^(xx+1)`_ | <div id='instr-pushpow2'>(Quietly) pushes `2^(xx+1)` for `0 <= xx <= 255`.<br/>`2^256` is a `NaN`.</div> | `26` |
| **`83FF`** | `PUSHNAN` | `0x83, 0xFF` | _`- NaN`_ | <div id='instr-pushnan'>Pushes a `NaN`.</div> | `26` |
| **`84xx`** | `[xx+1] PUSHPOW2DEC` | `[s1 = parse_const_u8_plus_one] 0x84, s1` | _`- 2^(xx+1)-1`_ | <div id='instr-pushpow2dec'>Pushes `2^(xx+1)-1` for `0 <= xx <= 255`.</div> | `26` |
| **`85xx`** | `[xx+1] PUSHNEGPOW2` | `[s1 = parse_const_u8_plus_one] 0x85, s1` | _`- -2^(xx+1)`_ | <div id='instr-pushnegpow2'>Pushes `-2^(xx+1)` for `0 <= xx <= 255`.</div> | `26` |
### 4.2 Constant slices, continuations, cells, and references
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`88`** | `[ref] PUSHREF` |  | _`- c`_ | <div id='instr-pushref'>Pushes the reference `ref` into the stack.<br/>_Details:_ Pushes the first reference of `cc.code` into the stack as a _Cell_ (and removes this reference from the current continuation).</div> | `18` |
| **`89`** | `[ref] PUSHREFSLICE` |  | _`- s`_ | <div id='instr-pushrefslice'>Similar to [`PUSHREF`](#instr-pushref), but converts the cell into a _Slice_.</div> | `118/43` |
| **`8A`** | `[ref] PUSHREFCONT` |  | _`- cont`_ | <div id='instr-pushrefcont'>Similar to [`PUSHREFSLICE`](#instr-pushrefslice), but makes a simple ordinary _Continuation_ out of the cell.</div> | `118/43` |
| **`8Bxsss`** | `[slice] PUSHSLICE`<br/>`[slice] SLICE` |  | _`- s`_ | <div id='instr-pushslice'>Pushes the slice `slice` into the stack.<br/>_Details:_ Pushes the (prefix) subslice of `cc.code` consisting of its first `8x+4` bits and no references (i.e., essentially a bitstring), where `0 <= x <= 15`.<br/>A completion tag is assumed, meaning that all trailing zeroes and the last binary one (if present) are removed from this bitstring.<br/>If the original bitstring consists only of zeroes, an empty slice will be pushed.</div> | `22` |
| **`8B04`** | `[x8] PUSHSLICE` |  | _`- s`_ | <div id='instr-'>Pushes an empty slice (bitstring ``).</div> |  |
| **`8B08`** | `[x4] PUSHSLICE` |  | _`- s`_ | <div id='instr-'>Pushes bitstring `0`.</div> |  |
| **`8B0C`** | `[xC] PUSHSLICE` |  | _`- s`_ | <div id='instr-'>pushes bitstring `1`.</div> |  |
| **`8Crxxssss`** | `[slice] PUSHSLICE`<br/>`[slice] SLICE` |  | _`- s`_ | <div id='instr-pushslice-refs'>Pushes the slice `slice` into the stack.<br/>_Details:_ Pushes the (prefix) subslice of `cc.code` consisting of its first `1 <= r+1 <= 4` references and up to first `8xx+1` bits of data, with `0 <= xx <= 31`.<br/>A completion tag is also assumed.</div> | `25` |
| **`8C01`** | `[ref] PUSHREFSLICE` |  | _`- s`_ | <div id='instr-'>Is equivalent to [`PUSHREFSLICE`](#instr-pushrefslice).</div> | `118/43` |
| **`8Drxxsssss`** | `[slice] PUSHSLICE`<br/>`[slice] SLICE` |  | _`- s`_ | <div id='instr-pushslice-long'>Pushes the slice `slice` into the stack.<br/>_Details:_ Pushes the subslice of `cc.code` consisting of `0 <= r <= 4` references and up to `8xx+6` bits of data, with `0 <= xx <= 127`.<br/>A completion tag is assumed.</div> | `28` |
|  | `x{} PUSHSLICE`<br/>`x{ABCD1234} PUSHSLICE`<br/>`b{01101} PUSHSLICE` |  | _`- s`_ | <div id='instr-'>Examples of [`PUSHSLICE`](#instr-pushslice).<br/>`x{}` is an empty slice. `x{...}` is a hexadecimal literal. `b{...}` is a binary literal.<br/>More on slice literals [here](https://github.com/Piterden/TON-docs/blob/master/Fift.%20A%20Brief%20Introduction.md#user-content-51-slice-literals).<br/>Note that the assembler can replace [`PUSHSLICE`](#instr-pushslice) with [`PUSHREFSLICE`](#instr-pushrefslice) in certain situations (e.g. if there’s not enough space in the current continuation).</div> |  |
|  | `<b x{AB12} s, b> PUSHREF`<br/>`<b x{AB12} s, b> PUSHREFSLICE` |  | _`- c/s`_ | <div id='instr-'>Examples of [`PUSHREF`](#instr-pushref) and [`PUSHREFSLICE`](#instr-pushrefslice).<br/>More on building cells in fift [here](https://github.com/Piterden/TON-docs/blob/master/Fift.%20A%20Brief%20Introduction.md#user-content-52-builder-primitives).</div> |  |
| **`8F_rxxcccc`** | `[builder] PUSHCONT`<br/>`[builder] CONT` |  | _`- c`_ | <div id='instr-pushcont'>Pushes a continuation made from `builder`.<br/>_Details:_ Pushes the simple ordinary continuation `cccc` made from the first `0 <= r <= 3` references and the first `0 <= xx <= 127` bytes of `cc.code`.</div> | `26` |
| **`9xccc`** | `[builder] PUSHCONT`<br/>`[builder] CONT` |  | _`- c`_ | <div id='instr-pushcont-short'>Pushes a continuation made from `builder`.<br/>_Details:_ Pushes an `x`-byte continuation for `0 <= x <= 15`.</div> | `18` |
|  | `<{ code }> PUSHCONT`<br/>`<{ code }> CONT`<br/>`CONT:<{ code }>` |  | _`- c`_ | <div id='instr-'>Pushes a continuation with code `code`.<br/>Note that the assembler can replace [`PUSHCONT`](#instr-pushcont) with [`PUSHREFCONT`](#instr-pushrefcont) in certain situations (e.g. if there’s not enough space in the current continuation).</div> |  |

## 5 Arithmetic primitives
### 5.1 Addition, subtraction, multiplication
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`A0`** | `ADD` | `0xA0` | _`x y - x+y`_ | <div id='instr-add'>Adds together two integers</div> | `18` |
| **`A1`** | `SUB` | `0xA1` | _`x y - x-y`_ | <div id='instr-sub'></div> | `18` |
| **`A2`** | `SUBR` | `0xA2` | _`x y - y-x`_ | <div id='instr-subr'>Equivalent to [`SWAP`](#instr-swap) [`SUB`](#instr-sub).</div> | `18` |
| **`A3`** | `NEGATE` | `0xA3` | _`x - -x`_ | <div id='instr-negate'>Equivalent to [`-1 MULCONST`](#instr-mulconst) or to [`ZERO SUBR`](#instr-subr).<br/>Notice that it triggers an integer overflow exception if `x=-2^256`.</div> | `18` |
| **`A4`** | `INC` | `0xA4` | _`x - x+1`_ | <div id='instr-inc'>Equivalent to [`1 ADDCONST`](#instr-addconst).</div> | `18` |
| **`A5`** | `DEC` | `0xA5` | _`x - x-1`_ | <div id='instr-dec'>Equivalent to [`-1 ADDCONST`](#instr-addconst).</div> | `18` |
| **`A6cc`** | `[cc] ADDCONST`<br/>`[cc] ADDINT`<br/>`[-cc] SUBCONST`<br/>`[-cc] SUBINT` | `[z = parse_const_i8] 0xA6, z`<br/>`` | _`x - x+cc`_ | <div id='instr-addconst'>`-128 <= cc <= 127`.</div> | `26` |
| **`A7cc`** | `[cc] MULCONST`<br/>`[cc] MULINT` | `[z = parse_const_i8] 0xA7, z` | _`x - x*cc`_ | <div id='instr-mulconst'>`-128 <= cc <= 127`.</div> | `26` |
| **`A8`** | `MUL` | `0xA8` | _`x y - x*y`_ | <div id='instr-mul'></div> | `18` |
### 5.2 Division
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`A9mscdf`** |  |  |  | <div id='instr-div-base'>This is the general encoding of division, with an optional pre-multiplication and an optional replacement of the division or multiplication by a shift. Variable fields are as follows:<br/>`0 <= m <= 1`  -  Indicates whether there is pre-multiplication ([`MULDIV`](#instr-muldiv) and its variants), possibly replaced by a left shift.<br/>`0 <= s <= 2`  -  Indicates whether either the multiplication or the division have been replaced by shifts: `s=0` - no replacement, `s=1` - division replaced by a right shift, `s=2` - multiplication replaced by a left shift (possible only for `m=1`).<br/>`0 <= c <= 1`  -  Indicates whether there is a constant one-byte argument `tt` for the shift operator (if `s!=0`). For `s=0`, `c=0`. If `c=1`, then `0 <= tt <= 255`, and the shift is performed by `tt+1` bits. If `s!=0` and `c=0`, then the shift amount is provided to the instruction as a top-of-stack _Integer_ in range `0...256`.<br/>`1 <= d <= 3`  -  Indicates which results of division are required: `1` - only the quotient, `2` - only the remainder, `3` - both.<br/>`0 <= f <= 2`  -  Rounding mode: `0` - floor, `1` - nearest integer, `2` - ceiling.<br/>All instructions below are variants of this.</div> | `26` |
| **`A904`** | `DIV` | `0xA9, 0x04` | _`x y - q`_ | <div id='instr-div'>`q=floor(x/y)`, `r=x-y*q`</div> | `26` |
| **`A905`** | `DIVR` | `0xA9, 0x05` | _`x y - q’`_ | <div id='instr-divr'>`q’=round(x/y)`, `r’=x-y*q’`</div> | `26` |
| **`A906`** | `DIVC` | `0xA9, 0x06` | _`x y - q''`_ | <div id='instr-divc'>`q’’=ceil(x/y)`, `r’’=x-y*q’’`</div> | `26` |
| **`A908`** | `MOD` | `0xA9, 0x08` | _`x y - r`_ | <div id='instr-mod'>where q=floor(x/y), r=x mod y=x-yq.</div> | `26` |
| **`A90C`** | `DIVMOD` | `0xA9, 0x0C` | _`x y - q r`_ | <div id='instr-divmod'>where q=floor(x/y), r=x-yq.</div> | `26` |
| **`A90D`** | `DIVMODR` | `0xA9, 0x0D` | _`x y - q' r'`_ | <div id='instr-divmodr'>where q' = floor(x/y + 1/2), r' = x - yq'.</div> | `26` |
| **`A90E`** | `DIVMODC` | `0xA9, 0x0E` | _`x y - q'' r''`_ | <div id='instr-divmodc'>where q'' = ceil(x/y), r'' = x - yq''.</div> | `26` |
| **`A924`** | `RSHIFT` |  | _`x y - floor(x*c/2^y)`_ | <div id='instr-'></div> |  |
| **`A925`** | `RSHIFTR` | `0xA9, 0x25` | _`x y - round(x/2^y)`_ | <div id='instr-rshiftr-var'></div> | `26` |
| **`A926`** | `RSHIFTC` | `0xA9, 0x26` | _`x y - ceil(x/2^y)`_ | <div id='instr-rshiftc-var'></div> | `34` |
| **`A934tt`** | `[tt+1] RSHIFT` |  | _`x - x mod 2^(tt+1)`_ | <div id='instr-'></div> | `34` |
| **`A935tt`** | `[tt+1] RSHIFTR#` |  | _`x y - round(x/2^(tt+1))`_ | <div id='instr-rshiftr'></div> | `34` |
| **`A936tt`** | `[tt+1] RSHIFTC#` |  | _`x y - ceil(x/2^(tt+1))`_ | <div id='instr-rshiftc'></div> | `34` |
| **`A938tt`** | `[tt+1] MODPOW2#` |  | _`x - x mod 2^(tt+1)`_ | <div id='instr-modpow2'></div> | `26` |
| **`A98`** | `MULDIV` | `0xA9, 0x84` | _`x y z - q`_ | <div id='instr-muldiv'>`q=floor(x*y/z)`</div> | `26` |
| **`A985`** | `MULDIVR` | `0xA9, 0x85` | _`x y z - q'`_ | <div id='instr-muldivr'>`q'=round(x*y/z)`</div> | `26` |
| **`A98C`** | `MULDIVMOD` | `0xA9, 0x8C` | _`x y z - q r`_ | <div id='instr-muldivmod'>`q=floor(x*y/z)`, `r=x*y-z*q`</div> | `26` |
| **`A9A4`** | `MULRSHIFT` | `0xA9, 0xA4` | _`x y z - floor(x*y/2^z)`_ | <div id='instr-mulrshift-var'>`0 <= z <= 256`</div> | `26` |
| **`A9A5`** | `MULRSHIFTR` | `0xA9, 0xA5` | _`x y z - round(x*y/2^z)`_ | <div id='instr-mulrshiftr-var'>`0 <= z <= 256`</div> | `26` |
| **`A9A6`** | `MULRSHIFTC` | `0xA9, 0xA6` | _`x y z - ceil(x*y/2^z)`_ | <div id='instr-mulrshiftc-var'>`0 <= z <= 256`</div> | `34` |
| **`A9B4tt`** | `[tt+1] MULRSHIFT#` |  | _`x y - floor(x*y/2^(tt+1))`_ | <div id='instr-mulrshift'></div> | `34` |
| **`A9B5tt`** | `[tt+1] MULRSHIFTR#` |  | _`x y - round(x*y/2^(tt+1))`_ | <div id='instr-mulrshiftr'></div> | `34` |
| **`A9B6tt`** | `[tt+1] MULRSHIFTC#` |  | _`x y - ceil(x*y/2^(tt+1))`_ | <div id='instr-mulrshiftc'></div> | `26` |
| **`A9C4`** | `LSHIFTDIV` | `0xA9, 0xC4` | _`x y z - floor(2^z*x/y)`_ | <div id='instr-lshiftdiv-var'>`0 <= z <= 256`</div> | `26` |
| **`A9C5`** | `LSHIFTDIVR` | `0xA9, 0xC5` | _`x y z - round(2^z*x/y)`_ | <div id='instr-lshiftdivr-var'>`0 <= z <= 256`</div> | `26` |
| **`A9C6`** | `LSHIFTDIVC` | `0xA9, 0xC6` | _`x y z - ceil(2^z*x/y)`_ | <div id='instr-lshiftdivc-var'>`0 <= z <= 256`</div> | `34` |
| **`A9D4tt`** | `[tt+1] LSHIFT#DIV` |  | _`x y - floor(2^(tt+1)*x/y)`_ | <div id='instr-lshiftdiv'></div> | `34` |
| **`A9D5tt`** | `[tt+1] LSHIFT#DIVR` |  | _`x y - round(2^(tt+1)*x/y)`_ | <div id='instr-lshiftdivr'></div> | `34` |
| **`A9D6tt`** | `[tt+1] LSHIFT#DIVC` |  | _`x y - ceil(2^(tt+1)*x/y)`_ | <div id='instr-lshiftdivc'></div> | `26` |
### 5.3 Shifts, logical operations
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`AAcc`** | `[cc+1] LSHIFT#` |  | _`x - x*2^(cc+1)`_ | <div id='instr-lshift'>`0 <= cc <= 255`</div> | `26` |
| **`AA00`** | `[1] LSHIFT#` |  |  | <div id='instr-'>Equivalent to `MULCONST 2` or to Forth's 2*.</div> |  |
| **`ABcc`** | `[cc+1] RSHIFT#` |  | _`x - floor(x/2^(cc+1))`_ | <div id='instr-rshift'>`0 <= cc <= 255`</div> | `18` |
| **`AC`** | `LSHIFT` | `0xAC` | _`x y - x*2^y`_ | <div id='instr-lshift-var'>`0 <= y <= 1023`</div> | `18` |
| **`AD`** | `RSHIFT` | `0xAD` | _`x y - floor(x/2^y)`_ | <div id='instr-rshift-var'>`0 <= y <= 1023`</div> | `18` |
| **`AE`** | `POW2` | `0xAE` | _`y - 2^y`_ | <div id='instr-pow2'>`0 <= y <= 1023`<br/>Equivalent to [`ONE`](#instr-one) [`SWAP`](#instr-swap) [`LSHIFT`](#instr-lshift-var).</div> | `18` |
| **`B0`** | `AND` | `0xB0` | _`x y - x&y`_ | <div id='instr-and'>Bitwise and of two signed integers `x` and `y`, sign-extended to infinity.</div> | `18` |
| **`B1`** | `OR` | `0xB1` | _`x y - x\|y`_ | <div id='instr-or'>Bitwise or of two integers.</div> | `18` |
| **`B2`** | `XOR` | `0xB2` | _`x y - x xor y`_ | <div id='instr-xor'>Bitwise xor of two integers.</div> | `18` |
| **`B3`** | `NOT` | `0xB3` | _`x - ~x`_ | <div id='instr-not'>Bitwise not of an integer.</div> | `26` |
| **`B4cc`** | `[cc+1] FITS` | `[z = parse_const_u8_plus_one] 0xB4, z` | _`x - x`_ | <div id='instr-fits'>Checks whether `x` is a `cc+1`-bit signed integer for `0 <= cc <= 255` (i.e., whether `-2^cc <= x < 2^cc`).<br/>If not, either triggers an integer overflow exception, or replaces `x` with a `NaN` (quiet version).</div> | `26/76` |
| **`B400`** | `CHKBOOL` | `0xB4, 0x00` | _`x - x`_ | <div id='instr-chkbool'>Checks whether `x` is a “boolean value'' (i.e., either 0 or -1).</div> | `26/76` |
| **`B5cc`** | `[cc+1] UFITS` | `[z = parse_const_u8_plus_one] 0xB5, z`<br/>`` | _`x - x`_ | <div id='instr-ufits'>Checks whether `x` is a `cc+1`-bit unsigned integer for `0 <= cc <= 255` (i.e., whether `0 <= x < 2^(cc+1)`).</div> | `26/76` |
| **`B500`** | `CHKBIT` | `0xB5, 0x00` | _`x - x`_ | <div id='instr-chkbit'>Checks whether `x` is a binary digit (i.e., zero or one).</div> | `26/76` |
| **`B600`** | `FITSX` | `0xB6, 0x00` | _`x c - x`_ | <div id='instr-fitsx'>Checks whether `x` is a `c`-bit signed integer for `0 <= c <= 1023`.</div> | `26/76` |
| **`B601`** | `UFITSX` | `0xB6, 0x01` | _`x c - x`_ | <div id='instr-ufitsx'>Checks whether `x` is a `c`-bit unsigned integer for `0 <= c <= 1023`.</div> | `26/76` |
| **`B602`** | `BITSIZE` | `0xB6, 0x02` | _`x - c`_ | <div id='instr-bitsize'>Computes smallest `c >= 0` such that `x` fits into a `c`-bit signed integer (`-2^(c-1) <= c < 2^(c-1)`).</div> | `26` |
| **`B603`** | `UBITSIZE` | `0xB6, 0x03` | _`x - c`_ | <div id='instr-ubitsize'>Computes smallest `c >= 0` such that `x` fits into a `c`-bit unsigned integer (`0 <= x < 2^c`), or throws a range check exception.</div> | `26` |
| **`B608`** | `MIN` | `0xB6, 0x08` | _`x y - x or y`_ | <div id='instr-min'>Computes the minimum of two integers `x` and `y`.</div> | `26` |
| **`B609`** | `MAX` | `0xB6, 0x09` | _`x y - x or y`_ | <div id='instr-max'>Computes the maximum of two integers `x` and `y`.</div> | `26` |
| **`B60A`** | `MINMAX`<br/>`INTSORT2` | `0xB6, 0x0A` | _`x y - x y or y x`_ | <div id='instr-minmax'>Sorts two integers. Quiet version of this operation returns two `NaN`s if any of the arguments are `NaN`s.</div> | `26` |
| **`B60B`** | `ABS` | `0xB6, 0x0B` | _`x - \|x\|`_ | <div id='instr-abs'>Computes the absolute value of an integer `x`.</div> | `26` |
### 5.4 Quiet arithmetic primitives
Quiet operations return `NaN` instead of throwing exceptions if one of their arguments is a `NaN`, or in case of integer overflow.
Quiet operations has a prefix `Q` as shown below. Another way to make an operation quiet is to add `QUIET` before it (i.e. one can write `QUIET ADD` instead of `QADD`).
Quiet versions of integer comparison primitives are also available (`QUIET SGN`, `QUIET LESS` etc).

| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`B7A0`** | `QADD` | `0xB7, 0xA0` | _`x y - x+y`_ | <div id='instr-qadd'>Always works if x and y are Integers, but returns a NaN if the addition cannot be performed.</div> | `26` |
| **`B7A1`** | `QSUB` | `0xB7, 0xA1` | _`x y - x-y`_ | <div id='instr-qsub'></div> | `26` |
| **`B7A2`** | `QSUBR` | `0xB7, 0xA2` | _`x y - y-x`_ | <div id='instr-qsubr'></div> | `26` |
| **`B7A3`** | `QNEGATE` | `0xB7, 0xA3` | _`x - -x`_ | <div id='instr-qnegate'></div> | `26` |
| **`B7A4`** | `QINC` | `0xB7, 0xA4` | _`x - x+1`_ | <div id='instr-qinc'></div> | `26` |
| **`B7A5`** | `QDEC` | `0xB7, 0xA5` | _`x - x-1`_ | <div id='instr-qdec'></div> | `26` |
| **`B7A8`** | `QMUL` | `0xB7, 0xA8` | _`x y - x*y`_ | <div id='instr-qmul'></div> | `26` |
| **`B7A904`** | `QDIV` | `0xB7, 0xA9, 0x04` | _`x y - q`_ | <div id='instr-qdiv'>Division returns `NaN` if `y=0`.</div> | `34` |
| **`B7A905`** | `QDIVR` | `0xB7, 0xA9, 0x05` | _`x y - q’`_ | <div id='instr-qdivr'></div> | `34` |
| **`B7A906`** | `QDIVC` | `0xB7, 0xA9, 0x06` | _`x y - q''`_ | <div id='instr-qdivc'></div> | `34` |
| **`B7A908`** | `QMOD` | `0xB7, 0xA9, 0x08` | _`x y - r`_ | <div id='instr-qmod'></div> | `34` |
| **`B7A90C`** | `QDIVMOD` | `0xB7, 0xA9, 0x0C` | _`x y - q r`_ | <div id='instr-qdivmod'></div> | `34` |
| **`B7A90D`** | `QDIVMODR` | `0xB7, 0xA9, 0x0D` | _`x y - q' r'`_ | <div id='instr-qdivmodr'></div> | `34` |
| **`B7A90E`** | `QDIVMODC` | `0xB7, 0xA9, 0x0E` | _`x y - q'' r''`_ | <div id='instr-qdivmodc'></div> | `34` |
| **`B7A985`** | `QMULDIVR` | `0xB7, 0xA9, 0x85` | _`x y z - q'`_ | <div id='instr-qmuldivr'></div> | `34` |
| **`B7A98C`** | `QMULDIVMOD` | `0xB7, 0xA9, 0x8C` | _`x y z - q r`_ | <div id='instr-qmuldivmod'></div> | `34` |
| **`B7AC`** | `QLSHIFT` | `0xB7, 0xAC` | _`x y - x*2^y`_ | <div id='instr-qlshift'></div> | `26` |
| **`B7AD`** | `QRSHIFT` | `0xB7, 0xAD` | _`x y - floor(x/2^y)`_ | <div id='instr-qrshift'></div> | `26` |
| **`B7AE`** | `QPOW2` | `0xB7, 0xAE` | _`y - 2^y`_ | <div id='instr-qpow2'></div> | `26` |
| **`B7B0`** | `QAND` | `0xB7, 0xB0` | _`x y - x&y`_ | <div id='instr-qand'>Bitwise and (similar to AND), but returns a NaN if either x or y is a NaN instead of throwing an integer overflow exception. However, if one of the arguments is zero, and the other is a NaN, the result is zero.</div> | `26` |
| **`B7B1`** | `QOR` | `0xB7, 0xB1` | _`x y - x\|y`_ | <div id='instr-qor'>Bitwise or. If x = -1 or y = -1, the result is always -1, even if the other argument is a NaN.</div> | `26` |
| **`B7B2`** | `QXOR` | `0xB7, 0xB2` | _`x y - x xor y`_ | <div id='instr-qxor'></div> | `26` |
| **`B7B3`** | `QNOT` | `0xB7, 0xB3` | _`x - ~x`_ | <div id='instr-qnot'></div> | `26` |
| **`B7B4cc`** | `[cc+1] QFITS` | `[z = parse_const_u8_plus_one] 0xB7, 0xB4, z` | _`x - x`_ | <div id='instr-qfits'>Replaces `x` with a `NaN` if x is not a `cc+1`-bit signed integer, leaves it intact otherwise.</div> | `34` |
| **`B7B5cc`** | `[cc+1] QUFITS` | `[z = parse_const_u8_plus_one] 0xB7, 0xB5, z`<br/>`` | _`x - x`_ | <div id='instr-qufits'>Replaces `x` with a `NaN` if x is not a `cc+1`-bit unsigned integer, leaves it intact otherwise.</div> | `34` |
| **`B7B507`** | `[8] QUFITS` |  | _`x - x'`_ | <div id='instr-qufits-8'>Checks whether x is an unsigned byte (i.e., whether 0 <= x < 2^8), and replaces x with a NaN if this is not the case; leaves x intact otherwise (i.e., if x is an unsigned byte).</div> | `34` |
| **`B7B600`** | `QFITSX` | `0xB7, 0xB6, 0x00` | _`x c - x`_ | <div id='instr-qfitsx'>Replaces `x` with a `NaN` if x is not a c-bit signed integer, leaves it intact otherwise.</div> | `34` |
| **`B7B601`** | `QUFITSX` | `0xB7, 0xB6, 0x01` | _`x c - x`_ | <div id='instr-qufitsx'>Replaces `x` with a `NaN` if x is not a c-bit unsigned integer, leaves it intact otherwise.</div> | `34` |

## 6 Comparison primitives
### 6.1 Integer comparison
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`B8`** | `SGN` | `0xB8` | _`x - sgn(x)`_ | <div id='instr-sgn'>Computes the sign of an integer `x`:<br/>`-1` if `x<0`, `0` if `x=0`, `1` if `x>0`.</div> | `18` |
| **`B9`** | `LESS` | `0xB9` | _`x y - x<y`_ | <div id='instr-less'>Returns `-1` if `x<y`, `0` otherwise.</div> | `18` |
| **`BA`** | `EQUAL` | `0xBA` | _`x y - x=y`_ | <div id='instr-equal'>Returns `-1` if `x=y`, `0` otherwise.</div> | `18` |
| **`BB`** | `LEQ` | `0xBB` | _`x y - x<=y`_ | <div id='instr-leq'></div> | `18` |
| **`BC`** | `GREATER` | `0xBC` | _`x y - x>y`_ | <div id='instr-greater'></div> | `18` |
| **`BD`** | `NEQ` | `0xBD` | _`x y - x!=y`_ | <div id='instr-neq'>Equivalent to [`EQUAL`](#instr-equal) [`NOT`](#instr-not).</div> | `18` |
| **`BE`** | `GEQ` | `0xBE` | _`x y - x>=y`_ | <div id='instr-geq'>Equivalent to [`LESS`](#instr-less) [`NOT`](#instr-not).</div> | `18` |
| **`BF`** | `CMP` | `0xBF` | _`x y - sgn(x-y)`_ | <div id='instr-cmp'>Computes the sign of `x-y`:<br/>`-1` if `x<y`, `0` if `x=y`, `1` if `x>y`.<br/>No integer overflow can occur here unless `x` or `y` is a `NaN`.</div> | `18` |
| **`C0yy`** | `[yy] EQINT` | `[z = parse_const_i8] 0xC0, z`<br/>`` | _`x - x=yy`_ | <div id='instr-eqint'>Returns `-1` if `x=yy`, `0` otherwise.<br/>`-2^7 <= yy < 2^7`.</div> | `26` |
| **`C000`** | `ISZERO` | `0xC0, 0x00` | _`x - x=0`_ | <div id='instr-iszero'>Checks whether an integer is zero. Corresponds to Forth's `0=`.</div> | `26` |
| **`C1yy`** | `[yy] LESSINT`<br/>`[yy-1] LEQINT` | `[z = parse_const_i8] 0xC1, z`<br/>`` | _`x - x<yy`_ | <div id='instr-lessint'>Returns `-1` if `x<yy`, `0` otherwise.<br/>`-2^7 <= yy < 2^7`.</div> | `26` |
| **`C100`** | `ISNEG` | `0xC1, 0x00` | _`x - x<0`_ | <div id='instr-isneg'>Checks whether an integer is negative. Corresponds to Forth's `0<`.</div> | `26` |
| **`C101`** | `ISNPOS` | `0xC1, 0x01` | _`x - x<=0`_ | <div id='instr-isnpos'>Checks whether an integer is non-positive.</div> | `26` |
| **`C2yy`** | `[yy] GTINT`<br/>`[yy+1] GEQINT` | `[z = parse_const_i8] 0xC2, z`<br/>`` | _`x - x>yy`_ | <div id='instr-gtint'>Returns `-1` if `x>yy`, `0` otherwise.<br/>`-2^7 <= yy < 2^7`.</div> | `26` |
| **`C200`** | `ISPOS` | `0xC2, 0x00` | _`x - x>0`_ | <div id='instr-ispos'>Checks whether an integer is positive. Corresponds to Forth's `0>`.</div> | `26` |
| **`C2FF`** | `ISNNEG` | `0xC2, 0xFF` | _`x - x >=0`_ | <div id='instr-isnneg'>Checks whether an integer is non-negative.</div> | `26` |
| **`C3yy`** | `[yy] NEQINT` | `[z = parse_const_i8] 0xC3, z`<br/>`` | _`x - x!=yy`_ | <div id='instr-neqint'>Returns `-1` if `x!=yy`, `0` otherwise.<br/>`-2^7 <= yy < 2^7`.</div> | `26` |
| **`C4`** | `ISNAN` | `0xC4` | _`x - x=NaN`_ | <div id='instr-isnan'>Checks whether `x` is a `NaN`.</div> | `18` |
| **`C5`** | `CHKNAN` | `0xC5` | _`x - x`_ | <div id='instr-chknan'>Throws an arithmetic overflow exception if `x` is a `NaN`.</div> | `18/68` |
### 6.2 Other comparison
Most of these "other comparison" primitives actually compare the data portions of _Slices_ as bitstrings (ignoring references if not stated otherwise).

| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`C700`** | `SEMPTY` | `0xC7, 0x00` | _`s - ?`_ | <div id='instr-sempty'>Checks whether a _Slice_ `s` is empty (i.e., contains no bits of data and no cell references).</div> | `26` |
| **`C701`** | `SDEMPTY` | `0xC7, 0x01` | _`s - ?`_ | <div id='instr-sdempty'>Checks whether _Slice_ `s` has no bits of data.</div> | `26` |
| **`C702`** | `SREMPTY` | `0xC7, 0x02` | _`s - ?`_ | <div id='instr-srempty'>Checks whether _Slice_ `s` has no references.</div> | `26` |
| **`C703`** | `SDFIRST` | `0xC7, 0x03` | _`s - ?`_ | <div id='instr-sdfirst'>Checks whether the first bit of _Slice_ `s` is a one.</div> | `26` |
| **`C704`** | `SDLEXCMP` | `0xC7, 0x04` | _`s s' - x`_ | <div id='instr-sdlexcmp'>Compares the data of `s` lexicographically with the data of `s'`, returning `-1`, 0, or 1 depending on the result.</div> | `26` |
| **`C705`** | `SDEQ` | `0xC7, 0x05` | _`s s' - ?`_ | <div id='instr-sdeq'>Checks whether the data parts of `s` and `s'` coincide, equivalent to [`SDLEXCMP`](#instr-sdlexcmp) [`ISZERO`](#instr-iszero).</div> | `26` |
| **`C708`** | `SDPFX` | `0xC7, 0x08` | _`s s' - ?`_ | <div id='instr-sdpfx'>Checks whether `s` is a prefix of `s'`.</div> | `26` |
| **`C709`** | `SDPFXREV` | `0xC7, 0x09` | _`s s' - ?`_ | <div id='instr-sdpfxrev'>Checks whether `s'` is a prefix of `s`, equivalent to [`SWAP`](#instr-swap) [`SDPFX`](#instr-sdpfx).</div> | `26` |
| **`C70A`** | `SDPPFX` | `0xC7, 0x0A` | _`s s' - ?`_ | <div id='instr-sdppfx'>Checks whether `s` is a proper prefix of `s'` (i.e., a prefix distinct from `s'`).</div> | `26` |
| **`C70B`** | `SDPPFXREV` | `0xC7, 0x0B` | _`s s' - ?`_ | <div id='instr-sdppfxrev'>Checks whether `s'` is a proper prefix of `s`.</div> | `26` |
| **`C70C`** | `SDSFX` | `0xC7, 0x0C` | _`s s' - ?`_ | <div id='instr-sdsfx'>Checks whether `s` is a suffix of `s'`.</div> | `26` |
| **`C70D`** | `SDSFXREV` | `0xC7, 0x0D` | _`s s' - ?`_ | <div id='instr-sdsfxrev'>Checks whether `s'` is a suffix of `s`.</div> | `26` |
| **`C70E`** | `SDPSFX` | `0xC7, 0x0E` | _`s s' - ?`_ | <div id='instr-sdpsfx'>Checks whether `s` is a proper suffix of `s'`.</div> | `26` |
| **`C70F`** | `SDPSFXREV` | `0xC7, 0x0F` | _`s s' - ?`_ | <div id='instr-sdpsfxrev'>Checks whether `s'` is a proper suffix of `s`.</div> | `26` |
| **`C710`** | `SDCNTLEAD0` | `0xC7, 0x10` | _`s - n`_ | <div id='instr-sdcntlead0'>Returns the number of leading zeroes in `s`.</div> | `26` |
| **`C711`** | `SDCNTLEAD1` | `0xC7, 0x11` | _`s - n`_ | <div id='instr-sdcntlead1'>Returns the number of leading ones in `s`.</div> | `26` |
| **`C712`** | `SDCNTTRAIL0` | `0xC7, 0x12` | _`s - n`_ | <div id='instr-sdcnttrail0'>Returns the number of trailing zeroes in `s`.</div> | `26` |
| **`C713`** | `SDCNTTRAIL1` | `0xC7, 0x13` | _`s - n`_ | <div id='instr-sdcnttrail1'>Returns the number of trailing ones in `s`.</div> | `26` |

## 7 Cell primitives
### 7.1 Cell serialization primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`C8`** | `NEWC` | `0xC8` | _`- b`_ | <div id='instr-newc'>Creates a new empty _Builder_.</div> | `18` |
| **`C9`** | `ENDC` | `0xC9` | _`b - c`_ | <div id='instr-endc'>Converts a _Builder_ into an ordinary _Cell_.</div> | `518` |
| **`CAcc`** | `[cc+1] STI` | `[z = parse_const_u8_plus_one] 0xCA, z`<br/>`` | _`x b - b'`_ | <div id='instr-sti'>Stores a signed `cc+1`-bit integer `x` into _Builder_ `b` for `0 <= cc <= 255`, throws a range check exception if `x` does not fit into `cc+1` bits.</div> | `26` |
| **`CBcc`** | `[cc+1] STU` | `[z = parse_const_u8_plus_one] 0xCB, z`<br/>`` | _`x b - b'`_ | <div id='instr-stu'>Stores an unsigned `cc+1`-bit integer `x` into _Builder_ `b`. In all other respects it is similar to [`STI`](#instr-sti).</div> | `26` |
| **`CC`** | `STREF` | `0xCC` | _`c b - b'`_ | <div id='instr-stref'>Stores a reference to _Cell_ `c` into _Builder_ `b`.</div> | `18` |
| **`CD`** | `STBREFR`<br/>`ENDCST` | `0xCD` | _`b b'' - b`_ | <div id='instr-stbrefr'>Equivalent to [`ENDC`](#instr-endc) [`SWAP`](#instr-swap) [`STREF`](#instr-stref).</div> | `518` |
| **`CE`** | `STSLICE` | `0xCE` | _`s b - b'`_ | <div id='instr-stslice'>Stores _Slice_ `s` into _Builder_ `b`.</div> | `18` |
| **`CF00`** | `STIX` | `0xCF, 0x00` | _`x b l - b'`_ | <div id='instr-stix'>Stores a signed `l`-bit integer `x` into `b` for `0 <= l <= 257`.</div> | `26` |
| **`CF01`** | `STUX` | `0xCF, 0x01` | _`x b l - b'`_ | <div id='instr-stux'>Stores an unsigned `l`-bit integer `x` into `b` for `0 <= l <= 256`.</div> | `26` |
| **`CF02`** | `STIXR` | `0xCF, 0x02` | _`b x l - b'`_ | <div id='instr-stixr'>Similar to [`STIX`](#instr-stix), but with arguments in a different order.</div> | `26` |
| **`CF03`** | `STUXR` | `0xCF, 0x03` | _`b x l - b'`_ | <div id='instr-stuxr'>Similar to [`STUX`](#instr-stux), but with arguments in a different order.</div> | `26` |
| **`CF04`** | `STIXQ` | `0xCF, 0x04` | _`x b l - x b f or b' 0`_ | <div id='instr-stixq'>A quiet version of [`STIX`](#instr-stix). If there is no space in `b`, sets `b'=b` and `f=-1`.<br/>If `x` does not fit into `l` bits, sets `b'=b` and `f=1`.<br/>If the operation succeeds, `b'` is the new _Builder_ and `f=0`.<br/>However, `0 <= l <= 257`, with a range check exception if this is not so.</div> | `26` |
| **`CF05`** | `STUXQ` | `0xCF, 0x05` | _`x b l - x b f or b' 0`_ | <div id='instr-stuxq'>A quiet version of [`STUX`](#instr-stux).</div> | `26` |
| **`CF06`** | `STIXRQ` | `0xCF, 0x06` | _`b x l - b x f or b' 0`_ | <div id='instr-stixrq'>A quiet version of [`STIXR`](#instr-stixr).</div> | `26` |
| **`CF07`** | `STUXRQ` | `0xCF, 0x07` | _`b x l - b x f or b' 0`_ | <div id='instr-stuxrq'>A quiet version of [`STUXR`](#instr-stuxr).</div> | `26` |
| **`CF08cc`** | `[cc+1] STI_l` |  | _`x b - b'`_ | <div id='instr-sti-alt'>A longer version of [`[cc+1] STI`](#instr-sti).</div> | `34` |
| **`CF09cc`** | `[cc+1] STU_l` |  | _`x b - b'`_ | <div id='instr-stu-alt'>A longer version of [`[cc+1] STU`](#instr-stu).</div> | `34` |
| **`CF0Acc`** | `[cc+1] STIR` | `[z = parse_const_u8_plus_one] 0xCF, 0x0A, z`<br/>`` | _`b x - b'`_ | <div id='instr-stir'>Equivalent to [`SWAP`](#instr-swap) [`[cc+1] STI`](#instr-sti).</div> | `34` |
| **`CF0Bcc`** | `[cc+1] STUR` | `[z = parse_const_u8_plus_one] 0xCF, 0x0B, z`<br/>`` | _`b x - b'`_ | <div id='instr-stur'>Equivalent to [`SWAP`](#instr-swap) [`[cc+1] STU`](#instr-stu).</div> | `34` |
| **`CF0Ccc`** | `[cc+1] STIQ` | `[z = parse_const_u8_plus_one] 0xCF, 0x0C, z`<br/>`` | _`x b - x b f or b' 0`_ | <div id='instr-stiq'>A quiet version of [`STI`](#instr-sti).</div> | `34` |
| **`CF0Dcc`** | `[cc+1] STUQ` | `[z = parse_const_u8_plus_one] 0xCF, 0x0D, z`<br/>`` | _`x b - x b f or b' 0`_ | <div id='instr-stuq'>A quiet version of [`STU`](#instr-stu).</div> | `34` |
| **`CF0Ecc`** | `[cc+1] STIRQ` | `[z = parse_const_u8_plus_one] 0xCF, 0x0E, z`<br/>`` | _`b x - b x f or b' 0`_ | <div id='instr-stirq'>A quiet version of [`STIR`](#instr-stir).</div> | `34` |
| **`CF0Fcc`** | `[cc+1] STURQ` | `[z = parse_const_u8_plus_one] 0xCF, 0x0F, z`<br/>`` | _`b x - b x f or b' 0`_ | <div id='instr-sturq'>A quiet version of [`STUR`](#instr-stur).</div> | `34` |
| **`CF10`** | `STREF_l` | `0xCF, 0x10` | _`c b - b'`_ | <div id='instr-stref-alt'>A longer version of [`STREF`](#instr-stref).</div> | `26` |
| **`CF11`** | `STBREF` | `0xCF, 0x11` | _`b' b - b''`_ | <div id='instr-stbref'>Equivalent to [`SWAP`](#instr-swap) [`STBREFR`](#instr-stbrefr).</div> | `526` |
| **`CF12`** | `STSLICE_l` | `0xCF, 0x12` | _`s b - b'`_ | <div id='instr-stslice-alt'>A longer version of [`STSLICE`](#instr-stslice).</div> | `26` |
| **`CF13`** | `STB` | `0xCF, 0x13` | _`b' b - b''`_ | <div id='instr-stb'>Appends all data from _Builder_ `b'` to _Builder_ `b`.</div> | `26` |
| **`CF14`** | `STREFR` | `0xCF, 0x14` | _`b c - b'`_ | <div id='instr-strefr'>Equivalent to [`SWAP`](#instr-swap) [`STREF`](#instr-stref).</div> | `26` |
| **`CF15`** | `STBREFR_l` | `0xCF, 0x15` | _`b b' - b''`_ | <div id='instr-stbrefr-alt'>A longer encoding of [`STBREFR`](#instr-stbrefr).</div> | `526` |
| **`CF16`** | `STSLICER` | `0xCF, 0x16` | _`b s - b'`_ | <div id='instr-stslicer'>Equivalent to [`SWAP`](#instr-swap) [`STSLICE`](#instr-stslice).</div> | `26` |
| **`CF17`** | `STBR`<br/>`BCONCAT` | `0xCF, 0x17` | _`b b' - b''`_ | <div id='instr-stbr'>Concatenates two builders.<br/>Equivalent to [`SWAP`](#instr-swap) [`STB`](#instr-stb).</div> | `26` |
| **`CF18`** | `STREFQ` | `0xCF, 0x18` | _`c b - c b -1 or b' 0`_ | <div id='instr-strefq'>Quiet version of [`STREF`](#instr-stref).</div> | `26` |
| **`CF19`** | `STBREFQ` | `0xCF, 0x19` | _`b' b - b' b -1 or b'' 0`_ | <div id='instr-stbrefq'>Quiet version of [`STBREF`](#instr-stbref).</div> | `526` |
| **`CF1A`** | `STSLICEQ` | `0xCF, 0x1A` | _`s b - s b -1 or b' 0`_ | <div id='instr-stsliceq'>Quiet version of [`STSLICE`](#instr-stslice).</div> | `26` |
| **`CF1B`** | `STBQ` | `0xCF, 0x1B` | _`b' b - b' b -1 or b'' 0`_ | <div id='instr-stbq'>Quiet version of [`STB`](#instr-stb).</div> | `26` |
| **`CF1C`** | `STREFRQ` | `0xCF, 0x1C` | _`b c - b c -1 or b' 0`_ | <div id='instr-strefrq'>Quiet version of [`STREFR`](#instr-strefr).</div> | `26` |
| **`CF1D`** | `STBREFRQ` | `0xCF, 0x1D` | _`b b' - b b' -1 or b'' 0`_ | <div id='instr-stbrefrq'>Quiet version of [`STBREFR`](#instr-stbrefr).</div> | `526` |
| **`CF1E`** | `STSLICERQ` | `0xCF, 0x1E` | _`b s - b s -1 or b'' 0`_ | <div id='instr-stslicerq'>Quiet version of [`STSLICER`](#instr-stslicer).</div> | `26` |
| **`CF1F`** | `STBRQ`<br/>`BCONCATQ` | `0xCF, 0x1F` | _`b b' - b b' -1 or b'' 0`_ | <div id='instr-stbrq'>Quiet version of [`STBR`](#instr-stbr).</div> | `26` |
| **`CF20`** | `[ref] STREFCONST` | `0xCF, 0x20` | _`b - b’`_ | <div id='instr-strefconst'>Equivalent to [`PUSHREF`](#instr-pushref) [`STREFR`](#instr-strefr).</div> | `26` |
| **`CF21`** | `[ref] [ref] STREF2CONST` | `0xCF, 0x21` | _`b - b’`_ | <div id='instr-stref2const'>Equivalent to [`STREFCONST`](#instr-strefconst) [`STREFCONST`](#instr-strefconst).</div> | `26` |
| **`CF23`** |  | `0xCF, 0x23` | _`b x - c`_ | <div id='instr-endxc'>If `x!=0`, creates a _special_ or _exotic_ cell from _Builder_ `b`.<br/>The type of the exotic cell must be stored in the first 8 bits of `b`.<br/>If `x=0`, it is equivalent to [`ENDC`](#instr-endc). Otherwise some validity checks on the data and references of `b` are performed before creating the exotic cell.</div> | `526` |
| **`CF28`** | `STILE4` | `0xCF, 0x28` | _`x b - b'`_ | <div id='instr-stile4'>Stores a little-endian signed 32-bit integer.</div> | `26` |
| **`CF29`** | `STULE4` | `0xCF, 0x29` | _`x b - b'`_ | <div id='instr-stule4'>Stores a little-endian unsigned 32-bit integer.</div> | `26` |
| **`CF2A`** | `STILE8` | `0xCF, 0x2A` | _`x b - b'`_ | <div id='instr-stile8'>Stores a little-endian signed 64-bit integer.</div> | `26` |
| **`CF2B`** | `STULE8` | `0xCF, 0x2B` | _`x b - b'`_ | <div id='instr-stule8'>Stores a little-endian unsigned 64-bit integer.</div> | `26` |
| **`CF30`** | `BDEPTH` | `0xCF, 0x30` | _`b - x`_ | <div id='instr-bdepth'>Returns the depth of _Builder_ `b`. If no cell references are stored in `b`, then `x=0`; otherwise `x` is one plus the maximum of depths of cells referred to from `b`.</div> | `26` |
| **`CF31`** | `BBITS` | `0xCF, 0x31` | _`b - x`_ | <div id='instr-bbits'>Returns the number of data bits already stored in _Builder_ `b`.</div> | `26` |
| **`CF32`** | `BREFS` | `0xCF, 0x32` | _`b - y`_ | <div id='instr-brefs'>Returns the number of cell references already stored in `b`.</div> | `26` |
| **`CF33`** | `BBITREFS` | `0xCF, 0x33` | _`b - x y`_ | <div id='instr-bbitrefs'>Returns the numbers of both data bits and cell references in `b`.</div> | `26` |
| **`CF35`** | `BREMBITS` | `0xCF, 0x35` | _`b - x'`_ | <div id='instr-brembits'>Returns the number of data bits that can still be stored in `b`.</div> | `26` |
| **`CF36`** | `BREMREFS` | `0xCF, 0x36` | _`b - y'`_ | <div id='instr-bremrefs'>Returns the number of references that can still be stored in `b`.</div> | `26` |
| **`CF37`** | `BREMBITREFS` | `0xCF, 0x37` | _`b - x' y'`_ | <div id='instr-brembitrefs'>Returns the numbers of both data bits and references that can still be stored in `b`.</div> | `26` |
| **`CF38cc`** | `[cc+1] BCHKBITS#` |  | _`b -`_ | <div id='instr-bchkbits'>Checks whether `cc+1` bits can be stored into `b`, where `0 <= cc <= 255`.</div> | `34/84` |
| **`CF39`** | `BCHKBITS` | `0xCF, 0x39` | _`b x -`_ | <div id='instr-bchkbits-var'>Checks whether `x` bits can be stored into `b`, `0 <= x <= 1023`. If there is no space for `x` more bits in `b`, or if `x` is not within the range `0...1023`, throws an exception.</div> | `26/76` |
| **`CF3A`** | `BCHKREFS` | `0xCF, 0x3A` | _`b y -`_ | <div id='instr-bchkrefs'>Checks whether `y` references can be stored into `b`, `0 <= y <= 7`.</div> | `26/76` |
| **`CF3B`** | `BCHKBITREFS` | `0xCF, 0x3B` | _`b x y -`_ | <div id='instr-bchkbitrefs'>Checks whether `x` bits and `y` references can be stored into `b`, `0 <= x <= 1023`, `0 <= y <= 7`.</div> | `26/76` |
| **`CF3Ccc`** | `[cc+1] BCHKBITSQ#` |  | _`b - ?`_ | <div id='instr-bchkbitsq'>Checks whether `cc+1` bits can be stored into `b`, where `0 <= cc <= 255`.</div> | `34` |
| **`CF3D`** | `BCHKBITSQ` | `0xCF, 0x3D` | _`b x - ?`_ | <div id='instr-bchkbitsq-var'>Checks whether `x` bits can be stored into `b`, `0 <= x <= 1023`.</div> | `26` |
| **`CF3E`** | `BCHKREFSQ` | `0xCF, 0x3E` | _`b y - ?`_ | <div id='instr-bchkrefsq'>Checks whether `y` references can be stored into `b`, `0 <= y <= 7`.</div> | `26` |
| **`CF3F`** | `BCHKBITREFSQ` | `0xCF, 0x3F` | _`b x y - ?`_ | <div id='instr-bchkbitrefsq'>Checks whether `x` bits and `y` references can be stored into `b`, `0 <= x <= 1023`, `0 <= y <= 7`.</div> | `26` |
| **`CF40`** | `STZEROES` | `0xCF, 0x40` | _`b n - b'`_ | <div id='instr-stzeroes'>Stores `n` binary zeroes into _Builder_ `b`.</div> | `26` |
| **`CF41`** | `STONES` | `0xCF, 0x41` | _`b n - b'`_ | <div id='instr-stones'>Stores `n` binary ones into _Builder_ `b`.</div> | `26` |
| **`CF42`** | `STSAME` | `0xCF, 0x42` | _`b n x - b'`_ | <div id='instr-stsame'>Stores `n` binary `x`es (`0 <= x <= 1`) into _Builder_ `b`.</div> | `26` |
| **`CF43`** | `STCONT` | `0xCF, 0x43` | _`cont b - b'`_ | <div id='instr-stcont'>Stores Continuation `cont` into Builder `b`.</div> | `26` |
| **`CFC0_xysss`** | `[slice] STSLICECONST` |  | _`b - b'`_ | <div id='instr-stsliceconst'>Stores a constant subslice `sss`.<br/>_Details:_ `sss` consists of `0 <= x <= 3` references and up to `8y+2` data bits, with `0 <= y <= 7`. Completion bit is assumed.<br/>Note that the assembler can replace [`STSLICECONST`](#instr-stsliceconst) with [`PUSHSLICE`](#instr-pushslice) [`STSLICER`](#instr-stslicer) if the slice is too big.</div> | `24` |
| **`CF81`** | `STZERO` | `0xCF, 0x81` | _`b - b'`_ | <div id='instr-stzero'>Stores one binary zero.</div> | `24` |
| **`CF83`** | `STONE` | `0xCF, 0x83` | _`b - b'`_ | <div id='instr-stone'>Stores one binary one.</div> | `24` |
### 7.2 Cell deserialization primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`D0`** | `CTOS` | `0xD0` | _`c - s`_ | <div id='instr-ctos'>Converts a _Cell_ into a _Slice_. Notice that `c` must be either an ordinary cell, or an exotic cell which is automatically _loaded_ to yield an ordinary cell `c'`, converted into a _Slice_ afterwards.</div> | `118/43` |
| **`D1`** | `ENDS` | `0xD1` | _`s -`_ | <div id='instr-ends'>Removes a _Slice_ `s` from the stack, and throws an exception if it is not empty.</div> | `18/68` |
| **`D2cc`** | `[cc+1] LDI` |  | _`s - x s'`_ | <div id='instr-ldi'>Loads (i.e., parses) a signed `cc+1`-bit integer `x` from _Slice_ `s`, and returns the remainder of `s` as `s'`.</div> | `26` |
| **`D3cc`** | `[cc+1] LDU` | `[cc = parse_const_u8_plus_one] 0xD2, cc`<br/>`` | _`s - x s'`_ | <div id='instr-ldu'>Loads an unsigned `cc+1`-bit integer `x` from _Slice_ `s`.</div> | `26` |
| **`D4`** | `LDREF` | `0xD4` | _`s - c s'`_ | <div id='instr-ldref'>Loads a cell reference `c` from `s`.</div> | `18` |
| **`D5`** | `LDREFRTOS` | `0xD5` | _`s - s' s''`_ | <div id='instr-ldrefrtos'>Equivalent to [`LDREF`](#instr-ldref) [`SWAP`](#instr-swap) [`CTOS`](#instr-ctos).</div> | `118/43` |
| **`D6cc`** | `[cc+1] LDSLICE` | `[cc = parse_const_u8_plus_one] 0xD6, cc`<br/>`` | _`s - s'' s'`_ | <div id='instr-ldslice'>Cuts the next `cc+1` bits of `s` into a separate _Slice_ `s''`.</div> | `26` |
| **`D700`** | `LDIX` | `0xD7, 0x00` | _`s l - x s'`_ | <div id='instr-ldix'>Loads a signed `l`-bit (`0 <= l <= 257`) integer `x` from _Slice_ `s`, and returns the remainder of `s` as `s'`.</div> | `26` |
| **`D701`** | `LDUX` | `0xD7, 0x01` | _`s l - x s'`_ | <div id='instr-ldux'>Loads an unsigned `l`-bit integer `x` from (the first `l` bits of) `s`, with `0 <= l <= 256`.</div> | `26` |
| **`D702`** | `PLDIX` | `0xD7, 0x02` | _`s l - x`_ | <div id='instr-pldix'>Preloads a signed `l`-bit integer from _Slice_ `s`, for `0 <= l <= 257`.</div> | `26` |
| **`D703`** | `PLDUX` | `0xD7, 0x03` | _`s l - x`_ | <div id='instr-pldux'>Preloads an unsigned `l`-bit integer from `s`, for `0 <= l <= 256`.</div> | `26` |
| **`D704`** | `LDIXQ` | `0xD7, 0x04` | _`s l - x s' -1 or s 0`_ | <div id='instr-ldixq'>Quiet version of [`LDIX`](#instr-ldix): loads a signed `l`-bit integer from `s` similarly to [`LDIX`](#instr-ldix), but returns a success flag, equal to `-1` on success or to `0` on failure (if `s` does not have `l` bits), instead of throwing a cell underflow exception.</div> | `26` |
| **`D705`** | `LDUXQ` | `0xD7, 0x05` | _`s l - x s' -1 or s 0`_ | <div id='instr-lduxq'>Quiet version of [`LDUX`](#instr-ldux).</div> | `26` |
| **`D706`** | `PLDIXQ` | `0xD7, 0x06` | _`s l - x -1 or 0`_ | <div id='instr-pldixq'>Quiet version of [`PLDIX`](#instr-pldix).</div> | `26` |
| **`D707`** | `PLDUXQ` | `0xD7, 0x08` | _`s l - x -1 or 0`_ | <div id='instr-plduxq'>Quiet version of [`PLDUX`](#instr-pldux).</div> | `26` |
| **`D708cc`** | `[cc+1] LDI_l` |  | _`s - x s'`_ | <div id='instr-ldi-alt'>A longer encoding for [`LDI`](#instr-ldi).</div> | `34` |
| **`D709cc`** | `[cc+1] LDU_l` |  | _`s - x s'`_ | <div id='instr-ldu-alt'>A longer encoding for [`LDU`](#instr-ldu).</div> | `34` |
| **`D70Acc`** | `[cc+1] PLDI` | `[cc = parse_const_u8_plus_one] 0xD7, 0x0A, cc`<br/>`` | _`s - x`_ | <div id='instr-pldi'>Preloads a signed `cc+1`-bit integer from _Slice_ `s`.</div> | `34` |
| **`D70Bcc`** | `[cc+1] PLDU` | `[cc = parse_const_u8_plus_one] 0xD7, 0x0B, cc`<br/>`` | _`s - x`_ | <div id='instr-pldu'>Preloads an unsigned `cc+1`-bit integer from `s`.</div> | `34` |
| **`D70Ccc`** | `[cc+1] LDIQ` | `[cc = parse_const_u8_plus_one] 0xD7, 0x0C, cc`<br/>`` | _`s - x s' -1 or s 0`_ | <div id='instr-ldiq'>A quiet version of [`LDI`](#instr-ldi).</div> | `34` |
| **`D70Dcc`** | `[cc+1] LDUQ` | `[cc = parse_const_u8_plus_one] 0xD7, 0x0D, cc`<br/>`` | _`s - x s' -1 or s 0`_ | <div id='instr-lduq'>A quiet version of [`LDU`](#instr-ldu).</div> | `34` |
| **`D70Ecc`** | `[cc+1] PLDIQ` | `[cc = parse_const_u8_plus_one] 0xD7, 0x0E, cc`<br/>`` | _`s - x -1 or 0`_ | <div id='instr-pldiq'>A quiet version of [`PLDI`](#instr-pldi).</div> | `34` |
| **`D70Fcc`** | `[cc+1] PLDUQ` | `[cc = parse_const_u8_plus_one] 0xD7, 0x0F, cc`<br/>`` | _`s - x -1 or 0`_ | <div id='instr-plduq'>A quiet version of [`PLDU`](#instr-pldu).</div> | `34` |
| **`D714_c`** | `[32(c+1)] PLDUZ` | `[c = parse_plduz_parameter] 0xD7, 0x10 ｜ c`<br/>`` | _`s - s x`_ | <div id='instr-plduz'>Preloads the first `32(c+1)` bits of _Slice_ `s` into an unsigned integer `x`, for `0 <= c <= 7`. If `s` is shorter than necessary, missing bits are assumed to be zero. This operation is intended to be used along with [`IFBITJMP`](#instr-ifbitjmp) and similar instructions.</div> | `26` |
| **`D718`** | `LDSLICEX` | `0xD7, 0x18` | _`s l - s'' s'`_ | <div id='instr-ldslicex'>Loads the first `0 <= l <= 1023` bits from _Slice_ `s` into a separate _Slice_ `s''`, returning the remainder of `s` as `s'`.</div> | `26` |
| **`D719`** | `PLDSLICEX` | `0xD7, 0x19` | _`s l - s''`_ | <div id='instr-pldslicex'>Returns the first `0 <= l <= 1023` bits of `s` as `s''`.</div> | `26` |
| **`D71A`** | `LDSLICEXQ` | `0xD7, 0x1A` | _`s l - s'' s' -1 or s 0`_ | <div id='instr-ldslicexq'>A quiet version of [`LDSLICEX`](#instr-ldslicex).</div> | `26` |
| **`D71B`** | `PLDSLICEXQ` | `0xD7, 0x1B` | _`s l - s' -1 or 0`_ | <div id='instr-pldslicexq'>A quiet version of [`LDSLICEXQ`](#instr-ldslicexq).</div> | `26` |
| **`D71Ccc`** | `[cc+1] LDSLICE_l` |  | _`s - s'' s'`_ | <div id='instr-ldslice-alt'>A longer encoding for [`LDSLICE`](#instr-ldslice).</div> | `34` |
| **`D71Dcc`** | `[cc+1] PLDSLICE` | `[cc = parse_const_u8_plus_one] 0xD7, 0x1D, cc`<br/>`` | _`s - s''`_ | <div id='instr-pldslice'>Returns the first `0 < cc+1 <= 256` bits of `s` as `s''`.</div> | `34` |
| **`D71Ecc`** | `[cc+1] LDSLICEQ` | `[cc = parse_const_u8_plus_one] 0xD7, 0x1E, cc`<br/>`` | _`s - s'' s' -1 or s 0`_ | <div id='instr-ldsliceq'>A quiet version of [`LDSLICE`](#instr-ldslice).</div> | `34` |
| **`D71Fcc`** | `[cc+1] PLDSLICEQ` | `[cc = parse_const_u8_plus_one] 0xD7, 0x1F, cc`<br/>`` | _`s - s'' -1 or 0`_ | <div id='instr-pldsliceq'>A quiet version of [`PLDSLICE`](#instr-pldslice).</div> | `34` |
| **`D720`** | `SDCUTFIRST` | `0xD7, 0x20` | _`s l - s'`_ | <div id='instr-sdcutfirst'>Returns the first `0 <= l <= 1023` bits of `s`. It is equivalent to [`PLDSLICEX`](#instr-pldslicex).</div> | `26` |
| **`D721`** | `SDSKIPFIRST` | `0xD7, 0x21` | _`s l - s'`_ | <div id='instr-sdskipfirst'>Returns all but the first `0 <= l <= 1023` bits of `s`. It is equivalent to [`LDSLICEX`](#instr-ldslicex) [`NIP`](#instr-nip).</div> | `26` |
| **`D722`** | `SDCUTLAST` | `0xD7, 0x22` | _`s l - s'`_ | <div id='instr-sdcutlast'>Returns the last `0 <= l <= 1023` bits of `s`.</div> | `26` |
| **`D723`** | `SDSKIPLAST` | `0xD7, 0x23` | _`s l - s'`_ | <div id='instr-sdskiplast'>Returns all but the last `0 <= l <= 1023` bits of `s`.</div> | `26` |
| **`D724`** | `SDSUBSTR` | `0xD7, 0x24` | _`s l l' - s'`_ | <div id='instr-sdsubstr'>Returns `0 <= l' <= 1023` bits of `s` starting from offset `0 <= l <= 1023`, thus extracting a bit substring out of the data of `s`.</div> | `26` |
| **`D726`** | `SDBEGINSX` | `0xD7, 0x26` | _`s s' - s''`_ | <div id='instr-sdbeginsx'>Checks whether `s` begins with (the data bits of) `s'`, and removes `s'` from `s` on success. On failure throws a cell deserialization exception. Primitive [`SDPFXREV`](#instr-sdpfxrev) can be considered a quiet version of [`SDBEGINSX`](#instr-sdbeginsx).</div> | `26` |
| **`D727`** | `SDBEGINSXQ` | `0xD7, 0x27` | _`s s' - s'' -1 or s 0`_ | <div id='instr-sdbeginsxq'>A quiet version of [`SDBEGINSX`](#instr-sdbeginsx).</div> | `26` |
| **`D72A_xsss`** | `[slice] SDBEGINS` |  | _`s - s''`_ | <div id='instr-sdbegins'>Checks whether `s` begins with constant bitstring `sss` of length `8x+3` (with continuation bit assumed), where `0 <= x <= 127`, and removes `sss` from `s` on success.</div> | `31` |
| **`D72802`** | `[0] SDBEGINS` |  | _`s - s''`_ | <div id='instr-sdbegins-0'>Checks whether `s` begins with a binary zero.</div> | `31` |
| **`D72802`** | `[1] SDBEGINS` |  | _`s - s''`_ | <div id='instr-sdbegins-1'>Checks whether `s` begins with a binary one.</div> | `31` |
| **`D72E_xsss`** | `[slice] SDBEGINSQ` |  | _`s - s'' -1 or s 0`_ | <div id='instr-sdbeginsq'>A quiet version of [`SDBEGINS`](#instr-sdbegins).</div> | `31` |
| **`D730`** | `SCUTFIRST` | `0xD7, 0x30` | _`s l r - s'`_ | <div id='instr-scutfirst'>Returns the first `0 <= l <= 1023` bits and first `0 <= r <= 4` references of `s`.</div> | `26` |
| **`D731`** | `SSKIPFIRST` | `0xD7, 0x31` | _`s l r - s'`_ | <div id='instr-sskipfirst'>Returns all but the first `l` bits of `s` and `r` references of `s`.</div> | `26` |
| **`D732`** | `SCUTLAST` | `0xD7, 0x32` | _`s l r - s'`_ | <div id='instr-scutlast'>Returns the last `0 <= l <= 1023` data bits and last `0 <= r <= 4` references of `s`.</div> | `26` |
| **`D733`** | `SSKIPLAST` | `0xD7, 0x33` | _`s l r - s'`_ | <div id='instr-sskiplast'>Returns all but the last `l` bits of `s` and `r` references of `s`.</div> | `26` |
| **`D734`** | `SUBSLICE` | `0xD7, 0x34` | _`s l r l' r' - s'`_ | <div id='instr-subslice'>Returns `0 <= l' <= 1023` bits and `0 <= r' <= 4` references from _Slice_ `s`, after skipping the first `0 <= l <= 1023` bits and first `0 <= r <= 4` references.</div> | `26` |
| **`D736`** | `SPLIT` | `0xD7, 0x36` | _`s l r - s' s''`_ | <div id='instr-split'>Splits the first `0 <= l <= 1023` data bits and first `0 <= r <= 4` references from `s` into `s'`, returning the remainder of `s` as `s''`.</div> | `26` |
| **`D737`** | `SPLITQ` | `0xD7, 0x37` | _`s l r - s' s'' -1 or s 0`_ | <div id='instr-splitq'>A quiet version of [`SPLIT`](#instr-split).</div> | `26` |
| **`D739`** |  | `0xD7, 0x39` | _`c - s ?`_ | <div id='instr-xctos'>Transforms an ordinary or exotic cell into a _Slice_, as if it were an ordinary cell. A flag is returned indicating whether `c` is exotic. If that be the case, its type can later be deserialized from the first eight bits of `s`.</div> |  |
| **`D73A`** |  | `0xD7, 0x3A` | _`c - c'`_ | <div id='instr-xload'>Loads an exotic cell `c` and returns an ordinary cell `c'`. If `c` is already ordinary, does nothing. If `c` cannot be loaded, throws an exception.</div> |  |
| **`D73B`** |  | `0xD7, 0x3B` | _`c - c' -1 or c 0`_ | <div id='instr-xloadq'>Loads an exotic cell `c` and returns an ordinary cell `c'`. If `c` is already ordinary, does nothing. If `c` cannot be loaded, returns 0.</div> |  |
| **`D741`** | `SCHKBITS` | `0xD7, 0x41` | _`s l -`_ | <div id='instr-schkbits'>Checks whether there are at least `l` data bits in _Slice_ `s`. If this is not the case, throws a cell deserialisation (i.e., cell underflow) exception.</div> | `26/76` |
| **`D742`** | `SCHKREFS` | `0xD7, 0x42` | _`s r -`_ | <div id='instr-schkrefs'>Checks whether there are at least `r` references in _Slice_ `s`.</div> | `26/76` |
| **`D743`** | `SCHKBITREFS` | `0xD7, 0x43` | _`s l r -`_ | <div id='instr-schkbitrefs'>Checks whether there are at least `l` data bits and `r` references in _Slice_ `s`.</div> | `26/76` |
| **`D745`** | `SCHKBITSQ` | `0xD7, 0x45` | _`s l - ?`_ | <div id='instr-schkbitsq'>Checks whether there are at least `l` data bits in _Slice_ `s`.</div> | `26` |
| **`D746`** | `SCHKREFSQ` | `0xD7, 0x46` | _`s r - ?`_ | <div id='instr-schkrefsq'>Checks whether there are at least `r` references in _Slice_ `s`.</div> | `26` |
| **`D747`** | `SCHKBITREFSQ` | `0xD7, 0x47` | _`s l r - ?`_ | <div id='instr-schkbitrefsq'>Checks whether there are at least `l` data bits and `r` references in _Slice_ `s`.</div> | `26` |
| **`D748`** | `PLDREFVAR` | `0xD7, 0x48` | _`s n - c`_ | <div id='instr-pldrefvar'>Returns the `n`-th cell reference of _Slice_ `s` for `0 <= n <= 3`.</div> | `26` |
| **`D749`** | `SBITS` | `0xD7, 0x49` | _`s - l`_ | <div id='instr-sbits'>Returns the number of data bits in _Slice_ `s`.</div> | `26` |
| **`D74A`** | `SREFS` | `0xD7, 0x4A` | _`s - r`_ | <div id='instr-srefs'>Returns the number of references in _Slice_ `s`.</div> | `26` |
| **`D74B`** | `SBITREFS` | `0xD7, 0x4B` | _`s - l r`_ | <div id='instr-sbitrefs'>Returns both the number of data bits and the number of references in `s`.</div> | `26` |
| **`D74E_n`** | `[n] PLDREFIDX` | `[n = parse_const_u2] 0xD7, 0x4C ｜ n`<br/>`` | _`s - c`_ | <div id='instr-pldrefidx'>Returns the `n`-th cell reference of _Slice_ `s`, where `0 <= n <= 3`.</div> | `26` |
| **`D74C`** | `PLDREF` | `0xD7, 0x4C` | _`s - c`_ | <div id='instr-pldref'>Preloads the first cell reference of a _Slice_.</div> | `26` |
| **`D750`** | `LDILE4` | `0xD7, 0x50` | _`s - x s'`_ | <div id='instr-ldile4'>Loads a little-endian signed 32-bit integer.</div> | `26` |
| **`D751`** | `LDULE4` | `0xD7, 0x51` | _`s - x s'`_ | <div id='instr-ldule4'>Loads a little-endian unsigned 32-bit integer.</div> | `26` |
| **`D752`** | `LDILE8` | `0xD7, 0x52` | _`s - x s'`_ | <div id='instr-ldile8'>Loads a little-endian signed 64-bit integer.</div> | `26` |
| **`D753`** | `LDULE8` | `0xD7, 0x53` | _`s - x s'`_ | <div id='instr-ldule8'>Loads a little-endian unsigned 64-bit integer.</div> | `26` |
| **`D754`** | `PLDILE4` | `0xD7, 0x54` | _`s - x`_ | <div id='instr-pldile4'>Preloads a little-endian signed 32-bit integer.</div> | `26` |
| **`D755`** | `PLDULE4` | `0xD7, 0x55` | _`s - x`_ | <div id='instr-pldule4'>Preloads a little-endian unsigned 32-bit integer.</div> | `26` |
| **`D756`** | `PLDILE8` | `0xD7, 0x56` | _`s - x`_ | <div id='instr-pldile8'>Preloads a little-endian signed 64-bit integer.</div> | `26` |
| **`D757`** | `PLDULE8` | `0xD7, 0x57` | _`s - x`_ | <div id='instr-pldule8'>Preloads a little-endian unsigned 64-bit integer.</div> | `26` |
| **`D758`** | `LDILE4Q` | `0xD7, 0x58` | _`s - x s' -1 or s 0`_ | <div id='instr-ldile4q'>Quietly loads a little-endian signed 32-bit integer.</div> | `26` |
| **`D759`** | `LDULE4Q` | `0xD7, 0x59` | _`s - x s' -1 or s 0`_ | <div id='instr-ldule4q'>Quietly loads a little-endian unsigned 32-bit integer.</div> | `26` |
| **`D75A`** | `LDILE8Q` | `0xD7, 0x5A` | _`s - x s' -1 or s 0`_ | <div id='instr-ldile8q'>Quietly loads a little-endian signed 64-bit integer.</div> | `26` |
| **`D75B`** | `LDULE8Q` | `0xD7, 0x5B` | _`s - x s' -1 or s 0`_ | <div id='instr-ldule8q'>Quietly loads a little-endian unsigned 64-bit integer.</div> | `26` |
| **`D75C`** | `PLDILE4Q` | `0xD7, 0x5C` | _`s - x -1 or 0`_ | <div id='instr-pldile4q'>Quietly preloads a little-endian signed 32-bit integer.</div> | `26` |
| **`D75D`** | `PLDULE4Q` | `0xD7, 0x5D` | _`s - x -1 or 0`_ | <div id='instr-pldule4q'>Quietly preloads a little-endian unsigned 32-bit integer.</div> | `26` |
| **`D75E`** | `PLDILE8Q` | `0xD7, 0x5E` | _`s - x -1 or 0`_ | <div id='instr-pldile8q'>Quietly preloads a little-endian signed 64-bit integer.</div> | `26` |
| **`D75F`** | `PLDULE8Q` | `0xD7, 0x5F` | _`s - x -1 or 0`_ | <div id='instr-pldule8q'>Quietly preloads a little-endian unsigned 64-bit integer.</div> | `26` |
| **`D760`** | `LDZEROES` | `0xD7, 0x60` | _`s - n s'`_ | <div id='instr-ldzeroes'>Returns the count `n` of leading zero bits in `s`, and removes these bits from `s`.</div> | `26` |
| **`D761`** | `LDONES` | `0xD7, 0x61` | _`s - n s'`_ | <div id='instr-ldones'>Returns the count `n` of leading one bits in `s`, and removes these bits from `s`.</div> | `26` |
| **`D762`** | `LDSAME` | `0xD7, 0x62` | _`s x - n s'`_ | <div id='instr-ldsame'>Returns the count `n` of leading bits equal to `0 <= x <= 1` in `s`, and removes these bits from `s`.</div> | `26` |
| **`D764`** | `SDEPTH` | `0xD7, 0x64` | _`s - x`_ | <div id='instr-sdepth'>Returns the depth of _Slice_ `s`. If `s` has no references, then `x=0`; otherwise `x` is one plus the maximum of depths of cells referred to from `s`.</div> | `26` |
| **`D765`** | `CDEPTH` | `0xD7, 0x65` | _`c - x`_ | <div id='instr-cdepth'>Returns the depth of _Cell_ `c`. If `c` has no references, then `x=0`; otherwise `x` is one plus the maximum of depths of cells referred to from `c`. If `c` is a _Null_ instead of a _Cell_, returns zero.</div> | `26` |
| **`D766`** | `LDCONT` | `0xD7, 0x66` | _`s - cont s'`_ | <div id='instr-ldcont'>Loads a continuation `cont` from `s`.</div> | `26` |

## 8 Continuation and control flow primitives
### 8.1 Unconditional control flow primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`D8`** | `EXECUTE`<br/>`CALLX` | `0xD8` | _`c -`_ | <div id='instr-execute'>_Calls_, or _executes_, continuation `c`.</div> | `18` |
| **`D9`** | `JMPX` | `0xD9` | _`c -`_ | <div id='instr-jmpx'>_Jumps_, or transfers control, to continuation `c`.<br/>The remainder of the previous current continuation `cc` is discarded.</div> | `18` |
| **`DApr`** | `[p] [r] CALLXARGS` |  | _`c -`_ | <div id='instr-callxargs'>_Calls_ continuation `c` with `p` parameters and expecting `r` return values<br/>`0 <= p <= 15`, `0 <= r <= 15`</div> | `26` |
| **`DB0p`** | `[p] -1 CALLXARGS` |  | _`c -`_ | <div id='instr-callxargs-var'>_Calls_ continuation `c` with `0 <= p <= 15` parameters, expecting an arbitrary number of return values.</div> | `26` |
| **`DB1p`** | `[p] JMPXARGS` | `[p = parse_const_u4] 0xDB, 0x10 ｜ p`<br/>`` | _`c -`_ | <div id='instr-jmpxargs'>_Jumps_ to continuation `c`, passing only the top `0 <= p <= 15` values from the current stack to it (the remainder of the current stack is discarded).</div> | `26` |
| **`DB2r`** | `[r] RETARGS` | `[r = parse_const_u4] 0xDB, 0x20 ｜ r`<br/>`` |  | <div id='instr-retargs'>_Returns_ to `c0`, with `0 <= r <= 15` return values taken from the current stack.</div> | `26` |
| **`DB30`** | `RET`<br/>`RETTRUE` | `0xDB, 0x30` |  | <div id='instr-ret'>_Returns_ to the continuation at `c0`. The remainder of the current continuation `cc` is discarded.<br/>Approximately equivalent to [`c0 PUSHCTR`](#instr-pushctr) [`JMPX`](#instr-jmpx).</div> | `26` |
| **`DB31`** | `RETALT`<br/>`RETFALSE` | `0xDB, 0x31` |  | <div id='instr-retalt'>_Returns_ to the continuation at `c1`.<br/>Approximately equivalent to [`c1 PUSHCTR`](#instr-pushctr) [`JMPX`](#instr-jmpx).</div> | `26` |
| **`DB32`** | `BRANCH`<br/>`RETBOOL` | `0xDB, 0x32` | _`f -`_ | <div id='instr-branch'>Performs [`RETTRUE`](#instr-ret) if integer `f!=0`, or [`RETFALSE`](#instr-retalt) if `f=0`.</div> | `26` |
| **`DB34`** | `CALLCC` | `0xDB, 0x34` | _`c -`_ | <div id='instr-callcc'>_Call with current continuation_, transfers control to `c`, pushing the old value of `cc` into `c`'s stack (instead of discarding it or writing it into new `c0`).</div> | `26` |
| **`DB35`** | `JMPXDATA` | `0xDB, 0x35` | _`c -`_ | <div id='instr-jmpxdata'>Similar to [`CALLCC`](#instr-callcc), but the remainder of the current continuation (the old value of `cc`) is converted into a _Slice_ before pushing it into the stack of `c`.</div> | `26` |
| **`DB36pr`** | `[p] [r] CALLCCARGS` | `[c1 = parse_const_u4] [c2 = parse_const_i4] 0xDB, 0x36, (c1 << 4) ｜ c2`<br/>`` | _`c -`_ | <div id='instr-callccargs'>Similar to [`CALLXARGS`](#instr-callxargs), but pushes the old value of `cc` (along with the top `0 <= p <= 15` values from the original stack) into the stack of newly-invoked continuation `c`, setting `cc.nargs` to `-1 <= r <= 14`.</div> | `34` |
| **`DB38`** | `CALLXVARARGS` | `0xDB, 0x38` | _`c p r -`_ | <div id='instr-callxvarargs'>Similar to [`CALLXARGS`](#instr-callxargs), but takes `-1 <= p,r <= 254` from the stack. The next three operations also take `p` and `r` from the stack, both in the range `-1...254`.</div> | `26` |
| **`DB39`** | `RETVARARGS` | `0xDB, 0x39` | _`p r -`_ | <div id='instr-retvarargs'>Similar to [`RETARGS`](#instr-retargs).</div> | `26` |
| **`DB3A`** | `JMPXVARARGS` | `0xDB, 0x3A` | _`c p r -`_ | <div id='instr-jmpxvarargs'>Similar to [`JMPXARGS`](#instr-jmpxargs).</div> | `26` |
| **`DB3B`** | `CALLCCVARARGS` | `0xDB, 0x3B` | _`c p r -`_ | <div id='instr-callccvarargs'>Similar to [`CALLCCARGS`](#instr-callccargs).</div> | `26` |
| **`DB3C`** | `[ref] CALLREF` |  |  | <div id='instr-callref'>Equivalent to [`PUSHREFCONT`](#instr-pushrefcont) [`CALLX`](#instr-execute).</div> | `126/51` |
| **`DB3D`** | `[ref] JMPREF` |  |  | <div id='instr-jmpref'>Equivalent to [`PUSHREFCONT`](#instr-pushrefcont) [`JMPX`](#instr-jmpx).</div> | `126/51` |
| **`DB3E`** | `[ref] JMPREFDATA` | `0xDB, 0x3E` |  | <div id='instr-jmprefdata'>Equivalent to [`PUSHREFCONT`](#instr-pushrefcont) [`JMPXDATA`](#instr-jmpxdata).</div> | `126/51` |
| **`DB3F`** | `RETDATA` | `0xDB, 0x3F` |  | <div id='instr-retdata'>Equivalent to [`c0 PUSHCTR`](#instr-pushctr) [`JMPXDATA`](#instr-jmpxdata). In this way, the remainder of the current continuation is converted into a _Slice_ and returned to the caller.</div> | `26` |
### 8.2 Conditional control flow primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`DC`** | `IFRET`<br/>`IFNOT:` | `0xDC` | _`f -`_ | <div id='instr-ifret'>Performs a [`RET`](#instr-ret), but only if integer `f` is non-zero. If `f` is a `NaN`, throws an integer overflow exception.</div> | `18` |
| **`DD`** | `IFNOTRET`<br/>`IF:` | `0xDD` | _`f -`_ | <div id='instr-ifnotret'>Performs a [`RET`](#instr-ret), but only if integer `f` is zero.</div> | `18` |
| **`DE`** | `IF` | `0xDE` | _`f c -`_ | <div id='instr-if'>Performs [`EXECUTE`](#instr-execute) for `c` (i.e., _executes_ `c`), but only if integer `f` is non-zero. Otherwise simply discards both values.</div> | `18` |
| **`DE`** | `IF:<{ code }>`<br/>`<{ code }>IF` |  | _`f -`_ | <div id='instr-'>Equivalent to [`<{ code }> CONT`](#instr-pushcont) [`IF`](#instr-if).</div> |  |
| **`DF`** | `IFNOT` | `0xDF` | _`f c -`_ | <div id='instr-ifnot'>Executes continuation `c`, but only if integer `f` is zero. Otherwise simply discards both values.</div> | `18` |
| **`DF`** | `IFNOT:<{ code }>`<br/>`<{ code }>IFNOT` |  | _`f -`_ | <div id='instr-'>Equivalent to [`<{ code }> CONT`](#instr-pushcont) [`IFNOT`](#instr-ifnot).</div> |  |
| **`E0`** | `IFJMP` | `0xE0` | _`f c -`_ | <div id='instr-ifjmp'>Jumps to `c` (similarly to [`JMPX`](#instr-jmpx)), but only if `f` is non-zero.</div> | `18` |
| **`E0`** | `IFJMP:<{ code }>` |  | _`f -`_ | <div id='instr-'>Equivalent to [`<{ code }> CONT`](#instr-pushcont) [`IFJMP`](#instr-ifjmp).</div> |  |
| **`E1`** | `IFNOTJMP` | `0xE1` | _`f c -`_ | <div id='instr-ifnotjmp'>Jumps to `c` (similarly to [`JMPX`](#instr-jmpx)), but only if `f` is zero.</div> | `18` |
| **`E1`** | `IFNOTJMP:<{ code }>` |  | _`f -`_ | <div id='instr-'>Equivalent to [`<{ code }> CONT`](#instr-pushcont) [`IFNOTJMP`](#instr-ifnotjmp).</div> |  |
| **`E2`** | `IFELSE` | `0xE2` | _`f c c' -`_ | <div id='instr-ifelse'>If integer `f` is non-zero, executes `c`, otherwise executes `c'`. Equivalent to [`CONDSELCHK`](#instr-condselchk) [`EXECUTE`](#instr-execute).</div> | `18` |
| **`E2`** | `IF:<{ code1 }>ELSE<{ code2 }>` |  | _`f -`_ | <div id='instr-'>Equivalent to [`<{ code1 }> CONT`](#instr-pushcont) [`<{ code2 }> CONT`](#instr-pushcont) [`IFELSE`](#instr-ifelse).</div> |  |
| **`E300`** | `[ref] IFREF` |  | _`f -`_ | <div id='instr-ifref'>Equivalent to [`PUSHREFCONT`](#instr-pushrefcont) [`IF`](#instr-if), with the optimization that the cell reference is not actually loaded into a _Slice_ and then converted into an ordinary _Continuation_ if `f=0`.<br/>Gas consumption of this primitive depends on whether `f=0` and whether the reference was loaded before.<br/>Similar remarks apply other primitives that accept a continuation as a reference.</div> | `26/126/51` |
| **`E301`** | `[ref] IFNOTREF` |  | _`f -`_ | <div id='instr-ifnotref'>Equivalent to [`PUSHREFCONT`](#instr-pushrefcont) [`IFNOT`](#instr-ifnot).</div> | `26/126/51` |
| **`E302`** | `[ref] IFJMPREF` |  | _`f -`_ | <div id='instr-ifjmpref'>Equivalent to [`PUSHREFCONT`](#instr-pushrefcont) [`IFJMP`](#instr-ifjmp).</div> | `26/126/51` |
| **`E303`** | `[ref] IFNOTJMPREF` |  | _`f -`_ | <div id='instr-ifnotjmpref'>Equivalent to [`PUSHREFCONT`](#instr-pushrefcont) [`IFNOTJMP`](#instr-ifnotjmp).</div> | `26/126/51` |
| **`E304`** | `CONDSEL` | `0xE3, 0x04` | _`f x y - x or y`_ | <div id='instr-condsel'>If integer `f` is non-zero, returns `x`, otherwise returns `y`. Notice that no type checks are performed on `x` and `y`; as such, it is more like a conditional stack operation. Roughly equivalent to [`ROT`](#instr-rot) [`ISZERO`](#instr-iszero) [`INC`](#instr-inc) [`ROLLX`](#instr-rollx) [`NIP`](#instr-nip).</div> | `26` |
| **`E305`** | `CONDSELCHK` | `0xE3, 0x05` | _`f x y - x or y`_ | <div id='instr-condselchk'>Same as [`CONDSEL`](#instr-condsel), but first checks whether `x` and `y` have the same type.</div> | `26` |
| **`E308`** | `IFRETALT` | `0xE3, 0x08` | _`f -`_ | <div id='instr-ifretalt'>Performs [`RETALT`](#instr-retalt) if integer `f!=0`.</div> | `26` |
| **`E309`** | `IFNOTRETALT` | `0xE3, 0x09` | _`f -`_ | <div id='instr-ifnotretalt'>Performs [`RETALT`](#instr-retalt) if integer `f=0`.</div> | `26` |
| **`E30D`** | `[ref] IFREFELSE` |  | _`f c -`_ | <div id='instr-ifrefelse'>Equivalent to [`PUSHREFCONT`](#instr-pushrefcont) [`SWAP`](#instr-swap) [`IFELSE`](#instr-ifelse), with the optimization that the cell reference is not actually loaded into a _Slice_ and then converted into an ordinary _Continuation_ if `f=0`. Similar remarks apply to the next two primitives: cells are converted into continuations only when necessary.</div> | `26/126/51` |
| **`E30E`** | `[ref] IFELSEREF` |  | _`f c -`_ | <div id='instr-ifelseref'>Equivalent to [`PUSHREFCONT`](#instr-pushrefcont) [`IFELSE`](#instr-ifelse).</div> | `26/126/51` |
| **`E30F`** | `[ref] [ref] IFREFELSEREF` |  | _`f -`_ | <div id='instr-ifrefelseref'>Equivalent to [`PUSHREFCONT`](#instr-pushrefcont) [`PUSHREFCONT`](#instr-pushrefcont) [`IFELSE`](#instr-ifelse).</div> | `126/51` |
| **`E39_n`** | `[n] IFBITJMP` | `[n = parse_const_u5] 0xE3, 0x80 ｜ n`<br/>`` | _`x c - x`_ | <div id='instr-ifbitjmp'>Checks whether bit `0 <= n <= 31` is set in integer `x`, and if so, performs [`JMPX`](#instr-jmpx) to continuation `c`. Value `x` is left in the stack.</div> | `26` |
| **`E3B_n`** | `[n] IFNBITJMP` | `[n = parse_const_u5] 0xE3, 0xA0 ｜ n`<br/>`` | _`x c - x`_ | <div id='instr-ifnbitjmp'>Jumps to `c` if bit `0 <= n <= 31` is not set in integer `x`.</div> | `26` |
| **`E3D_n`** | `[ref] [n] IFBITJMPREF` | `[n = parse_const_u5] 0xE3, 0xC0 ｜ n`<br/>`` | _`x - x`_ | <div id='instr-ifbitjmpref'>Performs a [`JMPREF`](#instr-jmpref) if bit `0 <= n <= 31` is set in integer `x`.</div> | `126/51` |
| **`E3F_n`** | `[ref] [n] IFNBITJMPREF` | `[n = parse_const_u5] 0xE3, 0xE0 ｜ n`<br/>`` | _`x - x`_ | <div id='instr-ifnbitjmpref'>Performs a [`JMPREF`](#instr-jmpref) if bit `0 <= n <= 31` is not set in integer `x`.</div> | `126/51` |
### 8.3 Control flow primitives: loops
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`E4`** | `REPEAT` | `0xE4` | _`n c -`_ | <div id='instr-repeat'>Executes continuation `c` `n` times, if integer `n` is non-negative. If `n>=2^31` or `n<-2^31`, generates a range check exception.<br/>Notice that a [`RET`](#instr-ret) inside the code of `c` works as a `continue`, not as a `break`. One should use either alternative (experimental) loops or alternative [`RETALT`](#instr-retalt) (along with a [`SETEXITALT`](#instr-setexitalt) before the loop) to `break` out of a loop.</div> | `18` |
| **`E4`** | `REPEAT:<{ code }>`<br/>`<{ code }>REPEAT` |  | _`n -`_ | <div id='instr-'>Equivalent to [`<{ code }> CONT`](#instr-pushcont) [`REPEAT`](#instr-repeat).</div> |  |
| **`E5`** | `REPEATEND`<br/>`REPEAT:` | `0xE5` | _`n -`_ | <div id='instr-repeatend'>Similar to [`REPEAT`](#instr-repeat), but it is applied to the current continuation `cc`.</div> | `18` |
| **`E6`** | `UNTIL` | `0xE6` | _`c -`_ | <div id='instr-until'>Executes continuation `c`, then pops an integer `x` from the resulting stack. If `x` is zero, performs another iteration of this loop. The actual implementation of this primitive involves an extraordinary continuation `ec_until` with its arguments set to the body of the loop (continuation `c`) and the original current continuation `cc`. This extraordinary continuation is then saved into the savelist of `c` as `c.c0` and the modified `c` is then executed. The other loop primitives are implemented similarly with the aid of suitable extraordinary continuations.</div> | `18` |
| **`E6`** | `UNTIL:<{ code }>`<br/>`<{ code }>UNTIL` |  | _`-`_ | <div id='instr-'>Equivalent to [`<{ code }> CONT`](#instr-pushcont) [`UNTIL`](#instr-until).</div> |  |
| **`E7`** | `UNTILEND`<br/>`UNTIL:` | `0xE7` | _`-`_ | <div id='instr-untilend'>Similar to [`UNTIL`](#instr-until), but executes the current continuation `cc` in a loop. When the loop exit condition is satisfied, performs a [`RET`](#instr-ret).</div> | `18` |
| **`E8`** | `WHILE` | `0xE8` | _`c' c -`_ | <div id='instr-while'>Executes `c'` and pops an integer `x` from the resulting stack. If `x` is zero, exists the loop and transfers control to the original `cc`. If `x` is non-zero, executes `c`, and then begins a new iteration.</div> | `18` |
| **`E8`** | `WHILE:<{ cond }>DO<{ code }>` |  | _`-`_ | <div id='instr-'>Equivalent to [`<{ cond }> CONT`](#instr-pushcont) [`<{ code }> CONT`](#instr-pushcont) [`WHILE`](#instr-while).</div> |  |
| **`E9`** | `WHILEEND` | `0xE9` | _`c' -`_ | <div id='instr-whileend'>Similar to [`WHILE`](#instr-while), but uses the current continuation `cc` as the loop body.</div> | `18` |
| **`EA`** | `AGAIN` | `0xEA` | _`c -`_ | <div id='instr-again'>Similar to [`REPEAT`](#instr-repeat), but executes `c` infinitely many times. A [`RET`](#instr-ret) only begins a new iteration of the infinite loop, which can be exited only by an exception, or a [`RETALT`](#instr-retalt) (or an explicit [`JMPX`](#instr-jmpx)).</div> | `18` |
| **`EA`** | `AGAIN:<{ code }>`<br/>`<{ code }>AGAIN` |  | _`-`_ | <div id='instr-'>Equivalent to [`<{ code }> CONT`](#instr-pushcont) [`AGAIN`](#instr-again).</div> |  |
| **`EB`** | `AGAINEND`<br/>`AGAIN:` | `0xEB` | _`-`_ | <div id='instr-againend'>Similar to [`AGAIN`](#instr-again), but performed with respect to the current continuation `cc`.</div> | `18` |
| **`E314`** | `REPEATBRK` | `0xE3, 0x14` | _`n c -`_ | <div id='instr-repeatbrk'>Similar to [`REPEAT`](#instr-repeat), but also sets `c1` to the original `cc` after saving the old value of `c1` into the savelist of the original `cc`. In this way [`RETALT`](#instr-retalt) could be used to break out of the loop body.</div> | `26` |
| **`E314`** | `REPEATBRK:<{ code }>`<br/>`<{ code }>REPEATBRK` |  | _`n -`_ | <div id='instr-'>Equivalent to [`<{ code }> CONT`](#instr-pushcont) [`REPEATBRK`](#instr-repeatbrk).</div> |  |
| **`E315`** | `REPEATENDBRK` | `0xE3, 0x15` | _`n -`_ | <div id='instr-repeatendbrk'>Similar to [`REPEATEND`](#instr-repeatend), but also sets `c1` to the original `c0` after saving the old value of `c1` into the savelist of the original `c0`. Equivalent to [`SAMEALTSAVE`](#instr-samealtsave) [`REPEATEND`](#instr-repeatend).</div> | `26` |
| **`E316`** | `UNTILBRK` | `0xE3, 0x16` | _`c -`_ | <div id='instr-untilbrk'>Similar to [`UNTIL`](#instr-until), but also modifies `c1` in the same way as [`REPEATBRK`](#instr-repeatbrk).</div> | `26` |
| **`E316`** | `UNTILBRK:<{ code }>` |  | _`-`_ | <div id='instr-'>Equivalent to [`<{ code }> CONT`](#instr-pushcont) [`UNTILBRK`](#instr-untilbrk).</div> |  |
| **`E317`** | `UNTILENDBRK`<br/>`UNTILBRK:` | `0xE3, 0x17` | _`-`_ | <div id='instr-untilendbrk'>Equivalent to [`SAMEALTSAVE`](#instr-samealtsave) [`UNTILEND`](#instr-untilend).</div> | `26` |
| **`E318`** | `WHILEBRK` | `0xE3, 0x18` | _`c' c -`_ | <div id='instr-whilebrk'>Similar to [`WHILE`](#instr-while), but also modifies `c1` in the same way as [`REPEATBRK`](#instr-repeatbrk).</div> | `26` |
| **`E318`** | `WHILEBRK:<{ cond }>DO<{ code }>` |  | _`-`_ | <div id='instr-'>Equivalent to [`<{ cond }> CONT`](#instr-pushcont) [`<{ code }> CONT`](#instr-pushcont) [`WHILEBRK`](#instr-whilebrk).</div> |  |
| **`E319`** | `WHILEENDBRK` | `0xE3, 0x19` | _`c -`_ | <div id='instr-whileendbrk'>Equivalent to [`SAMEALTSAVE`](#instr-samealtsave) [`WHILEEND`](#instr-whileend).</div> | `26` |
| **`E31A`** | `AGAINBRK` | `0xE3, 0x1A` | _`c -`_ | <div id='instr-againbrk'>Similar to [`AGAIN`](#instr-again), but also modifies `c1` in the same way as [`REPEATBRK`](#instr-repeatbrk).</div> | `26` |
| **`E31A`** | `AGAINBRK:<{ code }>` |  | _`-`_ | <div id='instr-'>Equivalent to [`<{ code }> CONT`](#instr-pushcont) [`AGAINBRK`](#instr-againbrk).</div> |  |
| **`E31B`** | `AGAINENDBRK`<br/>`AGAINBRK:` | `0xE3, 0x1B` | _`-`_ | <div id='instr-againendbrk'>Equivalent to [`SAMEALTSAVE`](#instr-samealtsave) [`AGAINEND`](#instr-againend).</div> | `26` |
### 8.4 Manipulating the stack of continuations
Here `s"` is the [fee for moving stack elements between continuations](#11-gas-prices). It is equal to the size of the resulting stack minus 32 (or 0 if the stack is smaller than 32).

| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`ECrn`** | `[r] [n] SETCONTARGS` |  | _`x_1 x_2...x_r c - c'`_ | <div id='instr-setcontargs-n'>Similar to [`[r] -1 SETCONTARGS`](#instr-setcontargs-n), but sets `c.nargs` to the final size of the stack of `c'` plus `n`. In other words, transforms `c` into a _closure_ or a _partially applied function_, with `0 <= n <= 14` arguments missing.</div> | `26+s”` |
| **`EC0n`** | `[n] SETNUMARGS` | `[c = parse_const_u4_14] 0xEC, c`<br/>`` | _`c - c'`_ | <div id='instr-setnumargs'>Sets `c.nargs` to `n` plus the current depth of `c`'s stack, where `0 <= n <= 14`. If `c.nargs` is already set to a non-negative value, does nothing.</div> | `26` |
| **`ECrF`** | `[r] -1 SETCONTARGS` |  | _`x_1 x_2...x_r c - c'`_ | <div id='instr-setcontargs'>Pushes `0 <= r <= 15` values `x_1...x_r` into the stack of (a copy of) the continuation `c`, starting with `x_1`. If the final depth of `c`'s stack turns out to be greater than `c.nargs`, a stack overflow exception is generated.</div> | `26+s”` |
| **`ED0p`** | `[p] RETURNARGS` | `[c = parse_const_u4] 0xED, c`<br/>`` | _`-`_ | <div id='instr-returnargs'>Leaves only the top `0 <= p <= 15` values in the current stack (somewhat similarly to [`ONLYTOPX`](#instr-onlytopx)), with all the unused bottom values not discarded, but saved into continuation `c0` in the same way as [`SETCONTARGS`](#instr-setcontargs-n) does.</div> | `26+s”` |
| **`ED10`** | `RETURNVARARGS` | `0xED, 0x10` | _`p -`_ | <div id='instr-returnvarargs'>Similar to [`RETURNARGS`](#instr-returnargs), but with Integer `0 <= p <= 255` taken from the stack.</div> | `26+s”` |
| **`ED11`** | `SETCONTVARARGS` | `0xED, 0x11` | _`x_1 x_2...x_r c r n - c'`_ | <div id='instr-setcontvarargs'>Similar to [`SETCONTARGS`](#instr-setcontargs-n), but with `0 <= r <= 255` and `-1 <= n <= 255` taken from the stack.</div> | `26+s”` |
| **`ED12`** | `SETNUMVARARGS` | `0xED, 0x12` | _`c n - c'`_ | <div id='instr-setnumvarargs'>`-1 <= n <= 255`<br/>If `n=-1`, this operation does nothing (`c'=c`).<br/>Otherwise its action is similar to [`[n] SETNUMARGS`](#instr-setnumargs), but with `n` taken from the stack.</div> | `26` |
### 8.5 Creating simple continuations and closures
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`ED1E`** | `BLESS` | `0xED, 0x1E` | _`s - c`_ | <div id='instr-bless'>Transforms a _Slice_ `s` into a simple ordinary continuation `c`, with `c.code=s` and an empty stack and savelist.</div> | `26` |
| **`ED1F`** | `BLESSVARARGS` | `0xED, 0x1F` | _`x_1...x_r s r n - c`_ | <div id='instr-blessvarargs'>Equivalent to [`ROT`](#instr-rot) [`BLESS`](#instr-bless) [`ROTREV`](#instr-rotrev) [`SETCONTVARARGS`](#instr-setcontvarargs).</div> | `26+s”` |
| **`EErn`** | `[r] [n] BLESSARGS` | `[c1 = parse_const_u4] [c2 = parse_const_i4] 0xEE, (c1 << 4) ｜ c2`<br/>`` | _`x_1...x_r s - c`_ | <div id='instr-blessargs'>`0 <= r <= 15`, `-1 <= n <= 14`<br/>Equivalent to [`BLESS`](#instr-bless) [`[r] [n] SETCONTARGS`](#instr-setcontargs-n).<br/>The value of `n` is represented inside the instruction by the 4-bit integer `n mod 16`.</div> | `26` |
| **`EE0n`** | `[n] BLESSNUMARGS` | `[c = parse_const_u4_14] 0xEE, c`<br/>`` | _`s - c`_ | <div id='instr-blessnumargs'>Also transforms a _Slice_ `s` into a _Continuation_ `c`, but sets `c.nargs` to `0 <= n <= 14`.</div> | `26` |
### 8.6 Operations with continuation savelists and control registers
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`ED4i`** | `c[i] PUSHCTR`<br/>`c[i] PUSH` | `[z = parse_control_register] 0xED, 0x40 ｜ z`<br/>`` | _`- x`_ | <div id='instr-pushctr'>Pushes the current value of control register `c(i)`. If the control register is not supported in the current codepage, or if it does not have a value, an exception is triggered.</div> | `26` |
| **`ED44`** | `c4 PUSHCTR`<br/>`c4 PUSH` | `0xED, 0x44` | _`- x`_ | <div id='instr-pushroot'>Pushes the “global data root'' cell reference, thus enabling access to persistent smart-contract data.</div> | `26` |
| **`ED5i`** | `c[i] POPCTR`<br/>`c[i] POP` | `[z = parse_control_register] 0xED, 0x50 ｜ z`<br/>`` | _`x -`_ | <div id='instr-popctr'>Pops a value `x` from the stack and stores it into control register `c(i)`, if supported in the current codepage. Notice that if a control register accepts only values of a specific type, a type-checking exception may occur.</div> | `26` |
| **`ED54`** | `c4 POPCTR`<br/>`c4 POP` | `0xED, 0x54` | _`x -`_ | <div id='instr-poproot'>Sets the “global data root'' cell reference, thus allowing modification of persistent smart-contract data.</div> | `26` |
| **`ED6i`** | `c[i] SETCONT`<br/>`c[i] SETCONTCTR` | `[z = parse_control_register] 0xED, 0x60 ｜ z`<br/>`` | _`x c - c'`_ | <div id='instr-setcontctr'>Stores `x` into the savelist of continuation `c` as `c(i)`, and returns the resulting continuation `c'`. Almost all operations with continuations may be expressed in terms of [`SETCONTCTR`](#instr-setcontctr), [`POPCTR`](#instr-popctr), and [`PUSHCTR`](#instr-pushctr).</div> | `26` |
| **`ED7i`** | `c[i] SETRETCTR` | `[z = parse_control_register] 0xED, 0x70 ｜ z`<br/>`` | _`x -`_ | <div id='instr-setretctr'>Equivalent to [`c0 PUSHCTR`](#instr-pushctr) [`c[i] SETCONTCTR`](#instr-setcontctr) [`c0 POPCTR`](#instr-popctr).</div> | `26` |
| **`ED8i`** | `c[i] SETALTCTR` | `[z = parse_control_register] 0xED, 0x80 ｜ z`<br/>`` | _`x -`_ | <div id='instr-setaltctr'>Equivalent to [`c1 PUSHCTR`](#instr-pushctr) [`c[i] SETCONTCTR`](#instr-setcontctr) [`c0 POPCTR`](#instr-popctr).</div> | `26` |
| **`ED9i`** | `c[i] POPSAVE`<br/>`c[i] POPCTRSAVE` | `[z = parse_control_register] 0xED, 0x90 ｜ z`<br/>`` | _`x -`_ | <div id='instr-popsave'>Similar to [`c[i] POPCTR`](#instr-popctr), but also saves the old value of `c[i]` into continuation `c0`.<br/>Equivalent (up to exceptions) to [`c[i] SAVECTR`](#instr-save) [`c[i] POPCTR`](#instr-popctr).</div> | `26` |
| **`EDAi`** | `c[i] SAVE`<br/>`c[i] SAVECTR` | `[z = parse_control_register] 0xED, 0xA0 ｜ z`<br/>`` |  | <div id='instr-save'>Saves the current value of `c(i)` into the savelist of continuation `c0`. If an entry for `c[i]` is already present in the savelist of `c0`, nothing is done. Equivalent to [`c[i] PUSHCTR`](#instr-pushctr) [`c[i] SETRETCTR`](#instr-setretctr).</div> | `26` |
| **`EDBi`** | `c[i] SAVEALT`<br/>`c[i] SAVEALTCTR` | `[z = parse_control_register] 0xED, 0xB0 ｜ z`<br/>`` |  | <div id='instr-savealt'>Similar to [`c[i] SAVE`](#instr-save), but saves the current value of `c[i]` into the savelist of `c1`, not `c0`.</div> | `26` |
| **`EDCi`** | `c[i] SAVEBOTH`<br/>`c[i] SAVEBOTHCTR` | `[z = parse_control_register] 0xED, 0xC0 ｜ z`<br/>`` |  | <div id='instr-saveboth'>Equivalent to [`DUP`](#instr-dup) [`c[i] SAVE`](#instr-save) [`c[i] SAVEALT`](#instr-savealt).</div> | `26` |
| **`EDE0`** | `PUSHCTRX` | `0xED, 0xE0` | _`i - x`_ | <div id='instr-pushctrx'>Similar to [`c[i] PUSHCTR`](#instr-pushctr), but with `i`, `0 <= i <= 255`, taken from the stack.<br/>Notice that this primitive is one of the few “exotic'' primitives, which are not polymorphic like stack manipulation primitives, and at the same time do not have well-defined types of parameters and return values, because the type of `x` depends on `i`.</div> | `26` |
| **`EDE1`** | `POPCTRX` | `0xED, 0xE1` | _`x i -`_ | <div id='instr-popctrx'>Similar to [`c[i] POPCTR`](#instr-popctr), but with `0 <= i <= 255` from the stack.</div> | `26` |
| **`EDE2`** | `SETCONTCTRX` | `0xED, 0xE2` | _`x c i - c'`_ | <div id='instr-setcontctrx'>Similar to [`c[i] SETCONTCTR`](#instr-setcontctr), but with `0 <= i <= 255` from the stack.</div> | `26` |
| **`EDF0`** | `COMPOS`<br/>`BOOLAND` | `0xED, 0xF0` | _`c c' - c''`_ | <div id='instr-compos'>Computes the composition `compose0(c, c’)`, which has the meaning of “perform `c`, and, if successful, perform `c'`'' (if `c` is a boolean circuit) or simply “perform `c`, then `c'`''. Equivalent to [`SWAP`](#instr-swap) [`c0 SETCONT`](#instr-setcontctr).</div> | `26` |
| **`EDF1`** | `COMPOSALT`<br/>`BOOLOR` | `0xED, 0xF1` | _`c c' - c''`_ | <div id='instr-composalt'>Computes the alternative composition `compose1(c, c’)`, which has the meaning of “perform `c`, and, if not successful, perform `c'`'' (if `c` is a boolean circuit). Equivalent to [`SWAP`](#instr-swap) [`c1 SETCONT`](#instr-setcontctr).</div> | `26` |
| **`EDF2`** | `COMPOSBOTH` | `0xED, 0xF2` | _`c c' - c''`_ | <div id='instr-composboth'>Computes composition `compose1(compose0(c, c’), c’)`, which has the meaning of “compute boolean circuit `c`, then compute `c'`, regardless of the result of `c`''.</div> | `26` |
| **`EDF3`** | `ATEXIT` | `0xED, 0xF3` | _`c -`_ | <div id='instr-atexit'>Sets `c0` to `compose0(c, c0)`. In other words, `c` will be executed before exiting current subroutine.</div> | `26` |
| **`EDF3`** | `ATEXIT:<{ code }>`<br/>`<{ code }>ATEXIT` |  | _`-`_ | <div id='instr-'>Equivalent to [`<{ code }> CONT`](#instr-pushcont) [`ATEXIT`](#instr-atexit).</div> |  |
| **`EDF4`** | `ATEXITALT` | `0xED, 0xF4` | _`c -`_ | <div id='instr-atexitalt'>Sets `c1` to `compose1(c, c1)`. In other words, `c` will be executed before exiting current subroutine by its alternative return path.</div> | `26` |
| **`EDF4`** | `ATEXITALT:<{ code }>`<br/>`<{ code }>ATEXITALT` |  | _`-`_ | <div id='instr-'>Equivalent to [`<{ code }> CONT`](#instr-pushcont) [`ATEXITALT`](#instr-atexitalt).</div> |  |
| **`EDF5`** | `SETEXITALT` | `0xED, 0xF5` | _`c -`_ | <div id='instr-setexitalt'>Sets `c1` to `compose1(compose0(c, c0), c1)`,<br/>In this way, a subsequent [`RETALT`](#instr-retalt) will first execute `c`, then transfer control to the original `c0`. This can be used, for instance, to exit from nested loops.</div> | `26` |
| **`EDF6`** | `THENRET` | `0xED, 0xF6` | _`c - c'`_ | <div id='instr-thenret'>Computes `compose0(c, c0)`.</div> | `26` |
| **`EDF7`** | `THENRETALT` | `0xED, 0xF7` | _`c - c'`_ | <div id='instr-thenretalt'>Computes `compose0(c, c1)`</div> | `26` |
| **`EDF8`** | `INVERT` | `0xED, 0xF8` | _`-`_ | <div id='instr-invert'>Interchanges `c0` and `c1`.</div> | `26` |
| **`EDF9`** | `BOOLEVAL` | `0xED, 0xF9` | _`c - ?`_ | <div id='instr-booleval'>Performs `cc:=compose1(compose0(c, compose0(-1 PUSHINT, cc)), compose0(0 PUSHINT, cc))`. If `c` represents a boolean circuit, the net effect is to evaluate it and push either `-1` or `0` into the stack before continuing.</div> | `26` |
| **`EDFA`** | `SAMEALT` | `0xED, 0xFA` | _`-`_ | <div id='instr-samealt'>Sets `c1` to `c0`. Equivalent to [`c0 PUSHCTR`](#instr-pushctr) [`c1 POPCTR`](#instr-popctr).</div> | `26` |
| **`EDFB`** | `SAMEALTSAVE` | `0xED, 0xFB` | _`-`_ | <div id='instr-samealtsave'>Sets `c1` to `c0`, but first saves the old value of `c1` into the savelist of `c0`.<br/>Equivalent to [`c1 SAVE`](#instr-save) [`SAMEALT`](#instr-samealt).</div> | `26` |
### 8.7 Dictionary subroutine calls and jumps
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F0nn`** | `[nn] CALL`<br/>`[nn] CALLDICT` |  | _`- nn`_ | <div id='instr-calldict'>Calls the continuation in `c3`, pushing integer `0 <= nn <= 255` into its stack as an argument.<br/>Approximately equivalent to [`[nn] PUSHINT`](#instr-pushint-4) [`c3 PUSHCTR`](#instr-pushctr) [`EXECUTE`](#instr-execute).</div> |  |
| **`F12_n`** | `[n] CALL`<br/>`[n] CALLDICT` |  | _`- n`_ | <div id='instr-calldict-long'>For `0 <= n < 2^14`, an encoding of [`[n] CALL`](#instr-calldict) for larger values of `n`.</div> |  |
| **`F16_n`** | `[n] JMP` |  | _`- n`_ | <div id='instr-jmpdict'>Jumps to the continuation in `c3`, pushing integer `0 <= n < 2^14` as its argument.<br/>Approximately equivalent to [`n PUSHINT`](#instr-pushint-4) [`c3 PUSHCTR`](#instr-pushctr) [`JMPX`](#instr-jmpx).</div> |  |
| **`F1A_n`** | `[n] PREPARE`<br/>`[n] PREPAREDICT` | `[n = parse_const_u14] 0xF1, 0x80 ｜ ((n / 256) as u8), ((n % 256) as u8)`<br/>`` | _`- n c`_ | <div id='instr-preparedict'>Equivalent to [`n PUSHINT`](#instr-pushint-4) [`c3 PUSHCTR`](#instr-pushctr), for `0 <= n < 2^14`.<br/>In this way, [`[n] CALL`](#instr-calldict) is approximately equivalent to [`[n] PREPARE`](#instr-preparedict) [`EXECUTE`](#instr-execute), and [`[n] JMP`](#instr-jmpdict) is approximately equivalent to [`[n] PREPARE`](#instr-preparedict) [`JMPX`](#instr-jmpx).<br/>One might use, for instance, [`CALLXARGS`](#instr-callxargs) or [`CALLCC`](#instr-callcc) instead of [`EXECUTE`](#instr-execute) here.</div> |  |

## 9 Exception generating and handling primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F22_n`** | `[n] THROW` |  | _`- 0 n`_ | <div id='instr-throw-short'>Throws exception `0 <= n <= 63` with parameter zero.<br/>In other words, it transfers control to the continuation in `c2`, pushing `0` and `n` into its stack, and discarding the old stack altogether.</div> | `76` |
| **`F26_n`** | `[n] THROWIF` |  | _`f -`_ | <div id='instr-throwif-short'>Throws exception `0 <= n <= 63` with  parameter zero only if integer `f!=0`.</div> | `26/76` |
| **`F2A_n`** | `[n] THROWIFNOT` |  | _`f -`_ | <div id='instr-throwifnot-short'>Throws exception `0 <= n <= 63` with parameter zero only if integer `f=0`.</div> | `26/76` |
| **`F2C4_n`** | `[n] THROW` |  | _`- 0 nn`_ | <div id='instr-throw'>For `0 <= n < 2^11`, an encoding of [`[n] THROW`](#instr-throw-short) for larger values of `n`.</div> | `84` |
| **`F2CC_n`** | `[n] THROWARG` | `[n = parse_const_u11] 0xF2, 0xC8 ｜ ((n / 256) as u8), ((n % 256) as u8)`<br/>`` | _`x - x nn`_ | <div id='instr-throwarg'>Throws exception `0 <= n <  2^11` with parameter `x`, by copying `x` and `n` into the stack of `c2` and transferring control to `c2`.</div> | `84` |
| **`F2D4_n`** | `[n] THROWIF` |  | _`f -`_ | <div id='instr-throwif'>For `0 <= n < 2^11`, an encoding of [`[n] THROWIF`](#instr-throwif-short) for larger values of `n`.</div> | `34/84` |
| **`F2DC_n`** | `[n] THROWARGIF` | `[n = parse_const_u11] 0xF2, 0xD8 ｜ ((n / 256) as u8), ((n % 256) as u8)`<br/>`` | _`x f -`_ | <div id='instr-throwargif'>Throws exception `0 <= nn < 2^11` with parameter `x` only if integer `f!=0`.</div> | `34/84` |
| **`F2E4_n`** | `[n] THROWIFNOT` |  | _`f -`_ | <div id='instr-throwifnot'>For `0 <= n < 2^11`, an encoding of [`[n] THROWIFNOT`](#instr-throwifnot-short) for larger values of `n`.</div> | `34/84` |
| **`F2EC_n`** | `[n] THROWARGIFNOT` | `[n = parse_const_u11] 0xF2, 0xE8 ｜ ((n / 256) as u8), ((n % 256) as u8)`<br/>`` | _`x f -`_ | <div id='instr-throwargifnot'>Throws exception `0 <= n < 2^11` with parameter `x` only if integer `f=0`.</div> | `34/84` |
| **`F2F0`** | `THROWANY` | `0xF2, 0xF0` | _`n - 0 n`_ | <div id='instr-throwany'>Throws exception `0 <= n < 2^16` with parameter zero.<br/>Approximately equivalent to [`ZERO`](#instr-zero) [`SWAP`](#instr-swap) [`THROWARGANY`](#instr-throwargany).</div> | `76` |
| **`F2F1`** | `THROWARGANY` | `0xF2, 0xF1` | _`x n - x n`_ | <div id='instr-throwargany'>Throws exception `0 <= n < 2^16` with parameter `x`, transferring control to the continuation in `c2`.<br/>Approximately equivalent to [`c2 PUSHCTR`](#instr-pushctr) [`2 JMPXARGS`](#instr-jmpxargs).</div> | `76` |
| **`F2F2`** | `THROWANYIF` | `0xF2, 0xF2` | _`n f -`_ | <div id='instr-throwanyif'>Throws exception `0 <= n < 2^16` with parameter zero only if `f!=0`.</div> | `26/76` |
| **`F2F3`** | `THROWARGANYIF` | `0xF2, 0xF3` | _`x n f -`_ | <div id='instr-throwarganyif'>Throws exception `0 <= n<2^16` with parameter `x` only if `f!=0`.</div> | `26/76` |
| **`F2F4`** | `THROWANYIFNOT` | `0xF2, 0xF4` | _`n f -`_ | <div id='instr-throwanyifnot'>Throws exception `0 <= n<2^16` with parameter zero only if `f=0`.</div> | `26/76` |
| **`F2F5`** | `THROWARGANYIFNOT` | `0xF2, 0xF5` | _`x n f -`_ | <div id='instr-throwarganyifnot'>Throws exception `0 <= n<2^16` with parameter `x` only if `f=0`.</div> | `26/76` |
| **`F2FF`** | `TRY` | `0xF2, 0xFF` | _`c c' -`_ | <div id='instr-try'>Sets `c2` to `c'`, first saving the old value of `c2` both into the savelist of `c'` and into the savelist of the current continuation, which is stored into `c.c0` and `c'.c0`. Then runs `c` similarly to [`EXECUTE`](#instr-execute). If `c` does not throw any exceptions, the original value of `c2` is automatically restored on return from `c`. If an exception occurs, the execution is transferred to `c'`, but the original value of `c2` is restored in the process, so that `c'` can re-throw the exception by [`THROWANY`](#instr-throwany) if it cannot handle it by itself.</div> | `26` |
| **`F2FF`** | `TRY:<{ code1 }>CATCH<{ code2 }>` |  | _`-`_ | <div id='instr-'>Equivalent to [`<{ code1 }> CONT`](#instr-pushcont) [`<{ code2 }> CONT`](#instr-pushcont) [`TRY`](#instr-try).</div> |  |
| **`F3pr`** | `[p] [r] TRYARGS` | `[s1 = parse_const_u4] [s2 = parse_const_u4] 0xF3, (s1 << 4 ｜ s2)`<br/>`` | _`c c' -`_ | <div id='instr-tryargs'>Similar to [`TRY`](#instr-try), but with [`[p] [r] CALLXARGS`](#instr-callxargs) internally used instead of [`EXECUTE`](#instr-execute).<br/>In this way, all but the top `0 <= p <= 15` stack elements will be saved into current continuation's stack, and then restored upon return from either `c` or `c'`, with the top `0 <= r <= 15` values of the resulting stack of `c` or `c'` copied as return values.</div> | `26` |

## 10 Dictionary manipulation primitives
Gas consumption of most of the dictionary operations is not fixed, it depends on the contents of the given dictionary.
### 10.1 Dictionary creation
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`6D`** | `NEWDICT` | `0x6D` | _`- D`_ | <div id='instr-newdict'>Returns a new empty dictionary.<br/>It is an alternative mnemonics for [`PUSHNULL`](#instr-null).</div> | `18` |
| **`6E`** | `DICTEMPTY` | `0x6E` | _`D - ?`_ | <div id='instr-dictempty'>Checks whether dictionary `D` is empty, and returns `-1` or `0` accordingly.<br/>It is an alternative mnemonics for [`ISNULL`](#instr-isnull).</div> | `18` |
### 10.2 Dictionary serialization and deserialization
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`CE`** | `STDICTS`<br/>`` | `0xCE` | _`s b - b'`_ | <div id='instr-stdicts'>Stores a _Slice_-represented dictionary `s` into _Builder_ `b`.<br/>It is actually a synonym for [`STSLICE`](#instr-stslice).</div> | `18` |
| **`F400`** | `STDICT`<br/>`STOPTREF` | `0xF4, 0x00` | _`D b - b'`_ | <div id='instr-stdict'>Stores dictionary `D` into _Builder_ `b`, returing the resulting _Builder_ `b'`.<br/>In other words, if `D` is a cell, performs [`STONE`](#instr-stone) and [`STREF`](#instr-stref); if `D` is _Null_, performs [`NIP`](#instr-nip) and [`STZERO`](#instr-stzero); otherwise throws a type checking exception.</div> | `26` |
| **`F401`** | `SKIPDICT`<br/>`SKIPOPTREF` | `0xF4, 0x01` | _`s - s'`_ | <div id='instr-skipdict'>Equivalent to [`LDDICT`](#instr-lddict) [`NIP`](#instr-nip).</div> | `26` |
| **`F402`** | `LDDICTS` | `0xF4, 0x02` | _`s - s' s''`_ | <div id='instr-lddicts'>Loads (parses) a (_Slice_-represented) dictionary `s'` from _Slice_ `s`, and returns the remainder of `s` as `s''`.<br/>This is a “split function'' for all `HashmapE(n,X)` dictionary types.</div> | `26` |
| **`F403`** | `PLDDICTS` | `0xF4, 0x03` | _`s - s'`_ | <div id='instr-plddicts'>Preloads a (_Slice_-represented) dictionary `s'` from _Slice_ `s`.<br/>Approximately equivalent to [`LDDICTS`](#instr-lddicts) [`DROP`](#instr-drop).</div> | `26` |
| **`F404`** | `LDDICT`<br/>`LDOPTREF` | `0xF4, 0x04` | _`s - D s'`_ | <div id='instr-lddict'>Loads (parses) a dictionary `D` from _Slice_ `s`, and returns the remainder of `s` as `s'`. May be applied to dictionaries or to values of arbitrary `(^Y)?` types.</div> | `26` |
| **`F405`** | `PLDDICT`<br/>`PLDOPTREF` | `0xF4, 0x05` | _`s - D`_ | <div id='instr-plddict'>Preloads a dictionary `D` from _Slice_ `s`.<br/>Approximately equivalent to [`LDDICT`](#instr-lddict) [`DROP`](#instr-drop).</div> | `26` |
| **`F406`** | `LDDICTQ` | `0xF4, 0x06` | _`s - D s' -1 or s 0`_ | <div id='instr-lddictq'>A quiet version of [`LDDICT`](#instr-lddict).</div> | `26` |
| **`F407`** | `PLDDICTQ` | `0xF4, 0x07` | _`s - D -1 or 0`_ | <div id='instr-plddictq'>A quiet version of [`PLDDICT`](#instr-plddict).</div> | `26` |
### 10.3 Get dictionary operations
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F40A`** | `DICTGET` | `0xF4, 0x0A` | _`k D n - x -1 or 0`_ | <div id='instr-dictget'>Looks up key `k` (represented by a _Slice_, the first `0 <= n <= 1023` data bits of which are used as a key) in dictionary `D` of type `HashmapE(n,X)` with `n`-bit keys.<br/>On success, returns the value found as a _Slice_ `x`.</div> |  |
| **`F40B`** | `DICTGETREF` | `0xF4, 0x0B` | _`k D n - c -1 or 0`_ | <div id='instr-dictgetref'>Similar to [`DICTGET`](#instr-dictget), but with a [`LDREF`](#instr-ldref) [`ENDS`](#instr-ends) applied to `x` on success.<br/>This operation is useful for dictionaries of type `HashmapE(n,^Y)`.</div> |  |
| **`F40C`** | `DICTIGET` | `0xF4, 0x0C` | _`i D n - x -1 or 0`_ | <div id='instr-dictiget'>Similar to [`DICTGET`](#instr-dictget), but with a signed (big-endian) `n`-bit _Integer_ `i` as a key. If `i` does not fit into `n` bits, returns `0`. If `i` is a `NaN`, throws an integer overflow exception.</div> |  |
| **`F40D`** | `DICTIGETREF` | `0xF4, 0x0D` | _`i D n - c -1 or 0`_ | <div id='instr-dictigetref'>Combines [`DICTIGET`](#instr-dictiget) with [`DICTGETREF`](#instr-dictgetref): it uses signed `n`-bit _Integer_ `i` as a key and returns a _Cell_ instead of a _Slice_ on success.</div> |  |
| **`F40E`** | `DICTUGET` | `0xF4, 0x0E` | _`i D n - x -1 or 0`_ | <div id='instr-dictuget'>Similar to [`DICTIGET`](#instr-dictiget), but with _unsigned_ (big-endian) `n`-bit _Integer_ `i` used as a key.</div> |  |
| **`F40F`** | `DICTUGETREF` | `0xF4, 0x0F` | _`i D n - c -1 or 0`_ | <div id='instr-dictugetref'>Similar to [`DICTIGETREF`](#instr-dictigetref), but with an unsigned `n`-bit _Integer_ key `i`.</div> |  |
### 10.4 Set/Replace/Add dictionary operations
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F412`** | `DICTSET` | `0xF4, 0x12` | _`x k D n - D'`_ | <div id='instr-dictset'>Sets the value associated with `n`-bit key `k` (represented by a _Slice_ as in [`DICTGET`](#instr-dictget)) in dictionary `D` (also represented by a _Slice_) to value `x` (again a _Slice_), and returns the resulting dictionary as `D'`.</div> |  |
| **`F413`** | `DICTSETREF` | `0xF4, 0x13` | _`c k D n - D'`_ | <div id='instr-dictsetref'>Similar to [`DICTSET`](#instr-dictset), but with the value set to a reference to _Cell_ `c`.</div> |  |
| **`F414`** | `DICTISET` | `0xF4, 0x14` | _`x i D n - D'`_ | <div id='instr-dictiset'>Similar to [`DICTSET`](#instr-dictset), but with the key represented by a (big-endian) signed `n`-bit integer `i`. If `i` does not fit into `n` bits, a range check exception is generated.</div> |  |
| **`F415`** | `DICTISETREF` | `0xF4, 0x15` | _`c i D n - D'`_ | <div id='instr-dictisetref'>Similar to [`DICTSETREF`](#instr-dictsetref), but with the key a signed `n`-bit integer as in [`DICTISET`](#instr-dictiset).</div> |  |
| **`F416`** | `DICTUSET` | `0xF4, 0x16` | _`x i D n - D'`_ | <div id='instr-dictuset'>Similar to [`DICTISET`](#instr-dictiset), but with `i` an _unsigned_ `n`-bit integer.</div> |  |
| **`F417`** | `DICTUSETREF` | `0xF4, 0x17` | _`c i D n - D'`_ | <div id='instr-dictusetref'>Similar to [`DICTISETREF`](#instr-dictisetref), but with `i` unsigned.</div> |  |
| **`F41A`** | `DICTSETGET` | `0xF4, 0x1A` | _`x k D n - D' y -1 or D' 0`_ | <div id='instr-dictsetget'>Combines [`DICTSET`](#instr-dictset) with [`DICTGET`](#instr-dictget): it sets the value corresponding to key `k` to `x`, but also returns the old value `y` associated with the key in question, if present.</div> |  |
| **`F41B`** | `DICTSETGETREF` | `0xF4, 0x1B` | _`c k D n - D' c' -1 or D' 0`_ | <div id='instr-dictsetgetref'>Combines [`DICTSETREF`](#instr-dictsetref) with [`DICTGETREF`](#instr-dictgetref) similarly to [`DICTSETGET`](#instr-dictsetget).</div> |  |
| **`F41C`** | `DICTISETGET` | `0xF4, 0x1C` | _`x i D n - D' y -1 or D' 0`_ | <div id='instr-dictisetget'>[`DICTISETGET`](#instr-dictisetget), but with `i` a signed `n`-bit integer.</div> |  |
| **`F41D`** | `DICTISETGETREF` | `0xF4, 0x1D` | _`c i D n - D' c' -1 or D' 0`_ | <div id='instr-dictisetgetref'>[`DICTISETGETREF`](#instr-dictisetgetref), but with `i` a signed `n`-bit integer.</div> |  |
| **`F41E`** | `DICTUSETGET` | `0xF4, 0x1E` | _`x i D n - D' y -1 or D' 0`_ | <div id='instr-dictusetget'>[`DICTISETGET`](#instr-dictisetget), but with `i` an unsigned `n`-bit integer.</div> |  |
| **`F41F`** | `DICTUSETGETREF` | `0xF4, 0x1F` | _`c i D n - D' c' -1 or D' 0`_ | <div id='instr-dictusetgetref'>[`DICTISETGETREF`](#instr-dictisetgetref), but with `i` an unsigned `n`-bit integer.</div> |  |
| **`F422`** | `DICTREPLACE` | `0xF4, 0x22` | _`x k D n - D' -1 or D 0`_ | <div id='instr-dictreplace'>A _Replace_ operation, which is similar to [`DICTSET`](#instr-dictset), but sets the value of key `k` in dictionary `D` to `x` only if the key `k` was already present in `D`.</div> |  |
| **`F423`** | `DICTREPLACEREF` | `0xF4, 0x23` | _`c k D n - D' -1 or D 0`_ | <div id='instr-dictreplaceref'>A _Replace_ counterpart of [`DICTSETREF`](#instr-dictsetref).</div> |  |
| **`F424`** | `DICTIREPLACE` | `0xF4, 0x24` | _`x i D n - D' -1 or D 0`_ | <div id='instr-dictireplace'>[`DICTREPLACE`](#instr-dictreplace), but with `i` a signed `n`-bit integer.</div> |  |
| **`F425`** | `DICTIREPLACEREF` | `0xF4, 0x25` | _`c i D n - D' -1 or D 0`_ | <div id='instr-dictireplaceref'>[`DICTREPLACEREF`](#instr-dictreplaceref), but with `i` a signed `n`-bit integer.</div> |  |
| **`F426`** | `DICTUREPLACE` | `0xF4, 0x26` | _`x i D n - D' -1 or D 0`_ | <div id='instr-dictureplace'>[`DICTREPLACE`](#instr-dictreplace), but with `i` an unsigned `n`-bit integer.</div> |  |
| **`F427`** | `DICTUREPLACEREF` | `0xF4, 0x27` | _`c i D n - D' -1 or D 0`_ | <div id='instr-dictureplaceref'>[`DICTREPLACEREF`](#instr-dictreplaceref), but with `i` an unsigned `n`-bit integer.</div> |  |
| **`F42A`** | `DICTREPLACEGET` | `0xF4, 0x2A` | _`x k D n - D' y -1 or D 0`_ | <div id='instr-dictreplaceget'>A _Replace_ counterpart of [`DICTSETGET`](#instr-dictsetget): on success, also returns the old value associated with the key in question.</div> |  |
| **`F42B`** | `DICTREPLACEGETREF` | `0xF4, 0x2B` | _`c k D n - D' c' -1 or D 0`_ | <div id='instr-dictreplacegetref'>A _Replace_ counterpart of [`DICTSETGETREF`](#instr-dictsetgetref).</div> |  |
| **`F42C`** | `DICTIREPLACEGET` | `0xF4, 0x2C` | _`x i D n - D' y -1 or D 0`_ | <div id='instr-dictireplaceget'>[`DICTREPLACEGET`](#instr-dictreplaceget), but with `i` a signed `n`-bit integer.</div> |  |
| **`F42D`** | `DICTIREPLACEGETREF` | `0xF4, 0x2D` | _`c i D n - D' c' -1 or D 0`_ | <div id='instr-dictireplacegetref'>[`DICTREPLACEGETREF`](#instr-dictreplacegetref), but with `i` a signed `n`-bit integer.</div> |  |
| **`F42E`** | `DICTUREPLACEGET` | `0xF4, 0x2E` | _`x i D n - D' y -1 or D 0`_ | <div id='instr-dictureplaceget'>[`DICTREPLACEGET`](#instr-dictreplaceget), but with `i` an unsigned `n`-bit integer.</div> |  |
| **`F42F`** | `DICTUREPLACEGETREF` | `0xF4, 0x2F` | _`c i D n - D' c' -1 or D 0`_ | <div id='instr-dictureplacegetref'>[`DICTREPLACEGETREF`](#instr-dictreplacegetref), but with `i` an unsigned `n`-bit integer.</div> |  |
| **`F432`** | `DICTADD` | `0xF4, 0x32` | _`x k D n - D' -1 or D 0`_ | <div id='instr-dictadd'>An _Add_ counterpart of [`DICTSET`](#instr-dictset): sets the value associated with key `k` in dictionary `D` to `x`, but only if it is not already present in `D`.</div> |  |
| **`F433`** | `DICTADDREF` | `0xF4, 0x33` | _`c k D n - D' -1 or D 0`_ | <div id='instr-dictaddref'>An _Add_ counterpart of [`DICTSETREF`](#instr-dictsetref).</div> |  |
| **`F434`** | `DICTIADD` | `0xF4, 0x34` | _`x i D n - D' -1 or D 0`_ | <div id='instr-dictiadd'>[`DICTADD`](#instr-dictadd), but with `i` a signed `n`-bit integer.</div> |  |
| **`F435`** | `DICTIADDREF` | `0xF4, 0x35` | _`c i D n - D' -1 or D 0`_ | <div id='instr-dictiaddref'>[`DICTADDREF`](#instr-dictaddref), but with `i` a signed `n`-bit integer.</div> |  |
| **`F436`** | `DICTUADD` | `0xF4, 0x36` | _`x i D n - D' -1 or D 0`_ | <div id='instr-dictuadd'>[`DICTADD`](#instr-dictadd), but with `i` an unsigned `n`-bit integer.</div> |  |
| **`F437`** | `DICTUADDREF` | `0xF4, 0x37` | _`c i D n - D' -1 or D 0`_ | <div id='instr-dictuaddref'>[`DICTADDREF`](#instr-dictaddref), but with `i` an unsigned `n`-bit integer.</div> |  |
| **`F43A`** | `DICTADDGET` | `0xF4, 0x3A` | _`x k D n - D' -1 or D y 0`_ | <div id='instr-dictaddget'>An _Add_ counterpart of [`DICTSETGET`](#instr-dictsetget): sets the value associated with key `k` in dictionary `D` to `x`, but only if key `k` is not already present in `D`. Otherwise, just returns the old value `y` without changing the dictionary.</div> |  |
| **`F43B`** | `DICTADDGETREF` | `0xF4, 0x3B` | _`c k D n - D' -1 or D c' 0`_ | <div id='instr-dictaddgetref'>An _Add_ counterpart of [`DICTSETGETREF`](#instr-dictsetgetref).</div> |  |
| **`F43C`** | `DICTIADDGET` | `0xF4, 0x3C` | _`x i D n - D' -1 or D y 0`_ | <div id='instr-dictiaddget'>[`DICTADDGET`](#instr-dictaddget), but with `i` a signed `n`-bit integer.</div> |  |
| **`F43D`** | `DICTIADDGETREF` | `0xF4, 0x3D` | _`c i D n - D' -1 or D c' 0`_ | <div id='instr-dictiaddgetref'>[`DICTADDGETREF`](#instr-dictaddgetref), but with `i` a signed `n`-bit integer.</div> |  |
| **`F43E`** | `DICTUADDGET` | `0xF4, 0x3E` | _`x i D n - D' -1 or D y 0`_ | <div id='instr-dictuaddget'>[`DICTADDGET`](#instr-dictaddget), but with `i` an unsigned `n`-bit integer.</div> |  |
| **`F43F`** | `DICTUADDGETREF` | `0xF4, 0x3F` | _`c i D n - D' -1 or D c' 0`_ | <div id='instr-dictuaddgetref'>[`DICTADDGETREF`](#instr-dictaddgetref), but with `i` an unsigned `n`-bit integer.</div> |  |
### 10.5 Builder-accepting variants of Set dictionary operations
The following primitives accept the new value as a _Builder_ `b` instead of a _Slice_ `x`.

| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F441`** | `DICTSETB` | `0xF4, 0x41` | _`b k D n - D'`_ | <div id='instr-dictsetb'></div> |  |
| **`F442`** | `DICTISETB` | `0xF4, 0x42` | _`b i D n - D'`_ | <div id='instr-dictisetb'></div> |  |
| **`F443`** | `DICTUSETB` | `0xF4, 0x43` | _`b i D n - D'`_ | <div id='instr-dictusetb'></div> |  |
| **`F445`** | `DICTSETGETB` | `0xF4, 0x44` | _`b k D n - D' y -1 or D' 0`_ | <div id='instr-dictsetgetb'></div> |  |
| **`F446`** | `DICTISETGETB` | `0xF4, 0x46` | _`b i D n - D' y -1 or D' 0`_ | <div id='instr-dictisetgetb'></div> |  |
| **`F447`** | `DICTUSETGETB` | `0xF4, 0x47` | _`b i D n - D' y -1 or D' 0`_ | <div id='instr-dictusetgetb'></div> |  |
| **`F449`** | `DICTREPLACEB` | `0xF4, 0x49` | _`b k D n - D' -1 or D 0`_ | <div id='instr-dictreplaceb'></div> |  |
| **`F44A`** | `DICTIREPLACEB` | `0xF4, 0x4A` | _`b i D n - D' -1 or D 0`_ | <div id='instr-dictireplaceb'></div> |  |
| **`F44B`** | `DICTUREPLACEB` | `0xF4, 0x4B` | _`b i D n - D' -1 or D 0`_ | <div id='instr-dictureplaceb'></div> |  |
| **`F44D`** | `DICTREPLACEGETB` | `0xF4, 0x4D` | _`b k D n - D' y -1 or D 0`_ | <div id='instr-dictreplacegetb'></div> |  |
| **`F44E`** | `DICTIREPLACEGETB` | `0xF4, 0x4E` | _`b i D n - D' y -1 or D 0`_ | <div id='instr-dictireplacegetb'></div> |  |
| **`F44F`** | `DICTUREPLACEGETB` | `0xF4, 0x4F` | _`b i D n - D' y -1 or D 0`_ | <div id='instr-dictureplacegetb'></div> |  |
| **`F451`** | `DICTADDB` | `0xF4, 0x51` | _`b k D n - D' -1 or D 0`_ | <div id='instr-dictaddb'></div> |  |
| **`F452`** | `DICTIADDB` | `0xF4, 0x52` | _`b i D n - D' -1 or D 0`_ | <div id='instr-dictiaddb'></div> |  |
| **`F453`** | `DICTUADDB` | `0xF4, 0x53` | _`b i D n - D' -1 or D 0`_ | <div id='instr-dictuaddb'></div> |  |
| **`F455`** | `DICTADDGETB` | `0xF4, 0x55` | _`b k D n - D' -1 or D y 0`_ | <div id='instr-dictaddgetb'></div> |  |
| **`F456`** | `DICTIADDGETB` | `0xF4, 0x56` | _`b i D n - D' -1 or D y 0`_ | <div id='instr-dictiaddgetb'></div> |  |
| **`F457`** | `DICTUADDGETB` | `0xF4, 0x57` | _`b i D n - D' -1 or D y 0`_ | <div id='instr-dictuaddgetb'></div> |  |
### 10.6 Delete dictionary operations
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F459`** | `DICTDEL` | `0xF4, 0x59` | _`k D n - D' -1 or D 0`_ | <div id='instr-dictdel'>Deletes `n`-bit key, represented by a _Slice_ `k`, from dictionary `D`. If the key is present, returns the modified dictionary `D'` and the success flag `-1`. Otherwise, returns the original dictionary `D` and `0`.</div> |  |
| **`F45A`** | `DICTIDEL` | `0xF4, 0x5A` | _`i D n - D' ?`_ | <div id='instr-dictidel'>A version of [`DICTDEL`](#instr-dictdel) with the key represented by a signed `n`-bit _Integer_ `i`. If `i` does not fit into `n` bits, simply returns `D` `0` (“key not found, dictionary unmodified'').</div> |  |
| **`F45B`** | `DICTUDEL` | `0xF4, 0x5B` | _`i D n - D' ?`_ | <div id='instr-dictudel'>Similar to [`DICTIDEL`](#instr-dictidel), but with `i` an unsigned `n`-bit integer.</div> |  |
| **`F462`** | `DICTDELGET` | `0xF4, 0x62` | _`k D n - D' x -1 or D 0`_ | <div id='instr-dictdelget'>Deletes `n`-bit key, represented by a _Slice_ `k`, from dictionary `D`. If the key is present, returns the modified dictionary `D'`, the original value `x` associated with the key `k` (represented by a _Slice_), and the success flag `-1`. Otherwise, returns the original dictionary `D` and `0`.</div> |  |
| **`F463`** | `DICTDELGETREF` | `0xF4, 0x63` | _`k D n - D' c -1 or D 0`_ | <div id='instr-dictdelgetref'>Similar to [`DICTDELGET`](#instr-dictdelget), but with [`LDREF`](#instr-ldref) [`ENDS`](#instr-ends) applied to `x` on success, so that the value returned `c` is a _Cell_.</div> |  |
| **`F464`** | `DICTIDELGET` | `0xF4, 0x64` | _`i D n - D' x -1 or D 0`_ | <div id='instr-dictidelget'>[`DICTDELGET`](#instr-dictdelget), but with `i` a signed `n`-bit integer.</div> |  |
| **`F465`** | `DICTIDELGETREF` | `0xF4, 0x65` | _`i D n - D' c -1 or D 0`_ | <div id='instr-dictidelgetref'>[`DICTDELGETREF`](#instr-dictdelgetref), but with `i` a signed `n`-bit integer.</div> |  |
| **`F466`** | `DICTUDELGET` | `0xF4, 0x66` | _`i D n - D' x -1 or D 0`_ | <div id='instr-dictudelget'>[`DICTDELGET`](#instr-dictdelget), but with `i` an unsigned `n`-bit integer.</div> |  |
| **`F467`** | `DICTUDELGETREF` | `0xF4, 0x67` | _`i D n - D' c -1 or D 0`_ | <div id='instr-dictudelgetref'>[`DICTDELGETREF`](#instr-dictdelgetref), but with `i` an unsigned `n`-bit integer.</div> |  |
### 10.7 "Maybe reference" dictionary operations
The following operations assume that a dictionary is used to store values `c?` of type _Maybe Cell_.  The representation is as follows: if `c?` is a _Cell_ , it is stored as a value with no data bits and exactly one reference to this _Cell_.  If `c?` is _Null_, then the corresponding key must be absent from the dictionary.

| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F469`** | `DICTGETOPTREF` | `0xF4, 0x69` | _`k D n - c^?`_ | <div id='instr-dictgetoptref'>A variant of [`DICTGETREF`](#instr-dictgetref) that returns _Null_ instead of the value `c^?` if the key `k` is absent from dictionary `D`.</div> |  |
| **`F46A`** | `DICTIGETOPTREF` | `0xF4, 0x6A` | _`i D n - c^?`_ | <div id='instr-dictigetoptref'>[`DICTGETOPTREF`](#instr-dictgetoptref), but with `i` a signed `n`-bit integer. If the key `i` is out of range, also returns _Null_.</div> |  |
| **`F46B`** | `DICTUGETOPTREF` | `0xF4, 0x6B` | _`i D n - c^?`_ | <div id='instr-dictugetoptref'>[`DICTGETOPTREF`](#instr-dictgetoptref), but with `i` an unsigned `n`-bit integer. If the key `i` is out of range, also returns _Null_.</div> |  |
| **`F46D`** | `DICTSETGETOPTREF` | `0xF4, 0x6D` | _`c^? k D n - D' ~c^?`_ | <div id='instr-dictsetgetoptref'>A variant of both [`DICTGETOPTREF`](#instr-dictgetoptref) and [`DICTSETGETREF`](#instr-dictsetgetref) that sets the value corresponding to key `k` in dictionary `D` to `c^?` (if `c^?` is _Null_, then the key is deleted instead), and returns the old value `~c^?` (if the key `k` was absent before, returns _Null_ instead).</div> |  |
| **`F46E`** | `DICTISETGETOPTREF` | `0xF4, 0x6E` | _`c^? i D n - D' ~c^?`_ | <div id='instr-dictisetgetoptref'>Similar to primitive [`DICTSETGETOPTREF`](#instr-dictsetgetoptref), but using signed `n`-bit _Integer_ `i` as a key. If `i` does not fit into `n` bits, throws a range checking exception.</div> |  |
| **`F46F`** | `DICTUSETGETOPTREF` | `0xF4, 0x6F` | _`c^? i D n - D' ~c^?`_ | <div id='instr-dictusetgetoptref'>Similar to primitive [`DICTSETGETOPTREF`](#instr-dictsetgetoptref), but using unsigned `n`-bit _Integer_ `i` as a key.</div> |  |
### 10.8 Prefix code dictionary operations
These are some basic operations for constructing prefix code dictionaries.
These primitives are completely similar to their non-prefix code counterparts (`DICTSET` etc), with the obvious difference that even a _Set_ may fail in a prefix code dictionary, so a success flag must be returned by `PFXDICTSET` as well.

| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F470`** | `PFXDICTSET` | `0xF4, 0x70` | _`x k D n - D' -1 or D 0`_ | <div id='instr-pfxdictset'></div> |  |
| **`F471`** | `PFXDICTREPLACE` | `0xF4, 0x71` | _`x k D n - D' -1 or D 0`_ | <div id='instr-pfxdictreplace'></div> |  |
| **`F472`** | `PFXDICTADD` | `0xF4, 0x72` | _`x k D n - D' -1 or D 0`_ | <div id='instr-pfxdictadd'></div> |  |
| **`F473`** | `PFXDICTDEL` | `0xF4, 0x73` | _`k D n - D' -1 or D 0`_ | <div id='instr-pfxdictdel'></div> |  |
### 10.9 Variants of GetNext and GetPrev operations
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F474`** | `DICTGETNEXT` | `0xF4, 0x74` | _`k D n - x' k' -1 or 0`_ | <div id='instr-dictgetnext'>Computes the minimal key `k'` in dictionary `D` that is lexicographically greater than `k`, and returns `k'` (represented by a _Slice_) along with associated value `x'` (also represented by a _Slice_).</div> |  |
| **`F475`** | `DICTGETNEXTEQ` | `0xF4, 0x75` | _`k D n - x' k' -1 or 0`_ | <div id='instr-dictgetnexteq'>Similar to [`DICTGETNEXT`](#instr-dictgetnext), but computes the minimal key `k'` that is lexicographically greater than or equal to `k`.</div> |  |
| **`F476`** | `DICTGETPREV` | `0xF4, 0x76` | _`k D n - x' k' -1 or 0`_ | <div id='instr-dictgetprev'>Similar to [`DICTGETNEXT`](#instr-dictgetnext), but computes the maximal key `k'` lexicographically smaller than `k`.</div> |  |
| **`F477`** | `DICTGETPREVEQ` | `0xF4, 0x77` | _`k D n - x' k' -1 or 0`_ | <div id='instr-dictgetpreveq'>Similar to [`DICTGETPREV`](#instr-dictgetprev), but computes the maximal key `k'` lexicographically smaller than or equal to `k`.</div> |  |
| **`F478`** | `DICTIGETNEXT` | `0xF4, 0x78` | _`i D n - x' i' -1 or 0`_ | <div id='instr-dictigetnext'>Similar to [`DICTGETNEXT`](#instr-dictgetnext), but interprets all keys in dictionary `D` as big-endian signed `n`-bit integers, and computes the minimal key `i'` that is larger than _Integer_ `i` (which does not necessarily fit into `n` bits).</div> |  |
| **`F479`** | `DICTIGETNEXTEQ` | `0xF4, 0x79` | _`i D n - x' i' -1 or 0`_ | <div id='instr-dictigetnexteq'>Similar to [`DICTGETNEXTEQ`](#instr-dictgetnexteq), but interprets keys as signed `n`-bit integers.</div> |  |
| **`F47A`** | `DICTIGETPREV` | `0xF4, 0x7A` | _`i D n - x' i' -1 or 0`_ | <div id='instr-dictigetprev'>Similar to [`DICTGETPREV`](#instr-dictgetprev), but interprets keys as signed `n`-bit integers.</div> |  |
| **`F47B`** | `DICTIGETPREVEQ` | `0xF4, 0x7B` | _`i D n - x' i' -1 or 0`_ | <div id='instr-dictigetpreveq'>Similar to [`DICTGETPREVEQ`](#instr-dictgetpreveq), but interprets keys as signed `n`-bit integers.</div> |  |
| **`F47C`** | `DICTUGETNEXT` | `0xF4, 0x7C` | _`i D n - x' i' -1 or 0`_ | <div id='instr-dictugetnext'>Similar to [`DICTGETNEXT`](#instr-dictgetnext), but interprets all keys in dictionary `D` as big-endian unsigned `n`-bit integers, and computes the minimal key `i'` that is larger than _Integer_ `i` (which does not necessarily fit into `n` bits, and is not necessarily non-negative).</div> |  |
| **`F47D`** | `DICTUGETNEXTEQ` | `0xF4, 0x7D` | _`i D n - x' i' -1 or 0`_ | <div id='instr-dictugetnexteq'>Similar to [`DICTGETNEXTEQ`](#instr-dictgetnexteq), but interprets keys as unsigned `n`-bit integers.</div> |  |
| **`F47E`** | `DICTUGETPREV` | `0xF4, 0x7E` | _`i D n - x' i' -1 or 0`_ | <div id='instr-dictugetprev'>Similar to [`DICTGETPREV`](#instr-dictgetprev), but interprets keys as unsigned `n`-bit integers.</div> |  |
| **`F47F`** | `DICTUGETPREVEQ` | `0xF4, 0x7F` | _`i D n - x' i' -1 or 0`_ | <div id='instr-dictugetpreveq'>Similar to [`DICTGETPREVEQ`](#instr-dictgetpreveq), but interprets keys a unsigned `n`-bit integers.</div> |  |
### 10.10 GetMin, GetMax, RemoveMin, RemoveMax operations
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F482`** | `DICTMIN` | `0xF4, 0x82` | _`D n - x k -1 or 0`_ | <div id='instr-dictmin'>Computes the minimal key `k` (represented by a _Slice_ with `n` data bits) in dictionary `D`, and returns `k` along with the associated value `x`.</div> |  |
| **`F483`** | `DICTMINREF` | `0xF4, 0x83` | _`D n - c k -1 or 0`_ | <div id='instr-dictminref'>Similar to [`DICTMIN`](#instr-dictmin), but returns the only reference in the value as a _Cell_ `c`.</div> |  |
| **`F484`** | `DICTIMIN` | `0xF4, 0x84` | _`D n - x i -1 or 0`_ | <div id='instr-dictimin'>Similar to [`DICTMIN`](#instr-dictmin), but computes the minimal key `i` under the assumption that all keys are big-endian signed `n`-bit integers. Notice that the key and value returned may differ from those computed by [`DICTMIN`](#instr-dictmin) and [`DICTUMIN`](#instr-dictumin).</div> |  |
| **`F485`** | `DICTIMINREF` | `0xF4, 0x85` | _`D n - c i -1 or 0`_ | <div id='instr-dictiminref'>Similar to [`DICTIMIN`](#instr-dictimin), but returns the only reference in the value.</div> |  |
| **`F486`** | `DICTUMIN` | `0xF4, 0x86` | _`D n - x i -1 or 0`_ | <div id='instr-dictumin'>Similar to [`DICTMIN`](#instr-dictmin), but returns the key as an unsigned `n`-bit _Integer_ `i`.</div> |  |
| **`F487`** | `DICTUMINREF` | `0xF4, 0x87` | _`D n - c i -1 or 0`_ | <div id='instr-dictuminref'>Similar to [`DICTUMIN`](#instr-dictumin), but returns the only reference in the value.</div> |  |
| **`F48A`** | `DICTMAX` | `0xF4, 0x8A` | _`D n - x k -1 or 0`_ | <div id='instr-dictmax'>Computes the maximal key `k` (represented by a _Slice_ with `n` data bits) in dictionary `D`, and returns `k` along with the associated value `x`.</div> |  |
| **`F48B`** | `DICTMAXREF` | `0xF4, 0x8B` | _`D n - c k -1 or 0`_ | <div id='instr-dictmaxref'>Similar to [`DICTMAX`](#instr-dictmax), but returns the only reference in the value.</div> |  |
| **`F48C`** | `DICTIMAX` | `0xF4, 0x8C` | _`D n - x i -1 or 0`_ | <div id='instr-dictimax'>Similar to [`DICTMAX`](#instr-dictmax), but computes the maximal key `i` under the assumption that all keys are big-endian signed `n`-bit integers. Notice that the key and value returned may differ from those computed by [`DICTMAX`](#instr-dictmax) and [`DICTUMAX`](#instr-dictumax).</div> |  |
| **`F48D`** | `DICTIMAXREF` | `0xF4, 0x8D` | _`D n - c i -1 or 0`_ | <div id='instr-dictimaxref'>Similar to [`DICTIMAX`](#instr-dictimax), but returns the only reference in the value.</div> |  |
| **`F48E`** | `DICTUMAX` | `0xF4, 0x8E` | _`D n - x i -1 or 0`_ | <div id='instr-dictumax'>Similar to [`DICTMAX`](#instr-dictmax), but returns the key as an unsigned `n`-bit _Integer_ `i`.</div> |  |
| **`F48F`** | `DICTUMAXREF` | `0xF4, 0x8F` | _`D n - c i -1 or 0`_ | <div id='instr-dictumaxref'>Similar to [`DICTUMAX`](#instr-dictumax), but returns the only reference in the value.</div> |  |
| **`F492`** | `DICTREMMIN` | `0xF4, 0x92` | _`D n - D' x k -1 or D 0`_ | <div id='instr-dictremmin'>Computes the minimal key `k` (represented by a _Slice_ with `n` data bits) in dictionary `D`, removes `k` from the dictionary, and returns `k` along with the associated value `x` and the modified dictionary `D'`.</div> |  |
| **`F493`** | `DICTREMMINREF` | `0xF4, 0x93` | _`D n - D' c k -1 or D 0`_ | <div id='instr-dictremminref'>Similar to [`DICTREMMIN`](#instr-dictremmin), but returns the only reference in the value as a _Cell_ `c`.</div> |  |
| **`F494`** | `DICTIREMMIN` | `0xF4, 0x94` | _`D n - D' x i -1 or D 0`_ | <div id='instr-dictiremmin'>Similar to [`DICTREMMIN`](#instr-dictremmin), but computes the minimal key `i` under the assumption that all keys are big-endian signed `n`-bit integers. Notice that the key and value returned may differ from those computed by [`DICTREMMIN`](#instr-dictremmin) and [`DICTUREMMIN`](#instr-dicturemmin).</div> |  |
| **`F495`** | `DICTIREMMINREF` | `0xF4, 0x95` | _`D n - D' c i -1 or D 0`_ | <div id='instr-dictiremminref'>Similar to [`DICTIREMMIN`](#instr-dictiremmin), but returns the only reference in the value.</div> |  |
| **`F496`** | `DICTUREMMIN` | `0xF4, 0x96` | _`D n - D' x i -1 or D 0`_ | <div id='instr-dicturemmin'>Similar to [`DICTREMMIN`](#instr-dictremmin), but returns the key as an unsigned `n`-bit _Integer_ `i`.</div> |  |
| **`F497`** | `DICTUREMMINREF` | `0xF4, 0x937` | _`D n - D' c i -1 or D 0`_ | <div id='instr-dicturemminref'>Similar to [`DICTUREMMIN`](#instr-dicturemmin), but returns the only reference in the value.</div> |  |
| **`F49A`** | `DICTREMMAX` | `0xF4, 0x9A` | _`D n - D' x k -1 or D 0`_ | <div id='instr-dictremmax'>Computes the maximal key `k` (represented by a _Slice_ with `n` data bits) in dictionary `D`, removes `k` from the dictionary, and returns `k` along with the associated value `x` and the modified dictionary `D'`.</div> |  |
| **`F49B`** | `DICTREMMAXREF` | `0xF4, 0x9B` | _`D n - D' c k -1 or D 0`_ | <div id='instr-dictremmaxref'>Similar to [`DICTREMMAX`](#instr-dictremmax), but returns the only reference in the value as a _Cell_ `c`.</div> |  |
| **`F49C`** | `DICTIREMMAX` | `0xF4, 0x9C` | _`D n - D' x i -1 or D 0`_ | <div id='instr-dictiremmax'>Similar to [`DICTREMMAX`](#instr-dictremmax), but computes the minimal key `i` under the assumption that all keys are big-endian signed `n`-bit integers. Notice that the key and value returned may differ from those computed by [`DICTREMMAX`](#instr-dictremmax) and [`DICTUREMMAX`](#instr-dicturemmax).</div> |  |
| **`F49D`** | `DICTIREMMAXREF` | `0xF4, 0x9D` | _`D n - D' c i -1 or D 0`_ | <div id='instr-dictiremmaxref'>Similar to [`DICTIREMMAX`](#instr-dictiremmax), but returns the only reference in the value.</div> |  |
| **`F49E`** | `DICTUREMMAX` | `0xF4, 0x9E` | _`D n - D' x i -1 or D 0`_ | <div id='instr-dicturemmax'>Similar to [`DICTREMMAX`](#instr-dictremmax), but returns the key as an unsigned `n`-bit _Integer_ `i`.</div> |  |
| **`F49F`** | `DICTUREMMAXREF` | `0xF4, 0x9F` | _`D n - D' c i -1 or D 0`_ | <div id='instr-dicturemmaxref'>Similar to [`DICTUREMMAX`](#instr-dicturemmax), but returns the only reference in the value.</div> |  |
### 10.11 Special Get dictionary and prefix code dictionary operations, and constant dictionaries
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F4A0`** | `DICTIGETJMP` | `0xF4, 0xA0` | _`i D n -`_ | <div id='instr-dictigetjmp'>Similar to [`DICTIGET`](#instr-dictiget), but with `x` [`BLESS`](#instr-bless)ed into a continuation with a subsequent [`JMPX`](#instr-jmpx) to it on success. On failure, does nothing. This is useful for implementing `switch`/`case` constructions.</div> |  |
| **`F4A1`** | `DICTUGETJMP` | `0xF4, 0xA1` | _`i D n -`_ | <div id='instr-dictugetjmp'>Similar to [`DICTIGETJMP`](#instr-dictigetjmp), but performs [`DICTUGET`](#instr-dictuget) instead of [`DICTIGET`](#instr-dictiget).</div> |  |
| **`F4A2`** | `DICTIGETEXEC` | `0xF4, 0xA2` | _`i D n -`_ | <div id='instr-dictigetexec'>Similar to [`DICTIGETJMP`](#instr-dictigetjmp), but with [`EXECUTE`](#instr-execute) instead of [`JMPX`](#instr-jmpx).</div> |  |
| **`F4A3`** | `DICTUGETEXEC` | `0xF4, 0xA3` | _`i D n -`_ | <div id='instr-dictugetexec'>Similar to [`DICTUGETJMP`](#instr-dictugetjmp), but with [`EXECUTE`](#instr-execute) instead of [`JMPX`](#instr-jmpx).</div> |  |
| **`F4A6_n`** | `[ref] [n] DICTPUSHCONST` | `[n = parse_const_u10] 0xF4, 0xA4 ｜ (n >> 8) as u8, n as u8`<br/>`` | _`- D n`_ | <div id='instr-dictpushconst'>Pushes a non-empty constant dictionary `D` (as a `Cell^?`) along with its key length `0 <= n <= 1023`, stored as a part of the instruction. The dictionary itself is created from the first of remaining references of the current continuation. In this way, the complete [`DICTPUSHCONST`](#instr-dictpushconst) instruction can be obtained by first serializing `xF4A4_`, then the non-empty dictionary itself (one `1` bit and a cell reference), and then the unsigned 10-bit integer `n` (as if by a `STU 10` instruction). An empty dictionary can be pushed by a [`NEWDICT`](#instr-newdict) primitive instead.</div> | `34` |
| **`F4A8`** | `PFXDICTGETQ` | `0xF4, 0xA8` | _`s D n - s' x s'' -1 or s 0`_ | <div id='instr-pfxdictgetq'>Looks up the unique prefix of _Slice_ `s` present in the prefix code dictionary represented by `Cell^?` `D` and `0 <= n <= 1023`. If found, the prefix of `s` is returned as `s'`, and the corresponding value (also a _Slice_) as `x`. The remainder of `s` is returned as a _Slice_ `s''`. If no prefix of `s` is a key in prefix code dictionary `D`, returns the unchanged `s` and a zero flag to indicate failure.</div> |  |
| **`F4A9`** | `PFXDICTGET` | `0xF4, 0xA9` | _`s D n - s' x s''`_ | <div id='instr-pfxdictget'>Similar to [`PFXDICTGET`](#instr-pfxdictget), but throws a cell deserialization failure exception on failure.</div> |  |
| **`F4AA`** | `PFXDICTGETJMP` | `0xF4, 0xAA` | _`s D n - s' s'' or s`_ | <div id='instr-pfxdictgetjmp'>Similar to [`PFXDICTGETQ`](#instr-pfxdictgetq), but on success [`BLESS`](#instr-bless)es the value `x` into a _Continuation_ and transfers control to it as if by a [`JMPX`](#instr-jmpx). On failure, returns `s` unchanged and continues execution.</div> |  |
| **`F4AB`** | `PFXDICTGETEXEC` | `0xF4, 0xAB` | _`s D n - s' s''`_ | <div id='instr-pfxdictgetexec'>Similar to [`PFXDICTGETJMP`](#instr-pfxdictgetjmp), but `EXEC`utes the continuation found instead of jumping to it. On failure, throws a cell deserialization exception.</div> |  |
| **`F4AE_n`** | `[ref] [n] PFXDICTCONSTGETJMP`<br/>`[ref] [n] PFXDICTSWITCH` | `[n = parse_const_u10] 0xF4, 0xAC ｜ (n >> 8) as u8, n as u8`<br/>`` | _`s - s' s'' or s`_ | <div id='instr-pfxdictconstgetjmp'>Combines [`[n] DICTPUSHCONST`](#instr-dictpushconst) for `0 <= n <= 1023` with [`PFXDICTGETJMP`](#instr-pfxdictgetjmp).</div> |  |
| **`F4BC`** | `DICTIGETJMPZ` | `0xF4, 0xBC` | _`i D n - i or nothing`_ | <div id='instr-dictigetjmpz'>A variant of [`DICTIGETJMP`](#instr-dictigetjmp) that returns index `i` on failure.</div> |  |
| **`F4BD`** | `DICTUGETJMPZ` | `0xF4, 0xBD` | _`i D n - i or nothing`_ | <div id='instr-dictugetjmpz'>A variant of [`DICTUGETJMP`](#instr-dictugetjmp) that returns index `i` on failure.</div> |  |
| **`F4BE`** | `DICTIGETEXECZ` | `0xF4, 0xBE` | _`i D n - i or nothing`_ | <div id='instr-dictigetexecz'>A variant of [`DICTIGETEXEC`](#instr-dictigetexec) that returns index `i` on failure.</div> |  |
| **`F4BF`** | `DICTUGETEXECZ` | `0xF4, 0xBF` | _`i D n - i or nothing`_ | <div id='instr-dictugetexecz'>A variant of [`DICTUGETEXEC`](#instr-dictugetexec) that returns index `i` on failure.</div> |  |
### 10.12 SubDict dictionary operations
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F4B1`** | `SUBDICTGET` | `0xF4, 0xB1` | _`k l D n - D'`_ | <div id='instr-subdictget'>Constructs a subdictionary consisting of all keys beginning with prefix `k` (represented by a _Slice_, the first `0 <= l <= n <= 1023` data bits of which are used as a key) of length `l` in dictionary `D` of type `HashmapE(n,X)` with `n`-bit keys. On success, returns the new subdictionary of the same type `HashmapE(n,X)` as a _Slice_ `D'`.</div> |  |
| **`F4B2`** | `SUBDICTIGET` | `0xF4, 0xB2` | _`x l D n - D'`_ | <div id='instr-subdictiget'>Variant of [`SUBDICTGET`](#instr-subdictget) with the prefix represented by a signed big-endian `l`-bit _Integer_ `x`, where necessarily `l <= 257`.</div> |  |
| **`F4B3`** | `SUBDICTUGET` | `0xF4, 0xB3` | _`x l D n - D'`_ | <div id='instr-subdictuget'>Variant of [`SUBDICTGET`](#instr-subdictget) with the prefix represented by an unsigned big-endian `l`-bit _Integer_ `x`, where necessarily `l <= 256`.</div> |  |
| **`F4B5`** | `SUBDICTRPGET` | `0xF4, 0xB5` | _`k l D n - D'`_ | <div id='instr-subdictrpget'>Similar to [`SUBDICTGET`](#instr-subdictget), but removes the common prefix `k` from all keys of the new dictionary `D'`, which becomes of type `HashmapE(n-l,X)`.</div> |  |
| **`F4B6`** | `SUBDICTIRPGET` | `0xF4, 0xB6` | _`x l D n - D'`_ | <div id='instr-subdictirpget'>Variant of [`SUBDICTRPGET`](#instr-subdictrpget) with the prefix represented by a signed big-endian `l`-bit _Integer_ `x`, where necessarily `l <= 257`.</div> |  |
| **`F4B7`** | `SUBDICTURPGET` | `0xF4, 0xB7` | _`x l D n - D'`_ | <div id='instr-subdicturpget'>Variant of [`SUBDICTRPGET`](#instr-subdictrpget) with the prefix represented by an unsigned big-endian `l`-bit _Integer_ `x`, where necessarily `l <= 256`.</div> |  |

## 11 Application-specific primitives
### 11.1 Gas-related primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F800`** | `ACCEPT` | `0xF8, 0x00` | _`-`_ | <div id='instr-accept'>Sets current gas limit `g_l` to its maximal allowed value `g_m`, and resets the gas credit `g_c` to zero, decreasing the value of `g_r` by `g_c` in the process.<br/>In other words, the current smart contract agrees to buy some gas to finish the current transaction. This action is required to process external messages, which bring no value (hence no gas) with themselves.</div> | `26` |
| **`F801`** | `SETGASLIMIT` | `0xF8, 0x01` | _`g -`_ | <div id='instr-setgaslimit'>Sets current gas limit `g_l` to the minimum of `g` and `g_m`, and resets the gas credit `g_c` to zero. If the gas consumed so far (including the present instruction) exceeds the resulting value of `g_l`, an (unhandled) out of gas exception is thrown before setting new gas limits. Notice that [`SETGASLIMIT`](#instr-setgaslimit) with an argument `g >= 2^63-1` is equivalent to [`ACCEPT`](#instr-accept).</div> | `26` |
| **`F802`** | `BUYGAS` | `0xF8, 0x02` | _`x -`_ | <div id='instr-buygas'>Computes the amount of gas that can be bought for `x` nanograms, and sets `g_l` accordingly in the same way as [`SETGASLIMIT`](#instr-setgaslimit).</div> | `26` |
| **`F804`** | `GRAMTOGAS` | `0xF8, 0x04` | _`x - g`_ | <div id='instr-gramtogas'>Computes the amount of gas that can be bought for `x` nanograms. If `x` is negative, returns 0. If `g` exceeds 2^63 - 1, it is replaced with this value.</div> |  |
| **`F805`** | `GASTOGRAM` | `0xF8, 0x05` | _`g - x`_ | <div id='instr-gastogram'>Computes the price of `g` gas in nanograms.</div> |  |
| **`F80F`** | `COMMIT` | `0xF8, 0x0F` | _`-`_ | <div id='instr-commit'>Commits the current state of registers `c4` (“persistent data'') and `c5` (“actions'') so that the current execution is considered “successful'' with the saved values even if an exception is thrown later.</div> | `26` |
### 11.2 Pseudo-random number generator primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F810`** | `RANDU256` | `0xF8, 0x10` | _`- x`_ | <div id='instr-randu256'>Generates a new pseudo-random unsigned 256-bit _Integer_ `x`. The algorithm is as follows: if `r` is the old value of the random seed, considered as a 32-byte array (by constructing the big-endian representation of an unsigned 256-bit integer), then its `sha512(r)` is computed; the first 32 bytes of this hash are stored as the new value `r'` of the random seed, and the remaining 32 bytes are returned as the next random value `x`.</div> | `26+\|c7\|+\|c1_1\|` |
| **`F811`** | `RAND` | `0xF8, 0x11` | _`y - z`_ | <div id='instr-rand'>Generates a new pseudo-random integer `z` in the range `0...y-1` (or `y...-1`, if `y<0`). More precisely, an unsigned random value `x` is generated as in `RAND256U`; then `z:=floor(x*y/2^256)` is computed.<br/>Equivalent to [`RANDU256`](#instr-randu256) [`256 MULRSHIFT`](#instr-mulrshift-var).</div> | `26+\|c7\|+\|c1_1\|` |
| **`F814`** | `SETRAND` | `0xF8, 0x14` | _`x -`_ | <div id='instr-setrand'>Sets the random seed to unsigned 256-bit _Integer_ `x`.</div> | `26+\|c7\|+\|c1_1\|` |
| **`F815`** | `ADDRAND`<br/>`RANDOMIZE` | `0xF8, 0x15` | _`x -`_ | <div id='instr-addrand'>Mixes unsigned 256-bit _Integer_ `x` into the random seed `r` by setting the random seed to `Sha` of the concatenation of two 32-byte strings: the first with the big-endian representation of the old seed `r`, and the second with the big-endian representation of `x`.</div> | `26` |
### 11.3 Configuration primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F82i`** | `[i] GETPARAM` | `[c = parse_const_u4] 0xF8, 0x20 ｜ c`<br/>`` | _`- x`_ | <div id='instr-getparam'>Returns the `i`-th parameter from the _Tuple_ provided at `c7` for `0 <= i <= 15`. Equivalent to [`c7 PUSHCTR`](#instr-pushctr) [`FIRST`](#instr-first) [`[i] INDEX`](#instr-index).<br/>If one of these internal operations fails, throws an appropriate type checking or range checking exception.</div> | `26` |
| **`F823`** | `NOW` | `0xF8, 0x23` | _`- x`_ | <div id='instr-now'>Returns the current Unix time as an _Integer_. If it is impossible to recover the requested value starting from `c7`, throws a type checking or range checking exception as appropriate.<br/>Equivalent to [`3 GETPARAM`](#instr-getparam).</div> | `26` |
| **`F824`** | `BLOCKLT` | `0xF8, 0x24` | _`- x`_ | <div id='instr-blocklt'>Returns the starting logical time of the current block.<br/>Equivalent to [`4 GETPARAM`](#instr-getparam).</div> | `26` |
| **`F825`** | `LTIME` | `0xF8, 0x25` | _`- x`_ | <div id='instr-ltime'>Returns the logical time of the current transaction.<br/>Equivalent to [`5 GETPARAM`](#instr-getparam).</div> | `26` |
| **`F826`** | `RANDSEED` | `0xF8, 0x26` | _`- x`_ | <div id='instr-randseed'>Returns the current random seed as an unsigned 256-bit _Integer_.<br/>Equivalent to [`6 GETPARAM`](#instr-getparam).</div> | `26` |
| **`F827`** | `BALANCE` | `0xF8, 0x27` | _`- t`_ | <div id='instr-balance'>Returns the remaining balance of the smart contract as a _Tuple_ consisting of an _Integer_ (the remaining Gram balance in nanograms) and a _Maybe Cell_ (a dictionary with 32-bit keys representing the balance of “extra currencies'').<br/>Equivalent to [`7 GETPARAM`](#instr-getparam).<br/>Note that `RAW` primitives such as [`SENDRAWMSG`](#instr-sendrawmsg) do not update this field.</div> | `26` |
| **`F828`** | `MYADDR` | `0xF8, 0x28` | _`- s`_ | <div id='instr-myaddr'>Returns the internal address of the current smart contract as a _Slice_ with a `MsgAddressInt`. If necessary, it can be parsed further using primitives such as [`PARSEMSGADDR`](#instr-parsemsgaddr) or [`REWRITESTDADDR`](#instr-rewritestdaddr).<br/>Equivalent to [`8 GETPARAM`](#instr-getparam).</div> | `26` |
| **`F829`** | `CONFIGROOT` | `0xF8, 0x29` | _`- D`_ | <div id='instr-configroot'>Returns the _Maybe Cell_ `D` with the current global configuration dictionary. Equivalent to `9 GETPARAM `.</div> | `26` |
| **`F82A`** | `MYCODE` | `0xF8, 0x2A` | _`- s`_ | <div id='instr-mycode'>Returns the Cell with the current code of the smart contract. Smart contract has own code, the cell representation of which can be obtained by this instruction.<br/>Equivalent to [`10 GETPARAM`](#instr-getparam)</div> | `26` |
| **`F82B`** | `INITCODEHASH` | `0xF8, 0x2B` | _`- x`_ | <div id='instr-initcodehash'>Returns the integer represented 256 bit hash of code cell with which the contract was deployed.<br/>Equivalent to [`11 GETPARAM`](#instr-getparam).</div> | `26` |
| **`F82C`** | `STORAGEFEE` | `0xF8, 0x2C` | _`- x`_ | <div id='instr-storagefee'>Returns the `Integer` with collected storage fee from account in this transaction. <br/>Equivalent to [`12 GETPARAM`](#instr-getparam).</div> | `26` |
| **`F82D`** | `SEQNO` | `0xF8, 0x2D` | _`- x`_ | <div id='instr-seqno'>returns the `Integer` with current sequence number of collating block. <br/>Equivalent to [`13 GETPARAM`](#instr-getparam).</div> | `26` |
| **`F830`** | `CONFIGDICT` | `0xF8, 0x30` | _`- D 32`_ | <div id='instr-configdict'>Returns the global configuration dictionary along with its key length (32).<br/>Equivalent to [`CONFIGROOT`](#instr-configroot) [`32 PUSHINT`](#instr-pushint-4).</div> | `26` |
| **`F832`** | `CONFIGPARAM` | `0xF8, 0x32` | _`i - c -1 or 0`_ | <div id='instr-configparam'>Returns the value of the global configuration parameter with integer index `i` as a _Cell_ `c`, and a flag to indicate success.<br/>Equivalent to [`CONFIGDICT`](#instr-configdict) [`DICTIGETREF`](#instr-dictigetref).</div> |  |
| **`F833`** | `CONFIGOPTPARAM` | `0xF8, 0x33` | _`i - c^?`_ | <div id='instr-configoptparam'>Returns the value of the global configuration parameter with integer index `i` as a _Maybe Cell_ `c^?`.<br/>Equivalent to [`CONFIGDICT`](#instr-configdict) [`DICTIGETOPTREF`](#instr-dictigetoptref).</div> |  |
### 11.4 Global variable primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F840`** | `GETGLOBVAR` | `0xF8, 0x40` | _`k - x`_ | <div id='instr-getglobvar'>Returns the `k`-th global variable for `0 <= k < 255`.<br/>Equivalent to [`c7 PUSHCTR`](#instr-pushctr) [`SWAP`](#instr-swap) [`INDEXVARQ`](#instr-indexvarq).</div> | `26` |
| **`F85_k`** | `[k] GETGLOB` | `[k = parse_const_u5] 0xF8, 0x40 ｜ k`<br/>`` | _`- x`_ | <div id='instr-getglob'>Returns the `k`-th global variable for `1 <= k <= 31`.<br/>Equivalent to [`c7 PUSHCTR`](#instr-pushctr) [`[k] INDEXQ`](#instr-indexq).</div> | `26` |
| **`F860`** | `SETGLOBVAR` | `0xF8, 0x60` | _`x k -`_ | <div id='instr-setglobvar'>Assigns `x` to the `k`-th global variable for `0 <= k < 255`.<br/>Equivalent to [`c7 PUSHCTR`](#instr-pushctr) [`ROTREV`](#instr-rotrev) [`SETINDEXVARQ`](#instr-setindexvarq) [`c7 POPCTR`](#instr-popctr).</div> | `26+\|c7’\|` |
| **`F87_k`** | `[k] SETGLOB` | `[k = parse_const_u5] 0xF8, 0x60 ｜ k`<br/>`` | _`x -`_ | <div id='instr-setglob'>Assigns `x` to the `k`-th global variable for `1 <= k <= 31`.<br/>Equivalent to [`c7 PUSHCTR`](#instr-pushctr) [`SWAP`](#instr-swap) [`k SETINDEXQ`](#instr-setindexq) [`c7 POPCTR`](#instr-popctr).</div> | `26+\|c7’\|` |
### 11.5 Hashing and cryptography primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F900`** | `HASHCU` | `0xF9, 0x00` | _`c - x`_ | <div id='instr-hashcu'>Computes the representation hash of a _Cell_ `c` and returns it as a 256-bit unsigned integer `x`. Useful for signing and checking signatures of arbitrary entities represented by a tree of cells.</div> | `26` |
| **`F901`** | `HASHSU` | `0xF9, 0x01` | _`s - x`_ | <div id='instr-hashsu'>Computes the hash of a _Slice_ `s` and returns it as a 256-bit unsigned integer `x`. The result is the same as if an ordinary cell containing only data and references from `s` had been created and its hash computed by [`HASHCU`](#instr-hashcu).</div> | `526` |
| **`F902`** | `SHA256U` | `0xF9, 0x02` | _`s - x`_ | <div id='instr-sha256u'>Computes `Sha` of the data bits of _Slice_ `s`. If the bit length of `s` is not divisible by eight, throws a cell underflow exception. The hash value is returned as a 256-bit unsigned integer `x`.</div> | `26` |
| **`F910`** | `CHKSIGNU` | `0xF9, 0x10` | _`h s k - ?`_ | <div id='instr-chksignu'>Checks the Ed25519-signature `s` of a hash `h` (a 256-bit unsigned integer, usually computed as the hash of some data) using public key `k` (also represented by a 256-bit unsigned integer).<br/>The signature `s` must be a _Slice_ containing at least 512 data bits; only the first 512 bits are used. The result is `-1` if the signature is valid, `0` otherwise.<br/>Notice that [`CHKSIGNU`](#instr-chksignu) is equivalent to [`ROT`](#instr-rot) [`NEWC`](#instr-newc) [`256 STU`](#instr-stu) [`ENDC`](#instr-endc) [`ROTREV`](#instr-rotrev) [`CHKSIGNS`](#instr-chksigns), i.e., to [`CHKSIGNS`](#instr-chksigns) with the first argument `d` set to 256-bit _Slice_ containing `h`. Therefore, if `h` is computed as the hash of some data, these data are hashed _twice_, the second hashing occurring inside [`CHKSIGNS`](#instr-chksigns).</div> | `26` |
| **`F911`** | `CHKSIGNS` | `0xF9, 0x11` | _`d s k - ?`_ | <div id='instr-chksigns'>Checks whether `s` is a valid Ed25519-signature of the data portion of _Slice_ `d` using public key `k`, similarly to [`CHKSIGNU`](#instr-chksignu). If the bit length of _Slice_ `d` is not divisible by eight, throws a cell underflow exception. The verification of Ed25519 signatures is the standard one, with `Sha` used to reduce `d` to the 256-bit number that is actually signed.</div> | `26` |
### 11.6 Miscellaneous primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`F940`** | `CDATASIZEQ` | `0xF9, 0x40` | _`c n - x y z -1 or 0`_ | <div id='instr-cdatasizeq'>Recursively computes the count of distinct cells `x`, data bits `y`, and cell references `z` in the dag rooted at _Cell_ `c`, effectively returning the total storage used by this dag taking into account the identification of equal cells. The values of `x`, `y`, and `z` are computed by a depth-first traversal of this dag, with a hash table of visited cell hashes used to prevent visits of already-visited cells. The total count of visited cells `x` cannot exceed non-negative _Integer_ `n`; otherwise the computation is aborted before visiting the `(n+1)`-st cell and a zero is returned to indicate failure. If `c` is _Null_, returns `x=y=z=0`.</div> |  |
| **`F941`** | `CDATASIZE` | `0xF9, 0x41` | _`c n - x y z`_ | <div id='instr-cdatasize'>A non-quiet version of [`CDATASIZEQ`](#instr-cdatasizeq) that throws a cell overflow exception (8) on failure.</div> |  |
| **`F942`** | `SDATASIZEQ` | `0xF9, 0x42` | _`s n - x y z -1 or 0`_ | <div id='instr-sdatasizeq'>Similar to [`CDATASIZEQ`](#instr-cdatasizeq), but accepting a _Slice_ `s` instead of a _Cell_. The returned value of `x` does not take into account the cell that contains the slice `s` itself; however, the data bits and the cell references of `s` are accounted for in `y` and `z`.</div> |  |
| **`F943`** | `SDATASIZE` | `0xF9, 0x43` | _`s n - x y z`_ | <div id='instr-sdatasize'>A non-quiet version of [`SDATASIZEQ`](#instr-sdatasizeq) that throws a cell overflow exception (8) on failure.</div> |  |
| **`F944`** | `FIND_BY_INIT_CODE_HASH` | `0xF9, 0x44` | _`s - t`_ | <div id='instr-find-by-init-code-hash'>Returns the list of accounts with initial code hash specified in 256 bit of _Slice_ `s`.</div> |  |
| **`F945`** | `FIND_BY_CODE_HASH` | `0xF9, 0x45` | _`s - t`_ | <div id='instr-find-by-code-hash'>Returns the list of accounts with code hash specified in 256 bit of _Slice_ `s`.</div> |  |
| **`F946`** | `FIND_BY_DATA_HASH` | `0xF9, 0x46` | _`s - t`_ | <div id='instr-find-by-data-hash'>Returns the list of accounts with data hash specified in 256 bit of _Slice_ `s`.</div> |  |
| **`F950`** | `TRYELECT` |  | _`D - c c' D' x x'`_ | <div id='instr-tryelect'>Executes try_elect method for accounts got by config param 30. D is the input Hashmap with credits, c - contains serialized validator set, c' is the HashmapE with frozen stakes, D' is the HashmapE with credits, x is the integer with total stake, x' is the integer with total weight.</div> |  |
### 11.7 Currency manipulation primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`FA00`** | `LDGRAMS`<br/>`LDVARUINT16` | `0xFA, 0x00` | _`s - x s'`_ | <div id='instr-ldgrams'>Loads (deserializes) a `Gram` or `VarUInteger 16` amount from _Slice_ `s`, and returns the amount as _Integer_ `x` along with the remainder `s'` of `s`. The expected serialization of `x` consists of a 4-bit unsigned big-endian integer `l`, followed by an `8l`-bit unsigned big-endian representation of `x`.<br/>The net effect is approximately equivalent to [`4 LDU`](#instr-ldu) [`SWAP`](#instr-swap) [`3 LSHIFT#`](#instr-lshift) [`LDUX`](#instr-ldux).</div> | `26` |
| **`FA01`** | `LDVARINT16` | `0xFA, 0x01` | _`s - x s'`_ | <div id='instr-ldvarint16'>Similar to [`LDVARUINT16`](#instr-ldgrams), but loads a _signed_ _Integer_ `x`.<br/>Approximately equivalent to [`4 LDU`](#instr-ldu) [`SWAP`](#instr-swap) [`3 LSHIFT#`](#instr-lshift) [`LDIX`](#instr-ldix).</div> | `26` |
| **`FA02`** | `STGRAMS`<br/>`STVARUINT16` | `0xFA, 0x02` | _`b x - b'`_ | <div id='instr-stgrams'>Stores (serializes) an _Integer_ `x` in the range `0...2^120-1` into _Builder_ `b`, and returns the resulting _Builder_ `b'`. The serialization of `x` consists of a 4-bit unsigned big-endian integer `l`, which is the smallest integer `l>=0`, such that `x<2^(8l)`, followed by an `8l`-bit unsigned big-endian representation of `x`. If `x` does not belong to the supported range, a range check exception is thrown.</div> | `26` |
| **`FA03`** | `STVARINT16` | `0xFA, 0x03` | _`b x - b'`_ | <div id='instr-stvarint16'>Similar to [`STVARUINT16`](#instr-stgrams), but serializes a _signed_ _Integer_ `x` in the range `-2^119...2^119-1`.</div> | `26` |
| **`FA04`** | `LDVARUINT32` | `0xFA, 0x04` | _`s - x s'`_ | <div id='instr-ldvaruint32'>Loads (deserializes) a `VarUInteger 32` from _CellSlice_`s`, and returns the deserialized value as an _Integer_ 0 <= x<2^248. The expected serialization of x consists of a 5-bit unsigned big-endian integer `l`, followed by an 8l-bit unsigned big-endian representation of `x`. The net effect is approximately equivalent to `LDU 5`; [`SWAP`](#instr-swap); `SHIFT 3`; [`LDUX`](#instr-ldux).</div> |  |
| **`FA05`** | `LDVARINT32` | `0xFA, 0x05` | _`s - x s'`_ | <div id='instr-ldvarint32'>Deserializes a `VarInteger 32` from _CellSlice_`s`, and returns the deserialized value as an _Integer_-2^247 <= x<2^247.</div> |  |
| **`FA06`** | `STVARUINT32` | `0xFA, 0x06` | _`b x - b'`_ | <div id='instr-stvaruint32'>Serializes an _Integer_  0<=x<2^248 as a `VarUInteger 32`.</div> | `26` |
| **`FA07`** | `STVARINT32` | `0xFA, 0x07` | _`b x - b'`_ | <div id='instr-stvarint32'>serializes an _Integer_ -2^247<=x<2^{247} as a `VarInteger 32`.</div> | `26` |
### 11.8 Message and address manipulation primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`FA40`** | `LDMSGADDR` | `0xFA, 0x40` | _`s - s' s''`_ | <div id='instr-ldmsgaddr'>Loads from _Slice_ `s` the only prefix that is a valid `MsgAddress`, and returns both this prefix `s'` and the remainder `s''` of `s` as slices.</div> | `26` |
| **`FA41`** | `LDMSGADDRQ` | `0xFA, 0x41` | _`s - s' s'' -1 or s 0`_ | <div id='instr-ldmsgaddrq'>A quiet version of [`LDMSGADDR`](#instr-ldmsgaddr): on success, pushes an extra `-1`; on failure, pushes the original `s` and a zero.</div> | `26` |
| **`FA42`** | `PARSEMSGADDR` | `0xFA, 0x42` | _`s - t`_ | <div id='instr-parsemsgaddr'>Decomposes _Slice_ `s` containing a valid `MsgAddress` into a _Tuple_ `t` with separate fields of this `MsgAddress`. If `s` is not a valid `MsgAddress`, a cell deserialization exception is thrown.</div> | `26` |
| **`FA43`** | `PARSEMSGADDRQ` | `0xFA, 0x43` | _`s - t -1 or 0`_ | <div id='instr-parsemsgaddrq'>A quiet version of [`PARSEMSGADDR`](#instr-parsemsgaddr): returns a zero on error instead of throwing an exception.</div> | `26` |
| **`FA44`** | `REWRITESTDADDR` | `0xFA, 0x44` | _`s - x y`_ | <div id='instr-rewritestdaddr'>Parses _Slice_ `s` containing a valid `MsgAddressInt` (usually a `msg_addr_std`), applies rewriting from the `anycast` (if present) to the same-length prefix of the address, and returns both the workchain `x` and the 256-bit address `y` as integers. If the address is not 256-bit, or if `s` is not a valid serialization of `MsgAddressInt`, throws a cell deserialization exception.</div> | `26` |
| **`FA45`** | `REWRITESTDADDRQ` | `0xFA, 0x45` | _`s - x y -1 or 0`_ | <div id='instr-rewritestdaddrq'>A quiet version of primitive [`REWRITESTDADDR`](#instr-rewritestdaddr).</div> | `26` |
| **`FA46`** | `REWRITEVARADDR` | `0xFA, 0x46` | _`s - x s'`_ | <div id='instr-rewritevaraddr'>A variant of [`REWRITESTDADDR`](#instr-rewritestdaddr) that returns the (rewritten) address as a _Slice_ `s`, even if it is not exactly 256 bit long (represented by a `msg_addr_var`).</div> | `26` |
| **`FA47`** | `REWRITEVARADDRQ` | `0xFA, 0x47` | _`s - x s' -1 or 0`_ | <div id='instr-rewritevaraddrq'>A quiet version of primitive [`REWRITEVARADDR`](#instr-rewritevaraddr).</div> | `26` |
### 11.9 Outbound message and output action primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`FB00`** | `SENDRAWMSG` | `0xFB, 0x00` | _`c x -`_ | <div id='instr-sendrawmsg'>Sends a raw message contained in _Cell `c`_, which should contain a correctly serialized object `Message X`, with the only exception that the source address is allowed to have dummy value `addr_none` (to be automatically replaced with the current smart-contract address), and `ihr_fee`, `fwd_fee`, `created_lt` and `created_at` fields can have arbitrary values (to be rewritten with correct values during the action phase of the current transaction). Integer parameter `x` contains the flags. Currently `x=0` is used for ordinary messages; `x=128` is used for messages that are to carry all the remaining balance of the current smart contract (instead of the value originally indicated in the message); `x=64` is used for messages that carry all the remaining value of the inbound message in addition to the value initially indicated in the new message (if bit 0 is not set, the gas fees are deducted from this amount); `x'=x+1` means that the sender wants to pay transfer fees separately; `x'=x+2` means that any errors arising while processing this message during the action phase should be ignored. Finally, `x'=x+32` means that the current account must be destroyed if its resulting balance is zero. This flag is usually employed together with `+128`.</div> | `526` |
| **`FB02`** | `RAWRESERVE` | `0xFB, 0x02` | _`x y -`_ | <div id='instr-rawreserve'>Creates an output action which would reserve exactly `x` nanograms (if `y=0`), at most `x` nanograms (if `y=2`), or all but `x` nanograms (if `y=1` or `y=3`), from the remaining balance of the account. It is roughly equivalent to creating an outbound message carrying `x` nanograms (or `b-x` nanograms, where `b` is the remaining balance) to oneself, so that the subsequent output actions would not be able to spend more money than the remainder. Bit `+2` in `y` means that the external action does not fail if the specified amount cannot be reserved; instead, all remaining balance is reserved. Bit `+8` in `y` means `x:=-x` before performing any further actions. Bit `+4` in `y` means that `x` is increased by the original balance of the current account (before the compute phase), including all extra currencies, before performing any other checks and actions. Currently `x` must be a non-negative integer, and `y` must be in the range `0...15`.</div> | `526` |
| **`FB03`** | `RAWRESERVEX` | `0xFB, 0x03` | _`x D y -`_ | <div id='instr-rawreservex'>Similar to [`RAWRESERVE`](#instr-rawreserve), but also accepts a dictionary `D` (represented by a _Cell_ or _Null_) with extra currencies. In this way currencies other than Grams can be reserved.</div> | `526` |
| **`FB04`** | `SETCODE` | `0xFB, 0x04` | _`c -`_ | <div id='instr-setcode'>Creates an output action that would change this smart contract code to that given by _Cell_ `c`. Notice that this change will take effect only after the successful termination of the current run of the smart contract.</div> | `526` |
| **`FB06`** | `SETLIBCODE` | `0xFB, 0x06` | _`c x -`_ | <div id='instr-setlibcode'>Creates an output action that would modify the collection of this smart contract libraries by adding or removing library with code given in _Cell_ `c`. If `x=0`, the library is actually removed if it was previously present in the collection (if not, this action does nothing). If `x=1`, the library is added as a private library, and if `x=2`, the library is added as a public library (and becomes available to all smart contracts if the current smart contract resides in the masterchain); if the library was present in the collection before, its public/private status is changed according to `x`. Values of `x` other than `0...2` are invalid.</div> | `526` |
| **`FB07`** | `CHANGELIB` | `0xFB, 0x07` | _`h x -`_ | <div id='instr-changelib'>Creates an output action similarly to [`SETLIBCODE`](#instr-setlibcode), but instead of the library code accepts its hash as an unsigned 256-bit integer `h`. If `x!=0` and the library with hash `h` is absent from the library collection of this smart contract, this output action will fail.</div> | `526` |
| **`FB0A`** | `COPYLEFT` | `0xFB, 0x0A` | _`s x -`_ | <div id='instr-copyleft'>Where `s` - is slice of 256-bit AccountId and `x` - is type of license. Add license payment to code creator. The license payment calculates from compute _phase_fees taking the appropriate percentage. If summary payment is less than license _payment_threshold, then value saves in unsplit_shard_state of masterblock. If summary payment in unsplit_shard_state is more than license_payment_threshold then node sends internal message to account address in masterchain, specified in slice s. The instruction return an error on contracts in masterchain.</div> | `526` |

## 12 Debug primitives
Opcodes beginning with `FE` are reserved for the debug primitives. These primitives have known fixed operation length, and behave as (multibyte) `NOP` operations.

However, when invoked in a TVM instance with debug mode enabled, these primitives can produce specific output into the text debug log of the TVM instance, never affecting the TVM state.

`DEBUG` and `DEBUGSTR` are the two debug primitives, they cover all opcodes that start with `FE`.
Other primitives listed here have opcodes from the same set. When debug is enabled, they have their specified effects. When debug is disabled, they behave as `NOP`.

| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`FEnn`** | `{nn} DEBUG` | `[z = parse_const_u8_240] 0xFE, z` | _`-`_ | <div id='instr-debug'>`0 <= nn < 240`</div> | `26` |
| **`FEFnssss`** | `{string} DEBUGSTR`<br/>`{string} {x} DEBUGSTRI` | `[z = parse_const_u8_setcp] 0xFF, z` | _`-`_ | <div id='instr-debugstr'>`0 <= n < 16`. Length of `ssss` is `n+1` bytes.<br/>`{string}` is a [string literal](https://github.com/Piterden/TON-docs/blob/master/Fift.%20A%20Brief%20Introduction.md#user-content-29-string-literals).<br/>[`DEBUGSTR`](#instr-debugstr): `ssss` is the given string.<br/>[`DEBUGSTRI`](#instr-debugstr): `ssss` is one-byte integer `0 <= x <= 255` followed by the given string.</div> | `26` |
| **`FE00`** | `DUMPSTK` | `0xFE, 0x00` | _`-`_ | <div id='instr-dumpstk'>Dumps the stack (at most the top 255 values) and shows the total stack depth.</div> | `26` |
| **`FE0n`** | `{n} DUMPSTKTOP` | `[z = parse_const_u4_1_14] 0xFE, z` | _`-`_ | <div id='instr-dumpstktop'>1<=n<15, dumps the top `n` values from the stack, starting from the deepest of them. If there are d<n values available, dumps only `d` values.</div> | `26` |
| **`FE10`** | `HEXDUMP` | `0xFE, 0x10` | _`-`_ | <div id='instr-hexdump'>Dumps s0 in hexadecimal form, be it a _Slice_ or an _Integer_.</div> | `26` |
| **`FE11`** | `HEXPRINT` | `0xFE, 0x11` | _`-`_ | <div id='instr-hexprint'>Similar to [`HEXDUMP`](#instr-hexdump), except the hexadecimal representation of s0 is not immediately output, but rather concatenated to an output text buffer.</div> | `26` |
| **`FE12`** | `BINDUMP` | `0xFE, 0x12` | _`-`_ | <div id='instr-bindump'>Dumps s0 in binary form, similarly to [`HEXDUMP`](#instr-hexdump).</div> | `26` |
| **`FE13`** | `BINPRINT` | `0xFE, 0x13` | _`-`_ | <div id='instr-binprint'>Outputs the binary representation of `s0` to a text buffer.</div> | `26` |
| **`FE14`** | `STRDUMP` | `0xFE, 0x14` | _`-`_ | <div id='instr-strdump'>Dumps the _Slice_ at `s0` as an UTF-8 string.</div> | `26` |
| **`FE15`** | `STRPRINT` | `0xFE, 0x15` | _`-`_ | <div id='instr-strprint'>Similar to [`STRDUMP`](#instr-strdump), but outputs the string into a text buffer (without carriage return).</div> | `26` |
| **`FE1E`** | `DEBUGOFF` | `0xFE, 0x1E` | _`-`_ | <div id='instr-debugoff'>Disables all debug output until it is re-enabled by a [`DEBUGON`](#instr-debugon). More precisely, this primitive increases an internal counter, which disables all debug operations (except [`DEBUGOFF`](#instr-debugoff) and [`DEBUGON`](#instr-debugon)) when strictly positive.</div> | `26` |
| **`FE1F`** | `DEBUGON` | `0xFE, 0x1F` | _`-`_ | <div id='instr-debugon'>Enables debug output (in a debug version of TVM).</div> | `26` |
| **`FE2i`** | `s[i] DUMP` | `[z = parse_const_u4_14] 0xFE, 0x20 ｜ z`<br/>`` | _`-`_ | <div id='instr-dump'>Dumps `s[i]`.</div> | `26` |
| **`FE3i`** | `s[n] PRINT` | `[z = parse_const_u4_14] 0xFE, 0x30 ｜ z`<br/>`` | _`-`_ | <div id='instr-print'>0<=n<15, concatenates the text representation of s(n) (without any leading or trailing spaces or carriage returns) to a text buffer which will be output before the output of any other debug operation.</div> | `26` |
| **`FEFnssss`** | `[ssss]DUMPTOSFMT` |  | _`-`_ | <div id='instr-dumptosfmt'>Dumps s0 formatted according to the (n+1)-byte string `ssss`. This string might contain (a prefix of) the name of a TL-B type supported by the debugger. If the string begins with a zero byte, simply outputs it (without the first byte) into the debug log. If the string begins with a byte equal to one, concatenates it to a buffer, which will be output before the output of any other debug operation (effectively outputs a string without a carriage return).</div> | `26` |
| **`FEFn00ssss`** | `[ssss]LOGSTR` |  | _`-`_ | <div id='instr-logstr'>String `ssss` is `n` bytes long.</div> | `26` |
| **`FEF000`** | `LOGFLUSH` | `0xFE, 0xF0, 0x00` | _`-`_ | <div id='instr-logflush'>Flushes all pending debug output from the buffer into the debug log.</div> | `26` |
| **`FEFn01ssss`** | `[ssss]PRINTSTR` |  | _`-`_ | <div id='instr-printstr'>String `ssss` is `n` bytes long.</div> | `26` |

## 13 Codepage primitives
| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`FFnn`** | `[nn] SETCP` | `[z = parse_const_u8_setcp] 0xFF, z`<br/>`` | _`-`_ | <div id='instr-setcp'>Selects TVM codepage `0 <= nn < 240`. If the codepage is not supported, throws an invalid opcode exception.</div> | `26` |
| **`FF00`** | `SETCP0` | `0xFF, 0x00` | _`-`_ | <div id='instr-setcp0'>Selects TVM (test) codepage zero as described in this document.</div> | `26` |
| **`FFFz`** | `[z-16] SETCP` |  | _`-`_ | <div id='instr-setcp-special'>Selects TVM codepage `z-16` for `1 <= z <= 15`. Negative codepages `-13...-1` are reserved for restricted versions of TVM needed to validate runs of TVM in other codepages. Negative codepage `-14` is reserved for experimental codepages, not necessarily compatible between different TVM implementations, and should be disabled in the production versions of TVM.</div> | `26` |
| **`FFF0`** | `SETCPX` | `0xFF, 0xF0` | _`c -`_ | <div id='instr-setcpx'>Selects codepage `c` with `-2^15 <= c < 2^15` passed in the top of the stack.</div> | `26` |

## 14 Gosh Network
This part was implemented in the Gosh network

| xxxxxxx<br/>Opcode | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Fift syntax | xxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>TVM syntax | xxxxxxxxxxxxxxxxx<br/>Stack | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br/>Description | xxxx<br/>Gas |
|:-|:-|:-|:-|:-|:-|
| **`C714`** | `DIFF` | `0xC7, 0x14` | _`c c - c`_ | <div id='instr-diff'>Calculates diff between first and second parameters and returns it as cell.</div> | `26` |
| **`C715`** | `DIFF_PATCH` | `0xC7, 0x15` | _`c c - c`_ | <div id='instr-diff-patch'>Takes the first parameter as document, the second parameter as patch, received on DIFF command, applies patch and saves result document to cell.</div> | `26` |
| **`C716`** | `ZIP` | `0xC7, 0x16` | _`c - c`_ | <div id='instr-zip'>Zip string to cell</div> | `26` |
| **`C717`** | `UNZIP` | `0xC7, 0x17` | _`c - c`_ | <div id='instr-unzip'>Unzip cell to string</div> | `26` |
| **`C718`** | `DIFF_ZIP` | `0xC7, 0x18` | _`c c - c`_ | <div id='instr-diff-zip'>like [`DIFF`](#instr-diff) but unzip parameters before operation and zip to cell after operation.</div> | `26` |
| **`C719`** | `DIFF_PATCH_ZIP` | `0xC7, 0x19` | _`c c - c`_ | <div id='instr-diff-patch-zip'>like `DIFF_PATCH` but unzip parameters before operation and zip to cell after operation.</div> | `26` |
| **`C720`** | `DIFF_PATCH_Q` | `0xC7, 0x20` | _`c c - c`_ | <div id='instr-diff-patch-q'>quiet version of `DIFF_PATCH`</div> | `26` |
| **`C721`** | `DIFF_PATCH_ZIPQ` | `0xC7, 0x21` | _`c c - c`_ | <div id='instr-diff-patch-zipq'>quiet version of `DIFF_PATCH_ZIP`</div> | `26` |
| **`C722`** | `DIFF_PATCH_BINARY` | `0xC7, 0x22` | _`c c - c`_ | <div id='instr-diff-patch-binary'>like `DIFF_PATCH` but takes and returns binary arrays instead of string.</div> | `26` |
| **`C723`** | `DIFF_PATCH_BINARY_ZIP` | `0xC7, 0x23` | _`c c - c`_ | <div id='instr-diff-patch-binary-zip'>like `DIFF_PATCH_ZIP` but takes and returns binary arrays instead of string.</div> | `26` |
| **`C724`** | `DIFF_PATCH_BINARYQ` | `0xC7, 0x24` | _`c c - c`_ | <div id='instr-diff-patch-binaryq'>like `DIFF_PATCHQ` but takes and returns binary arrays instead of string.</div> | `26` |
| **`C725`** | `DIFF_PATCH_BINARY_ZIPQ` | `0xC7, 0x25` | _`c c - c`_ | <div id='instr-diff-patch-binary-zipq'>like `DIFF_PATCH_ZIPQ` but takes and returns binary arrays instead of string.</div> | `26` |
