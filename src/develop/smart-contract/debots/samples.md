---
sidebar_position: 2
---

# Samples

## Simple DeBot application

> Referenced page:  
> [https://github.com/tonlabs/debots/blob/main/simple-todo-app/README.md](https://github.com/tonlabs/debots/blob/main/simple-todo-app/README.md)

This is an example of a simple TODO application. The application consists of two contracts:

-   todoDebot.sol, contract of DeBot
-   todo.sol, smart contract containing TODO list

### How to try DeBot in the Surf

This DeBot is already deployed on blockchain

##### [Devnet](https://net.ever.live/)
DeBot address: 0:20c3279225a285dfef71efe97f67e823513068b36e79d5fc669899389f89382f

Open the link: [https://uri.ever.surf/debot/0:20c3279225a285dfef71efe97f67e823513068b36e79d5fc669899389f89382f?net=devnet](https://uri.ever.surf/debot/0:20c3279225a285dfef71efe97f67e823513068b36e79d5fc669899389f89382f?net=devnet)

![](https://github.com/tonlabs/debots/raw/main/assets/net.everos.dev.png)

##### [Mainnet](https://ever.live)
DeBot address: 0:73a7ba235ac26029574f0e053b3f25ba4d536b8ba2c8dd5d10fb266c9035bc36

Open the link: [https://uri.ever.surf/debot/0:73a7ba235ac26029574f0e053b3f25ba4d536b8ba2c8dd5d10fb266c9035bc36](https://uri.ever.surf/debot/0:73a7ba235ac26029574f0e053b3f25ba4d536b8ba2c8dd5d10fb266c9035bc36)

![](https://github.com/tonlabs/debots/raw/main/assets/main.ton.dev.svg)

-   On the first launch DeBot deploys TODO contract with initial balance = 0.2 ever tokens, so you need to have a Surf wallet with positive balance.

-   DeBot will ask for your public key every time you launch it. It's inconvenient, but inevitable for now.

### How to build

##### Prerequisites

npm, node.js ver>=14

Install everdev globally

```
$ npm i everdev -g
$ everdev tonos-cli install
```

##### Compile

```
$ everdev sol compile todo.sol
$ everdev sol compile todoDebot.sol
```

### How to deploy

if you use Evernode SE:

```
$ everdev se start
$ ./deploy_debot.sh todoDebot.tvc
```

if you use net.everos.dev:

-   set `GIVER_ADDRESS` variable in `deploy_debot.sh`
-   edit `../giver.keys.json` respectively

```
$ ./deploy_debot.sh todoDebot.tvc https://net.ton.dev
```

### Run DeBot 

Find instructions here: [How to try-DeBot](getting-started.md/###how-to-try-debot)

### TODO

Encrypt data before saving to contract

## Hello World DeBot

> Referenced page:  
> [https://github.com/tonlabs/debots/blob/main/helloworld/README.md](https://github.com/tonlabs/debots/blob/main/helloworld/README.md)

Can be used as a template for new DeBots.

### How to build

    everdev sol compile helloDebot.sol

### How to deploy to TON OS SE


Start TON OS SE

    everdev se start

Deploy debot

    ./deploy_debot.sh

### How to run in TON OS SE

    ./tonos-cli --url http://127.0.0.1 debot fetch <address>

## Multisig Debot

> Referenced page:  
> [https://github.com/tonlabs/debots/tree/main/multisig](https://github.com/tonlabs/debots/tree/main/multisig)

Allows to manage wallet with multiple custodians.

### Supported Wallets

- [SafeMultisigWallet](https://github.com/tonlabs/ton-labs-contracts/blob/master/solidity/safemultisig/SafeMultisigWallet.tvc)
- [SetcodeMultisigWallet](https://github.com/tonlabs/ton-labs-contracts/blob/master/solidity/setcodemultisig/SetcodeMultisigWallet.tvc)

### How to build

    everdev sol compile msigDebotv1.sol

### How to deploy to TON OS SE

Start TON OS SE

    everdev se start

Run script

    ./deploy_debot.sh

### How to run in TON OS SE

    ./tonos-cli --url http://127.0.0.1 debot fetch <address>

### Run Multisig DeBot in mainnet
#### using tonos-cli

    ./tonos-cli --url main.ton.dev debot fetch 0:09403116d2d04f3d86ab2de138b390f6ec1b0bc02363dbf006953946e807051e

#### How to create invoke message for Msig DeBot

Run script `.invoke_msg.sh` with debot arguments.

Run script `.invoke_msg.sh` without arguments for help.

Example:

    ./invoke_msg.sh 0:606545c3b681489f2c217782e2da2399b0aed8640ccbcf9884f75648304dbc77 1000000000 true

## Surf Auth DeBot

> Referenced page:  
> [https://github.com/tonlabs/debots/tree/main/auth](https://github.com/tonlabs/debots/tree/main/auth)

This DeBot can be used in "Sign Up" / "Sign In" flows as well as in the case when an already registered user wants to link his Surf account.

### Disclaimer
This code is still experimental, do not use it in production.

### Workflow

 - Web server generates:
   - one time password (OTP)
   - PIN (optionally)
   - callback_url
   - warning_text
   
 - Web server:
   - generates QR-code with a deeplink to the Surf containing all this data **except for the PIN**.
   - shows PIN and QR-code to the user

 - The user 
    - scans a QR code or click deeplink, and is redirected to the Surf
    - Sees warning text, e.g. "Attention! You authorize access to ABC site"
    - Enters OTP
    - Signs OTP + PIN + callback_url + warning_text, and returns his signature and **his public key** to the server

 -  If the signature is correct, the server knows that this user is the real owner of this public key.

![Sequence diagram](https://github.com/tonlabs/debots/blob/main/auth/example-webserver-nodejs/public/pic1.png)

### Prerequisites

    npm, node.js ver>=14, everdev

### The quickest start (if you want to use DeBot  already deployed in net.ton.dev)

1. Run local webserver
```
$ cd example-webserver-nodejs/
$ npm i
$ npm start
```

2.  Open http://localhost:8080/surfauth.html?pin=true in a browser 

3. Click on the link shown to open Surf on your local computer. **Do not scan** the QR code with your mobile phone, because the test web server is running on your local computer!

### If you want to deploy DeBot by yourself

1. Deploy DeBot

Set `GIVER_KEYS` and `GIVER_ADDRESS` variables in `deploy_debot.sh` file, then run:
```
$ ./compile_and_deploy.sh 
```
Remember debot_adress

2. Run local webserver
```
$ cd example-webserver-nodejs/
$ npm i
$ node src/main <debot_address>
```

3.  Open http://localhost:8080/surfauth.html?pin=true in a browser 


>  The documentation in Everscale repository is a community effort.  
> Therefore, everyone can contribute with proposals for new topics, suggest new content elements, participate in editing, and provide ideas that will be of great help for network development.  
> Please be informed that our documentation can be [edited via GitHub](https://github.com/everscale-org/docs/issues).  
  Also please make sure to consult our rules and rewards policy via [this link](https://docs.everscale.network/contribute/hot-streams/documentations).  
  Feel free to join [Everscale Documentation Development Telegram chat](https://t.me/+C2IpQXWZtCwxYzEy) and [Everscale Developers Onboarding Telegram chat](https://t.me/+Vca1Gs6uPzIyNWVi)!