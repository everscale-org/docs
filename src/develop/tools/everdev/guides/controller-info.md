---
sidebar_position: 4
title: How to view controller info
---

# How to view controller info

This command displays a summary of all controller configurations.

```
everdev info
```
Output example:

$ everdev info

```
C++ compiler
Component  Version  Available
---------  -------  ---------
clang      7.0.0    7.0.0
Solidity Compiler
Component  Available
---------  ----------------------------------------------
compiler   0.42.0, 0.41.0, 0.40.0, 0.39.0, 0.38.2, 0.38.1
linker     0.3.0, 0.1.0
stdlib     0.42.0, 0.41.0, 0.40.0, 0.39.0, 0.38.2, 0.38.1
TON OS SE
Instance  State          Version  GraphQL Port  Docker Container      Docker Image
--------  -------------  -------  ------------  --------------------  -----------------------
default   not installed  0.27     80            tonlabs-tonos-se-test  tonlabs/local-node:0.27
Network Registry
Network        Endpoints                                        Giver
-------------  -----------------------------------------------  ------------------------------------------------------------------
se             http://localhost                                 0:b5e9240fc2d2f1ff8cbb1d1dee7fb7cae155e5f6320e585fcc685698994a19a5
dev (Default)  net.ton.dev, net1.ton.dev, net5.ton.dev          0:255a3ad9dfa8aa4f3481856aafc7d79f47d50205190bd56147138740e9b177f3
main           main.ton.dev, main2.ton.dev, main3.ton.dev, ...
Signer Registry
Signer          Public Key
--------------  ----------------------------------------------------------------
surf            8534c46f7a135058773fa1298cb3a299a5ddd40dafe41cb06c64f274da360bfb
test (Default)  ad4bf7bd8da244932c52127a943bfa9217b6e215c1b3307272283c4d64f34486
test2           5c2e348c5caeb420a863dc5e972f897ebe5ee899a6ef2a8299aac352eca4380a
TON OS CLI
Component  Version  Available
---------  -------  --------------------------------------------------------------------------------
tonoscli   0.11.3   0.11.4, 0.11.3, 0.11.2, 0.11.1, 0.11.0, 0.10.1, 0.10.0, 0.9.2, 0.9.1, 0.9.0, ...
```

>  The documentation in Everscale repository is a community effort. Therefore, everyone can contribute with proposals for new topics, suggest new content elements, participate in editing, and provide ideas that will be of great help for network development.
Please be informed that our documentation can be [edited via GitHub](https://github.com/everscale-org/docs/issues).  
  Also please make sure to consult our rules and rewards policy via [this link](https://docs.everscale.network/contribute/hot-streams/documentations).  
  Feel free to join [Everscale Documentation Development Telegram chat](https://t.me/+C2IpQXWZtCwxYzEy) and [Everscale Developers Onboarding Telegram chat](https://t.me/+Vca1Gs6uPzIyNWVi)!