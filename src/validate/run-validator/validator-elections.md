---
sidebar_position: 2
---

# Validator Elections

After having studied how to run a validator node, please follow the description below in order to understand how a validator is elected. It explains in detail the election process using an electoral contract. 

The election mechanism works as follows:

Firstly, it should be noted that elections of validators take place every 18 hours in respect to the current network configuration.

Each period consists of 3 phases:

1. The election is open, the elector's smart contract accepts new stakes, and previous validators can return their stakes from the elector's smart contract.

2. The election is over and the smart contract determines the group of validators for the next phase.

3. A new group of validators starts working. The stakes of the former group of validators are temporarily frozen.

The electoral smart contract operates according to the following rules:

1. The following parameters are taken from the network configuration: a) Min and Max number of validators; b) Min and Max stake size; c) Maximum difference between the first (maximum) and last (minimum) validator stakes.

2. The maximum group of validators is selected, starting from the largest stake (and moving further in the stake descending order. In the case that the amounts of stakes coincide, then the time of the validator serving in the network is considered), which has a difference between the largest and smallest stakes no more than max_factor.

3. For the next stake, the sum of all the stakes is calculated in such a way as to comply with the max_factor rule. For this, the largest stake (or stakes) is trimmed in order to meet the max_factor rules. If the resulting sum of all the stakes has become larger, then the elector's smart contract tries to select the next stakes, in the descending stakes order, according to the max_factor rule.

4. As soon as the total stake calculated according to the above mentioned procedure stops growing, that is, the maximum amount of stakes is found, then this stake is considered to have passed the elections - then, all past elections, and validators will begin to validate for the next election period, and the trimmed parts of the stakes (if any) are immediately returned to wallets from which they were sent.

Please follow this page in order to find out how a Validator is Updated - https://docs.everscale.network/validate/run-validator/update-validator
