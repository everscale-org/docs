---
title: Accounts
description: The information storage entity is an account
---

# Accounts

Within a single workchain, the most basic information storage entity is the _account_.    
An account is uniquely determined by its _identifier_.    
Within the whole blockchain — the collection of workchains — the account is uniquely determined by its _address_: that is, when we put together the workchain identifier and its account identifier.

The account record stores account address, account balance and maybe a smart-contract state. The latter might be missing, and yet the account is able to receive basic messages.

#### Simplified representation of an Everscale Account
```plantuml Simplified representation of an Everscale Account
card Account {
  agent address
  agent balance
  card State {
    agent code
    agent data
  }
}
```

An account could be created either by a user, or by a smart-contract.     
It is done by sending a message carrying a special payload to an address of the account.

In the process of its operation, an account might become frozen or deleted. This is usually the result of an account being in debt, or executing a special instruction. We depict the life-cycle of an account in Fig.

#### Account Lifecycle

```plantuml Account Lifecycle
hide empty description
skinparam padding 15

[*] -> Nonexistent
Nonexistent -> Uninit : send value
note top of Uninit : Initial state of the account
Uninit -> Active : initialize
Uninit -[#DD00AA]-> Frozen : due payment
note top of Active : Normal message processing
Active -[#blue]-> Frozen : due payment
note left of Frozen : Unfreeze message only
Frozen -[#blue]-> Active : unfreeze
Frozen -[#DD00AA]-> Uninit : unfreeze
Frozen -> Nonexistent : delete
```

In the beginning, the account remains in an _Nonexistent_ state — it stores no funds and no data. Only after you send some value to the account, does it switch to the _Uninit_ state. In that state, it is not yet very useful: it may only receive coins from the incoming messages.

The account might be initialized with a message carrying a _StateInit_ data blob containing smart-contract code and data. In this case, with enough coins on the balance, the account becomes initialized with this smart-contract, and it is then switched into _Active_ state.

Due to storage fees, the account balance might become negative, leading to _Frozen_ state and even being deleted afterwards. The other option for deletion is if the smart-contract itself executes a special action. After the deletion, the account state is switched back to _Nonexistent_ state.

## Account Structure Definition

The account structure is defined as follows:

```rust
struct AccountStuff {
    addr: MsgAddressInt,
    storage_stat: StorageInfo,
    storage: AccountStorage,
}

type Account = Option<AccountStuff>;
```

#### AccountStuff structure fields
| Field        | Description                    |
|--------------|--------------------------------|
| addr         | Account address                |
| storage_stat | Account storage use statistics |
| storage      | Account smart-contract storage |

## Account Address

The location of an account on Everscale blockchain is represented as a two-value structure: the workchain number and the account identifier. This structure is called an _account address_. Hereinafter, we just call it address for greater convenience.

Addresses are defined as follows:

```rust
pub enum MsgAddressInt {
    AddrStd(MsgAddrStd),
    AddrVar(MsgAddrVar),
}

pub struct MsgAddrStd {
    pub anycast: Option<AnycastInfo>,
    pub workchain_id: i8,
    pub address: AccountId,
}

pub type AccountId = SliceData;
```

The address may be encoded by one of the two structures: _MsgAddrStd_ or _MsgAddrVar_. The latter is used to locate accounts in huge blockchains, when the standard 8-bit _workchain_id_ is not enough, and not supported currently.

- Type _SliceData_ denotes a binary blob encoded in a tree data structure.
- Type `i8` is an 8-bit signed integer.

#### MsgAddrStd structure fields
| Field        | Description                               |
|--------------|-------------------------------------------|
| anycast      | Multi-shard contracts routing information |
| workchain_id | Workchain identifier                      |
| address      | Account identifier within the workchain   |

:::caution
Anycast-addresses are planned to be removed shortly.
:::

## Account Storage

Any account on the Everscale blockchain is being charged for occupying space on a regular basis. The fee depends on the size of data being stored, the current prices and when the last charge took place. In some circumstances, an account may also have a debt, called due payment. Most of this information is stored in the _StorageInfo_ structure.

```rust
pub struct StorageInfo {
  used: StorageUsed,
  last_paid: u32,
  due_payment: Option<Grams>,
}

pub struct StorageUsed {
    cells: VarUInteger7,
    bits: VarUInteger7,
    public_cells: VarUInteger7,
}
```

#### StorageInfo structure fields
| Field        | Description                               |
|--------------|-------------------------------------------|
| used         | Blockchain storage use  statistics        |
| last_paid    | Time of the latest payment, in Unix Epoch |
| due_payment  | Debt of the account                       |

- Type _Grams_ denotes a set of natural numbers $\{0, ..., 2^{256}\}$, equipped with $\oplus$ and $\ominus$ operators, such that:

$$a \oplus b = (a + b) \,\, \boldsymbol{mod} \,\, 2^{256}$$

$$a \ominus b = \boldsymbol{max}(a - b, 0)$$

Here $+$ and $-$ operators are standard addition and subtraction operators in a set of integers $\mathbb{Z}$.

- Amount of storage used by the account is encoded with _StorageUsed_ struct.

#### StorageUsed structure fields
| Field        | Description                             |
|--------------|-----------------------------------------|
| cells        | Number of cells occupied by the account |
| bits         | Number of bits occupied by the account  |
| public_cells | Field is not used                       |

To store the data in a tree-like form, it is encoded as a series of interlinked cells. This data structure also consumes some space and it is accounted for in the _cell_ field. The _bits_ field refers to data size being encoded in the cells.
## Account Data

The full account record is represented by several nested data structures:

- Account storage
- Account state
- Smart-contract storage called StateInit

### Account Storage structure

The most outer record is the account storage. It contains the account balance and the account state. The account state _may_ contain the smart-contract code and data, described by the structure called _StateInit_.

```rust
pub struct AccountStorage {
  last_trans_lt: u64,
  balance: CurrencyCollection,
  state: AccountState,
}
```

#### AccountStorage fields
| Field         | Description                                               |
|---------------|-----------------------------------------------------------|
| last_trans_lt | Last transaction logical time                             |
| balance       | Amount of cryptocurrency tokens available for the account |
| state         | Current account state                                     |

### Account State

The account state defines the mode of operation for the account, during the message being executed for that account. The Transaction Executor logic varies greatly depending on what the current account state is.

The account state may have additional data fields. See the enumeration below.

```rust
enum AccountState {
  AccountUninit,
  AccountActive{
    init_code_hash: Option<UInt256>,
    state_init: StateInit,
  },
  AccountFrozen{
    init_code_hash: Option<UInt256>,
    state_init_hash: UInt256,
  },
}
```

The life cycle of an account is depicted on [Fig](#account-lifecycle).

Let us clarify the fields of enumeration items.

For _AccountActive_, the value state_init defines the byte-code and data of the associated smart-contract. The field _init_code_hash_ defines the hash of the field _state_init.code_ that was used at the moment of the account initialization, or at the moment of the account freeze.

In Everscale, it is possible to change the smart-contract's code on the fly using the _SetCode_ action. However, the value _init_code_hash_ stays unaffected.

The same holds for _AccountFrozen_. The value of _state_init_hash_ defines the hash of the smart-contract _state_init.code_ at the moment of a freeze.

### Smart-Contract Storage (StateInit)

The byte-code and data of a contract are stored within a structure called _StateInit_. Its name may seem quite confusing. It could have been named just State. The Init part comes from the fact that
this structure is also used for the initialization of an account when it is uninitialized.

```rust
pub struct StateInit {
  pub split_depth: Option<Number5>,
  pub special: Option<TickTock>,
  pub code: Option<Cell>,
  pub data: Option<Cell>,
  pub library: StateInitLib,
}
```

- _split_depth_ field was initially devoted to large multi-shard smart-contracts, but currently it is not used.

- _special_ fields signal the fact that the smart-contract is related to the blockchain system functioning. This is related to the very small amount or contracts residing in the Masterchain, i.e. Elector, Config, Giver, etc. There is a special logic to executing messages destined for those contracts.
- _code_ and _data_ fields encodes the current byte-code and data of a contract. Here, data denote values of contract's variables.
- _library_ used to encode the code libraries the contract may refer to from its code. This mechanism is deprecated.
