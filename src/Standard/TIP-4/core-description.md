---
title: Core description
sidebar_position: 0
---

# Non-Fungible Token

## Abstract

The following standard describes the basic idea about distributed non-fungible token architecture.

## Motivation

The suggested standard differs considerably from Ethereum ERC721 and other smart contract token standards with single registry due to its distributed nature related to Everscale blockchain particularities.
Given that Everscale has a storage fee, TIP4  is fully distributed and implies separate storage of each NFT

## Architecture

General information about NFT collection is stored in the NFT collection contract. Each NFT deployed in separate smart contracts and links to NFT collection contract. Smart contract architecture based on

- Consider asynchronous type of Everscale blockchain. Use callbacks and asynchronous getters;
- Standardizes one NFT - one smart contract. 
- Gas fee management practicals. 
- Use [TIP-6.1](./../TIP-6/1.md)

## [Non-Fungible Token (TIP-4.1)](./../TIP-4/1.md)
General information about NFT collection and NFT tokens. All NFT must implement [TIP-4.1](./../TIP-4/1.md)

## [Non-Fungible Token JSON Metadata (TIP-4.2))](./../TIP-4/2.md)
General information about NFT metadata. [TIP-4.2](./../TIP-4/2.md) is optional, but can be use for displaing NFT on marketplases, wallets and web.

## [On-chain indexes (TIP-4.3))](./../TIP-4/3.md)
On-chain Indexes is universal solution to easy and fast searching any data in blockchain. [TIP-4.3](./../TIP-4/3.md) is optional, but can be use for find all your NFT with one [dApp](https://main.ton.dev/graphql) query.

## [On-chain storage (TIP-4.4))](./../TIP-4/4.md)
Using the Storage contract, you can store NFT-related bytes in blockchain. [TIP-4.4](./../TIP-4/4.md) is optional, but can be use for fault tolerance. If off-chain services are unavailable, the user will be able to view NFT-related bytes, because it is stored on-chain.


## Authors

Author | Command
--- | ---  
|[Aleksand Aleksev](mailto:rualekseev@gmail.com)|[grandbazar.io](https://grandbazar.io)
|Nikita|-
|Aleksandr Khramtsov|[broxus](https://broxus.com/)
|Anton|community member
|Oleg Varnov|-
|Slava semenchuk|[scalepunks.com](https://scalepunks.com)
|Andrey Nedobylskiy|[svoi.dev/](https://svoi.dev/)




## References

- [Ethereum EIP-721](https://eips.ethereum.org/EIPS/eip-721)
- [Solana v1.2.0](https://docs.metaplex.com/token-metadata/specification)
- [TON NFT](https://github.com/ton-blockchain/TIPs/issues/62), [TON DATA](https://github.com/ton-blockchain/TIPs/issues/64)
- [Tezos TZIP12](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md)