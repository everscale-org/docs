---
sidebar_position: 0
---

# GraphQL API

## About GraphQL API

Due to the GraphQL ability to stitch its schemas, GraphQL API is in fact a set of "stitched" APIs behind it. Meanwhile, all Evernode Platform products share the same core API that allows to communicate with Everscale network, [each product has its own subset](https://docs.everos.dev/evernode-platform/products/functionality-comparison) of APIs corresponding to the Product use-cases.

- GraphQL API is shared by all [Evernode Platform](https://docs.everos.dev/evernode-platform) products, developed by core Everscale developer EverX
- [GraphQL API Documentation](https://docs.everos.dev/ever-sdk/reference/ever-os-api)
- [GraphQL API Samples](https://docs.everos.dev/ever-sdk/samples/graphql-samples/quick-start)

## Connect to GraphQL API

Find the best GraphQL API solution for you

### [Evercloud](https://docs.everos.dev/evernode-platform/products/evercloud/get-started)

If you don't want to manage your own nodes, Evernode Cloud Platform - or Evercloud - provides you with Everscale Cloud Infrastructure.

### [Evernode DApp Server (DS)](https://github.com/tonlabs/evernode-ds#evernode-dapp-server-ds)

If you want to run Evernode Platform on your server, Dapp Server is a free community version for that.

### [Evernode Simple Emulator (SE)](https://github.com/tonlabs/evernode-se)

Test your basic Dapp functionality locally. Simple emulator is a light-weight Evernode instance with GraphQL API that suits good for DApp and contract testing in 90% cases.

## Functionality comparison

| Feature                                                  | Evercloud | DS  | SE   |
| -------------------------------------------------------- | --------- | --- | ---- |
| historic data available (transactions, blocks, messages) | yes       | no  | -    |
| blockchain API                                           | yes       | yes | soon |
| collections (blocks, transactions, accounts, messages)   | yes       | yes | yes  |
| aggregations (blocks, transactions, accounts, messages)  | yes       | yes | yes  |
| subscriptions                                            | yes       | yes | yes  |
| token API                                                | 3Q 2022   | no  | no   |
| NFT API                                                  | SOON      | no  | no   |
| statistics                                               | yes       | no  | no   |
| counterparties                                           | yes       | no  | no   |
| zerostates                                               | yes       | yes | no   |

**Get quick help in our telegram channel:**

[![Channel on Telegram](https://img.shields.io/badge/chat-on%20telegram-9cf.svg)](https://t.me/ever_sdk)
