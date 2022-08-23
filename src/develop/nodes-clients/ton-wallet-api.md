---
sidebar_position: 3
[//]: # (draft: true)
---

# TON Wallet API

Via following [this link](https://github.com/broxus/ton-wallet-api) you can find all necessary information concerning the interaction with and configuration of Ton wallet API. 

In order to understand how to send transactions and track their statuses please see the guide below.

## Using the TON Wallet API

### 1. Brief description of Ton-Wallet-API. 

This API guide is intended to explain how to send and track transactions with the help of Ever Wallet.    
The wallet tracks addresses from the database and indexes all transactions, storing the information about them in the postgres DB.    
All transactions with native EVERs are tracked, and there is a whitelist of Root Token addresses to be tracked in the settings.   
There is a Callbacks Table in the database, where you can specify the URL of your backend to which callbacks will come for all transactions.

It takes about 40 minutes to synchronize the node.  
Both the Ton-Wallet-API and callback requests use HMAC signatures in the headers.

### 2. Setup

You need postgres11 + a dedicated server to work    
CPU: 4 cores, 2 GHz   
RAM: 8 GB    
Storage: 200 GB fast SSD    
Network: 100 MBit/s   

1. Follow the instructions from the Readme https://github.com/broxus/ton-wallet-api
2. Create yourself a "system address" by calling `/address/create` with empty parameters. The response will return an EVER address. It is necessary to send EVERs to it, which will be consumed as gas for further work.
3. In the table `api_service_callback` we enter the address of our backend, which will deal with transaction processing.
4. Configure token whitelist:   
You can see the Root-Contract addresses at https://raw.githubusercontent.com/broxus/ton-assets/master/manifest.json.  
By default, the whitelist already includes all the tokens in this list.
To add more tokens to the whitelist use the script below:

#### Add root token to whitelist 

```bash
DATABASE_URL=${DATABASE_URL} RUSTFLAGS='-C target-cpu=native' cargo run \
  --release -- root_token \
  --name USDT --address 0:751b6e22687891bdc1706c8d91bf77281237f7453d27dc3106c640ec165a2abf
```

### 3. Transfer EVER

```
{
 // To create a transaction you will need a sender's address. For example, your system address.   

 "fromAddress": "0:0000000000000000000000000000000000000000000000000000000000000000",  
  "bounce": false,    

  // a random uuid that you generate for yourself and store it on your backend to further track the status of the transaction

 "ID": "00000000-0000-0000-0000-000000000000",      
 
 "outputs": [
   {
     // How many EVERs to send. To send 1 EVER this value = 1000000000
     "value": "1000000000"
     // Set Normal to deduct the number of sent EVERs from the value    
     "outputType": "Normal",    
     // Recipient address of EVERs    
     "recipientAddress": "0:0000000000000000000000000000000000000000000000000000000000000000",    
   }
 ]
}
```
You can track the status of a transaction via the following two ways:

1. The recommended way is via callback `AccountTransactionEvent`, which has `transactionStatus` field:    
`Expired` - end state for failed transactions,  
`Done` - final state for successful transactions. 
2. The second way is by polling the GET method `/transactions/id/<uuid>`

### 4. How to process a transaction from a user on the backend

We generate a deposit address for the user by calling  `/address/create` with empty parameters.

After receiving the transaction, the backend receives a callback of the form `AccountTransactionEvent` (see swagger).   
You can also get such events in a list, using the `/events` method.

1. To merge tokens to the system address, you can use the `/tokens/transactions/create` method in such a callback (see ["5. Token Transfer."](#5-token-transfer))
2. If your backend was not working at the time of the callback or responded with an error, the event will have an Error status.

### 5. Token transfer

First, check the status and balance of the address you want to send tokens from by making a GET request to `/address/{string}`
The address you are sending tokens from must have at least 0.6 EVER (balance >= 600000000), if the balance is not enough, top it up (see ["3. Transfer EVER"](#3-transfer-ever) )

To transfer tokens, use the method `/tokens/transactions/create`

```
{

 // Sender  
 "fromAddress": "string",  
 // Receiver            
 "recipientAddress": "string",              

 //  The number of tokens with decimals. For example, for transferring 1 USDT this value = "1000000"
 "value": "1000000"

 // How many EVERs to apply. The default recommended value is 0.5 EVER. The funds will be debited fromAddress.
 "fee": "5000000000",  

 // The address to which to return the remaining EVERs. For example, your system address.
 "sendGasTo": "string",                                

 // A random uuid that you generate yourself and store on your backend to further track the status of the transaction
 "id": "00000000-0000-0000-0000-000000000000",      

 // Token Address. (see https://raw.githubusercontent.com/broxus/ton-assets/master/manifest.json)
 

 "rootAddress": "string",                    
}
```

>  The documentation in Everscale repository is a community effort. Therefore, everyone can contribute with proposals for new topics, suggest new content elements, participate in editing, and provide ideas that will be of great help for network development.
Please be informed that our documentation can be [edited via GitHub](https://github.com/everscale-org/docs/issues).  
  Also please make sure to consult our rules and rewards policy via [this link](https://docs.everscale.network/contribute/hot-streams/documentations).  
  Feel free to join [Everscale Documentation Development Telegram chat](https://t.me/+C2IpQXWZtCwxYzEy) and [Everscale Developers Onboarding Telegram chat](https://t.me/+Vca1Gs6uPzIyNWVi)!
