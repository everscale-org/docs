---
description: Blockchain, everything is a contract, types of messages and gas
sidebar_position: 0
---

# Everscale overview

Everscale is one of the most advanced blockchain networks that lets users transfer digital assets to anyone for a small fee. It also powers numerous leading applications that everyone can take advantage of. 

The blockchain was created on the basis of the initial code of the Telegram Open Network (TON) blockchain designed by Nikolai Durov. Fundamentally, Everscale blockchain is constructed in accordance with this TON Whitepaper.

Despite the fact that Everscale builds on TON's innovation, there are, however, some big advancements deployed by network developers in order to address the fundamental issues faced by most blockchains, Everscale constantly works on implementing the most secure solutions to achieve maximum scalability. 

The main solution that permits Everscale to offer one of the highest Transaction Per Second rates available among currently operating blockchains is sharding. 

Generally speaking, sharding is a method for distributing data across multiple machines. This makes it a scaling technique, and can be used by blockchain networks to partition states and transaction processing, so that each node of the network would only need to process a fraction of all the transactions. Moreover, sharding allows for the parallel processing of transactions. As long as there is a sufficient number of nodes verifying each transaction, ensuring high reliability and security, then splitting a blockchain into shards will allow it to process far more transactions.

However, Everscale went even further than classical sharding. Below we briefly describe technological solutions, besides sharding, that permit Everscale to be amongst the leading blockchain ecosystems. 

**1. Infinite Sharding** 

On Everscale, shards are dynamically added as the load increases and then merged back. This is possible because all contracts on the chain communicate with each other asynchronously, and therefore, we can split one shard into two shards without any problems occurring (shards are just divided in half according to the ranges of contract addresses).

[**2. Distributed programming**](../develop/smart-contracts/10-distributed-programming.md)

There is a reasonable question. Let's consider that we have a contract with a token, for example, USDT. Then, a user with a larger account balance is more motivated to pay for storage, than, respectively, the user with a lesser balance. This way, wouldn't there arise situations when some users will be obliged to pay for storage on behalf of others, so that their contract is not deleted?    

In order to solve this problem, another truly genius idea was invented, called distributing programming. 

In Everscale, for each entity, balance or even trading pair, its own small smart contract is deployed. The owner of the respective smart contract decides on his own for how long to store the data and pays only for that. 

[**3. Validation**](../validate/getting-started.md) 

The Everscale blockchain was not built to allow just anyone to become a validator. Validation is a critical process, and requires professional equipment and access to an appropriate server. The total number of validators will at most be in the thousands, not in the tens of thousands. And validator machines have high server and channel requirements (the current requirements are 48 CPUs, 128 RAM and 1TB SSD) and a 1GB channel (the network is used extensively). This allows for the blockchain to support a very quick block release speed and often rotate validators in the shards.

**4. Paid storage**

There is also the issue of blockchain state growth faced by most networks. For instance, If someone recorded something on the blockchain, at least once, for example, bought a memcoin for 0.001. Then, even if the price of the memcoin goes to zero, the validators will still be required to store the information about your purchase forever. That is, you pay for the record once, but it will be stored forever. And here comes the interesting economics - blockchains are forced to limit the rate of recording transactions artificially so that the size of the blockchain state does not grow faster than data storage becomes cheaper. As a result, users are forced to compete with each other for the right to record data on the blockchain via an auction, and subsequently, transaction fees are increasing all the time.

Everscale, as a leading blockchain developer, never looks for easy and uncostly ways to solve blockchain issues. Therefore, the highlighted problem was resolved with the maximum efficiency and accuracy possible. In the Everscale blockchain, each contract is required to pay rent for storing its data in the state. This rent corresponds to the size of the data. When the money runs out, the contract is deleted with the possibility of recovery, and then deleted completely. 

Essentially, Everscale aims to be a decentralized replacement for AWS. Just as you can host your application on AWS, you can host it on Everscale. Hosting it on Everscale will not be much more expensive (if it is rarely used, it will be cheaper), but it will have maximum fault tolerance.

Please follow [**this page**](../arch/10-basics.md) in order to get started with the components of the Everscale blockchain and start learning it's architecture.
