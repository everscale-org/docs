---
sidebar_position: 2
---

# DePool Specifications

## Background

It is quite evident that to achieve high-performance properties, a network needs powerful, reliable servers with fast connectivity. At the same time, to achieve sufficient decentralization, these servers have to belong to as many owners as possible. There seems to be a contradiction between these goals.

In Proof-of-Work networks, performance is often sacrificed for decentralization. Yet, claims arise that the centralization of Bitcoin, Ethereum etc. mining power is not entirely prevented. Mining Pools centralization remains an issue, as these pools are controlled by particular entities distributing rewards. For example, almost 60% of Bitcoin mining power is concentrated in just 4 pools and around 80% of all mining power originates in China. Just 2 mining pools control 52% of Ethereum hashrate, more than 50% of which originates in China.

In Proof-of-Stake, the correlation between network performance and concentration of power (money in this case) is even more apparent, as one does not need to buy, set up, and manage complicated mining farms. It can ultimately be claimed that POS is trading performance for decentralization (look no further than EOS centralization, Steemit network overtaking etc.).

It seems that enabling small token holders to participate in network governance is a very important decentralization property.

## Motivation

Everscale blockchain needs all newly created blocks to be validated in order to run correctly. For this it relies on special designated nodes called "Validators", and offers substantial reward for their work. However, becoming a validator requires a substantial cryptocurrency deposit. The required amount might far exceed an individual validator budget. On the other hand, blockchain users with no validating system might be interested in investing in validation duty. This is where the Decentralized Pool (DePool) smart contract comes in.

There are two main use cases of DePool:
- User has no Validator capabilities but some free funds. User can support a third-party Validator and receive rewards.
- User has Validator capabilities and but doesn't have necessary amount of funds to participate in validator elections and subsequent rewards.

## Basic terms

- **DePool** — a smart contract that allows other smart contracts to invest stakes into a common pool of funds and after some period of time to receive it back with interest.
- **Elector** — a system level smart contract, deployed to masterchain from zero state. Runs validator elections periodically.
- **DePool Proxy (proxy)** — a smart contract that delivers messages between DePool and Elector.
- **Participant** — a smart contract that invests funds into DePool.
- **Validator** — software running blockchain node. Each DePool works with one node only. This node must be a DePool participant.
- **Validator wallet** — a smart contract that is used by Validator to send election requests to DePool and receive the Validator reward. Validator wallet should be a Multisig contract with 3 custodians.
- **DePool Helper** — a smart contract that stores the address of the actual DePool and works with the Timer contract.
- **Global Validators Set (GVS)** — current set of validators chosen in the latest elections.
- **Validation period** — period of time for which GVS is elected.
- **Investment round** — period of time between Participant investing a stake in DePool and receiving it back (with or without interest).
- **Timer** — a smart contract that can call other smart contracts periodically.

## Architecture

![DePool Architecture](/img/depool-architecture.svg)

1. DePool is designed to receive investment stakes from Participants, allocate the pool funds to a validator in order to participate in elections of the GVS and, after the end of the validation cycle, distribute stakes with certain rewards back to the Participants.
2. DePool is deployed to basechain. But it cannot communicate with Elector directly, because Elector rejects messages from non-masterchain contracts. Thus there are DePool proxies that are deployed to masterchain and deliver messages from DePool to Elector and back. This is done, because DePool is a large and complex contract, and gas and storage fees are 10 times lower in basechain compared to masterchain. Keeping DePool on masterchain would be unreasonably expensive.
3. DePool is open for Participants’ stakes at all times, however, there is a deadline for participation in the upcoming elections. The deadline depends on the timer of the Elector. After the deadline, the incoming stakes will be accumulated for participation in the next elections.
4. DePool distinguishes stakes received before the deadline and after the deadline, therefore it stores information on Participant stakes in separate **investment rounds (or rounds)**, one for every elections, to facilitate subsequent distribution of stakes and rewards. To separate Elector communication, DePool uses 2 proxies: one for even rounds, one for odd.
5. In order to be time-aware, the DePool should be called from time to time. For this purpose the Timer contract is used. DePool Helper asks Timer to call it periodically and transmits every call from Timer to DePool. Interval between calls is chosen according to the elections interval.
6. DePool must be linked to a validator wallet to participate in elections on behalf of the latter. This validator wallet address is specified during DePool deployment and cannot be changed afterwards. When elections start, DePool waits for signed election requests from linked wallet, then attaches round stake to request and transmits it to Elector.
7. Validator can validate many DePools with 1 Validator wallet. Reputation of Validator wallet therefore is available and can be analyzed over time.
8. To ensure that the validator will perform its functions correctly (be always online and not "lie" to other validators), the validator wallet must itself become a Participant and invest in every investment round at least **m_validatorAssurance**, which is initialized in DePool constructor. This can be achieved with any of the three available types of stakes.
9. When Elector unfreezes validator stakes, DePool returns its stake back with round rewards. Part of the total reward is used to top up the DePool's own balance to a certain value. The rest is distributed as follows: **m_validatorRewardFraction%** goes to Validator wallet balance. **m_participantRewardFraction%** is distributed among all Participants in investment round (validator is also participant). **m_associationRewardFraction%** (can be equal to zero) goes to **m_association** address.
10. DePool keeps a balance for each Participant and can automatically reinvest Participant's stake into the next investment round if appropriate flag is enabled.
11. Participant can transfer part of its total stake to another Participant's stake inside DePool storage. This function allows for collateralization of the stake to provide liquidity to stake holders.

## Special kinds of stakes

Along with the basic ordinary stake, that functions according to the rules detailed above, there are 2 types of special stakes: vesting and lock stake.

While the entire ordinary stake is invested into the current pooling round (and will thus be reinvested every second round), lock and vesting stakes are split into two equal parts upon reception, which are invested into the current pooling round, and the next round. This way they can be continuously reinvested into both odd and even rounds.

### Vesting Stake

Any address can make a vesting stake and define a target participant address (**beneficiary**) who will own this stake. But not the whole stake is available to the **beneficiary** at once. Instead it is split into logical parts and the next part of stake becomes available to the participant only when next vesting period is ended. At completion step of every round DePool decides how many vesting parts should be unlocked and subtracted from vesting stake and become available to owner since last unlocking. These funds are added to beneficiary's ordinary stake.

Example: address A makes a vesting stake of 120 tons for 1 year with vesting period of 1 month and defines address B as the stake **beneficiary**. It means that after 1 month 10 tons become available to address B and 110 tons are still locked in the pool. After 1 year vesting stake will be equal to 0 and last 10 tons will become available to owner.

Vesting for validator beneficiaries is subject to additional rules: At the end of every withdrawal period, the part of the vesting stake to be released is divided proportionally into 2 parts — for rounds in this period when DePool successfully completed validation and received a reward (without slashing) and for rounds when DePool missed elections or was slashed. The portion of the stake corresponding to the successful rounds is sent to the validator, while the portion corresponding to the failed rounds is returned to the vesting stake owner. For example, if there were 100 rounds within the withdrawal period, and DePool successfully completed 80 of them, missed elections in 5 more and was slashed in the remaining 15, the validator will receive 80% of the unlocked part of the vesting stake, and the stake owner will get back 20% of it.

### Lock Stake

Any address can make a lock stake, in which it locks its funds in DePool for a defined period, but rewards from this stake will be payed to another target participant (**beneficiary**). At the end of a period the Lock Stake should be returned to the address which locked it.

Example: address A makes a lock stake of 120 tons for 1 year with vesting period of 1 month and defines address B as the stake **beneficiary**. It means that after 1 month 10 tons become available to address A (as opposed to vesting, where these 10 tons would become available to address B, the **beneficiary**) and 110 tons are still locked in round. DePool will reinvest the gradually diminishing lock stake for a 1 year and pay rewards to B address. After 1 year DePool will return the remainder of the lock stake to address A.

> One Participant can be a **beneficiary** only of one lock and one vesting stake. Once current lock or vesting stake of the participant expires, it can be repeated. When a stake of either of these types is created, it is split equally into two last rounds, which means that the minimal value for such stake is `2 * minStake + fee`.

## Specification

### Data Structures

DePool contract uses library and inheritance from several simple base contacts to separate functionality and facilitate development and debugging of the contract. The core data set stored by DePool is the following:

`DePoolLib.sol`

```solidity
// Describes contract who deposit stakes in DePool pool
struct Participant {
    // Count of rounds in which participant takes a part
    uint8 roundQty;
    // Sum of all rewards from completed rounds (for logging)
    uint64 reward;
    // count of parts of vesting stakes in the rounds
    uint8 vestingParts;
    // count of parts of lock stakes in the rounds
    uint8 lockParts;
    // Flag whether to reinvest ordinary stakes and rewards
    bool reinvest;
    // Target tons that will be transferred to participant after rounds are completed
    // After each round this value is decreased
    uint64 withdrawValue;
}

// Request for elections from validator wallet.
struct Request {
    // Random query id.
    uint64 queryId;
    // Validator's public key that will be used as validator key if validator will win elections.
    uint256 validatorKey;
    // current election id.
    uint32 stakeAt;
    // Validator's stake factor.
    uint32 maxFactor;
    // Validator's address in adnl overlay network.
    uint256 adnlAddr;
    // Ed25519 signature of above values.
    bytes signature;
}
```
`DePoolRounds.sol`
```solidity
// roundPre0 = m_rounds[m_roundQty - 1] — pre-pooling. Helper round for adding vesting and lock
//                                        stakes. When vesting/lock stake is added than stake is
//                                        split into two part. And first part invested into pooling
//                                        round and second part — pre-pooling.
//
// round0 = m_rounds[m_roundQty - 2] — pooling
// round1 = m_rounds[m_roundQty - 3] — election or validation
// round2 = m_rounds[m_roundQty - 4] — validation or investigation
// Algo of round rotation:
//     delete round2
//     round1         -> round2
//     round0         -> round1
//     roundPre0      -> round0
//     createNewRound -> roundPre0
mapping(uint64 => Round) m_rounds;

// count of created rounds
uint64 m_roundQty = 0;
```
`DePoolBase.sol`
```solidity
// Dictionary of participants for rounds
mapping (address => Participant) m_participants;

// Address of the validator wallet
address m_validatorWallet;

// Array of proxies addresses.
address[] m_proxies;
```
`DePool.sol`
```solidity
// Indicates that pool is closed. Closed pool doesn't accept stakes from other contracts.
bool m_poolClosed;
// Min stake accepted to the pool in nTon (for gas efficiency reasons): 10 tons is recommended.
uint64 m_minStake;
// Minimum validator stake in each round
uint64 m_validatorAssurance;
// % of participant rewards
uint8 m_participantRewardFraction;
// % of validator rewards
uint8 m_validatorRewardFraction;
// % of dePool association rewards
uint8 m_associationRewardFraction;
// Association address
address m_association;
// Minimum balance
uint64 m_minimumBalance;
```
### DePool Initialization

When deployed, the DePool constructor is called with the following parameters:

```solidity
/// @dev DePool's constructor.
/// @param minStake Min stake that participant may have in one round.
/// @param validatorAssurance Min validator stake.
/// @param proxyCode Code of proxy contract.
/// @param validatorWallet Address of validator wallet.
/// @param participantRewardFraction % of reward that distributed among participants.
constructor(
    uint64 minStake,
    uint64 validatorAssurance,
    TvmCell proxyCode,
    address validatorWallet,
    uint8 participantRewardFraction,
)
```

At initialization the variable `m_balanceThreshold` is set as current DePool account balance — 5 tokens. DePool will replenish its balance from validation rewards to this value every round it receives rewards.

## Participant functions

DePool stores some participant information in a dictionary (`m_participants`) where key — Participant's address and value — `Participant` structure.

Functions used by participants perform checks and send `receiveAnswer` message back to the caller with an error code and a comment in case of failure. If all conditions are met, DePool sends a confirmation message (`receiveAnswer` with status `0`) back to the caller.

All functions can be called by internal messages only.

1. `addOrdinaryStake(uint64 stake)` — allows to make an ordinary stake in the current pooling round. The source address of the message is taken as Participant's address. The Participant's total stake is increased by stake amount.

Parameters:

- `stake` — value of participant's stake in nanotons.

Function checks that:

- inbound message value is at least `(stake + ADD_STAKE_FEE)`;
- `stake` is at least min stake;
- pool is not closed.

Function returns change (part of unused `ADD_STAKE_FEE`).

2. `addVestingStake(uint64 stake, address beneficiary, uint32 withdrawalPeriod, uint32 totalPeriod)` — allows to add a vesting stake for another participant (**beneficiary**). The source address of the message is saved as the vesting stake owner.

Parameters:

- `stake` — value of participant's stake in nanotons (Note: this value is divided into 2 parts and is added to 2 rounds).
- `beneficiary` — address of target participant (beneficiary);
- `withdrawalPeriod` — the period in seconds after which the part of the vesting becomes available for beneficiary;
- `totalPeriod` — total period of vesting in seconds after which beneficiary becomes owner of the whole stake.

Function checks that:

- DePool is not closed (`m_poolClosed` ≠ true);
- `beneficiary` is an `addr_std`. It's not zero address. It's not the message sender (not self vesting);
- inbound `msg.value ≥ (m_minStake + ADD_STAKE_FEE)`;
- Message value is at least `stake + STAKE_FEE`;
- `stake / 2` is at least min stake;
- `withdrawalPeriod ≤ totalPeriod`;
- `totalPeriod < 18 years`;
- `withdrawalPeriod ≠ 0`;
- `totalPeriod % withdrawalPeriod = 0`;
- `beneficiary` doesn't have a vesting stake.

3. `addLockStake(uint64 stake, address beneficiary, uint32 withdrawalPeriod, uint32 totalPeriod)` — allows to add a stake that will bring rewards to another participant (**beneficiary**). The source address of the message is saved as the lock stake owner.

It has the same parameters and checks as `addVestingStake`, but it checks that participant doesn't have a lock stake instead of a vesting stake.

4. `withdrawFromPoolingRound(uint64 withdrawValue)` — allows to remove Participant's stake from the current pooling round.

Parameters:

- `withdrawValue` — desired amount of stake to be removed.

Function checks that:

- inbound `msg.sender` address is address of an existing participant.

If real ordinary stake is less than `withdrawValue`, then DePool returns the whole stake from pooling round.

If the remaining stake in the pooling round is less than `m_minStake`, then the whole stake is transferred to Participant.

If the remaining total stake of Participant is 0, then it is removed from the `m_stakeholders` dictionary.

5. `withdrawPart(uint64 withdrawValue)` — Allows a participant to withdraw some value from DePool. This function withdraws withdrawValue nanotons when rounds are completed. If participant stake becomes less than minStake, then the whole stake is sent to participant.

Parameters:

- `withdrawValue` — desired amount of stake to be removed.

Function checks that:

- pool is not closed (`m_poolClosed ≠ true`);
- inbound `msg.sender` address is address of an existing participant.

> If the remaining stake in the round is less than `m_minStake`, then the whole stake will be transferred to Participant (after completing round).
> If the remaining total stake of Participant is 0, then it is removed from the `m_stakeholders` dictionary.
6. `withdrawAll()` — Set global flag for the participant that indicates to return participant's ordinary stake after completing rounds.

Function checks that:

- pool is not closed (`m_poolClosed ≠ true`);
- inbound msg.sender address is address of an existing participant.
> After transferring all Participant's stake, the Participant will be removed from the m_stakeholders dictionary.

7. `cancelWithdrawal()` — Cancel effect of calls of functions `withdrawAll` and `withdrawPart`.

8. `transferStake(address dest, uint64 amount)` — allows to move amount of stake from `msg.sender` Participant to `dest` Participant inside DePool storage.

Parameters:

- `dest` — stake beneficiary;
- `amount` — stake value transferred to dest in nanotons.

Function checks that:

- pool is not closed (`m_poolClosed ≠ true`);
- `destination` is a non-zero `addr_std`;
- `msg.sender ≠ dest`;
- neither `destination` nor `msg.sender` is the validator wallet;
- inbound `msg.sender` address is address of an existing participant;
- desired `amount` can be transferred and transfer doesn't leave stake less than `m_minStake` in any round.
> In case of success DePool sends back a notification via onTransfer function calling to beneficiary.

### Functions of interface DePoolInfoGetter:

`function getLastRoundInfo() public`

If there is no completed round yet, call callback function `receiveDePoolInfo` with struct containing default values, else send call with struct containing info about last completed round.

```solidity
// Represent info about last completed round
struct LastRoundInfo {
    uint32 supposedElectedAt;
    uint8 participantRewardFraction;
    uint8 validatorRewardFraction;
    uint32 participantQty;
    uint64 roundStake;
    address validatorWallet;
    uint256 validatorPubkey;
    uint64 validatorAssurance;
}
```

### Participant callback functions:

These functions are called by DePool to send notifications to Participant.

1. `receiveAnswer(uint32 errcode, uint64 comment)` — function, which is called as an answer from DePool to Participant.

Arguments:

- `errcode` — error code. List of codes:

```solidity
uint8 constant STATUS_SUCCESS                                        =  0;
uint8 constant STATUS_STAKE_TOO_SMALL                                =  1;
uint8 constant STATUS_DEPOOL_CLOSED                                  =  3;
uint8 constant STATUS_NO_PARTICIPANT                                 =  6;
uint8 constant STATUS_PARTICIPANT_HAVE_ALREADY_VESTING               =  9;
uint8 constant STATUS_WITHDRAWAL_PERIOD_GREATER_TOTAL_PERIOD         = 10;
uint8 constant STATUS_TOTAL_PERIOD_MORE_18YEARS                      = 11;
uint8 constant STATUS_WITHDRAWAL_PERIOD_IS_ZERO                      = 12;
uint8 constant STATUS_TOTAL_PERIOD_IS_NOT_DIVED_BY_WITHDRAWAL_PERIOD = 13;
uint8 constant STATUS_PERIOD_PAYMENT_IS_ZERO                         = 14;
uint8 constant STATUS_REMAINING_STAKE_LESS_THAN_MINIMAL              = 16;
uint8 constant STATUS_PARTICIPANT_HAVE_ALREADY_LOCK                  = 17;
uint8 constant STATUS_TRANSFER_AMOUNT_IS_TOO_BIG                     = 18;
uint8 constant STATUS_TRANSFER_SELF                                  = 19;
uint8 constant STATUS_TRANSFER_TO_OR_FROM_VALIDATOR                  = 20;
uint8 constant STATUS_FEE_TOO_SMALL                                  = 21;
uint8 constant STATUS_INVALID_ADDRESS                                = 22;
uint8 constant STATUS_INVALID_BENEFICIARY                            = 23;
uint8 constant STATUS_NO_ELECTION_ROUND                              = 24;
uint8 constant STATUS_INVALID_ELECTION_ID                            = 25;
```
- `comment` — some value attached to error code.

2. `onTransfer(address source, uint128 amount)` — function, which is called after successful `transferStake` to inform beneficiary.

Arguments:

- `source` — address of Participant who made transfer;
- `amount` — funds that were transferred.

3. `onRoundComplete(uint64 roundId, uint64 reward, uint64 ordinaryStake, uint64 vestingStake, uint64 lockStake, bool reinvest, uint8 reason)` — send a notification from DePool to Participant when round is completed:

- `roundId` — Id of completed round;
- `reward` — Participant's reward in completed round in nanotons;
- `ordinaryStake` — ordinary stake in completed round;
- `vestingStake` — vesting stake in completed round;
- `lockStake` — lock stake in completed round;
- `reinvest` — are ordinary stakes automatically reinvested (prolonged)?
- `reason` — reason why round is completed (See enum CompletionReason).

## DePool owner functions:

These functions can be called only by the DePool owner, **as they have to be signed with the deploy keypair**.

1. `terminator()` [external msg only] — a method to close DePool. All stakes from all rounds are returned in several phases:

a. first of all, stakes from pooling round are returned immediately.
b.`m_poolClosed = true`;
c. All other rounds will return stakes after their "completed" step.

> **Important:** remaining parts of vesting/lock stakes will be sent to owners of those stakes (not to beneficiaries)

2. `setValidatorRewardFraction(uint8 fraction)` **[external msg only]**

Sets new validator's reward fraction and calculates new participants' reward fraction. New validator's reward fraction must be less than current one and be not zero.

`fraction` — new validator's reward fraction.

### Events

- `DePoolClosed()` — event emitted when pool is closed by terminator() function.
- `RoundStakeIsAccepted(uint64 queryId, uint32 comment)` — event is emitted on accepting stake by elector.
- `RoundStakeIsRejected(uint64 queryId, uint32 comment)` — event is emitted on rejecting stake by elector.
- `ProxyHasRejectedTheStake(uint64 queryId)` — event is emitted if stake is returned by proxy (IProxy.process_new_stake) because too low balance of proxy contract.
- `ProxyHasRejectedRecoverRequest(uint64 roundId)` — event is emitted if stake cannot be returned from elector (IProxy.recover_stake) because too low balance of proxy contract.
- `RoundCompleted(TruncatedRound round)` — event is emitted on completing round.
- `StakeSigningRequested(uint32 electionId, address proxy)` — Event emitted when round is switched from pooling to election. DePool is waiting for signed election request from validator wallet.
- `TooLowDePoolBalance(uint replenishment)` — event emitted when pure DePool's balance becomes too low. replenishment minimal value that must be sent to DePool via receiveFunds function.
- `RewardFractionsChanged(uint8 validator, uint8 participants)` — event emitted when contract owner changes reward fractions. validator — validator's reward fraction. participants — participants' reward fraction.

## Get-methods

These get-methods are used for local run.

1. `getParticipantInfo(address addr)` — returns participant's information about stakes in every rounds;
2. `getDePoolInfo()` — returns DePool configuration parameters and constants;
3. `getParticipants()` — return list of all participants;
4. `getRounds()` — returns information about all rounds.
5. `getDePoolBalance()` — returns DePool's own balance in nanotokens.

> The DePool does not store validator public keys or ADNL address, because, according to the official Everscale guide, the Validator generates a new keypair and ADNL for every elections. The contract stores only Validator wallet address.

## State update function

`ticktock()` — this function is the "engine" of DePool. This function rotates rounds: creates a new round if necessary and removes an old one. Switches steps of rounds and calls various internal functions if certain conditions are satisfied and so on.

`ticktock()` — does not `accept` external inbound messages and can be called only from other contracts `ticktock` returns unspent message value (change) back to caller.

## Multi-Round elections

![Multi-Round elections](/img/multi-round-elections.png)

Every round goes through several steps:

1. **"PrePooling"** step (RoundStep.PrePooling) — it's an imaginary round introduced to store half of vesting/lock stake from participants. See `addVestingStake/addLockStake` functions.
2. **"Pooling"** step (RoundStep.Pooling) — round is ready to accept stakes from Participants. This round receives ordinary, vesting and lock stakes.
3. **"waiting for election requests"** step (RoundStep.WaitingValidatorRequest) — round is switched to this step when validator elections begin. DePool is waiting for signed election request from validator wallet. See `process_new_stake` function of [Elector](https://github.com/tonlabs/ton-1/blob/master/crypto/smartcont/elector-code.fc) to properly generate election request.
> **Important:** Validator wallet must also be a Participant and invest at least `m_validatorAssurance` stake in the round. If it doesn't, round is completed and stakes are reinvested in another round or are returned to participants.
4. **"Waiting if stake is accepted by elector"** (RoundStep.WaitingIfStakeAccepted) — DePool has received the validator signed election request. DePool has sent the whole round stake to elector through one of its proxies. Now DePool is waiting for elector answer. Note: elector will call DePool's `onStakeAccept` function if election request is accepted successfully or `onStakeReject` in case of an error.
5. **"waiting for validation start"** (RoundStep.WaitingValidationStart) — round stake was accepted by elector. Validator is a candidate. DePool now is waiting for the start of the validation to find out if validator won the elections.
6. **"waiting for election result"** (RoundStep.WaitingIfValidatorWinElections) — DePool has tried to recover stake in validation period to find out if validator won elections. Waiting for elector answer. Note: If validator won the elections, elector returns no stake. If Validator lost the elections, elector returns the whole stake.
7. **"waiting stake unfreeze"** (RoundStep.WaitingUnfreeze) — If `CompletionReason != Undefined`, the round is waiting round rotation to return/reinvest funds because elections were lost. Else validator won elections. DePool is waiting for ending of unfreeze period to recover funds from elector.
8. **"waiting for a reward"** (RoundStep.WaitingReward) — Unfreeze period has been ended. Request to recover stake has been sent to elector. DePool is waiting for answer from elector.
9. **"completing"** step (RoundStep.Completing) — DePool receives reward and replenishes its balance from it. Then it returns or reinvests participant's stakes. Also on this step DePool recounts vesting and lock stakes and modifies them if necessary.
10. **"completed"** (RoundStep.Completed) — round switches to this step after processing all the Participants in the round. In next `ticktock` this round will be deleted.

## Round completion

When a round switches to "completing" step (`completeRound` function), the DePool replenishes its balance from received rewards and then starts to cycle through all stakes in the round. If Participant's reinvestment flag is `false`, DePool sends it back to the Participant, otherwise — adds it to the pooling round. Also DePool sends notification message (`onRoundComplete`) to Participant.

DePool goes through all vesting and lock stakes of the completing round and checks whether a withdrawal period has finished for the current stake. If it has, DePool modifies the stake via transferring part of it to Participants ordinary stake (in case of Vesting) and/or transferring part of the stake back to the owner (in case of Lock or in case of Vesting for validator which was slashed or lost elections over the course of the completed withdrawal period).

> **Remark:** if there are 15000 stakes in round, then the contract should split completion to 375 transactions sending 375 `completePendingRound` messages to itself. All these transactions can fit in 1-2 blocks and the whole operation will take about 5-20 seconds.

## DePool decentralization

1. No inherent way to replace the contract code (no SETCODE);
2. No inherent way to transfer an arbitrary amount of currency from the DePool;
3. Any contract can call the `ticktock()` function to update the state of the DePool;
4. No one has special privileges, except for deployer of DePool who can only close DePool and start a procedure of returning all stakes back to Participants;
5. Fees cannot be changed after the contract is deployed;
6. Validator wallet must be a Participant as well to share risks with other Participants.

## DePool contract fee

Caller of DePool's `ticktock` function must pay for consumed gas. Unused message value is returned back when `ticktock` is finished.
At the beginning of completing step DePool first takes from the total reward an amount of tokens to replenish it's balance to `m_balanceThreshold`, and then additionally `RET_OR_REINV_FEE * (N + 1)`, where `N` is the number of participants, to cover the costs of stake processing.

## Links

DePool contract is available on [github](https://github.com/tonlabs/ton-labs-contracts/tree/master/solidity/depool).

DePool deployment instructions can be found [here](https://docs.ton.dev/86757ecb2/v/0/p/37a848-run-depool).
