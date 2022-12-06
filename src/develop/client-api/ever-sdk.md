---
sidebar_position: 1
---

# Ever SDK

Core Client Library built on the EVER OS GraphQL API for Everscale DApp development

**Get quick help in our telegram channel:**

[![Channel on Telegram](https://img.shields.io/badge/chat-on%20telegram-9cf.svg)](https://t.me/ever_sdk)

## Useful links

[Quick Start (Javascript)](https://docs.everos.dev/ever-sdk/quick_start)

[Error descriptions](https://docs.everos.dev/ever-sdk/reference/error_codes)

[JavaScript SDK Types and Methods (API Reference)](https://tonlabs.github.io/ever-sdk-js/)

[Core Types and Methods (API Reference)](https://docs.everos.dev/ever-sdk/reference/types-and-methods/modules)

[Guides](https://docs.everos.dev/ever-sdk/guides/installation)

## What is Core Everscale Client Library

Core Client Library is written in Rust that can be dynamically linked. It provides all heavy-computation components and functions, such as TON Virtual Machine, TON Transaction Executor, ABI-related functions, boc-related functions, crypto functions.

The decision to create the Rust library was made after a period of time using pure JavaScript to implement these use cases.

We ended up with very slow work of pure JavaScript and decided to move all this to Rust library and link it to Javascript as a compiled binary including a wasm module for browser applications.

Also this approach provided an opportunity to easily create bindings for any programming language and platform, thus, to make it possible to develop distributed applications (DApps) for any possible use-cases, such as: mobile DApps, web DApps, server-side DApps, enterprise DApp etc.

Client Library exposes all the functionality through a few of exported functions. All interaction with library is performed using JSON-RPC like protocol.

Library works over [GraphQL API](https://docs.everos.dev/ever-platform/reference/graphql-api) of [EVER OS DApp Server](https://github.com/tonlabs/evernode-ds). So, it can be used to interact directly with [EVER OS Clouds](https://docs.everos.dev/ever-platform/reference/graphql-api/networks).


## How to use library

The simplest way is to use library in then Rust applications because of the native Rust library interface. The Rust interface is clear and well documented.

But what if you are required to use library in languages others than Rust?

You have some options:

* use library module `json_interface` which provides access to library functions through JSON-RPC interface. This interface exports several extern "C" functions. So you can build a dynamic or static link library and link it to your application as any other external libraries. The JSON Interface is fully "C" compliant. You can find description in section [JSON Interface](https://docs.everos.dev/ever-sdk/for-binding-developers/json_interface).
* use bindings already written by EverX and community. Below you can find a list of known bindings.
* write your own binding to chosen language and share it with community.

If you choose using JSON Interface please read this document [JSON Interface](https://docs.everos.dev/ever-sdk/for-binding-developers/json_interface).
Here you can find directions how to use `json_interface` and write your own binding.

## Full docs

Full EVER SDK docs are available at https://docs.everos.dev/ever-sdk/