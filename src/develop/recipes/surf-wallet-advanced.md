---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Advanced usage of Surf Keeper

After you connected a page to the extension you can interact with your Everscale account.

### Surf Extension methods

#### **connect**
  Requests new permissions for current origin.
  Shows an approval window to the user.
  ```jsx
  input: {};
  output: {
  	isConnected: boolean; // Flag shows connection status for the current origin
  	address?: string; // Address of extension wallet
  	publicKey?: string; // Hex encoded public key
  };
  ```
  Example:
  ```jsx
  const result = await rpc.connect();
  ```
#### **connectStatus**
  Returns the current connection status.
  ```jsx
  input: {};
  output: {
  	isConnected: boolean; // Flag shows connection status for the current origin
  	address?: string; // Address of extension wallet
  	publicKey?: string; // Hex encoded public key
  };
  ```
  Example:
  ```jsx
  const result = await rpc.connectStatus();
  ```
#### **disconnect**
  Removes all permissions for current origin.
  ```jsx
  input: {
  }
  output: {
    isConnected: boolean; // 	Flag shows connection status for the current origin; should return `false` as disconnect method execution result
  }
  ```
  Example:
  ```jsx
  const result = await rpc.disconnect();
  ```
#### **sendMessage**
  Sends an internal message from the user account.
  Shows an approval window to the user.
  ```jsx
  input: {
  	abi: string; // Contract abi
  	address: string; // Address string
  	net: EverscaleNetNameKey; // Name of network to send message in, i.e. 'mainnet' | 'devnet'
  	callSet: {
  		functionName: string; // Name of contract function to be sent to the contract
  		input: Record<string, any>; // Input for the contract function
  		header?: FunctionHeader;
  	};
  	bounce: boolean; // Whether to bounce message back on error
  	amount: string; // Amount of nano EVER to send
  	action?: string; // Name of action to be performed by message send
  };
  output: {
    // Result of send message
    result?: {
      shard_block_id: string; // The last generated shard block of the message destination account before the message was sent
      sending_endpoints: string[]; // The list of endpoints to which the message was sent
    };
    error?: string; // String with some error details
  };
  ```
  Example:
  ```jsx
  const response = await rpc.sendMessage({
    amount: '2000000000', // in nano-tokens, i.e. 2 tokens
    bounce: true,
    callSet: {
      functionName: 'addComment',
      input: {
        comment: 'Test comment',
      },
    },
    net: 'mainnet',
    action: 'Create comment',
    address: '0:8959ea111cc0c85d996df0d16e530d584d5366618cfed9ab6a1754828bb78479',
    abi: '{"ABI version":2,"version":"2.3","header":["pubkey","time","expire"]...',
  });
  ```
#### **sendTransaction**
  Sends transaction with provided params.
  ```jsx
  input: {
    amount: string; // Amount of nano EVER to send
    bounce: boolean; // Whether to bounce message back on error
    comment: string; // Comment for the transaction to send it in payload
    net: EverscaleNetNameKey; // Name of network to send transaction in, i.e. 'mainnet' | 'devnet'
    to: string; // Address to send transaction to
  }
  output: {
    // Result of send transaction message
    result?: {
      shard_block_id: string; // The last generated shard block of the message destination account before the message was sent
      sending_endpoints: string[]; // The list of endpoints to which the message was sent
    };
    error?: string; // String with some error details
  };
  ```
  Example:
  ```jsx
  const response = await rpc.sendTransaction({
    amount: '10000000000', // in nano-tokens, i.e. 10 tokens
    bounce: true,
    comment: 'check it out!',
    net: 'devnet',
    to: '0:b76b532fbe72307bff243b401d6792d5d01332ea294a0310c0ffdf874026f2b9',
  });
  ```
#### **signData**
  Signs arbitrary data.
  ```jsx
  input: {
    data: string; // Base64 encoded arbitrary bytes
  }
  output: {
    signature?: string; // Base64 encoded signature bytes (data is guaranteed to be 64 bytes long)
    error?: string; // String with error details
  };
  ```
  Example:
  ```jsx
  const response = await rpc.signData({
    data: 'te6ccgEBAQEAKAAASw4E0p6AD5fz9JsGWfbBhP0Bwq9+jk0X3za9rhuI7A1H3DxC0QBw',
  });
  ```
#### **subscribe**
  Subscribes to data updates.
  ```jsx
  input: {
  	type: string; // Subscription type, for now only "balance" is available
  	address: string; // Target address
  	listener: (value: string) => void; // Subscription data update handler
  };
  output: {
  	remove: () => void; // Base64 encoded signature bytes (data is guaranteed to be 64 bytes long)
  };
  ```
  Example:
  ```jsx
  const response = rpc.subscribe({
    type: 'balance',
    address: '0x000000..000',
    listener: val => console.log('Balance uodated: ', val),
  });
  ```

### Frameworks usage

Here we gathered the most common patterns of `@eversurf/surfkeeper-provider` usage:

<Tabs>
  <TabItem value="react" label="React">

  ```typescript
  import { useEffect, useMemo, useState } from 'react';
import {
    Address,
    ConnectResponse,
    ProviderRpcClient,
    hasSurfKeeperProvider
} from '@eversurf/surfkeeper-provider';

export type ExtensionState = {
    hasProvider: boolean;
    isConnecting: boolean;
    isConnected: boolean;
    isContractUpdating: boolean;
    isDisconnecting: boolean;
    isInitialized: boolean;
    isInitializing: boolean;
}
export type ExtensionData = {
    address: Address | undefined;
    publicKey: string | undefined;
}
const DEFAULT_EXTENSION_STATE: ExtensionState = {
    hasProvider: false,
    isConnecting: false,
    isConnected: false,
    isContractUpdating: false,
    isDisconnecting: false,
    isInitialized: false,
    isInitializing: false,
}
const DEFAULT_EXTENSION_DATA: ExtensionData = {
    address: undefined,
    publicKey: undefined
}

export interface IUseSurfKeeper {
    rpc: ProviderRpcClient,
    connect: () => Promise<void>,
    extensionState: ExtensionState,
    extensionData: ExtensionData
}

export const rpc = new ProviderRpcClient();

export const useSurfKeeper = (): IUseSurfKeeper => {
    const [extensionState, setExtensionState] = useState<ExtensionState>(DEFAULT_EXTENSION_STATE);
    const [extensionData, setExtensionData] = useState<ExtensionData>(DEFAULT_EXTENSION_DATA);

    const init = async () => {
        setExtensionState({
            ...extensionState,
            isInitializing: true
        });

        let hasProvider = false;

        try {
            hasProvider = await hasSurfKeeperProvider();
        }
        catch (e) {
            console.log("hasSurfKeeperProvider error");
        }

        if (!hasProvider) {
            setExtensionState({
                ...extensionState,
                hasProvider: false,
                isInitializing: false
            });
            console.warn("Surf Keeper is not installed");
        }

        const connectResponse = await rpc.connectStatus();

        if (connectResponse!.isConnected) {
            setExtensionState({
                ...extensionState,
                isConnected: true,
                hasProvider: hasProvider,
                isConnecting: false,
                isInitialized: true,
                isInitializing: false,
            });
            setExtensionData({
                address: (connectResponse as unknown as ConnectResponse).address,
                publicKey: (connectResponse as unknown as ConnectResponse).publicKey
            });
        } else {
            setExtensionState({
                ...extensionState,
                isConnected: false,
                hasProvider: hasProvider,
                isConnecting: false,
                isInitialized: true,
                isInitializing: false,
            });
            console.warn("Surf Keeper is not connected");
        }
    }

    const connect = async () => {
        const connectResponse = await rpc.connect();

        if (connectResponse!.isConnected) {
            setExtensionState({
                ...extensionState,
                isConnecting: false,
                isConnected: true,
                isInitialized: true,
                isInitializing: false,
            });
            setExtensionData({
                address: (connectResponse as unknown as ConnectResponse).address,
                publicKey: (connectResponse as unknown as ConnectResponse).publicKey
            });
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    };

    useEffect(() => {
        setExtensionState({
            ...extensionState,
            isInitializing: true
        });
        init();
    }, []);
  
    return useMemo(
      () => ({
        rpc: rpc,
        connect: connect,
        extensionState: extensionState,
        extensionData: extensionData
      }),
      [extensionState, extensionData],
    );
  };
  
export default useSurfKeeper;

  ```

  </TabItem>

</Tabs>