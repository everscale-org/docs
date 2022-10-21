---
sidebar_position: 1
---

# Locklift

Locklift is a development environment aiming to help you with Everscale contracts development. With Locklift, you get:

- Network management for working with any networks (main, test, local, ...)
- Automated contract testing with Mocha
- Handy wrapper around Everscale smart contract
- Custom givers support
- Keys management
- External script runner that executes scripts within specified environment

Please follow [this link](https://github.com/broxus/locklift) to start working with Locklift.

This guide will help you figure out how to set up the Locklift environment.

Before all else, please ensure the following are installed:

- Node JS – version 14 or later

Let’s start with create an empty directory for your first project:

```shell
mkdir myfirstconract && cd myfirstconract && npm init
```

Great! Now you can install Locklift.
Use `npm install --save-dev locklift`

```shell
npm install --save-dev locklift

added 168 packages, and audited 169 packages in 13s

22 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Run `npx locklift –version` to make sure that Locklift is successfully installed:

```shell
npx locklift --version
2.3.0
```

## Conclusion

This completes the environment setup.

If you want to continue learning about Locklift and create your first smart contract, please visit the [Deploy smart contract with Locklift page](../firts-touch/locklift-sc.md).
