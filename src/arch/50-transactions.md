---
---

# Transactions

Let’s once again recall that all interactions on Evercale network are performed via messages. Messages, in turn, create transactions that modify the account's state. 

## Message

A message consists of: `header` and `body`. The header contains the information about the sender, receiver, value as well as the information required by the validator to apply the message to the block. The message body, in turn, comprises the payload of VM instructions that are necessary for the execution of the smart contract.

There are three types of messages on Everscale:

**Inbound external message** - a message sent from outside onto the Everscale blockchain. It can be sent by any actor outside the blockchain. So-called messages from nowhere. Inbound external messages initiate changes to the blockchain’s state. It is important to mention that external messages can not be value-bearing. They can only declare intent to transfer value to another account.

**Internal message**: a message sent from one contract to another. Like an inbound external message, it updates the blockchain's state. Only internal messages can be value-bearing.

**Outbound external message**: a message that can be emitted by a smart contract. Off-chain participants can subscribe to events within the Everscale network and receive them.

![](../img/tp-1.svg)

## Transaction​

A transaction is the result of an inbound message processing by a recipient account code. That is, when an account receives an inbound message, it leads to the computation of the account's new state and the possibility of generating one or more outbound messages with the account serving as the source. The inbound message and the previous state of the account serve as inputs for the transaction, while the generated outbound messages and the next state of the account serve as outputs. This relationship can be represented as a Directed Acyclic Graph (DAG).

![](../img/tp-2.svg)

## Transaction phases

A transaction is composed of several phases. Each phase may either complete successfully or result in an error. In case of error, the next stage is not completed.

**Storage phase** - is for the collection of storage payments for the account state (smart contract code and data). Throughout this phase, the smart contract may be frozen if its balance is insufficient to pay the storage fee. It is worth mentioning that there is no storage phase if the transaction is sent to deploy a new smart contract.

**Credit phase** - adding the value of the internal message received to the account's balance.

**Computing phase** - starts when the smart contract code is invoked inside an instance of TVM with appropriate parameters, including the inbound message and the account's persistent data. The result of this phase is an exit code, new persistent data, and an action list, which includes outbound messages to be sent. Also, it may end up creating a new account, uninitialized or active, or activating a previously uninitialized or frozen account. The gas fee for computation is deducted from the account balance.

**Action phase** - starts when the actions from the actions list are performed if the smart contract is executed successfully (with exit code 0 or 1). Suppose, it is impossible to perform all the actions. For example, because of insufficient funds to transfer with an outbound message. In that case, the transaction is terminated, and the account state is rolled back.

**Bounce phase** - starts when a transaction is terminated. That is, the inbound message has its bounce flag set. Respectively, there is an automatically generated outbound message, with the bounce flag clear, transferring the funds back to the sender. It takes the value of the original inbound message, deducts gas and forwarding fees and transfers the resulting amount to the newly generated message. 

## Specification

Read more about transactions execution in [Transaction executor](35-executor.md#transaction)
