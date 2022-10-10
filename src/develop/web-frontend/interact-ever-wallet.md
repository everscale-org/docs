---
sidebar_position: 3
---

# How to interact with Ever wallet

## Introduction

Welcome to Ever wallet’s Developer Guide. 

Ever wallet enables user interaction and experience with Everscale ecosystem's dApps. It is currently available as a browser extension and as a mobile app on both Android and iOS devices. 

The purpose of this documentation is to illustrate how to integrate Ever wallet, initiate transactions and build dApps with Everscale. 


## Why Ever wallet

Ever wallet was created by [Broxus developers](https://broxus.com) to supply users with a secure and innovative wallet perfectly suited to navigate through multiple services powered by the Everscale network. 

It is equipped with the most up-to-date features and easy to comprehend documentation for developers that are looking to build their dApps on the Everscale blockchain. 

## Getting Started

To develop for Everscale, install Ever wallet in any Chromium and Firefox browser of your choice. 

After Ever wallet is installed (make sure you back up your Seed Phrase), you should find that new browser tabs have a  window.__ever object available in the developer console. This is the way your website will interact with Everscale blockchain. 

Before proceeding with the documentation, please follow [**this link**](https://medium.com/@andyshpak/login-with-blockchain-everscale-815cb7bb6d01) in order to get familiar with how to use the Everscale blockchain and Ever wallet for user authorization without creating a transaction on the network.

Afterwards, please follow [**this link**](https://github.com/EverscaleGuild/everscale-tutor-web) in order to get familiar with how to interact with the contract from Ever wallet. 

After having studied the material above, please proceed with the **Ever wallet API, Everscale Inpage Provider, and Everscale standalone client** documentation.

## Everscale wallet API

Everscale Wallet API facilitates automatic interaction with the Everscale Blockchain and simplifies the management and transaction processes for Everscale assets.   
The API includes a built-in lite EVER node, support for Ever and TIP-3.1 tokens, a variety of different wallet contracts and REST API to make usage as convenient as possible.  
On the security front, the wallet API also has formidable features, most notably in its support for multi-sig operations.

- [**Everscale Wallet API using guide**](../tutorial/ton-wallet-api.md)
- [**Everscale Wallet API GitHub repository**](https://github.com/broxus/ton-wallet-api)
- [**Swagger**](https://api.flatqube.io/v1/swagger.yaml) 


## Everscale inpage provider

Web3-like interface to the Everscale blockchain.

- Provider working with extensions.
- Used for sending transactions. 
- Used for frontend. 

- [**Installation guide**](https://github.com/broxus/everscale-inpage-provider)
- [**Inpage provider documentation**](https://broxus.github.io/everscale-inpage-provider/index.html)

Also, please follow [**this link**](https://github.com/EverscaleGuild/everscale-tutor-web) for documentation of an example of Inpage Provider usage as well as wallet connection to DApps. 

## Everscale standalone client 

It is advisable to be used in conjunction with Everscale Inpage Provider. 
Used to get data from smart contracts, and subscriptions to state changes.  
Does not support Send in contracts.       

- [**Installation guide**](https://github.com/broxus/everscale-standalone-client)
- [**Standalone client documentation**](https://broxus.github.io/everscale-standalone-client/index.html)

For a deeper dive into the Everscale network, please find below links to instruments and services that will be of use while interacting with the Everscale blockchain via Ever wallet. 

- [APIs of Everscale services](https://docs.everscale.network/integrate/products-api) 
- [How to get EVERs](https://docs.flatqube.io/use/getting-started/how-to-get-ever)
- [TONOS-CLI](https://github.com/tonlabs/tonos-cli#tonos-cli) 
- [EVERDEV](https://docs.everos.dev/everdev/)
- [Ever SDK](https://github.com/tonlabs/ever-sdk)
- [Ever OS](https://everos.dev/)
