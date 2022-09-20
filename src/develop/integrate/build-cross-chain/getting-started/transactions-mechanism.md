---
sidebar_position: 1
---

# Transaction types and their mechanics

Octus Bridge is a cross-chain solution delivered by Broxus. It is designed to connect different networks and relies on Everscale blockchain for transfer processing.   
The bridge has a classic operational model with relayers (validators) tasked with signing transfers. All communication between users and relayers takes place only on-chain with the help of smart contracts. 

## DAO and bridge's economic model

There is a native BRIDGE token that can be used for both DAO voting and as locked collateral to be connected to the network as a relayer. Respectively, to be a relayer, you need to stake 100k BRIDGE tokens. This amount will probably decrease in the near future.

In the event that relayers halt operation on the network they can unlock their tokens in a month's time. Conversely, ordinary users can withdraw tokens any time, with the exception if he/she voted for a DAO proposal. In this case, tokens will be available after the voting for the proposal ends - a three days process. 

For staking, the user is credited with shares. Bridge's revenue is distributed in rounds. Each round is closed by the decision of the DAO. The income is divided into two: half is distributed among relayers, and the other half between ordinary users who have been staking their tokens. Users' rewards are paid out in proportion to the number of shares they possess. 

## Where does the income come from?

Octus Bridge has an interesting monetization model that relies on the coming widespread adoption of cross-chain solutions and on the Everscale blockchain itself. There are no commissions for now for most liquid tokens, like USDT. Instead, the bridge takes part of locked tokens and uses them for income generation. For the other tokens there is a commission model. 

With the growing popularity of the Everscale blockchain and an increasing number of projects, more and more liquidity will go to our network. As a result, the bridge will use the accumulating liquidity to generate more income.

For instance, when you transfer USDT from Ethereum to Everscale, these USDT are locked in the Vault contract on the Ethereum network, while the bridge issues the needed amount of USDT guaranteed by Octus Bridge on the Everscale network. 

The Bridge takes part of tokens locked in the Vault and invests them in liquid protocols such as Curve and Compound. These investments are called **Strategies**, (DAO voted). With each round closing, the funds earned are used to buy BRIDGE tokens from the market to distribute them among relayers and stake-holders.

In addition, the Bridge offers the option to transfer DAO solutions. It works, for instance, when participants of Everscale DAO vote for a proposal with **Actions** on other networks. In case the proposal is accepted, it is signed by relayers and executed on behalf of the DAO on the needed network. 

That's a huge benefit considering that DAO voting can be conducted on a very cheap network (Everscale), and decisions executed on an expensive network (for example, Ethereum).

## Vault/MultiVault

Everscale is the home network for Octus Bridge. In non-home networks (currently only EVM), there are two types of storages for tokens - Vault and MultiVault.

The Vault is a storage for highly liquid tokens with an attractive investment opportunity. Usually, these tokens have analogues on other networks (for example, USDT, with Ethereum as home, it is also available on other networks). 

The Vaults are configured manually with each token having Its own contract Vault.sol on every network. There won't be too many manually configured Vaults. That's cause they are mainly envisaged for tokens with a high investment potential. 

At the moment, they are: DAI, USDT, USDC, WETH, WBTC. Also, there is WEVER, but its Vault implementation is different due to its home network being Everscale. It will not be examined in this guide.

For the mentioned tokens, the following cross-chain transfer can be made (EVM→ EVM). Also, these tokens could potentially participate in (Strategies) for generating income.

Vaults have limits (set by the DAO) on the number of tokens they can accept. This is a way to manage risks, given the fact that different networks have their own security policies. 

For instance, Fantom network has a low limit on the max USDT the Vault can accept (100k). The limit is higher for BSC, and the highest for Ethereum. 

**MultiVault** is a multi-storage that allows the transfer of any tokens to the Everscale network as well as withdrawal of any tokens from the Everscale network.

In MultiVault logic, there are two types of tokens: Native and Alien. 

**Native** - is a token whose home network is Everscale. When someone transfers these tokens from Everscale to EVM, tokens lock on the Everscale side, and the bridge will issue tokens on the EVM network guaranteed by the bridge. And when those tokens are transferred back to the Everscale, the bridge will burn them on the EVM side and unlock tokens on the Everscale.

**Alien** - is a token whose home network is not Everscale. In this case, the bridge locks tokens on Multivault and issues TIP 3 tokens on Everscale guaranteed by the bridge.

MultiVault is always one contract on each EVM network. When you transfer native tokens to the EVM network, this contract will create an ERC 20 contract controlled by the bridge for them if necessary. Also, MultiVault contract can accept any alien ERC 20 tokens for which TIP 3 tokens will be created if necessary to withdraw on the Everscale side.

If you transfer the same token, for instance, Aave, from multiple networks (Ethereum, Polygon, Arbitrum) onto Everscale, for each one of them different alien TIP 3 tokens will be created. Cross-chain transfers for such tokens are not possible by default. But there are special mechanics to MERGE different alien TIP-3 tokens by the bridge manager.

## Pros and cons of Octus Bridge

The EVM part of the bridge is quite simply designed, which is a big advantage due to the fact that there is less room for errors.

On the other hand, the Everscale part of the bridge is much more complicated. However, significant advantages lay in the fact that all decision-making as well as the communication between users and relayers are on-chain via smart-contracts

Thanks to Everscale's unique feature, relayers do not pay gas fees for signing transfers, instead, the user does. You create a transfer contract and deposit EVERs. The contract loads the list of registered relayers and they say their Yes/No with the help of External messages. This way, relayers do not have overhead costs for confirming transfers.  

Technically, DAO can set commissions for Vault and MultiVault deposit and withdrawal operations. Currently, commissions are introduced only for MultiVault. Also, It should be noted that commissions can be changed separately for every token.

No commissions on Vaults with high liquidity tokens is both a plus and a minus. The plus is in cheap transfers, and the minus is that there isn't an automatic market mechanism for balancing liquidity between networks.

Transferring liquid tokens (Vault) at times with little liquidity entails two cases. You either need to wait for some time until the liquidity is accumulated (no more than the TTL of the relay round - now it's 2 weeks) or complete the transfer by adding it to the withdrawal queue. In this scenario, the transfer will be completed later. 

Also, you can set a reward for the one who provides the liquidity to complete the transaction. However, If the transfer hangs in the queue for too long and liquidity is not accumulated, it can be cancelled.

Despite the fact that technically everything seems to be ready for the bridge to be run by the DAO, for now it is controlled by the Broxus multisig. Probably, when all features of the bridge are settled down, it will be entirely managed by the DAO. 

For now, you can think of relayers as hot wallets that sign transactions in real time, while Broxus multisig as hardware wallets that are used to update the bridge. 

Vaults have limits on withdrawals from the Everscale. They are for the maximum amount for one transfer and the total amount for withdrawal per token in a day. If the limit is exceeded, transfers are placed in a queue waiting for confirmation from the DAO or Guardian - a risk management issue. 

At the moment, the bridge has limited possibilities for transmitting useful data along with transfers. It is possible to transmit some data for automatic execution only for EVM → Everscale transfers using the credit processor. 

Specifically, you will receive a callback in the form “You have received N tokens and some Data with them.” The data, for example, can include who the owner of the tokens is, and what should be done next. 

A significant competitive advantage of the bridge is its tremendous opportunities for future integrations. The primary function of the bridge is to transfer events that occur on the connected networks to Everscale and to transfer events that happened on Everscale to other networks. Vault and MultiVault are special cases of such integration. The bridge transfers the event of tokens locked from EVM networks to Everscale, and tokens burn event transfers from Everscale to EVM (or vice versa). 

After you finish reading this tutorial, you probably will realize that such an algorithm of event transferring can be applied to many other use cases, like transfer of DAO decisions, NFT bridge, or anything else. Anybody can write their Configurator contract for the bridge and deploy it on the Everscale network. If the bridge manager accepts your configuration, the bridge will start singing your Events.

## Transfer types and their mechanics

This part will briefly examine the kinds of transfers and how they work.

There are three kinds of transfers:

1. EVM → Everscale
2. Everscale → EVM
3. EVM → Everscale using a Credit processor contract

**EVM → Everscale** is available for Vault and MultiVaul. It works very simply, in just two transactions:

1. ERC 20 tokens are transferred to the Vault on the EVM network, specifying the recipient's address on Everscale. As a result, the contract creates an event "emit Deposit (amount, recipient.wid, recipient.addr)". 
2. Then, we create a contract with the metadata of this event on Everscale. The relayers see this contract on the network, and if the transfer is confirmed, they will sign it and the contract will issue TIP 3 tokens on Everscale.

**Everscale → EVM** is possible for Vault and MultiVault according to the same principle:

1. Tokens are transferred to Everscale into a special contract that will burn them and create a contract with the metadata of the burning.
2. Relayers add their signatures for metadata to the contract. Then, the user takes these signatures and the metadata and requests the Vault contract in EVM. Vault contract checks relayers' signatures and transfers the necessary amount of tokens to the user. 

In case there is not enough liquidity in the Vault, there are the following scenarios:

1. Waiting for a short time in case the required amount of liquidity is accumulated. However, it should be noted that the signatures of relayers last for a specific period of time.
2. Finish the withdrawal request by putting it into the withdrawal queue. In this case, you can finish your withdrawal any time later with another transaction when there will be enough liquidity. 
3. If you have placed a transfer in the queue, you can assign a reward from this transfer to the one who will bring liquidity and complete your transfer. 

Situations with a lack of liquidity may arise because you can deposit liquidity to the Everscale from one network and withdraw from any other.

For examination, if you deposit liquidity in ETH, someone can Deposit in BSC and withdraw from ETH. After that, if you want to withdraw from ETH, you will be forced to wait until someone deposits in ETH, or you can withdraw in BSC. 

But this situation is rare because a lot of  liquidity comes to Evesrcale itself to be used in farming or dapps.

**EVM → Everscale transfers using CP** are currently possible only for liquid tokens (Vault). 

**Credit processor** is a special contract that issues you EVERs on credit in order to automatically complete transfers on the Everscale network. Part of the tokens you transfer will be exchanged for EVERs to pay your loan back.

**It works as follows:**

Just like for a regular transfer - funds are deposited to the Vault account. It should be noted that, in this case, not only the recipient's address ought to be provided, but, as well, the controlling address that is to be used in **emergency cases**. 

There are two cases when the controlling address is useful: the contract failed to exchange tokens to pay the loan back,
(in the event of high market volatility) and if transfer parameters were not set correctly.

**Along with the emergency address the following are to be specified:**

1. The **amount of tokens** the recipient must receive after exchanging part of the tokens to EVERs to pay the loan back. Also, you can specify how many tokens must be additionally exchanged for EVERs and transferred to the recipient in case the user needs some EVERs to pay for gas in the future. 
2. The **address which will offer you a loan**. It is the address of the contract through which someone's bot offers you a loan. Any other account can supply you with a loan if the bot gets disused.
3. **The Payload**. It is the data that will be received by the recipient along with tokens.

When the funds are deposited to EVM, a credit transfer contract is automatically generated on Everscale. It is confirmed by relayers. The contract issues tokens for **HIMSELF**, exchanges part of them for gas through **AMM**, return the loan and then send the tokens to the recipient.

Also, they can exchange more tokens than needed for EVERs, and send these EVERs to the recipient so that the user has enough funds to make other transfers.

**The easiest** way to use a Credit Processor is for users who do not have EVERs and want to transfer tokens to the network (no funds to finish the transfer on the Everscale side) In this case, the controlling address and the recipient's address are the same. If any issues arise, which is a very rare situation, the user will be able to get EVERs in one of the other ways and then complete the transfer.

**A more complicated** way is characteristic for EVM → Everscale → EVM transfers. In this case, the recipient is a special contract that will send the tokens further to the requested network. The address for emergency situations is the user's wallet on Everscale - even if not initialized. In the event of emergency cases, the user will get needed EVERs by another transfer and will then be able to complete/cancel the transfer.

**The most difficult** way is associated with some kind of non-custodial logic when tokens are transmitted to an auto-strategy without a controlling account. This option is also probably possible. However, an in-depth knowledge and understanding of credit processor logic and its settings is needed. On the other hand, you can set a smart-contract as the controlling address.This contract, for example, could cancel the transfer if necessary, and send tokens back to the sender (via the bridge).

In what follows, it is described in more detail how these transfers work. In order to understand the work of the bridge, it is recommended to go through all pipelines. 