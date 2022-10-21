---
sidebar_position: 0
---

# Deploy smart contracts with Locklift

## Prerequisite

Before all else, please ensure the following are installed.

- Node JS – version 14 or later
- Docker – version 19 or later 
- Everscale Solidity compiler (requires VC++ Runtime on Windows). 

## Initialize the project

I. Let’s initialize the project. 
To do this, please run the following commands in the terminal: : `npx locklift init -f`.   
For initializing in the current directory, refer to the following.

```shell
npx locklift init -f
[INFO]  New Locklift project initialized in .
[INFO]  Installing required dependencies...
[INFO]  
added 12 packages, changed 1 package, and audited 181 packages in 8s

23 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

[INFO]  LockLift initialized in . happy hacking!
```

II. Good job! Let’s initialize your test Locklift project with a smart-contract example:

`npx locklift init --path amazing-locklift-project`

```shell
npx locklift init --path amazing-locklift-project
[INFO]  New Locklift project initialized in amazing-locklift-project
[INFO]  Installing required dependencies...
[INFO]  
added 180 packages, and audited 181 packages in 13s

23 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

[INFO]  LockLift initialized in amazing-locklift-project happy hacking!
```
You can see that your `Sample.sol` smart contract appeared in the `amazing-locklift-project/contracts` directory.

III. Now let's Generate keys using [**tonos-cli**](https://github.com/tonlabs/tonos-cli) (this utility comes with the everdev package) and then replace test keys with yours in line 75 of `locklift.config.ts`.

Use the command `tonos-cli genphrase`.

IV. This command uses TON Solidity Compiler and the TVM linker to build all smart contracts of the project:   
`npx locklift build`

```shell
npx locklift build                                             
[INFO]  Start downloading compiler version 0.62.0
[INFO]  compiler version 0.62.0 successfully downloaded
[INFO]  Start downloading lib version 0.62.0
[INFO]  lib version 0.62.0 successfully downloaded
[INFO]  Found 1 sources
[INFO]  factorySource generated
[INFO]  Built
```

V. The command below runs the tests of the Mocha project.   
Run `npx locklift test --networklocal`  
The Locklift object will be configured and enabled automatically. 
You don’t need to import it manually:

```shell
npx locklift test --network local
[INFO]  Found 1 sources
[INFO]  factorySource generated
[INFO]  Built


  Test Sample contract
    Contracts
      ✔ Load contract factory
      ✔ Deploy contract (192ms)
      ✔ Interact with contract (79ms)


  3 passing (281ms)
```

**MochaJS** is a JavaScript framework used for automated testing of apps. It can be used both on the Javascript server and in the browser. 

**ChaiJS** is a library for Node JS, and like Mocha, it can also be used on the server or in the browser. Chai could be applied in conjunction with any library for testing.

## The smart contract itself

Indicate Solidity Compiler version to avoid the possibility that new compilers will impact your code in the future.

You can access the EverX (ex., TON Labs) repository via [this link](https://github.com/tonlabs).   
It will supply you with the compiler’s source code, which you can use for free.   
For the Compiler API documentation, please follow [this link](https://github.com/tonlabs/TON-Solidity-Compiler/blob/master/API.md). 

Variables are usually declared in the class contract `{$CONTRACT-NAME} {}`:

```sol
pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

// This is class that describes your smart contract.
contract First {
    // Contact can have an instance verriables.
    // In this example instance variable 'timestamp' is used to sote the time of 'constructor' or 'touch'
    // function call
    unit32 public timestamp;
```

Let’s examine the function `constructor() public {`.  
**Constructor** is a function that is executed only once. Namely, when the smart contract is deployed on the blockchain.

Let’s add the following variable to our contract uint32 public timestamp:

```sol
pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

contract First {
    uint16 static _nonce;
    unit32 public timestamp;
```

Now let’s assign the value of the function `timestamp = now;`
This means that the function execution result will be included in the timestamp variable during deployment, which returns the current time in UnixTime format.

```sol
    constructor(uint _state) public {
        tvm.accept();

        timestamp = now;
```

Let’s run our script on the test network:   
`npx locklift run --network local --script scripts/1-deploy-sample.ts`:

```shell
npx locklift run --network local --script scripts/1-deploy-sample.ts
[INFO]  Found 1 sources
[INFO]  factorySource generated
[INFO]  Built
Sample deployed at: 0:069d34c52c000e52bfc53c3cf4eea58ba54802cb5f6073c81c3ed1dac14be9ea
```

Now, you can see that the smart contract has been successfully compiled and deployed on the test network.

The address of the smart contract is the following: 

`0:069d34c52c000e52bfc53c3cf4eea58ba54802cb5f6073c81c3ed1dac14be9ea`