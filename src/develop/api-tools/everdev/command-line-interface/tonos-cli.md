---
sidebar_position: 4
---

# TONOS-CLI

**Note**: `tonos-cli` is in the process of being rebranded to `everos-cli`

EverDev installs tonos-cli globally, so after the installation is complete, you can access the functionality via command:

```shell
tonos-cli <command> <args>
```
[See the tonos-cli usage documentation](../../tonos-cli.md) or [repository](https://github.com/tonlabs/tonos-cli#how-to-use). 

## Install

This command installs the latest tonos-cli

```shell
everdev tonos-cli install
```
The installer requires NPM to be installed, so it can install packages globally without using sudo.
In case of error, manually set environment variable `PATH=$PATH:$HOME/.everdev/solidity`

## Version

This command shows the used tonos-cli version and list of available for download versions

```shell
everdev tonos-cli version

Version    Available
---------  ------------------------------------------------------
0.8.1      0.6.0, 0.6.1, 0.6.2, 0.7.1, 0.6.3, 0.7.0, 0.8.0, 0.8.1
```

## Set

This command specifies tonos-cli version to use and downloads it if needed.

```shell
everdev tonos-cli set --version 0.8.0
```


## Update

This command updates tonos-cli version to the latest

```shell
everdev tonos-cli update
```

> The documentation in Everscale repository is a community effort. Therefore, everyone can contribute with proposals for new topics, suggest new content elements, participate in editing, and provide ideas that will be of great help for network development. Please be informed that our documentation can be edited via GitHub. It can be found [**here**](https://docs.everscale.network/). 
Please make sure to consult our rules and rewards policy via [**this link**](https://docs.everscale.network/contribute/hot-streams/documentations).  
Also, for any questions that may arise, you can text via this [**Telegram chat**](https://t.me/+C2IpQXWZtCwxYzEy).