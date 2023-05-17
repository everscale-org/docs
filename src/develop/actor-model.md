---
sidebar_position: 3
---

# Actor model

Let's consider one smart contract.

In Everscale, it is a *thing* with properties like address, code, data, balance and others. In other words, it is an object which has some *storage* and *behavior*. That behavior has the following pattern:

- a contract gets a message
- contract handles that event by executing its code in TVM
- contract modifies its own properties (code, data and others)
- contract optionally generates outgoing messages (which may include deployments of other contracts)
- contract goes into standby mode until the next event occurs

A combination of these steps is called a **transaction**. It is important that events are handled one by one, thus *transactions* are strictly ordered and cannot interrupt each other.

This pattern is well known and called `Actor Model`.