---
sidebar_position: 2
description: Send message and subscribe for REMP receipts in GraphQL
---

# Work with REMP in GraphQL

## Send message

Use mutation postRequests to send a message to blockchain.

You can send a batch of queries with this API.

Use [this function](https://docs.everos.dev/ever-sdk/reference/types-and-methods/mod_boc#get_boc_hash) to calculate message hash. 

```
mutation{
  postRequests(requests:[
    {
      id: "tvm-hash-of-message-boc-in-base64"
      body: "message-body-in-base64"
    }
  ])
}
```

![](https://2546896325-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fu8iA3ji82Xtk5tqBULVH%2Fuploads%2FsrgXrQoeLu9vctMjW6FO%2Fimage.png?alt=media&token=c4ba3984-7af0-429c-bd6b-1e1891fe81dd)

## Subscribe for REMP receipts

 After sending an external inbound message you can subscribe for its processing.

This feature may be good if you want to make your application more responsive and user-friendly by providing detailed information about message processing stages to the user.

Use subscription `rempReceipts` to receive message processing statuses.

Subscription returns an error message and closes if the first receipt is not received within 5 seconds, and if any subsequent receipt is not received within 60 seconds after the previous receipt.

You can subscribe for receipts directly from API or you can use ever-sdk `process_message` function to receive these statuses into the callback. [See the sample. ](https://github.com/tonlabs/sdk-samples/blob/master/core-examples/node-js/remp/index.js)

### gql playground

```
subscription{
  rempReceipts(messageId: "082a5c2ab5b68b0ef9b8ced4fa865933ab19603f5171ec1190f3f45943214de0"){
    messageId
    timestamp
    json
    kind
  }
}
```

### wscat
```
wscat -c wss://mainnet.evercloud.dev/your-project-id/graphql -s graphql-ws
{"id":"1","type":"start","payload":{"variables":{},"extensions":{},"operationName":null,"query":"subscription{rempReceipts(messageId:\"082a5c2ab5b68b0ef9b8ced4fa865933ab19603f5171ec1190f3f45943214de0\"){messageId,timestamp,json,kind}}"}}
```

### Result message payload example

```json
{
  "data": {
    "rempReceipts": {
      "messageId": "082a5c2ab5b68b0ef9b8ced4fa865933ab19603f5171ec1190f3f45943214de0",
      "timestamp": 0,
      "json": "{\"message_id\":\"082a5c2ab5b68b0ef9b8ced4fa865933ab19603f5171ec1190f3f45943214de0\",\"timestamp\":0,\"source_id\":\"a0573b3f9ed4e78781250a8a6955e930ffbde24e35d50b85dd2cf50f1d6ef30e\",\"signature\":\"\",\"kind\":\"PutIntoQueue\"}",
      "kind": "Other"
    }
  }
}

```

### Error payload

If no receipt was received within a timeout (5 seconds for the first receipt, and 60 seconds for next receipts), there will be a ws message with `error` type and this payload:

```json
{
  "error": {
    "name": "Error",
    "message": "Timeout"
  }
}
```
## Full docs

See original guides at 

https://docs.evercloud.dev/samples/graphql-samples/send-message

https://docs.evercloud.dev/samples/graphql-samples/subscribe-for-remp-receipts

Full GraphQL API documenation is available at https://docs.everos.dev/ever-platform/reference/graphql-api
