# FAQ

# Table of contents

- [General](#general)
- [Stake and rounds](#stake-and-rounds)
- [Ensuring Regular Operations](#ensuring-regular-operations)
- [Rewards Distribution](#rewards-distribution)
- [Troubleshooting](#troubleshooting)

## General

### What is DePool?

DePool is a smart contract that allows other smart contracts to invest stakes into a common pool, which it then uses in validator elections on behalf of the validator owning the DePool, and upon successful validation pays rewards to all participants proportionally to their contribution.

### Are there multiple versions of DePools? 

Currently only one version of the DePool is used: the current [master](depools.md) version.

### Are there multiple types of nodes?

At this time available node types include the original C++ EVER node and the EverX Rust node (currently being tested on rustnet). DePool works with both versions.

### Is DePool some special kind of wallet? How can I be sure no one’s going to misuse my funds?

DePool is not a wallet with a single balance. It remembers which wallets invested which stakes. A stake cannot be withdrawn from DePool to any wallet that isn’t the owner of the stake. The DePool owner has no access to any stakes other than their own. All the owner can do is close the DePool, in which case all stakes and rewards are returned to their owners.

There are however some risks involved: if DePool's validator node wins elections, but doesn't function correctly, it may be punished by the elector, and part or all of its stake may be lost.

For this reason, the DePool owner is obliged to invest a certain amount of tokens each validation round, all or some of which they stand to lose, and will be the first among the participants to lose, should their node perform poorly or misbehave in any way. This way participants can be sure, that the person upon whose actions their funds and rewards depend is highly motivated to perform their duties properly and ensure everyone receives their rewards.

The contract code in open sourced and formally verified. See [specifications](../../learn/decentralization/depool-specifications.md) and contract [code](depools.md) for details.

### What is validator assurance?

It is the minimum amount of tokens the DePool owner is obliged to invest each validation round. Without it, DePool will not participate in elections. DePool owner's funds will be the first lost, in case of any validator node malfunction or misbehavior. Only if they are not enough to cover the losses of the total stake, will the funds of other pool participants be affected.

So the higher the validator assurance, the more the validator owner is motivated to ensure proper operation of their node and the safer the stakes of all other participants are.

This parameter of the DePool cannot be changed after the DePool is deployed, not even by its owner.

### What is DePool fee?

It is the fraction of the total DePool reward, that goes directly to the validator's wallet each time rewards are received. Validator needs it to cover current operational expenses of the node and the DePool.

The rest of the rewards are distributed among all DePool participants, proportionally to their stakes.

So the lower the DePool fee, the more profitable the DePool is for participants.

### Why even use DePool? What are the advantages?

Becoming a validator requires a substantial cryptocurrency deposit. The required amount might far exceed an individual validator budget. On the other hand, blockchain users with no validating system might be interested in investing in validation duty. This is where the DePool contract comes in.

There are two main use cases of DePool:

- User has no Validator capabilities but some free funds. User can support a third-party Validator and receive rewards.
- User has Validator capabilities and but doesn't have necessary amount of funds to participate in validator elections and subsequent rewards.

Thus the usage of DePool allows to greatly expand the number of individuals involved in validation process and decentralize the network to a much higher degree.

### How does DePool work?

The DePool system has several components.

- The validator node, which is the same, as a regular node. It forms election requests and performs validation.
- The validator wallet - the wallet belonging to the validator. Normally it holds the funds to be used in stakes and sends them with election requests to the elector directly. In a DePool system however the staking funds are kept in the DePool: the validator wallet has to invest its funds into the DePool and sends its the election requests through the DePool as well.
- The DePool itself collects stakes from the validator and any other participants, who wish to invest in validation, receives election requests from validator wallet, attaches the collected funds, and through its proxies passes it to the elector. Whenever elector returns the stake, DePool processes it and distributes rewards among its participants.
- The DePool needs to be called regularly, to perform its functions. There are several methods to do it, both manually and automatically.

### How configurable is a DePool? What settings can I define?

DePool has a number of parameters that its owner can set during deploy. Note, that these parameters cannot be changed after deploy. You’d have to close the current DePool and set up a new one, if you need to change them. The parameters are:

- `minStake` - minimum stake that DePool accepts from participants. It's recommended to set it not less than 10 everss.
- `validatorAssurance` - minimal stake for validator. If validator has stake less than validatorAssurance, DePool won't be taking part in elections.
- `validatorWalletAddress` – validator wallet address.
- `participantRewardFraction` - percentage of the total DePool reward that goes to Participants.

Proxy contract code is also provided to the DePool at deploy, but has no bearing on its performance. It simply lets DePool deploy its own proxies, thus simplifying the setup.

### How do I choose DePool deploy configuration?

The [DePool configuration](depools.md) will influence the appeal of your DePool to potential participants and its success in competition to the other DePools out there:

- `minStake` – minimum stake that DePool accepts from participants. If set to high, some small token holders won’t be able to invest, whereas a very low minimal stake will permit participants to make small pointless stakes, where DePool fees will eat up a significant part of their reward and/or investment. 10 tokens is the recommended minimum for this parameter.
- `validatorAssurance` determines how much you take it upon yourself to invest in the DePool every election and lose in case of any validator node malfunction or misbehavior. If set too small, potential participants might decide you aren't risking enough and avoid your DePool in favor of others. Should be chosen depending on the current competition in the network.
- `participantRewardFraction` determines what percentage of the total reward all participants will receive. DePool is a complex contract that takes up a lot of computational resources to run. Depending on the setup, other contracts involved in DePool operations, such as the validator wallet, also regularly spend significant amounts on their operation. Thus DePool is programmed to reserve a part of the total rewards it receives for it’s own balance, and send a part the rewards (100% - `ParticipantRewardFraction`) directly to the validator wallet. Only then does it distribute ParticipantRewardFraction % of the rewards between all participants. So, if this parameter is set too small, other DePools might draw potential participants away. If it is set too big, your validator wallet might not receive enough rewards to support validation and staking. It should be chosen to balance these two concerns.

### What are the risks of using DePool?

Validator using a DePool bears the same risks as a validator participating in elections through their own wallet and with only their own funds directly – in case of malfunction or misbehavior of their node during validation, part of the total stake or all of it may be lost. As in DePool there are usually other participants, who have no control over the node, the DePool is programmed to preserve as much of their funds as possible – the losses are deducted from the validator’s investment first, and only then from other participants.

There are also some operational risks associated with the DePool specifically. If any of the contracts involved in its operation run out of funds, DePool might get up stuck and miss elections. Learn how to prevent that here.

## Setting up

### How do I set up a validator node with a DePool?

You have to follow this [procedure](depools.md) exactly. To briefly sum up, you have to do the following:

1. Set up a node;
2. Set up a validator wallet. For security, we advise to have not less than three custodians in this wallet;
3. Insert one custodian keypair for the validator wallet and its address into the node files;
4. Deploy DePool and do not forget to set up a state update method for it;
5. Make the necessary stakes in the DePool – ensure at least validatorAssurance is staked every round. All types of stakes count towards this value;
6. Set up validator script;
7. If required, confirm any transactions that the validator script or the state update method you set up generates.

If all is set up correctly, DePool should participate in the next validator elections. If it doesn’t, [here](depools.md/#troubleshooting) is some troubleshooting advice.

### What do the validator contest winners need to do differently?

The main requirement specific to validator contest winners is their validator wallet. The vesting stake they will receive on the main net will be assigned to this specific wallet, and won’t count towards `validatorAssurance`, if this wallet isn’t used as validator wallet.

So if you are a winner of the DePool contest:

1. make sure to insert the address of this wallet and any one of the custodian key pairs you set up for this wallet during deploy into your node files.
2. specify it's address as validator wallet during DePool deployment.

Another important detail is the `validatorAssurance` parameter at DePool deployment. As the rewards for winning the contest are fixed, to make sure your DePool participates in every election, regardless of any additional stakes you make, you should set validator assurance no higher than contest reward/2. [Here’s why](#whats-this-about-lock-and-vesting-stakes-split-into-two-parts).

### What are the possible state update methods for the DePool?

Currently there are two:

1. Using a [multisig contract](depools.md/#state-update-through-multisig-contract) to call the DePool ticktock function directly. This requires monitoring and regular replenishing of the multisig contract balance and can be automated with any task scheduler. Note, that if the multisig contract requires multiple signatures to execute transactions (for example, if it’s a contest winner’s wallet with three custodians), every such transaction has to be confirmed by the required number of custodians.
2. Setting up a [DePool helper](depools.md/#state-update-through-depool-helper-contract-temporarily-unavailable) contract and calling it with external messages. This also requires monitoring and regular replenishing of the helper contract balance and can also be automated with any task scheduler.

### Why are two proxies necessary?

DePool maintains multiple rounds at once to ensure participants can make their stakes at all times. Two proxies are required to establish separate communication with the elector for odd and even rounds. This setup prevents stakes from consequent rounds getting mixed up in the event of any DePool lag, for example, if the DePool runs out of funds and sends some of its messages to the elector later than usual. Without two separate proxies for odd and even rounds, elector may combine two consequent stakes into one, and it would not be possible to accurately calculate how the rewards should be distributed between participants of the two rounds, which might have changed their stakes in-between them.

## Stake and rounds

### How do DePool rounds work?

To make sure participants can invest their funds in the DePool at any time regardless of the current stage of the election cycle, DePool runs its operations in multiple rounds at once, and one of these rounds is always in the pooling stage (is ready to receive stakes).

Whenever a new election on the network begins, the current round in the pooling stage is switched to the next stage – election - and can no longer receive stakes. Everything, that DePool accumulated during pooling is attached to validator's election request and staked in the elections. 

The next round then enters pooling stage, gathering stakes for the next election.

In practice this comes down to alternating odd and even rounds. When a round completes its last stage and is removed from the DePool, the round after the next locks its accumulated stake (including any stakes released from the just completed round, that were reinvested) and enters elections.

![](../../learn/img/depool-rounds.png)

So to make sure DePool participates in every election, you have to ensure sufficient stakes are invested (and set to be reinvested) in even and odd rounds both.

### What do the parameters displayed by getRounds method mean?

You can find a list of `getRounds` parameters and their meanings here.

### What types of stakes are there?

There are three types of stakes supported:

#### Ordinary stakes

This is the most basic type of stake. Any account (for example, any wallet) can make an ordinary stake. Its full value is invested in the DePool round that is currently in the pooling stage, and set to be continuously reinvested into every second round. The account that made the ordinary stake owns its entirety.

Such a stake can increased: the value of any additional ordinary stakes from this account is simply added to the account’s ordinary stake in the current pooling round. Any rewards a participant receives in the DePool are also added to their ordinary stake. If a participant initially has no ordinary stake (e.g. is a beneficiary of a single vesting stake from which it receives rewards), and ordinary stake is created for it when the first reward is received.

An ordinary stake, or a part of it can be withdrawn only to the account that owns it.

An ordinary stake can also be transferred, in part or in full, to another participant of the same DePool (if this other the participant does not currently have an ordinary stake, it will be created).

#### Vesting Stakes

Any account can make a vesting stake and define a target participant address (beneficiary) who will own this stake. But not the whole stake is available to the beneficiary at once. Instead it is split into logical parts and the next part of stake becomes available to the participant only when next vesting period is ended. At completion step of every round DePool decides how many vesting parts should be unlocked and subtracted from vesting stake and become available to owner since last unlocking. These funds are added to beneficiary's ordinary stake.

**Example:** address A makes a vesting stake of 120 evers for 1 year with vesting period of 1 month and defines address B as the stake beneficiary. It means that after 1 month 10 evers become available to address B and 110 evers are still locked in the pool. After 1 year vesting stake will be equal to 0 and last 10 evers will become available to owner.

**One Participant can be a beneficiary only of one vesting stake.** When a vesting stake is created, it is split equally into two last rounds, to make sure it can be uniformly reinvested into odd and even rounds both.

To receive a vesting stake, participant has to first specify the donor, that is expected to make it.

#### Lock Stakes

Any account can make a lock stake, in which it locks its funds in DePool for a defined period, but rewards from this stake will be payed to another target participant (beneficiary). At the end of a period the Lock Stake should be returned to the account which locked it.

**Example:** address A makes a lock stake of 120 evers for 1 year with vesting period of 1 month and defines address B as the stake beneficiary. It means that after 1 month 10 evers become available to address A (as opposed to vesting, where these 10 evers would become available to address B, the beneficiary) and 110 evers are still locked in round. DePool will reinvest the gradually diminishing lock stake for a 1 year and pay rewards to B address. After 1 year DePool will return the remainder of the lock stake to address A.

**One Participant can be a beneficiary only of one lock stake.** When a lock stake is created, it is split equally into two last rounds, to make sure it can be uniformly reinvested into odd and even rounds both.

To receive a lock stake, participant has to first specify the donor, that is expected to make it.

### What’s this about lock and vesting stakes split into two parts?

The total funds of lock and vesting stakes do get split into two equal parts, and each half is invested into the current pooling round and, once it's locked, into the next pooling round. This is done, because the same stake can only be reinvested every second DePool round. The funds simply don't get unlocked in time to be reinvested into the very next one. On the other hand, one participant can be a beneficiary of only one lock and one vesting stake. So by splitting them into two parts, DePool makes it so a single lock or vesting stake is continuously reinvested into every single DePool round, and, provided it exceeds `validatorAssurance` *2, enough to participate in every validator election.

### How is the validator’s stake different?

Validator's stake in their own DePool has certain requirements and limitations it must conform to. Most importantly, it has to always (both in odd and even rounds) exceed the `validatorAssurance` parameter. Otherwise DePool won't participate in elections. These are the funds validator invests in their DePool to guarantee their conscientious performance to any other participants of the pool. These funds will be the first lost, in case the node misbehaves and is punished by the elector.

All three types of stakes count towards reaching this limit.

Additionally, the ordinary stake of the validator wallet cannot be transferred to another participant of the DePool, nor can any other participant's ordinary stake be transferred to the validator. This rule prevents attempts to circumvent the above requirement.

### Do lock and vesting stakes count toward `validatorAssurance`?

Yes, if the validator wallet is the beneficiary of a lock and/or vesting stake, they count towards the validatorAssurance requirement. A single lock or vesting stake is enough to ensure your DePool participates in every election, if it is equal to or greater than `validatorAssurance`*2.

### How do I make stakes?

Currently, this can be done through [TONOS-CLI](../../develop/api-sdk-tools/tonoscli.md). It should be configured to be used with DePool. A participant needs to know the DePool address and have a suitable contract holding the funds they want to invest (e.g. a multisig wallet).

[Ordinary](depools.md/#1-ordinary-stake), [vesting](depools.md/#2-vesting-stake) and [lock](depools.md/#3-lock-stake) stakes all have their own commands, that should be used to make a stake in the DePool, as they all have different sets of parameters, that need to be specified, when the stake is sent to the DePool.

All participants' stakes have to exceed the minimum stake set for the DePool (`minStake` DePool parameter). Validator's stake in every round has to additionally exceed `validatorAssurance`.

### I made a stake but DePool returned my funds. What's wrong?

There can be several reasons this happened:

- The stake was too small. Check DePool Info to find out the minimum stake for this DePool.
- DePool is closed. Check [DePool events](depools.md/#using-depool-events) to find out if it is.
- You are trying to make a lock or vesting stake on behalf of a wallet that did not set a donor for lock or vesting. Check Participant Info for the beneficiary.
- You are trying to make a lock or vesting stake on behalf of a wallet that already has this type of stake. Check Participant Info for the beneficiary.
- There are errors in lock or vesting period settings (`withdrawalPeriod` > `totalPeriod`, `totalPeriod` > 18 years or totalPeriod <=0 seconds, or `totalPeriod` is not exactly divisible by `withdrawalPeriod`).
- You are using an old TONOS-CLI version (<1.25).

### Can I make a lock or vesting stake for myself?

Starting with version 3 of the DePool, yes.

### How are stakes reinvested and withdrawn?

Whenever an ordinary stake is made, it is set to be continuously reinvested. The participant who made the stake may [disable reinvestment](depools.md/#reinvest-stakes) at any time, and the entirety of their ordinary stake will be withdrawn to their wallet as soon as the funds are unlocked from the rounds they are invested in.

A [part of the ordinary stake](depools.md/#1-ordinary-stake) can also be withdrawn. The remainder of the stake will keep being reinvested in this case.

[Lock](depools.md/#3-lock-stake) and [vesting](depools.md/#2-vesting-stake) stakes are reinvested for the full duration of their existence, which is set during their investment.

### What are the DePool fees for staking operations?

The sender of any stake management transaction (including withdrawal and transfer) is required to cover DePool fees for this operation. These fees are normally under 0.5 tokens, so by default this value is additionally attached to any transaction to the DePool, and the change is returned to the sender.

If for any reason a value of 0.5 tokens proves to be insufficient (and DePool starts running out of gas trying to execute a transaction), it can be [increased in TONOS-CLI config](depools.md/#7-configure-depool-state-update-method).

Additionally, when DePool receives the stake and rewards back from elector and processes the funds of participants, 0.05 evers are deducted from every participant's share of the pool, to cover the costs of executing this action.

### How do I view my stakes in the DePool?

It can be done with the `getParticipantInfo` get-method. [Here's how.](depools.md/#using-get-methods)

## Ensuring Regular Operations

### How do I make sure my DePool always participates in elections?

Make sure that:

1. your validator wallet has at least validatorAssurance staked in both odd and even rounds. Your own ordinary stakes, as well as Lock and vesting stakes, where you are the beneficiary, count towards validatorAssurance
2. you set up the state update method to run regularly
3. you have sufficient funds on the balances of all contracts (DePool, validator wallet, proxies, helper, if you use it, multisig, that updates the DePool state, if you use it)
4. your validator script generates the election request correctly.

You can find some troubleshooting advice [here](depools.md/#troubleshooting).

### How do I make sure my DePool wins elections?

No guarantees here, just as with any elections. Configure your DePool to be competitive and appealing to participants and develop your reputation.

### How often do I have to call the DePool state update function?

The period for state updates should be chosen based on the duration of the validation cycle on the blockchain. At the very minimum DePool's state update function should be called three times during the validation cycle:

1. Once after the elections begin, so DePool gets ready to receive and forward validator's [election request](depools.md/#3-validator-script-and-election-request-issues).
2. Once after the validation begins, to find out if it won elections or not.
3. Once after unfreeze, to process stakes and rewards and rotate the rounds.

In the current network configuration, 1 and 3 coincide, so DePool's state update function can be called twice during the validation cycle - once during elections and once during validation.

### How do DePool and its supporting contracts receive funds for their operations?

Each of the contracts involved has its own balance from which funds are spent on any operations it performs. These balances have to be replenished regularly.

For **DePool** this is automated. Whenever DePool receives validation rewards, it tops up its balance depending on number of participants. If it fails to do so, and the balance dips below 10 tokens, it emits an event notifying of the problem.

**Proxy contracts** also receive the necessary funds automatically, but if for any reason their balance becomes to low to perform the necessary operations, the DePool will also [emit an event](depools.md/#2-depool-isnt-emitting-events) notifying about it. You can replenish their balance, then [call the DePool’s state update function](depools.md/#7-configure-depool-state-update-method) by any available means, and resume normal operations.

**Helper contract**, if you use it, doesn’t have built-in balance replenishing mechanisms. It has to be monitored and replenished separately. Same goes for the multisig contract you use for DePool state update, unless it’s your validator wallet.

The **validator wallet** gets a fraction of the total DePool validation rewards each time they are received. The specific percentage is set during DePool deployment. These funds are transferred to the validator wallet directly and usually cover all its expenses related to running a DePool sufficiently well.

### My DePool is constantly running out of funds. What do I do?

You can set up a script which will listen for the low balance DePool event and top it back up to 100 tokens, whenever the event occurs.

### How do I monitor what’s happening to my DePool?

There is a number of methods available, such as DePool events, get methods and the [ever.live](https://ever.live) explorer. Read more here.

## Rewards Distribution

Every time DePool receives rewards for validation, DePool replenishes it's pure balance to be more than `balanceThreshold` and the rest is distributed according to the following rules:

1. `validatorRewardFraction`% of the reward, regardless of the validator’s share in the pool, goes directly to the validator wallet. This is the reward for maintaining the node and is intended to be used on operational expenses.
2. `participantRewardFraction`% of the reward is distributed among all participants (including the validator) proportionally to their share of the staking pool. By default these rewards are added to the ordinary stakes of all participants and reinvested with it. To withdraw this stake or any part of it to the participant wallet, use one of the withdrawal functions.
3. The remaining `associationRewardFraction`% of the reward is transferred to the DePool Association. This is not yet implemented.

## Troubleshooting

You can find some troubleshooting advice [here](depools.md/#troubleshooting).
