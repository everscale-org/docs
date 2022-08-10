---
sidebar_position: 7
---

# Octus Bridge Tokenomics. Pros and cons of the platform. 

Octus Bridge has its own BRIDGE token. This is both a token for the DAO and used as payment for becoming a relayer. To become a relayer, you need to stake 100k BRIDGE tokens. However, the amount will probably decrease in the near future. 

For relayers, the unlocking starts after a month. Conversely, an ordinary user can withdraw tokens from staking at any time, although, if he/she voted for some proposal in DAO, then the unlocking of tokens will be available after the voting for the proposal ends. Currently, voting takes place in the timeframe of three days.

For stakes, the user is credited with shares. The bridge's revenue is distributed in rounds. At this time, there are no clear distribution intervals. A round is closed by the decision of the DAO. The income is divided in two: half is distributed among the relayers, and the other half among ordinary users who have been staking their digital assets. Users get the rewards in accordance with their shares.

## Where does the income come from?

Octus Bridge has an interesting monetization model. Currently, there are no commissions for transferring funds across the bridge. Although for some tokens, commissions will probably be introduced in the near future.

The bridge plans to earn from the Everscale network. With the growing popularity of the network and the emergence of an increasing number of projects, liquidity from other networks will inevitably come to the network, and the bridge will use this locked liquidity to generate income.

For instance, when you transfer USDT from Ethereum to Everscale, these USDT are locked in the Vault contract in Ethereum, and the bridge issues the USDT guaranteed by Octus Bridge itself, on the Everscale network. The bridge takes part of the tokens that are locked in the Vault and invests them in liquid protocols such as Curve or Compound. The investments of part of locked tokens are called Startegies, and are voted by the DAO.

When the next round closes, the funds earned in the Strategies are redeemed by the bridge from the market and distributed between the relayers and the stake holders.

Also, it is important to mention that not only digital assets can be transferred via the bridge, but also DAO solutions. It is applicable when participants of the Everscale DAO vote for a proposal that has actions in other networks. In case the proposal is accepted, it is signed by relayers and executed on behalf of the DAO in the needed network. Therefore, DAO voting can be conducted on a very cheap network, and the decisions executed on an expensive network (for example, Ethereum).

## Vault/MultiVault

Everscale is home network for the Octus bridge. In non-home networks (currently only EVM), there are two types of storage for tokens - Vault and MultiVault.

Vault is a repository for liquid tokens. These are the tokens that have analogues in other networks (For example, USDT, for Ethereum it is the original USDT, for BSC it is BSC-USD, etc.).

Such Vaults are configured manually, and now they are the following: DAI, USDT, USDC, WETH, WBTC. Also, there is WEVER, but its Vault implementation is different, since its home network is Everscale. It will not be examined here.

For the mentioned tokens, the following cross-chain transfer can be made (EVM→ EVM). These tokens could potentially participate in Strategies for generating income.

Vaults have limits on the number of tokens they can accept and these limits are set by DAO. This is a way to manage risks. Different networks have different levels of security.

The Fantom network has a low limit on the maximum USDT that the Vault can accept (100k). The limit is higher for BSC, and the highest for Ethereum. The cross-chain transfers are possible for such tokens. (Semi-automatic EVM → ES → EVM).

MultiVault is a multi-repository that allows to transfer any tokens to the Everscale network, and withdrawal of the tokens from the network.

The Tokens are divided into Native and Alien:

- **Native** - is a token whose home network is Everscale. In this case, tokens are issued in the EVM network and guaranteed by the bridge
- **Alien** - is a token whose home network is not Everscale. In this case, TIP 3 tokens are issued in Everscale and as well guaranteed by the bridge.

When you transfer native tokens to the EVM network, while withdrawing, if necessary, an ERC 20 wallet for this token will be automatically created. The same thing applies to transferring an alien token, in which case a TIP 3 wallet will be created.

Also, if you get the same token from different networks, different alien tokens will be created for it in Everscale and cross-chain transfers for such tokens are not possible by default, but there is a unification mechanism.

## Pros and cons of the Octus Bridge

**A big competitive advantage of the bridge is the tremendous opportunities for future integrations.**

The EVM part of the bridge is quite simply designed, which is a big advantage due to the fact that there is less room for errors.

The Everscale part of the bridge is much more complicated. All decision-making takes place on-chain. Besides DAO, there are Staking and assignment of relayers. Communication of relayers with users (signatures of transactions) is on-chain. Due to the unique feature of the Everscale blockchain, relayers do not pay for signing transactions, instead, the user pays for them. (You create a transfer contract and deposit EVERs there. The contract loads the list of currently available relayers and they say their Yes or No with the help of External messages).

At the moment, the bridge does not charge commissions for the transfer of tokens, although commissions could be introduced in the near future. Probably commissions will first be introduced for NON-liquid tokens (MultiVault). The absence of commissions is both a plus and a minus. The plus is in cheap transactions, the minus is that there is no automatic market mechanism for balancing liquidity between networks.

If you want to withdraw liquid tokens (Vault) to the EVM network where there is no liquidity, then, you either need to wait for some time until the liquidity is accumulated (but no more than the TTL of the relay round - now it's 2 weeks), or complete the transaction by adding it to the withdrawal queue. Then, the transaction can be completed later with another transaction. Also, a bounty reward can be set for the one who will bring liquidity and complete the transaction. If the transaction hangs in the queue for a long time and liquidity is not accumulated, the transaction can be cancelled.

Despite the fact that technically everything seems to be ready for the bridge to be run by the DAO, now the bridge configuration is controlled by the Broxus multisig. Probably, when all the functionalities of the bridge are finally settled, it will be entirely managed by the DAO. You can think of relayers as hot wallets that sign transactions in real time, and about Broxus multisig as hard-core wallets that are used to update the bridge.

Vaults currently have limits on withdrawals from the Everscale. There is a limit on both the maximum amount and the number of withdrawals per day per token. If the limit is exceeded, transfers are placed in a waiting queue and are waiting for confirmation from the DAO or Guardian. This is also a risk management measure. The limits will probably increase over time.

At the moment, the bridge has limited possibilities for transmitting useful data along with transactions. It is possible to transmit some data for automatic execution only for EVM → Everscale transactions using the credit processor. The bridge will not transfer it to the sender's address. You will simply receive a callback in the form “You have received N tokens and Data with them.” That is, in this data, for example, you can write down who the owner of these digital assets is, and what should be done next. This option is not available for Everscale -> EVM transactions.

The main functionality of the bridge is to transfer events that occur on connected to Everscale networks, and sign events that occurred in Everscale to transfer them to other networks. Vault and MultiVault are only special cases of such integrations. Token lock events are transferred from EVM networks, and token burning events are transferred back (or vice versa). After studying the transaction pipeline, you will understand that any events can be transferred according to the same principle.
