---
sidebar_position: 6
---

# Everscale Wallet API guide

Via following [this link](https://github.com/broxus/ever-wallet-api) you can find all necessary information concerning the interaction with and configuration of Everscale wallet API. 

In order to understand how to send transactions and track their statuses please see the guide below.

## Using the Everscale Wallet API

### 1. Brief description

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

1. Follow the instructions from the Readme https://github.com/broxus/ever-wallet-api
2. Create yourself a "system address" by calling `/address/create` with empty parameters. The response will return an EVER address. It is necessary to send EVERs to it, which will be consumed as gas for further work.
3. In the table `api_service_callback` we enter the address of our backend, which will deal with transaction processing.
4. Configure token whitelist:   
You can see the Root-Contract addresses at https://raw.githubusercontent.com/broxus/ton-assets/master/manifest.json.  
By default, the whitelist already includes all the tokens in this list.
To add more tokens to the whitelist use the script below:

```bash
  ./scripts/root_token.sh -t native --database-url ${DATABASE_URL} --name ${TOKEN_NAME} --address ${TOKEN_ADDRESS}
```
- DATABASE_URL - Postgres connection url (example: postgresql://postgres:postgres@127.0.0.1/ton_wallet_api)
- TOKEN_NAME - Token name (example: WEVER)
- TOKEN_ADDRESS - Token address (example: 0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37)

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

Or use the script:

```bash
# Create transaction
API_KEY=${API_KEY} SECRET=${API_SECRET} HOST=${HOST} \
./scripts/wallet.sh -m create_transaction \
--src-addr {sender} --dst-addr {recipient} --amount {amount}
```

You can track the status of a transaction via the following two ways:

1. The recommended way is via callback `AccountTransactionEvent`, which has `transactionStatus` field:    
`Expired` - end state for failed transactions,  
`Done` - final state for successful transactions. 

If your backend was disabled during the callback or responded with an `error`, the event will have an Error state. In this case you should query all events `/events` in `Error` state at backend startup, process them and give each event a `Done` state by calling `/events/mark`. 

2. The second way is by polling the GET method `/transactions/id/<uuid>`

### 4. How to process a transaction from a user on the backend

We generate a deposit address for the user by calling  `/address/create` with empty parameters.

After receiving the transaction, the backend receives a callback of the form `AccountTransactionEvent` (see [swagger](https://tonapi.broxus.com/swagger.yaml)).   
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

Or use the script:

```bash
 # Create token transaction
API_KEY=${API_KEY} SECRET=${API_SECRET} HOST=${HOST} \
./scripts/wallet.sh -m create_token_transaction \
--src-addr {sender} --dst-addr {recipient} \
--root-addr {root_token_address} --amount {amount}
```
You can track the status of a transaction with: 
1) (Recommended way) via callback `AccountTransactionEvent`, which has transactionStatus field:
- `expired` - end state for failed transactions,
- `done` - final state for successful transactions. 


If your backend was disabled during the callback or responded with an error, the event will have an `Error` state.    
In this case you should query all events `/events` in `Error` state at backend startup, process them and give each event a `Done` state by calling `/events/mark`.  
 
2) by polling the GET method `/transactions/id/<uuid>`

