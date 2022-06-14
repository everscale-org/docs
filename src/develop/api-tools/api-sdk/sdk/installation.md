---
sidebar_position: 0
---

# Installation

###Node.js

Our library is fully-annotated with .d.ts files so we recommend to write your applications in Typescript.

Let's start with a clean npm project.

    mkdir hello
    cd hello
    npm init -y

Now lets install core package and bridge package for Node.js

    npm i --save @eversdk/core
    npm i --save @eversdk/lib-node

If you want to use high-level AppKit package then install this package as well:

    npm i --save @eversdk/appkit

You must initialize the library before the first use. The best place to do it is an initialization code of your application.
You need to attach the chosen binary module to the TonClient class. Create index.js file and add this code:

    const {TonClient} = require("@eversdk/core");
    const {libNode} = require("@eversdk/lib-node");

// Application initialization
TonClient.useBinaryLibrary(libNode)

That's it! Now you are ready to create and configure TONClient object!


###Web

Our library is fully-annotated with .d.ts files so we recommend to write your applications in Typescript.

Let's start with a clean project.

    mkdir hello
    cd hello
    npm init -y

**Installation**

Now lets install core package and bridge package for Web

    npm i --save @eversdk/core
    npm i --save @eversdk/lib-web

**Important!** Each time you run npm install the new version of the eversdk.wasm and index.js is downloaded. So you have to always update the eversdk.wasm inside your web package before publishing (starting local web server, creating web bundle etc.). If you use Webpack the best way is to use CopyPlugin.
If you want to use high-level AppKit package then install this package as well:

    npm i --save @eversdk/appkit

You must initialize the library before the first use. The best place to do it is in initialization code of your application.
You need to attach the chosen binary module to the TonClient class:

    import { TonClient } from '@eversdk/core';
    import { libWeb } from '@eversdk/lib-web';

TonClient.useBinaryLibrary(libWeb);


###Create TONClient

Make sure you completed the previous step and installed SDK properly.

TONClient is the main class of Ever SDK Library. To start using library one needs to create and setup a TONClient instance.
The simplest initialization code can look like this: we just specify the Developer Network endpoints, other parameters are used by default. See the defaults below.

    const client = new TonClient({
        network: { 
            endpoints: [
                'https://eri01.net.everos.dev',
                'https://rbx01.net.everos.dev',
                'https://gra01.net.everos.dev'
            ] 
        } 
    });

If you are working with local blockchain Evernode SE, specify http://localhost in the endpoints.
Check the full list of supported network endpoints.
You can find reference guide to TonClient here: Ever-SDK API Documentation.


###Configure Client

SDK provides a list of configuration parameters that can influence the behavior of the client. Use them when you create TONClient for more specific setup.

    export type TONConfigData = {
    network?: { 
        endpoints?: string[],
        server_address?: string, // deprecated, use endpoints
        network_retries_count?: number, // default = 5
        message_retries_count?: number, // default = 5
        message_processing_timeout?: number, // default = 40000 ms
        wait_for_timeout?: number, // default = 40000 ms
        out_of_sync_threshold?: number, // default = 15000 ms
        reconnect_timeout?: number, // default = 12000 ms
        access_key?: string
    },
    crypto?:{
        mnemonic_dictionary?: number, // default = 1
        mnemonic_word_count?: number, // default = 12
        hdkey_derivation_path?: string // default = "m/44'/396'/0'/0/0"
    },
    abi?:{
        workchain?: number, // default = 0
        message_expiration_timeout?: number, // default = 40000 ms
        message_expiration_timeout_grow_factor?: number // default = 1.5
    }

}


###Network Config

**endpoints**

List of DApp Server addresses. Any correct URL format can be specified, including IP addresses. **This parameter is prevailing over server_address.**

For instance, for https://rbx01.net.everos.dev/graphql GraphQL endpoint the server address will be https://rbx01.net.everos.dev. For Evernode SE the endpoint the server address will be http://localhost.
At the start SDK sends requests to all the specified endpoints and chooses the one whose answer returns first. Later, if the application loses connection, SDK will try to switch to another endpoint from the list. If no endpoint is working there will be an error.

**server_address**

**This field is deprecated, but left for backward-compatibility.** DApp Server public address.

**network_retries_count**

The number of automatic network retries that SDK performs in case of connection problems. The default value is 5.

**message_retries_count**

The number of process_message retries that SDK performs in case of Message Expired (507) error - but only for those messages, local emulation of which was successful or failed with replay protection error. The default value is 5.
Read more about reliable message delivery and pragma expire here.

**message_processing_timeout**

Timeout that is used to process message delivery for contracts, the ABI of which does not include expire header. If the message is not delivered within the specified timeout, the appropriate error occurs.

**wait_for_timeout**

Maximum timeout that is used for query response. The default value is 40 sec.

**out_of_sync_threshold**

Maximum time difference between server and client.
If client's device time is out of sync and difference is more than the threshold, an error will occur. Also an error will occur if the specified threshold is more than message_processing_timeout/2.
The default value is 15 sec.

**reconnect_timeout**

Timeout between reconnect attempts.

**access_key**

Access key to GraphQL API. At the moment is not used in production.


###Crypto Config

**mnemonic_dictionary**

Mnemonic dictionary that will be used by default in crypto functions. If not specified, 1 dictionary will be used.

**mnemonic_word_count**

Mnemonic word count that will be used by default in crypto functions. If not specified the default value will be 12.

**hdkey_derivation_path**

Derivation path that will be used by default in crypto functions. If not specified m/44'/396'/0'/0/0 will be used.


###ABI Config

**workchain**

Workchain id that is used by default in DeploySet.

**message_expiration_timeout**

Message lifetime for contracts, the ABI of which includes expire header. The default value is 40 sec.

**message_expiration_timeout_grow_factor**

Factor that increases the expiration timeout for each retry. The default value is 1.5.

>  The documentation in Everscale repository is a community effort. Therefore, everyone can contribute with proposals for new topics, suggest new content elements, participate in editing, and provide ideas that will be of great help for network development.
Please be informed that our documentation can be [edited via GitHub](https://github.com/everscale-org/docs/issues).  
  Also please make sure to consult our rules and rewards policy via [this link](https://docs.everscale.network/contribute/hot-streams/documentations).  
  Feel free to join [Everscale Documentation Development Telegram chat](https://t.me/+C2IpQXWZtCwxYzEy) and [Everscale Developers Onboarding Telegram chat](https://t.me/+Vca1Gs6uPzIyNWVi)!