---
sidebar_position: 1
---

# Environment setup


## Locklift

To improve the development experience, you will need tools and utilities to compile, deploy and test your Everscale contracts. 

Let's consider Locklift as an example tool. It is a development environment like Hardhat or Truffle and it uses the specified T-Sol compiler to build all project contracts.

With Locklift, you get:
- Network management for working with any networks (main, test, local, ...) 
- Automated contract testing
- Handy wrappers around Everscale smart contracts
- Custom givers support
- Keys management
- External script runner that executes scripts within a specified environment

To install Locklift, run the following command line:

```shell
npm install -g locklift
```

## Local node

:::info
You need to have a [docker](https://www.docker.com/) runtime to continue with this.
:::

If Locklift is like a Hardhat development environment tool, then local-node is Ganache- like a local blockchain that is designed for dApp debugging and testing. To run local- node you need to follow this command:

```shell
docker run -d --name local-node -e USER_AGREEMENT=yes -p80:80 tonlabs/local-node
```

The container exposes the specified 80 port with Nginx which proxies requests to /graphql to GraphQL API. Check out the local explorer at http://localhost/ and GraphQL playground at http://localhost/graphql


Once we are all set, the next thing to do is to initialize your first project.

