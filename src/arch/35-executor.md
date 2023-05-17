---
description: Transaction executor functional specification
---

# Transaction executor

## Introduction

Transaction Executor is a crucial part of _Everscale_ blockchain node. It applies incoming messages to accounts, sealing
the end result of this operation into a block in the form of a transaction object.

The Transaction Executor algorithms determine several critical aspects of smart-contracts behavior, such as:

- How a balance of an account is affected after the message gets processed
- What outbound messages will be generated as a result
- Should the account be frozen or deleted?
- What fees should be charged from the accounts balance

To be able to rigorously reason about a smart-contract behavior, it is important to construct the accurate model of this
module, explain the main concepts, define its properties. In other words, make the
groundwork for you, the reader, to foster the integration of this logic into the reasoning framework of your choice.

In the current work, we made the best-effort attempt to write such specification.

## Document Structure

The document consists of two logical parts, intermixed with each other:
the explanation part and the specification part.

The explanation part is done by providing extensive comments for
data structures used through-out the Transaction Executor. The data
structures are presented as Rust code snippets, taken from the
original Node code. Sometimes, we intentionally omit details that
are not relevant to the Transaction Executor, requiring much wider
context to be explained.

The specification part is presented in two flavors. When the
precision is required, we describe the behavior by providing the
pseudo-code implementing some algorithm. For more general
properties, we formulate them in a form of semi-formal statements
about the system behavior.

By comparison to the program implementation, the specification
pseudo-code `overapproximates`  the implementation by throwing away
non-relevant parts of the logic, for example: sophisticated error
handling, non-interesting parts of the state being removed,
introducing reasonable assumptions that greatly simplifies the
logic, etc.

In other words, the pseudo-code shows how the system behaves for
its significant parts, putting away everything else.

## Everscale Platform Architecture

The main actors of the EverScale blockchain are smart-contracts.
Smart-contracts are programs that operate user valuable assets on their behalf. Valuable assets are usually
cryptocurrency tokens or some digital goods, like NFTs.

Smart-contract execution is triggered by a message sent from some other party. If the message was delivered from the
outside world (i.e. from the user program), it is said to be _external_. Otherwise, the message is considered _internal_
.

Smart-contracts may also generate log records called _events_. Those records are used as information signals for an
external observers. They foster communication between smart-contracts and off-chain programs.

#### The platform overall architecture is depicted
```plantuml
title: Everscale blockchain high-level architecture

actor Alice

Alice -> Blockchain: External message

cloud Blockchain {
    agent event
    card transaction {
      agent S1
      agent S2
      S1 -> S2: Internal message
    }
    transaction -> event: Event record
}
```

## Platform Implementation

EverScale blockchain is a database operated by a peer-to-peer network of computing nodes. The database store users code
and data in a form of programmable units called smart-contracts. Smart-contacts may communicate with other contracts and
outside world by sending messages.

The computing node is called blockchain node in our context.

Among other things, blockchain nodes are responsible for storing the smart-contract state, delivering messages from
users and smart-contracts, executing the smart-contacts code when needed.

_Transaction Executor_ module is a part of the blockchain node responsible for proper execution of a smart-contract code
upon receiving a message addressed to that smart-contract. The result of this execution is an updated smart-contract
state and the transaction record that gets sealed into the block candidate.

We now go into details on the internals of this module.

## Transaction Executor Module

In this section, we go into the technical details of Transaction Executor module. The source code of the module is
available [here](https://github.com/tonlabs/ton-labs-executor/tree/a28bde3e65dd35573d34e32aa4477d60162b5338).

### Remark

In our opinion, the name of this module was chosen quite unfortunate. In its current form, it feels like the object being executed is a transaction. This is not true.

Transaction is an outcome of executing a message on a smart-contract state using the Transaction Executor logic. Hence, it is the message that is being executed, not the transaction.

Nevertheless, we stick with the original name not to confuse developers too much.

### Inputs and Outputs

##### The principal architecture of the module is depicted
```plantuml
title: Transaction Executor

card Inputs as in {
  card Message {
  }
  card Account {
  }
  card Params {
  }
}

component "Transaction Executor" as TE

card Outputs as out {
  card Transaction as T
  card "Account'" as Ai
}

in --> TE
TE -> out
```

We now describe each input/output entity in detail, together with the logic of the computation.

### Multichain Architecture

Everscale has a native support for multiple blockchains running in parallel.

Each blockchain might be established by introducing a separate chain called workchain. Each workchain has a unique
integer identifier in a range `-127 ... 127`, the values `-1` and `0` are already
taken. Smart-contracts from different workchains may interact with each other by message passing.

At the moment, the system implements only two workchains — Masterchain (`id -1`) and Workchain (`id 0`).

:::caution
Currently, the creation of new workchains is not supported.
:::

### Multicurrency payments

The native coin of Everscale blockchain is called _EVER_. However, Everscale has an ability to work with other types of
coins. While system payments like gas and storage fees are made only in Evers, the other value transfers may contain
coins of other
currencies. This contrasts with most of other blockchains where there is only a single native cryptocurrency, and other
currencies
may be made only using artificial token smart-contracts.

Currently, this feature is not used widely.

:::caution
In this document, we limit our specification effort only for the case of a single currency — Evers. This choice
significantly simplifies the business logic of the execution handlers.
:::

### Hashing Algorithm

Transaction Executor uses hashing in several places to compactly store data structures fingerprints. It is done in two
steps. First, the data structure gets converted into a tree-like form. Then, a special
hashing algorithm is applied to that tree. The basic hash function used is `SHA256` from [Sha2 Rust
package](https://docs.rs/sha2/latest/sha2/).

The exact hashing algorithm, as well as tree-like representation is not interesting for our purposes, so we do not
consider it here. For details,
check [this](https://github.com/tonlabs/ton-labs-types/blob/af1dc71a9a2b46cb0d55a0956e44726374ba7c0c/src/cell/mod.rs#L841).


## Parameters

Besides, incoming  message and  account, Transaction Executor  has to  have some
external   information  regarding   the   current  blockchain   and
non-blockchain state to support the TVM capabilities.  For example,
it   has   to  know   the   current   time   to  provide   it   for
smart-contracts. It  has to  have some random  seed to  support the
random number generator  facility. All of this is  passed using the
ExecuteParams structure.

```rust
pub struct ExecuteParams {
  pub state_libs: HashmapE,
  pub block_unixtime: u32,
  pub block_lt: u64,
  pub last_tr_lt: Arc<AtomicU64>,
  pub seed_block: UInt256,
  pub debug: bool
}
```

#### ExecuteParams fields
| Field          | Description                                                                          |
|----------------|--------------------------------------------------------------------------------------|
| state_libs     | A set of references to external libraries. This mechanism is not supported currently |
| block_unixtime | Current time in Unix Epoch                                                           |
| block_lt       | Block logical time                                                                   |
| last_tr_lt     | The last transaction logical time                                                    |
| seed_block     | Random number generator seed                                                         |
| debug          | Should the TVM output debug information during its execution                         |

## Transaction

Transaction is an object that describes the successful execution of
a message on the account.  If a message execution results in an error,
such execution does not lead to a transaction creation.  After
transaction is  created, it gets  sealed into the block.  And after
the block  is negotiated  with fellow validators,  it find  its way
into   the   Masterchain.  From   that   point,   it  stays   there
forever[^1].

Transaction is an  output of the Transaction Executor, so we  have to examine it
more closely.

```rust
pub struct Transaction {
   pub account_addr: AccountId,
   pub lt: u64,
   pub prev_trans_hash: UInt256,
   pub prev_trans_lt: u64,
   pub now: u32,
   pub outmsg_cnt: i16,
   pub orig_status: AccountStatus,
   pub end_status: AccountStatus,
   pub in_msg: Option<ChildCell<Message>>,
   pub out_msgs: OutMessages,
   pub total_fees: CurrencyCollection,
   pub state_update: ChildCell<HashUpdate>,
   pub description: ChildCell<TransactionDescr>,
}
```

#### ExecuteParams fields
| Field           | Description                                                               |
|-----------------|---------------------------------------------------------------------------|
| account_addr    | Account identifier                                                        |
| lt              | Transaction creation logical time                                         |
| prev_trans_hash | Previous transaction hash value                                           |
| prev_trans_lt   | Previous transaction logical time                                         |
| now             | Current time in Unix Epoch                                                |
| outmsg_cnt      | Number of generated outbound messages                                     |
| orig_status     | [Account state](40-accounts.md#account-state) upon receiving the message  |
| end_status      | [Account state](40-accounts.md#account-state) after executing the message |
| in_msg          | Processed message                                                         |
| out_msgs        | Set of generated outbound messages                                        |
| total_fees      | Total fee amount for all the processing                                   |
| state_update    | Hash footprint of the account state change                                |
| description     | [Transaction Descriptor](#)                                               |

## Transaction Executor

Transaction Executor module is responsible for applying the incoming message to the destination account, using the supplied parameters. In case of success, Transaction Executor outputs the newly created transaction and the updated account.

The main entry point is the function execute_with_libs_and_params() within transaction_executor.rs module. Other entry points were either flagged as deprecated, or reduce to calling this function after some minor parameters mangling.

The message execution is being done in several phases.

A phase is a logical step during the message execution. It may finish successfully or with an error. In case of an error, the next phase may not be executed. Phases are done mostly in a fixed order, but there are some nuances.

Let us warn you that the phase is not just an implementation detail of the Transaction Executor internals that may be easily discarded. Message execution phases are a part of EverScale smart-contracts programming architecture. It is assumed that you have a good grasp on it, to be able to do proper troubleshooting in case something is not working as expected. Without this knowledge, it may be challenging to debug the problem.

This document aims to support programmers in their strive for this knowledge.

#### Transaction executor message processing general scheme
```plantuml
skinparam padding 10

file Message
Message -> Transaction

queue "Out messages" as OM

card Executor {
  card Transaction {
    agent Credit
    agent Storage
    agent Computer
    agent Action
    agent Bounce

    Credit -> Storage
    Storage -> Computer
    Computer -> Action
    Action -> Bounce
    Bounce -> OM
  }
}
```

- `Credit` — Message coins are put on the balance
  agent Storage.
- `Storage` — Storage fee is deducted from the balance
  agent Computer.
- `Computer` — The contract bytecode gets executed inside TVM with proper parameters. Contract generate Actions.
- `Action` — Generated actions get executed by the action handler, producing outbound messages.
- `Bounce` — Bounce phase is executed if failure happened on compute phase or action phase. It sends back the reply with coins, mostly.
- `Out messages` — Queue get propagated to other validators.

### Transaction Executor Types

There are several type of messages in EverScale. Besides already mentioned ordinary messages, there are also a special type of messages that is a part of a wider protocol. For example, TickTock messages, SplitMerge messages, etc.

For each type of messages, there exists a separate Transaction Executor. In this work, we consider only the OrdinaryTransactionExecutor, that is defined in [ordinary_transaction.rs](https://github.com/tonlabs/ton-labs-executor/blob/a28bde3e65dd35573d34e32aa4477d60162b5338/src/ordinary_transaction.rs).

### Main Entry Point

```rust
fn execute_with_libs_and_params(
    &self,
    in_msg: Option<&Message>,
    account_root: &mut Cell,
    params: ExecuteParams,
) -> Result<Transaction>
```

#### ExecuteParams fields
| Field        | Description                                              |
|--------------|----------------------------------------------------------|
| self         | Reference to the object calling the function             |
| in_msg       | Incoming message [messages](45-message.md)                            |
| account_root | Account record serialized in a form of Cells [account](40-accounts.md) |
| params       | Transaction Executor parameters [parameters](#parameters)           |

As a result, the function  returns either `Ok(Transaction)` object or `Err` value.  Please  note that  besides returning  the Transaction, there is a side-effect of  mutating the `account_root` object. This justifies  our  generalization that  it  returns  two objects:  the transaction and the updated account record.

### BlockchainConfig parameters

Besides  ExecuteParams, the  Transaction Executor  relies on  BlockchainConfig parameters.  They are passed  implicitly, at the Transaction Executor creation time.

BlockchainConfig  is   a  set   of  globally   defined  parameters
regulating  different nuances  of  blockchain  work. For  example,
prices for smart-contract  execution, storage and a  set of system
contract addresses.  The latter  is needed  to let  Transaction Executor apply
special logic for them.

Those parameters are global to the network, and negotiated between
all the validators in advance. They are stored in a special system
smart-contract, in the Masterchain.

```rust
pub struct BlockchainConfig {
  gas_prices_mc: GasLimitsPrices,
  gas_prices_wc: GasLimitsPrices,
  fwd_prices_mc: MsgForwardPrices,
  fwd_prices_wc: MsgForwardPrices,
  storage_prices: AccStoragePrices,
  special_contracts: FundamentalSmcAddresses,
  capabilities: u64,
  global_version: u32,
  raw_config: ConfigParams,
}
```

| Field             | Description                                                       |
|-------------------|-------------------------------------------------------------------|
| gas_prices_mc     | Fees for Masterchain smart-contract execution                     |
| gas_prices_wc     | Fees for Workchain smart-contract execution                       |
| fwd_prices_mc     | Fees for delivering messages in Masterchain                       |
| fwd_prices_wc     | Fees for delivering messages in Workchain                         |
| storage_prices    | Fees for information storage                                      |
| special_contracts | Set of system smart-contract addresses                            |
| capabilities      | Set of operation-mode flags                                       |
| global_version    | Minimum blocks version number allowed to be included in the chain |
| raw_config        | Dictionary with blockchain settings                               |

### Code Execution Fee

As  in  most  of  blockchain,  in Everscale  the  execution  of  a
smart-contract costs money.  Usually, this fee is deduced from the
coins attached to  the message initiating the call,  but there are
nuances.

The fee amount to be deducted from the balance is calculated based
on values found in `gas_price_mc`, `gas_price_wc`  structures. They
are defined as follows:

```rust
pub struct GasLimitsPrices {
  pub gas_price: u64,
  pub gas_limit: u64,
  pub special_gas_limit: u64,
  pub gas_credit: u64,
  pub block_gas_limit: u64,
  pub freeze_due_limit: u64,
  pub delete_due_limit: u64,
  pub flat_gas_limit: u64,
  pub flat_gas_price: u64,
  pub max_gas_threshold: u128,
}
```

| Field             | Description                                                                  |
|-------------------|------------------------------------------------------------------------------|
| gas_price         | Price of 1 unit of gas, expressed in Nano Evers                              |
| gas_limit         | Maximum gas amount for execution of a single message for an ordinary account |
| special_gas_limit | Maximum gas amount for execution of a single message for a system account    |
| gas_credit        | Gas credited for an account to execute the external message                  |
| block_gas_limit   | Maximum gas amount of the whole block                                        |
| freeze_due_limit  | Value of an account debt leading to account freeze                           |
| delete_due_limit  | Value of an account debt leading to account removal                          |
| flat_gas_limit    |                                                                              |
| flat_gas_price    |                                                                              |
| max_gas_threshold |                                                                              |

### Message Passing Fee

Validators do  the work  of message  delivery. To  compensate their
efforts,  account  pays  for  the message  passing.   The  message
passing  fee depends  on BlockchainConfig  parameters `fwd_prices`
and  the message  size.  The  `fwd_prices_mc` and  `fwd_prices_wc`
have the following definition:

```rust
pub struct MsgForwardPrices {
  pub lump_price: u64,
  pub bit_price: u64,
  pub cell_price: u64,
  pub ihr_price_factor: u32,
  pub first_frac: u16,
  pub next_frac: u16,
}
```

The fee amount is calculated using the expression:

$$msg\_fwd\_fees  =  lump\_price   +  bit\_price  \times msg.bits + cell\_price \times msg.cells$$

Here, `msg.bits` — bit-length of  the message body, `msg.cells` is a total amount of cells that this message consists of.

### Data Storage Fee

In Everscale, account is charged a  fee for storing the data.  The
fee amount is calculated using the formula:

$$fee = (cells * prices.cell\_price + bits * prices.bit\_price) * \Delta$$

$\Delta$ —  the time interval  between now and the  latest payment
moment, measured in  seconds. Here, we assume  that storage prices
stay constant  during the $\Delta$ interval. The storage fee gets
charged on each message processing [storage_phase](#storage-phase).

For  greater  flexibility,  the  storage  prices  may  be  changed
depending on  the current supply/demand  situation. It is  done by
negotiating new blockchain  config parameters $prices.cell\_price$
and $prices.bit\_price$ among  validators. After validators accept
it,  new   parameters  are  written  in   the  Masterchain  config
smart-contract.

After the  change, previous price  parameters do no get  lost. The
whole history  of storage price  changes is stored in  the config.
It is done to provide precise  calculation of the storage fee that
take into  account all  the price changes  during the  interval of
calculation.

#### Data Storage Fee Calculation

Here we describe the storage fee calculation expression in its generality.

Lets assume we have the following list of prices equipped
with a timestamp of a moment when the price change took place:

$T = \{ t_0, t_1, ..., t_N \}$

$Pr = \langle (pr_0, t_0), (pr_1, t_1), ..., (pr_N, t_N) \rangle$

Here, `pr_0` is reserved for the initial prices set in the genesis block of the blockchain, and $t_0$ is a timestamp of
those initial prices being set.

Let `now` denote the current  timestamp, i.e. the moment of time when we want to calculate the storage fee, measured in Unix Epoch.

Its value is always greater or equal than the most recent price change timestamp.

Let `last_paid` denote  the timestamp of  the latest  storage
payment. If the payment didn't take place, $last\_paid = 0$.

To simplify  the calculation formula,  let us introduce a new list
$Pr'$, such that:

$Pr' = \langle  (pr_k, t_k), ..., (pr_N, t_N)  \rangle$

where `t_k` is the  least timestamp among values $t_1 ...  t_N$ that is `greater`  than  `last_paid`.

$t_k = min \{ t_i | t_i \in T \land t_i > last\_paid \}$

In  other words, the  values $t_k, ...,  t_N$ form  a subset  of
`T` where each  value is  strictly greater than `last_paid`.

We also add two more elements  from the left and the right:

$Pr'' =  \langle  (pr_k, last\_paid)  \rangle  \cdot  Pr' \cdot  \langle
(pr_N,   now)  \rangle$

Here, dot operator denotes lists concatenation operation.

We  use the following shortcuts: $pr_i = fst(Pr''_i)$ the first element  of a two-element tuple, and $t_i = snd(Pr''_i)$, the second element.

The total storage fee for the time interval is:

$total\_storage\_fee = \sum_{i=1..|Pr''|}{(cells * pr_{i}.cell\_price + bits * pr_{i}.bits\_price) * (t_i - t_{i-1})}$

#### Data Storage Fee Calculation Algorithm

For greater  convenience, besides  having the formula,  we provide
the pseudo-code for  the algorithm `calc_storage_fee`, implemented
in imperative fashion.

**_Input:_**
- `config` — current blockchain configuration, has type [BlockchainConfig](#blockchainconfig-parameters)
- `storage_info` — the account storage info struct, has type [StorageInfo](40-accounts.md#account-storage).
- `is_masterchain` — is the account inhabits Masterchain or not, has type Bool
- `now` — current time, measured in Unix Epoch, has type UInt

**_Output_**:
- fee — the fee amount to be deducted from the account balance, has type UInt
- storage_info — updated account storage info, has type [StorageInfo](40-accounts.md#account-storage)

```python
def calc_storage_fee(config, storage_info, is_masterchain, now):
    cells = storage_info.used.cells
    bits = storage_info.used.bits
    last_paid = storage_info.last_paid
    prices = config.storage_prices   # see AccStoragePrices
  
    assert len(prices) > 0
  
    if now <= last_paid or last_paid == 0 or now <= prices[0].utime_since:
        return 0
  
    fee = 0
  
    # calculate the fee according to prices that were actual
    # during the specific period of time
    for i in len(prices):
        cur_price = prices[i]
        if i < len(prices) - 1:
            end = prices[i + 1].utime_since
        else:
            end = now_time
  
        if end >= last_paid:
            delta = end - max(cur_price.utime_since, last_paid)
            if is_masterchain:
                fee += (cells * cur_price.mc_cell_prices_ps + \
                    bits * cur_price.mc_bit_price_ps) * delta
            else:
                fee += (cells * cur_price.cell_price_ps + \
                    bits * cur_price.bit_price_ps) * delta
  
    storage_info.last_paid = end
  
    return (fee, storage_info)
```

### Special Smart-Contracts

In Everscale blockchain, there is  a set of  smart-contracts that have a  distinguished status in  the system. For  those contracts, validators are obligated  to process their execution in a special priveledged  manner. Such  smart-contracts are called `special` or `system`. Accounts storing those contracts are called the same.

Special smart-contracts enjoy the following privilege:

- No fee gets deducted for the code execution
- No fee gets deducted for the storage use
- No fee gets deducted for message passing
- It has a special maximum gas limit, see `GasLimitsPrices.special_gas_limit`
- Allowed to process `TickTock` timer messages

Upon executing a  message for one of those  special contracts, the Transaction Executor has to apply all those conditions.

:::caution
In this document, we mainly focus on ordinary accounts, leaving the special accounts processing details aside.
:::

### GlobalCapabilities Options

There  are  several  flags   defining  different  aspects  of  the blockchain   node   operation   mode.    They   are   defined   in GlobalCapabilities enumeration.

| Parameter                 | Description                                                                                           |
|---------------------------|-------------------------------------------------------------------------------------------------------|
| CapCreateStatsEnabled     | Allow update block statistics. Not related to Transaction Executor.                                   |
| CapBounceMsgBody          | Include the first 256 bits of the original message in the bounce message body.                        |
| CapReportVersion          | Include the blockchain version info into the block.                                                   |
| CapShortDequeue           | Some special mode of managing outbound messages by the Validator. Not related to Transaction Executor |
| CapFastStorageStat        | Use alternative algorithm to update the structs AccountsStat.                                         |
| CapInitCodeHash           | Use the field init_code_hash in the AccountState.                                                     |
| CapOffHypercube           | Turn off Hypercube routing algorithm for message delivery                                             |
| CapMycode                 | Provide the virtual machine with the code of a smart-contract being executed.                         |
| CapMbppEnabled            | Not used                                                                                              |
| CapIhrEnabled             | Not used                                                                                              |
| CapSplitMergeTransactions | Not used                                                                                              |

### RawConfig options

Besides already  mentioned options, there  are yet another  set of options residing in the `BlockchainConfig.raw_config`. This field has the following structure:

```rust
pub struct ConfigParams {
  pub config_addr: UInt256,
  pub config_params: HashmapE // <u32, SliceData>
}
```

- `config_addr` — is the configuration smart-contract account identifier (the workchain identifier equals - 1);
- `config_params` — dictionary with parameters, dictionary keys refers to an option number. We will not go deep into those options, because they are not relevant to our work.

See [ton-labs-block/src/config_params.rs](https://github.com/tonlabs/ton-labs-block/blob/4b34a73619b53ebda37f3cb6cc44d26925053219/src/config_params.rs#L38) for further investigation.

### Error Code Enumeration

When Transaction Executor encounters an error during message processing, it returns a special answer to the calling side. The answer contains an error code. Here we list possible error codes and their short description. In our further discussion, we rely on those mnemonic names.

### Error Code Enumeration

When Transaction Executor encounters an error during message processing, it returns a special answer to the calling side. The answer contains an error code. Here we list possible error codes and their short description. In our further discussion, we rely on those mnemonic names.

| Error Mnemonic Name     | Description                                                                             |
|-------------------------|-----------------------------------------------------------------------------------------|
| InvalidExtMessage       | Incorrect format of an incoming external message                                        |
| TrExecutorError(e)      | Wide range of errors during message processing                                          |
| TvmExceptionCode(e)     | TVM produced exception e during byte-code execution                                     |
| NoAcceptError           | The smart-contract did not accept external message                                      |
| NoFundsToImportMsg      | Not enough funds to process external message                                            |
| ExtMsgComputeSkipped(r) | During the external message processing, the Compute phase was skipped with the reason r |

### Account State Update

In the transaction object, there is a special field reflecting the change of the account state, the `state_update` field of type `HashUpdate`.

The type is defined as follows:

```rust
pub struct HashUpdate {
  pub old_hash: UInt256,
  pub new_hash: UInt256,
}
```

Here `old_hash` refers to a hash value taken from the initial account state, before message processing; the `new_hash` is a hash taken from the updated account state, after successful message processing.

### Transaction Description Object

During the incoming message processing, Transaction Executor constructs the report about the processing. This report has a special name — Transaction Description,
and defined by the following structure:

```rust
pub struct TransactionDescrOrdinary {
  pub credit_first: bool,
  pub storage_ph: Option<TrStoragePhase>,
  pub credit_ph: Option<TrCreditPhase>,
  pub compute_ph: TrComputePhase,
  pub action: Option<TrActionPhase>,
  pub aborted: bool,
  pub bounce: Option<TrBouncePhase>,
  pub destroyed: bool
}
```

This description object may be used for fast checkups on the main system invariants, critical for its safety, during runtime.

| Field         | Description                                                           |
|---------------|-----------------------------------------------------------------------|
| storage_ph    | [Storage phase descriptor](#storage-phase-descriptor)                 |
| credit_ph     | [Credit phase descriptor](#credit-phase-descriptor)                   |
| compute_ph    | [Compute phase descriptor](#compute-phase-descriptor)                 |
| action        | [Action phase descriptor](#action-phase-descriptor)                   |
| bounce        | [Bounce phase descriptor](#bounce-phase-transaction-descriptor)       |
| credit_first  | Credit phase was executed before Storage phase                        |
| aborted       | Is Action phase failed                                                |
| destroyed     | Is account `deleted`  after message execution                         |

We now describe each descriptor separately.

#### Storage Phase Descriptor

```rust
pub struct TrStoragePhase {
  pub storage_fees_collected: Grams,
  pub storage_fees_due: Option<Grams>,
  pub status_change: AccStatusChange
}
```

- `storage_fees_collected` denotes the amount of tokens deducted from the account balance to cover the storage fee.
- `storage_fees_due` denotes the debt value, if there is any. Otherwise, this value equals `None`.
- `status_change` denotes the possible account status change. It may
 have been the case that the status were frozen or deleted due to
 having a significant debt value. Possible values are:

```rust
pub enum AccStatusChange {
  Unchanged,
  Frozen,
  Deleted,
}
```

#### Credit Phase Descriptor

The Credit Phase descriptor is defined as follows:

```rust
pub struct TrCreditPhase {
  pub due_fees_collected: Option<Grams>,
  pub credit: CurrencyCollection,
}
```

| Field                | Description                                                                                                                                                                             |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `due_fees_collected` | Amount of coins deducted from the message balance to cover the debt of the account, if any existed at the _beginning of the credit phase_. If there were no debt, the value is `None` . |
| `credit`             | Message value after the fees were conducted from it.                                                                                                                                    |

#### Compute Phase Descriptor

Compute Phase descriptor is defined with the following enumeration:

```rust
pub enum TrComputePhase {
  Skipped(TrComputePhaseSkipped),
  Vm(TrComputePhaseVm)
}
```

##### Choice 1. Skipped

If the Compute phase was not successfully performed, the descriptor value is `Skipped`
in this case. It should have an argument with following type:

```rust
pub struct TrComputePhaseSkipped {
  pub reason: ComputeSkipReason
}
```

`reason` has to be one of the following:

```rust
pub enum ComputeSkipReason {
  NoState,
  BadState,
  NoGas,
}
```

| Field           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| NoState         | Caused by the following conditions: 1) The account did not exist by the time of message arrival, and the incoming message did not contain the `StateInit` part; 2) The account was not initialized and the incoming message did not contain the `StateInit`  part.                                                                                                                                                                                                   |
| NoState         | Caused by the following conditions: 1) The account did not exist by the time of message arrival, and the incoming message did not contain the `StateInit` part; 2) The account was not initialized and the incoming message did not contain the `StateInit`  part.                                                                                                                                                                                                   |
| BadState        | Caused by the following conditions: 1) The account was in `AccStateUninit` state, the message did contain the `StateInit` part, but an attempt to initialize the account with the given `StateInit` failed due to being inconsistent with the account; 2) The account was in `AccStateFrozen` state, the message contained the `StateInit` part, but an attempt to unfreeze the account with the given state init failed due to being inconsistent with the account. |
| NoGas           | Caused by the following conditions: 1) After Credit and Storage phases, the account balance had no coins: its balance equals zero; 2) Values `gas_limit` and `gas_credit`, calculated with the [init_gas](#initial-gas-algorithm) algorithm, both equals 0.                                                                                                                                                                                                                        |

##### Choice 2. Successful computation

Successful Compute phase result is defined by the following `TrComputePhaseVm`  structure:

```rust
pub struct TrComputePhaseVm {
  pub success: bool,
  pub msg_state_used: bool,
  pub account_activated: bool,
  pub gas_fees: Grams,
  pub gas_used: VarUInteger7,
  pub gas_limit: VarUInteger7,
  pub gas_credit: Option<VarUInteger3>,
  pub mode: i8,
  pub exit_code: i32,
  pub exit_arg: Option<i32>,
  pub vm_steps: u32,
  pub vm_init_state_hash: UInt256,
  pub vm_final_state_hash: UInt256
}
```

| Field               | Description                                                                                   |
|---------------------|-----------------------------------------------------------------------------------------------|
| success             | Compute phase completion status. See [compute_phase_success](#compute-phase-success-conditions)                                |
| gas_fees            | Fees for the gas used by a smart-contract execution, [see here](#calculate-gas-fee-algorithm)                 |
| gas_used            | An exact amount of gas used by the VM during the execution                                    |
| gas_limit           | A strict upper bound on the amount of gas allowed for this account [init_gas](#initial-gas-algorithm)               |
| gas_credit          | An amount of gas credited to be used for external messages before being accepted [init_gas](#initial-gas-algorithm) |
| vm_steps            | Number of steps performed by the VM                                                           |
| exit_code           | Computation exit code, see [compute_phase_exitcode](#compute-phase-exit-code)                                         |
| exit_arg            | Computation exit argument, see [compute_phase_exitcode](#compute-phase-exit-code)                                     |
| mode                | Always equals 0                                                                               |
| vm_init_state_hash  | Not used                                                                                      |
| vm_final_state_hash | Not used                                                                                      |
| msg_stated_used     | Not used                                                                                      |
| account_activated   | Not used                                                                                      |

#### Action Phase Descriptor

Action Phase descriptor is defined as follows:

```rust
pub struct TrActionPhase {
  pub success: bool,
  pub valid: bool,
  pub no_funds: bool,
  pub status_change: AccStatusChange,
  pub total_fwd_fees: Option<Grams>,
  pub total_action_fees: Option<Grams>,
  pub result_code: i32,
  pub result_arg: Option<i32>,
  pub tot_actions: i16,
  pub spec_actions: i16,
  pub skipped_actions: i16,
  pub msgs_created: i16,
  pub action_list_hash: UInt256,
  pub tot_msg_size: StorageUsedShort,
}
```

| Field             | Description                                                                                                      |
|-------------------|------------------------------------------------------------------------------------------------------------------|
| success           | Action phase completed successfully. The success condition is described [here](#action-phase-success-condition).            |
| valid             | Action phase is valid. The validity condition is described [here](#action-phase-validity-condition).                           |
| result_code       | Action phase failed with the result code, see [action_result_codes](#action-result-codes). In case of success, the value equals to 0 |
| result_arg        | In case of an error, the item number of an action in the action list that caused the error                       |
| no_funds          | True if the error was caused by a balance insufficiency                                                          |
| status_change     | Equals AccStatusChange::Deleted in case of the account being deleted after processing actions                    |
| total_fwd_fees    | Total fees for the SendMsg actions processing                                                                    |
| total_action_fees | Total fees for the whole action list processing                                                                  |
| tot_actions       | Total number of actions in the action list at a beginning of the Action phase                                    |
| spec_actions      | Number of special actions, i.e. Reserve, SetCode, SetLib                                                         |
| msg_created       | Number of successful SendMsg actions                                                                             |
| action_list_hash  | Hash of action list calculated at a beginning of the Action phase                                                |
| tot_msg_size      | Total size of all the generated messages                                                                         |
| skipped_actions   | Not used                                                                                                         |

#### Action Result Codes

| Result Code                           | Description                                                                                                                         |
|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| RESULT_CODE_ACTIONLIST_INVALID        | Message serialization error                                                                                                         |
| RESULT_CODE_TOO_MANY_ACTIONS          | Contract generated more actions than allowed. Maximum actions count is 255                                                          |
| RESULT_CODE_UNKNOWN_OR_INVALID_ACTION | Binary serialization error, or invalid flags. See [remarks](#remarks).                                                            |
| RESULT_CODE_INCORRECT_SRC_ADDRESS     | Wide source address [address](40-accounts.md#account-address), or the source address does not equal to the account address                                        |
| RESULT_CODE_INCORRECT_DST_ADDRESS     | Incorrect destination address, or destination workchain is not allowed to receive messages, or destination workchain does not exist |
| RESULT_CODE_ANYCAST                   | Destination address of type Anycast. It is no longer supported and considered an error.                                             |
| RESULT_CODE_NOT_ENOUGH_GRAMS          | Insufficient balance. See [remarks](#remarks).                                                                                    |
| RESULT_CODE_NOT_ENOUGH_EXTRA          | [Extra-tokens](#multicurrency-payments) balance is insufficient to execute to action                                                          |
| RESULT_CODE_INVALID_BALANCE           | Reserve action lead to an error, or outgoing message is too big to process                                                          |
| RESULT_CODE_BAD_ACCOUNT_STATE         | Actions SetCode or ChangeLib lead to an error                                                                                       |
| RESULT_CODE_UNSUPPORTED               | SendMsg action has incorrect flags set                                                                                              |

##### Remarks:

1. `RESULT_CODE_UNKNOWN_OR_INVALID_ACTION`  reasons are:
  - Actions serialization error
  - SendMsg action has invalid flags, that is:
    - The mutually exclusive flags are set: `SENDMSG_REMAINING_MSG_BALANCE` and `SENDMSG_ALL_BALANCE`
    - Message was sent with an unknown flag [sendmsg_flags](#action-sendmsg);
    - The flag `SENDMSG_DELETE_IF_EMPTY` is set, but the flag `SENDMSG_ALL_BALANCE`  isn't;
  - Reserve action has invalid flags
    - Unknown flag is set
    - Flag `RESERVE_PLUS_ORIG` is set, but `RESERVE_REVERSE`  isn't
2. `RESULT_CODE_NOT_ENOUGH_GRAMS`  reasons are:
  - For SendMsg action, the flag `SENDMSG_REMAINING_MSG_BALANCE` is set, but `SENDMSG_PAY_FEE_SEPARATELY`  isn't
  - Message balance is insufficient to cover message delivery fees
  - Account balance is insufficient to cover all message delivery fees

#### Bounce Phase Transaction Descriptor

Bounce Phase descriptor is defined with the following enumeration:

```rust
pub enum TrBouncePhase {
  Negfunds,
  Nofunds(TrBouncePhaseNofunds),
  Ok(TrBouncePhaseOk),
}
```

- `Negfunds` choice is not used.
- `Nofunds(TrBouncePhaseNofunds)` denotes the insufficiency of account balance, details are put into the parameter value
- `Ok(TrBouncePhaseOk)` denotes success, i.e. that the bounce message has been formed and put into the Msg queue. Details of the phase are put into the parameter value.

##### Choice 1. Nofunds

```rust
pub struct TrBouncePhaseNofunds {
  pub msg_size: StorageUsedShort,
  pub req_fwd_fees: Grams,
}
```

- `msg_size`  denotes the size of generated bounce message. This value is not used.
- `req_fwd_fees`  denotes the fee for the message delivery.

##### Choice 2. Ok(TrBouncePhaseOk)

```rust
pub struct TrBouncePhaseOk {
  pub msg_size: StorageUsedShort,
  pub msg_fees: Grams,
  pub fwd_fees: Grams,
}
```

- `msg_size`  not used.
- `fwd_fees`  is a full forwarding fee for the bounce message.
- `msg_fees` is a part of `fwd_fees`  that goes to the validator processing the message.

## Actions

After successfully executing a  smart-contract code, the TVM virtual
machine provides  the executor  with updated  contract state  and a
list of actions to be further processed.

In our  context, an action refers  to an order for  the Transaction Executor to
perform  a  distinguished  stateful  act. It  could  be  sending  a
message, changing  the smart-contract's code or  reserving coins on
the balance.

### Type of Actions

Here we provide a set of possible actions, with the description. We
go deep on each of them further.

```rust
pub enum OutAction {
  None, // default value
  SendMsg {
    mode: u8,
    out_msg: Message,
  },
  SetCode {
    new_code: Cell,
  },
  ReserveCurrency {
    mode: u8,
    value: CurrencyCollection,
  },
  ChangeLibrary {
    mode: u8,
    code: Option<Cell>,
    hash: Option<UInt256>,
  }
}
```

| Action            | Description                                                      |
|-------------------|------------------------------------------------------------------|
| `SendMsg`         | Send the message out_msg to some account using the provided mode |
| `ReserveCurrency` | Manage the account's balance to guarantee its sufficiency        |
| `SetCode`         | Change the contract byte-code with the given new_code            |
| `ChangeLibrary`   | Update code library                                              |

### Action SendMsg

$SendMsg(mode,out_msg)$ action sends a message to an account. The message $out\_msg$ contains
the destination address as well as the payload to be delivered.

This action has a lot of  modes that can be combined using logical
`OR`  operator. Some mode combinations are prohibited. See [rc_remarks](#remarks).

| Mode                            | Value | Description                                                                                                              |
|---------------------------------|-------|--------------------------------------------------------------------------------------------------------------------------|
| `SENDMSG_ORDINARY`              |     0 | Send the message. Without other modes, the forwarding fee for the delivery is paid by the receiver.                      |
| `SENDMSG_PAY_FEE_SEPARATELY`    |     1 | Send the message. The forwarding fee is paid by the sender.                                                              |
| `SENDMSG_IGNORE_ERROR`          |     2 | If an error occurs during the processing of this action, ignore it.                                                      |
| `SENDMSG_DELETE_IF_EMPTY`       |    32 | The account gets deleted if, after the action processed, the balance becomes zero                                        |
| `SENDMSG_REMAINING_MSG_BALANCE` |    64 | The message should carry all the remaining value of the inbound message additionally to the value specified in the field |
| `SENDMSG_ALL_BALANCE`           |   128 | The message should carry all the remaining balance of the account, instead of the value specified in the value field     |

### Action ReserveCurrency

$ReserveCurrency(mode, val)$ action makes a coin reserve on the balance. This action has several modes of operation.
Modes can be combined.

| Mode                   | Value | Description                                                                                    |
|------------------------|-------|------------------------------------------------------------------------------------------------|
| `RESERVE_EXACTLY`      |     0 | Reserve exactly $val$ coins                                                                    |
| `RESERVE_ALL_BUT`      |     1 | Reserve $acc\_balance - val$ coins, where $acc\_balance$ is a remaining balance of the account |
| `RESERVE_IGNORE_ERROR` |     2 | Skip the action on failure                                                                     |
| `RESERVE_PLUS_ORIG`    |     4 | Reserve $acc\_balance + val$ coins. It should be used only with RESERVE_REVERSE.               |
| `RESERVE_REVERSE`      |     8 | Reverse value of $val$ in the calculation of the reserve, i.e. substitute $val$ with $-val$    |

### Action SetCode

Currently, we skip this action.

## Message Processing Algorithm

In this section, we present a pseudo-code for incoming message processing algorithm.

The algorithm is divided in two mutually exclusive parts:

- `ExecuteInternalMessage` — internal message execution [internal_message_processing](#internal-message-processing-algorithm)
- `ExecuteExternalMessage` — external message execution [external_message_processing](#external-message-processing-algorithm)

Both algorithms rely on executing some or all of the phases:

- Credit phase [credit_phase](#credit-phase)
- Storage phase [storage_phase](#storage-phase)
- Compute phase [compute_phase](#compute-phase)
- Action phase [action_phase](#action-phase)
- Bounce phase [bounce_phase](#bounce-phase)

Please  note that  we consider  only `ordinary`   accounts here. The algorithm  for  executing  messages   on  special  accounts  is  not considered.

**_Input:_**
- `in_msg` — incoming message, has type [Message](45-message.md)
- `account` — account, has type [Account](40-accounts.md)
- `params` — executor parameters, has type [Parameters](#parameters)
- `config` — blockchain configuration, has type [BlockchainConfig](#blockchainconfig-parameters)

**_Output:_**

On success, returns _Ok(acc1, trans)_, such that:
- `acc1` — updated account, has type [Account](40-accounts.md)
- `trans` — transaction, has type [Transaction](#transaction)

On error, returns error of the type `ExecutorError`

**_Modifies:_**

```python
def ExecuteMessage(in_msg, account, params, config):
if in_msg.header is ExtOutMsgInfo:
return ExecutorError.InvalidExtMessage
if in_msg.header.dst == None:
return ExecutorError.TrExecutorError()
if in_msg.header is ExtInMessageHeader and account.balance == 0:
return ExecutorError.NoFundsToImportMsg()

      acc = account.clone()

      if in_msg.header is ExtInMsgInfo:
          return ExecuteExternalMessage(in_msg, acc, params, config)
      elif in_msg.header is IntMsgInfo:
          return ExecuteInternalMessage(in_msg, acc, params, config)

      return ExecutorError.TrExecutorError()
```

## Internal Message Processing Algorithm

At this point, the message is known to be internal. Execute it with the given account.

**_Input:_**

- `in_msg` — incoming message, has type  [Message](45-message.md)
- `account` — account, has type [Account](40-accounts.md)
- `params` — executor parameters, has type [Parameters](#parameters)
- `config` — blockchain configuration, has type [BlockchainConfig](#blockchainconfig-parameters)

**_Output:_**

On success, returns _Ok(acc1, trans)_, such that:

- `acc1` — updated account, has type [Account](40-accounts.md)
- `trans` — transaction, has type [Transaction](#transaction) On error, returns error of the type _TransactionExecutor.TrExecutorError_

*_Modifies_:*

- `account`

```python
def ExecuteInternalMessage(in_msg, account, params, config):
acc_balance = account.balance
msg_balance = in_msg.hdr.value
credit_first = not in_msg.hdr.bounce
lt = max(account.last_tr_time, max(params.last_tr_lt, in_msg.lt + 1))
tr = Transaction(account.account_id, account.status, lt, now(), in_msg)
descr = TransactionDescrOrdinary(credit_first: credit_first)

      # If the bounce flag is not set, execute the Credit Phase
      # before Storage phase
      if credit_first:
          credit_ph_res = credit_phase(account, tr, msg_balance, acc_balance)
          if credit_ph_res is Ok:
              descr.credit_ph = credit_ph_res.credit_ph
          else:
              return ExecutorError.TrExecutorError()

      # Execute Storage Phase
      storage_ph_res = storage_phase(account,
                                     acc_balance,
                                     tr,
                                     is_masterchain,
                                     config)
      descr.storage_ph = storage_ph_res.storage_ph

      # Why this is needed?
      if credit_first and (msg_balance > acc_balance):
          msg_balance = acc_balance

      original_acc_balance = account.balance - tr.total_fees

      if not credit_first:
          credit_ph_res = credit_phase(account, tr, msg_balance, acc_balance)
          if credit_ph_res is Ok:
              descr.credit_ph = credit_ph_res.credit_ph
          else:
              return ExecutorError.TrExecutorError()

      # Both storage and credit phases are completed at this point.
      # We need to update the last_paid field not to loose this
      # information in case of some further errors showing up.
      account.last_paid = params.block_unixtime

      # Parameters to be passed into TVM
      smci = build_contract_info(acc_balance,
                                 account.address,
                                 params.block_lt,
                                 lt,
                                 params.seed_block)
      # First element is the bottom of the stack
      stack = Stack([acc_balance, msg_balance, Cell(in_msg), in_msg.body, False])

      # Execute Compute Phase
      compute_ph_res = compute_phase(in_msg,
                                     account,
                                     acc_balance,
                                     msg_balance,
                                     params.state_libs,
                                     smci,
                                     stack,
                                     is_masterchain)

      if not (compute_ph_res is Ok):
          return ExecutorError.TrExecutorError()

      descr.compute_ph = compute_ph_res.compute_ph
      actions = compute_ph_res.actions
      new_data = compute_ph_res.new_data

      # Generated outbound messages to be sent into other accounts
      out_msgs = []

      compute_gas_fees = descr.compute_ph.gas_fees
      tr.total_fee = tr.total_fee + compute_gas_fees

      if descr.compute_ph.success:
          act_phase_res = action_phase(tr,
                                       account,
                                       original_acc_balance,
                                       acc_balance,
                                       msg_balance,
                                       phase.gas_fees,
                                       actions,
                                       new_data)
          if act_phase_res is Ok:
              descr.action = act_phase_res.action_ph
              out_msgs = act_phase_res.msgs
          else:
              return ExecutorError.TrExecutorError()

      if descr.action != None:
          if descr.action.status_change == AccStatusChange.Deleted:
              account = Account()
              descr.destroyed = True
          descr.aborted = not descr.action.success
      else:
          descr.aborted = True

      # If the Action Phase failed, and the incoming message allows
      # bounce answer, execute the Bounce Phase
      if (descr.aborted == True) and (in_msg.hdr.bounce = True):
          if descr.compute_ph is Vm:
              bounce_ph_res = \
                  bounce_phase(msg_balance,
                               acc_balance,
                               compute_gas_fees,
                               tr,
                               my_addr)
              if bounce_ph_res is Ok:
                  descr.bounce = bounce_ph_res.bounce_ph
                  if (bounce_ph_res.bounce_msg != None):
                      out_msgs = out_msgs + [bounce_ph_res.bounce_msg]
              else:
                  return ExecutorError.TrExecutorError()
          if descr.bounce is Ok:
              acc_balance = original_acc_balance
              if account.status == AccountStatus.AccStateUninit and \
                 acc_balance == 0:
                  account = Account()
              else:
                  if account.is_none() and acc_balance != 0:
                      account = Account.uninit(is_msg.hdr.dst, 0, last_paid,
                                               acc_balance)

      if account.status() == AccountStatus.AccStateUninit and acc_balance == 0:
          account = Account()

      tr.acc_end_status = account.status
      account.balance = acc_balance
      params.last_tr_lt = lt

      upd_lt = add_messages(tr, out_msgs, params.last_tr_lt)
      account.last_tr_time = upd_lt
      tr.descr = descr
      return Ok(tr, account)
```

The function `add_messages`  assigns  the proper logical timestamp for
each  message from  the  out_msgs collection,  and  then include  the
message into the transaction.

```python
def add_messages(tr, out_msgs, lt):
lt_next = lt + len(out_msgs) + 1
lt_next += 1

       for msg in out_msgs:
           msg.at = now()
           msg.lt = lt
           tr.add_out_message(msg)
           lt_next += 1

       return Ok(lt_next)
```

## External Message Processing Algorithm

The execution of external message on the given account.

**_Input:_**

- `in_msg` — incoming message, has type [Message](45-message.md)
- `account` — account, has type [Account](40-accounts.md)
- `params` — executor parameters, has type [Parameters](#parameters)
- `config` — blockchain configuration, has type [BlockchainConfig](#blockchainconfig-parameters)

**_Output:_**

On success, returns _Ok(acc1, trans)_, such that:

- `acc1` — updated account, has type [Account](40-accounts.md)
- `trans` — transaction, has type [Transaction](#transaction) On error, returns error of the type _TransactionExecutor.TrExecutorError_

*Modifies:*
- `account`

```python
def ExecuteExternalMessage(in_msg, account, params, config):
acc_balance = account.balance
msg_balance = in_msg.hdr.value
is_masterchain = (in_msg.dst_workchain_id == -1)

      lt = max(account.last_tr_time, max(params.last_tr_lt, in_msg.lt + 1))
      tr = Transaction(account.account_id, account.status, lt, now(), Cell(in_msg))
      descr = TransactionDescrOrdinary(credit_first: True)
      in_fwd_fee = fwd_fee(Cell(in_msg))

      if acc_balance < in_fwd_fee:
          return ExecutorError.NoFundsToImportMsg

      tr.total_fee = tr.total_fee + in_fwd_fee

      # Execute Storage Phase
      storage_ph_res = storage_phase(account,
                                     acc_balance,
                                     tr,
                                     is_masterchain,
                                     config)
      descr.storage_ph = storage_ph_res.storage_ph

      if account.balance >= tr.total_fees:
          original_acc_balance = account.balance - tr.total_fees
      else:
          original_acc_balance = account_balance

      # Credit Phase is skipped for external messages

      # Storage phase is completed at this point
      # We need to update the last_paid field not to loose this
      # information in case of some further errors showing up
      account.last_paid = params.block_unixtime

      # Parameters to be passed into TVM
      smci = build_contract_info(acc_balance,
                                 account.address,
                                 params.block_lt,
                                 lt,
                                 params.seed_block)
      # First element is the bottom of the stack
      stack = Stack([acc_balance, msg_balance, Cell(in_msg), in_msg.body, False])

      # Execute Compute Phase
      compute_ph_res = compute_phase(in_msg,
                                     account,
                                     acc_balance,
                                     msg_balance,
                                     params.state_libs,
                                     smci,
                                     stack,
                                     is_masterchain)

      if compute_ph_res is Ok:
          descr.compute_ph = compute_ph_res.compute_ph
      else:
          return ExecutorError.TrExecutorError()

      # Generated outbound messages to be sent into other
      # accounts
      out_msgs = []

      compute_gas_fees = descr.compute_ph.gas_fees
      tr.total_fee = tr.total_fee + compute_gas_fees

      if descr.compute_ph.success:
          act_phase_res = action_phase(tr,
                                       account,
                                       original_acc_balance,
                                       acc_balance,
                                       msg_balance,
                                       phase.gas_fees,
                                       accounts,
                                       compute_ph_res.new_data)
          if act_phase_res is Ok:
              descr.action = act_phase_res.action_ph
              out_msgs = act_phase_res.msgs
          else:
              return ExecutorError.TrExecutorError()

      if descr.action != None:
          if descr.action.status_change == AccStatusChange.Deleted:
              account = Account()
              descr.destroyed = True
          descr.aborted = not descr.action.success
      else:
          descr.aborted = True

      # The Bounce Phase is skipped for external messages

      if account.status() == AccountStatus.AccStateUninit and acc_balance == 0:
          account = Account()

      tr.acc_end_status = account.status
      account.balance = acc_balance
      params.last_tr_lt = lt

      upd_lt = add_messages(tr, out_msgs, params.last_tr_lt)
      account.last_tr_time = upd_lt
      tr.descr = descr
      return Ok(tr, account)
```

## Credit Phase

At this phase, coins from the message balance goes to the account balance.
This phase is executed only for internal messages. External messages have
no coins attached.

**_Input:_**
- `account` — account that the message is executed on, [Account](40-accounts.md#account-structure-definition)
- `tr` — forming transaction, has type [Transaction](#transaction)
- `msg_balance` — message balance, has type `Grams`
- `acc_balance` — current balance of the account, has type `Grams`

**_Output:_**

The phase always succeeds. It returns the value of type:
/Ok(TrCreditPhase(collected, msg_balance))/, such that:
- `collected` — the amount of coins withheld for the account debt, if any.
- `msg_balance` — the amount of coins put on the account balance after the debt fee was conducted.

**_Modifies:_**
- `account` — updates the `due_payment`  field with the remaining debt, if any
- `tr` — updates the `total_fees`  field
- `msg_balance` — the original message balance after the debt conducted, if any
- `acc_balance` — the account balance with message coins

```python
def credit_phase(account, tr, msg_balance, acc_balance):
due_payment = account.due_payment
collected = min(due_payment, msg_balance)

         msg_balance = msg_balance - collected
         due_payment_remaining = due_payment - collected

         account.due_payment = due_payment_remaining
         tr.total_fees = tr.total_fees + collected

         # put message coins on the account balance
         acc_balance = acc_balance + msg_balance
         return Ok(TrCreditPhase(collected, msg_balance))
```

## Storage Phase

This phase withholds the storage fee from the account balance. The fee amount
is calculated using the algorithm `calc_storage_fee`  [calc_storage_fee](#data-storage-fee-calculation-algorithm)

**_Input:_**
- `account` — account that the message is executed on, has type [Account](40-accounts.md)
- `tr` — forming transaction, has type [Transaction](#transaction)
- `msg_balance` — message balance, has type `Grams`
- `acc_balance` — current balance of the account, has type `Grams`
- `config` — main blockchain parameters, has type [BlockchainConfig](#blockchainconfig-parameters)

**_Output:_**

This phase always succeeds. The return values may differ `Ok(TrStoragePhase(collected, fee, status_change))`, such that:
- `collected` — the amount of coins withheld for the storage fee
- `debt` — if the balance was insufficient, the remaining debt of the account
- `status_change` — should the account be frozen or deleted afterwards

*_Modifies_:*
- `account` — updates `due_payment` and `status`  fields
- `acc_balance` — the current balance after the fee got deducted
- `tr` — updates the `total_fee`  field


```python
def storage_phase(account, tr, msg_balance, acc_balance, config):
# It is assumed that the current transaction must have a more
# recent timestamp than the latest payment timestamp.
# Otherwise, something is terribly wrong.
assert (tr.now >= acc.last_paid)

         # The account does not occupy any space, so do not charge the fee
         if account == None:
             return Ok(TrStoragePhase())

         fee, account.storage_info = config.calc_storage_fee(account.storage_info,
                                                             is_masterchain, tr.now)
         if account.due_payment > 0:
             fee = fee + account.due_payment
             account.due_payment = None

         if acc_balance >= fee:
             acc_balance = acc_balance - fee
             tr.total_fee = tr.total_fee + fee
             return Ok(TrStoragePhase(fee, None, AccStatusChange.Unchanged))

         storage_fees_collected = acc_balance
         acc_balance = 0
         tr.total_fee = tr.total_fee + storage_fees_collected
         fee = fee - storage_fees_collected

         need_freeze = fee > config.get_gas_config(is_masterchanin).freeze_due_limit
         need_delete = \
             (account.status == AccountStatus.AccStateUninit or \
              account.status == AccountStatus.AccStateFrozen) and \
              fee > config.get_gas_config(is_masterchain).delete_due_limit

         if need_delete:
             tr.total_fee = 0
             account = Account()
             return Ok(TrStoragePhase(storage_fees_collected, fee,
                                      AccStatusChange.Deleted))
         elif need_freeze:
             account.due_payment = fee
             if account.status == AccountStatus.AccStateActive:
                 account.status = AccountStatus.AccStateFrozen
                 return Ok(TrStoragePhase(storage_fees_collected, fee,
                                          AccStatusChange.Frozen))
             else:
                 return Ok(TrStoragePhase(storage_fees_collected, fee,
                                          AccStatusChange.Unchanged))
         else:
             account.due_payment = fee
             return Ok(TrStoragePhase(storage_fees_collected, fee,
                                      AccStatusChange.Unchanged))
```

## Compute Phase

Execute the account smart-contract, update the state, gather generated actions to pass on
the next phase.

**_Input:_**
- `msg` — message, has type [Message](45-message.md)
- `account` — account, has type [Account](40-accounts.md)
- `acc_balance` — current account balance, has type `Grams`
- `msg_balance` — message balance,has type `Grams`
- `state_libs` — code libraries, has type `Blob`  (not relevant; omitted)
- `smc_info` — extra data for TVM, has type `SmartContractInfo`
- `stack` — TVM initial stack values
- `is_masterchain` — is the account belongs to Masterchain, has type bool

**_Output:_**
- On success, returns _Ok(TrComputePhase, out_actions, new_data)_,
  such that:
  - `TrComputePhase` — actual Compute Phase Descriptor
  - `out_actions` — an ordered list of generated actions
  - `new_data` — updated smart-contract state

- On error, returns `Err(ExecutorError)` with proper code.

**_Modifies:_**
- `account` — updated account state
- `smc_info` — mycode field set to point to the code of the smart-contract
- `acc_balance` — account balance after the gas fee deduction

```python
def uninit_account(account):
if account.storage.state is AccountState.AccountActive:
account.storage.state = AccountState.AccountUninit

    def compute_phase(msg, account, acc_balance, msg_balance, state_libs, smc_info,
                      stack, is_masterchain):
        result_acc = account.clone()
        vm_phase = TrComputePhaseVm()

        is_external = msg.header is ExtInMsgInfo
        if result_acc == None:
            new_acc = account_from_message(msg, msg_balance)
            if new_acc != None:
                result_acc = new_acc
                result_acc.last_paid = smc_info.unix_time
                account = result_acc
                account.uninit_account()

        if acc_balance == 0:
            return Ok(TrComputePhase:skipped(ComputeSkipReason.NoGas), None, None)

        gas_config = config.get_gas_config(is_masterchain)
        gas = init_gas(acc_balance, msg_balance, is_external, gas_config)

        # Is it possible?
        if gas.gas_limit == 0 and gas.gas_credit == 0:
            return Ok(TrComputePhase.skipped(ComputeSkipReason.NoGas), None, None)

        libs = []
        if msg.state_init != None:
            libs = state_init.libraries

        (reason, result_acc) = result_acc.compute_new_state(acc_balance, msg)

        if reason != None:
            return Ok(TrComputePhase.skipped(reason), None, None)

        vm_phase.gas_credit = gas.gas_credit
        vm_phase.gas_limit = gas.gas_limit

        if result_acc.code == None:
            if is_external:
                return ExecutorError.NoAcceptError()
            vm_phase.success = False
            vm_phase.gas_fees = gas_config.calc_gas_fee(0)
            if acc_balance < vm_phase.gas_fees:
                return ExecutorError.TrExecutorError()
            acc_balance -= vm_phase.gas_fees
            account = result_acc
            return Ok(TrComputePhase.Vm(vm_phase), None, None)

        code = result_acc.code
        data = result_acc.data

        libs.push(result_acc.libraries)   # local libraries
        libs.push(state_libs)             # masterchain libraries

        smc_info.mycode = code

        # Here, we initialize abstract TVM virtual machine.
        # The exact behavior of this device is out of scope.
        vm = TVM(code)
        vm.smc_info = smc_info
        vm.config = config
        vm.stack = stack
        vm.data = data
        vm.libraries = libs
        vm.gas = gas

        result = vm.execute()

        vm_phase.success = vm.commited_state.is_committed
        # vm.gas may have been updated after the execution
        gas_vm = vm.gas
        # how much credited gas remains unspent
        credit = gas_vm.gas_credit
        used = gas_vm.gas_used
        vm_phase.gas_used = used

        if credit != 0:
            if is_external:
                # The smart-contract has to explicitly accept the external message,
                # otherwise it gets rejected. The acceptance of a message manifests
                # itself in the credit field being equal to 0.
                return ExecutorError.NoAcceptError()
            vm_phase.gas_fees = 0
        else:
            gas_fees = gas_config.calc_gas_fee(used)
            vm_phase.gas_fees = gas_fees

        vm_phase.mode = 0
        vm_phase.vm_steps = vm.steps

        new_data = vm.commited_state
        if new_data == None:
            vm_phase.success = False

        out_actions = vm.actions
        if out_actions = None:
            vm_phase.success = False

        account = result_acc
        return Ok(TrComputePhase.Vm(vm_phase), out_actions, new_data)
```

### Compute Phase Success Conditions

We  would like  to explicitly  articulate  what it  means for  the
_Compute Phase_  to  succeed.  To do that,
_we  specify the opposite condition_, i.e. when  it fails.
In all other  scenarios the  phase is
considered successful.

The success status is important, because it
decides if the action phase has to be executed afterwards.

For the phase to fail, one of the following conditions must hold:

1. The smart-contract data is not committed after the execution[^1]
2. The new smart-contract data is ill-formed
3. The generated actions list is ill-formed

:::caution
The  compute  phase  may  be considered   successful  even   if  the   computation  thrown   an exception. This is quite unintuitive, yet very important fact.
:::

### Compute Phase Exit Code

The exit code value shows  if the computation finished normally or
was aborted  due to some  exception.

In case of the former, the exit code should have values 0 or 1.

In  case of  the latter,  the exception  might be  of a  system or
custom  type.  If  the  exception  is a  system  one, i.e.   not
intentionally emitted by the code using a special TVM instruction,
the exit code contains one of the standard exit codes.

If the exception  is custom, then the exit code  should also equal
to 0  or 1, but there  is an extra `exit_arg`   field that provides
the user defined code.

For standard TVM exception codes, see [here](https://github.com/tonlabs/ton-labs-types/blob/af1dc71a9a2b46cb0d55a0956e44726374ba7c0c/src/types.rs#L306).

### Calculate Gas Fee Algorithm

The algorithm to calculate the amount of coins to be paid for the consumed gas.

**_Input:_**

- `gas_prices` — a structure with actual gas prices, has type  [GasLimitsPrice](#calculate-gas-fee-algorithm)
- `gas_used` — amount of gas units consumed by the computation, has type Uint

**_Output:_** The amount of coins to be paid for the gas.

**_Modifies:_** None.

```python
def calc_gas_fee(gas_prices, gas_used):
   if gas_used <= gas_prices.flat_gas_limit:
       return gas_prices.flat_gas_limit

   gas_fee = flat_gas_price + (gas_used - gas_prices.flag_gas_limit) * \
       gas_prices.gas_price
   return gas_fee
```

### Compute New State Algorithm

The algorithm `compute_new_state`  computes the actual account state
by given account record, the balance and the message. In particular,
this algorithm is used to initialize uninitialized accounts with
code and data borrowed from an external message with non-empty
`state_init` field.

*_Input_:*

- `account` — account structure, has type [Account](40-accounts.md)
- `acc_balace` — current account balance, has type Uint
- `in_msg` — message being executed, has type [Message](45-message.md)

*_Output_:*

- On success, returns **None**.
- On failure, returns one of the `ComputeSkipReason` codes.

*_Modifies_:*

- `account`

```python
def compute_new_state(account, acc_balance, in_msg):
    if account.status == AccountStatus.AccStateNonexist:
        if in_msg.state_init == None:
            return ComputeSkipReason.NoState
        else:
            return ComputeSkipReason.BadState
    elif account.status == AccountStatus.AccStateActive:
        return None
    elif account.status == AccountStatus.AccStateUninit:
        if in_msg.state_init != None:
            if account.try_activate_by_init_code_hash(in_msg.state_init) != None:
                return None
            else:
                return ComputeSkipReason.BadState
        else:
            return ComputeSkipReason.NoState
    elif account.status == AccountStatus.AccStateFrozen:
        if acc_balance != 0 and in_msg.state_init != None:
            if account.try_activate_by_init_code_hash(in_msg.state_init) != None:
                return None
            else:
                return ComputeSkipReason.BadState
        return ComputeSkipReason.NoState

    return None
```

### Activate By Init Algorithm

The algorithm `try_activate_by_init_code_hash`    does    the initialization or re-initialization of the account, with the given `state_init`.

**_Input:_**

- `account` — account structure to be initialized
- `state_init` — state_init field from the inbound message

**_Output:_**

On success, returns **Ok**
On failure, returns **Err**

**_Modifies:_**

- `account` — the field `storage.state` gets updated by the state_init on success

```python
def try_activate_by_init_code_hash(account, state_init):
    if account == None:
        return Err

    new_state = None

    if account.storage.state == AccountState.AccountUninit:
        if hash(state_init) == account.addr.address:
            new_state = AccountState.AccountActive(
                hash(state_init.code), state_init
            )
        else:
            return Err
    elif account.storage.state == \
         AccountState.AccountFrozen(init_code_hash, state_init_hash):
        if state_init_hash == hash(state_init):
            new_state = AccountState.AccountActive(init_code_hash, state_init)
        else:
            return Err
    else:
        new_state = account.storage.state

    account.storage.state = new_state
    return Ok
```

### Initial Gas Algorithm

The  algorithm  computes  TVM Gas-related  initial  values.  Those values  are  provided  to  the  virtual  machine  right  before  a smart-contract execution. If the execution takes more than allowed gas, it gets stopped.

**_Input_**

- `acc_balance`: current account balance
- `msg_balance`: message balance
- `is_external`: is the message external
- `gas_info`: structure with limits and prices for the workchain

**_Output_**

Returns the structure Gas() containing 4 values:

- `gas_limit`: the maximum gas value available for any smart-contract of the workchain
- `gas_credit`: the amount of gas to be credited for the execution before the smart-contract accepts the message
- `gas_max`: the maximum allowed gas to be spent on the execution of the current smart-contract
- `gas_prices`: a structure with gas prices

**_Modifies_**: None

```python
def init_gas(acc_balance, msg_balance, is_external, gas_info):
    gas_max = min(gas_info.gas_limit, gas_info.calc_gas(acc_balance))
    gas_credit = 0
    if is_external:
        gas_credit = min(gas_info.gas_credit, gas_max)
        gas_limit = gas_credit
    else:
        gas_limit = min(gas_max, gas_info.calc_gas(msg_balance))

    return Gas(gas_limit, gas_credit, gas_max, gas_info.get_real_gas_price())
```


### Account From Message Algorithm

The algorithm creates new account  by using data from the internal
message. External messages are rejected. Creation of a new account
based  on   an  external   message  is  located   elsewhere.   See
[compute_new_state](#compute-new-state-algorithm) algorithm.

**_Input_**

- msg: incoming message being processed, has type [Message](45-message.md)
- msg_remaining_balance: the current amount of coins left on the message balance, has type `Uint`

**_Output_**

- Either returns a new [Account](40-accounts.md) object, or None. Both results are considered successful.

**_Modifies_**: None

```python
def account_from_message(msg, msg_remaining_balance):
    if not (msg.header is IntMsgInfo):
        return None
    if msg_remaining_balance == 0:
        return None

    header = msg.header
    init = msg.state_init

    if init != None and init.code != None and hash(init) == header.dst.address:
        return Account.active_by_init_code_hash(hdr.dst, msg_remaining_balance,
                                                0, init)
    if header.bounce:
        return None
    else:
        return Account.uninit(hdr.dst, 0, 0, msg_remaining_balance)
```

## Action Phase

By given ordered action list, the Action phase executes each action item in  the list by  applying proper  action handler.

*_Input_:*

- `tr` — transaction being constructed, has type [Transaction](#transaction)
- `account` — account executing the message, has type [Account](40-accounts.md)
- `original_acc_balance` — account balance after storage and credit phase, has type `Uint`
- `acc_balance` — the mutable copy of the original_acc_balance, has type `Uint`
- `msg_remaining_balance` — message balance without debt value if any, has type `Uint`
- `compute_phase_fees` — gas fees from the compute phase, has type `Uint`
- `actions` — list of actions generated on the Compute Phase, has type list([OutAction](#type-of-actions))
- `new_data` — the smart-contract data after the Compute Phase, some binary blob.

*_Output_:*

On success, returns `Ok(phase, messages)` such that:
- `phase` denotes the [Action Phase Descriptor](#action-phase-descriptor)
- `messages` denotes a list of messages to be sent, has type list([Message](45-message.md))

On error, returns _Err(result_code)_, such that:
- `result_code` describes a type of an error, see [here](#action-result-codes).

*_Modifies_:*

- `tr`
- `account`
- `acc_balance`
- `msg_remaining_balance`

```python
MAX_ACTIONS = 255

     def action_phase(tr, account, original_acc_balance, acc_balance,
                      msg_remaining_balance, compute_phase_fees, actions, new_data):

       acc_copy = account.clone()
       acc_remaining_balance = acc_balance
       phase = TrActionPhase()
       total_reserved_value = 0

       # Serialization issues are put aside, it is too low-level for
       # our purpose.

       # Interesting to note, actions overload leads to OK, not Error?
       if len(actions) > MAX_ACTIONS:
           phase.result_code = RESULT_CODE_TOO_MANY_ACTIONS
           return Ok(phase, [])

       phase.action_list_hash = hash(actions)
       phase.tot_actions = len(actions)

       account_deleted = False
       out_msgs_tmp = []

       address = acc_copy.address

       for action in actions:
           if action is OutAction.SendMsg:
               if action.mode & SENDMSG_ALL_BALANCE:
                   out_msgs_tmp.push((action.mode, action.out_msg))
                   continue
               result = outmsg_action_handler(phase,
                                              action.mode,
                                              action.out_msg,
                                              acc_remaining_balance,
                                              msg_remaining_balance,
                                              compute_phase_fees,
                                              config,
                                              address,
                                              total_reserved_value,
                                              account_deleted)
               if result is Ok:
                   phase.msgs_created += 1
                   out_msgs_tmp.push((action.mode, action.out_msg))
               else:
                   return result
           elif action is OutAction.ReserveCurrency:
               result = reserve_action_handler(action.mode,
                                               action.value,
                                               original_acc_balance,
                                               acc_remaining_balance)
               if result is Ok:
                   phase.spec_actions += 1
                   total_reserved_value += result.reserved_value
               else:
                   phase.valid = True
                   phase.result_code = result
                   # phase.no_funds = True
                   return Ok(phase, [])
           else:
               return Ok(phase, [])

       # process messages that have SENDMSG_ALL_BALANCE flag set last
       # skipping all other already processed messages
       out_msgs = []
       for (mode, out_msg) in out_msgs_tmp:
           if not (mode & SENDMSG_ALL_BALANCE):
               out_msgs.push(out_msg)
               continue
           result = outmsg_action_handler(phase, mode, out_msg,
                                          acc_remaining_balance,
                                          msg_remaining_balance,
                                          compute_phase_fees,
                                          config,
                                          address,
                                          total_reserved_value,
                                          account_deleted)
           if result == Ok:
               phase.msgs_created += 1
               out_msgs.push(out_msg)
           else:
               return Ok(phase, [])

       acc_remaining_balance += total_reserved_value
       tr.total_fee += phase.total_action_fees

       if account_deleted:
           phase.status_change = AccStatusChange.Deleted

       phase.valid = True
       phase.success = True

       acc_balance = acc_remaining_balance
       account = acc_copy
       account.data = new_data

       return Ok(phase, out_msgs)
```

### Action Phase Success Condition

All actions formed at the Compute Phase  were successfully processed.
If an action had a special error-canceling flag set, such error will
not result in the whole phase failure. The action will be skipped in
this case.

### Action Phase Validity Condition

To specify the validity condition, we will define the opposite, i.e. when
the action phase is considered `invalid`.

- The number of actions in the action list is greater than `MAX_ACTIONS`
- Any `SendMsg`  action processing finished with an error
- The unknown action type was found during the processing

In all other cases, the action phase is considered `valid`.

### SendMsg Action Handler

The `SendMsg`  action handler  is responsible for generating messages
to be sent.  It may fail due to several reasons. In this case, the
action phase get stopped,  unless the `SENDMSG_IGNORE_ERROR`  flag is
set.

*_Input_:*

- `phase` — actual [Action Phase Descriptor](#action-phase-descriptor)
- `mode` — flags for sending the message
- `msg` — message being sent, has type [Message](45-message.md)
- `acc_balance` — actual account balance, has type UInt
- `msg_balance` — the message balance after debt being deducted, has type Uint
- `compute_phase_fees` — gas fees from Compute Phase
- `config` — blockchain configuration, has type [BlockchainConfig](#blockchainconfig-parameters)
- `my_addr` — account [address](40-accounts.md#account-address)
- `reserved_value` — the value of coins reserved by the ReserveCoins actions
- `account_deleted` — the output value, set to True if account needs to be deleted

*_Output_:*

On success, returns Ok(value), such that:

- `value` — the amount of coins to be deducted from the account balance

On failure, returns Err(result_code), such that:

- `result_code` — describes the error, see [here](#action-result-codes)


*_Modifies_:*

- `phase`
- `mode`
- `msg`
- `acc_balance`
- `msg_balance`
- `account_deleted`

```python
MAX_MSG_BITS = 2**21  # 2 Mb
MAX_MSG_CELLS = 2**13

def get_fwd_prices(config, is_masterchain):
    if is_masterchain:
        return config.fwd_prices_mc
    else:
        return config.fwd_prices_wc

def outmsg_action_handler(phase, mode, msg, acc_balance, msg_balance,
                          compute_phase_fees, config, my_addr, reserved_value,
                          account_deleted):
    invalid_flags = SENDMSG_REMAINING_MSG_BALANCE or SENDMSG_ALL_BALANCE
    mode_not_valid = mode and (not SENDMSG_VALID_FLAGS)
    mode_has_invalid = mode and invalid_flags == invalid_flags
    mode_delete_not_sab = (mode and SENDMSG_DELETE_IF_EMPTY) and \
        (not (mode and SENDMSG_ALL_BALANCE))
    if mode_not_valid or mode_has_invalid or mode_delete_not_sab:
        return Err(RESULT_CODE_UNSUPPORTED)

    skip = not (mode and SENDMSG_IGNORE_ERROR)

    msg.header.src = my_addr
    fwd_prices = config.get_fwd_prices(msg.is_masterchain())
    compute_wd_fee = fwd_prices.fwd_fee(Cell(msg))

    # The message should be either internal message or event.
    # It is impossible to send external message from the smart-contract.
    if not ((msg.header is IntMsgInfo) or (msg.header is ExtOutMsgInfo)):
        return Err(-1)

    if msg.header is IntMsgInfo:
        # =====================================
        # Internal message
        # =====================================
        msg.header.bounced = False
        result_value = msg.header.value
        msg.header.ihr_disabled = True
        msg.header.ihr_fee = 0

        fwd_fee = max(msg.header.fwd_fee, compute_wd_fee)
        fwd_mine_fee = fwd_prices.mine_fee(fwd_fee)
        total_fwd_fees = fwd_fee + msg.header.ihr_fee
        fwd_remain_fee = fwd_fee - fwd_mine_fee

        if (mode and SENDMSG_ALL_BALANCE):
            result_value = acc_balance
            msg.header.value = acc_balance
            mode = (mode and (not SENDMSG_PAY_FEE_SEPARATELY))

        if (mode and SENDMSG_REMAINING_MSG_BALANCE):
            # Send all the remaining balance of the inbound message
            result_value += msg_balance
            if not (mode and SENDMSG_PAY_FEE_SEPARATELY):
                if result_value < compute_phase_fees:
                    return Err()
                result_value -= compute_phase_fees
            msg.header.value = result_value

        if (mode and SENDMSG_PAY_FEE_SEPARATELY):
            result_value += total_fwd_fees
        else:
            if msg.header.value < total_fwd_fees:
                return Err()
            else:
                msg.header.value -= total_fwd_fees
        msg.header.fwd_fee = fwd_remain_fee
    else:
        # =====================================
        # Event
        # =====================================
        fwd_mine_fee = compute_fwd_fee
        total_fwd_fees = compute_fwd_fee
        result_value = compute_fwd_fee

    if acc_balance < result_value:
        return Err(RESULT_CODE_NOT_ENOUGH_GRAMS)

    if (mode and SENDMSG_DELETE_IF_EMPTY) and \
       (mode and SENDMSG_ALL_BALANCE) and \
       (acc_balance + reserved_value == 0):
        account_deleted = True

    if total_fwd_fees != 0:
        phase.total_fwd_fees += total_fed_fees

    if fwd_mine_fee != 0:
        phase.total_action_fees += fwd_mine_fee

    phase.tot_msg_size.append(Cell(msg))

    if phase.tot_msg_size.bits() > MAX_MSG_BITS or \
       phase.tot_msg_size.cells() > MAX_MSG_CELLS:
        return Err(RESULT_CODE_INVALID_BALANCE)

    if mode and (SENDMSG_ALL_BALANCE or SENDMSG_REMAINING_MSG_BALANCE):
        msg_balance = 0

    return Ok(result_value)
```

### ReserveCurrency Action Handler

ReserveCurrency action handler is responsible for managing the reserve coins.

**_Input:_**

- `mode` — [Reserve flags](#action-reservecurrency) for the reserve action, has type `Uint`
- `val` — amount of coins to be reserved, has type `Uint`
- `orig_acc_balance` — account balance after the deduction of the storage fee and the debt, if any, has type `Uint`
- `acc_remaining_balance` — amount of coins left on the balance after the reserve, has type `Uint`

**_Output:_**

On success, returns`Ok(reserved)`  value, such that:

- `reserved`  denotes the amount of coins being reserved for the account

On failure, returns _Err(result_code)_, such that:

- `result_code`

*_Modifies_:*

- `acc_remaining_balance` — remaining account balance after the reserve amount being withheld

```python
def reserve_action_handler(mode, val, orig_acc_balance, acc_remaining_balance):
    if mode and (not RESERVE_VALID_MODES):
        return Err(RESULT_CODE_UNKNOWN_OR_INVALID_ACTION)

    reserved = 0
    if mode and RESERVE_PLUS_ORIG:
        if mode and RESERVE_REVERSE:
            reserved = orig_acc_balance
            if reserved < val:
                return Err(RESULT_CODE_UNSUPPORTED)
            reserved -= val
        else:
            reserved = val
            reserved += orig_acc_balance
    else:
        if mode and RESERVE_REVERSE:
            return Err(RESULT_CODE_UNKNOWN_OR_INVALID_ACTION)
        reserved = val

    if mode and RESERVE_IGNORE_ERROR:
        reserved = min(reserved, acc_remaining_balance)

    remaining = acc_remaining_balance
    if remaining < reserved:
        return Err(RESULT_CODE_NOT_ENOUGH_GRAMS)

    remaining -= reserved
    remaining, acc_remaining_balance = acc_remaining_balance, remaining

    if mode and RESERVE_ALL_BUT:
        reserved, acc_remaining_balance = acc_remaining_balance, reserved

    return Ok(reserved)
```

## Bounce Phase

If error happens on the previous phases, the bounce phase takes place.

*_Input_:*

- `remaining_msg_balance` — message balance after all previous phases executed, has type `Uint`
- `acc_balance` — remaining account balance after all previous phases executed, has type `Uint`
- `compute_phase_fees` — the fees of the compute phase, has type `Uint`
- `msg` — message being processed, has type [Message](45-message.md)
- `tr` — transaction object, has type [Transaction](#transaction)

*_Output_:*

On success, returns `Ok(TrBouncePhase, bounce_message)`, such that:

- `TrBouncePhase`  is a Bounce Phase Descriptor
- `bounce_message`  is a bounce message to be included into the out_msgs queue

On error, returns /ExecutorError.TrExecutorError/

*_Modifies_:*

- `tr` — adds the bounce message delivery fee to the total

*_NOTE_:*

- Function `get_fwd_prices()`  was defined [here](#sendmsg-action-handler).

```python
def bounce_phase(remaining_msg_balance, acc_balance,
                 compute_phase_fees, msg, tr):
    header = msg.header
    if not header.bounce:
        return ExecutorError.TrExecutorError()

    header2 = header.clone()
    header2.src, header2.dst = header.dst, header.src
    storage = StorageUsedShort()
    fwd_prices = config.get_fwd_prices(msg.is_masterchain)
    fwd_full_fees = fwd_prices.fwd_fee(Cell())
    fwd_mine_fees = fwd_prices.mine_fee(fwd_full_fees)
    fwd_fees = fwd_full_fees - fwd_mine_fees

    if remaining_msg_balance < fwd_full_fees + compute_phase_fees:
        return Ok(TrBouncePhase.no_funds, None)

    acc_balance -= remaining_msg_balance
    remaining_msg_balance -= fwd_full_fees
    remaining_msg_balance -= compute_phase_fees
    header2.ihr_disabled = True
    header2.bounce = False
    header2.bounced = True
    header2.ihr_fee = 0
    header2.fwd_fee = fwd_fees
    header2.value = remaining_msg_balance

    bounce_msg = Message.with_header(header2)
    if config.has_capability(GlobalCapabilities.CapBounceMsgBody):
        body = msg.body.clone()
        body.shrink_data(0..256) # leave only 256 bits of the original body
        bounce_msg.body = body

    tr.total_fees += fwd_mine_fees
    return Ok(TrBouncePhase.ok(storage, fwd_mine_fees, fwd_fees), bounce_msg)
```

## Functional Properties

In this  section, we  define the  main risks  of malfunction  in the module, and define several higher-level properties that should hold for the module to mitigate those risks.

### Risks

We define a risk as a hazard event causing a significant loss for the end user.
We distinguish the following types of risks.

#### Financial Risks

The Transaction Executor is the only place in the Node that is responsible for
changing  the   account  balance.  Hence,  any   errors  in  related
operations  lead to  tokens loss  for the  user.  We  identify the
following financial risks for the module:

1. Incorrect storage, delivery or gas fees calculation logic
2. Incorrect message value processing logic
3. Incorrect `SendMsg`, `ReserveCoins`  actions processing logic

#### Behavioral Risks

Everscale blockchain praises  the distributed programming paradigm
in  application development.  It means  that instead  of producing
huge smart-contract  monoliths, it is encouraged  to separate the
system into many manageable smart-contracts  that communicate with
each other by means of message passing.

The message passing scheme used in a system induces some protocol.
If message passing breaks in an unexpected way, the whole protocol
may stall, potentially  leading to global system  deadlocks.

It is of  utter importance to guarantee that  all produced correct
messages  will   be  eventually   delivered  to   the  destination
account. The delivery  process is complicated and  rely on several
node components. Here,  we identify risks related  to the Transaction Executor
part of it:

- Successful SendMsg action does not lead to creation of a corresponding
  message
- Generated messages do not occur in the Out Message queue
- Message delivery order gets broken
- A bounce message does not get generated as expected

### Assumptions

All the properties formulated with the following assumptions in mind:

- We consider only `ordinary`  accounts, not system (special) accounts.
  For the latter, the properties might look different.

### System Properties

System properties are high-level general statements on the system behavior
that the Transaction Executor should obey to. A subset of those statements related to
mitigating the main risks, identified in the previous section.

#### Fees

- **FEE1** — Gas fees for the computation equal the amount calculated using
  the algorithm [calc_gas_fee](#calculate-gas-fee-algorithm).
- **FEE2** — Storage fees for an account equal the amount calculated using
  the algorithm [calc_storage_fee](#data-storage-fee-calculation-algorithm).
- **FEE3** — Forwarding fees are calculated according to the algorithm [message_passing_fees](#message-passing-fee) .
- **FEE4** — During the message execution process, all type of fees get deducted
  only once for an account.

#### Message Processing

- **MSG1** — The message coins get credited to the account balance before
  executing a smart-contract logic.
- **MSG2** — Messages delivery order between the current account $a_1$ and some other account $a_2$
  does not depend on messages sent from $a_1$ to some other account $a_3$, when $a_2 \neq a_3$.

#### Credit Phase Processing

- **CRD1** — If the inbound message is external, the credit phase does not get executed.
- **CRD2** — If the inbound message is internal, the account's balance get credited with the
  message value minus the account debt, if any.

#### Storage Phase Processing

- **STR1** — If there is not enough funds to cover the storage phase fee on the account's balance, and if the account is in the Active status, then the account gets a debt storing in the `due_payment` field of the account. If the debt value exceeds the `freeze_due_limit` value, the account is switched into a frozen status. If the debt exceeds the `delete_due_limit` value, the account gets deleted.

#### Compute Phase Processing

- **CMP1** — If the [Compute Phase fails](#compute-phase-success-conditions), the execution of a message is aborted. The bounce message is not created in this case.
- **CMP2** — After the Compute Phase, the account's balance gets decreased exactly on the amount of consumed gas.

#### Action Phase Processing

- **ACT1** — Each successful [SendMsg](#action-sendmsg) action leads to creation of a message.
- **ACT2** — Successfully created message is added into the out queue exactly once.
- **ACT3** — If the action phase fails and the incoming message has the bounce flag set, then a single bounce message is generated and put into the out queue.

#### Bounce Phase Processing

- **BNC1** — The bounce message is generated only if and only if all of the following conditions hold:

1) The incoming message is an internal message
2) The incoming message has the bounce flag set
3) During the message processing, the action phase was executed, but failed
4) After the failed action phase, there is enough funds left on the incoming message balance to cover the bounce message processing[^2].

- **BNC2** — A bounce message attach all the original message value minus the storage, gas and delivery fees.

## Footnotes

[^1]: Well, at least, until the part of the chain residing the transaction gets cut-off to reduce the disk space consumption.
[^2]: See the definition of COMMIT TVM instruction.
