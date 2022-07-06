---
sidebar_position: 1
---

# Transactions Mechanics And Integration Methods

Firstly, we will examine what kinds of transactions there are and how they work. 

There are three kinds of transactions:
- [EVM → Everscale](evm-everscale.md)
- [Everscale → EVM](everscale-evm.md)
- [EVM → Everscale using a Credit processor contract](credit-processor.md)

1. ERC 20 tokens are transferred to the Vault in the EVM network, specifying the recipient's address in Everscale.  
Then, as follows, the event emit Deposit (amount, recipient.wid, recipient.addr).
2. ERC 20 tokens are transferred to the Vault on the EVM network, specifying the recipient's address in Everscale.   
Then, as follows, the event emit Deposit (amount, recipient.wid, recipient.addr).   
Thus, a contract on Everscale is created with the metadata of this event. The validators see this contract on the network, and if the transaction is confirmed, they will sign it and the contract will issue TIP 3 tokens in Everscale.

**Everscale → EVM** is possible for Vault and MultiVault, according to the same principle: 

1. Tokens are transferred to Everscale for a special contract that will burn them and create a special contract with the metadata of the burning. 
2. The relayers write their signatures on this contract for the transaction metadata.   
When the required number of signatures is reached, a request is made to the Vault in the EVM network with this metadata + signatures.   
Afterwards,  the tokens will be released. 
3. In the event that there is not enough liquidity in the Vault, there are the following scenarios:
   1. Waiting for a short time, in case the required amount of liquidity is accumulated. However, it should be noted that the signatures of validators last for a specific period of time. 
   2. Completing the withdrawal request which gets in the queue, and received in a while with another transaction. 
   3. Assigning a reward for someone who will bring liquidity which will permit to complete the transaction. 

Please be informed that situations with a lack of liquidity can happen, due to the fact that liquidity moves easily between networks.

Thus, in any specific timeframe, there may not be enough locked tokens in a particular network to immediately complete transactions.

**EVM → Everscale transactions using CPU credit** are currently possible only for liquid tokens (Vault).   
Credit processor is a special contract that will issue EVER on credit, in order to automatically complete transactions on the Everscale network. It works as follows:
1. Just like in a regular transaction, funds are deposited into the Vault account. It should be noted that, in this case, not only the recipient's address ought to be specified, but, as well:   
The address that is to be used in emergency cases. The cases are twofold:
   1. There were not enough funds to pay for the transaction. (in the event of high market volatility)
   2. Transfer parameters were not set correctly. 
2. The address of the token recipient.
3. How many tokens should be received after the exchange, and how much is still needed to have to exchange to EVER additionally (so that the gas payment comes into the contract).
4. The address that credits you is the address of the contract through which someone's bot that gives you a loan. But if this bot dies, any other account can give you a loan.
5. Payload, is the data that will be received by the recipient along with the tokens. 

Accordingly, when funds are deposited in EVM, a credit transfer contract automatically appears in Everscale. It is confirmed by the relayers.   
They issue tokens for THEMSELVES, exchange part of them for gas through AMM, return the loan and then send tokens to the recipient. 

Also, they can exchange more tokens than needed for EVER, and send these EVER to the recipient so that the user has enough funds to make other transactions.

The easiest way to use a credit processor is when a user who does not have EVER,  wants to transfer tokens to the network.  
In this case, the controlling address and the recipient's address are the same, and in case any issues arise, which is a very rare situation, the user will get EVER in one of the other ways and complete the transfer.

A more complicated way is characteristic for EVM → Everscale → EVM transactions.    
In this case, the recipient is a special contract that will send user's tokens further to the requested network.    
The address for emergency situations is this user's wallet in Everscale - even if not initialized.  
In the event of emergency cases, it will receive EVER by another transaction, and will be able to complete/cancel the transaction).

The most difficult way is associated with some kind of non-custodial logic.     
When  tokens are linked to a preset strategy and without a controlling account (after all, the user can cancel the transaction and take the tokens back). This option is also probably possible.  
However, in depth knowledge and understanding of processor logic and its settings is needed.    
Otherwise, the Payload in the transaction should be set up with another contract in control, which, for example, can only cancel the transaction if necessary and send tokens back through the bridge to the sender.

In what follows, it is described in more detail how these transactions work. In order to understand the work of the bridge, it is recommended to go through all the pipelines.


