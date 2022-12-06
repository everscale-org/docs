---
sidebar_position: 0
---

# Getting started

> Referenced repository: [https://docs.ton.dev/86757ecb2/p/950f8a-write-smart-contract-in-solidity](https://docs.ton.dev/86757ecb2/p/950f8a-write-smart-contract-in-solidity)

## You will need:

- A PC or laptop with a basic set of developer tools
- (Recommended: Ubuntu 18.04) Linux
- Windows
- MacOS
- A Solidity to TVM assembly compiler
- (Recommended) build from [sources](https://github.com/tonlabs/TON-Solidity-Compiler)
- download as a [binary](https://github.com/tonlabs/TON-Solidity-Compiler/releases/download/0.25/solc0.25.tar.gz)
- run in a docker [container](https://hub.docker.com/r/tonlabs/compilers)
- Contract code in Solidity
- Use Wallet.sol below
- Use your own code
- Take one of the samples from the samples [repository](https://github.com/tonlabs/samples/tree/master/solidity)
- Utilities to link and deploy contract to the blockchain
- build from [sources](https://github.com/tonlabs/TVM-linker)
- download as a [binary](https://github.com/tonlabs/TON-Solidity-Compiler/releases)
- run in a docker [container](https://hub.docker.com/r/tonlabs/compilers)

## Recommended setup

- OS: Ubuntu 18.04 is the easiest to run.
- tip: running Ubuntu in VM works fine. Check out this [install guide.](https://docs.ton.dev/86757ecb2/v/0/p/69f25e-get-ubuntu-vm/b/744d13)
- Build Solidity compiler from the source (4-6 minutes)
- checkout from [github](https://github.com/tonlabs/TON-Solidity-Compiler/) (a few seconds);
- install dependencies as per [README](https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/README.md) (1-2 minutes)
- build the compiler from source per [README](https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/README.md) (~3-5 minutes)
- Contract source code:
- Use Wallet.sol below
- Command line tools, either of:
- download as a part of a [binary](https://github.com/tonlabs/TON-Solidity-Compiler/releases/download/0.25/tools0.25.tar.gz) package
- build [tvm_linker](https://github.com/tonlabs/TVM-linker/tree/master/tvm_linker) and [tonos-cli](https://github.com/tonlabs/tonos-cli) from sources

## Install the Compiler

Install EverX Solidity Compiler from the open source [repository](https://github.com/tonlabs/TON-Solidity-Compiler).

```jsx
git clone git@github.com:tonlabs/TON-Solidity-Compiler.git
 cd compiler 
 sh ./scripts/install_deps.sh
 mkdir build
 cd build
 cmake .. -DUSE_CVC4=OFF -DUSE_Z3=OFF -DTESTS=OFF -DCMAKE_BUILD_TYPE=Debug
 make -j8
```

**Get the contract source code**

```jsx
pragma solidity >= 0.6.0;

/// @title Simple wallet
/// @author EverX
contract Wallet {
    // Modifier that allows function to accept external call only if it was signed
    // with contract owner's public key.
    modifier checkOwnerAndAccept {
        // Check that inbound message was signed with owner's public key.
        // Runtime function that obtains sender's public key.
        require(msg.pubkey() == tvm.pubkey(), 100);

        // Runtime function that allows contract to process inbound messages spending
        // its own resources (it's necessary if contract should process all inbound messages,
        // not only those that carry value with them).
        tvm.accept();
        _;
    }

    /*
     * Public functions
     */

    /// @dev Contract constructor.
    constructor() public checkOwnerAndAccept { }

    /// @dev Allows to transfer grams to the destination account.
    /// @param dest Transfer target address.
    /// @param value Nanograms value to transfer.
    /// @param bounce Flag that enables bounce message in case of target contract error.
    function sendTransaction(address payable dest, uint128 value, bool bounce) public view checkOwnerAndAccept {
         // Runtime function that allows to make a transfer with arbitrary settings.
        dest.transfer(value, bounce, 3);
    }
	
    // Function to receive plain transfers.
    receive() external payable {
    }
}
```

## Compile

Compile the contract code to TVM assembler with the Solidity Compiler.

```jsx
<PATH_TO>/TON-Solidity-Compiler/compiler/build/solc/solc Wallet.sol
```

The compiler produces Wallet.code and Wallet.abi.json to be used in the following steps.

Assemble and link with a standard library into TVM bytecode:

```jsx
<PATH_TO>/tvm_linker compile Wallet.code --lib <path-to>/TON-Solidity-Compiler/lib/stdlib_sol.tvm
```

Binary code of your contract is recorded into`<WalletAddress>.tvc`file, where`<WalletAddress>`is a temporary address of the contract.

## Compile

Compile the contract code to TVM assembler with the Solidity Compiler.

    <PATH_TO>/TON-Solidity-Compiler/compiler/build/solc/solc Wallet.sol

The compiler produces Wallet.code and Wallet.abi.json to be used in the following steps.

Assemble and link with a standard library into TVM bytecode:

    <PATH_TO>/tvm_linker compile Wallet.code --lib <path-to>/TON-Solidity-Compiler/lib/stdlib_sol.tvm

Binary code of your contract is recorded into `WalletAddress.tvc` file, where `WalletAddress` is a temporary address of the contract. 

## Deploy

Let's deploy the contract to EverX development blockchain at`net.ton.dev`.

1) Make sure tonos-cli is in $PATH:

```jsx
export PATH=$PATH:<PATH_TO>/tonos-cli

tonos-cli config --url net.ton.dev
```

2) Generate address, keys and seed phrase for your contract:

```jsx
tonos-cli genaddr <WalletAddress>.tvc Wallet.abi.json --genkey Wallet.keys.json
```

Address of your contract in the blockchain is located after `Raw address:`

IMPORTANT: Save this value - you will need it to deploy your contract and to work with it. We will refer to it as "`YourAddress`" below. Seed phrase is also printed to stdout. Key pair will be generated and saved to the file Wallet.keys.json.

> Note that you will need to send some coins to the address before the actual deployment. TON deploy is fee-based, so your new contract will be charged for this.


3) Get some [test] coins to your account. Options are:

- ask a friend to sponsor your contract deployment;
- transfer some currency from your wallet account;
- ask in developer chats.

4) Check the state of the pre-deployed contract. It should be `Uninit`:

```jsx
tonos-cli account <YourAddress>
```

5) Deploy your contract to the selected network (TON Labs devnet in the example) with the following command:

```jsx
tonos-cli deploy --abi Wallet.abi.json --sign Wallet.keys.json <contract>.tvc {<constructor_arguments>}
```

If either of `--abi` or `--sign` options is omitted in parameters, it must be specified in the config file. See below.

6) Check the contract state again. This time, it is should be active.

7) Call the function of your contract:

```jsx
tonos-cli call '<YourAddress>' sendTransaction '{"dest":"DestAddress", "value":1000000000, "bounce":true}' --abi Wallet.abi.json --sign Wallet.keys.json
```

## Further Steps

Now your contract is up and running! You can:

- Check out [Solidity API for Everscale](https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/API.md)
- Check out more [contract samples](samples.md)
- Explore in depth some aspects of smart-contract development for Everscale
- Build CLI utilities from source in [GitHub](https://github.com/tonlabs/tonos-cli) to make sure you have the latest version
