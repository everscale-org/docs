---
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Write data to blockchain

To put something in the Everscale blockchain, you need to send an external message to some account. Depending on a use-case and smart-contract logic, you may also want the account (usually it will be a users' Wallet smart-contract) to act as a proxy and forward your message to other contract. In this article, we describe both cases

## Send External Message

<Tabs>

  <TabItem value="ever-sdk process" label="ever-sdk-js process_message">

  ```typescript
  // Encode the message with `touch` function call
const params = {
    send_events: false,
    message_encode_params: {
        address,
        abi,
        call_set: {
            function_name: 'touch',
            input: {}
        },
        // There is no pubkey key check in the contract
        // so we can leave it empty. Never use this approach in production
        // because anyone can call this function
        signer: { type: 'None' }
    }
}
// Call `touch` function
let response = await client.processing.process_message(params);
console.log(`Сontract run transaction with output ${response.decoded.output}, ${response.transaction.id}`);
  ```
  </TabItem>

  <TabItem value="ever-sdk encode+send" label="ever-sdk-js encode_message -> send_message">

  ```typescript
  // Encode the message with `touch` function call
const params = {
        abi = {
            type: 'Contract',
            value: contract.abi
        },
        address,
        call_set: {
            function_name: 'touch',
            input: {}
        },
        // There is no pubkey key check in the contract
        // so we can leave it empty. Never use this approach in production
        // because anyone can call this function
        signer: { type: 'None' }
}

// Create external inbound message with `touch` function call
const encode_touch_result = await client.abi.encode_message(params);

// Send `touch` call message to the network
// See more info about `send_message` here  
// https://github.com/tonlabs/ever-sdk/blob/master/docs/mod_processing.md#send_message
shard_block_id = (await client.processing.send_message({
    message: encode_touch_result.message,
    send_events: true
    },logEvents
)).shard_block_id;
console.log(`Touch message was sent.`);
  ```
  </TabItem>

  <TabItem value="inp-prov" label="everscale-inpage-provider">

  ```typescript
  console.log("inpage-provider");
  ```
  </TabItem>

</Tabs>

## Encode and send Internal Message

<Tabs>
  <TabItem value="inp-prov" label="everscale-inpage-provider">

  ```typescript
  console.log("inpage-provider");
  ```
  </TabItem>

</Tabs>

## Links

Explore the full guides to writing data to blockchain in Ever SDK here:

  https://docs.everos.dev/ever-sdk/guides/work_with_contracts/deploy

  https://docs.everos.dev/ever-sdk/guides/work_with_contracts/run_onchain

  Advanced guide for working with Surf keeper provider is [here](surf-wallet-advanced.md).