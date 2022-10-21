---
sidebar_position: 2
---

# EverDev

Everdev is a Node.js package with a CLI interface that allows devs to perform from one interface the following use cases:

- Manage all core Ever OS Developer Tools
- Configure networks (including Local Blockchain, Developer Network, Everscale (main) network): add, configure giver;
- Manage keys: add, remove
- Work with Everscale blockchain from CLI

Please follow [this link](https://www.npmjs.com/package/everdev) to start working with Everdev.

This guide will help you figure out how to set up the EverDev environment.

Before all else, please ensure the following are installed:

- Node JS – version 14 or later

Let’s start with create an empty directory for your first project:

```shell
mkdir my-project && cd $_
npm init --force
```

Now you can install EverDev.
Use `npm install --save-dev everdev`

```shell
npm install --save-dev everdev

added 104 packages, and audited 105 packages in 14s

6 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## Conclusion

This completes the environment setup.

If you want to continue learning about Locklift and create your first smart contract, please visit the [Deploy smart contracts with EverDev page](../firts-touch/everdev-sc.md).