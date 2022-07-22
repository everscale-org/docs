---
sidebar_position: 5
description: Working with SMV contracts
---

# SMV Contracts

Soft Majority Voting, or SMV for short, is a voting mechanism designed for transparency and optional participation.

The metric for passing a decision is the difference between % of Yes minus % of No. For example, if 10 of voters said Yes and none said No, then it is assumed the decision is sufficiently supported and there are no objections. At the same time, if all members voted, then a simple majority rule applies: 50% + 1 vote for passing a decision. 

All SMV proposals have a set deadline. When it is reached, accumulated votes are counted, the decision is made, and the proposal completed. 
If, however, a majority of 50% + 1 vote is achieved early, the proposal is completed immediately.   
For important decisions, a more strict super majority approval criteria may be set up.
Soft majority voting mechanism is programmed on Everscale via SMV smart contracts. 

Please see [**this documentation**](https://github.com/EverscaleGuild/everscale-contract-library/tree/main/governance/SMV) explaining how to work with SMV contracts.