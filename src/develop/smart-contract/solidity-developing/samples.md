---
sidebar_position: 2
---

# Samples

Let's deploy the contract to TON Labs development blockchain atnet.ton.dev.

1) Make sure tonos-cli is in $PATH:

export PATH=$PATH:<PATH_TO>/tonos-cli

tonos-cli config --url net.ton.dev

2) Generate address, keys and seed phrase for your contract:

tonos-cli genaddr <WalletAddress>.tvc Wallet.abi.json --genkey Wallet.keys.json

Address of your contract in the blockchain is located after Raw address:

IMPORTANT: Save this value - you will need it to deploy your contract and to work with it. We will refer to it as "<YourAddress>" below. Seed phrase is also printed to stdout. Key pair will be generated and saved to the file Wallet.keys.json.

Note that you will need to send some coins to the address before the actual deployment. TON deploy is fee-based, so your new contract will be charged for this.

3) Get some [test] coins to your account. Options are:

- ask a friend to sponsor your contract deployment;
- transfer some currency from your wallet account;
- ask in developer chats.

4) Check the state of the pre-deployed contract. It should be Uninit:

tonos-cli account <YourAddress>

5) Deploy your contract to the selected network (TON Labs devnet in the example) with the following command:

tonos-cli deploy --abi Wallet.abi.json --sign Wallet.keys.json <contract>.tvc {<constructor_arguments>}

If either of --abi or --sign options is omitted in parameters, it must be specified in the config file. See below.

6) Check the contract state again. This time, it is should be active.

7) Call the function of your contract:

tonos-cli call '<YourAddress>' sendTransaction '{"dest":"DestAddress", "value":1000000000, "bounce":true}' --abi Wallet.abi.json --sign Wallet.keys.json