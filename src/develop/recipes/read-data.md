---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Read data from blockchain

There are several types of things you can read from a blockchain. These are various queries to blockchain RPC node, contract get-methods and contract events.

Usually you will connect your dApp to existing smart contract system, deployed on-chain by a smart-contract developer. Thus, you will have an address (a string, that usually looks like `0:abcdef…7890`) and an ABI (`.json` file) of a contract you want to interact with.

In each example below, we will assume that you have following definitions of the address and ABI:

<Tabs>
  <TabItem value="ever-sdk" label="ever-sdk-js">

  ```typescript
  const abi = require('path/to/Contract.abi.json');
  const address = "0:deadbeef...00";
  ```
  </TabItem>
  
  <TabItem value="inp-prov" label="everscale-inpage-provider">

  ```typescript
  import { Address } from 'everscale-inpage-provider';
  import contractABI from "path/to/Contract.abi.json";
  const contractAddress = new Address("0:deadbeef...00");
  ```
  </TabItem>

  <TabItem value="surf-keeper" label="surf-keeper-provider">

  ```typescript
  import { Address } from 'surf-keeper-provider';
  import contractABI from "path/to/Contract.abi.json";
  const contractAddress = new Address("0:deadbeef...00");
  ```
  </TabItem>
</Tabs>


## Invoke a get-method

<Tabs>
  <TabItem value="ever-sdk" label="ever-sdk-js">

  ```typescript
      // Execute the get method `getTimestamp` on the latest account's state
    // This can be managed in 3 steps:
    // 1. Download the latest Account State (BOC)
    // 2. Encode message
    // 3. Execute the message locally on the downloaded state

    const [account, message] = await Promise.all([
        // Download the latest state (BOC)
        // See more info about query method here 
        // https://github.com/tonlabs/ever-sdk/blob/master/docs/mod_net.md#query_collection
        client.net.query_collection({
            collection: 'accounts',
            filter: { id: { eq: address } },
            result: 'boc'
        })
        .then(({ result }) => result[0].boc)
        .catch(() => {
            throw Error(`Failed to fetch account data`)
        }),
        // Encode the message with `getTimestamp` call
        client.abi.encode_message({
            abi,
            address,
            call_set: {
                function_name: 'getTimestamp',
                input: {}
            },
            signer: { type: 'None' }
        }).then(({ message }) => message)
    ]);

    // Execute `getTimestamp` get method  (execute the message locally on TVM)
    // See more info about run_tvm method here 
    // https://github.com/tonlabs/ever-sdk/blob/master/docs/mod_tvm.md#run_tvm
    response = await client.tvm.run_tvm({ message, account, abi });
    console.log('Contract reacted to your getTimestamp:', response.decoded.output);
  ```
  </TabItem>

  <TabItem value="inp-prov" label="everscale-inpage-provider">

  ```typescript
  console.log('inpage provider');
  ```
  </TabItem>

  <TabItem value="surf-keeper" label="surf-keeper-provider">

  ```typescript
  console.log('surf keeper');
  ```
  </TabItem>
</Tabs>

## Fetch or subscribe to contract events

<Tabs>
  <TabItem value="ever-sdk" label="ever-sdk-js">

  ```typescript
  // Query events
  result = await client.net.query({
  query: `query MyQuery($address: String!, $cursor: String, $count: Int, $start_seq_no: Int, end_seq_no: Int) {
    blockchain {
        account(address: $address){
            messages(
                master_seq_no_range: { start: $start_seq_no, end: $end_seq_no }
                first: $count,
                msg_type: [ExtOut, ExtIn, IntIn, IntOut],
                after: $cursor
            ) {
                edges {
                    node { id, created_at }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
}`,
       variables:{address, cursor, count, start_seq_no, end_seq_no}
}); 

...

    // Subscribe to events
    const messageSubscription = await TonClient.default.net.subscribe_collection({
    collection: "messages",
    filter: {
        dst: { eq: your-contract-address },
        msg_type:{ in: [0,1,2] }
    },
    result: "boc"
}, <callback function>
});

  ```
  </TabItem>

  <TabItem value="inp-prov" label="everscale-inpage-provider">

  ```typescript
  console.log('inpage provider');
  ```
  </TabItem>

  <TabItem value="surf-keeper" label="surf-keeper-provider">

  ```typescript
  console.log('surf keeper');
  ```
  </TabItem>
</Tabs>

## Decode message

<Tabs>
  <TabItem value="ever-sdk" label="ever-sdk-js">

  ```typescript
 const decoded = (await client.abi.decode_message({
        abi: abiContract(HelloEventsContract.abi),
        message: boc,
    }));
switch (decoded.body_type) {
case MessageBodyType.Input:
    log_.push(`External inbound message, function "${decoded.name}", fields: ${JSON.stringify(decoded.value)}` );
    break;
case MessageBodyType.Output:
    log_.push(`External outbound message (return) of function "${decoded.name}", fields: ${JSON.stringify(decoded.value)}`);
    break;
case MessageBodyType.Event:
    log_.push(`External outbound message (event) "${decoded.name}", fields: ${JSON.stringify(decoded.value)}`);
    break;
}
  ```
  </TabItem>
</Tabs>

## Subscribe to updates

<Tabs>
  <TabItem value="ever-sdk" label="ever-sdk-js">

  ```typescript
// Account updates
const accountSubscription = await TonClient.default.net.subscribe_collection({
    collection: "accounts",
    filter: { id: { eq: address } },
    result: "balance",
}, (params, responseType) => {
    if (responseType === ResponseType.Custom) {
        console.log("Account has updated. Current balance is ", parseInt(params.result.balance));
    }
});

...

  // Account messages
  const messageSubscription = await TonClient.default.net.subscribe_collection({
    collection: "messages",
    filter: {
        src: { eq: address },
        OR: {
            dst: { eq: address },
        }
    },
    result: "boc",
}, async (params, responseType) => {
    try {
        if (responseType === ResponseType.Custom) {
            const decoded = (await TonClient.default.abi.decode_message({
                abi: abiContract(your-contract-abi),
                message: params.result.boc,
            }));
            switch (decoded.body_type) {
            case MessageBodyType.Input:
                console.log(`External inbound message, function "${decoded.name}", parameters: `, JSON.stringify(decoded.value));
                break;
            case MessageBodyType.Output:
                console.log(`External outbound message, function "${decoded.name}", result`, JSON.stringify(decoded.value));
                break;
            case MessageBodyType.Event:
                console.log(`External outbound message, event "${decoded.name}", parameters`, JSON.stringify(decoded.value));
                break;
            }
        }
    } catch (err) {
        console.log('>>>', err);
    }
}); 
  ```
  </TabItem>
</Tabs>

## Read arbitrary data from blockchain

In most cases, the starting point for reading blockchain data is an account address. But sometimes you may want to perform arbitrary queries.

For such cases, the fullnode GraphQL API is a perfect solution. There is a public [Evercloud](https://evercloud.dev/) infrastructure for that. Head over to [Evercloud Docs](https://docs.evercloud.dev/) to read more.

It is fully opensource, so you may want to deploy your own full node instance with Graph QL interface. You can also reconfigure it for your dApp needs. For example - build various custom indexes according to your smart contract system architecture. Head over to [Graph QL Server repository](https://github.com/tonlabs/ton-q-server) to learn more details.

## Links

Explore the full guides to reading blockchain data in Ever SDK here:

https://docs.everos.dev/ever-sdk/guides/work_with_contracts/run_abi_get_method

https://docs.everos.dev/ever-sdk/guides/work_with_contracts/work_with_events

https://docs.everos.dev/ever-sdk/guides/work_with_contracts/decode_message

https://docs.everos.dev/ever-sdk/guides/queries_and_subscriptions/subscribe_to_updates