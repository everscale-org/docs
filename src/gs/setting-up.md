---
description: Setting up Everscale's development environment
sidebar_position: 1
---

# Setting up environment

The first steps in development can be difficult – because you don't yet know about the tools that can make your tasks easier. Acknowledging this issue, we put at dev's disposal a comprehensive set of instructions explaining how to set up their Everscale workspace. 

## Choosing your Development Environment.

Here, at Everscale, you are supplied with two options for your IDE - Integrated Development Environment. They both comprise the most updated tools for lucrative interaction with the Everscale blockchain. 

- **EverDev**
- **Locklift** 

Before all else, please make sure the following are installed:

- [Node JS](https://nodejs.org/) - version 14 or later
- [Docker](https://www.docker.com/) - version 19 or later 
- Solidity compiler requires VC++ Runtime on Windows. 

You can install it from the latest supported [Visual C++ downloads](https://learn.microsoft.com/en-US/cpp/windows/latest-supported-vc-redist?%3FranMID=46131&ranEAID=a1LgFw09t88&ranSiteID=a1LgFw09t88-a9Ih9XJqZFlrY9RNj_PFgg&epi=a1LgFw09t88-a9Ih9XJqZFlrY9RNj_PFgg&irgwc=1&OCID=AID2200057_aff_7806_1243925&tduid=(ir__3oi9vrhh10kfb2vteoick20kn22xqujzhhjqhive00)(7806)(1243925)(a1LgFw09t88-a9Ih9XJqZFlrY9RNj_PFgg)()&irclickid=_3oi9vrhh10kfb2vteoick20kn22xqujzhhjqhive00&view=msvc-170).

After everything is installed, please proceed with selecting the IDE you prefer more. 

## EverDev

Everdev is a Node.js package with a CLI interface that allows devs to perform from one interface the following use cases:

- Manage all core Ever OS Developer Tools
- Configure networks (including Local Blockchain, Developer Network, Everscale (main) network): add, configure giver;
- Manage keys: add, remove
- Work with Everscale blockchain from CLI

Please follow [this link](https://www.npmjs.com/package/everdev) to start working with Everdev.

## Locklift 

Locklift is a development environment aiming to help you with Everscale contracts development. With Locklift, you get:

- Network management for working with any networks (main, test, local, ...)
- Automated contract testing with Mocha
- Handy wrapper around Everscale smart contract
- Custom givers support
- Keys management
- External script runner that executes scripts within specified environment

Please follow [this link](https://github.com/broxus/locklift) to start working with Locklift.