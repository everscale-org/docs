---
title: ABI Specification
---

# Smart Contracts ABI v2.3 Specification

ABI specifies message bodies layout for client to contract and contract to contract interaction.

## Introduction

Each type has max bit and max ref size:

- `intN/uintN` — N bits, 0 refs
- `varint16/varuint16` — 124 bits, 0 refs
- `varint32/varuint32` — 253 bits, 0 refs
- `address` — 591 bits, 0 refs
- `bool` — 1 bit, 0 refs
- `bytes/cell/string` — 0 bit, 1 ref
- `array` — 33 bit, 1 ref
- `mapping` — 1 bit, 1 ref
- `optional(T)` — (1 bit, 1 ref) if `optional` is [large](#optionalinnertype). Otherwise, (`1 bit + maxBitQty(T), maxRefQty(T)`)

`structure (aka tuple)` type is considered as a sequence of its types when we encode the function parameters. That's why `tuple` type doesn't have max bit or max ref size. Nested `tuple`'s also are considered as a sequence of its types. For example:

```solidity
struct A {
  uint8 a;
  uint16 b;
}

struct B {
  uint24 d;
  A a;
  uint32 d;
}
```

structure `B` is considered as a sequence of `uint24`, `uint8`, `uint16`, `uint32` types.

## Encoding the message

`Message X` contains the field `body`. If encoded `body` fits in the cell, then the body is inserted in the cell (`Either X`). Otherwise, `body` is located in the reference (`Either ^X`).

## Encoding the body of the message

The body of the message is a tree of cells that contains the function ID and encoded function arguments. External messages body is prefixed with function header parameters.

### Encoding header for external messages

Function header has up to 3 optional parameters and mandatory signature. Function ID and function parameters are put after header parameters.

Maximum header size is calculated as follows (no references used).

```js
maxHeader =
  (hasSignature ? 1 + 512 : 1) +
  defPubkey ? (hasPubkey ? 1 + 256 : 1) : 0 +
  defTime ? (hasTime ? 64 : 64) : 0 +
  defExpire ? (hasExpire ? 32 : 32) : 0;
```

### Encoding of function ID and its arguments

Function ID and the function arguments are located in the chain of cells. The last reference of each cell (except for the last cell in the chain) refers to the next cell. After adding the current parameter in the current cell we must presume an invariant (rule that stays true for the object) for our cell: number of unassigned references in the cell must be not less than 1 because the last cell is used for storing the reference on the next cell. When we add a specific value of some function argument to the cell we assume that it takes the max bit and max ref size. Only if the current parameter (by max bit or max ref size) does not fit into the current cell then we create new cell and insert the parameter in the new cell.

:::note
**But** If current argument and all the following arguments fit into the current cell by max size then we push the parameters in the cell.
:::

In the end we connect the created cells in the chain of cells.

For example:

```solidity
function f(address a, address b) public;
```

Here we create 2 cells. In the first there is function id and  `a`. There may be not more than 32+591=623 bits. It's not more than 1023. The next parameter `b` can't fit into the first cell. In the second cell there is only `b`.

```solidity
function f(mapping(uint=>uint) a, mapping(uint=>uint) b, mapping(uint=>uint) c, mapping(uint=>uint) d)
```

The first cell: function ID, `a`, `b` `c`, `d`.

```solidity
function f(string a, string b, string c, string d, uint32 e) public
```

Function ID, `a`, `b`, `c` are located in the first cell. `d` and `e` fit in the first cell by max size. That's why we push all parameter in the fist cell.

```solidity
struct A {
  string a;
  string b;
  string c;
  string d;
}

function f(A a, uint32 e) public;
```

Same as previous example, only one cell.

```solidity
function f(string a, string b, string c, string d, uint e, uint f, uint g, uint h) public
```

We use 3 cells. In the first cell there are function Id, `a`, `b,` `c`. In the second - `d`, `e`, `f`, `g`. In the third - `h`.

## Message body

### External Inbound Messages

Message body with encoded function call has the following format:

`Maybe(Signature)` +  `Enc(Header)` +`Function ID` +  `Enc(Arguments)`

First comes an optional signature. It is prefixed by one bit flag that indicates the signature presence. If it is `1`, then in the next `512 bit` a signature is placed, otherwise the signature is omitted.

Then сomes the encoded header parameters set  (same for all functions).

It is followed by ***32 bits*** of function ID identifying which contract functions are called. The `function ID` comes within the first `32 bits` of the `SHA256` hash of the function signature.

The highest bit is set to `0` for function ID in external inbound messages, and to `1` for external outbound messages.

Function parameters are next. They are encoded in compliance with the present specification and stored either to the root cell or the next one in the chain.

:::note
An encoded parameter cannot be split between different cells
:::

### External Outbound Messages

External outbound messages are used to return values from functions or to emit events.

Return values are encoded and put into the message response:

`Function ID`+`Enc(Return values)`

Function ID's highest bit is set to `1`.

Events are encoded as follows:

`Event ID` + `Enc(event args)`

`Event ID` - 32 bits of SHA256 hash of the event function signature with highest bit set to `0`.

### Internal Messages

Internal messages are used for contract-to-contract interaction; they have the following body format:

`Function ID` + `Enc(Arguments)`

`Function ID` - 32 bits function id calculated as first 32 bits SHA256 hash of the function signature. The highest bit of function ID is `0`. Internal messages contain only function calls and no responses.

## Message Body Signing

The message body can be protected with a cryptographic signature to identify a user outside the blockchain. In this case, an *External inbound message* that calls the function carries a user *private key* signature. This requirement applies only to *External inbound messages* because *Internal inbound messages* are generated within the blockchain, and *src address* can be used to identify the caller.

If a user does not want to sign a message, bit `0` should be placed to the root cell start and signature omitted.

The message body signature is generated from the *representation hash* of the bag of cells following the signature.

## Signing Algorithm

1. ABI serialization generates bag of cells containing header parameters, function ID and function parameters.
   591 free bits are reserved in the root cell for destination address (the maximum size of internal address).
2. The root cell data is prepended with actual destination address data without padding to maximum size.
3. *Representation hash* of the bag is signed using the *Ed25519* algorithm.
4. Address data is removed from the root cell and replaced with bit `1` followed by 512 bits of the signature.

:::note
This functionality is added since `ABI v2.3` and supported staring with [0.64.0](https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/Changelog_TON.md#0640-2022-08-18) version of the Solidity compiler.
:::

## ABI JSON

This section describes schema of the smart contracts ABI represented in JSON format.

Full ABI schema in TypeScript notation:

```typescript
type Abi = {
  version: string,
  setTime?: boolean,
  header?: Param[],
  functions: Function[],
  events?: Event[],
  data?: Data[],
  fields?: Param[],
}

type Function = {
  name: string,
  inputs?: Param[],
  outputs?: Param[],
  id?: number,
}

type Event = {
  name: string,
  inputs?: Param[],
  id?: number,
}

type Data = Param & {
  key: number,
}

type Param = {
  name: string,
  type: string,
  components?: Param[],
}
```

Where:

- `version` contains string and uses semver semantics. Current version is "2.1".
- `functions` describes all functions the smart contract can handle.
- `events` describes all external outbound messages (events) produces by smart contract.
- `data` describes Hashmap with public data of the smart contract.
- `fields` describes internal structure of the smart contracts data.

## Function Signature (Function ID)

The following syntax is used for defining a signature:

- function name
- list of input parameter types (input list) in parenthesis
- list of return values types (output list) in parenthesis
- ABI version

Single comma is used to divide each input parameter and return value type from one another. Spaces are not used.

Parameter and return value names are not included.

The function name, input and output lists are not separated and immediately follow each other.

If a function has no input parameters or does not return any values, the corresponding input or output lists are empty (empty parenthesis).

### Function Signature Syntax

`function_name(input_type1,input_type2,...,input_typeN)(output_type1,output_type2,...,output_typeM)v2`

### Signature Calculation Syntax

`SHA256("function_name(input_type1,input_type2,...,input_typeN)(output_type1,output_type2,...,output_typeM)v2")`

### Sample Implementation

**Function**

`func(int64 param1, bool param2) -> uint32`

**Function Signature**

`func(int64,bool)(uint32)v2`

**Function Hash**

`sha256("func(int64,bool)(uint32)v2") = 0x1354f2c85b50aa84c2f65ebb8cec69aba0aa3269c21e03e142e014e84ea59649`

**function ID** then is `0x1354f2c8` for function call and `0x9354f2c8` for function response

### Event ID

**Event ID** is calculated in the same way as the **function ID** except for cases when the event signature does not contain the list of return values types: `event(int64,bool)v2`

## Encoding

The goal of the ABI specification is to design ABI types that are cheap to read to reduce gas consumption and gas costs. Some types are optimized for storing without write access.

## Header parameter types

- `time`: message creation timestamp. Used for replay attack protection, encoded as 64 bit Unix time in milliseconds.

  Rule: the contract should store the timestamp of the last accepted message. The initial timestamp is 0. When a new message is received, the contract should do the following check:

  `last_time < new_time < now + interval,` where

  `last_time` - last accepted message timestamp (loaded from c4 register),

  `new_time` - inbound external message timestamp (loaded from message body),

  `now` - current block creation time (just as `NOW` TVM primitive),

  `interval` - 30 min.

  The contract should continue execution if these requirements are met. Otherwise, the inbound message should be rejected.

- `expire`: Unix time (in seconds, 32 bit) after that message should not be processed by contract. It is used for indicating lost external inbound messages.

  Rule:  if contract execution time is less then `expire` time, then execution is continued. Otherwise, the message is expired, and the transaction aborts itself (by `ACCEPT` primitive). The client waits for message processing until the `expire` time. If the message wasn't processed during that interval is considered to be expired

- `pubkey`: public key from key pair used for signing the message body. This parameter is optional. The client decides if he needs to set the public key or not. It is encoded as bit 1 followed by 256 bit of public key if parameter provided, or by bit `0` if it is not.
- Header may also contain any of standard ABI types used by custom checks.

### Function parameter types:

- `uint<M>`: unsigned `M` bit integer. Big-endian encoded unsigned integer stored in the cell-data.
- `int<M>`: two’s complement signed `M` bit integer. Big-endian encoded signed integer stored in the cell-data.
- `bool`: equivalent to uint1.
- tuple `(T1, T2, ..., Tn)`: tuple that includes `T1`, ..., `Tn`, `n>=0` types encoded in the following way:

```
Enc(X(1)) Enc(X(2)) ..., Enc(X(n)); where X(i) is value of T(i) for i in 1..n 
```

  Tuple elements are encoded as independent values so they can be placed in different cells

- `T[]` is a dynamic array of `T` type elements. It is encoded as a TVM dictionary.  `uint32` defines the array elements count placed into the cell body.  `HashmapE` (see TL-B schema in TVM spec) struct is then added (one bit as a dictionary root and one reference with data if the dictionary is not empty). The dictionary key is a serialized `uint32` index of the array element, and the value is a serialized array element as `T` type.
- `T[k]` is a static size array of `T` type elements. Encoding is equivalent to `T[]` without elements count
- `bytes`: an array of `uint8` type elements. The array is put into a separate cell. In the case of array overflow, the maximum cell-data size it's split into multiple sequential cells.
    - Note: contract stores this type as-is without parsing. For high-speed decoding, cut reference from body slice as `LDREF`. This type is helpful if some raw data must be stored in the contract without write or random access to elements.
    - Note: analog of `bytes` in Solidity. In C lang can be used as `void*`.
- `fixedbytes<M>`: a fixed-size array of `M` `uint8` type elements. Encoding is equivalent to `bytes`
- `map(K,V)` is a dictionary of `V` type values with `K` type key. `K` may be any of `int<M>/uint<M>` types with `M` from `1` to `1023`. Dictionary is encoded as  `HashmapE` type (one bit put into cell data as dictionary root and one reference with data is added if the dictionary is not empty).
- `address` is an account address in TON blockchain. Encoded as `MsgAddress` struct (see TL-B schema in TON blockchain spec).
- `cell`: a type for defining a raw tree of cells. Stored as a reference in the current cell. Must be decoded with `LDREF`  command and stored as-is.
    - Note: this type is useful to store payloads as a tree of cells analog to contract code and data in the form of `StateInit` structure of `message` structure.

## Cell Data Overflow

If parameter data does not fit into the available space of the current cell-data, it moves to a separate new cell. This cell is attached to the current one as a reference. The new cell then becomes the current cell.

## Cell Reference Limit Overflow

For simplicity, this ABI version reserves the last cell-reference spot for cell-data overflow. If the cell-reference limit in the current cell is already reached (save for the reserved spot) and a new cell is required, the current cell is considered complete, and a new one is generated. The reserved spot stores the reference to the new cell, and it continues with the new cell as a current one.

The last cell reference can be used by parameter serialization which needs reference (`cell`, `bytes`, `map`, `array` types) if all the following parameters can fit into current cell.

## Contract Interface Specification

The contract interface is stored as a JSON file called contract ABI. It includes all public functions with data described by ABI types. Below is a structure of an ABI file:

```json
{
  "ABI version": 2,
  "header": [
    ...
  ],
  "functions": [
    ...  
  ],
  "getters": [
    ...
  ],
  "events": [
    ...  
  ],
  "data": [
    ...
  ]
}
```

Getters is a list of get methods which might be called on local TVM.

### Header

This section describes additional parameters of functions within the contract. Header-specific types are specified as strings with the type `name`. Other types are specified as function parameter type (see [Functions](#functions)))

```json
{
  "header": [
    "header_type",
    {
      "name": "param_name",
      "type": "param_type"
    }
  ]
}
```

Example

```json5
{
  "header": [
    "time",
    "expire",
    {
      "name": "custom",
      "type": "int256"
    }
  ]
}
```

### Functions

Specifies each interface function signature, including its name, input, and output parameters. Functions specified in the contract interface can be called from other contracts or from outside the blockchain via ABI call.

Functions section has the following fields:

```json5
{
  "functions": [
    {
      "name": "method_name",
      "inputs": [
        {"name": "func_name", "type": "ABI_type"},
      ],
      "outputs": [],
      "id": "0xXXXXXXXX", //optional
    }
  ]
}
```

- `name`: function name;
- `inputs`: an array of objects, each containing:
    - `name`: parameter name;
    - `type`: the canonical parameter type.
    - `components`: used for tuple types, optional.
- `id`: an optional `uint32` `id` parameter can be added. This `id` will be used as a `Function ID` instead of automatically calculated. PS: the last case can be used for contracts that are not ABI-compatible.
- `outputs`: an array of objects similar to `inputs`. It can be omitted if the function does not return anything;

### Events

This section specifies the events used in the contract. An event is an external outbound message with ABI-encoded parameters in the body.

```json5
{
  "events": [
    {
      "name": "event_name",
      "inputs": [],
      "id": "0xXXXXXXXX", //optional
    },
  ]
}
```

`inputs` have the same format as for functions.

### Data

This section covers the contract global public variables.

```json5
{
  "data": [
    {
      "name": "var_name",
      "type": "abi_type",
      "key": "<number>" // index of variable in contract data dictionary
    },
  ]
}
```

### Fields

It describes internal structure of the smart contracts data. This section helps to decode contract data with TON-SDK function [decode_account_data](https://github.com/tonlabs/ever-sdk/blob/ed05ce7b9305d0e825616efb8e9295b63406b8bb/docs/reference/types-and-methods/mod_abi.md#decode_account_data)

Structure of the smart contract data is described as a list of variables names with corresponding data types.
It includes contract state variables and some internal contract specific hidden variables.
They are listed in the order in which they are stored in the data field of the contract.
Example for a Solidity contract [BankClient](https://github.com/tonlabs/samples/blob/master/solidity/5_BankClient.sol):

Contract state variables:

```solidity
contract BankClient {
  uint public creditLimit = 0;  // allowed credit limit;
  uint public totalDebt = 0;    // contract total debt;
  uint public balance = 0;    // contract balance;
  uint public value = 0;      // inbound message value.
}
```

Fields section of the abi file:

```json
{
  "fields": [
    {"name":"_pubkey","type":"uint256"},
    {"name":"_timestamp","type":"uint64"},
    {"name":"_constructorFlag","type":"bool"},
    {"name":"creditLimit","type":"uint256"},
    {"name":"totalDebt","type":"uint256"},
    {"name":"balance","type":"uint256"},
    {"name":"value","type":"uint256"}
  ]
}
```

### Types

#### `bool`

Boolean type.

| Usage          | Usage                                          | Examples               |
|----------------|------------------------------------------------|------------------------|
| Cell           | 1 bit, `0` or `1`                              |                        |
| JSON           | `true`, `false`                                |                        |
| JSON (accepts) | `true`, `false`, `0`, `1`, `"true"`, `"false"` | `0`, `true`, `"false"` |

#### `tuple`

Struct type, consists of fields of different types. All fields should be specified as an array in the `components` section of the type.

For example, for structure `S`:
```solidity
struct S {
  uint32 a;
  uint128 b;
  uint64 c;
}
```

parameter `s` of type `S` would be described like:
```json
{
  "components": [
    {"name":"a","type":"uint32"},
    {"name":"b","type":"uint128"},
    {"name":"c","type":"uint64"}
  ],
  "name":"s",
  "type":"tuple"
}
```

| Usage          | Value                                                                                                 | Examples                     |
|----------------|-------------------------------------------------------------------------------------------------------|------------------------------|
| Cell           | chain of cells with tuple data types encoded consistently<br/>(without splitting value between cells) |                              |
| JSON           | dictionary of struct field names with their values                                                    | `{"a": 1, "b": 2, "c": 3}`   |
| JSON (accepts) | mapping of struct field names with their values                                                       | `{"a": 1, "b": 2, "c": 3}`   | 

#### `int<N>`

Fixed-sized signed integer, where `N` is a decimal bit length. Examples: `int8`, `int32`, `int256`.

| Usage          | Value                                                       | Examples              |
|----------------|-------------------------------------------------------------|-----------------------|
| Cell           | N bit, big endian                                           |                       |
| JSON           | string with hex representation                              | `0x12`                |
| JSON (accepts) | number or string with decimal or hexadecimal representation | `12`, `0x10`, `"100"` |

#### `uint<N>`

Fixed-sized unsigned integer, where N is a decimal bit length e.g., `uint8`, `uint32`, `uint256`.
Processed like `int<N>`.

#### `varint<N>`

*New type introduced in 2.1 version.*

Variable-length signed integer. Bit length is between `log2(N)` and `8 * (N-1)`, where `N` is equal to 16 or 32, e.g. `varint16`, `varint32`.

| Usage          | Value                                                                                                                    | Examples              |
|----------------|--------------------------------------------------------------------------------------------------------------------------|-----------------------|
| Cell           | 4 (N=16) of 5 (N=32) bits that encode byte length of the number `len`<br/>followed by `len * 8` bit number in big endian |
| JSON           | string with hex representation                                                                                           | `0x12`                |
| JSON (accepts) | number or string with decimal or hexadecimal representation                                                              | `12`, `0x10`, `"100"` |

#### `varuint<N>`

Variable-length unsigned integer with bit length equal to `8 * N`, where `N`is equal to 16 or 32 e.g., `varint16`, `varint32`.
Processed like `varint<N>`.

#### `map(<keyType>,<valueType>)`

Hashtable mapping keys of `keyType` to values of the `valueType`, e.g., `map(int32, address)`.

| Usage          | Value                                                                              | Examples                                  |
|----------------|------------------------------------------------------------------------------------|-------------------------------------------|
| Cell           | 1 bit (`0` - for empty mapping, otherwise `1`) and ref to the cell with dictionary |                                           |
| JSON           | dictionary of keys and values                                                      | `{"0x1":"0x2"}`                           |
| JSON (accepts) | dictionary of keys and values                                                      | `{"0x1":"0x2"}`, `{"2":"3","3":"55"}`     |

#### `cell`

TVM Cell type.

| Usage          | Value                     | Examples                                     |
|----------------|---------------------------|----------------------------------------------|
| Cell           | stored in a ref           |                                              |
| JSON           | binary hex data in base64 | `"te6ccgEBAQEAEgAAH/////////////////////g="` |
| JSON (accepts) | binary hex data in base64 | `"te6ccgEBAQEAAgAAAA=="`                     |

#### `address`

Contract address type `address`, consists of two parts: workchain id (wid) and address value.

| Usage          | Value                                                                                                             | Examples                                                                 |
|----------------|-------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| Cell           | 2 bits of address type, 1 bit of anycast, wid - 8 bit signed integer and address value - 256 bit unsigned integer |                                                                          |
| JSON           | decimal signed integer and unsigned hexadecimal integer with leading zeros separated by `:`                       | `"123:000000000000000000000000000000000000000000000000000000000001e0f3"` |
| JSON (accepts) | decimal signed integer and unsigned hexadecimal integer with leading zeros separated by `:`                       | `"123:000000000000000000000000000000000000000000000000000000000001e0f3"` |

#### `bytes`

Byte string of data.

| Usage          | Value                          | Examples   |
|----------------|--------------------------------|------------|
| Cell           | cell with data stored in a ref |            |
| JSON           | binary hex data                | `"313233"` |
| JSON (accepts) | binary hex data                | `"323334"` |

#### `fixedbytes<N>`

Where N is a decimal byte length from 1 to 32. It is denoted in abi as `uint<M>`,
where `M` is a bit length and `M = 8 * N`.
Processed like `int<N>`.

#### `string`

New type introduced in 2.1 version.

String data.

| Usage           | Value                          | Examples  |
|-----------------|--------------------------------|-----------|
| Cell            | cell with data stored in a ref |           |
| JSON            | string data                    | `"hello"` |
|  JSON (accepts) | string data                    | `"hello"` |

#### `optional(innerType)`

*New type introduced in 2.1 version.*

Value of optional type `optional(innerType)` can store a value of `innerType` of be empty.

Example: `optional(string)`.

| Usage          | Value                                                                                                                | Examples                          |
|----------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| Cell           | 1 bit flag (`1` - value is stored, otherwise `0`) and the value itself (according to `innerType`) if it presents |
| JSON           | according to `innerType` or `null` if it is empty                                                                    | `"hello"`                         |
| JSON (accepts) | according to `innerType` or `null` if it is empty                                                                    | `"hello"`                         |

#### `itemType[]`

Array of the `itemType` values. Example: `uint256[]`

| Usage          | Value                                                                                                                                                                                       | Examples                          |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| Cell           | 32 unsigned bit length of the array, 1 bit flag (`0` if array is empty, otherwise `1`) and dictionary of keys and values where key is 32 unsigned bit index and value is `itemType` |                                   |
| JSON           | list of `itemType` values in `[]`                                                                                                                                                           | `[1, 2, 3]`, `["hello", "world"]` |
| JSON (accepts) | list of `itemType` values in `[]`                                                                                                                                                           | `[1, 2, 3]`, `["hello", "world"]` |

#### Getters section

Getters specification is not yet supported and this section is ignored.

## Problem of mappings or arrays that contains "big" structures as values.

### Introduction

Several months ago we did breaking change in TVM. Opcode `DICTSET` had worked in this way: `if some_data+len(key)+len(value)` doesn't fit in one cell (`1023 bits`) then value are stored in ref of cell. Now if it doesn't fit in one cell opcode will throw exception.

We haven't faced with this problem because solidity compiler doesn't support this feature (mappings or arrays that contain "big" structures as values). We are going to support it but ton-abi throws exception then it generates message.

### Solving of the problem

To set value in dictionaries (arrays or mappings) we will use opcode `DICTSET` or `DICTSETREF`.

```
if (12 + len(key) + maxPossibleValueLength <= 1023) then we use DICTSET.

else we will use DICTSETREF.

12 = 2 + 10 ≥ 2 + log2(keyLength).
```

See [https://github.com/ton-blockchain/ton/blob/master/crypto/block/block.tlb#L30](https://github.com/ton-blockchain/ton/blob/master/crypto/block/block.tlb#L30)

Max possible size of value:

- **intN/uintN** - `N bit`.
- **address** - `591 bit`. See [https://github.com/ton-blockchain/ton/blob/master/crypto/block/block.tlb#L107](https://github.com/ton-blockchain/ton/blob/master/crypto/block/block.tlb#L107)

```TL-B
anycast_info$_ depth:(#<= 30) { depth >= 1 }
   rewrite_pfx:(bits depth) = Anycast;

addr_var$11 anycast:(Maybe Anycast) addr_len:(## 9) 
   workchain_id:int32 address:(bits addr_len) = MsgAddressInt;

2 +          // 11 
1 + 5 + 30 + // anycast
9 +          // addr_len
32 +         // workchain_id:int32
512          // address
 = 
591
```

- **bool** - `1 bit`
- **bytes/cell** - `0 bit`
- **array** - `33 bit`
- **mapping** - `1 bit`
- **structure** = `SUM maxPosibleLenght(member)` for member in members

## Reference

- [ABI changelog specifications](https://github.com/tonlabs/ever-abi/tree/master/docs)
- [ABI implementation](https://github.com/tonlabs/ever-abi)
- [ABI parser](https://github.com/broxus/everscale-web-tools/tree/master/abi-parser)
- [ABI serializer](https://ever.bytie.moe/serializer)
