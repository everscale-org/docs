---
description: The TVM, is the virtual machine used to execute smart-contract
---

# TVM

The primary purpose of the Telegram Open Network Virtual Machine (TON VM or TVM) is to execute smart-contract code in the TON Blockchain. TVM must support all operations required to parse incoming messages and persistent data, and to create new messages and modify persistent data. Now TVM, is used to execute smart-contract code in the masterchain(-1 workchain) and in the basechain(0 workchain). Other workchains may use other virtual machines alongside or instead of the TVM. 

The stack principle forms the foundation of TVM, ensuring its efficiency and ease of implementation. TVM also provides a variety of primitives for working with native data types for the TON Blockchain, such as TVM Cells. More information about the structure and operation principles of TVM can be found here – [Telegram Open Network Virtual Machine tvm.pdf](https://docs.everscale.network/tvm.pdf) is the original document designed by Nikolai Durov and modified by the Everscale Team to take into account the current changes in TVM in the Everscale blockchain.

## Additionally

- [TVM Extended Instructions](https://tonlabs.notion.site/tonlabs/TVM-Extended-Instructions-f22fb9a10bec4f8cadd9757e7d6df51d)