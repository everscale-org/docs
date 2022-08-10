---
description: Write distributed systems of smart contracts
sidebar_position: 10
---

# Distributed programming

How do contracts and programmers survive in ES? :-) They don’t write contracts in which the state can continuously grow, but write distributed systems of smart contracts. And they are capable of doing this by virtue of the concepts realized in ES. For example TIP-3 tokens create a separate smart-contract for each token owner (that is what a wallet is) and can send tokens directly among contracts without a central hub. Below we will look at an example of how this works

## Important concept

In ES, each contract address is a uniquely computed value. A contract address is a hash of the contract code and initial data (initial data is a value of static variables, and not what you pass to the constructor, since in ES the constructor is a function that you call after the deployment of the contract in one transaction).

This is a very important pattern of distributed programming (as it is understood in ES). Knowing the code of a contract, and it initials data you can make sure that you are being called by a contract with the same parents as your own. Or, knowing the contract code and its initial data,  you can compute the address of a contract on the fly and send messages to it.

## How contracts are deployed

The concept described above is also tied to how contracts are deployed in ES. The contract can naturally be deployed by another contract. But what should we do if we want to deploy a contract from outside?

To do this, we have to take the contract code and its initial data, and compute its future address.

After that, we simply send money there, with a bounce flag = false. And the money just stays on the address, which has no initialized code.


Then we send a special external message to this address with the code and initial data, and we say “Look, here we have the code and initial data, the hash of which gives us this address, initialize it please” and the network initializes the contract.

Now let’s look at a really simplified realization of a [TIP-3](../../../standard/TIP-3) token.

Our token consists of 2 contracts:

*  [Root.sol](#root) is controlled by whoever released the token, this allows them to print tokens and deploy the wallets of individual users.
*  [Wallet.sol](#wallet) is a wallet contract for individual users. Yes, each user has their own small contract that stores their token balance.

By creating contract-wallets we solve a number of different problems:

*  All wallets end up in different shards which distributes the load evenly throughout the network.
* Wallet contracts are very small with small states. Validators can load them very quickly from a disk.
* Storage fee. If we had one contract with a huge hash map, then it would have to pay a large fee for its storage, and it is not clear who would pay and how for this storage. If there are many accounts with small balances that their owners no longer need, then naturally they will not pay for its storage, and the rest of the holders of this token will have to pay for all of the “remainders.”   So that smart contract programmers do not have to think about how to force users to pay for storage (so that the entire contract is not frozen) or clean up old data inside the contract, ES has allowed each user to deploy their own contract.   Each user determines how long they will pay for storage and can always adjust these parameters.

Below we are going to look at the code underlying this to understand how it works and why it is safe.


A few thoughts to keep in mind while looking at the code:

*  The contract address is the hash (contract code + static variables).
*  If we know the wallet contract code and its initial variables (what the root address of the contract is and what pubkey controls it), then we can calculate what address this contract will have.
*  When one wallet receives a message from another wallet, it can determine from the sender's address whether the sending wallet has exactly the same code, to see if it really has the tokens it is sending you.


## `Root.sol` {#root}

```solidity
pragma ton-solidity >= 0.53.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "TokenWallet.sol";

interface ITokenRootContract {
  function deployEmptyWallet(
    uint256 _wallet_public_key,
    uint128 _deploy_evers
  ) external responsible returns(address);

  function mint(
    address to,
    uint128 tokens
  ) external;

  function deployWalletWithBalance(
    uint256 _wallet_public_key,
    uint128 _deploy_evers,
    uint128 _tokens
  ) external returns ( address );
}

library TokenRootContractErrors {
  uint8 constant error_tvm_pubkey_not_set = 100;
  uint8 constant error_message_sender_is_not_my_owner = 101;
  uint8 constant error_deploy_ever_to_small = 102;
  uint8 constant error_insufficient_evers_on_contract_balance = 103;
  uint8 constant error_deploy_wallet_pubkey_not_set = 104;
}

contract TokenRootContract is ITokenRootContract {
  uint128 public start_gas_balance;
  uint128 public total_supply;

  // The code of the wallet contract is needed to deploy the wallet contract.
  // In the tvm the code is also stored in the TvmCell and it can be sent via messages. 
  TvmCell static wallet_code;

  constructor() public {
    require(tvm.pubkey() != 0, TokenRootContractErrors.error_tvm_pubkey_not_set);
    tvm.accept();

    start_gas_balance = address(this).balance;
  }

  modifier onlyOwner() {
    require(tvm.pubkey() != 0 && tvm.pubkey() == msg.pubkey(), TokenRootContractErrors.error_message_sender_is_not_my_owner);
    _;
  }

  function deployWallet(
    uint256 _wallet_public_key,
    uint128 _deploy_evers
  ) private returns (address) {
    // stateInit - the message deploying the contract where we establish the code 
    // the contract and its static variables. 
    // Essentially the hash(stateInit) is the contract address. 
    // The contract address depends on the code and the intial variables.
    // So we can determine the contract address just by knowing its code 
    // and initial variables (not those that are sent in the constructor). 

    // Pay attention to what the wallet address depends on.
    // It depends on the root_address(this), the wallet code and the owner's public key. 
    TvmCell stateInit = tvm.buildStateInit({
        //We specify the contract interface so Solidity correctly packs 
        // varInit into TvmCell (BoC, see the previous chapter).
        contr: TokenWalletContract,
        varInit: {
            //the value of static variables
            root_address: address(this),
            wallet_code: wallet_code
        },
        // pubkey - this will return the tvm.pubkey(). 
        // Essentially this is just another static variable that is introduced separately.
        pubkey: _wallet_public_key,
        code: wallet_code
    });

    // Here we create one message that will deploy the contract 
    // (if the contract is already deployed , nothing will happen)
    // also, this message will call the constructor 
    // () without arguments .
    address wallet = new TokenWalletContract{
        stateInit: stateInit,
        value: _deploy_evers, //the amount of native coins we are sending with the message 
        wid: address(this).wid,
        flag: 0 //this flag denotes that we are paying for the creation of the message from the value we are sending with the contract.  
    }();

    return wallet;
  }

  function deployEmptyWallet(
    uint256 _wallet_public_key,
    uint128 _deploy_evers
  ) override external responsible returns (address) {
    // With the help of this function, any other contract can deploy a wallet.

    require(_wallet_public_key != 0, TokenRootContractErrors.error_deploy_wallet_pubkey_not_set);
    require(_deploy_evers >= 0.05 ton, TokenRootContractErrors.error_deploy_ever_to_small);

    // This function reserves money on the contract account equal to the balance 
    // of the contract at the moment when the transaction is started. In order not to allow the message 
    // to spend money from the contract balance.
    // This is a complex moment and we will look at the details in the Additional Materials section  
    // in "Carefully working with value"
    tvm.rawReserve(0, 4);

    address deployed_contract = deployWallet(_wallet_public_key, _deploy_evers);

    // Our function is labelled responsible, this means that it is possible to be called  
    // with a smart contract and it will create a message with a callback. 
    // The compiler will simply add a field to the function arguments
    // answerID, which shows the ID of the function that will be called 
    // by sending a message back to the msg.sender address

    // Why do we use 128 here and not 64 - because from this transaction  
    // we have two external calls, one is to deploy the wallet contract,
    // and the second is the answer: responsible.
    // You can find more details about this in the "Carefully working with value" section.
    return { value: 0, bounce: false, flag: 128 } deployed_contract;
  }

  //minting tokens
  function mint(
    address _to,
    uint128 _tokens
  ) override external onlyOwner {
    // This method is called by an external message, 
    // here we have put some fool-proof protection in place.
    // This way we will pay for the fulfillment of the transaction from the contract account, 
    // then we check that there are more EVERs on the contract account 
    // then there were when it was deployed. This prevents a situation in which
    // there are no funds on the contract account and it gets deleted from the network  
    // or frozen because it conannot pay for its storage.
    require(address(this).balance > start_gas_balance, TokenRootContractErrors.error_insufficient_evers_on_contract_balance);
    require(_tokens > 0);

    // We agree to pay for the transaction from the contract account.
    tvm.accept();

    // We send a message with a call of the accept function to the contract at the indicated address.
    // To the message a sum of 0.01 EVER from the account address will be attached
    // (this will be done automatically, unless otherwise indicated)
    ITokenWalletContract(_to).accept(_tokens);

    total_supply += _tokens;
  }

  function deployWalletWithBalance(
    uint256 _wallet_public_key,
    uint128 _deploy_evers,
    uint128 _tokens
  ) override external onlyOwner returns ( address ) {

    require(_wallet_public_key != 0, TokenRootContractErrors.error_deploy_wallet_pubkey_not_set);
    require(_deploy_evers >= 0.1 ton, TokenRootContractErrors.error_deploy_ever_to_small);

    // Similar fool-proof mechanism to the one above, 
    // but here we also add _deploy_evers
    require(address(this).balance > start_gas_balance + _deploy_evers, TokenRootContractErrors.error_insufficient_evers_on_contract_balance);

    require(_tokens > 0);

    tvm.accept();

    // we deploy the wallet
    address deployed_contract = deployWallet(_wallet_public_key, _deploy_evers);

    // we send tokens to the wallet in the following message.
    ITokenWalletContract(deployed_contract).accept(_tokens);

    total_supply += _tokens;

    return deployed_contract;
  }

  onBounce(TvmSlice slice) external {
    tvm.accept();
    // This is a utility function for handling errors. You probably noticed that in
    // the mint function we did not check if the contract was deployed at the destination 
    // address. By default, when calling another contract, the message 
    // will have a flag bounce value of: true. If when the message is being processed by the contract 
    // an exception occurs at the destination address or the contract  
    // does not exist, then automatically (if there is enough money
    // attached to the message) a return message is sent with a call to 
    // the onBounce function and with arguments.
    // Here there is a stupid limitation requiring that arguments fit 
    // into 224 bits (WTF) but hopefully this is changed.

    // We use this function to show you how to handle a situation 
    // when tokens are minted to a non-existing address and to subtract from the total_supply
    // as the tokens were not printed.

    // This function cannot just be called, the message must 
    // have a special bounced: true flag,
    // which cannot be added manually when sending.
    // So there is no need to do additional checks that we actually sent the message 
    // as no bad actor can subtract from the total supply by sending an unexpected bounced message.

    uint32 functionId = slice.decode(uint32);
    if (functionId == tvm.functionId(ITokenWalletContract.accept)) {
        uint128 latest_bounced_tokens = slice.decode(uint128);
        total_supply -= latest_bounced_tokens;
    }
  }
}
```

## `Wallet.sol` {#wallet}

```solidity
pragma ton-solidity >= 0.53.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

interface ITokenWalletContract {
  function getBalance() external view responsible returns (uint128);
  function accept(uint128 _tokens) external;
  function transferToRecipient(uint256 _recipient_public_key, uint128 _tokens, uint128 _deploy_evers, uint128 _transfer_evers) external;
  function internalTransfer(uint128 _tokens, uint256 _sender_public_key, address _send_gas_to) external;
}

library TokenWalletContractErrors {
  uint8 constant error_tvm_pubkey_not_set = 100;
  uint8 constant error_message_sender_is_not_my_owner = 101;
  uint8 constant error_message_transfer_not_enough_balance = 102;
  uint8 constant error_message_transfer_wrong_recipient = 103;
  uint8 constant error_message_transfer_low_message_value = 104;
  uint8 constant error_message_internal_transfer_bad_sender = 105;
  uint8 constant error_message_transfer_balance_too_low = 106;
}

contract TokenWalletContract is ITokenWalletContract {
  address static root_address;
  TvmCell static wallet_code;
  uint128 public balance;

  constructor() public {
    //We check that the public key has been set
    require(tvm.pubkey() != 0, TokenWalletContractErrors.error_tvm_pubkey_not_set);
    tvm.accept();
  }

  modifier onlyRoot() {
    require(root_address == msg.sender, TokenWalletContractErrors.error_message_sender_is_not_my_owner);
    _;
  }

  modifier onlyOwner() {
    require(tvm.pubkey() == msg.pubkey(), TokenWalletContractErrors.error_message_sender_is_not_my_owner);
    _;
  }

  function accept(uint128 _tokens) override external onlyRoot {
    // We simply accept any amount of tokens the Root contract wants to send us 
    tvm.accept();
    balance += _tokens;
  }

  function getBalance() override external view responsible returns (uint128) {
    // Any contract can get our wallet balance 
    return { value: 0, bounce: false, flag: 64 } balance;
  }

  function transferToRecipient(
    uint256 _recipient_public_key,
    uint128 _tokens,
    uint128 _deploy_evers,
    uint128 _transfer_evers
  ) override external onlyOwner {
    // With this method we can send tokens to any similar wallet 
    // directly. When doing this we can say that we want to first 
    // deploy this wallet.

    require(_tokens > 0);
    require(_tokens <= balance, TokenWalletContractErrors.error_message_transfer_not_enough_balance);
    require(_recipient_public_key != 0, TokenWalletContractErrors.error_message_transfer_wrong_recipient);
    // You cannot send it to yourself :-)
    require(_recipient_public_key != tvm.pubkey());

    require(address(this).balance > _deploy_evers + _transfer_evers, TokenWalletContractErrors.error_message_transfer_balance_too_low);

    // A check to make sure we want to add no less than 
    // 0.01 ever to the outgoing message. If we don't add enough, the transaction will fail 
    // and onBounce won't work.
    // This is an empirical value, as on our network gas does not fluctuate  
    // and will only decrease from the original value.
    require(_transfer_evers >= 0.01 ever, TokenWalletContractErrors.error_message_transfer_low_message_value);

    tvm.accept();

    // We calculate the destination address of the wallet contract.
    TvmCell stateInit = tvm.buildStateInit({
        contr: TokenWalletContract,
        varInit: {
            root_address: root_address,
            wallet_code: wallet_code
        },
        pubkey: _recipient_public_key,
        code: wallet_code
    });

    address to;
    if (_deploy_evers > 0) {
        // We deploy the wallet, here everything should be familiar.
        to = new TokenWalletContract{
            stateInit: stateInit,
            value: _deploy_evers,
            wid: address(this).wid,
            flag: 1 // this means that we will pay for the creation of the outgoing message not from с _deploy_evers but from the wallet balance 
        }();
    } else {
        // We simply determine the destination wallet address.
        to = address(tvm.hash(stateInit));
    }

    balance -= _tokens;

    // Here we send a message with a call to the internalTransfer function,
    // described below. Since we have a guarantee in the blockchain on the order of 
    // message delivery, even if we just sent a deploy message 
    // for the contract above, we can be sure that it will deploy
    // before the internalTransfer will be called. We also put in
    // bounce: true, in case there is an error (we did not  
    // deploy the contract for example) to call the 
    // onBounce function and return the money to ourselves. 
    ITokenWalletContract(to).internalTransfer{ value: _transfer_evers, flag: 1, bounce: true } (
        _tokens,
        tvm.pubkey(),
        address(this)
    );
  }

  function internalTransfer(
    uint128 _tokens,
    uint256 _sender_public_key,
    address _send_gas_to
  ) override external {
    // Transfer accepting function. This is a very nice concept.
    // We can send tokens directly from one wallet
    // to another because in ES a contract address is a uniquely 
    // computed value. We can check that the contract that is 
    // calling us is the same kind of contract as ours and has the same 
    // Root and code. So we know for sure if the contract calls us  
    // these tokens are real and come from the contract root. 

    // We determine the address of the contract that called us  
    // from _sender_public_key
    address expectedSenderAddress = getExpectedAddress(_sender_public_key);

    // We make sure that the right address called us.
    require(msg.sender == expectedSenderAddress, TokenWalletContractErrors.error_message_internal_transfer_bad_sender);

    // Accept transfer.
    balance += _tokens;

    if (_send_gas_to.value != 0) {
        // We send all the unspent value that was in the message back 
        // to the contract. This is also possible to do via msg.sender,
        // but we want to show you here that you can send 
        // in a long chain the address to where the change should be returned  
        // if we have a long interaction. 
        _send_gas_to.transfer({ value: 0, flag: 64 });
    }
  }

  function getExpectedAddress(
    uint256 _wallet_public_key
  ) private inline view returns ( address ) {
    TvmCell stateInit = tvm.buildStateInit({
        contr: TokenWalletContract,
        varInit: {
            root_address: root_address,
            wallet_code: wallet_code
        },
        pubkey: _wallet_public_key,
        code: wallet_code
    });
    return address(tvm.hash(stateInit));
  }

  onBounce(TvmSlice body) external {
    // This is a utility function, messages will only end up here 
    // if during message processing, an error occurs
    // but there is enough money to create 
    // an onBounce message. No additional checks that you sent the 
    // message here are needed, you can't send a message here manually.
    tvm.accept();
    uint32 functionId = body.decode(uint32);
    if (functionId == tvm.functionId(ITokenWalletContract.internalTransfer)) {
        // Our transfer was not sent, we return the money to our balance.
        uint128 tokens = body.decode(uint128);
        balance += tokens;
    }
  }
}
```

## `ThirdParty.sol` {#third-party}

And here are some examples of `ThirdParty.sol` to show how to work with `responsible`.

```solidity
pragma ton-solidity >= 0.53.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "TokenRoot.sol";

contract ThirdPartyContract  {
    
    address public lastDeployedWallet;
    
    constructor() public {
        require(tvm.pubkey() != 0, 2);
        tvm.accept();
    }
    
    modifier onlyOwner() {
        require(tvm.pubkey() == msg.pubkey(), 3);
        _;
    }
    
    function deployWallet(
            address _root_contract,
            uint256 _wallet_public_key,
            uint128 _send_evers,
            uint128 _deploy_evers
        ) external onlyOwner {
          // This entire Third party contract was done to show you how to
          // call the responsible function.
          // Everything is simple here, we just call the function and transfer
          // callback - this is the ID function to call
          tvm.accept();
          ITokenRootContract(_root_contract).deployEmptyWallet{
          value: _send_evers,
          callback: onGetDeployed
          }(_wallet_public_key, _deploy_evers);
        }
    
    function onGetDeployed(
      address _address
    ) public {
        // The callback which Root will call in answer to deployEmptyWallet.
        // There is no built-in check to make sure this function
        // is truly being called in answer to your call.
        // So you have to check if you really made this call.
        // For example, by storing the address of root that you are interacting with
        // and checking that the response is something like require(msg.sender == root_address)
    
        // Fun fact, when we get an answer here, that does not mean 
        // that the wallet is deployed. This means that the Root
        // contract created an outgoing deploy message.
        // We can receive this message before the wallet is deployed 
        // (the message is en route).
        // In principle, the LT (see Additional information) guarantees us, 
        // that if we want to call a wallet method from here,
        // our message will not arrive earlier than the wallet is deployed.
        lastDeployedWallet = _address;
    }
}
```

By carefully reading the examples above, and playing around with the code available here [https://github.com/mnill/everscale-education-simple-tip3](https://github.com/mnill/everscale-education-simple-tip3), you should be able to understand the principles of distributed programming, how separate contracts are deployed in ES for different users and why it is safe.

If you’ve been able to piece everything together in your head, you are likely to also have appreciated the beauty of such a solution with distributed wallets. It solves several problems at once:

1.  There is no single big map where all balances are stored. Validators can load contracts from disks as quickly as possible.
2.  Every user deploys their own wallet and pays for the storage of their data on the blockchain.
3.  By transferring money directly between wallets, the load is distributed as evenly as possible throughout the blockchain. Each wallet ends up in a random shard, depending on the address of the wallet. So, if there is a sharp increase in the number of transfers, we do not have to rely on the performance of a particular shard, since we do not have a central smart contract through which all transfers must pass and which would cause a bottleneck. 

>  The documentation in Everscale repository is a community effort. Therefore, everyone can contribute with proposals for new topics, suggest new content elements, participate in editing, and provide ideas that will be of great help for network development.
Please be informed that our documentation can be [edited via GitHub](https://github.com/everscale-org/docs/issues).  
  Also please make sure to consult our rules and rewards policy via [this link](https://docs.everscale.network/contribute/hot-streams/documentations).  
  Feel free to join [Everscale Documentation Development Telegram chat](https://t.me/+C2IpQXWZtCwxYzEy) and [Everscale Developers Onboarding Telegram chat](https://t.me/+Vca1Gs6uPzIyNWVi)!
