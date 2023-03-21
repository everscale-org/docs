---
sidebar_position: 6
description: Create Evercloud project and start your communication with blockchain
---

# Get Started with Evercloud

## Registration

Go to [https://dashboard.evercloud.dev/](https://dashboard.evercloud.dev/) and click "Register now!". Verify your e-mail and you will be taken to the dashboard.

## Create a Project

1. Click "Create Project" and enter the name of your project

![](https://github.com/tonlabs/ever-platform-docs/raw/main/.gitbook/assets/image%20(22).png)


2. Click "Add project". You will see your project endpoints, analytics, security information and project settings:

![](https://github.com/tonlabs/ever-platform-docs/raw/main/.gitbook/assets/image%20(16).png)


## Configure security

This is optional if you want to protect your endpoint with Basic Auth authorization.

Do not share your secret with anyone and store it safely.

Go to the "Security" tab and click toggle "Secret required"

![](https://github.com/tonlabs/ever-platform-docs/raw/main/.gitbook/assets/image%20(13).png)


You will see your secret appear in the "Summary" tab

## Explore Playground

Click on the circle with arrow next to the endpoint to open GraphQL playground.

In the playground you can make queries and explore Graphql Schema.

> First, you need to add your projectID to the url inside the playground to access it.

> If you enabled "Secret required" option, then you need specify Basic Auth creds in the headers! You will find them on "Security" tab in Evercloud Dashboard.

![](https://github.com/tonlabs/ever-platform-docs/raw/main/.gitbook/assets/image%20(7)%20(1).png)


Now lets execute this query to get the hash of the last masterchain block!

```graphql
query{
  blockchain{
    blocks(last:1){
      edges{
        node{
          id
        }
      }
     }
  }
}
```

See the result

![](https://github.com/tonlabs/ever-platform-docs/raw/main/.gitbook/assets/image%20(12).png)


## Connect to Evercloud

### HTTPS

#### Without secret

**Curl**
```bash
curl --location --request POST 'https://mainnet.evercloud.dev/your-project-id/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query($address: String!){\n  blockchain{\n    account(address:$address){\n      info{\n        balance(format:DEC)\n      }\n    }\n  }\n}","variables":{"address":"0:e17ac4e77f46626579c7c4fefe35286117384c5ccfc8745c9780cdf056c378bf"}}'
```

**ever-sdk-js**

```javascript
const {TonClient} = require("@eversdk/core");
const {libNode} = require("@eversdk/lib-node");

TonClient.useBinaryLibrary(libNode)

const client = new TonClient({
    network: {
        endpoints: [
            "mainnet.evercloud.dev/your-project-id/graphql"
        ],
    },
});

(async () => {
    try {
        queryString = `
            query{
                blockchain{
                blocks(workchain:-1, last:1){
                    edges{
                    node{
                        hash
                        seq_no
                    }
                    }
                }
                }
            }
        `
        let {seq_no, hash} = (await client.net.query({ 
            "query": queryString }))
        .result.data.blockchain.blocks.edges[0].node;
        console.log("The last masterchain block seqNo is " + seq_no+ '\n' + "the hash is" + hash);
        client.close();
}
    catch (error) {
            console.error(error);
    }
}
)()
```

**everdev**

```bash
everdev network credentials main --project "your-project-id"
```

**tonos-cli**

```
tonos-cli config --url "mainnet.evercloud.dev" --project_id "your-project-id"
Succeeded.
{
  "url": "mainnet.evercloud.dev",
  "wc": 0,
  "addr": null,
  "method": null,
  "parameters": null,
  "wallet": null,
  "pubkey": null,
  "abi_path": null,
  "keys_path": null,
  "retries": 5,
  "timeout": 60000,
  "message_processing_timeout": 40000,
  "out_of_sync_threshold": 15,
  "is_json": false,
  "depool_fee": 0.5,
  "lifetime": 60,
  "no_answer": true,
  "balance_in_tons": false,
  "local_run": false,
  "async_call": false,
  "debug_fail": "None",
  "project_id": "your-project-id",
  "access_key": null,
  "endpoints": []
}
```

**JS fetch**

```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
  query: "query{\n  blockchain{\n    blocks(workchain:-1, last:1){\n      edges{\n        node{\n          hash\n          seq_no\n        }\n      }\n    }\n  }\n}",
  variables: {}
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
};

fetch("https://mainnet.evercloud.dev/your-project-id/graphql", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

**Postman**

```
URL: https://mainnet.evercloud.dev/your-project-id/graphql
Body: GraphQL
Query:

query{
  blockchain{
    blocks(workchain:-1, last:1){
      edges{
        node{
          hash
          seq_no
        }
      }
    }
  }
}
```


#### With secret

**Curl**

```bash
curl --location --request POST 'https://mainnet.evercloud.dev/your-project-id/graphql' \
--header 'Authorization: Basic project_secret_in_base64' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"query{\n  blockchain{\n    blocks(workchain:-1, last:1){\n      edges{\n        node{\n          hash\n          seq_no\n        }\n      }\n    }\n  }\n}","variables":{}}'
```

**ever-sdk-js**

```javascript
const {TonClient} = require("@eversdk/core");
const {libNode} = require("@eversdk/lib-node");

TonClient.useBinaryLibrary(libNode)

const client = new TonClient({
    network: {
        endpoints: [
            "mainnet.evercloud.dev/your-project-id/graphql"
        ],
        access_key: "Project's secret"
    },
});

(async () => {
    try {
        queryString = `
            query{
                blockchain{
                blocks(workchain:-1, last:1){
                    edges{
                    node{
                        hash
                        seq_no
                    }
                    }
                }
                }
            }
        `
        let {seq_no, hash} = (await client.net.query({ 
            "query": queryString }))
        .result.data.blockchain.blocks.edges[0].node;
        console.log("The last masterchain block seqNo is " + seq_no+ '\n' + "the hash is" + hash);
        client.close();
}
    catch (error) {
            console.error(error);
    }
}
)()
```

**everdev**

```
everdev network credentials main --project "Project Id" --access-key "Project secret"
```

**tonos-cli**

```
tonos-cli config --url "mainnet.evercloud.dev" --project_id "your-project-id id" --access_key "Project secret"
Succeeded.
{
  "url": "mainnet.evercloud.dev",
  "wc": 0,
  "addr": null,
  "method": null,
  "parameters": null,
  "wallet": null,
  "pubkey": null,
  "abi_path": null,
  "keys_path": null,
  "retries": 5,
  "timeout": 60000,
  "message_processing_timeout": 40000,
  "out_of_sync_threshold": 15,
  "is_json": false,
  "depool_fee": 0.5,
  "lifetime": 60,
  "no_answer": true,
  "balance_in_tons": false,
  "local_run": false,
  "async_call": false,
  "debug_fail": "None",
  "project_id": "your-project-id",
  "access_key": "project-secret",
  "endpoints": []
}
```

**JS fetch**

```javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
  query: "query{\n  blockchain{\n    blocks(workchain:-1, last:1){\n      edges{\n        node{\n          hash\n          seq_no\n        }\n      }\n    }\n  }\n}",
  variables: {}
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
};

fetch("https://mainnet.evercloud.dev/your-project-id/graphql", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

**Postman**

```
URL: https://mainnet.evercloud.dev/your-project-id/graphql
Authorization: Basic Auth
Username: empty
Password: <Project secret>
Body: GraphQL
Query:

query{
  blockchain{
    blocks(workchain:-1, last:1){
      edges{
        node{
          hash
          seq_no
        }
      }
    }
  }
}
```


### WSS

#### Without secret

**ever-sdk-js**

```javascript
const {TonClient} = require("@eversdk/core");
const {libNode} = require("@eversdk/lib-node");

TonClient.useBinaryLibrary(libNode)

const client = new TonClient({
    network: {
        endpoints: [
            "mainnet.evercloud.dev/your-project-id/graphql"
        ],
        queries_protocol: WS
    },
});

(async () => {
    try {
        queryString = `
            query{
                blockchain{
                blocks(workchain:-1, last:1){
                    edges{
                    node{
                        hash
                        seq_no
                    }
                    }
                }
                }
            }
        `
        let {seq_no, hash} = (await client.net.query({ 
            "query": queryString }))
        .result.data.blockchain.blocks.edges[0].node;
        console.log("The last masterchain block seqNo is " + seq_no+ '\n' + "the hash is" + hash);
        client.close();
}
    catch (error) {
            console.error(error);
    }
}
)()
```

**wscat**

```bash
wscat -c wss://mainnet.evercloud.dev/your-project-id/graphql -s graphql-ws
{"id":"1","type":"start","payload":{"variables":{},"extensions":{},"operationName":null,"query":"subscription{\n  blocks(filter:{\n    workchain_id:{\n      eq:-1\n    }\n  }){\n    seq_no\n    id\n  }\n}"}}
```

**Postman**

```json
URL: wss://mainnet.evercloud.dev/your-project-id/graphql 
Sec-WebSocket-Protocol: graphql-ws

message
{
  "id": "1",
  "type": "start",
  "payload": {
    "variables": {},
    "extensions": {},
    "operationName": null,
    "query": "subscription{\n  blocks(filter:{\n    workchain_id:{\n      eq:-1\n    }\n  }){\n    seq_no\n    id\n  }\n}"
  }
}
```

## API Documentation

#### Reference

https://docs.everos.dev/ever-platform/reference/graphql-api

#### Samples

https://docs.everos.dev/ever-platform/samples/graphql-samples


## Full docs

See original guide at https://docs.everos.dev/ever-platform/products/evercloud/get-started

Full Evercloud documenation is available at https://docs.everos.dev/ever-platform/products/evercloud
