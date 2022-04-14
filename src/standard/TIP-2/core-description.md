---
title: Core description
sidebar_position: 0
slug: /standard/TIP-2
---

# DeCert — Decentralized Certificates

## Abstract

There is a clear need for unified decentralized and distributed certificate system in Free TON. As described in more details below, such system would be used in providing many services which requires a certified provable key-value store. For example a Decentralized Name Service (DeNS), a Prove of Ownership / Prove of Purchase certificate and many others.

Current solutions (for example a TON DNS, proposed [here](https://ton.org/DNS-HOWTO.txt)) are either a large smart contracts which maintains a full list of records, or a tree-like solutions which shards the list based on some parameters. Neither of these solutions are satisfactory due to a lack of scalability, high costs of maintenance, long search time, single point of failure and so on.

Here I present a completely distributed system, which does not require centralized record, nor a tree of domains or records with almost zero latency.

The design relies heavily onе the principles of TIP-3 Token architecture with some notable modifications.

## Issuance

Root is a smart contract contains a Code of Certificate smart contract without data. The Root has methods for Certificate Issuance, Certificate Code Retrieval, Root PubKey retrieval and Version history. Each Certificate can become a Root, therefore a Root smart contract and its Certificate smart contract are the same. The Code contains an address of its Root.

When a User wishes to register it is calling a Certificate Issuance method in Root, sending a Certificate Data (for example an alphanumeric string of a certificate body).

Root is taking its Public Key and a Code of Certificate smart contract, inserts a Certificate Data sent by a User, calculates the address of Certificate and checks if the address already has a Certificate or any other Code deployed by sending a bounced true message calling `getData` method.

If a contract exists it means that a Certificate with the same Certificate Data already exists. The contract then can return a registration information to the Root which will return it to a User. If a contract does not exist the message will bounce to the Root smart contract which will mean the Certificate can be registered.

If Certificate does not exist the Root will Issue the Certificate by deploying the Certificate Contract with its Data. On deploy the Certificate will check that it has been deployed from the root address by comparing the address of a Root inside with the deployer address. If there is no match the deploy will fail.

Of course additional business logic steps could be included between the last two steps, such as monetization or other mechanics as shown below in one of the examples.

## Resolving

To resolve the Name any User can now call Get method `Resolve` of a Root locally to obtain an Address. Root will use Certificate Code, Root PubKey, insert a name User wishes to resolve into Certificate Code and calculate the address.

To resolve a Root smart contract one can take any Certificate Core and resolve for the `Root` name.

A user application can cash the Certificate Code smart contract and Root PubKey once, after which resolving any name is achieved locally with a simple address calculation, with no need for network connection at all.

The Certificate itself contains variable types of addresses of a target smart contracts to which the Certificate owner wishes the name to point. A user should choose which type of address they wish to use.

## Reverse resolving

In order to make a reverse resolving a smart contract need to state its certificate address. The user will check if certificate indeed has contract address.

## Search

Of course search is one of the most important features of any name system. Knowing a Certificate Code hash enables to retrieve all smart contracts having the same hash by simply querying the blockchain state. Decoding contract data will produce a full list of names under specific Root. It would be quite easy to produce a table with all the certificate records.

## Example: Decentralized Name Service (DeNS)

Let’s consider a DeNS Root is a smart contract which contains a Code of the Name Identity Certificate (NIC) smart contract. The Root has methods for Identity Registering, NIC Code Retrieval, Root PubKey retrieval, Version history.

When a User wishes to register an Identity it is calling a «RegName» method in DeNS Root with the signed message of UTF-8 string (Name) together with a Registration Bid (a hash of a Bid Value in TONs with some salt) with value attached 1 TON.

DeNS Root is taking its Public Key and a NIC Code inserts a Name, calculates the NIC address and checks if the address already has a NIC Code deployed by sending a bounced true message calling method «getName». Return to User a Whois Information.

If it bounces or a registration period in Whois is less than 28 days DeNS Root will send the name into an Auction Smart Contract together with a Registration Bid Hash and a number of years before expiration. First bidder determines the duration of the auctioned name. Other users will be able to Bid for the same name but only for same duration with their Bids following exactly the same process. Auction duration is minimum 7 days per year of name duration but no more than 28 days. At the end of the Auction all participants will submit to the Auction contract a message signed from the address of the original bid together with their original bid price and salt. The winner of the auction will be determined by the highest bid per day and will pay the second higher price for the Name Certificate.

Once DeNS Root knows the Auction result it will wait until registration period ends if the name certificate has existed before or immediately deploy the NIC smart contract into the address calculated as a NIC Contract Code with a Name inserted into initial data and PubKey of the Owner passed in its constructor.

To resolve the Name any User can now call Get method «Resolve» of DeNS Root locally to obtain an Address. DeNS Root will use Code of NIC smart contract, a DeNS Root PubKey, insert any name they are wishing to resolve into NIC Code and calculate the address.

Since most of the time a user application will just cash the Code of NIC smart contract and DeNS PubKey, resolving any name is achieved locally with a simple address calculation, with no need for network connection at all.

## Example of NIC smart contract methods

Whois — sends all certificate data: a name, date of registration, owner PubKey

GetWhois is a whois getter

GetAddress by Type, for example — ADNL, Wallet,

RegName
GetResolve
ChangeAddress
ChangeOwnership

## Free TON Name Identity Certificate convention

Format: any alfa-numeric string except for a dot (.) and slash (/) which are prohibited.

Only top level names are provided by DeNS Root, but any NIC smart contract can point into a next level of hierarchy which is divided by /

top-name/sub-name/

The dot (.) is specifically prohibited as to not create confusions with a current internet domain system.

## Example: Ownership Certificate

The Certificate is issued by Root for ownership of an item. Let’s call it certificate of Ownership or COW for short. COW will include a serial number of an item a User want to prove owning. Since the PubKey of an owner of certificate is presented it is easy to prove an ownership of an Item by finding the certificate with corresponding serial number calculating the address of this certificate with this number, POW Code and Root PubKey without a need to maintain any centralized ledger of said items. The transfer of ownership of an Item is easily supported as well by calling a ChangeOwnership Method in the POW signed by the owner private key.

## Reference

- [Contest Proposal: Decentralized Name Service (DeNS)](https://forum.freeton.org/t/contest-proposal-decentralized-name-service-dens/7807)
- [ReDeNS — Reverse DeCert (TIP-2.1)](1.md)
