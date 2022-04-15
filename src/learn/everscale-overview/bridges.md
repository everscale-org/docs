# Bridges

## What is a cross-chain bridge?

Cross-chain bridges was made for transferring assets between chains.  
Their locks assets in the source chain and creates an equivalent number of wrapped assets in the destination blockchain.  
When you initiate an asset transfer from one blockchain to another using a bridge, assets are not actually moved or sent anywhere. Instead, the transfer functionality is used in a two-step process and handled by a smart contract.  

In simple terms - Let's say you want to move tokens from chain A to chain B. What the bridge does is it temporarily locks or freezes your asset in chain A. They then create an equivalent number of new tokens that will be unlocked for you in chain B. When you want to redeem the tokens, that is, when you want to move the original assets back from chain B to the original chain (chain A), the tokens created in chain B will be burned and the original assets will be unlocked.  

The concept of interchain communication and token transfer is done using a two-way binding system; where the value of a token in either blockchain is the same, as it remains tied to the value of the initial ones.

## Everscale Bridges
