---
title: Core description
sidebar_position: 0
---

# TIP-3.1 Fungible Token Standard

Requires: [TIP-5.1](./../../TIP-5/TIP-5.1)

## Abstract

The following standard allows for the implementation of a standard API for tokens within smart contracts. General information about token is stored in the token root contract. Each token holder has its own instance of token wallet contract. Token transfers SHOULD be implemented in P2P fashion, between sender and receiver token wallets.

## Motivation

A standard interface allows any tokens on Everscale to be re-used by other applications: from wallets to decentralized exchanges.

## Specification

The keywords “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

### Notes

- We choose Standard Interface Detection to expose the interfaces that a TIP3 smart contract supports.
- This standard does not define the external methods to initiate transfer, mint or burn tokens. Though it defines the methods, which MUST be called on a recipient token wallet or token root during these operations. Any additional data MUST be encoded in the `_meta` parameter. This allows to detect these operations, without knowing the details of a specific implementation.
- The rules for decoding `_meta` parameters MUST be defined in a child standards.
- The rules for a token wallet ownership MUST be defined in a child standards.

### Token root

#### Name

Returns the name of the token - e.g. "MyToken".

```solidity
function name() public view responsible returns (string);
```

#### Symbol

Returns the symbol of the token. E.g. “HIX”.

```solidity
function symbol() public view responsible returns (string);
```

#### Decimals

Returns the number of decimals the token uses - e.g. 8, means to divide the token amount by 100000000 to get its user representation.

```solidity
function decimals() public view responsible returns (uint8);
```

#### Total supply

Returns the total token supply.

```solidity
function totalSupply() public view responsible returns (uint128);
```

#### Token wallet code

Returns the token wallet code.

```solidity
function walletCode() public view responsible returns (TvmCell);
```

#### Accept tokens burn

Decreases token total supply by `_value`. The contract MUST check that the sender is a correct token wallet. Before sending this message, caller token wallet MUST decrease its own balance by `_value`. Any additional data MUST be encoded in the `_meta` parameter. If the mint can't be accepted (e.g. invalid sender), this message MUST be bounced.

```solidity
function acceptBurn(
    uint128 _value,
    TvmCell _meta
) external;
```

#### Standard interface detection

```solidity
interface TIP3TokenRoot {
    function name() public view responsible returns (string);
    function symbol() public view responsible returns (string);
    function decimals() public view responsible returns (uint8);
    function totalSupply() public view responsible returns (uint128);
    function walletCode() public view responsible returns (TvmCell);

    function acceptBurn(
        uint128 _value,
        TvmCell _meta
    ) external;
}
```

The token root TIP4 interface ID is **TO BE DEFINED**.

### Token wallet

#### Root

Returns the token root address.

```solidity
function root() public view responsible returns (address);
```

#### Balance

Returns the token wallet balance.

```solidity
function balance() public view responsible returns (uint128);
```

#### Wallet code

Returns the token wallet code.

```solidity
function walletCode() public view responsible returns (TvmCell);
```

#### Accept tokens transfer

Increases token wallet balance by `_value`. The contract MUST check that the sender is a correct token wallet. Before sending this message, caller token wallet MUST decrease its own balance by `_value`. Any additional data MUST be encoded in the `_meta` parameter. If the transfer can't be accepted (e.g. invalid sender), this message MUST be bounced.

```solidity
function acceptTransfer(
    uint128 _value,
    TvmCell _meta
) external;
```

#### Accept tokens mint

Increases token wallet balance by `_value`. The contract MUST check that the sender is a correct token root. Before sending this message, token root MUST increase the total supply by `_value`. Any additional data MUST be encoded in the `_meta` parameter. If the mint can't be accepted (e.g. invalid sender), this message MUST be bounced.

```solidity
function acceptMint(
    uint128 _value,
    TvmCell _meta
) external;
```

#### Standard interface detection

```solidity
interface TIP3TokenWallet {
    function root() public view responsible returns (address);
    function balance() public view responsible returns (uint128);
    function walletCode() public view responsible returns (TvmCell);

    function acceptTransfer(
        uint128 _value,
        TvmCell _meta
    ) external;

    function acceptMint(
        uint128 _value,
        TvmCell _meta
    ) external;
}
```

The token wallet TIP4 interface ID is **TO BE DEFINED**.`