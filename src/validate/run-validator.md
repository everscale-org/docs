---
sidebar_position: 2
---

# Run Validator

Validation is crucial in maintaining the security of the Everscale network. It is accomplished by the means of staking EVER tokens and participating in the consensus along with other validators. With the help of the consensus algorithm, the validator proposes candidate blocks and votes on blocks proposed by other validators. When the voting threshold is reached, the proposed block is added to the chain.This process is aided by an overlay network which connects the validators.

The incentive for validators to participate in block generation is realized via rewards. It is important to mention that each block included in the network provides a reward. 

The validators of the `masterchain` are responsible for the security of the masterchain network, via: 

- creation of master blocks
- enabling shardchains to share messages 
- the state of contracts 
- network sharding configuration with other shardchains

### Delegator 

Delegators play a big role in the decentralization of the network. They greatly contribute to network security by the means of allocating their stakes to validators.
To add, they also direct the Elector's algorithm to validators that should proceed with validation in the next round. This enables well-regarded validators with low stakes to accumulate funds in their pools and subsequently become validators.

![](img/delegator.svg)

Due to the fact that Everscale is a proof of stake blockchain, any participant with enough EVER tokens can become a validator. That’s even if they haven't been nominated by other participants.

Validators part the rewards with delegators in accordance with their share of EVER tokens. Although, it should be mentioned that they also share the risks. Thus, if a particular validator node is offline during validation, it is punished by having its stake slashed. Consequently, the delegator's stake may as well be reduced.

After having gone through the essentials of validation on Everscale, let’s now move to practice. 


## How to run a validator node

:::tip

Sufficient Linux engineering skills are required in order to manage, secure, and maintain nodes. Running a Validator node is much harder than executing a validator binary.

:::

Running a validator node is a consequential task. Therefore, to ensure the stability of your node, you should use highly efficient hardware. Below, we provide the hardware requirements we consider best fit: 

- **Operating system:** Ubuntu 22.04
- **CPU:** 12x cores Intel Skylake or a newer CPU. Higher base CPU frequency is preferred over the core count. 
- **RAM:** 64GB; Network: 300Mbps with a strong internet connection. In case of connection issues, it could lead to the disconnection of the validator.
- **Storage:** 50GB SSD storage for the operating system; 500GB of NVMe for validator internal database with the ability to add additional space to allow for the growth of the blockchain. 
- **Cloud providers:** Google Cloud, Amazon AWS, Microsoft Azure, OVH.

Also, for the node to work properly, configure the cloud firewall to accept incoming traffic on UDP/30000 port.

:::tip

Please be informed that the node will consume around 6TB of incoming traffic each month.

:::

## Node setup

:::caution
Always check any scripts you are running
:::

1. Prepare the server for node setup

1.1. Create a user and group for running the Validator node, and create all necessary folder structures

```bash
VALIDATOR_USER="validator"
VALIDATOR_GROUP="validator"
sudo groupadd $VALIDATOR_GROUP
sudo useradd $VALIDATOR_USER -m -s /bin/bash -g $VALIDATOR_GROUP -G sudo
# Mount 
sudo mkdir -p /var/ever/rnode/
sudo chown $VALIDATOR_USER:$VALIDATOR_GROUP /var/ever/rnode/
```

1.2. Check if the NTP service is UP and running

```bash
systemctl status systemd-timesyncd
```

Your system should show that the service is up and running. If not - please refer to the documentation

```bash
● systemd-timesyncd.service - Network Time Synchronization
     Loaded: loaded (/lib/systemd/system/systemd-timesyncd.service; enabled; 
     preset: enabled)
     Active: active (running) 
```

:::caution
If the system clock is out of sync (even by a small amount), the blocks which the Validator produces, may not be accepted by the network.
:::

2. Create firewall rules to allow ADNL communications

```bash
sudo ufw allow 30000/UDP
```

3. Install dependencies

```bash
sudo apt update 
sudo apt install -y git libssl-dev pkg-config build-essential libzstd-dev 
libclang-dev libgoogle-perftools-dev
```

4. Switch to the validator user

```bash
sudo su validator
```

4.1 Install rust

```bash

curl https://sh.rustup.rs -sSf | sh
source "$HOME/.cargo/env"
```

5. Build a Validator node

```bash

cargo install --locked --git https://github.com/broxus/nodekeeper
```

```bash
# Optionally configure root directory:
# export NODEKEEPER_ROOT=/var/nodekeeper
#
# Or explicitly specify it as a param, e.g.:
# nodekeeper --root /var/nodekeeper init

# Configure node
nodekeeper init

sudo $(which nodekeeper) init systemd
```

Here choose the user for the validator. DON'T RUN Validator service as a root user!

```bash
[0/2] Preparing services
? Select the user from which the service will work ›
❯ validator
  root
```

6. Setup Validator and create wallets
Compile and init node

```bash
nodekeeper init
```

Choose "other" network

```bash
[0/2] Preparing configs
✔ Create root directory? (/home/validator/.nodekeeper) · yes
? Select network ›
  Everscale mainnet
  Everscale testnet
❯ other
```

Provide global config URL (Contact Everscale core team)

```bash
✔ Select network · other
? Config URL ›
```

```bash
[0/2] Preparing configs
✔ Create root directory? (/home/validator/.nodekeeper) · yes
✔ Select network · other
✔ Config URL ·<hidden>
✔ Node config doesn't have control server entry. Create? · yes
✔ Control server listen address · localhost
✔ Specify control port · 31000
✔ Enter public ip · 164.92.106.127
✔ Specify server ADNL port · 30000
✔ Specify node DB path · /var/ever/rnode
[1/2] Preparing binary
```

The node would be compiled, Select the mode of your node:

```bash
? Select validator type ›
❯ Single
  DePool
```

Create a new seed phrase or import existing

```bash
[0/2] Creating validator wallet
❯ Generate new keys
  Import seed
```

6.1 Define the desired stake per round. Notice you will need an amount of
tokens 2*(stake per round)+10

Leave "stake factor (ratio between maximum available stake on the network and
your stake) to 3 as it is standard in the Everscale network

```bash
✔ Stake per round (EVER) · 10000
✔ Stake factor · 3
[2/2] Validator configured successfully. Great!

Validator wallet address:


Required validator wallet balance: 20010 EVER
  • 10 EVER, maintenance balance
  • 2 x 20010 EVER, stakes for each round

Make sure you back up your keys:
/home/validator/.nodekeeper/keys/vld.keys.json
```

:::info
Make sure you back up your keys after the initial configuration!
All keys are stored at $HOME/.nodekeeper/keys/
:::

Init validator services

```bash
sudo ~/.cargo/bin/nodekeeper init systemd
```

:::caution
Service MUST NOT run as the root user
:::

```bash
[0/2] Preparing services
? Select the user from which the service will work ›
❯ validator
  root
```

It will create two services:

- validator-manager - control service that takes part in elections,
recovers stake and performs other tasks with the Elector contract
- validator - node itself, managing validation process

You can check the status of both services with the following commands:

```bash
service validator status
service validator-manager status
```

7. Transfer tokens to the Validator contract

Transfer the required amount of tokens to the address generated in the previous
step. The Wallet will become active after the first stake

8. Wait until the elections start

When elections start, the validator-manager process will automatically stake the desired amount of tokens. You can check the current state of elections using [Everscan](https://everscan.io/validators).

:::info
validator-manager adds 1 EVER token for the stake to pay for the transaction fees, and you will be required to add 1 EVER token to the "stake and bonuses recovery" transaction. Due to this, it is adviseable to always keep some additional tokens in the Validator
:::

If everything has been setup correctly - you should see your address in the validators list for the next round.