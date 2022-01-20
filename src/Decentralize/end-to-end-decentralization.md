---
sidebar_position: 1
---

# End-to-end Decentralization

> Ever OS is built around the concept of end-to-end Decentralization or E2ED for short.

Blockchain is a verifiable computation network. Results of execution of smart contracts, or programs that blockchain processes, are verifiable by many blockchain nodes, thus ensuring blockchain decentralization. Yet this may not be enough to ensure end-to-end decentralization. If, on the way to deliver the results of smart contract execution some centralized services are present, the integrity of the interaction with smart contracts execution results might be compromised. If the end user is not able to verify the correctness of its interaction with smart contract execution through whatever channel of interaction with blockchain is chosen, then the decentralization properties of a blockchain will be greatly diminished.

Here we introduce a system and method for end-to-end Decentralization of a blockchain.

## Background

Decentralization is an important property of public blockchain technology [^1].

Despite its claims of decentralization, blockchain keeps on fighting to achieve it through improvements and optimizations mainly related to consensus mechanisms and data exchange protocols. Proof-of-Work and Proof-of-Stake consensus protocols (and their derivatives) have issues related to centralization at both mining/staking and at the front-end levels. Considerable amounts of centralization exist in development ecosystems of some blockchains as well.

Decentralization claims can only be made when the whole system is decentralized, and therefore, should be judged by its weakest (or rather most centralized) link.

In the current invention we present an end-to-end Decentralization framework (E2ED).

In today's blockchains that support smart contracts (or in other words the ability to perform and validate arbitrary computations), user interaction with results of such computations is performed using some front end library (such as Web3 in Ethereum blockchain). The Web3 library takes care of performing blockchain related tasks with blockchain data presented to a user. The IPFS is used to store data in a decentralized manner. Yet as shown below neither is enough to preserve full decentralization of end user interactions with a blockchain system to ensure censorship resistance and security.

## Web3

Web3.0 js is a collection of libraries which allow you to interact with a local or remote Ethereum node, using a HTTP or IPC connection[^2].

Web3.0 is a collection of JavaScript libraries that allow users to interact with a local or remote Ethereum node using an HTTP or IPC connection. In other words, it’s a kind of SDK which gives users the ability to work with blockchain in the browser. That’s why it actually has a Web in the name and not something else.

Web3.0 is numbered 3.0 quite obviously because 2.0 and 1.0 versions of Web already exist, referring to the World Wide Web's evolution where the 2.0 version unlike the 1.0 version, for instance, allows for display of user-generated content, dynamically making websites more sophisticated.

Web 3.0 on the other hand is seen as part of the World Wide Web’s evolution due to the fact that it can be considered as a first attempt to access decentralized (blockchain) applications on the web.

The purpose of Web3 is to give the ability to create decentralized apps on the web connecting sites to the world of blockchain, in particular Ethereum blockchain.

The main problem with this approach is that a user does not really interact with the blockchain when using Web3 based applications, because most of the time the user interacts with many elements of information outside of the blockchain, presented to them by the application user interface.

This presents quite a significant problem as all such information and user interface elements are not decentralized, which means they are not immutable, not censorship resistant, and not fault tolerant.

Moreover, blockchain related elements that are supposedly temper proofed lose their properties once they are part of this centralized model.

## IPFS

Enters IPFS. The InterPlanetary File System (IPFS) is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting all computing devices[^3].

An IPFS developer or user can store the content somewhere that’s always online and accessible and make sure that when the user comes online they know where to find the content.

This way we theoretically could use IPFS to store all user interfaces somewhere, save a hash and an address of said content on the blockchain and therefore prove to the user that whatever is displayed in their browser is true and correct by way of verifying it using Web3 library.

Yet even an IPFS and Web3 combination does not guarantee end-to-end decentralization as described below in more detail.

## User interaction (DeBot)

A system is needed to create a comprehensive user experience without relying on trusted infrastructure. To achieve this, we introduced technology for writing the user interface inside the smart contract itself. **Decentralized Bot (DeBot)** is a technology enabling end-to-end Decentralization at a user interaction level. Using E2ED, any front-end application (be it in a web browser or a purposely built software) can draw an entire user experience without relying on a server.

Comparing Web 2.0, Web 3.0 and E2ED based systems (which for the purpose of the diagram below we named Web3.11 as a reminiscent to the famous Windows 3.11), E2ED is not a contradiction to Web3.0 but rather a continuation that closes some centralization loopholes to achieve end-to-end decentralization.

Web3.0 itself is not a monolithic system. It has many components such as an IPFS database for storage and others for address discovery and storage query on top. The Web3.0 approach is fragmented. A smart contract is executed in one place and the data it manipulates is stored in another. The data meets the business logic only on an end user device, therefore, the computation performed on such data can not be verified by a blockchain. For that reason we have verifiable business logic (smart contract) operating with the data it can not verify. The only limited verification available is the hash of data stored somewhere else. The interaction with said data is static. If a man-in-the-middle attack is performed on the user device level, the security of Web3 can be compromised.

In practice today what happens in almost 100% of cases is shown in the middle column of the diagram below. A user interface is provided by a web server. An application is running on the server and displayed in the user browser (or on a mobile device). The user performs many usual operations with the website content on the server and only when needed to interact with the blockchain does the Web3.0.js get called, which then interacts with the blockchain calling it from the end user device and signed with the user private key.

Even if Web3.0 is really advanced and stores the application data (say a website), in the IPFS database the Web3.0.js will be called to perform operations with a blockchain and again not the library nor the smart contract it interacts with, and will not be able to verify what has actually happened to the data that was stored and received from the IPFS on the user device.

![Comparing Web 2.0, Web 3.0 and E2ED based systems](/img/comparing-web-systems.png)

In E2ED the smart contract contains the actual user interface in a form of DeBot. The DeBot system described herein is just one way of performing user interface functions by a smart contract. The whole graphical user interface could be drawn if needed.

In DeBot the sequence of user actions is performed by calling DeBot smart contract functions using the local virtual machine of any particular blockchain. The result of those actions could at any time be transmitted to the remote smart contract together with the sequence of user performed actions and the whole interface interaction could be verified remotely by the blockchain, including the resulting transaction.

In terms of addressing the user, it just needs to know the address of a smart contract DeBot, which is a blockchain address that in turn can be abstracted further using a blockchain based DNS service.

## References

[^1]: [The Meaning of Decentralization](https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274)

[^2]: [web3.js - Ethereum JavaScript API](https://web3js.readthedocs.io/)

[^3]: [InterPlanetary File System](https://en.wikipedia.org/wiki/InterPlanetary_File_System)
