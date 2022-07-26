---
sidebar_position: 1
---

# Testnet EverX Node Troubleshooting 

Here are some solutions to frequently encountered problems.

## 1. Couldn’t connect to Docker daemon at http+docker://localhost

This error occurs in two cases. Either the docker daemon isn't running, or current user doesn't have rights to access docker.

You can fix the rights issue either by running relevant commands as the superuser or adding the user to the `docker` group: 

    sudo usermod -a -G docker $USER

Make sure to restart the system or log out and back in, for the new group settings to take effect.


## 2. thread 'main' panicked error when checking node synchronization

The following error may occur for a short time immediately after node deployment when attempting to [check synchronization](../run-validator/run-testnet-node.md/#4-check-node-synchronization):

    thread 'main' panicked at 'Can't create client: Os { code: 111, kind: ConnectionRefused, message: "Connection refused" }', bin/console.rs:454:59

Currently this is expected behavior, unless it persists **for more than a few minutes**. If it does persist, check network status at https://net.ton.live/, and, if the network is up and running, review [deployment logs](../run-validator/run-mainnet-node.md/#during-deployment) for errors.


## 3. Error executing command when checking node synchronization

The following error may occur for up to an hour after node deployment when attempting to [check synchronization](../run-validator/run-testnet-node.md/#4-check-node-synchronization):

    Error executing command: Error receiving answer: early eof bin/console.rs:296

Currently this is expected behavior, unless it persists **for more than one hour**. If it does persist, check network status at https://net.ton.live/, and, if the network is up and running, review [deployment logs](../run-validator/run-testnet-node.md/#during-deployment) for errors.


## 4. Cannot stop/restart/remove node container

Make sure you are running all docker-compose commands from the `net.ton.dev/docker-compose/ton-node` folder.


## 5. DePool state not updating

It's recommended to send at least two [ticktocks](https://github.com/tonlabs/ton-labs-contracts/tree/master/solidity/depool#7-configure-depool-state-update-method) while the elections are open.

Here are some solutions to frequently encountered problems.